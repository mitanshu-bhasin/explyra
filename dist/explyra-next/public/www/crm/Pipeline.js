/**
 * crm/Pipeline.js
 * Kanban board implementation with Motion One 'Antigravity' transitions
 */

window.CrmPipeline = {
    stages: ['Discovery', 'Proposal', 'Negotiation', 'Closed-Won', 'Closed-Lost'],
    deals: [],
    unsubscribe: null,

    init() {
        if (!window.companyId) return;
        this.renderBoardSkeleton();
        this.listenToDeals();

        // Global fallback to rigorously clear dragged state if mouse released outside
        window.addEventListener('mouseup', () => {
            if (this.draggedElementId) this.dragEnd();
        });
        window.addEventListener('dragend', () => {
            if (this.draggedElementId) this.dragEnd();
        });
    },

    /**
     * Set up real-time listener for Deals isolated by companyId
     */
    listenToDeals() {
        if (this.unsubscribe) this.unsubscribe();

        const query = window.db.collection('crm_deals')
            .where('companyId', '==', window.companyId);

        this.unsubscribe = query.onSnapshot((snapshot) => {
            this.deals = [];
            snapshot.forEach(doc => {
                this.deals.push({ id: doc.id, ...doc.data() });
            });
            this.renderDeals();

            // Also notify Analytics module to update if it's there
            if (window.CrmAnalytics && typeof window.CrmAnalytics.updateData === 'function') {
                window.CrmAnalytics.updateData(this.deals);
            }
        }, (error) => {
            console.error("[CRM Pipeline] Error fetching deals:", error);
        });
    },

    renderBoardSkeleton() {
        const board = document.getElementById('pipeline-board');
        if (!board) return;

        let html = '';
        this.stages.forEach(stage => {
            // specific colors for stages
            let headerColor = 'text-blue-500';
            if (stage === 'Closed-Won') headerColor = 'text-green-500';
            if (stage === 'Closed-Lost') headerColor = 'text-red-500';

            html += `
                <div class="kanban-column bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50" 
                     data-stage="${stage}"
                     ondrop="window.CrmPipeline.drop(event)" 
                     ondragover="window.CrmPipeline.allowDrop(event)"
                     ondragenter="window.CrmPipeline.dragEnter(event)"
                     ondragleave="window.CrmPipeline.dragLeave(event)">
                     
                    <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center glass sticky top-0 z-10 rounded-t-16px" style="border-radius: 16px 16px 0 0;">
                        <h3 class="font-bold uppercase tracking-wider text-xs ${headerColor}">${stage}</h3>
                        <span class="text-xs font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full text-slate-500 shadow-sm" id="count-${stage}">0</span>
                    </div>
                    
                    <!-- Kanban Items Container -->
                    <div class="flex-1 p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar" id="col-${stage}">
                        <!-- Cards injected here -->
                    </div>
                    
                    <div class="p-3 border-t border-slate-200 dark:border-slate-700/50">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right" id="val-${stage}">₹0</p>
                    </div>
                </div>
            `;
        });

        board.innerHTML = html;
    },

    renderDeals() {
        // First clear all columns except the dragged element if it's currently dragging (to prevent flicker)
        // A simpler React-like approach in Vanilla: Rebuild DOM, but keep dragging state intact if possible.
        // For simplicity:

        // Reset counters
        const counts = {};
        const values = {};
        this.stages.forEach(s => { counts[s] = 0; values[s] = 0; });

        // Group deals by stage
        const grouped = {};
        this.stages.forEach(s => grouped[s] = []);

        this.deals.forEach(deal => {
            const st = this.stages.includes(deal.stage) ? deal.stage : 'Discovery';
            grouped[st].push(deal);
            counts[st]++;
            values[st] += (deal.amount || 0);
        });

        this.stages.forEach(stage => {
            document.getElementById(`count-${stage}`).innerText = counts[stage];
            document.getElementById(`val-${stage}`).innerText = `₹${values[stage].toLocaleString()}`;

            const colEl = document.getElementById(`col-${stage}`);
            if (!colEl) return;

            // Simple DOM diffing to prevent wiping out dragged cards
            // Instead of total innerHTML replacement, we rebuild.
            // If dragging, skip full re-render of that specific card to not interrupt drag API.
            colEl.innerHTML = '';

            grouped[stage].forEach(deal => {
                const card = document.createElement('div');
                card.id = `deal-${deal.id}`;
                card.className = "kanban-card bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm text-sm";
                card.draggable = true;

                // Event listeners for drag
                card.addEventListener('dragstart', (e) => this.dragStart(e, deal));
                card.addEventListener('dragend', (e) => this.dragEnd(e));

                // Click to edit
                card.addEventListener('click', () => {
                    if (window.openDealModal) window.openDealModal(deal);
                });

                // Color coding based on probability or amount
                let probColor = 'text-blue-500';
                if (deal.probability >= 80) probColor = 'text-green-500';
                if (deal.stage === 'Closed-Lost') probColor = 'text-red-500';

                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-slate-800 dark:text-slate-100 truncate pr-2 pointer-events-none">${deal.name}</h4>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mb-3 block pointer-events-none"><i class="fa-solid fa-building mr-1"></i> ${deal.contact}</p>
                    <div class="flex justify-between items-center pointer-events-none border-t border-slate-100 dark:border-slate-700 pt-2 mt-2">
                        <span class="font-mono font-bold text-slate-700 dark:text-slate-200">₹${(deal.amount || 0).toLocaleString()}</span>
                        <span class="text-[10px] font-bold ${probColor} bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">${deal.probability || 0}%</span>
                    </div>
                `;

                colEl.appendChild(card);
            });

            // Add Motion One timeline animation (Staggered entry) Antigravity feel
            if (window.Motion && grouped[stage].length > 0) {
                window.Motion.animate(
                    colEl.querySelectorAll('.kanban-card'),
                    { opacity: [0, 1], y: [20, 0] },
                    { duration: 0.4, delay: window.Motion.stagger(0.05), easing: [0.22, 1, 0.36, 1] }
                );
            }
        });
    },

    // --- Drag & Drop Handlers ---
    draggedElementId: null,

    dragStart(ev, deal) {
        this.draggedElementId = `deal-${deal.id}`;
        ev.dataTransfer.setData("text/plain", deal.id);
        ev.dataTransfer.effectAllowed = "move";

        // Timeout to allow drag image to snapshot before making it semi-transparent
        setTimeout(() => {
            const el = document.getElementById(this.draggedElementId);
            if (el) el.classList.add('dragging');
        }, 0);
    },

    dragEnd(ev) {
        if (this.draggedElementId) {
            const el = document.getElementById(this.draggedElementId);
            if (el) el.classList.remove('dragging');
        }
        this.draggedElementId = null;

        // Clean up hover states
        document.querySelectorAll('.kanban-column').forEach(col => {
            col.classList.remove('drag-over');
        });
    },

    dragEnter(ev) {
        ev.preventDefault();
        const col = ev.target.closest('.kanban-column');
        if (col) col.classList.add('drag-over');
    },

    dragLeave(ev) {
        const col = ev.target.closest('.kanban-column');
        // Only remove if we actually left the column, not just hovered over a child
        if (col && !col.contains(ev.relatedTarget)) {
            col.classList.remove('drag-over');
        }
    },

    allowDrop(ev) {
        ev.preventDefault(); // Necessary to allow dropping
        ev.dataTransfer.dropEffect = "move";
    },

    async drop(ev) {
        ev.preventDefault();
        const col = ev.target.closest('.kanban-column');
        if (!col) return;

        col.classList.remove('drag-over');

        const dealId = ev.dataTransfer.getData("text/plain");
        const newStage = col.getAttribute('data-stage');

        // Find if stage actually changed
        const deal = this.deals.find(d => d.id === dealId);
        if (!deal || deal.stage === newStage) return;

        // Visual Optimistic UI update - physically move the DOM node instantly
        // "Antigravity" snap to column
        const cardEl = document.getElementById(`deal-${dealId}`);
        const colContainer = col.querySelector('.flex-1');
        if (cardEl && colContainer) {
            colContainer.appendChild(cardEl);

            // Spring animation effect using Motion One
            if (window.Motion) {
                window.Motion.animate(
                    cardEl,
                    { scale: [0.95, 1.05, 1] },
                    { duration: 0.5, easing: [0.22, 1, 0.36, 1] } // Custom spring-like easing
                );
            }
        }

        // Fire database update via Failover API
        try {
            // Adjust probability heuristically if moving to Closed
            let extraUpdates = {};
            if (newStage === 'Closed-Won') extraUpdates.probability = 100;
            if (newStage === 'Closed-Lost') extraUpdates.probability = 0;

            await window.CrmApi.withRetry(() =>
                window.db.collection('crm_deals').doc(dealId).update({
                    stage: newStage,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    ...extraUpdates
                }),
                'Update Deal Stage'
            );
            // Snapshot listener will fetch the updated data and re-render the board to catch anything else
        } catch (e) {
            console.error("Failed to move deal:", e);
            // If failed, re-fetch to revert Optimistic UI
            this.listenToDeals();
        }
    }
};
