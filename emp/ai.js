/**
 * Explyra Employee AI Agent - Specialized for Expense Management
 * Powered by Groq API
 */

const GROQ_API_KEY = window.EXPLYRA_CONFIG?.ai?.apiKey || 'MISSING_KEY';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export class EmpAI {
    constructor() {
        this.isOpen = false;
        this.history = JSON.parse(localStorage.getItem('explyra_emp_ai_history') || '[]');
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
        this.welcomeMessage();
    }

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
                        <h4>Explyra AI Assistant</h4>
                        <p>Specialized for Employees</p>
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
                <div class="action-chip" data-query="Total amount paid to me?">Paid History</div>
                <div class="action-chip" data-query="Create a dinner expense for 500 INR">Add Dinner Expense</div>
                <div class="action-chip" data-query="Help me audit my claims">Audit Claims</div>
            </div>
            <div class="emp-ai-input-wrapper">
                <input type="text" class="emp-ai-input" id="emp-ai-input" placeholder="Type a message or command...">
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
        this.addMessage(`Hi **${name}**! 👋 I'm your personal Explyra AI Assistant.\n\nI can help you track your expenses, check claim status, or even help you create new ones. Kya help karoon aapki aaj?`, 'ai');
        
        // Restore history if any
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
        
        // Basic Markdown-ish formatting
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        div.innerHTML = html;
        this.msgsContainer.appendChild(div);
        this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;

        if (save) {
            this.history.push({ role: role === 'ai' ? 'assistant' : 'user', content: text });
            if (this.history.length > 15) this.history = this.history.slice(-15);
            localStorage.setItem('explyra_emp_ai_history', JSON.stringify(this.history));
        }
    }

    async handleSend() {
        const val = this.input.value.trim();
        if (!val) return;
        this.input.value = '';
        this.addMessage(val, 'user');
        await this.process(val);
    }

    async process(query) {
        this.typingIdx.style.display = 'flex';
        this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;

        try {
            const expensesSummary = window.expensesData?.map(e => ({
                title: e.title,
                amt: e.totalAmount,
                status: e.status,
                date: e.createdAt?.toDate ? e.createdAt.toDate().toDateString() : 'N/A'
            })) || [];

            const systemPrompt = `
                You are Explyra Employee AI, an autonomous assistant for an expense tracker.
                Company: Explyra. Developer: Mitanshu Bhasin.
                
                Current User: ${window.userData?.name || 'Unknown'} (${window.userData?.role || 'Employee'})
                
                Expense Data: ${JSON.stringify(expensesSummary.slice(0, 10))}
                
                Capabilities:
                1. Status Report: Tell user how many expenses are pending/paid.
                2. Audit: Check if any expense looks suspicious (too high) or missing details.
                3. Create Expense: If user wants to create an expense, provide a command:
                   [COMMAND:CREATE_EXPENSE:{"title": "Dinner at Taj", "amount": 1500, "category": "Food", "description": "Client meeting"}]
                4. Informational: Answer questions about the company or the portal.
                
                Response Style:
                - Professional yet friendly.
                - Use Hinglish if natural.
                - Use **bold** for numbers and status.
                - NEVER hallucinate expense data. Only use what is provided.
            `;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'moonshotai/kimi-k2-instruct-0905',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...this.history.slice(-10),
                        { role: 'user', content: query }
                    ],
                    temperature: 0.7,
                    max_tokens: 512
                })
            });

            const data = await response.json();
            this.typingIdx.style.display = 'none';

            if (data.choices?.[0]?.message?.content) {
                let reply = data.choices[0].message.content;

                // Handle Commands
                if (reply.includes('[COMMAND:')) {
                    const match = reply.match(/\[COMMAND:(.*?):(.*?)\]/);
                    if (match) {
                        const cmd = match[1];
                        const payload = JSON.parse(match[2]);
                        this.executeCommand(cmd, payload);
                        reply = reply.replace(/\[COMMAND:.*?\]/g, '').trim();
                    }
                }

                this.addMessage(reply || "I've processed your request.", 'ai');
            }
        } catch (e) {
            console.error(e);
            this.typingIdx.style.display = 'none';
            this.addMessage("Sorry, connection issue. Please try again.", 'ai');
        }
    }

    executeCommand(cmd, payload) {
        if (cmd === 'CREATE_EXPENSE') {
            if (window.createExpenseFromAI) {
                window.createExpenseFromAI({
                    title: payload.title || 'New Expense',
                    amount: payload.amount || 0,
                    category: payload.category || 'Other',
                    description: payload.description || ''
                });
                this.addMessage("Maine aapke liye expense form ready kar diya hai. Please check and submit it! 📝", 'ai');
            }
        }
    }
}

// Global initialization
window.addEventListener('load', () => {
    if (window.location.pathname.includes('emp.html')) {
        setTimeout(() => {
            window.empAI = new EmpAI();
        }, 1000);
    }
});
