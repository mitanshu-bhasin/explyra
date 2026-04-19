/**
 * Explyra CRM AI Assistant (v2.0)
 * Powered by Gemini 2.5 Flash — specialized for lead analysis, pipeline management, and data-driven insights.
 */
(function() {
    // Gemini API key: read from env config (injected by build) → fallback to backup keys
    const GEMINI_KEY = window.EXPLYRA_CONFIG?.ai?.geminiKey
        || window.EXPLYRA_CONFIG?.ai?.gaKey
        || 'AIzaSyDefIPTvfbaZtW4yD47mzWotFwdDHrut2E'; // FIREBASE_OR_GEMINI_KEY_3 from .env
    const GEMINI_MODEL = 'gemini-2.5-flash';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

    // Unique history key for CRM
    const appKey = 'explyra_crm_ai_history';

    // UI Templates
    const chatHTML = `
        <div class="crm-ai-panel-toggle" id="crm-ai-launcher">
            <i class="fa-solid fa-sparkles"></i>
            <i class="fa-solid fa-chevron-left" style="font-size: 0.6rem; transform: rotate(270deg);"></i>
        </div>
        <div class="crm-ai-window" id="crm-ai-window">
            <div class="crm-ai-header">
                <div class="crm-ai-user-info">
                    <div class="crm-ai-avatar">AI</div>
                    <div class="crm-ai-title">
                        <h4>CRM Intelligence</h4>
                        <p id="crm-ai-user-context">Syncing data...</p>
                    </div>
                </div>
                <div class="crm-ai-close" id="crm-ai-close" title="Close Panel">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            
            <div class="crm-ai-messages" id="crm-ai-messages"></div>
            
            <div class="crm-ai-quick" id="crm-ai-quick">
                <button class="quick-btn" onclick="window.crmAiSendQuick('Analyze my pipeline')">Analyze Pipeline</button>
                <button class="quick-btn" onclick="window.crmAiSendQuick('Find hot leads')">Hot Leads</button>
                <div class="crm-ai-dropdown">
                    <button class="crm-ai-dropbtn"><i class="fa-solid fa-plus"></i> Quick Create</button>
                    <div class="crm-ai-dropdown-content">
                        <button onclick="window.crmAiSendQuick('Help me create a new lead')">New Lead</button>
                        <button onclick="window.crmAiSendQuick('Help me add a new deal')">New Deal</button>
                        <button onclick="window.crmAiSendQuick('Help me add a contact')">New Contact</button>
                    </div>
                </div>
            </div>

            <div class="crm-ai-input-area">
                <input type="text" class="crm-ai-input" id="crm-ai-input" placeholder="Ask about your leads or deals..." autocomplete="off">
                <button class="crm-ai-send" id="crm-ai-send">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    // Inject UI
    const container = document.createElement('div');
    container.id = 'crm-ai-container';
    container.innerHTML = chatHTML;
    document.body.appendChild(container);

    const launcher = document.getElementById('crm-ai-launcher');
    const windowEl = document.getElementById('crm-ai-window');
    const closeBtn = document.getElementById('crm-ai-close');
    const inputField = document.getElementById('crm-ai-input');
    const sendBtn = document.getElementById('crm-ai-send');
    const messagesContainer = document.getElementById('crm-ai-messages');
    const statusText = document.getElementById('crm-ai-user-context');

    let chatHistory = JSON.parse(localStorage.getItem(appKey) || "[]");
    let isProcessing = false;

    // Wait for CRM data availability
    function checkCrmData() {
        if (window.userData) {
            statusText.innerText = `Ready — ${window.userData.name}`;
            if (chatHistory.length === 0) {
                addMessageUI(`Hello **${window.userData.name}**, I'm your CRM Intelligence. I can help you analyze your leads, manage your pipeline, and even update records. What can I do for you today?`, 'ai');
            }
            return true;
        }
        return false;
    }

    const initInterval = setInterval(() => {
        if (checkCrmData()) clearInterval(initInterval);
    }, 1000);

    // Initial load from history
    if (chatHistory.length > 0) {
        chatHistory.forEach(msg => {
            if (msg.role !== 'system') {
                addMessageUI(msg.content, msg.role === 'assistant' ? 'ai' : 'user', false);
            }
        });
    }

    // Tab vs Panel Logic
    function refreshLayout() {
        const tabContainer = document.getElementById('crm-ai-tab-container');
        const activeTab = document.querySelector(".crm-nav-item.active")?.dataset.tab;
        
        if (activeTab === 'ai' && tabContainer) {
            // Tab Mode (The "PDP" View)
            tabContainer.appendChild(windowEl);
            windowEl.classList.add('tab-mode');
            windowEl.classList.add('open');
            launcher.style.display = 'none';
            closeBtn.style.display = 'none';
            document.querySelector('.crm-ai-title h4').innerText = "AI Agent Workspace";
            statusText.innerText = "System: Enhanced Intelligence Mode Active";
        } else {
            // Panel Mode
            container.appendChild(windowEl);
            windowEl.classList.remove('tab-mode');
            launcher.style.display = 'flex';
            closeBtn.style.display = 'block';
            document.querySelector('.crm-ai-title h4').innerText = "CRM Intelligence";
            if (window.userData) statusText.innerText = `Ready — ${window.userData.name}`;
            if (!windowEl.classList.contains('open')) {
                launcher.style.right = '0';
            }
        }
    }

    // Proxy the switchCrmTab to detect changes
    const originalSwitch = window.switchCrmTab;
    window.switchCrmTab = function(tabId) {
        if (originalSwitch) originalSwitch(tabId);
        setTimeout(refreshLayout, 50);
    };

    // Toggle Chat
    launcher.addEventListener('click', () => {
        windowEl.classList.add('open');
        launcher.style.right = '-40px';
        setTimeout(() => inputField.focus(), 400);
    });

    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('open');
        launcher.style.right = '0';
    });

    // Send Logic
    window.crmAiSendQuick = (text) => {
        inputField.value = text;
        handleSend();
    };

    const handleSend = async () => {
        const text = inputField.value.trim();
        if (!text || isProcessing) return;

        addMessageUI(text, 'user');
        chatHistory.push({ role: 'user', content: text });
        saveHistory();
        
        inputField.value = '';
        isProcessing = true;
        const typingEl = addTypingIndicator();
        
        try {
            const context = getCrmContext(text);
            const response = await callGeminiAPI(text, context);
            typingEl.remove();
            
            // Handle possible commands in response
            const finalReply = handleCommands(response);
            
            addMessageUI(finalReply, 'ai');
            chatHistory.push({ role: 'assistant', content: response }); // Store raw response with commands
            saveHistory();
        } catch (error) {
            console.error('CRM AI Error:', error);
            typingEl.remove();
            addMessageUI("I encountered an error analyzing your data. Please try again.", 'ai');
        } finally {
            isProcessing = false;
        }
    };

    sendBtn.addEventListener('click', handleSend);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    function saveHistory() {
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
        localStorage.setItem(appKey, JSON.stringify(chatHistory));
    }

    function addMessageUI(text, role, scroll = true) {
        const div = document.createElement('div');
        div.className = `crm-ai-msg ${role}`;
        
        // Basic Markdown Support
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[COMMAND:.*?\]/g, '') // Hide commands from UI
            .replace(/\n/g, '<br>');

        div.innerHTML = html;
        messagesContainer.appendChild(div);
        if (scroll) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'typing';
        div.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return div;
    }

    function getCrmContext(query) {
        // Only provide summary initially, or full data if keywords match
        const needsLeads = /lead|prospect|hot|follow/i.test(query);
        const needsPipeline = /pipeline|deal|sale|revenue|stage/i.test(query);
        const needsContacts = /contact|client|person/i.test(query);
        const needsAll = /analyze|report|overview|summary/i.test(query);

        let ctx = {
            user: window.userData || {},
            companyId: window.companyId || 'N/A',
            activeTab: document.querySelector(".crm-nav-item.active")?.dataset.tab || 'dashboard'
        };

        if (needsLeads || needsAll) {
            ctx.leads = (window.CrmLeads?.leads || []).map(l => ({ 
                id: l.id, name: l.name, status: l.status, source: l.source, value: l.expectedValue 
            }));
        }

        if (needsPipeline || needsAll) {
            ctx.pipeline = (window.CrmPipeline?.deals || []).map(d => ({
                id: d.id, name: d.name, amount: d.amount, stage: d.stage, probability: d.probability
            }));
        }

        if (needsContacts || needsAll) {
            ctx.contacts = (window.CrmContacts?.contacts || []).map(c => ({
                id: c.id, name: c.name, company: c.company, role: c.role, email: c.email
            }));
        }

        return JSON.stringify(ctx);
    }

    async function callGeminiAPI(userMessage, context) {
        const systemPrompt = `You are Explyra CRM Intelligence, an expert business AI assistant.
You analyze CRM data for the logged-in user: ${window.userData?.name || 'Manager'}.
Company ID: ${window.companyId || 'N/A'}.

LIVE CRM DATA:
${context}

INSTRUCTIONS:
1. Provide deep analysis of leads, pipeline, or contacts.
2. Be professional, concise, and data-driven.
3. Keep responses brief unless a detailed report is requested.
4. COMMAND CAPABILITY (only use when explicitly asked):
   - Create lead: [COMMAND:CREATE_LEAD:{"name":"...","email":"...","company":"...","status":"NEW"}]
   - Create deal: [COMMAND:CREATE_DEAL:{"name":"...","contact":"...","amount":0,"stage":"Discovery"}]
   - Create contact: [COMMAND:CREATE_CONTACT:{"name":"...","email":"...","company":"..."}]
   - Update lead: [COMMAND:UPDATE_LEAD:{"id":"...","status":"..."}]
   - Update deal: [COMMAND:UPDATE_DEAL:{"id":"...","stage":"..."}]
5. Use **bold** for metrics and key names.`;

        // Build conversation for Gemini (parts format)
        const historyParts = chatHistory.slice(-8).map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const payload = {
            contents: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                { role: 'model', parts: [{ text: 'Understood. I am ready to assist with CRM analysis.' }] },
                ...historyParts,
                { role: 'user', parts: [{ text: userMessage }] }
            ],
            generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 1024
            }
        };

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Gemini API Error ${response.status}: ${errBody.slice(0, 200)}`);
        }
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI.';
    }

    function handleCommands(text) {
        if (!text.includes('[COMMAND:')) return text;

        const cmdMatch = text.match(/\[COMMAND:([A-Z_]+):(.*?)\]/);
        if (cmdMatch) {
            const cmd = cmdMatch[1];
            const payload = JSON.parse(cmdMatch[2]);
            
            console.log("CRM AI executing command:", cmd, payload);

            const ts = firebase.firestore.FieldValue.serverTimestamp();
            const companyId = window.companyId;
            const uid = window.userData?.uid;
            
            if (cmd === 'CREATE_LEAD' && window.db) {
                window.db.collection('crm_leads').add({ ...payload, companyId, createdAt: ts, updatedAt: ts, createdBy: uid });
            } else if (cmd === 'CREATE_DEAL' && window.db) {
                window.db.collection('crm_deals').add({ ...payload, companyId, createdAt: ts, updatedAt: ts, createdBy: uid });
            } else if (cmd === 'CREATE_CONTACT' && window.db) {
                window.db.collection('crm_contacts').add({ ...payload, companyId, createdAt: ts, updatedAt: ts });
            } else if (cmd === 'UPDATE_LEAD' && window.db && payload.id) {
                window.db.collection('crm_leads').doc(payload.id).update({ ...payload, updatedAt: ts });
            } else if (cmd === 'UPDATE_DEAL' && window.db && payload.id) {
                window.db.collection('crm_deals').doc(payload.id).update({ ...payload, updatedAt: ts });
            } else if (cmd === 'UPDATE_CONTACT' && window.db && payload.id) {
                window.db.collection('crm_contacts').doc(payload.id).update({ ...payload, updatedAt: ts });
            }
            
            const actionType = cmd.includes('CREATE') ? 'Created' : 'Updated';
            const recordType = cmd.split('_')[1].toLowerCase();
            return text.replace(/\[COMMAND:.*?\]/g, '') + ` \n\n✅ *Action processed: ${actionType} ${recordType} record.*`;
        }
        return text;
    }

})();
