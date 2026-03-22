/**
 * AI Support Agent for Explyra Learning (v2.0)
 * Features: Local History (Per Page/Course), Code Blocks with Copy, Concise Models.
 */
(function() {
    const GITHUB_TOKEN = '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';
    const ENDPOINT = 'https://models.github.ai/inference/chat/completions';
    const MODEL = 'mistral-ai/mistral-small-2503';

    // Per-page/course unique key for history
    const pageKey = 'explyra_history_' + window.location.pathname.split('/').pop().replace('.html', '');

    // UI Templates
    const chatHTML = `
        <div class="ai-chat-launcher" id="ai-launcher" style="display: flex;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div class="ai-chat-window" id="ai-window">
            <div class="ai-chat-header">
                <div class="ai-assistant-info">
                    <div class="ai-assistant-avatar">EX</div>
                    <div class="ai-assistant-text">
                        <h4>Explyra Assistant</h4>
                        <p>Powered by Agentic AI</p>
                    </div>
                </div>
                <div class="ai-chat-close" id="ai-close">✕</div>
            </div>
            <div class="ai-chat-messages" id="ai-messages"></div>
            <div class="ai-chat-input-area">
                <input type="text" class="ai-chat-input" id="ai-input" placeholder="Ask a doubt..." autocomplete="off">
                <button class="ai-chat-send" id="ai-send">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    `;

    // Inject UI
    const container = document.createElement('div');
    container.innerHTML = chatHTML;
    document.body.appendChild(container);

    const launcher = document.getElementById('ai-launcher');
    const windowEl = document.getElementById('ai-window');
    const closeBtn = document.getElementById('ai-close');
    const inputField = document.getElementById('ai-input');
    const sendBtn = document.getElementById('ai-send');
    const messagesContainer = document.getElementById('ai-messages');

    // Load History
    let chatHistory = JSON.parse(localStorage.getItem(pageKey) || "[]");

    // Initialize with default message if history is empty
    if (chatHistory.length === 0) {
        addMessageUI("Hello! I'm your Explyra learning assistant. I have saved your history for this course.", 'bot', false);
    } else {
        chatHistory.forEach(msg => {
            if (msg.role !== 'system') {
                addMessageUI(msg.content, msg.role === 'assistant' ? 'bot' : 'user', false);
            }
        });
    }

    // Toggle Chat
    launcher.addEventListener('click', () => {
        windowEl.style.display = 'flex';
        launcher.style.display = 'none';
        inputField.focus();
    });

    closeBtn.addEventListener('click', () => {
        windowEl.style.display = 'none';
        launcher.style.display = 'flex';
    });

    // Handle Input
    const handleSend = async () => {
        const text = inputField.value.trim();
        if (!text) return;

        addMessageUI(text, 'user');
        chatHistory.push({ role: 'user', content: text });
        saveHistory();
        
        inputField.value = '';
        const typingId = addTypingIndicator();
        
        try {
            const context = getPageContext();
            const response = await callAI(text, context);
            removeTypingIndicator(typingId);
            
            addMessageUI(response, 'bot');
            chatHistory.push({ role: 'assistant', content: response });
            saveHistory();
        } catch (error) {
            console.error('AI Error:', error);
            removeTypingIndicator(typingId);
            addMessageUI("Error connecting to AI. Try again.", 'bot');
        }
    };

    sendBtn.addEventListener('click', handleSend);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    function saveHistory() {
        // Keep only last 20 messages to save local storage space
        if (chatHistory.length > 21) {
            chatHistory = [chatHistory[0], ...chatHistory.slice(-20)];
        }
        localStorage.setItem(pageKey, JSON.stringify(chatHistory));
    }

    function addMessageUI(text, role, scroll = true) {
        const div = document.createElement('div');
        div.className = `ai-message ${role}`;
        
        // Handle code blocks: ```code```
        if (text.includes('```')) {
            const parts = text.split('```');
            let finalHTML = '';
            parts.forEach((part, index) => {
                if (index % 2 === 1) { // It's code
                    const codeId = 'code-' + Math.random().toString(36).substr(2, 5);
                    finalHTML += `
                        <div class="code-box">
                            <pre><code id="${codeId}">${escapeHtml(part.trim())}</code></pre>
                            <button class="copy-btn" onclick="copyCode('${codeId}', this)">Copy</button>
                        </div>
                    `;
                } else {
                    finalHTML += part.replace(/\n/g, '<br>');
                }
            });
            div.innerHTML = finalHTML;
        } else {
            div.innerHTML = text.replace(/\n/g, '<br>');
        }

        messagesContainer.appendChild(div);
        if (scroll) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'ai-message bot typing-indicator-msg';
        div.id = id;
        div.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function getPageContext() {
        const lessonContent = document.getElementById('content-area');
        return (lessonContent ? lessonContent.innerText : document.body.innerText).substring(0, 5000); 
    }

    async function callAI(userMessage, context) {
        const systemPrompt = `You are Explyra Assistant.
- Respond BRIEFLY (max 3-4 sentences).
- If sharing code, use triple backticks \` \` \`.
- Focus on the provided context: ${context}
- Be professional and direct.`;
        
        const messages = [
            { role: 'system', content: systemPrompt },
            ...chatHistory.slice(-6), 
            { role: 'user', content: userMessage }
        ];

        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GITHUB_TOKEN}` },
            body: JSON.stringify({ model: MODEL, messages: messages, temperature: 0.7, max_tokens: 500 })
        });

        if (!response.ok) throw new Error('API Fail');
        const data = await response.json();
        return data.choices[0].message.content;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Global copy function
    window.copyCode = function(id, btn) {
        const code = document.getElementById(id).innerText;
        navigator.clipboard.writeText(code).then(() => {
            btn.innerText = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerText = 'Copy';
                btn.classList.remove('copied');
            }, 2000);
        });
    }
})();
