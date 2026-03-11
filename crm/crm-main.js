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
            const MAIN_ADMIN_EMAILS = ['info@fouralpha.org', 'mfskufgu@gmail.com'];
            if (MAIN_ADMIN_EMAILS.includes(user.email)) {
                console.log("Main Admin detected via fallback.");
                userData = {
                    email: user.email,
                    role: 'MAIN_ADMIN',
                    name: 'Explyra Admin',
                    companyId: 'EXPLYRA_GLOBAL' // Or a dummy ID if they want to test CRM
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

        // Pre-fill header
        if (document.getElementById('header-avatar')) {
            const initial = userData.name ? userData.name.charAt(0).toUpperCase() : '?';
            document.getElementById('header-avatar').innerHTML = `<span class="font-bold text-slate-600 dark:text-slate-300">${initial}</span>`;

            // Populate Dropdown
            if (document.getElementById('crm-dd-name')) {
                document.getElementById('crm-dd-name').textContent = userData.name || 'User';
                document.getElementById('crm-dd-email').textContent = user.email || '';
                document.getElementById('crm-dd-role').textContent = (userData.role || 'EMP').replace('_', ' ');
            }
        }

        console.log("[CRM Core] Initialized for company:", window.companyId);

        // Initialize sub-modules once auth is confirmed
        if (window.CrmPipeline) window.CrmPipeline.init();
        if (window.CrmLeads) window.CrmLeads.init();
        if (window.CrmContacts) window.CrmContacts.init();
        if (window.CrmAnalytics) window.CrmAnalytics.init();

        // Bind global save button based on active tab
        const newRecordBtn = document.getElementById("btn-new-record");
        if (newRecordBtn) {
            newRecordBtn.addEventListener("click", () => {
                const activeTab = document.querySelector(".crm-nav-item.active").dataset.tab;
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

// Global UI Functions
window.toggleCrmProfile = function () {
    const dropdown = document.getElementById('crm-profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
};

window.switchCrmTab = function (tabId) {
    // Update nav active state
    document.querySelectorAll('.crm-nav-item').forEach(btn => {
        btn.classList.remove('active', 'bg-white/10', 'text-white');
    });
    const activeBtn = document.querySelector(`.crm-nav-item[data-tab="${tabId}"]`);
    if (activeBtn) activeBtn.classList.add('active', 'bg-white/10', 'text-white');

    // Hide all views
    document.querySelectorAll('.crm-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Show target view
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.classList.remove('hidden');

    // Update Title and Action Button text
    const titleEl = document.getElementById('crm-page-title');
    const newRecordBtn = document.getElementById('btn-new-record');

    if (tabId === 'pipeline') {
        if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-layer-group text-blue-500"></i> Sales Pipeline`;
        if (newRecordBtn) {
            newRecordBtn.style.display = 'flex';
            newRecordBtn.innerHTML = `<i class="fa-solid fa-plus"></i> New Deal`;
        }
    } else if (tabId === 'leads') {
        if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-filter text-blue-500"></i> Lead Management`;
        if (newRecordBtn) {
            newRecordBtn.style.display = 'flex';
            newRecordBtn.innerHTML = `<i class="fa-solid fa-plus"></i> New Lead`;
        }
    } else if (tabId === 'contacts') {
        if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-address-book text-blue-500"></i> Contact Directory`;
        if (newRecordBtn) {
            newRecordBtn.style.display = 'flex';
            newRecordBtn.innerHTML = `<i class="fa-solid fa-plus"></i> New Contact`;
        }
    } else if (tabId === 'analytics') {
        if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-chart-line text-blue-500"></i> Sales Analytics`;
        if (newRecordBtn) newRecordBtn.style.display = 'none'; // No "New Analytics"

        // Trigger chart render if needed
        if (window.CrmAnalytics && window.CrmAnalytics.renderCharts) {
            window.CrmAnalytics.renderCharts();
        }
    }
}

window.openDealModal = function (dealData = null) {
    const modal = document.getElementById('modal-deal');
    const content = document.getElementById('modal-deal-content');

    // Reset form
    document.getElementById('deal-form').reset();
    document.getElementById('deal-id').value = '';
    document.getElementById('modal-deal-title').innerHTML = `<i class="fa-solid fa-handshake text-blue-500"></i> New Deal`;

    if (dealData) {
        document.getElementById('deal-id').value = dealData.id || '';
        document.getElementById('deal-name').value = dealData.name || '';
        document.getElementById('deal-contact').value = dealData.contact || '';
        document.getElementById('deal-amount').value = dealData.amount || '';
        document.getElementById('deal-stage').value = dealData.stage || 'Discovery';
        document.getElementById('deal-probability').value = dealData.probability || '';
        document.getElementById('deal-notes').value = dealData.notes || '';
        document.getElementById('modal-deal-title').innerHTML = `<i class="fa-solid fa-pen text-blue-500"></i> Edit Deal`;
    }

    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before animating opacity/scale
    setTimeout(() => {
        content.classList.remove('opacity-0', 'scale-95');
    }, 10);

    // Attempt to load existing projects for the link dropdown
    loadProjectsDropdown();
}

window.closeDealModal = function () {
    const modal = document.getElementById('modal-deal');
    const content = document.getElementById('modal-deal-content');

    content.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // match duration
}

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
            // Update
            await window.CrmApi.withRetry(() =>
                window.db.collection('crm_deals').doc(id).update(docData),
                'Update Deal'
            );
        } else {
            // Create
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
}

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
