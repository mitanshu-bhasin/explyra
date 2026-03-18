/**
 * crm/crm-main.js
 * Main entry point and UI orchestration for Explyra CRM
 */

document.addEventListener("DOMContentLoaded", () => {
    // Wait for auth state
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            initializeCrm(user);
        } else {
            // Redirect to login if not authenticated
            window.location.href = "../admin.html";
        }
    });
});

async function initializeCrm(user) {
    try {
        console.log("Initializing CRM for:", user.email);

        // Fetch user document to get companyId and role (querying by email as per Explyra architecture)
        const usersSnap = await window.db.collection("users").where("email", "==", user.email).get();

        let userData;
        if (usersSnap.empty) {
            // Check if it's the main platform admin
            const MAIN_ADMIN_EMAILS = ['info@fouralpha.org', 'explyra@gmail.com'];
            if (MAIN_ADMIN_EMAILS.includes(user.email)) {
                console.log("Main Admin detected via fallback.");
                userData = {
                    email: user.email,
                    role: 'MAIN_ADMIN',
                    name: 'Explyra Admin',
                    companyId: 'EXPLYRA_GLOBAL'
                };
            } else {
                throw new Error("User profile not found in database.");
            }
        } else {
            const userDoc = usersSnap.docs[0];
            userData = userDoc.data();
            userData.docId = userDoc.id;
        }

        if (userData.role !== 'MANAGER' && userData.role !== 'SENIOR_MANAGER' && userData.role !== 'ADMIN' && userData.role !== 'MAIN_ADMIN') {
            alert("Unauthorized: You do not have CRM access privileges.");
            window.location.href = "../emp.html";
            return;
        }

        if (!userData.companyId) {
            throw new Error("User is not assigned to a company.");
        }

        // Set global state required by the CRM modules
        window.userData = { ...userData, uid: user.uid };
        window.companyId = userData.companyId;

        // Pre-fill header avatar
        if (document.getElementById('header-avatar')) {
            const initial = userData.name ? userData.name.charAt(0).toUpperCase() : '?';
            document.getElementById('header-avatar').innerHTML = `<span class="font-bold" style="font-size: 0.75rem;">${initial}</span>`;
        }

        console.log("[CRM Core] Initialized for company:", window.companyId);

        // Initialize sub-modules once auth is confirmed
        if (window.CrmPipeline) window.CrmPipeline.init();
        if (window.CrmLeads) window.CrmLeads.init();
        if (window.CrmContacts) window.CrmContacts.init();
        if (window.CrmAnalytics) window.CrmAnalytics.init();

        const initialTab = getCrmTabFromUrl();
        window.switchCrmTab(initialTab, { skipHistory: true });
        history.replaceState(
            { crmTab: initialTab, crmModalId: null },
            '',
            getCrmUrlForTab(initialTab)
        );

        // Populate dashboard with initial data
        updateDashboardStats();

        // Bind global save button based on active tab
        const newRecordBtn = document.getElementById("btn-new-record");
        if (newRecordBtn) {
            newRecordBtn.addEventListener("click", () => {
                const activeBtn = document.querySelector(".crm-nav-item.active");
                const activeTab = activeBtn ? activeBtn.dataset.tab : 'dashboard';
                if (activeTab === 'pipeline') {
                    openDealModal();
                } else if (activeTab === 'leads') {
                    if (window.CrmLeads && window.CrmLeads.openLeadModal) window.CrmLeads.openLeadModal();
                    else alert("Leads module not ready.");
                } else if (activeTab === 'contacts') {
                    if (window.CrmContacts && window.CrmContacts.openContactModal) window.CrmContacts.openContactModal();
                    else alert("Contacts module not ready.");
                }
            });
        }

    } catch (error) {
        console.error("CRM Initialization error:", error);
        alert("Failed to initialize CRM: " + error.message);
    }
}

// ===================== Dashboard Stats =====================
window.updateDashboardStats = function () {
    // Leads count
    const leadsCount = window.CrmLeads ? window.CrmLeads.leads.length : 0;
    const el1 = document.getElementById('dash-total-leads');
    if (el1) el1.textContent = leadsCount;

    // Active deals (non-closed)
    let activeDeals = 0;
    let pipelineValue = 0;
    const allDeals = window.CrmPipeline ? window.CrmPipeline.deals : [];
    allDeals.forEach(d => {
        if (d.stage !== 'Closed-Won' && d.stage !== 'Closed-Lost') {
            activeDeals++;
            pipelineValue += (d.amount || 0);
        }
    });
    const el2 = document.getElementById('dash-active-deals');
    if (el2) el2.textContent = activeDeals;
    const el4 = document.getElementById('dash-pipeline-value');
    if (el4) el4.textContent = `₹${pipelineValue.toLocaleString()}`;

    // Contacts count
    const contactsCount = window.CrmContacts ? window.CrmContacts.contacts.length : 0;
    const el3 = document.getElementById('dash-total-contacts');
    if (el3) el3.textContent = contactsCount;

    // Recent deals list
    renderRecentDeals(allDeals);
};

function renderRecentDeals(deals) {
    const container = document.getElementById('dash-recent-deals');
    if (!container) return;

    // Show up to 5 most recent
    const recent = [...deals]
        .sort((a, b) => {
            const t1 = a.updatedAt ? (a.updatedAt.toMillis ? a.updatedAt.toMillis() : 0) : 0;
            const t2 = b.updatedAt ? (b.updatedAt.toMillis ? b.updatedAt.toMillis() : 0) : 0;
            return t2 - t1;
        })
        .slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = `<div class="flex items-center justify-center py-8" style="color: var(--text-secondary);"><p class="text-xs">No deals yet — start by adding one!</p></div>`;
        return;
    }

    let html = '<div class="space-y-2">';
    recent.forEach(deal => {
        let stageColor = 'var(--text-secondary)';
        if (deal.stage === 'Closed-Won') stageColor = '#10b981';
        if (deal.stage === 'Closed-Lost') stageColor = '#ef4444';
        if (deal.stage === 'Proposal') stageColor = '#3b82f6';
        if (deal.stage === 'Negotiation') stageColor = '#f59e0b';

        html += `
            <div class="flex items-center justify-between py-2 px-1" style="border-bottom: 1px solid var(--border-color);">
                <div class="min-w-0 flex-1">
                    <p class="text-xs font-semibold truncate" style="color: var(--text-primary);">${deal.name || 'Untitled'}</p>
                    <p class="text-[10px]" style="color: var(--text-secondary);">${deal.contact || ''}</p>
                </div>
                <div class="text-right flex-shrink-0 ml-3">
                    <p class="text-xs font-mono font-semibold" style="color: var(--text-primary);">₹${(deal.amount || 0).toLocaleString()}</p>
                    <p class="text-[10px] font-bold" style="color: ${stageColor};">${deal.stage}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ===================== Global UI Functions =====================
window.toggleCrmProfile = function () {
    const dropdown = document.getElementById('crm-profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
};

const CRM_VALID_TABS = new Set(['dashboard', 'pipeline', 'leads', 'contacts', 'analytics', 'ai', 'settings']);
let currentCrmTab = 'dashboard';
let currentCrmModalId = null;

function normalizeCrmTab(tab) {
    return CRM_VALID_TABS.has(tab) ? tab : 'dashboard';
}

function getCrmTabFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return normalizeCrmTab(params.get('tab'));
}

function getCrmUrlForTab(tab) {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    return `${url.pathname}${url.search}${url.hash}`;
}

function isCrmModalOpen(modalId) {
    const modal = document.getElementById(modalId);
    return !!(modal && modal.classList.contains('show'));
}

window.crmOpenModalWithHistory = function (modalId, openFn, options = {}) {
    if (!options.skipHistory) {
        history.pushState(
            { crmTab: currentCrmTab, crmModalId: modalId },
            '',
            getCrmUrlForTab(currentCrmTab)
        );
    }

    currentCrmModalId = modalId;
    openFn();
};

window.crmCloseModalWithHistory = function (modalId, closeFn, options = {}) {
    if (!options.skipHistory && history.state && history.state.crmModalId === modalId) {
        history.back();
        return;
    }

    currentCrmModalId = null;
    closeFn();

    if (!options.skipHistory && history.state) {
        history.replaceState(
            { ...history.state, crmModalId: null },
            '',
            getCrmUrlForTab(currentCrmTab)
        );
    }
};

window.switchCrmTab = function (tabId, options = {}) {
    const normalizedTab = normalizeCrmTab(tabId);

    if (!options.skipHistory && normalizedTab !== currentCrmTab) {
        history.pushState(
            { crmTab: normalizedTab, crmModalId: null },
            '',
            getCrmUrlForTab(normalizedTab)
        );
    }

    currentCrmTab = normalizedTab;

    if (currentCrmModalId === 'modal-deal' && isCrmModalOpen('modal-deal')) {
        window.closeDealModal({ skipHistory: true });
    }
    if (currentCrmModalId === 'modal-lead' && window.CrmLeads && window.CrmLeads.closeLeadModal && isCrmModalOpen('modal-lead')) {
        window.CrmLeads.closeLeadModal({ skipHistory: true });
    }
    if (currentCrmModalId === 'modal-contact' && window.CrmContacts && window.CrmContacts.closeContactModal && isCrmModalOpen('modal-contact')) {
        window.CrmContacts.closeContactModal({ skipHistory: true });
    }
    currentCrmModalId = null;

    // Update nav active state
    document.querySelectorAll('.crm-nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.crm-nav-item[data-tab="${normalizedTab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Hide all views
    document.querySelectorAll('.crm-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Show target view
    const targetView = document.getElementById(`view-${normalizedTab}`);
    if (targetView) targetView.classList.remove('hidden');

    // Update Title and Action Button text
    const titleEl = document.getElementById('crm-page-title');
    const newRecordBtn = document.getElementById('btn-new-record');

    const titleMap = {
        dashboard: { icon: 'fa-chart-pie', label: 'Dashboard', showBtn: false },
        pipeline: { icon: 'fa-layer-group', label: 'Sales Pipeline', showBtn: true, btnLabel: 'New Deal' },
        leads: { icon: 'fa-filter', label: 'Lead Management', showBtn: true, btnLabel: 'New Lead' },
        contacts: { icon: 'fa-address-book', label: 'Contact Directory', showBtn: true, btnLabel: 'New Contact' },
        analytics: { icon: 'fa-chart-line', label: 'Sales Analytics', showBtn: false },
        settings: { icon: 'fa-gear', label: 'Settings', showBtn: false }
    };

    const config = titleMap[normalizedTab] || titleMap.dashboard;
    if (titleEl) {
        titleEl.innerHTML = `<i class="fa-solid ${config.icon}" style="color: var(--text-secondary);"></i> ${config.label}`;
    }

    if (newRecordBtn) {
        if (config.showBtn) {
            newRecordBtn.style.display = 'inline-flex';
            newRecordBtn.innerHTML = `<i class="fa-solid fa-plus"></i> <span class="hidden sm:inline">${config.btnLabel}</span>`;
        } else {
            newRecordBtn.style.display = 'none';
        }
    }

    // Tab-specific logic
    if (normalizedTab === 'analytics') {
        if (window.CrmAnalytics && window.CrmAnalytics.renderCharts) {
            window.CrmAnalytics.renderCharts();
        }
    }

    if (normalizedTab === 'dashboard') {
        updateDashboardStats();
    }

    // Close mobile sidebar
    const sidebar = document.getElementById('crm-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('active');
};

window.addEventListener('popstate', (event) => {
    const state = event.state || {};
    const tab = normalizeCrmTab(state.crmTab || getCrmTabFromUrl());
    const targetModalId = state.crmModalId || null;

    window.switchCrmTab(tab, { skipHistory: true });

    if (!targetModalId) {
        if (isCrmModalOpen('modal-deal')) window.closeDealModal({ skipHistory: true });
        if (window.CrmLeads && window.CrmLeads.closeLeadModal && isCrmModalOpen('modal-lead')) {
            window.CrmLeads.closeLeadModal({ skipHistory: true });
        }
        if (window.CrmContacts && window.CrmContacts.closeContactModal && isCrmModalOpen('modal-contact')) {
            window.CrmContacts.closeContactModal({ skipHistory: true });
        }
    }

    currentCrmModalId = targetModalId;
});

// ===================== Deal Modal =====================
window.openDealModal = function (dealData = null, options = {}) {
    if (window.crmOpenModalWithHistory && !options.skipHistory) {
        return window.crmOpenModalWithHistory(
            'modal-deal',
            () => window.openDealModal(dealData, { ...options, skipHistory: true }),
            options
        );
    }

    const modal = document.getElementById('modal-deal');
    const content = document.getElementById('modal-deal-content');

    // Reset form
    document.getElementById('deal-form').reset();
    document.getElementById('deal-id').value = '';
    document.getElementById('modal-deal-title').innerHTML = `<i class="fa-solid fa-handshake" style="color: var(--text-secondary);"></i> New Deal`;

    if (dealData) {
        document.getElementById('deal-id').value = dealData.id || '';
        document.getElementById('deal-name').value = dealData.name || '';
        document.getElementById('deal-contact').value = dealData.contact || '';
        document.getElementById('deal-amount').value = dealData.amount || '';
        document.getElementById('deal-stage').value = dealData.stage || 'Discovery';
        document.getElementById('deal-probability').value = dealData.probability || '';
        document.getElementById('deal-notes').value = dealData.notes || '';
        document.getElementById('modal-deal-title').innerHTML = `<i class="fa-solid fa-pen" style="color: var(--text-secondary);"></i> Edit Deal`;
    }

    modal.classList.add('show');
    setTimeout(() => {
        content.classList.remove('entering');
    }, 10);

    loadProjectsDropdown();
};

window.closeDealModal = function (options = {}) {
    if (window.crmCloseModalWithHistory && !options.skipHistory) {
        return window.crmCloseModalWithHistory(
            'modal-deal',
            () => window.closeDealModal({ ...options, skipHistory: true }),
            options
        );
    }

    const modal = document.getElementById('modal-deal');
    const content = document.getElementById('modal-deal-content');

    content.classList.add('entering');
    setTimeout(() => {
        modal.classList.remove('show');
    }, 300);
};

window.saveDeal = async function () {
    const id = document.getElementById('deal-id').value;
    const name = document.getElementById('deal-name').value.trim();
    const contact = document.getElementById('deal-contact').value.trim();
    const amount = Number(document.getElementById('deal-amount').value) || 0;
    const stage = document.getElementById('deal-stage').value;
    const probability = Number(document.getElementById('deal-probability').value) || 10;
    const notes = document.getElementById('deal-notes').value.trim();
    const projectId = document.getElementById('deal-project-id').value;

    if (!window.userData || !window.userData.uid || !window.companyId) {
        alert("Session invalid or not fully loaded. Please refresh.");
        return;
    }

    if (!name || !contact || amount <= 0) {
        alert("Please fill in required fields correctly.");
        return;
    }

    const docData = {
        name,
        contact,
        amount,
        stage,
        probability,
        notes,
        linkedProjectId: projectId || null,
        companyId: window.companyId,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        if (id) {
            await window.CrmApi.withRetry(() =>
                window.db.collection('crm_deals').doc(id).update(docData),
                'Update Deal'
            );
        } else {
            docData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            docData.createdBy = window.userData.uid;

            await window.CrmApi.withRetry(() =>
                window.db.collection('crm_deals').add(docData),
                'Create Deal'
            );
        }

        closeDealModal();
        if (window.showToast) window.showToast("Deal saved successfully!", "success");

    } catch (e) {
        console.error("Save deal error", e);
        alert("Error saving deal: " + e.message);
    }
};

async function loadProjectsDropdown() {
    const dropdown = document.getElementById('deal-project-id');
    if (!dropdown || !window.companyId) return;

    try {
        const querySnapshot = await window.db.collection('projects')
            .where('companyId', '==', window.companyId)
            .get();

        let options = '<option value="">-- No Project Linked --</option>';
        querySnapshot.forEach(doc => {
            const data = doc.data();
            options += `<option value="${doc.id}">${data.projectCode} - ${data.name}</option>`;
        });

        dropdown.innerHTML = options;
    } catch (e) {
        console.error("Error loading projects", e);
    }
}
