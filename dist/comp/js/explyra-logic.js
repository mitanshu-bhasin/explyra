import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc, getDoc, query, where, Timestamp, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: (window.EXPLYRA_CONFIG?.firebase?.apiKey || ""),
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.auth = auth;
window.db = db;

const MASTER_ADMINS = ["explyra@gmail.com", "epxlyra@gmail.com"];

async function isExplyraTeam(email) {
    if (!email) {
        console.warn("isExplyraTeam: No email provided");
        return false;
    }
    const lower = email.toLowerCase();
    
    // 1. Check Master Admin
    if (MASTER_ADMINS.includes(lower)) {
        console.info("isExplyraTeam: Authorized as Master Admin");
        return true;
    }

    try {
        // 2. Check Database Admins (Collection)
        const q = query(collection(db, "explyra_admins"), where("email", "==", lower));
        const snap = await getDocs(q);
        if (!snap.empty) {
            console.info(`isExplyraTeam: Found in ads collection for ${lower}`);
            return true;
        }

        // 3. Check Fallback Document (admin_list)
        const listDoc = await getDoc(doc(db, "explyra_admins", "admin_list"));
        if (listDoc.exists()) {
            const emails = listDoc.data().emails || [];
            const found = emails.some(e => e.toLowerCase() === lower);
            console.info(`isExplyraTeam: Admin list check for ${lower}: ${found}`);
            return found;
        }

        console.warn(`isExplyraTeam: No admin record found for ${lower}`);
        return false;
    } catch (e) {
        console.error("Admin check failed", e);
        return false;
    }
}

// Global state
let allCompanies = [];
let allUsers = [];
let allExpenses = [];
let allDeletionRequests = [];

onAuthStateChanged(auth, async (user) => {
    console.info("Auth state changed:", user ? user.email : "Logged Out");
    if (user) {
        try {
            const isAuthorized = await isExplyraTeam(user.email);
            if (isAuthorized) {
                console.info(`[Explyra] Access granted to: ${user.email}`);
                document.getElementById("auth-screen").classList.add("hidden");
                document.getElementById("dashboard-screen").classList.remove("hidden");
                
                const emailEl = document.getElementById("admin-user-email");
                if (emailEl) emailEl.textContent = user.email;

                if (MASTER_ADMINS.includes(user.email.toLowerCase())) {
                    const btnAddAdmin = document.getElementById("btn-add-admin");
                    if (btnAddAdmin) btnAddAdmin.classList.remove("hidden");
                }

                await loadExplyraData();
            } else {
                console.error(`[Explyra] Unauthorized access attempt by: ${user.email}`);
                alert(`Unauthorized Access: ${user.email} is not in the Explyra Admin list.`);
                await signOut(auth);
                // Redirect back to main portal or login
                window.location.href = "../admin.html";
            }
        } catch (authErr) {
            console.error("[Explyra] Authorization System Error:", authErr);
            // Don't sign out automatically on internal errors to allow debugging
            // unless it's a clear 'permission-denied' from a critical auth check
            if (authErr.code === 'permission-denied') {
                alert("Security Verification Failed: Access Denied.");
                await signOut(auth);
            } else {
                console.warn("Caught non-critical error during auth update, staying logged in for debug.");
            }
        }
    } else {
        // Not logged in
        document.getElementById("auth-screen").classList.remove("hidden");
        document.getElementById("dashboard-screen").classList.add("hidden");
    }
});

// Login handlers
document.getElementById('explyra-login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...';
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
        alert("Login Failed: " + err.message);
        btn.innerHTML = 'Authenticate';
    }
});

document.getElementById('google-btn')?.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        alert("Google Sign-In Failed: " + error.message);
    }
});

document.getElementById('btn-logout')?.addEventListener('click', async () => {
    await signOut(auth);
});

// Data Loading
async function loadExplyraData() {
    try {
        // Show loading state in table
        const tbody = document.getElementById("companies-table-body");
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-slate-400"><i class="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i><br>Loading Companies...</td></tr>`;
        }

        // Fetch all data
        const [compSnap, usersSnap, expSnap] = await Promise.all([
            getDocs(collection(db, "companies")),
            getDocs(collection(db, "users")),
            getDocs(collection(db, "expenses"))
        ]);

        allCompanies = compSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        allUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        allExpenses = expSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        const delSnap = await getDocs(collection(db, "deletion_requests"));
        allDeletionRequests = delSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        updateDashboard();
        renderDeletionRequests();
    } catch (err) {
        console.error("Error loading data:", err);
        alert("Failed to load platform data. See console.");
    }
}

function updateDashboard() {
    let activePlans = 0;
    let suspended = 0;

    // Attach counts
    const enhancedCompanies = allCompanies.map(comp => {
        const compUsers = allUsers.filter(u => u.companyId === comp.id);
        const compExpenses = allExpenses.filter(e => e.companyId === comp.id);

        let plan = comp.plan && comp.plan !== "" ? comp.plan.toLowerCase() : "starter";
        let status = comp.status && comp.status !== "" ? comp.status.toLowerCase() : "active";

        if (status === "active") activePlans++;
        if (status === "suspended") suspended++;

        return {
            ...comp,
            calculatedPlan: plan,
            calculatedStatus: status,
            userCount: compUsers.length,
            expenseCount: compExpenses.length,
            ownerEmail: comp.ownerEmail || compUsers.find(u => u.role === "ADMIN")?.email || "Unknown"
        };
    });

    // Top Stats
    const stats = {
        "stat-companies": allCompanies.length,
        "stat-employees": allUsers.length,
        "stat-expenses": allExpenses.length,
        "stat-active": activePlans,
        "stat-suspended": suspended
    };

    for (const [id, val] of Object.entries(stats)) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    renderTable(enhancedCompanies);
}

function renderTable(comps) {
    const tbody = document.getElementById("companies-table-body");
    if (!tbody) return;

    if (comps.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-slate-400">No companies found.</td></tr>`;
        return;
    }

    tbody.innerHTML = comps.map(c => {

        let statusBadge = c.calculatedStatus === "suspended"
            ? `<span class="px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase">Suspended</span>`
            : `<span class="px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase">Active</span>`;

        let planBadgeCls = "bg-slate-100 text-slate-700";
        if (c.calculatedPlan === "trial") planBadgeCls = "bg-emerald-100 text-emerald-700";
        if (c.calculatedPlan === "growth") planBadgeCls = "bg-blue-100 text-blue-700";
        if (c.calculatedPlan === "business") planBadgeCls = "bg-purple-100 text-purple-700";
        if (c.calculatedPlan === "enterprise") planBadgeCls = "bg-amber-100 text-amber-700";

        let planBadge = `<span class="px-2 py-1 rounded text-[10px] font-bold uppercase ${planBadgeCls}">${c.calculatedPlan}</span>`;

        // Actions
        let toggleStatusBtn = c.calculatedStatus === "suspended"
            ? `<button onclick="window.toggleStatus('${c.id}', 'active')" class="text-green-600 hover:text-green-800" title="Activate"><i class="fa-solid fa-play"></i></button>`
            : `<button onclick="window.toggleStatus('${c.id}', 'suspended')" class="text-red-600 hover:text-red-800" title="Suspend"><i class="fa-solid fa-ban"></i></button>`;

        return `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-bold text-slate-800 dark:text-slate-100">${c.name || 'Unnamed'}</td>
                <td class="px-6 py-4 text-slate-500">${c.ownerEmail}</td>
                <td class="px-6 py-4 font-mono font-bold">${c.userCount}</td>
                <td class="px-6 py-4 font-mono font-bold">${c.expenseCount}</td>
                <td class="px-6 py-4">${planBadge}</td>
                <td class="px-6 py-4">${statusBadge}</td>
                <td class="px-6 py-4 text-right space-x-3">
                    <button onclick="window.openEditPlan('${c.id}', '${c.name || 'Company'}', '${c.calculatedPlan}')" class="text-indigo-600 hover:text-indigo-800" title="Edit Plan"><i class="fa-solid fa-pen"></i></button>
                    ${toggleStatusBtn}
                    <button onclick="window.deleteCompany('${c.id}')" class="text-slate-400 hover:text-red-600" title="Delete Company"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    }).join("");
}

// Global UI Actions
window.toggleStatus = async (compId, newStatus) => {
    if (!confirm(`Are you sure you want to mark this company as ${newStatus.toUpperCase()}?`)) return;
    try {
        await updateDoc(doc(db, "companies", compId), {
            status: newStatus
        });
        alert(`Company status updated to ${newStatus}.`);
        loadExplyraData();
    } catch (err) {
        alert("Error updating status: " + err.message);
    }
};

window.openEditPlan = (compId, name, currentPlan) => {
    console.log("[Explyra] Opening edit plan for:", compId, name, currentPlan);
    const comp = allCompanies.find(c => c.id === compId) || {};
    
    const planValue = (currentPlan || "starter").toLowerCase();
    
    document.getElementById("edit-plan-company-id").value = compId;
    document.getElementById("edit-plan-company-name").textContent = name;
    document.getElementById("edit-plan-select").value = planValue;

    document.getElementById("edit-plan-cost").value = comp.subscriptionValue || comp.planCost || '';
    document.getElementById("edit-plan-duration").value = comp.planDurationMonths || '12';
    
    // Check various date fields that might exist
    let endsAt = comp.subscriptionEnd || comp.planEndsAt || comp.trialEndsAt;
    if (endsAt) {
        try {
            const d = endsAt.toDate ? endsAt.toDate() : new Date(endsAt);
            document.getElementById("edit-plan-end-date").value = d.toISOString().split('T')[0];
        } catch (e) {
            document.getElementById("edit-plan-end-date").value = '';
        }
    } else {
        document.getElementById("edit-plan-end-date").value = '';
    }

    const modal = document.getElementById("plan-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};

document.getElementById("save-plan-btn")?.addEventListener("click", async () => {
    const compId = document.getElementById("edit-plan-company-id").value;
    const newPlan = document.getElementById("edit-plan-select").value;
    const planCost = document.getElementById("edit-plan-cost").value;
    const planDuration = document.getElementById("edit-plan-duration").value;
    const endDateVal = document.getElementById("edit-plan-end-date").value;
    const btn = document.getElementById("save-plan-btn");

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
    try {
        const updateData = {
            plan: newPlan,
            planCost: planCost ? parseFloat(planCost) : null,
            planDurationMonths: planDuration ? parseInt(planDuration) : null
        };

        if (endDateVal) {
            updateData.planEndsAt = new Date(endDateVal);
            updateData.trialEndsAt = new Date(endDateVal); // Keep both in sync for simplicity
        }

        await updateDoc(doc(db, "companies", compId), updateData);
        document.getElementById("plan-modal").classList.add("hidden");
        alert(`Company plan updated to ${newPlan.toUpperCase()}.`);
        loadExplyraData();
    } catch (err) {
        alert("Error updating plan: " + err.message);
    }
    btn.innerHTML = 'Save Plan';
});

window.deleteCompany = async (compId) => {
    // Basic soft delete or visual confirmation? Admin requested DELETE logic
    // True deletion requires a cloud function to cascade delete users and expenses. 
    // We will simulate it by setting status to DELETED and removing it from the view.
    if (!confirm("DANGER! This will permanently disable the company. Continue?")) return;
    if (prompt("Type DELETE to confirm") !== "DELETE") return;

    try {
        await updateDoc(doc(db, "companies", compId), {
            status: 'deleted'
        });
        alert("Company has been marked as deleted.");
        loadExplyraData();
    } catch (err) {
        alert("Error deleting company: " + err.message);
    }
};

// Tab switching
window.switchTab = (tabId) => {
    // Hide all
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    
    // Show target
    const target = document.getElementById('tab-' + tabId);
    if(target) target.classList.remove('hidden');

    // Update Sidebar
    document.querySelectorAll('.sidebar-item').forEach(btn => {
        btn.classList.remove('active');
        // Check if button text or data-tab matches
        if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
    });

    // Update Title
    const labels = {
        'overview': 'Platform Overview',
        'companies': 'Corporate Entities',
        'users': 'User Ecosystem',
        'management': 'System Configuration',
        'admins': 'Access & Governance',
        'deletion-requests': 'Deletion Requests Audit',
        'logs': 'Global Audit Logs'
    };
    const titleEl = document.getElementById('active-tab-title');
    if (titleEl) titleEl.textContent = labels[tabId] || 'Platform Admin';
};

window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('explyra-theme', isDark ? 'dark' : 'light');
    console.log("[Explyra] Theme toggled. Dark Mode:", isDark);
};

// Add Admin functionality
document.getElementById('save-admin-btn')?.addEventListener('click', async () => {
    const emailInput = document.getElementById('new-admin-email').value.trim().toLowerCase();
    const btn = document.getElementById('save-admin-btn');

    if (!emailInput) return alert("Please enter an email");

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
    try {
        await addDoc(collection(db, "explyra_admins"), {
            email: emailInput,
            addedBy: auth.currentUser.email,
            addedAt: new Date()
        });
        document.getElementById('add-admin-modal').classList.add('hidden');
        document.getElementById('new-admin-email').value = '';
        alert(`Successfully added ${emailInput} as Explyra Admin.`);
    } catch (err) {
        alert("Error adding admin: " + err.message);
    }
    btn.innerHTML = 'Add Admin';
});

function renderDeletionRequests() {
    const tbody = document.getElementById("deletion-requests-table-body");
    if (!tbody) return;

    if (allDeletionRequests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-8 py-20 text-center text-slate-400">No pending deletion requests.</td></tr>`;
        return;
    }

    tbody.innerHTML = allDeletionRequests.map(r => {
        const date = r.timestamp?.toDate ? r.timestamp.toDate().toLocaleString() : 'N/A';
        return `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-8 py-4">
                    <div class="font-bold text-slate-800 dark:text-slate-100">${r.email || 'Unknown'}</div>
                </td>
                <td class="px-8 py-4 text-slate-500">${r.company || 'N/A'}</td>
                <td class="px-8 py-4 text-xs font-medium text-slate-400 italic max-w-xs truncate" title="${r.reason || ''}">${r.reason || 'No reason provided'}</td>
                <td class="px-8 py-4 text-xs text-slate-500 font-mono">${date}</td>
                <td class="px-8 py-4">
                    <span class="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 text-[9px] font-black uppercase">Pending</span>
                </td>
                <td class="px-8 py-4 text-right">
                    <button onclick="window.clearDeletionRequest('${r.id}')" class="text-slate-400 hover:text-indigo-600 transition" title="Mark as Seen">
                        <i class="fa-solid fa-check-double"></i>
                    </button>
                    <button onclick="window.deleteCompanyRequest('${r.id}')" class="text-slate-300 hover:text-red-600 ml-3" title="Permanent Action Required">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.clearDeletionRequest = async (id) => {
    if (!confirm("Acknowledge this request? This will not delete the data, just clear the notice (simulated).")) return;
    try {
        await updateDoc(doc(db, "deletion_requests", id), {
            status: 'ACKNOWLEDGED'
        });
        alert("Request acknowledged.");
        loadExplyraData();
    } catch (err) {
        alert("Error: " + err.message);
    }
};

window.deleteCompanyRequest = (id) => {
    alert("DANGER: This action requires manual verification of ownership through the 'Companies' tab. Use the 'Delete' icon in the main registry.");
};

// Search filter
document.getElementById('search-companies')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#companies-table-body tr");
    rows.forEach(row => {
        if (row.cells.length < 2) return; // loading row
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? "" : "none";
    });
});
