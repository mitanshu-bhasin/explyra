/**
 * Explyra AI Dashboard Logic
 * Provides a deep integration with Audit Logs and Task Manager.
 */

import { GROQ_API_KEY, API_URL } from './ai-support.js'; // Reuse existing config if possible, else use global

export class AIDashboard {
    constructor(userContext = {}) {
        this.userContext = userContext || {};
        this.containerId = 'ai-dashboard-container';
        this.storageKey = `explyra_ai_dashboard_history_${this.userContext.companyId || 'global'}`;
        this.chatHistory = this.loadHistory();
        this.rateLimit = 5;
        this.timeFrame = 60000; // 1 minute
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
            localStorage.setItem(this.storageKey, JSON.stringify(this.chatHistory.slice(-20)));
        } catch (e) {
            console.error("Error saving chat history", e);
        }
    }

    clearHistory() {
        if (confirm("Start a new conversation? Current history will be wiped.")) {
            this.chatHistory = [];
            localStorage.removeItem(this.storageKey);
            this.renderInitialMessage();
        }
    }

    async init() {
        this.renderInitialMessage();
        this.setupEventListeners();
        
        // Render saved history
        if (this.chatHistory.length > 0) {
            this.chatHistory.forEach(msg => {
                this.addMessage(msg.content, msg.role === 'assistant' ? 'ai' : 'user');
            });
        }
    }

    renderInitialMessage() {
        const msgs = document.getElementById('ai-messages');
        if (!msgs) return;
        msgs.innerHTML = `
            <div class="ai-message ai glass-card animate-in">
                <p>Welcome to the <strong>AI Command Dashboard</strong>, ${this.userContext.name || 'Admin'}.</p>
                <p>I am synchronized with your <strong>Audit Logs</strong> and <strong>Task Manager</strong>. How can I assist you with your workspace analysis today?</p>
            </div>
        `;
    }

    setupEventListeners() {
        const input = document.getElementById('ai-input');
        const sendBtn = document.getElementById('ai-send-btn');

        if (sendBtn) {
            sendBtn.onclick = () => this.handleUserInput();
        }
        if (input) {
            input.onkeypress = (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            };
        }

        // Quick Action Buttons
        window.triggerQuickAction = (topic) => {
            let query = '';
            switch (topic) {
                case 'tasks':
                    query = "Give me a summary of all pending tasks in the Task Manager.";
                    break;
                case 'audit':
                    query = "Analyze the recent audit logs and highlight any unusual activity.";
                    break;
                case 'overview':
                    query = "Provide an overall health check of the workspace based on tasks and audit data.";
                    break;
                case 'payroll':
                    query = "Analyze current payroll status and suggest if any audits are needed.";
                    break;
            }
            if (query) {
                input.value = query;
                this.handleUserInput();
            }
        };
    }

    handleUserInput() {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        if (!this.checkRateLimit()) return;

        this.addMessage(text, 'user');
        input.value = '';
        this.processQuery(text);
    }

    checkRateLimit() {
        const now = Date.now();
        let timestamps = [];
        try {
            timestamps = JSON.parse(localStorage.getItem('explyra_ai_dashboard_ts') || '[]');
        } catch (e) { timestamps = []; }

        timestamps = timestamps.filter(t => now - t < this.timeFrame);
        
        if (timestamps.length >= this.rateLimit) {
            const oldest = timestamps[0];
            const waitSecs = Math.ceil((oldest + this.timeFrame - now) / 1000);
            this.addMessage(`⚠️ Rate limit reached. Please wait ${waitSecs} seconds before the next message.`, 'ai');
            return false;
        }

        timestamps.push(now);
        localStorage.setItem('explyra_ai_dashboard_ts', JSON.stringify(timestamps));
        return true;
    }

    addMessage(text, sender) {
        const msgs = document.getElementById('ai-messages');
        if (!msgs) return;

        const div = document.createElement('div');
        div.className = `ai-message ${sender} glass-card animate-in`;
        
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        div.innerHTML = formatted;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    async processQuery(query) {
        const typing = document.getElementById('ai-typing');
        if (typing) typing.classList.remove('hidden');

        try {
            // Load Context for specialized topics
            const contextData = await this.gatherContext(query);

            const systemPrompt = `
                You are the Explyra AI Dashboard Intelligence.
                Focus Area: Audit Logs, Task Management, and Workspace Analytics.
                
                Current User: ${this.userContext.name} (${this.userContext.role})
                Company ID: ${this.userContext.companyId}

                Context Provided:
                - Tasks: ${JSON.stringify(contextData.tasks || [])}
                - Audit Logs (Expense History): ${JSON.stringify(contextData.audit || [])}
                - General Stats: ${JSON.stringify(this.userContext.dashboardData || {})}

                Rules:
                1. Be analytical, professional, and precise.
                2. If the user asks about tasks, refer to the provided task data.
                3. If the user asks about audits or history, refer to the audit/expense history data.
                4. Keep responses concise but insightful.
                5. Use **bold** for key metrics and findings.
            `;

            const messages = [
                { role: "system", content: systemPrompt },
                ...this.chatHistory,
                { role: "user", content: query }
            ];

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`
                },
                body: JSON.stringify({
                    model: 'moonshotai/kimi-k2-instruct-0905',
                    messages: messages,
                    temperature: 0.6,
                    max_tokens: 1024
                })
            });

            if (!response.ok) throw new Error("AI Service unavailable");

            const data = await response.json();
            if (typing) typing.classList.add('hidden');

            if (data.choices && data.choices[0] && data.choices[0].message) {
                const reply = data.choices[0].message.content;
                this.addMessage(reply, 'ai');

                this.chatHistory.push({ role: "user", content: query });
                this.chatHistory.push({ role: "assistant", content: reply });
                this.saveHistory();
            }

        } catch (error) {
            console.error(error);
            if (typing) typing.classList.add('hidden');
            this.addMessage("⚠️ System error occurred. I am unable to process your request at this moment.", "ai");
        }
    }

    async gatherContext(query) {
        const lower = query.toLowerCase();
        const context = { tasks: [], audit: [] };

        const db = window.db; 
        if (!db) return context;

        try {
            // Fetch Tasks
            if (lower.includes('task')) {
                const taskRef = window.collection(db, "tasks");
                const q = window.query(taskRef, window.where("companyId", "==", this.userContext.companyId), window.limit(10));
                const snap = await window.getDocs(q);
                snap.forEach(d => {
                    const data = d.data();
                    context.tasks.push({ 
                        title: data.title, 
                        status: data.status, 
                        assignedTo: data.assignedTo,
                        dueDate: data.dueDate
                    });
                });
            }

            // Fetch Audit Logs (Expense History)
            if (lower.includes('audit') || lower.includes('log') || lower.includes('history')) {
                const expenseRef = window.collection(db, "expenses");
                const q = window.query(expenseRef, window.where("companyId", "==", this.userContext.companyId), window.limit(10));
                const snap = await window.getDocs(q);
                snap.forEach(d => {
                    const data = d.data();
                    if (data.history && Array.isArray(data.history)) {
                        // Get latest history entry
                        const latestHistory = data.history.slice(-3); // Get last 3 events
                        context.audit.push({ 
                            expenseTitle: data.title, 
                            amount: data.totalAmount,
                            recentAuditHistory: latestHistory.map(h => ({
                                action: h.action,
                                by: h.by,
                                date: h.date?.toDate ? h.date.toDate() : h.date
                            }))
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Context gathering failed", e);
        }

        return context;
    }
}

