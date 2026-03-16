/**
 * Explyra AI Assistant - Interaction Logic
 * Features: Text Chat, Voice Input (STT), Voice Output (TTS), Groq API Sync
 */

(function () {
    // 1. DOM Elements Injection
    const aiHTML = `
        <div class="ai-assistant-wrapper">
            <div class="ai-chat-window" id="aiChatWindow">
                <div class="ai-chat-header">
                    <div class="ai-header-info">
                        <div class="ai-avatar"><i class="fas fa-robot"></i></div>
                        <div>
                            <div class="ai-status-text">Explyra AI</div>
                            <div class="ai-status-sub">Online · Ready to help</div>
                        </div>
                    </div>
                    <div class="ai-controls">
                        <div class="ai-control-btn" id="aiMuteBtn" title="Toggle Voice"><i class="fas fa-volume-up"></i></div>
                        <div class="ai-control-btn" id="aiCloseBtn"><i class="fas fa-times"></i></div>
                    </div>
                </div>
                <div class="ai-chat-messages" id="aiMsgs">
                    <div class="ai-msg ai-msg-bot">Hello! I'm Explyra AI. How can I help you today? You can ask me about any of Explyra's products and services.</div>
                </div>
                <div class="ai-chat-input-area">
                    <div class="ai-input-wrap">
                        <input type="text" class="ai-text-input" id="aiInput" placeholder="Ask me something...">
                        <div class="ai-voice-btn" id="aiVoiceBtn" title="Voice Input"><i class="fas fa-microphone"></i></div>
                    </div>
                    <div class="ai-send-btn" id="aiSendBtn"><i class="fas fa-paper-plane"></i></div>
                </div>
            </div>
            <div class="ai-fab" id="aiFab">
                <i class="fas fa-comment-dots"></i>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', aiHTML);

    // 2. Variables & Constants
    const fab = document.getElementById('aiFab');
    const chatWin = document.getElementById('aiChatWindow');
    const closeBtn = document.getElementById('aiCloseBtn');
    const sendBtn = document.getElementById('aiSendBtn');
    const input = document.getElementById('aiInput');
    const msgsContainer = document.getElementById('aiMsgs');
    const voiceBtn = document.getElementById('aiVoiceBtn');
    const muteBtn = document.getElementById('aiMuteBtn');
    let isMuted = false;
    let isRecording = false;

    // Rate Limiting (10 msgs per minute)
    const msgHistory = [];
    const checkRateLimit = () => {
        const now = Date.now();
        msgHistory.push(now);
        while (msgHistory.length > 0 && msgHistory[0] < now - 60000) msgHistory.shift();
        return msgHistory.length <= 10;
    };

    // 3. Toggle Chat
    const toggleChat = () => {
        chatWin.classList.toggle('active');
        fab.classList.toggle('active');
        if (chatWin.classList.contains('active')) input.focus();
    };

    fab.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // 4. Message Handling
    const addMessage = (text, sender) => {
        const msg = document.createElement('div');
        msg.className = `ai-msg ai-msg-${sender}`;
        msg.textContent = text;
        msgsContainer.appendChild(msg);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
        return msg;
    };

    const showTyping = () => {
        const typing = document.createElement('div');
        typing.className = 'ai-typing';
        typing.innerHTML = '<div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>';
        msgsContainer.appendChild(typing);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
        return typing;
    };

    // 5. Groq API Integration
    const getAiResponse = async (userText) => {
        if (!checkRateLimit()) {
            addMessage("Slow down! You've reached the limit of 10 messages per minute.", 'bot');
            return;
        }

        const typingIndicator = showTyping();
        
        try {
            const response = await fetch(window.AI_CONFIG.url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.AI_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: window.AI_CONFIG.model,
                    messages: [
                        { role: 'system', content: `
You are the Elite Explyra AI Strategist. You explain our unified SaaS ecosystem with authority and excitement.

WORKFLOW KNOWLEDGE:
- Expense Tracker: Users scan/upload receipts. AI automatically categorizes & extracts data. It follows a multi-level approval workflow before final reimbursement. It syncs with billing software like Ino.
- CRM: Leads enter through submits/integrations. They move through a visual Kanban pipeline. AI forecasts deal closure rates and suggests follow-up actions.
- AI Learning: Adaptive assessment identifies skill gaps. Courses auto-adjust difficulty. Real-time mentor answers questions mid-video.
- Health Companion: Syncs with live weather. Suggests morning runs when clear, indoor yoga when rainy. Tracks steps, calories, and mood.
- Dev Tools: High-speed utilities (Minifier, Hasher, IDE). No ads, privacy-focused, 100% cloud-synced workspace.

PERSONALITY:
- Be punchy, professional, and high-energy. 
- Use English default.
- Keep responses under 50 words.
- Emphasize that Explyra replaces 10 separate tools with one smooth workspace.` },
                        { role: 'user', content: userText }
                    ],
                    temperature: 0.7
                })
            });

            const data = await response.json();
            const aiText = data.choices[0].message.content;
            
            typingIndicator.remove();
            addMessage(aiText, 'bot');
            if (!isMuted) speak(aiText);

        } catch (error) {
            console.error('AI Error:', error);
            typingIndicator.remove();
            addMessage("Technical glitch! Please try in a second.", 'bot');
        }
    };

    const handleSend = () => {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        getAiResponse(text);
    };

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

    // 6. Voice Interaction (STT) - FIXED REPETITION
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false; // Changed to false to prevent intermediate repetition
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isRecording = true;
            voiceBtn.classList.add('recording');
        };

        recognition.onresult = (event) => {
            if (event.results.length > 0) {
                const transcript = event.results[0][0].transcript;
                if (transcript.length > 2) {
                    input.value = transcript;
                    // Auto-send only if result is final
                    if (event.results[0].isFinal) {
                        recognition.stop();
                        handleSend();
                    }
                }
            }
        };

        recognition.onend = () => {
            isRecording = false;
            voiceBtn.classList.remove('recording');
        };

        voiceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isRecording) {
                recognition.stop();
            } else {
                input.value = ''; // Clear input before voice
                recognition.start();
            }
        });
    } else {
        voiceBtn.style.display = 'none';
    }

    // 7. Voice Output (TTS)
    const speak = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel(); // Stop any current speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.5; // Fast and snappy
        utterance.pitch = 1.05; 
        window.speechSynthesis.speak(utterance);
    };

    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        muteBtn.classList.toggle('muted', isMuted);
        if (isMuted) window.speechSynthesis.cancel();
    });

})();
