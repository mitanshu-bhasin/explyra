/**
 * crm/Leads.js
 * Lead ingestion and management interface
 */

window.CrmLeads = {
    leads: [],
    unsubscribe: null,

    init() {
        if (!window.companyId) return;
        this.listenToLeads();

        // Search listener
        const searchInput = document.getElementById('search-leads');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.renderLeadsTable(e.target.value);
            });
        }
    },

    listenToLeads() {
        if (this.unsubscribe) this.unsubscribe();

        const query = window.db.collection('crm_deals')
            .where('companyId', '==', window.companyId)
        // Assuming leads are deals in early stages or a separate collection?
        // For CRM simplicity requested by user: Let's treat 'Discovery' and 'Proposal' as active Leads as well,
        // OR use a dedicated crm_leads collection.
        // The plan specified "crm/Leads.js: Lead capture and list view." Let's use a separate 'crm_leads' collection 
        // for raw pre-conversion leads.

        const leadsQuery = window.db.collection('crm_leads')
            .where('companyId', '==', window.companyId)
            .orderBy('createdAt', 'desc');

        this.unsubscribe = leadsQuery.onSnapshot((snapshot) => {
            this.leads = [];
            snapshot.forEach(doc => {
                this.leads.push({ id: doc.id, ...doc.data() });
            });
            this.renderLeadsTable();
            if (window.updateDashboardStats) window.updateDashboardStats();
        }, (error) => {
            // Firestore indexing might be required for the order by. If so, drop order by initially.
            if (error.code === 'failed-precondition') {
                console.warn("[CRM Leads] Index required. Falling back to frontend sort.");
                this.fallbackListenToLeads();
            } else {
                console.error("[CRM Leads] Error fetching leads:", error);
            }
        });
    },

    // Fallback if index on createdAt is missing
    fallbackListenToLeads() {
        if (this.unsubscribe) this.unsubscribe();
        const query = window.db.collection('crm_leads')
            .where('companyId', '==', window.companyId);

        this.unsubscribe = query.onSnapshot((snapshot) => {
            this.leads = [];
            snapshot.forEach(doc => {
                this.leads.push({ id: doc.id, ...doc.data() });
            });
            // Sort client side
            this.leads.sort((a, b) => {
                const t1 = a.createdAt ? a.createdAt.toMillis() : 0;
                const t2 = b.createdAt ? b.createdAt.toMillis() : 0;
                return t2 - t1;
            });
            this.renderLeadsTable();
            if (window.updateDashboardStats) window.updateDashboardStats();
        });
    },

    renderLeadsTable(searchTerm = '') {
        const tbody = document.getElementById('leads-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        const filtered = this.leads.filter(lead => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            return (lead.name && lead.name.toLowerCase().includes(term)) ||
                (lead.company && lead.company.toLowerCase().includes(term)) ||
                (lead.email && lead.email.toLowerCase().includes(term));
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-500 font-medium">No leads found. Start prospecting!</td></tr>`;
            return;
        }

        filtered.forEach(lead => {
            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors";

            const dateStr = lead.createdAt ? new Date(lead.createdAt.toMillis()).toLocaleDateString() : 'Unknown';

            let statusBadge = "bg-slate-100 text-slate-600";
            if (lead.status === 'NEW') statusBadge = "bg-blue-100 text-blue-700 border-blue-200";
            if (lead.status === 'CONTACTED') statusBadge = "bg-amber-100 text-amber-700 border-amber-200";
            if (lead.status === 'QUALIFIED') statusBadge = "bg-emerald-100 text-emerald-700 border-emerald-200";
            if (lead.status === 'LOST') statusBadge = "bg-red-100 text-red-700 border-red-200";

            tr.innerHTML = `
                <td class="font-bold">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-500">
                            <i class="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <p class="text-slate-800 dark:text-slate-100">${lead.name || 'Unnamed'}</p>
                            <p class="text-[10px] text-slate-400 font-normal">${lead.email || 'No email'}</p>
                        </div>
                    </div>
                </td>
                <td class="font-medium text-slate-600 dark:text-slate-300"><i class="fa-regular fa-building mr-1"></i> ${lead.company || '--'}</td>
                <td><span class="badge ${statusBadge}">${lead.status || 'NEW'}</span></td>
                <td class="text-sm text-slate-500">${lead.source || 'Manual Entry'}</td>
                <td class="text-sm text-slate-500 font-mono">${dateStr}</td>
                <td class="text-right">
                    <button onclick="window.CrmLeads.openLeadModal({
                        id: '${lead.id}', name: '${lead.name}', email: '${lead.email}', 
                        company: '${lead.company}', source: '${lead.source}', status: '${lead.status}'
                    })" class="w-8 h-8 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition" title="Edit Lead">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button onclick="window.CrmLeads.convertToDeal('${lead.id}')" class="w-8 h-8 rounded-lg text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition ml-1" title="Convert to Deal">
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    async convertToDeal(leadId) {
        const lead = this.leads.find(l => l.id === leadId);
        if (!lead) return;

        if (!confirm(`Convert lead '${lead.name}' to a Sales Deal?`)) return;

        try {
            // First open the Deal Modal pre-filled with the Lead's context
            window.switchCrmTab('pipeline');
            window.openDealModal({
                name: `${lead.company || lead.name} - Initial Deal`,
                contact: lead.company || lead.name,
                stage: 'Discovery',
                probability: 10,
                notes: `Converted from lead (${lead.email}). Source: ${lead.source}`
            });

            // Mark the lead as QUALIFIED automatically
            await window.CrmApi.withRetry(() =>
                window.db.collection('crm_leads').doc(leadId).update({
                    status: 'QUALIFIED',
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }),
                'Qualify Lead'
            );

        } catch (e) {
            console.error("Error converting lead:", e);
        }
    },

    openLeadModal(leadData = null, options = {}) {
        if (window.crmOpenModalWithHistory && !options.skipHistory) {
            return window.crmOpenModalWithHistory(
                'modal-lead',
                () => this.openLeadModal(leadData, { ...options, skipHistory: true }),
                options
            );
        }

        document.getElementById('lead-id').value = leadData ? leadData.id : '';
        document.getElementById('lead-name').value = leadData ? leadData.name : '';
        document.getElementById('lead-email').value = leadData ? leadData.email : '';
        document.getElementById('lead-company').value = leadData ? (leadData.company || '') : '';
        document.getElementById('lead-source').value = leadData ? (leadData.source || 'Manual Entry') : 'Manual Entry';
        document.getElementById('lead-status').value = leadData ? (leadData.status || 'NEW') : 'NEW';

        document.getElementById('modal-lead-title').innerHTML = leadData ?
            '<i class="fa-solid fa-pen text-blue-500"></i> Edit Lead' :
            '<i class="fa-solid fa-filter text-blue-500"></i> New Lead';

        const modal = document.getElementById('modal-lead');
        const content = document.getElementById('modal-lead-content');
        modal.classList.add('show');
        setTimeout(() => {
            content.classList.remove('entering');
        }, 10);
    },

    closeLeadModal(options = {}) {
        if (window.crmCloseModalWithHistory && !options.skipHistory) {
            return window.crmCloseModalWithHistory(
                'modal-lead',
                () => this.closeLeadModal({ ...options, skipHistory: true }),
                options
            );
        }

        const modal = document.getElementById('modal-lead');
        const content = document.getElementById('modal-lead-content');

        content.classList.add('entering');

        setTimeout(() => {
            modal.classList.remove('show');
            document.getElementById('lead-form').reset();
            document.getElementById('lead-id').value = '';
        }, 300);
    },

    async saveLead() {
        const id = document.getElementById('lead-id').value;
        const name = document.getElementById('lead-name').value.trim();
        const email = document.getElementById('lead-email').value.trim();
        const company = document.getElementById('lead-company').value.trim();
        const source = document.getElementById('lead-source').value;
        const status = document.getElementById('lead-status').value;

        if (!name || !email) {
            alert("Name and Email are required.");
            return;
        }

        const leadData = {
            companyId: window.companyId,
            name,
            email,
            company,
            source,
            status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            if (id) {
                await window.CrmApi.withRetry(() => window.db.collection('crm_leads').doc(id).update(leadData), 'Update Lead');
            } else {
                leadData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                await window.CrmApi.withRetry(() => window.db.collection('crm_leads').add(leadData), 'Create Lead');
            }
            this.closeLeadModal();
        } catch (error) {
            console.error("Error saving lead:", error);
            alert("Failed to save lead. Check console.");
        }
    }
};
