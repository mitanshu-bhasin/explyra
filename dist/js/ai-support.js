/**
 * Explyra AI Support Module — Agentic Admin Edition
 * Powered by Groq API (Kimi-K2)
 * 
 * This agent can TAKE ACTIONS on the admin dashboard:
 * SWITCH_TAB, APPROVE_EXPENSE, REJECT_EXPENSE, SEND_NOTIFICATION,
 * EXPORT_REPORT, SHOW_USER_INFO, ASSIGN_TASK, TOGGLE_THEME
 */

const GROQ_API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class AISupport {
    constructor(userContext = {}, containerId = null) {
        this.userContext = userContext || {};
        this.containerId = containerId;
        this.storageKey = `explyra_ai_history_${this.userContext.companyId || 'global'}`;
        this.chatHistory = this.loadHistory();
        this.isOpen = false;
        this.insightsShown = false;
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
        if (confirm("Start a new conversation? Current history will be wiped.")) {
            this.chatHistory = [];
            localStorage.removeItem(this.storageKey);
            const msgs = this.chatWindow.querySelector('#ai-messages');
            msgs.innerHTML = `
                <div class="ai-message ai">
                    Hello <strong>${this.userContext.name || 'Admin'}</strong>! Fresh session started. I'm your agentic AI — I can take actions on your dashboard. What would you like me to do?
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

        // Render saved history
        if (this.chatHistory.length > 0) {
            this.chatHistory.forEach(msg => {
                const cleanContent = msg.content.replace(/\[COMMAND:.*?\]/g, '').trim();
                if (cleanContent) {
                    this.addMessage(cleanContent, msg.role === 'assistant' ? 'ai' : 'user');
                }
            });
        }

        // Proactive admin insights after data loads
        setTimeout(() => this.showAdminInsights(), 5000);
    }

    // ══════════════ ADMIN INSIGHTS ENGINE ══════════════
    showAdminInsights() {
        if (this.insightsShown) return;
        this.insightsShown = true;

        const data = window.adminDashboardData || {};
        const stats = this.userContext.dashboardData?.stats || {};
        const insights = [];

        // Stale pending claims
        if (stats.pending > 5) {
            insights.push(`📋 **${stats.pending} claims** are awaiting action — consider batch processing.`);
        }

        // High rejection rate
        if (stats.rejected > 0 && stats.totalExpenses > 0) {
            const rate = Math.round((stats.rejected / stats.totalExpenses) * 100);
            if (rate > 20) {
                insights.push(`⚠️ Rejection rate is **${rate}%** — review guidelines with your team.`);
            }
        }

        // Approvals today
        if (data.approvedToday > 0) {
            insights.push(`✅ **${data.approvedToday}** claims approved today — great progress!`);
        }

        if (insights.length > 0) {
            this.pendingInsights = insights;
            // Show dot on widget
            if (this.widgetBtn) {
                const dot = document.createElement('div');
                dot.id = 'ai-insight-dot';
                dot.style.cssText = 'position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:#ef4444;border-radius:50%;border:2px solid white;animation:pulse 2s infinite';
                if (!this.widgetBtn.querySelector('#ai-insight-dot')) this.widgetBtn.appendChild(dot);
            }
        }
    }

    createStyles() {
        if (document.getElementById('ai-support-styles')) return;
        const style = document.createElement('style');
        style.id = 'ai-support-styles';
        style.textContent = `
            .ai-widget-btn {
                position: fixed !important;
                bottom: 24px !important;
                right: 24px !important;
                left: auto !important;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #5B8AF5, #1546C0);
                border-radius: 50%;
                box-shadow: 0 10px 25px rgba(30, 142, 62, 0.4);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: transform 0.3s, box-shadow 0.3s;
                z-index: 99999 !important;
                font-size: 24px;
            }
            .ai-widget-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 35px rgba(30, 142, 62, 0.5);
            }
            .ai-chat-window {
                position: fixed;
                bottom: 100px;
                right: 24px;
                left: auto;
                width: 400px;
                height: 620px;
                max-height: 80vh;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 999999 !important;
                transform-origin: bottom right;
                transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s;
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
                background: linear-gradient(135deg, #5B8AF5, #1546C0);
                padding: 16px;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .ai-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                background: var(--ai-bg-secondary, #f8fafc);
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .ai-message {
                max-width: 85%;
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 13px;
                line-height: 1.6;
                position: relative;
                word-wrap: break-word;
                animation: aiMsgIn 0.3s ease-out forwards;
            }
            @keyframes aiMsgIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .ai-message.user {
                align-self: flex-end;
                background: #1546C0;
                color: white;
                border-bottom-right-radius: 2px;
            }
            .ai-message.ai {
                align-self: flex-start;
                background: var(--ai-bg-primary, white);
                color: var(--ai-text-primary, #334155);
                border: 1px solid var(--ai-border, #e2e8f0);
                border-bottom-left-radius: 2px;
            }
            .ai-message.ai.action-badge {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 14px;
            }
            .ai-input-area {
                padding: 12px;
                background: var(--ai-bg-primary, white);
                border-top: 1px solid var(--ai-border, #e2e8f0);
                display: flex;
                gap: 8px;
            }
            .ai-input {
                flex: 1;
                background: var(--ai-bg-primary, white);
                color: var(--ai-text-primary, #334155);
                border: 1px solid var(--ai-border, #cbd5e1);
                border-radius: 20px;
                padding: 8px 16px;
                font-size: 13px;
                outline: none;
                transition: border-color 0.2s;
            }
            .ai-input:focus { border-color: #1546C0; }
            .ai-send-btn {
                background: #1546C0;
                color: white;
                border: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }
            .ai-send-btn:hover { background: #0f3596; }
            .ai-send-btn:disabled { background: #94a3b8; cursor: not-allowed; }
            .typing-indicator {
                display: none;
                gap: 4px;
                padding: 4px 8px;
                background: #f1f5f9;
                border-radius: 12px;
                align-self: flex-start;
                margin-bottom: 8px;
            }
            .typing-dot {
                width: 6px; height: 6px;
                background: #cbd5e1;
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out both;
            }
            .typing-dot:nth-child(1) { animation-delay: -0.32s; }
            .typing-dot:nth-child(2) { animation-delay: -0.16s; }
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
            }
            .ai-message.ai strong { font-weight: 600; color: var(--ai-text-strong, #1e293b); }
            .ai-message.ai ul { margin-left: 20px; list-style-type: disc; }
            .ai-message.ai p { margin-bottom: 8px; }
            .ai-message.ai p:last-child { margin-bottom: 0; }

            .ai-quick-btn {
                font-size: 11px;
                background: var(--ai-bg-primary, white);
                padding: 5px 12px;
                border-radius: 9999px;
                white-space: nowrap;
                transition: all 0.2s;
                cursor: pointer;
                font-weight: 600;
            }
            .ai-quick-btn.blue { border: 1px solid #bfdbfe; color: #2563eb; }
            .ai-quick-btn.blue:hover { background: #eff6ff; }
            .ai-quick-btn.green { border: 1px solid #bbf7d0; color: #16a34a; }
            .ai-quick-btn.green:hover { background: #f0fdf4; }
            .ai-quick-btn.amber { border: 1px solid #fde68a; color: #d97706; }
            .ai-quick-btn.amber:hover { background: #fffbeb; }
            .ai-quick-btn.purple { border: 1px solid #e9d5ff; color: #7c3aed; }
            .ai-quick-btn.purple:hover { background: #faf5ff; }

            [data-theme="dark"] .ai-chat-window,
            .dark .ai-chat-window {
                --ai-bg-primary: #1e293b;
                --ai-bg-secondary: #0f172a;
                --ai-text-primary: #f8fafc;
                --ai-text-strong: #ffffff;
                --ai-border: #334155;
                background: var(--ai-bg-primary);
                border-color: var(--ai-border);
            }
            [data-theme="dark"] .typing-indicator, .dark .typing-indicator { background: var(--ai-bg-primary); }
            [data-theme="dark"] .typing-dot, .dark .typing-dot { background: #64748b; }

            @media (max-width: 480px) {
                .ai-chat-window {
                    width: 100% !important; height: 100% !important;
                    max-height: 100% !important; bottom: 0 !important;
                    right: 0 !important; border-radius: 0 !important;
                    transform-origin: bottom center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createChatWidget() {
        // Chat Button
        this.widgetBtn = document.createElement('div');
        this.widgetBtn.className = 'ai-widget-btn';
        this.widgetBtn.innerHTML = '<i class="fa-solid fa-robot"></i>';
        this.widgetBtn.onclick = () => this.toggleChat();
        this.widgetBtn.id = 'ai-widget-trigger';


        // Chat Window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'ai-chat-window';
        this.chatWindow.innerHTML = `
            <div class="ai-header">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-sparkles"></i>
                    <div>
                        <span style="font-weight: 700; font-size: 14px;">Explyra AI Agent</span>
                        <div style="font-size: 10px; opacity: 0.7; margin-top: 1px;">Agentic • Can take actions</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="window.aiAssistant.clearHistory()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer; font-size: 10px; padding: 4px 8px; border-radius: 4px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;" title="New Chat">
                        <i class="fa-solid fa-plus mr-1"></i> New
                    </button>
                    <button id="ai-close-btn" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 16px;">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="ai-messages" id="ai-messages">
                <div class="ai-message ai">
                    Hello <strong>${this.userContext.name || 'Admin'}</strong>! I'm your <strong>Explyra AI Agent</strong>.<br><br>
                    I'm not just a chatbot — I can <strong>take actions</strong> on your admin dashboard:<br>
                    • 🔀 Switch between tabs<br>
                    • ✅ Approve or ❌ reject expenses<br>
                    • 📢 Send notifications<br>
                    • 📊 Export reports<br>
                    • 🔍 Look up employees<br>
                    • 📋 Assign tasks<br><br>
                    Try: <em>"Go to approvals"</em> or <em>"Show me the reports"</em>
                </div>
            </div>
            <div class="typing-indicator" id="ai-typing">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <div style="padding: 8px; display: flex; gap: 6px; overflow-x: auto; background: var(--ai-bg-secondary, #f8fafc); border-top: 1px solid var(--ai-border, #f1f5f9); scrollbar-width: none;" id="ai-quick-actions">
                <button class="ai-quick-btn blue" onclick="window.triggerAIAction('approvals')">⏳ Approvals</button>
                <button class="ai-quick-btn green" onclick="window.triggerAIAction('reports')">📊 Reports</button>
                <button class="ai-quick-btn amber" onclick="window.triggerAIAction('users')">👥 Users</button>
                <button class="ai-quick-btn purple" onclick="window.triggerAIAction('insights')">🧠 Insights</button>
                <button class="ai-quick-btn blue" onclick="window.triggerAIAction('tasks')">📋 Tasks</button>
                <button class="ai-quick-btn green" onclick="window.triggerAIAction('overview')">🏠 Overview</button>
                <button class="ai-quick-btn amber" onclick="window.triggerAIAction('theme')">🌙 Theme</button>
            </div>
            <!-- Admin Command Palette Popup -->
            <div id="admin-cmd-palette" style="display:none;position:absolute;bottom:54px;left:12px;right:12px;background:var(--ai-bg-primary,white);border:1px solid var(--ai-border,#e2e8f0);border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.12);max-height:280px;overflow-y:auto;z-index:10;scrollbar-width:thin">
                <div style="padding:10px 14px;border-bottom:1px solid var(--ai-border,#e2e8f0);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:var(--ai-bg-primary,white);z-index:1">
                    <span style="font-size:11px;font-weight:700;color:var(--ai-text-primary,#334155)">Admin Commands</span>
                    <span id="admin-cmd-close" style="cursor:pointer;font-size:12px;color:var(--ai-text-primary,#334155)"><i class="fa-solid fa-xmark"></i></span>
                </div>
                <div id="admin-cmd-list" style="padding:6px"></div>
            </div>
            <div class="ai-input-area" style="position:relative">
                <button id="admin-cmd-btn" title="Show Commands" style="background:none;border:1px solid var(--ai-border,#cbd5e1);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ai-text-primary,#334155);font-size:13px;font-weight:700;flex-shrink:0;transition:all 0.2s">/</button>
                <input type="text" class="ai-input" placeholder="Ask me anything or give a command..." id="ai-input">
                <button class="ai-send-btn" id="ai-send-btn">
                    <i class="fa-solid fa-paper-plane" style="font-size: 14px;"></i>
                </button>
            </div>
        `;

        // Build admin command palette
        this._buildAdminCommandPalette();

        // Bind events
        setTimeout(() => {
            const input = this.chatWindow.querySelector('#ai-input');
            const sendBtn = this.chatWindow.querySelector('#ai-send-btn');
            const closeBtn = this.chatWindow.querySelector('#ai-close-btn');

            if (closeBtn) closeBtn.onclick = () => this.toggleChat();

            const sendMessage = () => {
                const text = input.value.trim();
                if (!text) return;
                this.addMessage(text, 'user');
                input.value = '';

                // Try local fuzzy intent first — instant, no API call
                const localMatch = this.tryLocalIntent(text);
                if (localMatch) {
                    this.addMessage(localMatch.reply, 'ai');
                    this.handleCommand(localMatch.cmd, localMatch.payload);
                    return;
                }

                this.processQuery(text);
            };

            sendBtn.onclick = sendMessage;
            input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
        }, 0);

            // Direct-execute quick actions — no AI roundtrip!
            const oldAction = window.triggerAIAction;
            window.triggerAIAction = (action) => {
                const directMap = {
                    'approvals': { cmd: 'SWITCH_TAB', payload: { tab: 'approvals' }, reply: 'Switching to Approvals! ⏳' },
                    'reports': { cmd: 'SWITCH_TAB', payload: { tab: 'reports' }, reply: 'Opening Reports! 📊' },
                    'users': { cmd: 'SWITCH_TAB', payload: { tab: 'users' }, reply: 'Showing Users! 👥' },
                    'tasks': { cmd: 'SWITCH_TAB', payload: { tab: 'tasks' }, reply: 'Opening Tasks! 📋' },
                    'overview': { cmd: 'SWITCH_TAB', payload: { tab: 'overview' }, reply: 'Going to Overview! 🏠' },
                    'theme': { cmd: 'TOGGLE_THEME', payload: {}, reply: 'Theme toggled! 🌓' },
                    'insights': null // This one needs the LLM for analysis
                };
                const direct = directMap[action];
                if (direct) {
                    this.addMessage(`▶️ ${action.charAt(0).toUpperCase() + action.slice(1)}`, 'user');
                    this.addMessage(direct.reply, 'ai');
                    this.handleCommand(direct.cmd, direct.payload);
                } else if (typeof oldAction === 'function') {
                    oldAction(action);
                } else {
                    // Fall back to LLM for insights/complex queries
                    this.processQuery(`Analyze the dashboard data and give me actionable admin insights — pending claims, spending trends, user activity.`);
                }
            };
    }

    _buildAdminCommandPalette() {
        const commands = [
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Approvals', text: '@go to approvals', color: '#3b82f6' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Reports', text: '@go to reports', color: '#3b82f6' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Users', text: '@go to users', color: '#3b82f6' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Tasks', text: '@go to tasks', color: '#3b82f6' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Overview', text: '@go to overview', color: '#3b82f6' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Settings', text: '@go to settings', color: '#6b7280' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Audit', text: '@go to audit', color: '#6b7280' },
            { icon: 'fa-arrow-right-arrow-left', label: 'Go to Workflow', text: '@go to workflow', color: '#6b7280' },
            { icon: 'fa-stamp', label: 'Approve Expense', text: '@approve expense ', color: '#22c55e' },
            { icon: 'fa-xmark', label: 'Reject Expense', text: '@reject expense ', color: '#ef4444' },
            { icon: 'fa-bell', label: 'Send Notification', text: '@send notification ', color: '#f59e0b' },
            { icon: 'fa-clipboard-list', label: 'Assign Task', text: '@assign task ', color: '#22c55e' },
            { icon: 'fa-user-magnifying-glass', label: 'Search User', text: '@search user ', color: '#8b5cf6' },
            { icon: 'fa-download', label: 'Export Report', text: '@export report csv', color: '#16a34a' },
            { icon: 'fa-circle-half-stroke', label: 'Toggle Theme', text: '@toggle theme', color: '#8b5cf6' },
            { icon: 'fa-chart-line', label: 'AI Insights', text: '@analyze dashboard and give insights', color: '#f59e0b' },
        ];

        const palette = this.chatWindow.querySelector('#admin-cmd-palette');
        const list = this.chatWindow.querySelector('#admin-cmd-list');
        const btn = this.chatWindow.querySelector('#admin-cmd-btn');
        const closeBtn = this.chatWindow.querySelector('#admin-cmd-close');
        if (!palette || !list || !btn) return;

        list.innerHTML = commands.map(c => `
            <div class="admin-cmd-item" data-text="${c.text}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background 0.15s">
                <div style="width:28px;height:28px;border-radius:6px;background:${c.color}15;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    <i class="fa-solid ${c.icon}" style="font-size:11px;color:${c.color}"></i>
                </div>
                <div style="flex:1;min-width:0">
                    <div style="font-size:12px;font-weight:600;color:var(--ai-text-primary,#334155)">${c.label}</div>
                    <div style="font-size:10px;color:var(--ai-text-primary,#94a3b8);font-family:monospace;opacity:0.7">${c.text}</div>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('.admin-cmd-item').forEach(item => {
            item.onmouseenter = () => item.style.background = 'var(--ai-bg-secondary, #f8fafc)';
            item.onmouseleave = () => item.style.background = 'transparent';
            item.onclick = () => {
                const input = this.chatWindow.querySelector('#ai-input');
                if (input) {
                    input.value = item.getAttribute('data-text');
                    input.focus();
                    const len = input.value.length;
                    input.setSelectionRange(len, len);
                }
                palette.style.display = 'none';
            };
        });

        btn.onclick = () => {
            palette.style.display = palette.style.display === 'none' ? 'block' : 'none';
        };
        if (closeBtn) closeBtn.onclick = () => { palette.style.display = 'none'; };

        document.addEventListener('click', (e) => {
            if (!palette.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                palette.style.display = 'none';
            }
        });
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
            this.chatWindow.style.boxShadow = 'none';
            this.chatWindow.style.transform = 'none';
            this.chatWindow.style.opacity = '1';
            this.chatWindow.style.pointerEvents = 'all';
            this.chatWindow.classList.add('open');
            this.isOpen = true; // MUST set to true when embedded
            
            // Hide close button if embedded to prevent user from closing it permanently
            const closeBtn = this.chatWindow.querySelector('#ai-close-btn');
            if (closeBtn) closeBtn.style.display = 'none';
            
            container.appendChild(this.chatWindow);
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.add('open');
            this.widgetBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
            // Remove insight dot
            const dot = this.widgetBtn.querySelector('#ai-insight-dot');
            if (dot) dot.remove();
            // Show pending insights
            if (this.pendingInsights?.length > 0) {
                this.addMessage(`🧠 **Admin Agent Insights:**\n${this.pendingInsights.join('\n')}`, 'ai');
                this.pendingInsights = null;
            }
        } else {
            this.chatWindow.classList.remove('open');
            this.widgetBtn.innerHTML = '<i class="fa-solid fa-robot"></i>';
        }
    }

    // ══════════════ FUZZY LOCAL INTENT MATCHING ══════════════
    _fuzzyScore(input, target) {
        input = input.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        target = target.toLowerCase();
        if (input === target) return 1;
        if (input.includes(target) || target.includes(input)) return 0.8;
        let j = 0;
        for (let i = 0; i < input.length && j < target.length; i++) {
            if (input[i] === target[j]) j++;
        }
        return j / target.length;
    }

    _matchesAny(input, keywords) {
        return keywords.some(k => this._fuzzyScore(input, k) > 0.65);
    }

    tryLocalIntent(query) {
        const q = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

        // Tab navigation
        if (this._matchesAny(q, ['go to approvals', 'approvals', 'show approvals', 'approvls', 'aproval', 'pending claims', 'approvals dikhao'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'approvals'}, reply: 'Switching to Approvals! ⏳' };
        }
        if (this._matchesAny(q, ['go to reports', 'reports', 'show reports', 'repots', 'rports', 'financial reports'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'reports'}, reply: 'Opening Reports! 📊' };
        }
        if (this._matchesAny(q, ['go to users', 'users', 'show users', 'user management', 'employees', 'usrs'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'users'}, reply: 'Showing Users! 👥' };
        }
        if (this._matchesAny(q, ['go to tasks', 'tasks', 'show tasks', 'task manager', 'taks', 'takss'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'tasks'}, reply: 'Opening Tasks! 📋' };
        }
        if (this._matchesAny(q, ['go to overview', 'overview', 'dashboard', 'home', 'dasboard', 'main'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'overview'}, reply: 'Going to Overview! 🏠' };
        }
        if (this._matchesAny(q, ['go to settings', 'settings', 'settigns', 'setings', 'configuration'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'settings'}, reply: 'Opening Settings! ⚙️' };
        }
        if (this._matchesAny(q, ['go to audit', 'audit logs', 'audit', 'audt', 'logs'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'audit'}, reply: 'Opening Audit Logs! 🔍' };
        }
        if (this._matchesAny(q, ['go to chat', 'chat', 'messages', 'msges'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'chat'}, reply: 'Opening Chat! 💬' };
        }
        if (this._matchesAny(q, ['go to workflow', 'workflow', 'wrkflow', 'approval flow'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'workflow'}, reply: 'Opening Workflow! 🔀' };
        }
        if (this._matchesAny(q, ['go to roles', 'roles', 'role management', 'rols'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'roles'}, reply: 'Opening Roles! 🛡️' };
        }
        if (this._matchesAny(q, ['go to projects', 'projects', 'projecst', 'projcts'])) {
            return { cmd: 'SWITCH_TAB', payload: {tab:'projects'}, reply: 'Opening Projects! 📁' };
        }

        // Theme
        if (this._matchesAny(q, ['dark mode', 'light mode', 'toggle theme', 'theme', 'dark karo', 'night mode', 'theem'])) {
            return { cmd: 'TOGGLE_THEME', payload: {}, reply: 'Theme toggled! 🌓' };
        }

        // Export
        if (this._matchesAny(q, ['export csv', 'export report', 'download report', 'export pdf', 'eksport'])) {
            return { cmd: 'EXPORT_REPORT', payload: {format:'csv'}, reply: 'Exporting report! 📥' };
        }

        return null; // No local match — send to LLM
    }

    addMessage(text, sender) {
        const msgs = this.chatWindow.querySelector('#ai-messages');
        const div = document.createElement('div');
        div.className = `ai-message ${sender}`;
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        div.innerHTML = formatted;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    showActionBadge(icon, text, color = '#22c55e') {
        const msgs = this.chatWindow.querySelector('#ai-messages');
        const div = document.createElement('div');
        div.className = 'ai-message ai action-badge';
        div.style.cssText = `background:${color}10;border:1px solid ${color}30;`;
        div.innerHTML = `<i class="fa-solid ${icon}" style="color:${color};font-size:14px"></i><span style="font-size:12px;font-weight:600;color:${color}">${text}</span>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    // ══════════════ AGENTIC QUERY PROCESSING ══════════════
    async processQuery(query) {
        const typing = this.chatWindow.querySelector('#ai-typing');
        const messagesEl = this.chatWindow.querySelector('#ai-messages');

        // RATE LIMIT CHECK
        const RATE_LIMIT = 8;
        const TIME_FRAME = 60000;
        const now = Date.now();
        let timestamps = [];
        try { timestamps = JSON.parse(localStorage.getItem('explyra_ai_timestamps') || '[]'); } catch (e) { timestamps = []; }
        timestamps = timestamps.filter(t => now - t < TIME_FRAME);
        if (timestamps.length >= RATE_LIMIT) {
            const waitSecs = Math.ceil((timestamps[0] + TIME_FRAME - now) / 1000);
            this.addMessage(`⚠️ Rate limit exceeded. Please wait **${waitSecs}** seconds.`, 'ai');
            return;
        }
        timestamps.push(now);
        localStorage.setItem('explyra_ai_timestamps', JSON.stringify(timestamps));

        typing.style.display = 'flex';
        messagesEl.scrollTop = messagesEl.scrollHeight;

        try {
            const systemPrompt = `You are Explyra AI Agent — an AGENTIC assistant for the ADMIN dashboard of an expense management portal.
You are NOT just a chatbot. You can TAKE ACTIONS by emitting structured commands.

CURRENT USER: ${this.userContext.name || 'Admin'} (${this.userContext.role || 'ADMIN'})
COMPANY: ${this.userContext.companyId || 'N/A'}

═══ AVAILABLE TOOLS (emit as [COMMAND:TOOL_NAME:JSON_PAYLOAD]) ═══

1. SWITCH_TAB — Navigate admin dashboard tabs
   Payload: {"tab":"approvals"} — Options: overview, approvals, users, settings, reports, audit, tasks, projects, chat, workflow, roles

2. APPROVE_EXPENSE — Approve an expense (opens approval UI)
   Payload: {"expenseId":"ID"}
   (Only use if user specifically mentions an expense to approve)

3. REJECT_EXPENSE — Reject an expense (opens rejection UI)
   Payload: {"expenseId":"ID"}
   (Only use if user specifically mentions an expense to reject)

4. SEND_NOTIFICATION — Open the send notification flow
   Payload: {"message":"Reminder: Submit Q3 expenses"}

5. EXPORT_REPORT — Export admin reports
   Payload: {"format":"csv"} — Options: csv, pdf

6. SHOW_USER_INFO — Search/filter users
   Payload: {"search":"John"}

7. ASSIGN_TASK — Open task creation modal
   Payload: {"title":"Review Q3 expenses","assignTo":"employee-name"}

8. TOGGLE_THEME — Toggle dark/light mode
   Payload: {}

═══ DASHBOARD CONTEXT ═══
Stats: ${JSON.stringify(this.userContext.dashboardData?.stats || {})}
Employees: ${JSON.stringify((this.userContext.dashboardData?.employees || []).slice(0, 10))}
Monthly Trend: ${JSON.stringify(this.userContext.dashboardData?.monthlyTrend || {})}

═══ RULES ═══
- ALWAYS use [COMMAND:NAME:{}] format when taking an action. Place commands at the END of your reply.
- Be analytical, professional, helpful. Use Hinglish when the user does.
- Use **bold** for key metrics and findings.
- For navigation: map user intent → SWITCH_TAB (e.g., "show approvals" → tab:approvals).
- YOU MUST emit a command whenever the user asks you to DO something.
- Never hallucinate data; only use the provided context.
- When giving insights, be specific with numbers and actionable recommendations.`;

            const messages = [
                { role: "system", content: systemPrompt },
                ...this.chatHistory.slice(-14),
                { role: "user", content: query }
            ];

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: window.AI_CONFIG?.model || 'moonshotai/kimi-k2-instruct-0905',
                    messages: messages,
                    temperature: 0.6,
                    max_tokens: 1024
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(`${response.status}: ${errData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            typing.style.display = 'none';

            if (data.choices?.[0]?.message) {
                let reply = data.choices[0].message.content;

                // Extract and execute ALL commands
                const cmdRegex = /\[COMMAND:([A-Z_]+):(.*?)\]/g;
                let match;
                while ((match = cmdRegex.exec(reply)) !== null) {
                    const cmd = match[1];
                    let payload = {};
                    try { payload = JSON.parse(match[2]); } catch(e) { payload = {}; }
                    this.handleCommand(cmd, payload);
                }

                const displayReply = reply.replace(/\[COMMAND:.*?\]/g, '').trim();
                if (displayReply) this.addMessage(displayReply, 'ai');

                this.chatHistory.push({ role: "user", content: query });
                this.chatHistory.push({ role: "assistant", content: reply });
                if (this.chatHistory.length > 24) this.chatHistory = this.chatHistory.slice(-24);
                this.saveHistory();
            } else {
                this.addMessage("I'm having trouble processing that request right now.", 'ai');
            }

        } catch (error) {
            console.error('[AdminAI]', error);
            typing.style.display = 'none';
            this.addMessage(`⚠️ Error: ${error.message}. Please try again.`, 'ai');
        }
    }

    updateContext(newContext) {
        this.userContext = { ...this.userContext, ...newContext };
        // Re-check insights when context updates
        if (!this.insightsShown) {
            setTimeout(() => this.showAdminInsights(), 1000);
        }
    }

    // ══════════════ COMMAND EXECUTION ENGINE ══════════════
    handleCommand(command, payload) {
        console.log(`[AdminAI Agent] Executing: ${command}`, payload);

        switch (command) {
            case 'SWITCH_TAB':
                this._cmdSwitchTab(payload);
                break;
            case 'APPROVE_EXPENSE':
                this._cmdApproveExpense(payload);
                break;
            case 'REJECT_EXPENSE':
                this._cmdRejectExpense(payload);
                break;
            case 'SEND_NOTIFICATION':
                this._cmdSendNotification(payload);
                break;
            case 'EXPORT_REPORT':
                this._cmdExportReport(payload);
                break;
            case 'SHOW_USER_INFO':
                this._cmdShowUserInfo(payload);
                break;
            case 'ASSIGN_TASK':
                this._cmdAssignTask(payload);
                break;
            case 'TOGGLE_THEME':
                this._cmdToggleTheme();
                break;
            default:
                console.warn(`[AdminAI] Unknown command: ${command}`);
        }
    }

    _cmdSwitchTab(payload) {
        const tab = (payload.tab || '').toLowerCase();
        if (typeof window.switchTab === 'function' && tab) {
            window.switchTab(tab);
            this.showActionBadge('fa-arrow-right-arrow-left', `Action: Switched to ${tab} tab`, '#3b82f6');
        }
    }

    _cmdApproveExpense(payload) {
        if (payload.expenseId && typeof window.openExpenseDetail === 'function') {
            window.openExpenseDetail(payload.expenseId);
            this.showActionBadge('fa-stamp', `Action: Opening expense for approval`, '#22c55e');
        } else {
            // Navigate to approvals tab
            if (typeof window.switchTab === 'function') window.switchTab('approvals');
            this.showActionBadge('fa-arrow-right', 'Action: Navigated to Approvals', '#3b82f6');
        }
    }

    _cmdRejectExpense(payload) {
        if (payload.expenseId && typeof window.openExpenseDetail === 'function') {
            window.openExpenseDetail(payload.expenseId);
            this.showActionBadge('fa-xmark', `Action: Opening expense for rejection`, '#ef4444');
        } else {
            if (typeof window.switchTab === 'function') window.switchTab('approvals');
            this.showActionBadge('fa-arrow-right', 'Action: Navigated to Approvals', '#3b82f6');
        }
    }

    _cmdSendNotification(payload) {
        // Try to open notification modal or use the send notification function
        const btn = document.querySelector('[onclick*="sendNotification"]') || document.querySelector('[onclick*="openNotificationModal"]');
        if (btn) {
            btn.click();
            setTimeout(() => {
                const msgInput = document.getElementById('notif-message') || document.getElementById('notification-body');
                if (msgInput && payload.message) msgInput.value = payload.message;
            }, 300);
            this.showActionBadge('fa-bell', 'Action: Notification modal opened', '#f59e0b');
        } else {
            this.showActionBadge('fa-info-circle', 'Notification flow not available on this page', '#6b7280');
        }
    }

    _cmdExportReport(payload) {
        const fmt = (payload.format || 'csv').toLowerCase();
        if (typeof window.exportReport === 'function') {
            window.exportReport(fmt);
            this.showActionBadge('fa-download', `Action: Exporting ${fmt.toUpperCase()} report`, '#22c55e');
        } else {
            // Navigate to reports first
            if (typeof window.switchTab === 'function') window.switchTab('reports');
            this.showActionBadge('fa-arrow-right', 'Action: Navigated to Reports for export', '#3b82f6');
        }
    }

    _cmdShowUserInfo(payload) {
        if (typeof window.switchTab === 'function') window.switchTab('users');
        if (payload.search) {
            setTimeout(() => {
                const searchInput = document.getElementById('user-search') || document.querySelector('#content-area input[type="text"]');
                if (searchInput) {
                    searchInput.value = payload.search;
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }, 500);
        }
        this.showActionBadge('fa-user-magnifying-glass', `Action: Searching users for "${payload.search || 'all'}"`, '#8b5cf6');
    }

    _cmdAssignTask(payload) {
        if (typeof window.switchTab === 'function') window.switchTab('tasks');
        
        let attempts = 0;
        const fillTaskForm = setInterval(() => {
            const titleInput = document.getElementById('task-title');
            if (titleInput) {
                clearInterval(fillTaskForm);
                if (payload.title) titleInput.value = payload.title;

                const descInput = document.getElementById('task-desc');
                if (descInput && payload.description) descInput.value = payload.description;

                const assigneeSelect = document.getElementById('task-assignee');
                if (assigneeSelect && payload.assignee) {
                    for (let opt of assigneeSelect.options) {
                       if (opt.text.toLowerCase().includes(payload.assignee.toLowerCase()) || 
                           opt.value.toLowerCase().includes(payload.assignee.toLowerCase())) {
                           assigneeSelect.value = opt.value;
                           break;
                       }
                    }
                }

                // If due date provided add it, else default to tomorrow
                const dueDateInput = document.getElementById('task-due-date');
                if (dueDateInput) {
                    if (payload.dueDate) {
                        dueDateInput.value = payload.dueDate;
                    } else {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        dueDateInput.value = tomorrow.toISOString().split('T')[0];
                    }
                }
            }
            attempts++;
            if (attempts > 20) clearInterval(fillTaskForm); // Timeout after 10s
        }, 500);

        this.showActionBadge('fa-clipboard-list', `Action: Creating task "${payload.title || 'New Task'}"`, '#22c55e');
    }

    _cmdToggleTheme() {
        if (typeof window.toggleTheme === 'function') {
            window.toggleTheme();
            this.showActionBadge('fa-circle-half-stroke', 'Action: Theme toggled', '#8b5cf6');
        }
    }
}
