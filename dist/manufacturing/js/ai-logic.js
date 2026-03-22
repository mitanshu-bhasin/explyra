/**
 * Explyra Manufacturing AI Module
 * Provides specialized intelligence for production planning, inventory tracking, and floor management.
 */

export class ManufacturingAI {
    constructor(userContext = {}, containerId = null) {
        this.userContext = userContext || {};
        this.containerId = containerId;
        this.storageKey = `explyra_mfg_ai_history_${this.userContext.companyId || 'global'}`;
        this.chatHistory = this.loadHistory();
        this.isOpen = false;
        this.init();
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading chat history", e);
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.chatHistory));
        } catch (e) {
            console.error("Error saving chat history", e);
        }
    }

    clearHistory() {
        if (confirm("Start a new AI analysis session? Current history will be wiped.")) {
            this.chatHistory = [];
            localStorage.removeItem(this.storageKey);
            const msgs = this.chatWindow.querySelector('#ai-messages');
            msgs.innerHTML = `
                <div class="ai-message ai">
                    Hello <strong>${this.userContext.name || 'User'}</strong>! I've reset our session. Ready to analyze manufacturing data.
                </div>
            `;
        }
    }

    init() {
        this.createStyles();
        this.createChatWidget();
        if (this.containerId) {
            this.embedInContainer();
        } else {
            this.addToBody();
        }

        // Eagerly pre-fetch data for context
        if (window.DataHandler) {
            this.preFetchData();
        }

        // Render saved history
        if (this.chatHistory.length > 0) {
            this.chatHistory.forEach(msg => {
                const cleanContent = msg.content.replace(/\[COMMAND:.*?\]/g, '').trim();
                if (cleanContent) {
                    this.addMessage(cleanContent, msg.role === 'assistant' ? 'ai' : 'user');
                }
            });
        }
    }

    async preFetchData() {
        try {
            console.log("MFG AI: Pre-fetching manufacturing context...");
            await Promise.all([
                DataHandler.fetchData('production'),
                DataHandler.fetchData('inventory'),
                DataHandler.fetchData('machines')
            ]);
            console.log("MFG AI: Context ready.");
        } catch (e) {
            console.warn("MFG AI: Pre-fetch failed", e);
        }
    }

    createStyles() {
        if (document.getElementById('ai-support-styles')) return;
        const style = document.createElement('style');
        style.id = 'ai-support-styles';
        style.textContent = `
            .ai-widget-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #020617, #1e293b);
                border-radius: 50%;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
                z-index: 9999;
                font-size: 24px;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .ai-widget-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 35px rgba(0,0,0,0.4);
            }
            .ai-chat-window {
                position: fixed;
                bottom: 90px;
                left: auto;
                right: 20px;
                width: 400px;
                height: 650px;
                max-height: 85vh;
                background: white;
                border-radius: 20px;
                box-shadow: 0 25px 60px rgba(0,0,0,0.2);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 99999;
                transform-origin: bottom right;
                transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s;
                opacity: 0;
                transform: scale(0.9) translateY(20px);
                pointer-events: none;
                border: 1px solid rgba(0,0,0,0.05);
            }
            .ai-chat-window.open {
                opacity: 1;
                transform: scale(1) translateY(0);
                pointer-events: all;
            }
            .ai-header {
                background: #020617;
                padding: 20px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .ai-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background: #f8fafc;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .ai-message {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 14px;
                font-size: 14px;
                line-height: 1.6;
                position: relative;
                word-wrap: break-word;
            }
            .ai-message.user {
                align-self: flex-end;
                background: #020617;
                color: white;
                border-bottom-right-radius: 2px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .ai-message.ai {
                align-self: flex-start;
                background: white;
                color: #1e293b;
                border: 1px solid #e2e8f0;
                border-bottom-left-radius: 2px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            }
            .ai-input-area {
                padding: 15px;
                background: white;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 10px;
            }
            .ai-input {
                flex: 1;
                background: #f1f5f9;
                color: #1e293b;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 10px 18px;
                font-size: 14px;
                outline: none;
                transition: all 0.2s;
            }
            .ai-input:focus {
                border-color: #020617;
                background: white;
                box-shadow: 0 0 0 3px rgba(2, 6, 23, 0.05);
            }
            .ai-send-btn {
                background: #020617;
                color: white;
                border: none;
                width: 42px;
                height: 42px;
                border-radius: 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }
            .ai-send-btn:hover {
                transform: scale(1.05);
            }
            .typing-indicator {
                display: flex;
                gap: 5px;
                padding: 8px 15px;
                background: #f1f5f9;
                border-radius: 10px;
                align-self: flex-start;
                margin-bottom: 5px;
                display: none;
            }
            .typing-dot {
                width: 6px;
                height: 6px;
                background: #94a3b8;
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out both;
            }
            .typing-dot:nth-child(1) { animation-delay: -0.32s; }
            .typing-dot:nth-child(2) { animation-delay: -0.16s; }
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            .ai-quick-btn {
                font-size: 11px;
                background: white;
                padding: 6px 14px;
                border-radius: 10px;
                border: 1px solid #e2e8f0;
                color: #475569;
                font-weight: 600;
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.2s;
            }
            .ai-quick-btn:hover {
                background: #f8fafc;
                border-color: #cbd5e1;
                color: #1e293b;
            }
        `;
        document.head.appendChild(style);
    }

    createChatWidget() {
        // Chat Button
        this.widgetBtn = document.createElement('div');
        this.widgetBtn.className = 'ai-widget-btn';
        this.widgetBtn.innerHTML = '<i class="fa-solid fa-microchip"></i>';
        this.widgetBtn.onclick = () => this.toggleChat();
        this.widgetBtn.id = 'mfg-ai-trigger';

        // Chat Window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'ai-chat-window';
        this.chatWindow.id = 'mfg-ai-window';
        this.chatWindow.innerHTML = `
            <div class="ai-header">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 35px; height: 35px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-brain" style="font-size: 18px;"></i>
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 15px;">MFG-Agent v1.0</div>
                        <div style="font-size: 10px; opacity: 0.7; letter-spacing: 0.5px;">SYSTEM INTELLIGENCE</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button id="ai-reset-btn" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer; border-radius: 6px; padding: 5px;" title="Reset Session">
                        <i class="fa-solid fa-rotate-right" style="font-size: 12px;"></i>
                    </button>
                    <button id="ai-close-btn" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 18px;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <div class="ai-messages" id="ai-messages">
                <div class="ai-message ai">
                    Accessing Manufacturing floor data... <br>
                    Hello <strong>${this.userContext.name || 'System Operator'}</strong>. I am your Manufacturing Intelligence Agent. I can help you analyze production efficiency, track inventory levels, and optimize machine utilization.
                </div>
            </div>
            <div class="typing-indicator" id="ai-typing" style="margin-left: 20px;">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <div style="padding: 10px; display: flex; gap: 8px; overflow-x: auto; background: white; border-top: 1px solid #f1f5f9;">
                <button class="ai-quick-btn" onclick="window.triggerMfgAI('production')">Production Report</button>
                <button class="ai-quick-btn" onclick="window.triggerMfgAI('inventory')">Low Stock Alert</button>
                <button class="ai-quick-btn" onclick="window.triggerMfgAI('machines')">Machine Health</button>
            </div>
            <div class="ai-input-area">
                <input type="text" class="ai-input" placeholder="Query mfg database..." id="ai-input">
                <button class="ai-send-btn" id="ai-send-btn">
                    <i class="fa-solid fa-arrow-up-long" style="font-size: 16px;"></i>
                </button>
            </div>
        `;

        // Bind events
        setTimeout(() => {
            const input = this.chatWindow.querySelector('#ai-input');
            const sendBtn = this.chatWindow.querySelector('#ai-send-btn');
            const closeBtn = this.chatWindow.querySelector('#ai-close-btn');
            const resetBtn = this.chatWindow.querySelector('#ai-reset-btn');

            if (closeBtn) closeBtn.onclick = () => this.toggleChat();
            if (resetBtn) resetBtn.onclick = () => this.clearHistory();

            const sendMessage = () => {
                const text = input.value.trim();
                if (!text) return;
                this.addMessage(text, 'user');
                input.value = '';
                this.processQuery(text);
            };

            sendBtn.onclick = sendMessage;
            input.onkeypress = (e) => {
                if (e.key === 'Enter') sendMessage();
            };
        }, 0);

        window.triggerMfgAI = (action) => {
            if (action === 'production') this.processQuery("Analyze today's production efficiency and list top performing machines.");
            if (action === 'inventory') this.processQuery("Give me a list of materials that are below reorder levels.");
            if (action === 'machines') this.processQuery("Check machine maintenance logs and identify any pending critical maintenance.");
        };
    }

    addToBody() {
        document.body.appendChild(this.widgetBtn);
        document.body.appendChild(this.chatWindow);
    }

    embedInContainer() {
        const container = document.getElementById(this.containerId);
        if (container) {
            this.widgetBtn.style.display = 'none';
            this.chatWindow.style.position = 'relative';
            this.chatWindow.style.bottom = 'auto';
            this.chatWindow.style.right = 'auto';
            this.chatWindow.style.width = '100%';
            this.chatWindow.style.height = '100%';
            this.chatWindow.style.minHeight = '600px';
            this.chatWindow.style.boxShadow = 'none';
            this.chatWindow.style.transform = 'none';
            this.chatWindow.style.opacity = '1';
            this.chatWindow.style.pointerEvents = 'all';
            this.chatWindow.classList.add('open');
            container.appendChild(this.chatWindow);
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.add('open');
            this.widgetBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            this.chatWindow.classList.remove('open');
            this.widgetBtn.innerHTML = '<i class="fa-solid fa-microchip"></i>';
        }
    }

    addMessage(text, sender) {
        const msgs = this.chatWindow.querySelector('#ai-messages');
        const div = document.createElement('div');
        div.className = `ai-message ${sender}`;
        
        // Simple MD-like formatting
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        div.innerHTML = formatted;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    async processQuery(query) {
        const typing = this.chatWindow.querySelector('#ai-typing');
        const messagesEl = this.chatWindow.querySelector('#ai-messages');

        typing.style.display = 'flex';
        messagesEl.scrollTop = messagesEl.scrollHeight;

        try {
            // Fetch latest data for context if available
            let mfgContext = "No live floor data available at the moment.";
            if (window.DataHandler) {
                const [production, inventory, machines] = await Promise.all([
                    DataHandler.fetchData('production').catch(() => []),
                    DataHandler.fetchData('inventory').catch(() => []),
                    DataHandler.fetchData('machines').catch(() => [])
                ]);
                mfgContext = `
                    Active Production: ${JSON.stringify(production.slice(0, 10))}
                    Inventory Status: ${JSON.stringify(inventory.slice(0, 10))}
                    Machine Assets: ${JSON.stringify(machines.slice(0, 10))}
                `;
            }

            const systemPrompt = `
                Role: Manufacturing Intelligence Agent (Explyra ERP)
                Creator: Mitanshu Bhasin
                
                Objective: Provide expert analysis of manufacturing floor data. 
                Focus Areas:
                1. Production Efficiency (Batch tracking, progress, delays)
                2. Inventory Optimization (Stock levels, reorder points, supplier analysis)
                3. Asset Management (Machine health, maintenance downtime)
                4. Operational Insights (Order fulfillment probability, bottleneck detection)

                Live Floor Data Context:
                ${mfgContext}

                Constraints:
                - Maintain a professional, data-centric persona.
                - Use **bold** for metrics and critical findings.
                - Be concise. Use bullet points for lists.
                - Respond in English or Hinglish as requested by user context.
            `;

            const messages = [
                { role: "system", content: systemPrompt },
                ...this.chatHistory,
                { role: "user", content: query }
            ];

            const response = await fetch(window.AI_CONFIG?.url || 'https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.AI_CONFIG?.apiKey || ''}`
                },
                body: JSON.stringify({
                    model: window.AI_CONFIG?.model || 'moonshotai/kimi-k2-instruct-0905',
                    messages: messages,
                    temperature: 0.6
                })
            });

            const data = await response.json();
            typing.style.display = 'none';

            if (data.choices && data.choices[0]) {
                const reply = data.choices[0].message.content;
                this.addMessage(reply, 'ai');
                
                this.chatHistory.push({ role: "user", content: query });
                this.chatHistory.push({ role: "assistant", content: reply });
                if (this.chatHistory.length > 15) this.chatHistory = this.chatHistory.slice(-15);
                this.saveHistory();
            }

        } catch (error) {
            console.error(error);
            typing.style.display = 'none';
            this.addMessage(`⚠️ System Error: Unable to reach intelligence module. ${error.message}`, 'ai');
        }
    }
}
