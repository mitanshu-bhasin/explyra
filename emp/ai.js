/**
 * Explyra Employee AI Agent — Agentic Edition
 * Powered by Groq API (Kimi-K2)
 * 
 * This agent can TAKE ACTIONS on the dashboard, not just answer questions.
 * Supported commands: CREATE_EXPENSE, NAVIGATE, TOGGLE_THEME, FILTER_EXPENSES,
 * SHOW_TASK_SUMMARY, OPEN_PROFILE, EXPORT_DATA, SHOW_INSIGHTS, MARK_TASK_DONE,
 * SHOW_SHORTCUTS
 */

const GROQ_API_KEY = window.EXPLYRA_CONFIG?.ai?.apiKey || window.GROQ_API_KEY || window.AI_CONFIG?.apiKey || 'MISSING_KEY';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class EmpAI {
    constructor() {
        this.isOpen = false;
        this.history = JSON.parse(localStorage.getItem('explyra_emp_ai_history') || '[]');
        this.insightsShown = false;
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
        this.welcomeMessage();
        // Proactive insights after data loads
        setTimeout(() => this.showProactiveInsights(), 3000);
    }

    // ══════════════ PROACTIVE INSIGHTS ENGINE ══════════════
    showProactiveInsights() {
        if (this.insightsShown) return;
        this.insightsShown = true;

        const insights = [];
        const expenses = window.expensesData || [];
        const tasks = window.empTasksData || [];
        const now = new Date();

        // 1. Stale pending claims (> 7 days)
        const staleClaims = expenses.filter(e => {
            if (['PAID', 'REJECTED', 'DRAFT'].includes(e.status)) return false;
            const created = e.createdAt?.toDate ? e.createdAt.toDate() : new Date(e.createdAt || 0);
            return (now - created) / 86400000 > 7;
        });
        if (staleClaims.length > 0) {
            insights.push(`⏳ You have **${staleClaims.length} claim${staleClaims.length > 1 ? 's' : ''}** pending for over 7 days.`);
        }

        // 2. Monthly spend summary
        const thisMonth = expenses.filter(e => {
            const d = e.createdAt?.toDate ? e.createdAt.toDate() : new Date(e.createdAt || 0);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const monthTotal = thisMonth.reduce((s, e) => s + (parseFloat(e.totalAmount) || 0), 0);
        if (monthTotal > 0) {
            insights.push(`💰 You've claimed **₹${monthTotal.toLocaleString()}** this month across **${thisMonth.length}** expense${thisMonth.length > 1 ? 's' : ''}.`);
        }

        // 3. Overdue tasks
        const overdue = tasks.filter(t => {
            if (t.status === 'COMPLETED') return false;
            return t.dueDate && new Date(t.dueDate) < now;
        });
        if (overdue.length > 0) {
            insights.push(`🔴 **${overdue.length} task${overdue.length > 1 ? 's are' : ' is'}** overdue! Consider completing "${overdue[0].title}" first.`);
        }

        // 4. No expenses yet
        if (expenses.length === 0) {
            insights.push(`📋 You haven't submitted any expense claims yet. Say "create expense" to get started!`);
        }

        if (insights.length > 0) {
            // Update the action chips dynamically
            this.updateDynamicChips(expenses, tasks);
            
            // Show a subtle notification dot
            const trigger = document.getElementById('emp-ai-trigger');
            if (trigger && !this.isOpen) {
                const dot = document.createElement('div');
                dot.className = 'emp-ai-notif-dot';
                dot.style.cssText = 'position:absolute;top:-2px;right:-2px;width:12px;height:12px;background:#ef4444;border-radius:50%;border:2px solid #000;animation:pulse 2s infinite';
                dot.id = 'emp-ai-dot';
                if (!trigger.querySelector('#emp-ai-dot')) trigger.appendChild(dot);
            }

            // Store for when user opens chat
            this.pendingInsights = insights;
        }
    }

    updateDynamicChips(expenses, tasks) {
        const chips = this.window?.querySelector('.emp-ai-actions');
        if (!chips) return;

        // Direct-execute buttons — these run the command INSTANTLY, no AI roundtrip
        const buttons = [];
        if (expenses.length === 0) {
            buttons.push({ label: '✨ New Expense', cmd: 'CREATE_EXPENSE', payload: {} });
        } else {
            buttons.push({ label: '📊 Insights', cmd: 'SHOW_INSIGHTS', payload: {} });
        }

        const pending = expenses.filter(e => !['PAID', 'REJECTED', 'DRAFT'].includes(e.status));
        if (pending.length > 0) {
            buttons.push({ label: `⏳ ${pending.length} Pending`, cmd: 'FILTER_EXPENSES', payload: {status: 'pending'} });
        }

        if (tasks.length > 0) {
            const todoTasks = tasks.filter(t => t.status !== 'COMPLETED');
            if (todoTasks.length > 0) {
                buttons.push({ label: `📋 ${todoTasks.length} Tasks`, cmd: 'SHOW_TASK_SUMMARY', payload: {} });
            }
        }

        buttons.push({ label: '📥 Export CSV', cmd: 'EXPORT_DATA', payload: {} });
        buttons.push({ label: '⌨️ Shortcuts', cmd: 'SHOW_SHORTCUTS', payload: {} });
        buttons.push({ label: '🧭 Tasks View', cmd: 'NAVIGATE', payload: {view:'tasks'} });
        buttons.push({ label: '🌙 Theme', cmd: 'TOGGLE_THEME', payload: {} });

        chips.innerHTML = buttons.map(b =>
            `<div class="action-chip" data-cmd="${b.cmd}" data-payload='${JSON.stringify(b.payload)}'>${b.label}</div>`
        ).join('');

        // Direct-execute on click — no AI call needed
        chips.querySelectorAll('.action-chip').forEach(chip => {
            chip.onclick = () => {
                const cmd = chip.getAttribute('data-cmd');
                const payload = JSON.parse(chip.getAttribute('data-payload') || '{}');
                this.addMessage(`▶️ ${chip.textContent.trim()}`, 'user', false);
                this.executeCommand(cmd, payload);
            };
        });
    }

    // ══════════════ FUZZY LOCAL INTENT MATCHING ══════════════
    // Catches common commands locally even with typos/Hinglish, skipping the API
    _fuzzyScore(input, target) {
        input = input.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        target = target.toLowerCase();
        if (input === target) return 1;
        if (input.includes(target) || target.includes(input)) return 0.8;
        // Simple Levenshtein-ish: count matching chars in order
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
        const q = query.toLowerCase().replace(/[^a-z0-9₹ ]/g, '').trim();

        // Navigation
        if (this._matchesAny(q, ['go to tasks', 'switch tasks', 'task view', 'tasks dikhao', 'show tasks', 'taks', 'open tasks'])) {
            return { cmd: 'NAVIGATE', payload: {view:'tasks'}, reply: 'Switching to Tasks view! 📋' };
        }
        if (this._matchesAny(q, ['go to claims', 'show claims', 'clams', 'expenses', 'switch claims', 'claims dikhao', 'show expenses'])) {
            return { cmd: 'NAVIGATE', payload: {view:'claims'}, reply: 'Switching to Claims view! 📝' };
        }
        if (this._matchesAny(q, ['go to messages', 'chat', 'messages', 'msges', 'msgs'])) {
            return { cmd: 'NAVIGATE', payload: {view:'messages'}, reply: 'Opening Messages! 💬' };
        }
        if (this._matchesAny(q, ['go to dashboard', 'home', 'dasboard', 'dashbord', 'main page'])) {
            return { cmd: 'NAVIGATE', payload: {view:'dashboard'}, reply: 'Going to Dashboard! 🏠' };
        }
        if (this._matchesAny(q, ['go to financials', 'finance', 'finacials', 'financial'])) {
            return { cmd: 'NAVIGATE', payload: {view:'financials'}, reply: 'Switching to Financials! 💰' };
        }

        // Theme
        if (this._matchesAny(q, ['dark mode', 'light mode', 'toggle theme', 'theme change', 'dark karo', 'night mode', 'theem'])) {
            return { cmd: 'TOGGLE_THEME', payload: {}, reply: 'Theme toggled! 🌓' };
        }

        // Export
        if (this._matchesAny(q, ['export csv', 'export data', 'download csv', 'csv download', 'data export', 'eksport'])) {
            return { cmd: 'EXPORT_DATA', payload: {}, reply: 'Exporting your expenses! 📥' };
        }

        // Profile
        if (this._matchesAny(q, ['open profile', 'my profile', 'profile dikhao', 'profle', 'proile'])) {
            return { cmd: 'OPEN_PROFILE', payload: {}, reply: 'Opening your profile! 👤' };
        }

        // Shortcuts
        if (this._matchesAny(q, ['keyboard shortcuts', 'shortcuts', 'shortcut', 'hotkeys', 'shrtcuts'])) {
            return { cmd: 'SHOW_SHORTCUTS', payload: {}, reply: 'Here are your shortcuts! ⌨️' };
        }

        // Insights
        if (this._matchesAny(q, ['show insights', 'spend analysis', 'spending', 'analytics', 'insghts', 'analyse'])) {
            return { cmd: 'SHOW_INSIGHTS', payload: {}, reply: 'Generating your spend analysis! 📊' };
        }

        // Task summary
        if (this._matchesAny(q, ['task summary', 'summarize tasks', 'pending tasks', 'taks summary', 'mera task'])) {
            return { cmd: 'SHOW_TASK_SUMMARY', payload: {}, reply: 'Here\'s your task summary! 📋' };
        }

        return null; // No local match — send to LLM
    }

    // ══════════════ UI CREATION ══════════════
    createWidget() {
        // Launcher
        const trigger = document.createElement('div');
        trigger.className = 'emp-ai-trigger';
        trigger.id = 'emp-ai-trigger';
        trigger.innerHTML = '<i class="fa-solid fa-robot"></i>';
        document.body.appendChild(trigger);
        this.trigger = trigger;

        // Window
        const win = document.createElement('div');
        win.className = 'emp-ai-window';
        win.id = 'emp-ai-window';
        win.innerHTML = `
            <div class="emp-ai-header">
                <div class="emp-ai-header-info">
                    <div class="emp-ai-avatar">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                    <div class="emp-ai-title">
                        <h4>Explyra AI Agent</h4>
                        <p>Agentic • Can take actions</p>
                    </div>
                </div>
                <div class="emp-ai-controls">
                    <div class="emp-ai-btn-small" id="emp-ai-clear" title="Clear Chat">
                        <i class="fa-solid fa-rotate-right"></i>
                    </div>
                    <div class="emp-ai-btn-small" id="emp-ai-close">
                        <i class="fa-solid fa-times"></i>
                    </div>
                </div>
            </div>
            <div class="emp-ai-messages" id="emp-ai-msgs"></div>
            <div class="typing" id="emp-ai-typing">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="emp-ai-actions">
                <div class="action-chip" data-query="How many expenses are pending?">Pending Status</div>
                <div class="action-chip" data-query="Analyze my spending patterns">Spend Analysis</div>
                <div class="action-chip" data-query="Create a dinner expense for 500 INR">Add Expense</div>
                <div class="action-chip" data-query="Show me my tasks and deadlines">My Tasks</div>
            </div>
            <!-- Command Palette Popup -->
            <div id="emp-cmd-palette" style="display:none;position:absolute;bottom:60px;left:12px;right:12px;background:var(--ai-secondary,#fff);border:1px solid var(--ai-border,#eaeaea);border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.12);max-height:280px;overflow-y:auto;z-index:10;scrollbar-width:thin">
                <div style="padding:10px 14px;border-bottom:1px solid var(--ai-border,#eaeaea);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:var(--ai-secondary,#fff);z-index:1">
                    <span style="font-size:11px;font-weight:700;color:var(--ai-text-main,#171717)">Available Commands</span>
                    <span id="emp-cmd-close" style="cursor:pointer;font-size:12px;color:var(--ai-text-muted,#666)"><i class="fa-solid fa-xmark"></i></span>
                </div>
                <div id="emp-cmd-list" style="padding:6px"></div>
            </div>
            <div class="emp-ai-input-wrapper" style="position:relative">
                <button id="emp-cmd-btn" title="Show Commands" style="background:none;border:1px solid var(--ai-border,#eaeaea);border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ai-text-muted,#666);font-size:13px;font-weight:700;flex-shrink:0;transition:all 0.2s">/</button>
                <input type="text" class="emp-ai-input" id="emp-ai-input" placeholder="Ask me anything or give a command...">
                <button class="emp-ai-send" id="emp-ai-send">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        `;
        document.body.appendChild(win);
        this.window = win;
        this.msgsContainer = win.querySelector('#emp-ai-msgs');
        this.input = win.querySelector('#emp-ai-input');
        this.sendBtn = win.querySelector('#emp-ai-send');
        this.typingIdx = win.querySelector('#emp-ai-typing');
        this.bindCommandPalette();
    }

    // ══════════════ COMMAND PALETTE ══════════════
    bindCommandPalette() {
        const commands = [
            { icon: 'fa-receipt', label: 'Create Expense', text: '@create expense for ₹', color: '#22c55e' },
            { icon: 'fa-compass', label: 'Go to Tasks', text: '@go to tasks', color: '#3b82f6' },
            { icon: 'fa-compass', label: 'Go to Claims', text: '@go to claims', color: '#3b82f6' },
            { icon: 'fa-compass', label: 'Go to Messages', text: '@go to messages', color: '#3b82f6' },
            { icon: 'fa-compass', label: 'Go to Financials', text: '@go to financials', color: '#3b82f6' },
            { icon: 'fa-compass', label: 'Go to Dashboard', text: '@go to dashboard', color: '#3b82f6' },
            { icon: 'fa-chart-pie', label: 'Spend Analysis', text: '@show insights', color: '#8b5cf6' },
            { icon: 'fa-file-csv', label: 'Export CSV', text: '@export csv', color: '#16a34a' },
            { icon: 'fa-clipboard-list', label: 'Task Summary', text: '@task summary', color: '#f59e0b' },
            { icon: 'fa-check-double', label: 'Mark Task Done', text: '@mark task done ', color: '#22c55e' },
            { icon: 'fa-filter', label: 'Filter Expenses', text: '@filter expenses ', color: '#f59e0b' },
            { icon: 'fa-moon', label: 'Toggle Theme', text: '@toggle theme', color: '#8b5cf6' },
            { icon: 'fa-user', label: 'Open Profile', text: '@open profile', color: '#6b7280' },
            { icon: 'fa-keyboard', label: 'Shortcuts', text: '@shortcuts', color: '#6b7280' },
        ];

        const palette = this.window.querySelector('#emp-cmd-palette');
        const list = this.window.querySelector('#emp-cmd-list');
        const btn = this.window.querySelector('#emp-cmd-btn');
        const closeBtn = this.window.querySelector('#emp-cmd-close');

        list.innerHTML = commands.map(c => `
            <div class="emp-cmd-item" data-text="${c.text}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background 0.15s">
                <div style="width:28px;height:28px;border-radius:6px;background:${c.color}15;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                    <i class="fa-solid ${c.icon}" style="font-size:11px;color:${c.color}"></i>
                </div>
                <div style="flex:1;min-width:0">
                    <div style="font-size:12px;font-weight:600;color:var(--ai-text-main,#171717)">${c.label}</div>
                    <div style="font-size:10px;color:var(--ai-text-muted,#666);font-family:monospace">${c.text}</div>
                </div>
            </div>
        `).join('');

        // Hover effect
        list.querySelectorAll('.emp-cmd-item').forEach(item => {
            item.onmouseenter = () => item.style.background = 'var(--ai-bg-msg-bot, #f9fafb)';
            item.onmouseleave = () => item.style.background = 'transparent';
            item.onclick = () => {
                this.input.value = item.getAttribute('data-text');
                this.input.focus();
                // Place cursor at end
                const len = this.input.value.length;
                this.input.setSelectionRange(len, len);
                palette.style.display = 'none';
            };
        });

        btn.onclick = () => {
            palette.style.display = palette.style.display === 'none' ? 'block' : 'none';
        };
        closeBtn.onclick = () => { palette.style.display = 'none'; };

        // Close palette when clicking outside
        document.addEventListener('click', (e) => {
            if (!palette.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                palette.style.display = 'none';
            }
        });
    }

    bindEvents() {
        this.trigger.onclick = () => this.toggle();
        this.window.querySelector('#emp-ai-close').onclick = () => this.toggle(false);
        this.window.querySelector('#emp-ai-clear').onclick = () => this.clear();

        this.sendBtn.onclick = () => this.handleSend();
        this.input.onkeypress = (e) => { if (e.key === 'Enter') this.handleSend(); };

        this.window.querySelectorAll('.action-chip').forEach(chip => {
            chip.onclick = () => {
                const query = chip.getAttribute('data-query');
                this.addMessage(query, 'user');
                this.process(query);
            };
        });
    }

    toggle(force) {
        this.isOpen = force !== undefined ? force : !this.isOpen;
        this.window.classList.toggle('open', this.isOpen);
        if (this.isOpen) {
            this.input.focus();
            this.trigger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            // Remove notification dot
            const dot = this.trigger.querySelector('#emp-ai-dot');
            if (dot) dot.remove();
            // Show pending insights
            if (this.pendingInsights && this.pendingInsights.length > 0) {
                const insightText = `🤖 **Agent Insights:**\n${this.pendingInsights.join('\n')}`;
                this.addMessage(insightText, 'ai');
                this.pendingInsights = null;
            }
        } else {
            this.trigger.innerHTML = '<i class="fa-solid fa-robot"></i>';
        }
    }

    clear() {
        if (confirm("Clear conversation history?")) {
            this.history = [];
            localStorage.removeItem('explyra_emp_ai_history');
            this.msgsContainer.innerHTML = '';
            this.welcomeMessage();
        }
    }

    welcomeMessage() {
        const name = window.userData?.name?.split(' ')[0] || 'there';
        this.addMessage(`Hi **${name}**! 👋 I'm your **Explyra AI Agent**.\n\nI'm not just a chatbot — I can **take actions** for you:\n• 📝 Create expenses\n• 🧭 Navigate your dashboard\n• ✅ Mark tasks as done\n• 📊 Analyze your spending\n• 📥 Export your data\n\nTry saying: *"Create a taxi expense for ₹500"* or *"Switch to tasks view"*`, 'ai', false);

        // Restore history
        if (this.history.length > 0) {
            this.history.forEach(m => {
                if (m.role !== 'system') {
                    this.addMessage(m.content, m.role === 'assistant' ? 'ai' : 'user', false);
                }
            });
        }
    }

    addMessage(text, role, save = true) {
        if (!text) return;
        const div = document.createElement('div');
        div.className = `msg ${role}`;

        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        div.innerHTML = html;
        this.msgsContainer.appendChild(div);
        this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;

        if (save) {
            this.history.push({ role: role === 'ai' ? 'assistant' : 'user', content: text });
            if (this.history.length > 20) this.history = this.history.slice(-20);
            localStorage.setItem('explyra_emp_ai_history', JSON.stringify(this.history));
        }
    }

    // Show an action confirmation badge in chat
    showActionBadge(icon, text, color = '#22c55e') {
        const div = document.createElement('div');
        div.className = 'msg ai';
        div.style.cssText = `background:${color}10;border:1px solid ${color}30;padding:10px 14px;display:flex;align-items:center;gap:8px`;
        div.innerHTML = `<i class="fa-solid ${icon}" style="color:${color};font-size:14px"></i><span style="font-size:12px;font-weight:600;color:${color}">${text}</span>`;
        this.msgsContainer.appendChild(div);
        this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;
    }

    async handleSend() {
        const val = this.input.value.trim();
        if (!val) return;
        this.input.value = '';
        this.addMessage(val, 'user');

        // Try local fuzzy intent first — instant, no API call
        const localMatch = this.tryLocalIntent(val);
        if (localMatch) {
            this.addMessage(localMatch.reply, 'ai');
            this.executeCommand(localMatch.cmd, localMatch.payload);
            return;
        }

        await this.process(val);
    }

    // ══════════════ AGENTIC PROCESSING ══════════════
    async process(query) {
        this.typingIdx.style.display = 'flex';
        this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;

        try {
            // Gather context
            const expensesSummary = (window.expensesData || []).slice(0, 15).map(e => ({
                id: e.id,
                title: e.title,
                amount: e.totalAmount,
                status: e.status,
                category: e.lineItems?.[0]?.category || 'Mixed',
                date: e.createdAt?.toDate ? e.createdAt.toDate().toDateString() : 'N/A'
            }));

            const tasksSummary = (window.empTasksData || []).slice(0, 10).map(t => ({
                id: t.id,
                title: t.title,
                status: t.status,
                dueDate: t.dueDate || 'N/A',
                assignedBy: t.assignedBy || 'Manager'
            }));

            const systemPrompt = `You are Explyra AI Agent — an AGENTIC assistant for an expense management portal.
You are NOT just a chatbot. You can TAKE ACTIONS on the user's dashboard by emitting structured commands.

CURRENT USER: ${window.userData?.name || 'Employee'} (${window.userData?.role || 'EMPLOYEE'})

═══ AVAILABLE TOOLS (emit as [COMMAND:TOOL_NAME:JSON_PAYLOAD]) ═══

1. CREATE_EXPENSE — Pre-fill and open expense form
   Payload: {"title":"Dinner","amount":1500,"category":"Food","description":"Client meeting"}

2. NAVIGATE — Switch dashboard view  
   Payload: {"view":"tasks"} — Options: claims, tasks, financials, messages, dashboard

3. TOGGLE_THEME — Toggle dark/light mode
   Payload: {}

4. FILTER_EXPENSES — Filter the expense list
   Payload: {"search":"hotel","status":"PENDING_MANAGER"}

5. MARK_TASK_DONE — Mark a task as completed
   Payload: {"taskId":"TASK_ID_HERE"}

6. OPEN_PROFILE — Open user profile modal
   Payload: {}

7. EXPORT_DATA — Export expenses as CSV
   Payload: {}

8. SHOW_INSIGHTS — Show spend analysis
   Payload: {}

9. SHOW_SHORTCUTS — Show keyboard shortcuts overlay
   Payload: {}

10. SHOW_TASK_SUMMARY — Display a task overview card
    Payload: {}

═══ EXPENSE DATA (${expensesSummary.length} recent) ═══
${JSON.stringify(expensesSummary)}

═══ TASK DATA (${tasksSummary.length} items) ═══
${JSON.stringify(tasksSummary)}

═══ RULES ═══
- ALWAYS use [COMMAND:NAME:{}] format when taking an action. Put commands at the END of your reply.
- Be conversational, professional, and friendly. Use Hinglish if natural.
- Use **bold** for numbers, statuses, and key info.
- NEVER hallucinate data. Only reference what is provided above.
- When creating expenses, extract title, amount, category from the user's message.
- For navigation: map user intent (e.g. "show tasks" → NAVIGATE to tasks).
- For marking tasks done, find the matching task ID from the data above.
- YOU MUST emit a command whenever the user asks you to DO something (navigate, create, export, etc).`;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: window.AI_CONFIG?.model || 'moonshotai/kimi-k2-instruct-0905',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...this.history.slice(-12),
                        { role: 'user', content: query }
                    ],
                    temperature: 0.6,
                    max_tokens: 800
                })
            });

            const data = await response.json();
            this.typingIdx.style.display = 'none';

            if (data.choices?.[0]?.message?.content) {
                let reply = data.choices[0].message.content;

                // Extract and execute ALL commands
                const cmdRegex = /\[COMMAND:([A-Z_]+):(.*?)\]/g;
                let match;
                const executedCmds = [];
                while ((match = cmdRegex.exec(reply)) !== null) {
                    const cmd = match[1];
                    let payload = {};
                    try { payload = JSON.parse(match[2]); } catch(e) { payload = {}; }
                    this.executeCommand(cmd, payload);
                    executedCmds.push(cmd);
                }

                // Clean reply text
                reply = reply.replace(/\[COMMAND:.*?\]/g, '').trim();
                if (reply) this.addMessage(reply, 'ai');

            } else {
                this.addMessage("I'm having trouble connecting right now. Please try again.", 'ai');
            }
        } catch (e) {
            console.error('[EmpAI] Error:', e);
            this.typingIdx.style.display = 'none';
            this.addMessage("⚠️ Connection error. Please check your network and try again.", 'ai');
        }
    }

    // ══════════════ COMMAND EXECUTION ENGINE ══════════════
    executeCommand(cmd, payload) {
        console.log(`[EmpAI Agent] Executing: ${cmd}`, payload);

        switch (cmd) {
            case 'CREATE_EXPENSE':
                this._cmdCreateExpense(payload);
                break;
            case 'NAVIGATE':
                this._cmdNavigate(payload);
                break;
            case 'TOGGLE_THEME':
                this._cmdToggleTheme();
                break;
            case 'FILTER_EXPENSES':
                this._cmdFilterExpenses(payload);
                break;
            case 'MARK_TASK_DONE':
                this._cmdMarkTaskDone(payload);
                break;
            case 'OPEN_PROFILE':
                this._cmdOpenProfile();
                break;
            case 'EXPORT_DATA':
                this._cmdExportData();
                break;
            case 'SHOW_INSIGHTS':
                this._cmdShowInsights();
                break;
            case 'SHOW_SHORTCUTS':
                this._cmdShowShortcuts();
                break;
            case 'SHOW_TASK_SUMMARY':
                this._cmdShowTaskSummary();
                break;
            default:
                console.warn(`[EmpAI] Unknown command: ${cmd}`);
        }
    }

    _cmdCreateExpense(payload) {
        if (typeof window.openCreateModal === 'function') {
            window.openCreateModal('EXPENSE');
            // Pre-fill form after modal opens
            setTimeout(() => {
                const container = document.getElementById('line-items-container');
                if (container && container.children.length > 0) {
                    const firstRow = container.children[0];
                    const descEl = firstRow.querySelector('.item-desc');
                    const amountEl = firstRow.querySelector('.item-amount');
                    const catEl = firstRow.querySelector('.item-category');

                    if (descEl && (payload.description || payload.title)) descEl.value = payload.description || payload.title;
                    if (amountEl && payload.amount) {
                        amountEl.value = payload.amount;
                        if (typeof calculateTotal === 'function') calculateTotal();
                        else if (window.calculateTotal) window.calculateTotal();
                    }
                    if (catEl && payload.category) {
                        for (let opt of catEl.options) {
                            if (opt.value.toLowerCase().includes(payload.category.toLowerCase())) {
                                catEl.value = opt.value;
                                break;
                            }
                        }
                    }
                }
            }, 500);
        }
        this.showActionBadge('fa-receipt', `Action: Opening expense form — "${payload.title || 'New Expense'}"`, '#22c55e');
    }

    _cmdNavigate(payload) {
        const view = (payload.view || '').toLowerCase();
        const viewMap = {
            'claims': 'claims', 'expenses': 'claims',
            'tasks': 'tasks',
            'financials': 'financials', 'finance': 'financials',
            'messages': 'messages', 'chat': 'messages',
            'dashboard': 'dashboard', 'home': 'dashboard'
        };
        const mapped = viewMap[view];
        if (mapped === 'messages' && typeof window.toggleMainView === 'function') {
            window.toggleMainView('messages');
            this.showActionBadge('fa-comments', 'Action: Navigated to Messages', '#3b82f6');
        } else if (mapped === 'dashboard' && typeof window.toggleMainView === 'function') {
            window.toggleMainView('dashboard');
            this.showActionBadge('fa-home', 'Action: Navigated to Dashboard', '#3b82f6');
        } else if (mapped && typeof window.toggleEmpView === 'function') {
            window.toggleEmpView(mapped);
            this.showActionBadge('fa-compass', `Action: Switched to ${mapped} view`, '#3b82f6');
        }
    }

    _cmdToggleTheme() {
        if (typeof window.toggleTheme === 'function') {
            window.toggleTheme();
            this.showActionBadge('fa-moon', 'Action: Theme toggled', '#8b5cf6');
        }
    }

    _cmdFilterExpenses(payload) {
        if (payload.search) {
            const searchInput = document.getElementById('expense-search') || document.querySelector('[placeholder*="Search"]');
            if (searchInput) {
                searchInput.value = payload.search;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                this.showActionBadge('fa-filter', `Action: Filtered expenses for "${payload.search}"`, '#f59e0b');
            }
        }
    }

    _cmdMarkTaskDone(payload) {
        if (payload.taskId && typeof window.updateTaskStatus === 'function') {
            window.updateTaskStatus(payload.taskId, 'COMPLETED');
            this.showActionBadge('fa-check-double', 'Action: Task marked as completed!', '#22c55e');
        } else {
            this.showActionBadge('fa-circle-exclamation', 'Could not find that task', '#ef4444');
        }
    }

    _cmdOpenProfile() {
        if (typeof window.openProfileModal === 'function') {
            window.openProfileModal();
            this.showActionBadge('fa-user', 'Action: Profile opened', '#8b5cf6');
        }
    }

    _cmdExportData() {
        const expenses = window.expensesData || [];
        if (expenses.length === 0) {
            this.showActionBadge('fa-circle-exclamation', 'No expenses to export', '#f59e0b');
            return;
        }
        let csv = 'Title,Amount,Status,Date,Category\n';
        expenses.forEach(e => {
            const date = e.createdAt?.toDate ? e.createdAt.toDate().toLocaleDateString() : 'N/A';
            const cat = e.lineItems?.[0]?.category || 'Mixed';
            csv += `"${e.title}",${e.totalAmount || 0},"${e.status}","${date}","${cat}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `explyra-expenses-${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        this.showActionBadge('fa-file-csv', `Action: Exported ${expenses.length} expenses as CSV`, '#22c55e');
    }

    _cmdShowInsights() {
        const expenses = window.expensesData || [];
        if (expenses.length === 0) return;

        const now = new Date();
        const thisMonth = expenses.filter(e => {
            const d = e.createdAt?.toDate ? e.createdAt.toDate() : new Date(e.createdAt || 0);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });

        // Category breakdown
        const categories = {};
        expenses.forEach(e => {
            if (e.lineItems) {
                e.lineItems.forEach(item => {
                    const cat = item.category || 'Other';
                    categories[cat] = (categories[cat] || 0) + (item.amount || 0);
                });
            }
        });

        const topCat = Object.entries(categories).sort((a,b) => b[1] - a[1])[0];
        const totalSpent = expenses.reduce((s, e) => s + (parseFloat(e.totalAmount) || 0), 0);
        const paidAmount = expenses.filter(e => e.status === 'PAID').reduce((s, e) => s + (parseFloat(e.totalAmount) || 0), 0);

        let insight = `📊 **Your Expense Analytics:**\n`;
        insight += `• Total claimed: **₹${totalSpent.toLocaleString()}** across **${expenses.length}** claims\n`;
        insight += `• Paid so far: **₹${paidAmount.toLocaleString()}**\n`;
        insight += `• This month: **${thisMonth.length}** claims\n`;
        if (topCat) insight += `• Top category: **${topCat[0]}** (₹${topCat[1].toLocaleString()})`;

        this.addMessage(insight, 'ai');
        this.showActionBadge('fa-chart-pie', 'Insights generated from your data', '#8b5cf6');
    }

    _cmdShowShortcuts() {
        if (typeof window.openKbdOverlay === 'function') {
            window.openKbdOverlay();
            this.showActionBadge('fa-keyboard', 'Action: Shortcuts panel opened', '#6b7280');
        }
    }

    _cmdShowTaskSummary() {
        const tasks = window.empTasksData || [];
        if (tasks.length === 0) {
            this.addMessage("You don't have any tasks assigned right now. 🎉", 'ai');
            return;
        }
        const pending = tasks.filter(t => t.status === 'PENDING').length;
        const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
        const completed = tasks.filter(t => t.status === 'COMPLETED').length;

        let summary = `📋 **Task Summary:**\n`;
        summary += `• **${pending}** pending\n`;
        summary += `• **${inProgress}** in progress\n`;
        summary += `• **${completed}** completed\n\n`;
        summary += `Your most urgent tasks:\n`;

        const urgent = tasks.filter(t => t.status !== 'COMPLETED').slice(0, 3);
        urgent.forEach((t, i) => {
            const overdue = t.dueDate && new Date(t.dueDate) < new Date() ? ' 🔴 OVERDUE' : '';
            summary += `${i+1}. "${t.title}" — ${t.status.replace('_', ' ')}${overdue}\n`;
        });

        this.addMessage(summary, 'ai');
    }
}
