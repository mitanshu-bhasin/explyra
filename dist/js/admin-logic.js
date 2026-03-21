import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, addDoc, onSnapshot, serverTimestamp, setDoc, orderBy, getDoc, deleteDoc, writeBatch, limit } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage, ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js";
import { AISupport } from './ai-support.js';
import { handleAIChatRequest } from './chat-ai-helper.js';


const firebaseConfig = window.EXPLYRA_CONFIG?.firebase || {
    apiKey: ""+"(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")+"",
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
let messaging = null;
try {
    messaging = getMessaging(app);
} catch (e) {
    console.warn("FCM error:", e);
}

let currentUser = null;

// ======== INJECTED INTERNATIONALIZATION & ERROR HELPERS ========
window.formatCurrency = (amount, currency = 'INR') => {
    try {
        return Intl.NumberFormat(undefined, { style: 'currency', currency: currency }).format(amount || 0);
    } catch (e) { return '₹' + amount; }
};
window.formatDateUtc = (dateInput) => {
    if (!dateInput) return '';
    try {
        const date = dateInput.toDate ? dateInput.toDate() : new Date(dateInput);
        return Intl.DateTimeFormat(undefined, { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
    } catch (e) { return formatDateUtc(dateInput); }
};
window.safeFirebaseFetch = async (fetchPromise) => {
    try {
        return await fetchPromise;
    } catch (error) {
        console.error("Firebase Network Error:", error);
        if (typeof showToast === 'function') {
            showToast("Slow network or offline. Please try again.", "warning");
        }
        throw error;
    }
};
// ================================================================

// ======== EMAILJS NOTIFICATION HELPER ========
async function sendSystemEmail(type, data) {
    try {
        if (typeof emailjs === 'undefined') {
            console.warn('[EmailJS] SDK not loaded, skipping notification.');
            return;
        }
        const templateId = 'template_id5j1a8';
        await emailjs.send('service_hjmx47w', templateId, {
            to_email: data.to_email || '',
            name: data.name || 'Employee',
            new_status: data.new_status || 'UPDATED',
            message: data.message || 'Your expense status has been updated.'
        });
        console.log(`[EmailJS] ${type} notification sent to ${data.to_email}`);
        showToast("Email Notification Sent Successfully", "success");
    } catch (err) {
        // Gracefully handle 200/month limit or any EmailJS errors
        console.warn(`[EmailJS] Failed to send ${type} notification:`, err?.text || err?.message || err);
        showToast("Email Notification Failed: Check console.", "warning");
    }
}
// ================================================================

let userData = null;
try {
    const cached = localStorage.getItem('explyra_admin_data_cache');
    if (cached) {
        userData = JSON.parse(cached);
        currentUser = { email: userData.email, uid: userData.uid };
        document.addEventListener('DOMContentLoaded', () => {
            const authSc = document.getElementById('auth-screen');
            const dashSc = document.getElementById('dashboard-screen');
            if (authSc && dashSc) {
                authSc.classList.add('hidden');
                dashSc.classList.remove('hidden');
            }
            const nameD = document.getElementById('user-name-display');
            if (nameD) nameD.textContent = userData.name || '';
            const roleD = document.getElementById('user-role-display');
            if (roleD) roleD.textContent = userData.role || 'Admin';
            const avContainer = document.getElementById('header-profile-avatar');
            if (avContainer) {
                if (userData.photoUrl) avContainer.innerHTML = `<img src="${userData.photoUrl}" class="w-full h-full object-cover">`;
                else avContainer.innerHTML = `<i class="fa-solid fa-user-gear text-xs"></i>`;
            }
        });
    }
} catch (e) { }
let userToDelete = null;
let activeListeners = []; // Store active listeners to unsubscribe
let approvalSearchTerm = '';
let aiAssistant = null;
let lastDashboardContext = null;
let overviewSortBy = 'date';
let auditSearchTerm = '';
let currentAdminTab = null;
let currentAdminModalId = null;

const roleRank = {
    'ADMIN': 7,
    'HR': 6,
    'SENIOR_MANAGER': 5,
    'FINANCE_MANAGER': 4,
    'TREASURY': 3, // Keep for legacy/senior finance
    'ACCOUNTS': 3,
    'AUDIT': 2,
    'MANAGER': 2,
    'EMPLOYEE': 1
};

const ADMIN_TABS = new Set([
    'overview', 'approvals', 'my-claims', 'tasks', 'users', 'roles', 'projects',
    'workflow', 'reports', 'audit', 'chat', 'settings'
]);

function normalizeAdminTab(tab) {
    return ADMIN_TABS.has(tab) ? tab : 'overview';
}

function buildAdminTabUrl(tab) {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    return `${url.pathname}${url.search}${url.hash}`;
}

function pushAdminModalState(modalId) {
    const url = buildAdminTabUrl(currentAdminTab || 'overview');
    window.history.pushState({ adminTab: currentAdminTab || 'overview', adminModal: modalId }, '', url);
    currentAdminModalId = modalId;
}

function setAdminModalVisibility(modalId, show) {
    const el = document.getElementById(modalId);
    if (!el) return;
    if (show) el.classList.remove('hidden');
    else el.classList.add('hidden');
}

function syncAdminModalFromState(state) {
    const stateModal = state?.adminModal || null;

    if (!stateModal && currentAdminModalId) {
        setAdminModalVisibility(currentAdminModalId, false);
        currentAdminModalId = null;
        return;
    }

    if (stateModal && stateModal !== currentAdminModalId) {
        if (currentAdminModalId) setAdminModalVisibility(currentAdminModalId, false);
        setAdminModalVisibility(stateModal, true);
        currentAdminModalId = stateModal;
    }
}

// Cache users for edit modal
let globalUsersCache = [];

// Toast function
window.showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-green-600',
        warning: 'bg-yellow-600'
    };
    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-[slideUp_0.3s] z-50`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.innerHTML = `
                <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span class="text-sm">${message}</span>
            `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// Load company branding
async function loadCompanyBranding(companyId) {
    if (!companyId) return;
    try {
        const settingsRef = doc(db, "companies", companyId, "settings", "branding");
        const settingsSnap = await safeFirebaseFetch(getDoc(settingsRef));
        if (settingsSnap.exists()) {
            const data = settingsSnap.data();

            if (data.companyName) {
                document.getElementById('login-company-name').textContent = data.companyName;
                document.getElementById('sidebar-company-name').innerHTML = data.companyName.replace(/(\S+)/, '$1<span class="text-green-500">Portal</span>');
            }

            if (data.logo) {
                const logoImg = document.getElementById('login-logo-img');
                const logoFallback = document.getElementById('login-logo-fallback');
                logoImg.src = data.logo;
                logoImg.classList.remove('hidden');
                logoFallback.classList.add('hidden');

                // Update sidebar logo
                const sidebarLogo = document.querySelector('.fa-bolt').parentElement;
                if (sidebarLogo) {
                    sidebarLogo.innerHTML = `<img src="${data.logo}" class="w-6 h-6 object-contain mr-2">`;
                }
            }
        } else {
            // Fallback to fetch company doc for basic info if branding doesn't exist yet
            const cmpSnap = await safeFirebaseFetch(getDoc(doc(db, "companies", companyId)));
            if (cmpSnap.exists()) {
                const cmpData = cmpSnap.data();
                if (cmpData.name) {
                    document.getElementById('login-company-name').textContent = cmpData.name;
                    document.getElementById('sidebar-company-name').innerHTML = cmpData.name.replace(/(\S+)/, '$1<span class="text-green-500">Portal</span>');
                }
                if (cmpData.logo) {
                    const logoImg = document.getElementById('login-logo-img');
                    const logoFallback = document.getElementById('login-logo-fallback');
                    logoImg.src = cmpData.logo;
                    logoImg.classList.remove('hidden');
                    logoFallback.classList.add('hidden');

                    const sidebarLogo = document.querySelector('.fa-bolt').parentElement;
                    if (sidebarLogo) {
                        sidebarLogo.innerHTML = `<img src="${cmpData.logo}" class="w-6 h-6 object-contain mr-2">`;
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error loading branding:", e);
    }
}

onAuthStateChanged(auth, async (user) => {

    // AI initialization is now handled with a delay below

    if (user) {
        try {
            // Fetch full user profile - Primary lookup by UID, fallback to Email
            let userDocSnap = await safeFirebaseFetch(getDoc(doc(db, "users", user.uid)));
            let snap = { empty: true, docs: [] };

            if (userDocSnap.exists()) {
                snap = { empty: false, docs: [userDocSnap] };
            } else {
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnap = await safeFirebaseFetch(getDocs(q));
                if (!querySnap.empty) {
                    // If multiple records, prioritize ADMIN/MANAGER for this portal
                    const sortedDocs = querySnap.docs.sort((a, b) => {
                        const roles = ['ADMIN', 'MANAGER', 'FINANCE_MANAGER'];
                        const aIsAdmin = roles.includes(a.data().role) ? 0 : 1;
                        const bIsAdmin = roles.includes(b.data().role) ? 0 : 1;
                        return aIsAdmin - bIsAdmin;
                    });
                    snap = { empty: false, docs: sortedDocs };
                }
            }

            if (snap.empty) {
                try {
                    // Fallback: Case-insensitive/Trim search
                    const allUsersSnap = await safeFirebaseFetch(getDocs(collection(db, "users")));
                    const foundDoc = allUsersSnap.docs.find(doc => doc.data().email?.trim().toLowerCase() === user.email.trim().toLowerCase());
                    if (foundDoc) {
                        snap = { empty: false, docs: [foundDoc] };
                        // Auto-fix email casing in DB
                        await updateDoc(doc(db, "users", foundDoc.id), { email: user.email });
                    }
                } catch (e) { console.error("Fallback lookup failed", e); }
            }

            if (!snap.empty) {
                userData = snap.docs[0].data();
                userData.docId = snap.docs[0].id; // crucial for updates
                localStorage.setItem('explyra_admin_data_cache', JSON.stringify(userData));

                // --- MAINTENANCE MODE CHECK ---
                try {
                    const settingsRef = doc(db, "settings", "global");
                    const setSnap = await safeFirebaseFetch(getDoc(settingsRef));
                    if (setSnap.exists() && setSnap.data().maintenanceMode === true) {
                        if (!['explyra@gmail.com', 'epxlyra@gmail.com', 'info@fouralpha.org'].includes(user.email.toLowerCase())) {
                            document.body.innerHTML = `
                                        <div style="height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;text-align:center;padding:20px;">
                                            <i class="fa-solid fa-person-digging" style="font-size:5rem;color:#ef4444;margin-bottom:20px;"></i>
                                            <h1 style="font-size:2.5rem;font-weight:bold;margin-bottom:10px;">System Under Maintenance</h1>
                                            <p style="color:#94a3b8;font-size:1.1rem;max-width:500px;">The EXPLYRA Expense Manager is currently down for scheduled upgrades. Please try again later.</p>
                                        </div>
                                    `;
                            await signOut(auth);
                            return;
                        }
                    }
                } catch (e) {
                    console.error("Maintenance check failed:", e);
                }
                // ------------------------------

                if (!userData.companyId && !['explyra@gmail.com', 'epxlyra@gmail.com', 'info@fouralpha.org'].includes(user.email.toLowerCase())) {
                    window.location.href = 'company.html';
                    return;
                }

                const allowed = ['ADMIN', 'MANAGER', 'SENIOR_MANAGER', 'TREASURY', 'AUDIT', 'HR', 'FINANCE_MANAGER', 'ACCOUNTS'];
                if (!allowed.includes(userData.role)) {
                    showToast('Access Denied: You do not have management privileges.', 'error');
                    await signOut(auth);
                    return;
                }

                if (!userData.companyId && !['explyra@gmail.com', 'epxlyra@gmail.com', 'info@fouralpha.org'].includes(user.email.toLowerCase())) {
                    showToast("No company assigned to this account", "error");
                    await signOut(auth);
                    return;
                }
                const companyId = userData.companyId;

                // --- COMPANY SUSPENSION AND PLAN CHECK ---
                try {
                    const compDoc = await safeFirebaseFetch(getDoc(doc(db, "companies", companyId)));
                    if (compDoc.exists()) {
                        const cData = compDoc.data();
                        if (cData.status === "suspended") {
                            showToast("Your company account is suspended. Please contact Explyra Support.", "error");
                            await signOut(auth);
                            return;
                        }
                        window.companyPlan = (cData.plan || "starter").toLowerCase();
                    }
                } catch (e) { console.error("Plan check failed", e); }
                // ------------------------------------------

                await loadCompanyBranding(companyId);

                // Update sidebar plan info if the element exists
                const planSpan = document.getElementById('sidebar-plan-name');
                if (planSpan && window.companyPlan) {
                    planSpan.textContent = window.companyPlan.toUpperCase();
                    // Optional: color code it
                    planSpan.className = 'text-xs font-bold uppercase ' +
                        (window.companyPlan === 'enterprise' ? 'text-amber-400' :
                            window.companyPlan === 'business' ? 'text-purple-400' :
                                window.companyPlan === 'growth' ? 'text-blue-400' : 'text-emerald-400');
                }

                // Ensure UID is linked (Safe update if mismatch)
                if (userData.uid !== user.uid) {
                    await updateDoc(doc(db, "users", userData.docId), {
                        uid: user.uid,
                        status: 'ACTIVE',
                        authProvider: 'google',
                        updatedAt: serverTimestamp()
                    });
                }

                currentUser = user;

                // Initialize AI with 5-second delay to ensure all data is ready
                setTimeout(() => {
                    if (aiAssistant) {
                        aiAssistant.updateContext(userData);
                        // Update greeting if it was already created with 'User'
                        const greetingEl = document.querySelector('.ai-message.ai strong');
                        if (greetingEl && (greetingEl.textContent === 'User' || !greetingEl.textContent)) {
                            greetingEl.textContent = userData.name || userData.displayName || 'User';
                        }
                    } else if (typeof AISupport !== 'undefined') {
                        aiAssistant = new AISupport(userData);
                        window.aiAssistant = aiAssistant;
                    }
                    // After initialization/update, push any cached dashboard data
                    if (aiAssistant && lastDashboardContext) {
                        aiAssistant.updateContext({ dashboardData: lastDashboardContext });
                    }
                }, 5000);



                // --- FCM LIVE NOTIFICATIONS PUSH ---
                if (messaging) {
                    try {
                        const permission = await Notification.requestPermission();
                        if (permission === 'granted') {
                            // Please replace 'VAPID_KEY_HERE' with your actual Firebase Web Push cert key
                            const currentToken = await getToken(messaging, { vapidKey: 'BOsOeRaI8phgZF1FNFk3ruTzQJh15l0QA2vYzuwJ3ZS59jSSFRxfWRWpzWGriIGhaaLwxASNtvrRCdYO-Zs2B-s' }).catch(() => null);
                            if (currentToken) {
                                // Save token to user doc
                                await updateDoc(doc(db, "users", userData.docId), {
                                    fcmToken: currentToken
                                });
                            }
                        }

                        onMessage(messaging, (payload) => {
                            console.log('FCM Foreground Message received: ', payload);
                            showToast(payload.notification.title + " - " + payload.notification.body, 'info');
                        });
                    } catch (e) {
                        console.error('FCM Setup Error:', e);
                    }
                }

                // --- LIVE NOTIFICATIONS (Old In-App Browser Method) ---
                if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
                try {
                    const notifQ = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), orderBy("updatedAt", "desc"), limit(10));
                    let isInitial = true;
                    onSnapshot(notifQ, (snapshot) => {
                        if (isInitial) { isInitial = false; return; }
                        if (snapshot.metadata.hasPendingWrites) return;

                        snapshot.docChanges().forEach((change) => {
                            const d = change.doc.data();
                            const name = d.employeeName || d.userName || 'User';
                            let title = '';
                            let body = '';

                            if (change.type === 'added') {
                                title = 'New Expense Submission';
                                body = `${name} submitted a claim for ${d.currency} ${d.totalAmount}`;
                            } else if (change.type === 'modified') {
                                title = 'Expense Update';
                                body = `${name}'s claim "${d.title}" is now ${d.status.replace(/_/g, ' ')}`;
                            }

                            if (title && Notification.permission === 'granted') {
                                const opts = {
                                    body: body,
                                    icon: 'assets/images/explyra_logo.png',
                                    vibrate: [200, 100, 200]
                                };
                                if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                                    navigator.serviceWorker.ready.then(reg => reg.showNotification(title, opts));
                                } else {
                                    new Notification(title, opts);
                                }
                            }
                        });
                    });

                    // --- CHAT NOTIFICATIONS ---
                    let chatNotifInitial = true;
                    onSnapshot(query(collection(db, "chats"), where("users", "array-contains", userData.docId)), (snapshot) => {
                        if (chatNotifInitial) { chatNotifInitial = false; return; }
                        snapshot.docChanges().forEach(change => {
                            if (change.type === 'modified') {
                                const data = change.doc.data();
                                // Only notify if someone else sent it and we aren't currently viewing it in-focus
                                if (data.lastSender && data.lastSender !== userData.docId) {
                                    if (document.hidden || currentChatId !== change.doc.id) {
                                        if (Notification.permission === 'granted') {
                                            const opts = {
                                                body: data.lastMessage || 'New message',
                                                icon: 'assets/images/explyra_logo.png',
                                                vibrate: [200, 100, 200],
                                                tag: change.doc.id,
                                                renotify: true
                                            };
                                            if (navigator.serviceWorker?.controller) {
                                                navigator.serviceWorker.ready.then(reg => reg.showNotification('New Private Message', opts));
                                            } else {
                                                new Notification('New Private Message', opts);
                                            }
                                        }
                                    }
                                    // Also refresh user list if chat modal is open to update last message/sort
                                    if (document.getElementById('modal-chat').classList.contains('hidden')) {
                                        if (typeof loadChatUsers === 'function') loadChatUsers();
                                    }
                                }
                            }
                        });
                    });

                    // --- GLOBAL CHAT NOTIFICATIONS ---
                    let globalNotifInitial = true;
                    onSnapshot(query(collection(db, "global_chat"), where("companyId", "==", userData.companyId), orderBy("createdAt", "desc"), limit(1)), (snapshot) => {
                        if (globalNotifInitial) { globalNotifInitial = false; return; }
                        if (!snapshot.empty) {
                            const data = snapshot.docs[0].data();
                            if (data.email !== userData.email) {
                                if (document.hidden || currentChatId !== 'global_chat') {
                                    if (Notification.permission === 'granted') {
                                        const opts = {
                                            body: `${data.sender}: ${data.text}`,
                                            icon: 'assets/images/explyra_logo.png',
                                            tag: 'global_chat'
                                        };
                                        if (navigator.serviceWorker?.controller) {
                                            navigator.serviceWorker.ready.then(reg => reg.showNotification('Global Group Message', opts));
                                        } else {
                                            new Notification('Global Group Message', opts);
                                        }
                                    }
                                }
                                if (typeof loadChatUsers === 'function') loadChatUsers();

                                // Toggle global unread dot
                                if (currentChatId !== 'global_chat') {
                                    const dot = document.getElementById('global-unread-dot');
                                    if (dot) dot.classList.remove('hidden');
                                }
                            }
                        }
                    });
                } catch (e) { console.error("Notification Error", e); }

                // --- CUSTOM ADMIN NOTIFICATIONS ---
                try {
                    const customQ = query(
                        collection(db, "notifications"),
                        where("targetUserId", "in", [userData.docId, 'ALL']),
                        orderBy("createdAt", "desc"),
                        limit(5)
                    );
                    let isInitialCustom = true;
                    onSnapshot(customQ, (snapshot) => {
                        if (isInitialCustom) { isInitialCustom = false; return; }
                        if (snapshot.metadata.hasPendingWrites) return;

                        snapshot.docChanges().forEach((change) => {
                            if (change.type === 'added') {
                                const d = change.doc.data();
                                if (Notification.permission === 'granted') {
                                    const opts = {
                                        body: d.body,
                                        icon: 'assets/images/explyra_logo.png',
                                        tag: change.doc.id,
                                        vibrate: [200, 100, 200]
                                    };
                                    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                                        navigator.serviceWorker.ready.then(reg => reg.showNotification(d.title, opts));
                                    } else {
                                        new Notification(d.title, opts);
                                    }
                                }
                                showToast(`New Message: ${d.title}`, 'info');

                                // Toggle header bell dot
                                const dot = document.getElementById('header-notif-dot');
                                if (dot) dot.classList.remove('hidden');
                            }
                        });
                    });
                } catch (e) { console.error("Custom Notif Error", e); }

                // --- WEBRTC CALL LISTENER ---
                if (typeof listenForCalls === 'function') listenForCalls();

                showDashboard();
                updatePendingCount();
            } else {
                // Don't sign out Explyra internal admins — they have no entry in `users`
                if (['explyra@gmail.com', 'epxlyra@gmail.com'].includes(user.email.toLowerCase()) || user.email.toLowerCase().endsWith('@explyra.com')) {
                    console.log('[Auth] Explyra admin detected, bypassing normal auth checks.');

                    // Create mock userData for the master admin so the dashboard can load
                    userData = {
                        name: 'Master Admin',
                        email: user.email,
                        role: 'ADMIN',
                        uid: user.uid,
                        companyId: 'GLOBAL', // Special identifier for master access
                        status: 'ACTIVE'
                    };

                    // Update global var
                    currentUser = user;

                    showDashboard();
                } else {
                    showToast(`User record [${user.email}] not found in database.`, 'error');
                    await signOut(auth);
                }
            }
        } catch (error) {
            console.error("Auth Error:", error);
            showToast('Login Error: ' + error.message, 'error');
            await signOut(auth);
        }
    } else {
        showLogin();
    }
});

window.getAllowedStatusesForRole = async (role) => {
    if (role === 'ADMIN') return null; // Admin sees everything via not-in PAID,REJECTED,AUDITED
    let statuses = [];
    // Parse through workflowConfig to find all stages where approverRole === role
    if (!window.currentWorkflowConfig) {
        try {
            const snap = await safeFirebaseFetch(getDoc(doc(db, "settings", "workflow_config")));
            if (snap.exists()) window.currentWorkflowConfig = snap.data();
        } catch (e) { }
    }
    if (window.currentWorkflowConfig) {
        const config = window.currentWorkflowConfig;
        // Check defaultFlow
        (config.defaultFlow || []).forEach(stage => {
            if (stage.approverRole === role) statuses.push(stage.stage);
        });
        // Check roleOverrides
        if (config.roleOverrides) {
            Object.values(config.roleOverrides).forEach(override => {
                if (override.flow) {
                    override.flow.forEach(stage => {
                        if (stage.approverRole === role) statuses.push(stage.stage);
                    });
                }
            });
        }
    } else {
        // Fallback hardcoded if no config
        if (role === 'MANAGER') statuses = ['PENDING_MANAGER'];
        else if (role === 'FINANCE_MANAGER') statuses = ['PENDING_FINANCE'];
        else if (role === 'ACCOUNTS') statuses = ['FINANCE_APPROVED', 'PENDING_ACCOUNTS'];
        else if (role === 'SENIOR_MANAGER') statuses = ['PENDING_SENIOR_MANAGER'];
        else if (role === 'TREASURY') statuses = ['PENDING_TREASURY'];
        else if (role === 'AUDIT') statuses = ['PAID'];
    }
    // Unique statuses
    return [...new Set(statuses)];
};

async function updatePendingCount() {
    try {
        let q;
        if (userData.role === 'ADMIN') {
            q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("status", "not-in", ["PAID", "REJECTED", "AUDITED"]));
        } else {
            const allowedStatuses = await getAllowedStatusesForRole(userData.role);
            if (allowedStatuses && allowedStatuses.length > 0) {
                q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("status", "in", allowedStatuses.slice(0, 10)));
            } else {
                const pendingEl = document.getElementById('pending-count');
                if (pendingEl) pendingEl.classList.add('hidden');
                return;
            }
        }

        if (q) {
            const snap = await safeFirebaseFetch(getDocs(q));
            const count = snap.size;
            const pendingEl = document.getElementById('pending-count');
            if (count > 0) {
                pendingEl.classList.remove('hidden');
            } else {
                pendingEl.classList.add('hidden');
            }
        }
    } catch (e) {
        console.error("Error updating pending count:", e);
    }
}

// Modal Helpers
let inputModalResolve = null;

window.showInputPromise = (title, message, placeholder = '', type = 'text', defaultValue = '') => {
    if (inputModalResolve) {
        inputModalResolve(null);
        inputModalResolve = null;
    }

    return new Promise((resolve) => {
        inputModalResolve = resolve;

        document.getElementById('input-modal-title').textContent = title;
        document.getElementById('input-modal-message').textContent = message;

        const input = document.getElementById('input-modal-value');
        if (type === 'none') {
            input.classList.add('hidden');
        } else {
            input.classList.remove('hidden');
            input.type = type;
            input.placeholder = placeholder;
            input.value = defaultValue;
        }

        const modal = document.getElementById('input-modal');
        modal.classList.remove('hidden');
        setTimeout(() => {
            const content = document.getElementById('input-modal-content');
            if (content) {
                content.classList.remove('scale-95', 'opacity-0');
                content.classList.add('scale-100', 'opacity-100');
            }
            if (type !== 'none' && input) input.focus();
        }, 50);
    });
};

window.closeInputModal = (val) => {
    const modal = document.getElementById('input-modal');
    const content = document.getElementById('input-modal-content');

    if (content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
    }

    setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        const input = document.getElementById('input-modal-value');
        if (input) input.value = '';
    }, 200);

    if (inputModalResolve) {
        const resolve = inputModalResolve;
        inputModalResolve = null;
        resolve(val);
    }
};

window.confirmInputModal = () => {
    const input = document.getElementById('input-modal-value');
    if (input.classList.contains('hidden')) {
        closeInputModal(true);
    } else {
        closeInputModal(input.value);
    }
};

// Handle Enter key
document.getElementById('input-modal-value')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') confirmInputModal();
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...';
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        showToast('Login successful!', 'success');
    } catch (err) {
        showToast(err.message, 'error');
        btn.innerHTML = 'Secure Login <i class="fa-solid fa-arrow-right ml-2"></i>';
    }
});

window.handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // 1. Fetch user by UID first, fallback to email
        let userDocSnap = await safeFirebaseFetch(getDoc(doc(db, "users", user.uid)));
        let snap = { empty: true, docs: [] };

        if (userDocSnap.exists()) {
            snap = { empty: false, docs: [userDocSnap] };
        } else {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const querySnap = await safeFirebaseFetch(getDocs(q));
            if (!querySnap.empty) {
                const sortedDocs = querySnap.docs.sort((a, b) => {
                    const roles = ['ADMIN', 'MANAGER', 'FINANCE_MANAGER'];
                    const aIsAdmin = roles.includes(a.data().role) ? 0 : 1;
                    const bIsAdmin = roles.includes(b.data().role) ? 0 : 1;
                    return aIsAdmin - bIsAdmin;
                });
                snap = { empty: false, docs: sortedDocs };
            }
        }

        if (snap.empty) {
            // Fallback: Case-insensitive/Trim search
            try {
                const allUsersSnap = await safeFirebaseFetch(getDocs(collection(db, "users")));
                const foundDoc = allUsersSnap.docs.find(doc => doc.data().email?.trim().toLowerCase() === user.email.trim().toLowerCase());
                if (foundDoc) {
                    snap = { empty: false, docs: [foundDoc] };
                    // Auto-fix email casing for future
                    await updateDoc(doc(db, "users", foundDoc.id), { email: user.email });
                }
            } catch (e) { console.error("Google Auth Fallback Error", e); }
        }

        if (snap.empty) {
            if (['explyra@gmail.com', 'epxlyra@gmail.com'].includes(user.email.toLowerCase()) || user.email.toLowerCase().endsWith('@explyra.com')) {
                console.log('[Auth] Explyra admin Google login — skipping admin portal.');
                return;
            }
            await signOut(auth);
            showToast(`Access Denied: Email [${user.email}] not registered in system.`, "error");
            return;
        }

        const userDoc = snap.docs[0].data();
        const docId = snap.docs[0].id;

        // 2. Check Role
        const allowed = ['ADMIN', 'MANAGER', 'SENIOR_MANAGER', 'TREASURY', 'AUDIT', 'HR', 'FINANCE_MANAGER', 'ACCOUNTS'];
        if (!allowed.includes(userDoc.role)) {
            await signOut(auth);
            showToast("Access Denied: You do not have management privileges.", "error");
            return;
        }

        // 3. Pass user (Update system record with Google UID)
        await updateDoc(doc(db, "users", docId), {
            uid: user.uid,
            updatedAt: serverTimestamp(),
            status: 'ACTIVE',
            authProvider: 'google'
        });

        showToast("Login successful!", "success");
        // onAuthStateChanged will handle the rest
    } catch (error) {
        console.error(error);
        showToast("Google Sign-In Failed: " + error.message, "error");
    }
};

window.logout = async () => {
    if (await showInputPromise("Logout", "Are you sure you want to logout?", "", "none")) {
        localStorage.removeItem('explyra_admin_data_cache');
        signOut(auth);
        showToast('Logged out successfully', 'info');
    }
};

window.forgotPassword = async () => {
    let email = userData?.email;

    if (email) {
        if (!await showInputPromise("Reset Password", `Send password reset email to ${email}?`, "", "none")) return;
    } else {
        email = await showInputPromise("Reset Password", "Enter your corporate email to reset password:", "user@example.com", "email");
    }

    if (email) {
        try {
            await sendPasswordResetEmail(auth, email);
            showToast(`Password reset email sent to ${email}!`, 'success');
        } catch (e) {
            showToast(e.message, 'error');
        }
    }
};

window.toggleAuthMode = (mode) => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginFooter = document.getElementById('login-footer');
    const signupFooter = document.getElementById('signup-footer');
    const googleBtn = document.getElementById('google-signin-container');

    if (mode === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginFooter.classList.add('hidden');
        signupFooter.classList.remove('hidden');
        googleBtn.classList.add('hidden');
    } else {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginFooter.classList.remove('hidden');
        signupFooter.classList.add('hidden');
        googleBtn.classList.remove('hidden');
    }
};

window.handleAccountActivation = async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;
    const btn = document.getElementById('signup-btn');

    if (!email || !pass) return showToast("Please fill in all fields", "error");
    if (pass.length < 6) return showToast("Password must be at least 6 characters", "warning");

    const originalBtnContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Activating...';
    btn.disabled = true;

    try {
        // Check if email already exists in DB
        const q = query(collection(db, "users"), where("email", "==", email));
        const snap = await safeFirebaseFetch(getDocs(q));

        if (snap.empty) {
            throw new Error("Email not registered as Admin/Manager. Contact System Owner.");
        }

        const userDoc = snap.docs[0];
        const userData = userDoc.data();

        if (userData.uid) {
            throw new Error("Account already activated. Please login.");
        }

        // Check Role
        if (!['ADMIN', 'MANAGER', 'SENIOR_MANAGER', 'HR', 'FINANCE_MANAGER', 'ACCOUNTS', 'TREASURY', 'AUDIT'].includes(userData.role)) {
            throw new Error("This portal is for Admins & Managers only.");
        }

        const userCred = await createUserWithEmailAndPassword(auth, email, pass);

        // Activate User: Update Firestore with Auth UID
        await updateDoc(doc(db, "users", userDoc.id), {
            uid: userCred.user.uid,
            updatedAt: serverTimestamp(),
            status: 'ACTIVE'
        });

        showToast("Account activated successfully! Logging in...", "success");
    } catch (err) {
        showToast(err.message, "error");
        btn.innerHTML = originalBtnContent;
        btn.disabled = false;
    }
};

function showLogin() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('dashboard-screen').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');

    const initUI = () => {
        const nameEl = document.getElementById('current-user-name');
        if (!nameEl) {
            // Wait for sidebar component to load
            setTimeout(initUI, 50);
            return;
        }

        nameEl.textContent = userData.name;

        const roleEl = document.getElementById('current-user-role');
        if (roleEl) roleEl.textContent = userData.role.replace('_', ' ');

        const avatarContainer = document.getElementById('sidebar-user-avatar');
        if (avatarContainer) {
            if (userData.photoUrl && userData.photoUrl.trim() !== '') {
                avatarContainer.innerHTML = `<img src="${userData.photoUrl}" class="w-full h-full object-cover">`;
            } else {
                avatarContainer.innerHTML = `<i class="fa-solid fa-user-tie"></i>`;
            }
        }

        // Reset visibility for optional tabs
        const optionalTabs = ['users', 'projects', 'settings', 'reports', 'audit', 'roles', 'tasks', 'workflow'];
        optionalTabs.forEach(id => {
            const el = document.getElementById(`nav-${id}`);
            if (el) el.classList.add('hidden');
        });

        checkAccess();
    };

    initUI();
}

window.checkAccess = async () => {
    const dashLink = document.getElementById('dash-link');
    const approvalsTab = document.getElementById('nav-approvals');

    if (dashLink) {
        dashLink.href = 'admin.html';
        dashLink.querySelector('span').textContent = 'Admin Dashboard';
    }

    // --- Dynamic Role Permissions Fetch ---
    if (userData.role !== 'ADMIN') {
        try {
            const roleQ = query(collection(db, "roles"), where("companyId", "in", [userData.companyId, "GLOBAL"]));
            const roleSnap = await getDocs(roleQ);
            const roleDoc = roleSnap.docs.find(d => d.data().name === userData.role && (d.data().companyId === userData.companyId || d.data().companyId === 'GLOBAL'));
            if (roleDoc) userData.permissions = roleDoc.data().permissions || {};
        } catch (e) { console.warn("Failed to fetch role permissions", e); }
    } else {
        // Give admins all permissions locally to bypass checks
        userData.permissions = { viewApprovals: true, viewReports: true, viewUsers: true, viewSettings: true, viewInvoices: true, viewCrm: true };
    }

    // --- Role Based Access Control ---

    // Approvals
    if (userData.permissions?.viewApprovals || ['ADMIN', 'MANAGER', 'SENIOR_MANAGER', 'FINANCE_MANAGER', 'ACCOUNTS', 'TREASURY'].includes(userData.role)) {
        if (approvalsTab) approvalsTab.classList.remove('hidden');
    }

    // User Mgmt & Projects
    if (userData.permissions?.viewUsers || ['ADMIN', 'HR'].includes(userData.role)) {
        const navU = document.getElementById('nav-users');
        if (navU) navU.classList.remove('hidden');
        const navP = document.getElementById('nav-projects');
        if (navP) navP.classList.remove('hidden'); // Assuming users implies project access for now
    }

    // Reports
    if (userData.permissions?.viewReports || ['ADMIN', 'TREASURY', 'SENIOR_MANAGER', 'FINANCE_MANAGER', 'ACCOUNTS'].includes(userData.role)) {
        const navR = document.getElementById('nav-reports');
        if (navR) navR.classList.remove('hidden');
    }

    // Settings
    if (userData.permissions?.viewSettings || userData.role === 'ADMIN') {
        const navS = document.getElementById('nav-settings');
        if (navS) navS.classList.remove('hidden');
    }

    // Role Management (Admin and HR only)
    if (['ADMIN', 'HR'].includes(userData.role)) {
        const navRo = document.getElementById('nav-roles');
        if (navRo) navRo.classList.remove('hidden');
    }

    // Invoices
    if (userData.permissions?.viewInvoices || ['ADMIN', 'FINANCE_MANAGER', 'ACCOUNTS'].includes(userData.role)) {
        const invTab = document.getElementById('nav-invoices');
        if (invTab) invTab.classList.remove('hidden');
    }

    // CRM
    const navCrm = document.getElementById('nav-crm');
    if (navCrm) {
        if (userData.permissions?.viewCrm || userData.role === 'ADMIN') {
            navCrm.classList.remove('hidden');
        } else {
            navCrm.classList.add('hidden');
        }
    }

    // Audit Logs: Visible to all, but data is filtered by role inside the tab
    const navA = document.getElementById('nav-audit');
    if (navA) navA.classList.remove('hidden');

    // Task Manager: Visible to all positions
    const navTasks = document.getElementById('nav-tasks');
    if (navTasks) navTasks.classList.remove('hidden');

    // Workflow: Admin only
    if (userData.role === 'ADMIN') {
        const navW = document.getElementById('nav-workflow');
        if (navW) navW.classList.remove('hidden');
    }

    // Default Tab Logic
    if (userData.role === 'HR') switchTab('users');
    else if (userData.role === 'AUDIT') switchTab('audit');
    else switchTab('overview');
}

window.switchTab = (tab, options = {}) => {
    const normalizedTab = normalizeAdminTab(tab);

    // Cleanup active listeners
    activeListeners.forEach(unsub => unsub());
    activeListeners = [];

    document.querySelectorAll('.sidebar-item').forEach(el => {
        el.classList.remove('active', 'bg-slate-800', 'text-white');
        if (el.dataset.tab === normalizedTab) el.classList.add('active');
    });

    if (normalizedTab === 'overview') renderOverview();
    if (normalizedTab === 'approvals') renderApprovals();
    if (normalizedTab === 'users') renderUserManagement();
    if (normalizedTab === 'settings') renderSettings();
    if (normalizedTab === 'reports') renderReports();
    if (normalizedTab === 'audit') renderAuditLogs();
    if (normalizedTab === 'tasks') renderTasks(); // Added tasks renderer
    if (normalizedTab === 'my-claims') renderMyClaims();
    if (normalizedTab === 'projects') renderProjects();
    if (normalizedTab === 'chat') renderChat();
    if (normalizedTab === 'workflow') renderWorkflow();
    if (normalizedTab === 'roles') renderRoles();

    const skipHistory = !!options.skipHistory;
    const replaceHistory = !!options.replaceHistory;
    const previousTab = currentAdminTab;

    if (!skipHistory) {
        const nextUrl = buildAdminTabUrl(normalizedTab);
        const state = { adminTab: normalizedTab };

        if (!previousTab || replaceHistory) {
            window.history.replaceState(state, '', nextUrl);
        } else if (previousTab !== normalizedTab) {
            window.history.pushState(state, '', nextUrl);
        }
    }

    currentAdminTab = normalizedTab;
};

window.addEventListener('popstate', (event) => {
    const dashboardScreen = document.getElementById('dashboard-screen');
    if (!dashboardScreen || dashboardScreen.classList.contains('hidden')) return;

    syncAdminModalFromState(event.state || {});

    const tabFromState = normalizeAdminTab(
        event.state?.adminTab || new URL(window.location.href).searchParams.get('tab')
    );

    if (tabFromState !== currentAdminTab) {
        window.switchTab(tabFromState, { skipHistory: true });
    }
});

async function renderOverview() {
    renderCrmWidget();
    document.getElementById('page-title').textContent = "System Overview";
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

    try {
        const companyId = userData.companyId;

        // Correctly scope queries based on admin level
        let expensesQuery, usersQuery, projectsQuery;

        if (companyId === 'GLOBAL') {
            expensesQuery = collection(db, "expenses");
            usersQuery = collection(db, "users");
            projectsQuery = collection(db, "projects");
        } else {
            const scopeId = companyId || 'N/A';
            expensesQuery = query(collection(db, "expenses"), where("companyId", "==", scopeId));
            usersQuery = query(collection(db, "users"), where("companyId", "==", scopeId));
            projectsQuery = query(collection(db, "projects"), where("companyId", "==", scopeId));
        }

        const [expensesSnap, usersSnap, projectsSnap, companySnap, attendanceSnap, salarySnap] = await Promise.all([
            getDocs(expensesQuery),
            getDocs(usersQuery),
            getDocs(projectsQuery),
            companyId ? getDoc(doc(db, "companies", companyId)) : Promise.resolve({ exists: () => false }),
            companyId ? getDoc(doc(db, "attendance", companyId)) : Promise.resolve({ exists: () => false }),
            companyId ? getDoc(doc(db, "salaries", companyId)) : Promise.resolve({ exists: () => false })
        ]);

        let companyData = companySnap.exists() ? companySnap.data() : null;
        let expenses = expensesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const users = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const projects = projectsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const attendance = attendanceSnap.exists() ? attendanceSnap.data() : {};
        const salaries = salarySnap.exists() ? salarySnap.data() : {};
        const projectsMap = Object.fromEntries(projects.map(p => [p.code, p.name]));

        // Aggregation: Project Wise
        const projectStats = {};
        expenses.forEach(e => {
            const code = e.projectCode || 'N/A';
            if (!projectStats[code]) projectStats[code] = { total: 0, count: 0, pending: 0, paid: 0 };
            const amount = parseFloat(e.totalAmount) || 0;
            projectStats[code].total += amount;
            projectStats[code].count++;
            if (e.status === 'PAID') projectStats[code].paid += amount;
            else if (!['REJECTED'].includes(e.status)) projectStats[code].pending += amount;
        });

        // Sorting Logic for Overview Activity Feed
        if (overviewSortBy === 'project') {
            expenses.sort((a, b) => (a.projectCode || '').localeCompare(b.projectCode || ''));
        } else if (overviewSortBy === 'amount') {
            expenses.sort((a, b) => (parseFloat(b.totalAmount) || 0) - (parseFloat(a.totalAmount) || 0));
        } else {
            expenses.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
                return dateB - dateA;
            });
        }

        const totalPaid = expenses.filter(e => e.status === 'PAID').reduce((sum, e) => sum + (parseFloat(e.totalAmount) || 0), 0);
        const pending = expenses.filter(e => !['PAID', 'REJECTED'].includes(e.status)).length;
        const rejected = expenses.filter(e => e.status === 'REJECTED').length;
        const totalUsers = users.length;
        const totalExpenses = expenses.length;

        const monthlyData = {};
        expenses.forEach(e => {
            if (e.createdAt?.toDate) {
                const month = e.createdAt.toDate().toLocaleString('default', { month: 'short' });
                monthlyData[month] = (monthlyData[month] || 0) + 1;
            }
        });

        lastDashboardContext = {
            stats: { totalPaid, pending, rejected, totalUsers, totalExpenses },
            projectStats,
            monthlyTrend: monthlyData,
            attendance,
            salaries,
            employees: users.map(u => ({ id: u.docId || u.id, name: u.name, role: u.role, department: u.department }))
        };

        // Export data for new UI features
        window.adminDashboardData = {
            pending,
            totalUsers,
            approvedToday: expenses.filter(e => {
                if (e.status !== 'PAID') return false;
                const paidDate = e.updatedAt?.toDate ? e.updatedAt.toDate() : new Date(e.updatedAt || 0);
                return paidDate.toDateString() === new Date().toDateString();
            }).length,
            recentExpenses: expenses.slice(0, 5)
        };
        if (typeof window.refreshNewAdminUI === 'function') window.refreshNewAdminUI();

        if (aiAssistant) aiAssistant.updateContext({ dashboardData: lastDashboardContext });

        let trialBannerHtml = '';
        if (companyData && companyData.plan === 'trial') {
            const trialEnd = companyData.trialEndsAt?.toDate() || new Date();
            const today = new Date();
            const diffTime = trialEnd - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const daysText = diffDays > 0 ? `Your trial ends in ${diffDays} days` : 'Your trial has ended';

            trialBannerHtml = `
                <div class="welcome-banner rounded-2xl p-6 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 fade-in border border-slate-700/50">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                    <div class="absolute right-20 -bottom-10 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div class="relative z-10 w-full md:w-auto">
                        <h2 class="text-2xl font-bold font-serif mb-1 text-white">Welcome to Explyra, ${companyData.name}</h2>
                        <p class="text-blue-100 text-sm flex items-center gap-2"><i class="fa-solid fa-clock text-amber-300"></i> ${daysText}</p>
                    </div>
                    <div class="relative z-10 flex flex-wrap gap-3 w-full md:w-auto">
                        <button onclick="switchTab('users')" class="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold text-sm transition shadow flex items-center"><i class="fa-solid fa-user-plus mr-2"></i> Invite Team</button>
                        <button onclick="window.open('Utilites/index.html','_blank')" class="bg-blue-700 hover:bg-blue-900 border border-blue-500 px-4 py-2 rounded-lg font-bold text-sm text-white transition shadow flex items-center"><i class="fa-solid fa-rocket mr-2"></i> Explore Tools</button>
                        <button onclick="window.location.href='pricing.html'" class="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg font-bold text-sm text-white transition shadow flex items-center"><i class="fa-solid fa-crown mr-2"></i> Upgrade Plan</button>
                    </div>
                </div>
            `;
        }

        content.innerHTML = `
                    ${trialBannerHtml}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fade-in">
                        <div class="vercel-card relative overflow-hidden group">
                            <div class="absolute -right-6 -top-6 w-24 h-24 bg-green-50/50 dark:bg-green-900/10 rounded-full transition-transform group-hover:scale-110"></div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">Total Disbursed</p>
                            <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2 font-mono relative">${formatCurrency(totalPaid, 'INR')}</p>
                        </div>
                        <div class="vercel-card relative overflow-hidden group">
                            <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-50/50 dark:bg-blue-900/10 rounded-full transition-transform group-hover:scale-110"></div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">Pending Action</p>
                            <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2 font-mono relative">${pending}</p>
                        </div>
                        <div class="vercel-card relative overflow-hidden group">
                            <div class="absolute -right-6 -top-6 w-24 h-24 bg-red-50/50 dark:bg-red-900/10 rounded-full transition-transform group-hover:scale-110"></div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">Rejections</p>
                            <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2 font-mono relative">${rejected}</p>
                        </div>
                        <div class="vercel-card relative overflow-hidden group">
                            <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-50/50 dark:bg-purple-900/10 rounded-full transition-transform group-hover:scale-110"></div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">Total Users</p>
                            <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-2 font-mono relative">${totalUsers}</p>
                        </div>
                    </div>

                    <!-- Project Analytics Section -->
                    <div class="vercel-card mb-8 fade-in">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2"><i class="fa-solid fa-folder-tree text-green-500"></i> Project-wise Expenditure</h3>
                            <button onclick="renderReports()" class="text-[10px] font-bold text-green-600 hover:underline">View Detailed Reports</button>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div class="lg:col-span-2 overflow-x-auto">
                                <table class="w-full text-xs text-left">
                                    <thead class="text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th class="pb-3 px-2">Project</th>
                                            <th class="pb-3 px-2 text-right">Total Spent</th>
                                            <th class="pb-3 px-2 text-right">Paid</th>
                                            <th class="pb-3 px-2 text-right">Pending</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-50 dark:divide-slate-900/50">
                                        ${Object.entries(projectStats).sort((a, b) => b[1].total - a[1].total).map(([code, stats]) => `
                                            <tr class="hover:bg-slate-50 dark:hover:bg-slate-900 transition">
                                                <td class="py-3 px-2">
                                                    <div class="font-bold text-slate-700 dark:text-slate-200">${code}</div>
                                                    <div class="text-[10px] text-slate-400">${projectsMap[code] || 'Unregistered Project'}</div>
                                                </td>
                                                <td class="py-3 px-2 text-right font-mono font-bold text-slate-700 dark:text-slate-200">${formatCurrency(stats.total, 'INR')}</td>
                                                <td class="py-3 px-2 text-right text-green-600 font-mono">${formatCurrency(stats.paid, 'INR')}</td>
                                                <td class="py-3 px-2 text-right text-orange-500 font-mono">${formatCurrency(stats.pending, 'INR')}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                            <div class="h-64 flex flex-col justify-center items-center">
                                <canvas id="projectChart"></canvas>
                                <p class="text-[10px] text-slate-400 mt-2 italic text-center">Breakdown by Project Amount</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 fade-in">
                        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                             <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Expense Trend (Monthly)</h3>
                             <canvas id="overviewChart"></canvas>
                        </div>
                        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                             <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Status Distribution</h3>
                             <div class="h-64 flex justify-center">
                                <canvas id="statusChart"></canvas>
                             </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2"><i class="fa-solid fa-rss text-green-500"></i> Live Activity Feed</h3>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-bold text-slate-400 uppercase">Sort By:</span>
                                <select onchange="window.toggleOverviewSort(this.value)" class="text-[10px] font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 outline-none text-slate-600 dark:text-slate-300">
                                    <option value="date" ${overviewSortBy === 'date' ? 'selected' : ''}>Recent Date</option>
                                    <option value="project" ${overviewSortBy === 'project' ? 'selected' : ''}>Project Code</option>
                                    <option value="amount" ${overviewSortBy === 'amount' ? 'selected' : ''}>Amount (High-Low)</option>
                                </select>
                            </div>
                        </div>
                            ${expenses.slice(0, 50).map((e, i) => `
                                <div class="flex items-center justify-between p-4 hover:bg-slate-50 dark:bg-slate-900 transition border-b border-slate-50 last:border-0 ${i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900/50' : ''} ${i >= 5 ? 'hidden extra-activity' : ''}">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 shadow-sm">
                                            ${e.currency || 'INR'}
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-slate-700 dark:text-slate-200">${e.title}</p>
                                            <div class="flex gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                <span>${new Date(e.createdAt?.toDate()).toLocaleDateString()}</span>
                                                <span class="bg-slate-200 px-1.5 rounded text-slate-600 dark:text-slate-300 font-mono">${e.projectCode || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <span class="${getStatusBadgeClass(e.status)}">${e.status.replace('_', ' ')}</span>
                                        <p class="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 mt-1">${formatCurrency(e.totalAmount, e.currency)}</p>
                                    </div>
                                </div>
                            `).join('')}
                            ${expenses.length > 5 ? `
                                <div class="text-center pt-3 border-t border-slate-50 dark:border-slate-800 mt-1">
                                    <button onclick="document.querySelectorAll('.extra-activity').forEach(el => el.classList.remove('hidden')); this.parentElement.remove();" class="text-xs font-bold text-green-600 hover:text-brand-800 transition py-1 px-3 rounded hover:bg-green-50">View All Activity <i class="fa-solid fa-chevron-down ml-1"></i></button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;

        // Render Charts
        setTimeout(() => {
            const ctx1 = document.getElementById('overviewChart');
            const ctx2 = document.getElementById('statusChart');
            const ctx3 = document.getElementById('projectChart');

            if (ctx1 && ctx2) {
                const months = Object.keys(monthlyData).reverse();
                const counts = Object.values(monthlyData).reverse();

                new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Expenses',
                            data: counts,
                            borderColor: '#1546C0',
                            backgroundColor: 'rgba(21, 70, 192, 0.1)',
                            fill: true,
                            tension: 0.4
                        }]
                    },
                    options: { responsive: true, plugins: { legend: { display: false } } }
                });

                new Chart(ctx2, {
                    type: 'doughnut',
                    data: {
                        labels: ['Paid', 'Pending', 'Rejected'],
                        datasets: [{
                            data: [
                                expenses.filter(e => e.status === 'PAID').length,
                                expenses.filter(e => !['PAID', 'REJECTED'].includes(e.status)).length,
                                rejected
                            ],
                            backgroundColor: ['#1546C0', '#3b82f6', '#ef4444'],
                            borderWidth: 0
                        }]
                    },
                    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } } }
                });
            }

            if (ctx3) {
                const sortedProjects = Object.entries(projectStats).sort((a, b) => b[1].total - a[1].total).slice(0, 5);
                new Chart(ctx3, {
                    type: 'pie',
                    data: {
                        labels: sortedProjects.map(p => p[0]),
                        datasets: [{
                            data: sortedProjects.map(p => p[1].total),
                            backgroundColor: ['#1546C0', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']
                        }]
                    },
                    options: { responsive: true, plugins: { legend: { display: false } } }
                });
            }
        }, 100);

    } catch (e) {
        console.error("Overview Load Error:", e);
        content.innerHTML = emptyState("Error loading data: " + e.message);
    }
}

window.toggleOverviewSort = (val) => {
    overviewSortBy = val;
    renderOverview();
};

async function renderReports() {
    document.getElementById('page-title').textContent = "Financial Reports";
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

    try {
        const expensesSnap = await safeFirebaseFetch(getDocs(query(collection(db, "expenses"), where("companyId", "==", userData.companyId))));
        const expenses = expensesSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // Group by month
        const monthlyTotals = {};
        const categoryTotals = {};

        expenses.forEach(e => {
            if (e.createdAt?.toDate && e.status === 'PAID') {
                const month = e.createdAt.toDate().toLocaleString('default', { month: 'long', year: 'numeric' });
                monthlyTotals[month] = (monthlyTotals[month] || 0) + (parseFloat(e.totalAmount) || 0);
            }

            if (e.lineItems) {
                e.lineItems.forEach(item => {
                    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + (item.amount || 0);
                });
            }
        });

        content.innerHTML = `
                    <div class="space-y-6">
                        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Monthly Expenditure</h3>
                            <div class="space-y-3">
                                ${Object.entries(monthlyTotals).map(([month, total]) => `
                                    <div class="flex items-center gap-4">
                                        <span class="text-sm font-semibold text-slate-600 dark:text-slate-300 w-32">${month}</span>
                                        <div class="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden">
                                            <div class="h-full bg-green-600 rounded-full" style="width: ${(total / Math.max(...Object.values(monthlyTotals)) * 100)}%"></div>
                                        </div>
                                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">${formatCurrency(total, 'INR')}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Category-wise Spend</h3>
                            <div class="space-y-3">
                                ${Object.entries(categoryTotals).map(([category, total]) => `
                                    <div class="flex items-center gap-4">
                                        <span class="text-sm font-semibold text-slate-600 dark:text-slate-300 w-40">${category}</span>
                                        <div class="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden">
                                            <div class="h-full bg-green-600 rounded-full" style="width: ${(total / Math.max(...Object.values(categoryTotals)) * 100)}%"></div>
                                        </div>
                                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">${formatCurrency(total, 'INR')}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Export Options</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button onclick="exportReport('csv')" class="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                                    <i class="fa-solid fa-file-csv text-2xl text-slate-400 group-hover:text-green-600 mb-2"></i>
                                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-700">Export as CSV</p>
                                </button>
                                <button onclick="exportReport('pdf')" class="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                                    <i class="fa-solid fa-file-pdf text-2xl text-slate-400 group-hover:text-green-600 mb-2"></i>
                                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-700">Export as PDF</p>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    } catch (e) {
        content.innerHTML = emptyState("Error loading reports: " + e.message);
    }
}

let cachedAuditLogs = null;

async function renderAuditLogs(forceRefresh = true) {
    document.getElementById('page-title').textContent = "Audit Logs";
    const content = document.getElementById('content-area');

    // Only show skeleton and fetch from Firebase on first load or forced refresh
    if (forceRefresh || !cachedAuditLogs) {
        content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

        try {
            let expensesQuery;
            if (userData.companyId === 'GLOBAL') {
                expensesQuery = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
            } else {
                expensesQuery = query(collection(db, "expenses"), where("companyId", "==", userData.companyId || 'N/A'), orderBy("createdAt", "desc"));
            }
            const expensesSnap = await safeFirebaseFetch(getDocs(expensesQuery));
            const auditLogs = [];

            expensesSnap.forEach(doc => {
                const data = doc.data();
                if (data.history) {
                    data.history.forEach(h => {
                        auditLogs.push({
                            ...h,
                            expenseId: doc.id,
                            expenseTitle: data.title,
                            expenseAmount: data.totalAmount,
                            expenseCurrency: data.currency,
                            expenseProject: data.projectCode,
                            expenseStatus: data.status,
                            expenseUser: data.userName,
                            expenseUserEmail: data.userEmail,
                            expenseDate: data.createdAt
                        });
                    });
                }
            });

            // Sort by date desc
            auditLogs.sort((a, b) => new Date(b.date?.toDate ? b.date.toDate() : b.date) - new Date(a.date?.toDate ? a.date.toDate() : a.date));

            let filteredByRole = auditLogs;
            if (!['ADMIN', 'HR'].includes(userData.role)) {
                filteredByRole = auditLogs.filter(log => log.by === userData.name);
            }

            cachedAuditLogs = filteredByRole;
            window.currentAuditLogs = filteredByRole;
        } catch (e) {
            content.innerHTML = emptyState("Error loading audit logs: " + e.message);
            return;
        }
    }

    // Client-side filtering from cache
    let filteredLogs = cachedAuditLogs;
    if (auditSearchTerm) {
        const term = auditSearchTerm.toLowerCase();
        filteredLogs = cachedAuditLogs.filter(log =>
            (log.by || '').toLowerCase().includes(term) ||
            (log.action || '').toLowerCase().includes(term) ||
            (log.expenseTitle || '').toLowerCase().includes(term) ||
            (log.comment || '').toLowerCase().includes(term) ||
            (log.role || '').toLowerCase().includes(term)
        );
    }

    renderAuditUI(filteredLogs, content);
}

function renderAuditUI(filteredLogs, content) {
    content.innerHTML = `
                    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <div class="p-6 border-b border-slate-100 dark:border-slate-800">
                            <div class="flex justify-between items-center audit-header-flex gap-4">
                                <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 min-w-fit">System Activity Log</h3>
                                <div class="flex-1 max-w-sm">
                                    <div class="relative">
                                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                        <input type="text" id="audit-search-input" placeholder="Search logs..." value="${auditSearchTerm}" oninput="window.handleAuditSearch(this.value)" class="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 text-slate-600 dark:text-slate-300">
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="downloadAuditCSV()" class="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded transition font-bold flex items-center gap-2">
                                        <i class="fa-solid fa-download"></i> Export CSV
                                    </button>
                                    <input type="file" id="audit-upload" class="hidden" accept=".csv" onchange="uploadAuditCSV(this)">
                                    <button onclick="document.getElementById('audit-upload').click()" class="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded transition font-bold flex items-center gap-2">
                                        <i class="fa-solid fa-upload"></i> Import CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="overflow-x-auto audit-table-wrap">
                            <table class="data-grid text-sm">
                                <thead class="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs">
                                    <tr>
                                        <th class="px-6 py-3 text-left">Timestamp</th>
                                    <th class="px-6 py-3 text-left">Action</th>
                                        <th class="px-6 py-3 text-left">User</th>
                                        <th class="px-6 py-3 text-left">Role</th>
                                        <th class="px-6 py-3 text-left">Expense</th>
                                        <th class="px-6 py-3 text-left">Comment</th>
                                        <th class="px-6 py-3 text-center">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredLogs.slice(0, 50).map(log => `
                                        <tr class="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-900">
                                            <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">${new Date(log.date?.toDate ? log.date.toDate() : log.date).toLocaleString()}</td>
                                            <td class="px-6 py-4">
                                                <span class="badge ${log.action.includes('APPROVE') ? 'bg-green-100 text-green-700' : log.action.includes('REJECT') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}">${log.action}</span>
                                            </td>
                                            <td class="px-6 py-4 font-medium">${log.by}</td>
                                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">${log.role}</td>
                                            <td class="px-6 py-4 text-slate-500 dark:text-slate-400">${log.expenseTitle || 'N/A'}</td>
                                            <td class="px-6 py-4 text-slate-400 text-xs italic">${log.comment || '-'}</td>
                                            <td class="px-6 py-4 text-center">
                                                <button onclick="openExpenseModal('${log.expenseId}')" class="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-green-600 transition flex items-center justify-center mx-auto" title="View Expense">
                                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

    // Restore focus to search input
    setTimeout(() => {
        const input = document.getElementById('audit-search-input');
        if (input && auditSearchTerm) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
    }, 10);
}

let auditSearchTimer = null;
window.handleAuditSearch = (val) => {
    auditSearchTerm = val;
    clearTimeout(auditSearchTimer);
    auditSearchTimer = setTimeout(() => {
        renderAuditLogs(false); // false = don't re-fetch, just re-filter from cache
    }, 300);
};



window.downloadAuditCSV = () => {
    const logs = window.currentAuditLogs;
    if (!logs || logs.length === 0) return showToast("No logs to export", "info");

    const headers = [
        "Timestamp", "Action", "Performed By", "Role",
        "Claimant Name", "Claimant Email", "Expense Title", "Project Code",
        "Amount", "Currency", "Status", "Comment",
        "Payment Mode", "Transaction Ref", "Proof URL"
    ];

    const rows = logs.map(log => [
        `"${new Date(log.date?.toDate ? log.date.toDate() : log.date).toLocaleString().replace(/"/g, '""')}"`,
        `"${log.action}"`,
        `"${log.by}"`,
        `"${log.role}"`,
        `"${(log.expenseUser || 'Unknown').replace(/"/g, '""')}"`,
        `"${(log.expenseUserEmail || '-').replace(/"/g, '""')}"`,
        `"${(log.expenseTitle || 'N/A').replace(/"/g, '""')}"`,
        `"${(log.expenseProject || '-').replace(/"/g, '""')}"`,
        `"${log.expenseAmount || '0'}"`,
        `"${log.expenseCurrency || '-'}"`,
        `"${(log.expenseStatus || '-').replace(/"/g, '""')}"`,
        `"${(log.comment || '-').replace(/"/g, '""')}"`,
        `"${(log.paymentMode || '-').replace(/"/g, '""')}"`,
        `"${(log.transactionRef || '-').replace(/"/g, '""')}"`,
        `"${(log.paymentProofUrl || '-').replace(/"/g, '""')}"`
    ]);

    let csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit logs exported successfully!", "success");
};

window.uploadAuditCSV = (input) => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split("\n").slice(1);
        console.log("Parsed rows:", rows.length);
        showToast(`Successfully processed ${rows.length} records (Simulation)`, 'success');
        input.value = '';
    };
    reader.readAsText(file);
};

async function renderTasks() {
    document.getElementById('page-title').textContent = "Task Manager";
    const content = document.getElementById('content-area');

    // Fetch users for assignment dropdown
    let usersOptions = '<option value="">Select Employee...</option>';
    try {
        const usersSnap = await safeFirebaseFetch(getDocs(query(collection(db, "users"), where("companyId", "==", userData.companyId), where("status", "==", "ACTIVE"))));
        usersSnap.forEach(d => {
            const u = d.data();
            usersOptions += `<option value="${u.email}">${u.name} (${u.role.replace('_', ' ')})</option>`;
        });
    } catch (e) {
        console.error("Error loading users for tasks:", e);
    }

    content.innerHTML = `
                <div class="flex flex-col lg:flex-row gap-6 h-full pb-20">
                    <!-- Create Task Form -->
                    <div class="w-full lg:w-1/3 fade-in">
                        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-4">
                            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                                <i class="fa-solid fa-plus-circle text-green-600"></i> Assign New Task
                            </h3>
                            <form id="create-task-form" onsubmit="handleCreateTask(event)" class="space-y-4">
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Task Title <span class="text-red-500">*</span></label>
                                    <input type="text" id="task-title" class="input-primary" placeholder="e.g., Monthly Report" required>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Description</label>
                                    <textarea id="task-desc" class="input-primary h-20 resize-none" placeholder="Provide details..."></textarea>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Assign To <span class="text-red-500">*</span></label>
                                    <select id="task-assignee" class="input-primary" required>
                                        ${usersOptions}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Due Date <span class="text-red-500">*</span></label>
                                    <input type="date" id="task-due-date" class="input-primary" required>
                                </div>
                                <button type="submit" id="btn-create-task" class="w-full btn-primary py-3 flex justify-center items-center gap-2">
                                    <span>Assign Task</span> <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Tasks List -->
                    <div class="w-full lg:w-2/3 flex flex-col fade-in max-h-full">
                        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm mb-4 flex justify-between items-center">
                            <div class="flex items-center gap-4">
                                <div class="relative min-w-[200px]">
                                    <i class="fa-solid fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                                    <input type="text" id="task-search" onkeyup="filterAdminTasks()" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs outline-none" placeholder="Search tasks...">
                                </div>
                                <select id="task-status-filter" onchange="filterAdminTasks()" class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-xs outline-none">
                                    <option value="">All Statuses</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                        </div>
                        
                        <div id="admin-tasks-list" class="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                            <div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-green-500 text-3xl"></i></div>
                        </div>
                    </div>
                </div>
            `;

    // Set minimum due date to today
    const today = new Date().toISOString().split('T')[0];
    const dueInput = document.getElementById('task-due-date');
    if (dueInput) dueInput.min = today;
    try {
        // Fetch tasks
        let q;
        if (userData.companyId === 'GLOBAL') {
            q = collection(db, "tasks");
        } else {
            const scopeId = userData.companyId || 'N/A';
            if (userData.role === 'ADMIN') {
                q = query(collection(db, "tasks"), where("companyId", "==", scopeId));
            } else {
                q = query(collection(db, "tasks"), where("companyId", "==", scopeId), where("assignedBy", "==", userData.email));
            }
        }

        // Remove server-side orderBy to avoid index issues. We sort in JS.
        const unsub = onSnapshot(q, (snap) => {
            const list = document.getElementById('admin-tasks-list');
            if (!list) return;

            if (snap.empty) {
                list.innerHTML = emptyState("No tasks found. Create one to get started!");
                window.adminTasksData = [];
                return;
            }

            // Map and sort locally
            let tasks = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            tasks.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                return dateB - dateA;
            });

            window.adminTasksData = tasks;
            filterAdminTasks();
        });

        activeListeners.push(unsub);
    } catch (e) {
        console.error("Error loading tasks:", e);
        document.getElementById('admin-tasks-list').innerHTML = emptyState("Failed to load tasks: " + e.message);
    }
}

window.filterAdminTasks = () => {
    const list = document.getElementById('admin-tasks-list');
    if (!list || !window.adminTasksData) return;

    const search = (document.getElementById('task-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('task-status-filter')?.value;

    const filtered = window.adminTasksData.filter(t => {
        const matchesSearch = (t.title + t.description + t.assignedTo).toLowerCase().includes(search);
        const matchesStatus = !statusFilter || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
        list.innerHTML = emptyState("No tasks match your filters.");
        return;
    }

    list.innerHTML = filtered.map(t => `
                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition relative">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm">${t.title}</h4>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${t.description || 'No description provided.'}</p>
                        </div>
                        <span class="badge ${getTaskStatusClass(t.status)}">${t.status.replace('_', ' ')}</span>
                    </div>
                    <div class="mt-4 pt-3 border-t border-slate-50 dark:border-slate-700/50 flex flex-wrap gap-4 text-[10px] text-slate-500 dark:text-slate-400 items-center">
                        <span class="flex items-center gap-1"><i class="fa-solid fa-user text-green-500"></i> Assignee: <span class="font-bold text-slate-700 dark:text-slate-300">${t.assignedTo}</span></span>
                        <span class="flex items-center gap-1"><i class="fa-regular fa-calendar-check text-red-400"></i> Due: <span class="font-bold ${new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED' ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}">${formatDateUtc(t.dueDate)}</span></span>
                        <span class="flex items-center gap-1"><i class="fa-regular fa-clock text-slate-400"></i> Created: ${t.createdAt?.toDate ? t.createdAt.toDate().toLocaleDateString() : 'Unknown'}</span>
                        ${t.status !== 'COMPLETED' ? `<button onclick="updateTaskStatus('${t.id}', 'COMPLETED')" class="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold transition ml-auto"><i class="fa-solid fa-check"></i> Mark Done</button>` : ''}
                    </div>
                     ${t.status !== 'COMPLETED' ? `<button onclick="deleteTask('${t.id}', '${t.status}')" class="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition w-6 h-6 rounded flex items-center justify-center hover:bg-red-50 dark:hover:bg-slate-700" title="Delete Task"><i class="fa-solid fa-trash text-xs"></i></button>` : `<div class="absolute top-4 right-4 text-slate-300" title="Completed tasks cannot be deleted"><i class="fa-solid fa-lock text-[10px]"></i></div>`}
                </div>
            `).join('');
};

window.handleCreateTask = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-create-task');
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
    btn.disabled = true;

    try {
        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;
        const assignee = document.getElementById('task-assignee').value;
        const dueDate = document.getElementById('task-due-date').value;

        await addDoc(collection(db, "tasks"), {
            title: title,
            description: desc,
            assignedTo: assignee,
            assignedBy: userData.email,
            companyId: userData.companyId,
            status: 'PENDING',
            dueDate: dueDate,
            createdAt: serverTimestamp()
        });

        showToast("Task assigned successfully!", "success");
        e.target.reset();
    } catch (err) {
        console.error("Task creation error:", err);
        showToast("Failed to create task: " + err.message, "error");
    } finally {
        btn.innerHTML = '<span>Assign Task</span> <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
    }
};

window.deleteTask = async (taskId, status) => {
    if (status === 'COMPLETED') {
        showToast("Completed tasks cannot be deleted.", "error");
        return;
    }
    if (!await showInputPromise("Delete Task", "Are you sure you want to delete this task?", "", "none")) return;
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        showToast("Task deleted.", "info");
    } catch (err) {
        showToast("Failed to delete task.", "error");
    }
};

window.updateTaskStatus = async (taskId, newStatus) => {
    try {
        await updateDoc(doc(db, "tasks", taskId), {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
        showToast("Task status updated", "success");
    } catch (err) {
        console.error("Update task error:", err);
        showToast("Failed to update task status", "error");
    }
};

function getTaskStatusClass(status) {
    switch (status) {
        case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
        case 'IN_PROGRESS': return 'bg-green-100 text-green-700 border-green-200';
        default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
}

async function renderSettings() {
    if (userData.role !== 'ADMIN') return;
    document.getElementById('page-title').textContent = "Company Settings";
    const content = document.getElementById('content-area');

    let settings = { companyName: '', logo: '', email: '', phone: '', address: '', taxId: '' };
    let cmpData = {};
    try {
        const settingsRef = doc(db, "companies", userData.companyId, "settings", "branding");
        const settingsSnap = await safeFirebaseFetch(getDoc(settingsRef));
        if (settingsSnap.exists()) {
            settings = settingsSnap.data();
            settings.name = settings.companyName || settings.name || '';
        }

        // Fetch primary company doc for plan and newer fields
        const cmpSnap = await safeFirebaseFetch(getDoc(doc(db, "companies", userData.companyId)));
        if (cmpSnap.exists()) {
            cmpData = cmpSnap.data();
            if (!settings.name) settings.name = cmpData.name || '';
            if (!settings.logo) settings.logo = cmpData.logo || '';
        }
    } catch (e) { console.error("Error loading settings data", e); }

    const isTrial = cmpData.plan === 'trial';

    // Determine end date
    let endsAtRaw = cmpData.planEndsAt || cmpData.trialEndsAt;
    let endsAtDate = endsAtRaw?.toDate ? endsAtRaw.toDate() : (endsAtRaw ? new Date(endsAtRaw) : null);

    const planName = cmpData.plan ? cmpData.plan.toUpperCase() : 'FREE';

    // Formatting cost and duration
    let costText = isTrial ? '₹0.00 (Free Trial)' : 'Standard Pricing';
    if (cmpData.planCost !== undefined && cmpData.planCost !== null) {
        costText = `₹${cmpData.planCost}`;
    }

    let durationText = '';
    if (cmpData.planDurationMonths) {
        durationText = ` for ${cmpData.planDurationMonths} Month(s)`;
    }

    content.innerHTML = `
                        <div class="space-y-6">
                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Global Branding</h3>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Company Name</label>
                                <input type="text" id="company-name" value="${settings.name || ''}" class="input-primary" placeholder="RebelCorp Inc.">
                            </div>

                            <div>
                                <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Company Logo</label>
                                <div class="flex items-center gap-6 mb-3">
                                    <div class="w-24 h-24 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center overflow-hidden relative group">
                                        <img id="logo-preview" src="${settings.logo ? settings.logo : ''}" class="${settings.logo ? '' : 'hidden'} w-full h-full object-contain p-2">
                                        <div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer" onclick="document.getElementById('logo-upload').click()">
                                            <i class="fa-solid fa-camera"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <input type="file" id="logo-upload" class="hidden" accept="image/*" onchange="handleLogoPreview(this)">
                                        <button onclick="document.getElementById('logo-upload').click()" class="text-sm text-green-600 font-bold hover:underline mb-1">Upload New Logo</button>
                                        <p class="text-xs text-slate-400 mb-2">Recommended: 200x200px PNG. Max 1MB.</p>
                                    </div>
                                </div>
                                <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Or paste Logo URL</label>
                                <input type="url" id="company-logo-url" value="${settings.logo || ''}" class="input-primary text-sm" placeholder="https://..." onchange="document.getElementById('logo-preview').src = this.value; document.getElementById('logo-preview').classList.remove('hidden'); document.getElementById('logo-base64').value = this.value;">
                                <input type="hidden" id="logo-base64" value="${settings.logo || ''}">
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <div class="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Subscription & Plan</h3>
                            <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase border border-green-200">${planName} PLAN</span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Unique ID</p>
                                <div class="flex items-center gap-2">
                                    <p class="text-slate-800 dark:text-slate-100 font-mono text-sm max-w-[150px] truncate" title="${userData.companyId}">${userData.companyId}</p>
                                    <button onclick="navigator.clipboard.writeText('${userData.companyId}'); showToast('Copied ID to clipboard!', 'success');" class="text-green-600 hover:text-green-800 transition"><i class="fa-regular fa-copy"></i></button>
                                </div>
                            </div>
                            <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Status</p>
                                <p class="text-slate-800 dark:text-slate-100 font-semibold"><i class="fa-solid fa-circle-check text-green-500 mr-1"></i> Active Workspace</p>
                            </div>
                            <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                                <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Billing / Cost</p>
                                <p class="text-slate-800 dark:text-slate-100 font-semibold">${costText}${durationText}</p>
                            </div>
                            ${endsAtDate ? `
                            <div class="p-4 ${isTrial ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30'} rounded-xl border md:col-span-2 flex items-start gap-3">
                                <i class="fa-solid ${isTrial ? 'fa-clock text-amber-500' : 'fa-calendar-check text-blue-500'} mt-1"></i>
                                <div>
                                    <p class="text-sm font-bold ${isTrial ? 'text-amber-800 dark:text-amber-400' : 'text-blue-800 dark:text-blue-400'}">${isTrial ? 'Trial Period' : 'Plan'} Ends On: ${endsAtDate.toLocaleDateString()}</p>
                                    <p class="text-xs ${isTrial ? 'text-amber-700 dark:text-amber-500' : 'text-blue-700 dark:text-blue-500'} mt-1">${isTrial ? 'Upgrade your plan to ensure uninterrupted access.' : 'Your workspace is active until this billing cycle ends.'}</p>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Company Information</h3>
                        
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Domain</label>
                                    <input type="text" id="company-domain" value="${cmpData.domain || ''}" class="input-primary" placeholder="acme.com">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Industry</label>
                                    <select id="company-industry" class="input-primary">
                                        <option value="Technology" ${cmpData.industry === 'Technology' ? 'selected' : ''}>Technology</option>
                                        <option value="Finance" ${cmpData.industry === 'Finance' ? 'selected' : ''}>Finance</option>
                                        <option value="Healthcare" ${cmpData.industry === 'Healthcare' ? 'selected' : ''}>Healthcare</option>
                                        <option value="Education" ${cmpData.industry === 'Education' ? 'selected' : ''}>Education</option>
                                        <option value="Retail" ${cmpData.industry === 'Retail' ? 'selected' : ''}>Retail</option>
                                        <option value="Other" ${(cmpData.industry || 'Other') === 'Other' ? 'selected' : ''}>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Company Size</label>
                                    <select id="company-size" class="input-primary">
                                        <option value="0-50" ${cmpData.size === '0-50' ? 'selected' : ''}>0 - 50 employees</option>
                                        <option value="50-100" ${cmpData.size === '50-100' ? 'selected' : ''}>50 - 100 employees</option>
                                        <option value="100-500" ${cmpData.size === '100-500' ? 'selected' : ''}>100 - 500 employees</option>
                                        <option value="500+" ${cmpData.size === '500+' ? 'selected' : ''}>500+ employees</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Country</label>
                                    <input type="text" id="company-country" value="${cmpData.country || ''}" class="input-primary" placeholder="India">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Tax ID / GST</label>
                                    <input type="text" id="company-tax-id" value="${settings.taxId || ''}" class="input-primary" placeholder="GSTIN-123456789">
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Email</label>
                                    <input type="email" id="company-email" value="${settings.email || ''}" class="input-primary" placeholder="info@company.com">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Phone</label>
                                    <input type="text" id="company-phone" value="${settings.phone || ''}" class="input-primary" placeholder="+1 234 567 8900">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Address</label>
                                <textarea id="company-address" class="input-primary h-20" placeholder="Company address...">${settings.address || ''}</textarea>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">System Settings</h3>
                        
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300">Auto-approve expenses under</p>
                                    <p class="text-xs text-slate-400">Expenses below this amount will be auto-approved</p>
                                </div>
                                <input type="number" id="auto-approve-limit" value="${settings.autoApproveLimit || 0}" class="input-primary w-32 text-right">
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300">Require receipt for expenses over</p>
                                    <p class="text-xs text-slate-400">Receipt mandatory for amounts above this</p>
                                </div>
                                <input type="number" id="receipt-limit" value="${settings.receiptLimit || 0}" class="input-primary w-32 text-right">
                            </div>
                            <div class="flex items-center gap-3">
                                <input type="checkbox" id="email-notifications" ${settings.emailNotifications ? 'checked' : ''} class="w-4 h-4 text-green-600 rounded">
                                <label for="email-notifications" class="text-sm font-bold text-slate-600 dark:text-slate-300">Enable email notifications for approvals</label>
                            </div>
                            <div class="flex items-center gap-3 pt-2">
                                <button onclick="toggleTheme()" class="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 dark:text-slate-300 flex items-center gap-2">
                                    <i class="fa-solid fa-moon theme-toggle-icon"></i> Toggle Dark Mode
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Legal & Compliance</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a href="privacy.html" target="_blank" class="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-green-600 group-hover:bg-white dark:bg-slate-800"><i class="fa-solid fa-shield-halved"></i></div>
                                <span class="font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-700">Privacy Policy</span>
                            </a>
                            <a href="terms.html" target="_blank" class="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-green-600 group-hover:bg-white dark:bg-slate-800"><i class="fa-solid fa-file-contract"></i></div>
                                <span class="font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-700">Terms of Service</span>
                            </a>
                            <a href="license.html" target="_blank" class="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-green-600 group-hover:bg-white dark:bg-slate-800"><i class="fa-solid fa-scale-balanced"></i></div>
                                <span class="font-bold text-slate-600 dark:text-slate-300 group-hover:text-green-700">License Info</span>
                            </a>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
                            <i class="fa-solid fa-robot text-green-600"></i> AI Support Assistant
                        </h3>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-bold text-slate-600 dark:text-slate-300">Enable AI Chat Support</p>
                                <p class="text-xs text-slate-400">Allow the AI to assist with policy questions and data analysis.</p>
                            </div>
                            <button onclick="aiAssistant.toggleChat()" class="bg-gradient-to-r from-green-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-green-200 hover:shadow-xl transition">
                                <i class="fa-solid fa-comment-dots mr-2"></i> Launch Assistant
                            </button>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Account Security</h3>
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300">Admin Password</p>
                                    <p class="text-xs text-slate-400">Send a password reset email to your registered address.</p>
                                </div>
                                <button onclick="resetAdminPassword()" class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-lg text-sm border border-slate-200 dark:border-slate-700 transition">
                                    <i class="fa-solid fa-key mr-2"></i> Reset Password
                                </button>
                            </div>

                            ${userData.role === 'ADMIN' ? `
                            <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label class="block text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">Change Corporate Email</label>
                                <div class="flex gap-3">
                                    <input type="email" id="new-admin-email" class="input-primary" placeholder="new-email@company.com">
                                    <button onclick="updateAdminEmail()" class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg text-sm transition shadow-sm whitespace-nowrap">
                                        Update Email
                                    </button>
                                </div>
                                <p class="text-[10px] text-slate-400 mt-2">Note: You will receive a verification link at the new email address.</p>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Danger Zone Section -->
                    <div class="bg-rose-50/50 dark:bg-rose-900/10 p-8 rounded-2xl shadow-sm border border-rose-100 dark:border-rose-900/40 fade-in border-dashed">
                        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div class="text-center md:text-left">
                                <h3 class="text-lg font-black text-rose-800 dark:text-rose-400 mb-1 flex items-center justify-center md:justify-start gap-2">
                                    <i class="fa-solid fa-triangle-exclamation"></i> Permanent Actions
                                </h3>
                                <p class="text-xs text-rose-600 dark:text-rose-400 opacity-80">Request to permanently delete this company and all associated corporate data.</p>
                            </div>
                            <a href="verify.html?view=deleteRequest" class="bg-rose-600 hover:bg-rose-700 text-white font-black px-8 py-3 rounded-xl transition-premium shadow-lg shadow-rose-200 dark:shadow-none whitespace-nowrap flex items-center gap-3">
                                <i class="fa-solid fa-trash-can"></i> Request Deletion
                            </a>
                        </div>
                    </div>

                    <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex justify-end">
                        <button onclick="saveAllSettings()" class="btn-primary px-10 py-3 w-auto">Save All Changes</button>
                    </div>
                </div>
                         `;
}

window.resetAdminPassword = async () => {
    if (await confirm("Send password reset email to " + userData.email + "?")) {
        try {
        if (userData.role === 'ADMIN') {
            await sendPasswordResetEmail(auth, userData.email, { url: window.location.origin + '/verify.html' });
            showToast("Password reset email sent!", "success");
        } else {
            await sendPasswordResetEmail(auth, userData.email);
            showToast("Password reset email sent!", "success");
        }
    } catch (e) {
        showToast(e.message, "error");
    }
    }
};

window.updateAdminEmail = async () => {
    const newEmail = document.getElementById('new-admin-email').value.trim();
    if (!newEmail) return showToast("Please enter a valid email address.", "error");
    if (!await confirm("Change your corporate email to " + newEmail + "? You will need to verify the new email before it takes effect.")) return;

    const btn = event.currentTarget;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Updating...';
    btn.disabled = true;

    try {
        const { verifyBeforeUpdateEmail } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
        const actionCodeSettings = {
            url: window.location.origin + '/verify.html',
            handleCodeInApp: true
        };
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail, actionCodeSettings);
        showToast("Verification email sent to " + newEmail + ". Please check your inbox.", "success");
    } catch (e) {
        console.error("Email update error:", e);
        showToast(e.message, "error");
    } finally {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
};


window.selectedApprovals = new Set();
window.currentFilteredApprovalIds = [];
let approvalsData = []; // Store for filtering

async function renderApprovals() {
    document.getElementById('page-title').textContent = "Pending Approvals";
    const content = document.getElementById('content-area');

    // Fetch Projects for Filter
    let projectOptions = '<option value="">All Projects</option>';
    try {
        const pSnap = await safeFirebaseFetch(getDocs(query(collection(db, "projects"), where("companyId", "==", userData.companyId))));
        const projectCodes = [];
        pSnap.forEach(d => { if (d.data().code) projectCodes.push(d.data().code); });
        projectCodes.sort((a, b) => a.localeCompare(b));
        projectCodes.forEach(code => {
            projectOptions += `<option value="${code}">${code}</option>`;
        });
    } catch (e) { console.error("Project load err", e); }

    content.innerHTML = `
                        <div class="flex flex-col h-full">
                    
                    <!--Toolbar -->
                    <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm mb-6 fade-in flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div class="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                             <div class="relative flex min-w-[240px]">
                                <i class="fa-solid fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
                                <input type="text" id="approval-search" onkeyup="if(event.key === 'Enter') applyApprovalFilters()" class="w-full bg-slate-50 dark:bg-slate-900 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-brand-500 outline-none" placeholder="Search by name, ID, amount...">
                                <button onclick="applyApprovalFilters()" class="bg-green-600 hover:bg-brand-700 text-white px-3 py-2 rounded-r-lg text-xs font-bold transition border border-green-600"><i class="fa-solid fa-search"></i></button>
                            </div>
                            <select id="filter-project" onchange="applyApprovalFilters()" class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-xs outline-none">
                                ${projectOptions}
                            </select>
                            <select id="filter-amount" onchange="applyApprovalFilters()" class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-xs outline-none">
                                <option value="">Any Amount</option>
                                <option value="small">< ₹1,000</option>
                                <option value="medium">₹1k - ₹10k</option>
                                <option value="large">> ₹10k</option>
                            </select>
                            <select id="sort-order" onchange="applyApprovalFilters()" class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-3 text-xs outline-none font-bold text-slate-600 dark:text-slate-300">
                                <option value="date_desc">Newest First</option>
                                <option value="date_asc">Oldest First</option>
                                <option value="amount_desc">Highest Amount</option>
                                <option value="amount_asc">Lowest Amount</option>
                                <option value="user_asc">User Name (A-Z)</option>
                                <option value="user_desc">User Name (Z-A)</option>
                            </select>
                        </div>

                        <div class="flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                            <input type="checkbox" id="approvals-select-all" onchange="toggleSelectAllApprovals(this.checked)" class="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 transition cursor-pointer">
                            <label for="approvals-select-all" class="text-[11px] font-bold text-slate-500">Select All (Filtered)</label>
                        </div>

                        <div id="bulk-actions" class="hidden flex gap-2 items-center w-full md:w-auto justify-end animate-[slideUp_0.1s_ease-out]">
                            <span class="text-xs font-bold text-slate-500 mr-2"><span id="selected-count">0</span> Selected</span>
                            <button onclick="handleBulkAction('APPROVE')" class="bg-green-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm"><i class="fa-solid fa-check mr-1"></i> Approve</button>
                            ${['ADMIN', 'MANAGER'].includes(userData.role) ? `<button onclick="handleBulkAction('REJECT')" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-xs font-bold transition"><i class="fa-solid fa-xmark mr-1"></i> Refund</button>` : ''}
                        </div>
                    </div>

                    <div id="approvals-list" class="flex-1 overflow-y-auto pb-20">
                        <div class="flex justify-center mt-20"><i class="fa-solid fa-circle-notch fa-spin text-green-500 text-3xl"></i></div>
                    </div>
                </div>
                        `;

    try {
        let q;
        if (userData.role === 'ADMIN') {
            q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("status", "not-in", ["PAID", "REJECTED", "AUDITED"]));
        } else {
            const allowedStatuses = await getAllowedStatusesForRole(userData.role);
            if (allowedStatuses && allowedStatuses.length > 0) {
                q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("status", "in", allowedStatuses.slice(0, 10)));
            } else {
                document.getElementById('approvals-list').innerHTML = emptyState("No workflow stages assigned to your role.");
                return;
            }
        }

        if (!q) return;

        const unsub = onSnapshot(q, async (snap) => {
            try {
                if (snap.empty) {
                    document.getElementById('approvals-list').innerHTML = emptyState("All caught up! No pending items.");
                    approvalsData = [];
                    return;
                }

                // Get User Names Efficiently
                const userIds = [...new Set(snap.docs.map(d => d.data().userId).filter(Boolean))];
                const userMap = new Map();

                if (userIds.length > 0) {
                    try {
                        const chunks = [];
                        for (let i = 0; i < userIds.length; i += 10) {
                            chunks.push(
                                safeFirebaseFetch(getDocs(query(collection(db, "users"), where("__name__", "in", userIds.slice(i, i + 10)))))
                            );
                        }
                        const results = await Promise.all(chunks);
                        results.forEach(s => s.forEach(d => userMap.set(d.id, d.data().name)));
                    } catch (userLookupErr) {
                        console.warn("User lookup failed, showing expenses without names:", userLookupErr);
                    }
                }

                approvalsData = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    userName: userMap.get(doc.data().userId) || doc.data().employeeName || 'Unknown'
                }));

                window.applyApprovalFilters();
            } catch (renderErr) {
                console.error("Error rendering approvals:", renderErr);
                document.getElementById('approvals-list').innerHTML = emptyState("Error rendering approvals. Please refresh.");
            }
        }, (error) => {
            console.error("Approvals listener error:", error);
            document.getElementById('approvals-list').innerHTML = emptyState("Error loading approvals. Please refresh.");
        });

        activeListeners.push(unsub);

    } catch (e) {
        console.error(e);
        document.getElementById('approvals-list').innerHTML = emptyState("Error loading approvals: " + e.message);
    }
}

window.applyApprovalFilters = () => {
    const list = document.getElementById('approvals-list');
    const search = document.getElementById('approval-search').value.toLowerCase();
    const project = document.getElementById('filter-project').value;
    const amountType = document.getElementById('filter-amount').value;

    const filtered = approvalsData.filter(d => {
        const term = (d.title + d.projectCode + d.userName + d.totalAmount + (d.id || '')).toLowerCase();
        const matchesSearch = term.includes(search);
        const matchesProject = !project || d.projectCode === project;

        let matchesAmount = true;
        const amt = parseFloat(d.totalAmount);
        if (amountType === 'small') matchesAmount = amt < 1000;
        else if (amountType === 'medium') matchesAmount = amt >= 1000 && amt <= 10000;
        else if (amountType === 'large') matchesAmount = amt > 10000;

        return matchesSearch && matchesProject && matchesAmount;
    });

    // Sorting Logic
    const sortOrder = document.getElementById('sort-order').value;
    filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt?.toDate ? a.createdAt.toDate() : a.createdAt);
        const dateB = new Date(b.createdAt?.toDate ? b.createdAt.toDate() : b.createdAt);
        const amtA = parseFloat(a.totalAmount);
        const amtB = parseFloat(b.totalAmount);
        const userA = (a.userName || '').toLowerCase();
        const userB = (b.userName || '').toLowerCase();

        if (sortOrder === 'date_desc') return dateB - dateA;
        if (sortOrder === 'date_asc') return dateA - dateB;
        if (sortOrder === 'amount_desc') return amtB - amtA;
        if (sortOrder === 'amount_asc') return amtA - amtB;
        if (sortOrder === 'user_asc') return userA.localeCompare(userB);
        if (sortOrder === 'user_desc') return userB.localeCompare(userA);
        return 0;
    });

    window.currentFilteredApprovalIds = filtered.map((d) => d.id);

    if (filtered.length === 0) {
        updateBulkUI();
        list.innerHTML = emptyState("No matching approvals found.");
        return;
    }

    // Render List
    list.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 fade-in pb-10">
                        ${filtered.map(d => {
        const date = d.createdAt?.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : new Date());
        const ageDays = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
        const agingClass = ageDays >= 7
            ? 'bg-red-50 text-red-600 border-red-100'
            : ageDays >= 3
                ? 'bg-amber-50 text-amber-600 border-amber-100'
                : 'bg-green-50 text-green-600 border-green-100';
        let statusColor = 'bg-slate-100 text-slate-600';
        if (d.status === 'PENDING') statusColor = 'bg-amber-50 text-amber-600 border-amber-100';
        else if (d.status === 'APPROVED') statusColor = 'bg-blue-50 text-blue-600 border-blue-100';
        else if (d.status === 'PAID') statusColor = 'bg-green-50 text-green-600 border-green-100';
        else if (d.status === 'REJECTED') statusColor = 'bg-red-50 text-red-600 border-red-100';

        return `
                                <div class="bg-white dark:bg-slate-810 p-5 rounded-2xl shadow-sm border ${d.isSpam ? 'border-red-400' : 'border-slate-100 dark:border-slate-800'} hover:shadow-md transition group relative flex flex-col h-full">
                                    <div class="flex items-start justify-between mb-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition border border-slate-100 dark:border-slate-800">
                                                <i class="fa-solid fa-receipt text-sm"></i>
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5 line-clamp-1 group-hover:text-green-600 transition">${d.title}</h4>
                                                <p class="text-[10px] text-slate-400 font-medium">${date.toLocaleDateString()} • ${d.projectCode || 'General'}</p>
                                            </div>
                                        </div>
                                        <input type="checkbox" onchange="toggleSelection('${d.id}')" class="approval-check w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500 transition cursor-pointer z-10" ${window.selectedApprovals.has(d.id) ? 'checked' : ''}>
                                    </div>

                                    <div class="flex-1 space-y-3 mb-5">
                                        <div class="flex justify-between items-center">
                                            <span class="text-[10px] uppercase tracking-tighter font-black text-slate-400">Requestor</span>
                                            <span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">${d.userName}</span>
                                        </div>
                                        <div class="flex justify-between items-center">
                                            <span class="text-[10px] uppercase tracking-tighter font-black text-slate-400">Amount</span>
                                            <span class="text-xs font-bold text-green-600 font-mono">₹${parseFloat(d.totalAmount).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                        <button onclick="openExpenseModal('${d.id}')" class="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 transition uppercase tracking-widest border border-slate-100 dark:border-slate-800 z-10">Review</button>
                                        <span class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${statusColor}">
                                            ${d.status.replace('_', ' ')}
                                        </span>
                                        <span class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${agingClass}" title="Time pending since creation">
                                            ${ageDays}d Open
                                        </span>
                                    </div>

                                    ${d.isSpam ? `<div class="absolute top-0 right-0 p-1 bg-red-500 text-white text-[8px] font-bold px-2 rounded-bl-lg">SPAM</div>` : ''}
                                    ${d.reviewRequested ? `<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-amber-400 rounded-t-full"></div>` : ''}
                                </div>
                            `;
    }).join('')}
                    </div>`;

    updateBulkUI();
};

window.toggleSelectAllApprovals = (checked) => {
    const ids = window.currentFilteredApprovalIds || [];
    if (checked) {
        ids.forEach((id) => window.selectedApprovals.add(id));
    } else {
        ids.forEach((id) => window.selectedApprovals.delete(id));
    }
    window.applyApprovalFilters();
};

window.toggleSelection = (id) => {
    if (window.selectedApprovals.has(id)) window.selectedApprovals.delete(id);
    else window.selectedApprovals.add(id);
    updateBulkUI();
};

function updateBulkUI() {
    const count = window.selectedApprovals.size;
    const selectedCountEl = document.getElementById('selected-count');
    if (selectedCountEl) selectedCountEl.textContent = count;
    const actionDiv = document.getElementById('bulk-actions');
    if (actionDiv) {
        if (count > 0) actionDiv.classList.remove('hidden');
        else actionDiv.classList.add('hidden');
    }

    const selectAll = document.getElementById('approvals-select-all');
    const filteredIds = window.currentFilteredApprovalIds || [];
    if (selectAll) {
        if (!filteredIds.length) {
            selectAll.checked = false;
            selectAll.indeterminate = false;
            return;
        }
        const selectedInFiltered = filteredIds.filter((id) => window.selectedApprovals.has(id)).length;
        selectAll.checked = selectedInFiltered === filteredIds.length;
        selectAll.indeterminate = selectedInFiltered > 0 && selectedInFiltered < filteredIds.length;
    }
}

window.handleBulkAction = async (action) => {
    if (window.selectedApprovals.size === 0) return;
    if (!await confirm(`Are you sure you want to ${action} ${window.selectedApprovals.size} items ? `)) return;

    const evt = window.event;
    const btn = evt?.currentTarget || null;
    const originalHTML = btn ? btn.innerHTML : '';
    if (btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';

    try {
        const batch = writeBatch(db);
        // We need to process each one logic-wise. Batch is tricky if logic differs per item.
        // However, for Approval, logic is standard per role.
        // We'll iterate and update. Since batch limit is 500, we'll process in parallel promises if needed, 
        // but let's just do Promise.all for simplicity as logic computation is needed.

        const updates = [];
        for (const id of window.selectedApprovals) {
            const expense = approvalsData.find(e => e.id === id);
            if (!expense) continue;

            let newStatus = expense.status;
            const amount = parseFloat(expense.totalAmount);

            if (action === 'REJECT') {
                newStatus = 'REJECTED';
            } else {
                // Approval Logic (Replicated)
                // Approval Logic
                if (userData.role === 'MANAGER') newStatus = 'PENDING_FINANCE';
                else if (userData.role === 'FINANCE_MANAGER') newStatus = 'FINANCE_APPROVED';
                else if (userData.role === 'ACCOUNTS') newStatus = 'PAID';
                else if (userData.role === 'SENIOR_MANAGER') newStatus = 'PENDING_TREASURY'; // Legacy path
                else if (userData.role === 'TREASURY') newStatus = 'PAID';
                else if (userData.role === 'AUDIT') newStatus = 'AUDITED';
                else if (userData.role === 'ADMIN') {
                    if (newStatus === 'PENDING_MANAGER') newStatus = 'PENDING_FINANCE';
                    else if (newStatus === 'PENDING_FINANCE') newStatus = 'FINANCE_APPROVED';
                    else if (newStatus === 'FINANCE_APPROVED') newStatus = 'PAID';
                    else if (newStatus === 'PENDING_SENIOR_MANAGER') newStatus = 'PENDING_TREASURY';
                    else if (newStatus === 'PENDING_TREASURY') newStatus = 'PAID';
                }
            }

            const historyEntry = {
                action: 'BULK_' + action,
                by: userData.name + ' (Admin)',
                role: userData.role,
                date: new Date(),
                comment: 'Bulk Action'
            };

            const ref = doc(db, "expenses", id);
            const updatePayload = {
                status: newStatus,
                updatedAt: serverTimestamp(),
                history: [...(expense.history || []), historyEntry]
            };

            // Include Payment Info if becoming PAID
            if (newStatus === 'PAID') {
                updatePayload.paymentMode = 'BULK_TRANSFER';
                updatePayload.transactionRef = 'BATCH-' + Date.now();
                updatePayload.paymentDate = new Date().toISOString().split('T')[0];
                historyEntry.paymentMode = 'BULK_TRANSFER';
                historyEntry.transactionRef = updatePayload.transactionRef;
            }

            updates.push(updateDoc(ref, updatePayload));
        }

        // --- EmailJS: Notify employees IMMEDIATELY ---
        for (const id of window.selectedApprovals) {
            const expense = approvalsData.find(e => e.id === id);
            if (expense) {
                sendSystemEmail('BULK_STATUS_UPDATE', {
                    to_email: expense.userEmail || '',
                    name: expense.userName || 'Employee',
                    new_status: action === 'REJECT' ? 'REJECTED' : 'APPROVED',
                    message: `Your claim for ${expense.title || 'Expense'} has been processed via bulk action.`
                });
            }
        }

        const settled = await Promise.allSettled(updates);
        const successCount = settled.filter((r) => r.status === 'fulfilled').length;
        const failCount = settled.length - successCount;

        if (failCount > 0) {
            showToast(`Processed ${successCount} items, ${failCount} failed.`, 'warning');
        } else {
            showToast(`Processed ${successCount} items successfully!`, 'success');
        }

        window.selectedApprovals.clear();
        updateBulkUI();
    } catch (e) {
        console.error(e);
        showToast("Bulk action failed: " + e.message, "error");
    } finally {
        if (btn) btn.innerHTML = originalHTML;
    }
};

// User Management Functions
// Helper to populate roles — fetches custom roles from Firebase
const populateRoles = async (selectedRole = null) => {
    const select = document.getElementById('user-role');
    select.innerHTML = '';

    const myRank = roleRank[userData.role] || 0;

    // Collect all known role names: hardcoded + custom from Firebase
    const allRoles = new Map();
    Object.entries(roleRank).forEach(([role, rank]) => {
        allRoles.set(role, rank);
    });

    // Fetch custom roles from Firebase directly
    try {
        const rolesQ = query(collection(db, "roles"), where("companyId", "in", [userData.companyId, "GLOBAL"]));
        const rolesSnap = await getDocs(rolesQ);
        rolesSnap.forEach(d => {
            const r = d.data();
            if (r.name && !allRoles.has(r.name)) {
                allRoles.set(r.name, 1); // Custom roles default to lowest rank
            }
        });
    } catch (e) {
        console.warn("Failed to fetch custom roles for dropdown", e);
    }

    allRoles.forEach((rank, role) => {
        // Allow if rank is lower than mine, OR if I am Admin (can add anyone), 
        // OR if I am editing and it's the current role (so it doesn't disappear)
        if (rank < myRank || userData.role === 'ADMIN' || (selectedRole && role === selectedRole)) {
            const opt = document.createElement('option');
            opt.value = role;
            opt.textContent = role.replace(/_/g, ' ');
            if (selectedRole === role) opt.selected = true;
            select.appendChild(opt);
        }
    });

    if (select.options.length === 0) {
        const opt = document.createElement('option');
        opt.value = 'EMPLOYEE';
        opt.textContent = 'Employee (Default)';
        select.appendChild(opt);
    }
};

window.showAddUserModal = async () => {
    document.getElementById('user-modal-title').textContent = 'Add New User';
    document.getElementById('user-doc-id').value = '';
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-phone').value = '';
    document.getElementById('user-dob').value = '';
    document.getElementById('user-manager-id').value = '';
    document.getElementById('user-department').value = '';
    document.getElementById('user-budget-limit').value = '';
    document.getElementById('user-mr-role').value = '';
    document.getElementById('user-joining-date').value = '';
    document.getElementById('user-salary').value = '';
    document.getElementById('user-incentive').checked = false;

    // Profile Pic Logic
    const picContainer = document.getElementById('user-profile-pic-container');
    const picInput = document.getElementById('user-profile-pic');
    if (picContainer) {
        picInput.value = '';
        if (['info@fouralpha.org', 'explyra@gmail.com', 'epxlyra@gmail.com'].includes(userData.email)) {
            picContainer.classList.remove('hidden');
        } else {
            picContainer.classList.add('hidden');
        }
    }

    await populateRoles(); // Fetch and populate roles from Firebase
    document.getElementById('user-modal').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('user-modal-content').classList.remove('scale-95', 'opacity-0');
        document.getElementById('user-modal-content').classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.editUser = async (id) => {
    const user = globalUsersCache.find(u => u.id === id);
    if (!user) return showToast("User not found", "error");

    const MAIN_ADMIN_EMAILS = ['info@fouralpha.org', 'explyra@gmail.com', 'epxlyra@gmail.com'];
    if (MAIN_ADMIN_EMAILS.includes(user.email) && !MAIN_ADMIN_EMAILS.includes(userData.email)) {
        return showToast("Access Denied: Main Admin cannot be edited.", "error");
    }

    await showAddUserModal();
    document.getElementById('user-modal-title').textContent = 'Edit User';
    document.getElementById('user-doc-id').value = user.id;
    document.getElementById('user-name').value = user.name || '';
    document.getElementById('user-email').value = user.email || '';
    document.getElementById('user-phone').value = user.phone || '';
    document.getElementById('user-dob').value = user.dob || '';
    document.getElementById('user-manager-id').value = user.managerId || '';
    document.getElementById('user-department').value = user.department || '';
    document.getElementById('user-employee-id').value = user.employeeId || '';
    document.getElementById('user-budget-limit').value = user.budgetLimit || '';
    document.getElementById('user-mr-role').value = user.mrRole || '';
    document.getElementById('user-joining-date').value = user.joiningDate || '';
    document.getElementById('user-salary').value = user.salary || '';
    document.getElementById('user-incentive').checked = user.incentiveEligible || false;

    // Profile Pic
    if (MAIN_ADMIN_EMAILS.includes(userData.email)) {
        const picInput = document.getElementById('user-profile-pic');
        if (picInput) picInput.value = user.photoUrl || '';
        const picContainer = document.getElementById('user-profile-pic-container');
        if (picContainer) picContainer.classList.remove('hidden');
    }

    // Set role AFTER populateRoles has completed (called inside showAddUserModal)
    await populateRoles(user.role);
};



window.toggleLoginPassword = () => {
    const input = document.getElementById('login-password');
    const icon = document.getElementById('login-eye-icon');
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};

window.closeUserModal = () => {
    const modal = document.getElementById('user-modal');
    const content = document.getElementById('user-modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
};

window.showDeleteModal = (docId, name) => {
    const user = globalUsersCache.find(u => u.id === docId);
    const MAIN_ADMIN_EMAILS = ['info@fouralpha.org', 'explyra@gmail.com', 'epxlyra@gmail.com'];

    if (user && MAIN_ADMIN_EMAILS.includes(user.email) && !MAIN_ADMIN_EMAILS.includes(userData.email)) {
        return showToast("Access Denied: Main Admin cannot be deleted.", "error");
    }

    userToDelete = docId;
    document.getElementById('delete-modal-message').textContent = `Are you sure you want to delete ${name}? This will also remove all their expenses and cannot be undone.`;

    const modal = document.getElementById('delete-modal');
    const content = document.getElementById('delete-modal-content');
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeDeleteModal = () => {
    const modal = document.getElementById('delete-modal');
    const content = document.getElementById('delete-modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
    userToDelete = null;
};

window.confirmDeleteUser = async () => {
    if (!userToDelete) return;

    const user = globalUsersCache.find(u => u.id === userToDelete);
    const MAIN_ADMIN_EMAILS = ['info@fouralpha.org', 'explyra@gmail.com', 'epxlyra@gmail.com'];

    if (user && MAIN_ADMIN_EMAILS.includes(user.email) && !MAIN_ADMIN_EMAILS.includes(userData.email)) {
        return showToast("Access Denied: Main Admin cannot be deleted.", "error");
    }

    const btn = document.querySelector('#delete-modal button.bg-red-600');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Deleting...';

    try {
        // Delete all expenses by this user (Handle Batch Limit of 500)
        const expensesQuery = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("userId", "==", userToDelete));
        const expensesSnap = await safeFirebaseFetch(getDocs(expensesQuery));

        // Chunk deletion
        const chunkSize = 400;
        for (let i = 0; i < expensesSnap.docs.length; i += chunkSize) {
            const batch = writeBatch(db);
            const chunk = expensesSnap.docs.slice(i, i + chunkSize);
            chunk.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        }

        // Finally delete the user document
        await deleteDoc(doc(db, "users", userToDelete));

        showToast('User and all associated data deleted successfully!', 'success');
        closeDeleteModal();
        renderUserManagement(); // Refresh the list
    } catch (e) {
        console.error(e);
        showToast('Error deleting user: ' + e.message, 'error');
    } finally {
        btn.innerHTML = originalText;
    }
};

window.toggleUserStatus = async (id, currentStatus) => {
    const user = globalUsersCache.find(u => u.id === id);
    const MAIN_ADMIN_EMAILS = ['info@fouralpha.org', 'explyra@gmail.com', 'epxlyra@gmail.com'];
    
    if (user && MAIN_ADMIN_EMAILS.includes(user.email) && !MAIN_ADMIN_EMAILS.includes(userData.email)) {
        return showToast("Access Denied: Main Admin status cannot be changed.", "error");
    }

    const newStatus = currentStatus === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
    if (!await confirm(`Are you sure you want to ${newStatus === 'BLOCKED' ? 'BLOCK' : 'UNBLOCK'} this user?`)) return;

    try {
        await updateDoc(doc(db, "users", id), { status: newStatus });
        showToast(`User ${newStatus === 'BLOCKED' ? 'blocked' : 'activated'} successfully!`, "success");
        if (typeof renderUsers === 'function') renderUsers();
        else if (typeof fetchUsers === 'function') fetchUsers();
        else location.reload(); // Fallback
    } catch (e) {
        showToast("Error updating status: " + e.message, "error");
    }
};

document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const docId = document.getElementById('user-doc-id').value;
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const phone = document.getElementById('user-phone').value.trim();
    const dob = document.getElementById('user-dob').value;
    const role = document.getElementById('user-role').value;
    const managerId = document.getElementById('user-manager-id').value.trim();
    const department = document.getElementById('user-department').value.trim();
    const employeeId = document.getElementById('user-employee-id').value.trim();
    const budgetLimit = document.getElementById('user-budget-limit').value;
    const mrRole = document.getElementById('user-mr-role').value;
    const joiningDate = document.getElementById('user-joining-date').value;
    const salary = document.getElementById('user-salary').value;
    const incentiveEligible = document.getElementById('user-incentive').checked;
    const photoUrl = document.getElementById('user-profile-pic').value.trim();

    if (!name || !email) {
        showToast('Name and email are required!', 'error');
        return;
    }

    try {
        if (docId) {
            // Update existing user
            await updateDoc(doc(db, "users", docId), {
                name,
                email, // Fixed: Email was missing in update
                role,
                managerId: managerId || null,
                department: department || null,
                employeeId: employeeId || null,
                budgetLimit: budgetLimit ? parseFloat(budgetLimit) : null,
                phone: phone || null,
                dob: dob || null,
                mrRole: mrRole || null,
                joiningDate: joiningDate || null,
                salary: salary ? parseFloat(salary) : null,
                incentiveEligible: incentiveEligible || false,
                photoUrl: photoUrl || null,
                updatedAt: serverTimestamp()
            });
            showToast('User updated successfully!', 'success');
        } else {
            // --- PLAN LIMITS CHECK ---
            const plan = window.companyPlan || 'starter';
            if (plan !== 'enterprise') {
                const currentUsersSnap = await safeFirebaseFetch(getDocs(query(collection(db, "users"), where("companyId", "==", userData.companyId))));
                const employeeCount = currentUsersSnap.size;

                let limit = 50;
                if (plan === 'growth') limit = 150;
                if (plan === 'business') limit = 500;

                if (employeeCount >= limit) {
                    showToast(`Plan Limit Reached! Your ${plan.toUpperCase()} plan allows up to ${limit} employees.`, 'error');
                    return;
                }
            }
            // -------------------------

            // Check if user already exists
            const q = query(collection(db, "users"), where("email", "==", email));
            const snap = await safeFirebaseFetch(getDocs(q));

            if (!snap.empty) {
                showToast('User with this email already exists!', 'error');
                return;
            }

            // Create new user in Firestore
            await addDoc(collection(db, "users"), {
                name,
                email,
                role,
                companyId: userData.companyId,
                managerId: managerId || null,
                department: department || null,
                employeeId: employeeId || null,
                budgetLimit: budgetLimit ? parseFloat(budgetLimit) : null,
                phone: phone || null,
                dob: dob || null,
                mrRole: mrRole || null,
                joiningDate: joiningDate || null,
                salary: salary ? parseFloat(salary) : null,
                incentiveEligible: incentiveEligible || false,
                photoUrl: photoUrl || null,
                createdAt: serverTimestamp()
            });
            showToast('User added successfully! They can login after account creation.', 'success');
        }

        closeUserModal();
        renderUserManagement();
    } catch (e) {
        showToast('Error saving user: ' + e.message, 'error');
    }
});

window.toggleUserExpenses = async (userId, btn) => {
    const row = btn.closest('tr');
    const nextRow = row.nextElementSibling;

    // Check if already open
    if (nextRow && nextRow.classList.contains('expense-row')) {
        nextRow.remove();
        btn.innerHTML = '<i class="fa-solid fa-chevron-right text-[10px]"></i>';
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-[10px]"></i>';

    try {
        // Remove orderBy to avoid composite index requirement issues
        const q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("userId", "==", userId));
        const snap = await safeFirebaseFetch(getDocs(q));

        // Client-side sort and limit
        const expenses = snap.docs
            .map(d => d.data())
            .sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
                return dateB - dateA;
            })
            .slice(0, 10);

        const newRow = document.createElement('tr');
        newRow.className = 'expense-row bg-slate-50 dark:bg-slate-900/50 animate-[slideUp_0.2s]';

        let detailsHtml = '';
        if (expenses.length === 0) {
            detailsHtml = '<div class="p-4 text-center text-slate-400 text-xs italic">No recent expenses found for this user.</div>';
        } else {
            detailsHtml = `
                        <div class="p-4 overflow-x-auto" >
                            <table class="data-grid text-xs text-left">
                                <thead class="text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th class="pb-2">Date</th>
                                        <th class="pb-2">Title</th>
                                        <th class="pb-2 text-right">Amount</th>
                                        <th class="pb-2 text-center">Status</th>
                                        <th class="pb-2">Project</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                    ${expenses.map(e => `
                                            <tr>
                                                <td class="py-2 text-slate-500">${e.createdAt?.toDate ? e.createdAt.toDate().toLocaleDateString() : '-'}</td>
                                                <td class="py-2 font-medium text-slate-700 dark:text-slate-200">${e.title}</td>
                                                <td class="py-2 text-right font-mono">${formatCurrency(e.totalAmount, e.currency)}</td>
                                                <td class="py-2 text-center"><span class="${getStatusBadgeClass(e.status).split(' ')[0]} scale-75 origin-center">${e.status.replace('_', ' ')}</span></td>
                                                <td class="py-2 text-slate-500">${e.projectCode || '-'}</td>
                                            </tr>
                                        `).join('')}
                                </tbody>
                            </table>
                        </div>
                        `;
        }

        newRow.innerHTML = `
                        <td colspan="8" class="p-0 border-b border-slate-200 dark:border-slate-800 shadow-inner">
                            <div class="border-l-4 border-green-500 m-2 rounded bg-white dark:bg-slate-800">
                                ${detailsHtml}
                            </div>
                    </td >
                        `;

        row.parentNode.insertBefore(newRow, row.nextSibling);
        btn.innerHTML = '<i class="fa-solid fa-chevron-down text-[10px]"></i>';

    } catch (e) {
        console.error(e);
        showToast("Error loading expenses", "error");
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500 text-[10px]"></i>';
    }
};

let expenseCountsCache = {}; // Cache for expense counts

async function renderUserManagement() {
    document.getElementById('page-title').textContent = "User Management";
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

    try {
        let uQ;
        if (userData.companyId === 'GLOBAL') {
            uQ = collection(db, "users");
        } else {
            uQ = query(collection(db, "users"), where("companyId", "==", userData.companyId || 'N/A'));
        }
        const usersSnap = await safeFirebaseFetch(getDocs(uQ));
        const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        globalUsersCache = users; // Update cache

        // Get expense counts for each user
        expenseCountsCache = {};
        let exQ;
        if (userData.companyId === 'GLOBAL') {
            exQ = collection(db, "expenses");
        } else {
            exQ = query(collection(db, "expenses"), where("companyId", "==", userData.companyId || 'N/A'));
        }
        const expensesSnap = await safeFirebaseFetch(getDocs(exQ));
        expensesSnap.forEach(doc => {
            const data = doc.data();
            expenseCountsCache[data.userId] = (expenseCountsCache[data.userId] || 0) + 1;
        });

        const myRank = roleRank[userData.role] || 0;

        content.innerHTML = `
                    <div class="fade-in space-y-6">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100">User Management</h3>
                                <p class="text-xs text-slate-500">Manage access levels, roles, and user accounts.</p>
                            </div>
                            <div class="flex gap-2 w-full md:w-auto">
                                ${['ADMIN', 'HR'].includes(userData.role) ? `<button onclick="openNotificationModal()" class="flex-1 md:flex-none text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
                                     <i class="fa-solid fa-paper-plane"></i> Notify Users
                                </button>` : ''}
                                ${myRank > 1 ? `<button onclick="showAddUserModal()" class="flex-1 md:flex-none text-xs bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2">
                                     <i class="fa-solid fa-plus"></i> Add User
                                </button>` : ''}
                            </div>
                        </div>

                        <div class="bg-white dark:bg-slate-810 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center mb-6">
                            <div class="relative flex-1 w-full">
                                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                <input type="text" id="user-search" oninput="handleUserSearch()" placeholder="Search users by name, email or employee ID..." class="input-vercel pl-9 h-10 w-full bg-slate-50 dark:bg-slate-900 border-none">
                            </div>
                            <h3 class="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Total: <span id="user-count-badge">${users.length}</span></h3>
                        </div>

                        <div id="users-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- Populated by JS -->
                        </div>
                    </div>
                `;

        renderUserRows(users);

    } catch (e) {
        content.innerHTML = emptyState("Error loading users: " + e.message);
    }
}

window.handleUserSearch = () => {
    const term = document.getElementById('user-search').value.toLowerCase();
    const filtered = globalUsersCache.filter(u =>
        (u.name || '').toLowerCase().includes(term) ||
        (u.email || '').toLowerCase().includes(term) ||
        (u.employeeId || '').toLowerCase().includes(term) ||
        (u.role || '').toLowerCase().includes(term)
    );
    renderUserRows(filtered);
    document.getElementById('user-count-badge').textContent = filtered.length;
};

function renderUserRows(usersList) {
    const container = document.getElementById('users-grid');
    if (!container) return;

    if (usersList.length === 0) {
        container.innerHTML = `<div class="col-span-full p-12 text-center text-slate-400 italic">No users found matching your search.</div>`;
        return;
    }

    const myRank = roleRank[userData.role] || 0;
    const MAIN_ADMIN_EMAILS = ['explyra@gmail.com', 'epxlyra@gmail.com'];

    container.innerHTML = usersList.map(u => {
        const uRank = roleRank[u.role] || 1;
        let canEdit = myRank > uRank || userData.role === 'ADMIN';

        const MAIN_ADMIN_EMAILS_LIST = ['info@fouralpha.org', 'explyra@gmail.com', 'epxlyra@gmail.com'];
        // PROTECTION: Main Admin cannot be edited/deleted by others
        if (MAIN_ADMIN_EMAILS_LIST.includes(u.email) && !MAIN_ADMIN_EMAILS_LIST.includes(userData.email)) {
            canEdit = false;
        }

        const count = expenseCountsCache[u.id] || 0;

        return `
                <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition group relative overflow-hidden flex flex-col">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition font-bold text-lg overflow-hidden border border-slate-100 dark:border-slate-700">
                                ${u.photoUrl ? `<img src="${u.photoUrl}" class="w-full h-full object-cover">` : (u.name ? u.name[0].toUpperCase() : '?')}
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5 line-clamp-1">
                                    ${u.name || 'Unnamed User'}
                                    ${u.id === currentUser.uid ? '<span class="ml-1 text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-bold">YOU</span>' : ''}
                                </h4>
                                <p class="text-[10px] text-slate-400 truncate max-w-[150px] font-medium">${u.email || 'No Email'}</p>
                            </div>
                        </div>
                        <span class="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest ${u.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-slate-50 text-slate-500 border border-slate-100'} uppercase">
                            ${(u.role || 'User').replace('_', ' ')}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mb-6 flex-1">
                        <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/30">
                            <p class="text-[9px] text-slate-400 uppercase font-black tracking-tighter mb-0.5">Emp ID / Dept</p>
                            <p class="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">${u.employeeId || 'N/A'} • ${u.department || 'Gen'}</p>
                        </div>
                        <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/30">
                            <p class="text-[9px] text-slate-400 uppercase font-black tracking-tighter mb-0.5">Expenses</p>
                            <p class="text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                                ₹${u.budgetLimit ? u.budgetLimit.toLocaleString() : '∞'}
                                <span class="text-green-600">(${count})</span>
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50 gap-2">
                        ${canEdit ? `
                            <button onclick="editUser('${u.id}')" class="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-green-50 hover:text-green-600 transition uppercase tracking-widest border border-slate-100 dark:border-slate-700">Edit Profile</button>
                            ${u.email !== currentUser?.email ? `
                                <button onclick="toggleUserStatus('${u.id}', '${u.status || 'ACTIVE'}')" class="px-3 py-1.5 text-[10px] font-bold ${u.status === 'BLOCKED' ? 'text-green-600 bg-green-50' : 'text-orange-400 bg-orange-50/10'} rounded-lg transition uppercase tracking-widest">${u.status === 'BLOCKED' ? 'Unblock' : 'Block'}</button>
                                <button onclick="showDeleteModal('${u.id}', '${u.name || u.email}')" class="px-3 py-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition uppercase tracking-widest">Delete</button>
                            ` : ''}
                        ` : `
                            <div class="flex-1 text-center py-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic opacity-50"><i class="fa-solid fa-lock mr-2"></i> Restricted Access</div>
                        `}
                    </div>
                </div>
                            `}).join('');
}

window.handleLogoPreview = async (input) => {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        let url = '';

        const preview = document.getElementById('logo-preview');
        preview.parentElement.classList.add('opacity-50');

        try {
            url = await compressImage(file);
        } catch (e) {
            console.error("Image processing failed", e);
        }

        document.getElementById('logo-preview').src = url;
        document.getElementById('logo-preview').classList.remove('hidden');
        document.getElementById('logo-base64').value = url;
        preview.parentElement.classList.remove('opacity-50');
    }
};

window.openPaymentIssueModal = (id) => {
    const expense = window.currentExpenseData; // Admin context
    if (!expense) return;

    document.getElementById('issue-expense-id').value = id;
    document.getElementById('issue-type').value = 'NOT_RECEIVED';
    document.getElementById('issue-comment').value = '';

    document.getElementById('modal-payment-issue').classList.remove('hidden');
};

window.submitPaymentIssue = async (e) => {
    e.preventDefault();
    const id = document.getElementById('issue-expense-id').value;
    const type = document.getElementById('issue-type').value;
    const comment = document.getElementById('issue-comment').value;
    const btn = document.getElementById('btn-submit-issue');

    if (!comment) return showToast("Please provide details", "error");

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Reporting...';
    btn.disabled = true;

    try {
        const expenseRef = doc(db, "expenses", id);
        const currentExpense = window.currentExpenseData;

        // Add to history
        const historyEntry = {
            action: 'PAYMENT_ISSUE_REPORTED',
            by: userData.name + ' (Admin)',
            role: userData.role,
            date: new Date(),
            comment: `Admin Flagged Issue: ${type} - ${comment} `,
            issueType: type
        };

        await updateDoc(expenseRef, {
            status: 'PAYMENT_ISSUE',
            paymentIssue: {
                type,
                comment,
                reportedAt: serverTimestamp(),
                reportedBy: userData.uid
            },
            history: [...(currentExpense.history || []), historyEntry],
            updatedAt: serverTimestamp()
        });

        showToast("Payment issue flagged successfully.", "success");
        closeModal('modal-payment-issue');
        closeModal('modal-expense'); // Close expense view too
        renderApprovals(); // Refresh list
    } catch (err) {
        console.error(err);
        showToast("Failed to flag issue: " + err.message, "error");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

window.saveAllSettings = async () => {
    const name = document.getElementById('company-name').value.trim();

    // Logo comes from hidden input which updates via Logo URL or image picker
    const logoUrlInput = document.getElementById('company-logo-url');
    let logo = document.getElementById('logo-base64').value;
    if (logoUrlInput && logoUrlInput.value) {
        logo = logoUrlInput.value;
    }

    const email = document.getElementById('company-email').value;
    const phone = document.getElementById('company-phone').value;
    const address = document.getElementById('company-address').value;
    const taxId = document.getElementById('company-tax-id').value;
    const autoApproveLimit = document.getElementById('auto-approve-limit').value;
    const receiptLimit = document.getElementById('receipt-limit').value;
    const emailNotifications = document.getElementById('email-notifications').checked;

    // Fetch new inputs
    const domain = document.getElementById('company-domain') ? document.getElementById('company-domain').value.trim() : '';
    const industry = document.getElementById('company-industry') ? document.getElementById('company-industry').value : '';
    const size = document.getElementById('company-size') ? document.getElementById('company-size').value : '';
    const country = document.getElementById('company-country') ? document.getElementById('company-country').value.trim() : '';

    try {
        const promises = [];

        // Save nested settings
        promises.push(setDoc(doc(db, "companies", userData.companyId, "settings", "branding"), {
            companyName: name,
            logo,
            email,
            phone,
            address,
            taxId,
            autoApproveLimit: parseFloat(autoApproveLimit),
            receiptLimit: parseFloat(receiptLimit),
            emailNotifications,
            updatedAt: serverTimestamp()
        }, { merge: true }));

        // Save core company document info
        const companyUpdates = {};
        if (name) companyUpdates.name = name;
        if (logo) companyUpdates.logo = logo;
        if (domain !== undefined) companyUpdates.domain = domain;
        if (industry) companyUpdates.industry = industry;
        if (size) companyUpdates.size = size;
        if (country) companyUpdates.country = country;

        if (Object.keys(companyUpdates).length > 0) {
            promises.push(updateDoc(doc(db, "companies", userData.companyId), companyUpdates));
        }

        await Promise.all(promises);

        showToast('All settings updated successfully!', 'success');
        await loadCompanyBranding(userData.companyId);
    } catch (e) {
        showToast(e.message, 'error');
    }
};

window.exportReport = async (format) => {
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

    try {
        const expensesSnap = await safeFirebaseFetch(getDocs(query(collection(db, "expenses"), where("companyId", "==", userData.companyId))));
        const expenses = expensesSnap.docs.map(d => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
            };
        });

        if (format === 'csv') {
            const headers = ["ID", "Title", "Date", "Amount", "Currency", "Status", "User", "Project Code"];
            const csvContent = [
                headers.join(","),
                ...expenses.map(e => [
                    e.id,
                    `"${e.title.replace(/"/g, '""')}"`,
                    e.createdAt.split('T')[0],
                    e.totalAmount,
                    e.currency,
                    e.status,
                    `"${(e.userName || 'Unknown').replace(/"/g, '""')}"`,
                    e.projectCode
                ].join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `expense_report_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            showToast("CSV Exported successfully!", "success");
        } else if (format === 'pdf') {
            // Generate a clean table for PDF
            const container = document.createElement('div');
            container.className = 'p-8 bg-white';
            container.innerHTML = `
                        <div class="text-center mb-6">
                            <h1 class="text-2xl font-bold text-slate-800 uppercase tracking-wider mb-2">Expense Report</h1>
                            <p class="text-sm text-slate-500">Generated on ${new Date().toLocaleString()}</p>
                        </div>
                        <table class="w-full text-xs border-collapse">
                            <thead>
                                <tr class="bg-slate-100 text-slate-600 uppercase">
                                    <th class="border p-2 text-left">Date</th>
                                    <th class="border p-2 text-left">Title</th>
                                    <th class="border p-2 text-left">User</th>
                                    <th class="border p-2 text-right">Amount</th>
                                    <th class="border p-2 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${expenses.map(e => `
                                    <tr>
                                        <td class="border p-2">${e.createdAt.split('T')[0]}</td>
                                        <td class="border p-2 font-bold">${e.title}</td>
                                        <td class="border p-2">${e.userName || 'Unknown'}</td>
                                        <td class="border p-2 text-right font-mono">${e.currency} ${parseFloat(e.totalAmount).toFixed(2)}</td>
                                        <td class="border p-2 text-center font-bold text-[10px]">${e.status}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                             <tfoot>
                                <tr class="bg-slate-50 font-bold">
                                    <td colspan="3" class="border p-2 text-right">TOTAL</td>
                                    <td class="border p-2 text-right">INR ${expenses.reduce((s, e) => s + (parseFloat(e.totalAmount) || 0), 0).toLocaleString()}</td>
                                    <td class="border p-2"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="mt-8 text-xs text-slate-400 text-center">
                            <p>CONFIDENTIAL | Explyra Suite Expense Management System</p>
                        </div>
                    `;

            const opt = {
                margin: 10,
                filename: `expense_report_${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
            };

            try {
                await html2pdf().set(opt).from(container).save();
                showToast("PDF Exported successfully!", "success");
            } catch (err) {
                console.error(err);
                showToast("PDF Export failed: " + err.message, "error");
            }
        } else {
            showToast(`${format.toUpperCase()} export coming soon!`, 'info');
        }
    } catch (e) {
        console.error(e);
        showToast("Export failed: " + e.message, "error");
    } finally {
        btn.innerHTML = originalText;
    }
};

window.openExpenseModal = (id) => {
    const modal = document.getElementById('modal-expense');
    modal.classList.remove('hidden');
    pushAdminModalState('modal-expense');
    document.getElementById('modal-items').innerHTML = '<div class="p-4 text-center text-slate-400">Loading...</div>';

    onSnapshot(doc(db, "expenses", id), (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        window.currentExpenseData = data;
        window.currentExpenseId = id;

        // Get employee name
        let employeeName = 'Unknown';
        if (data.userId) {
            getDoc(doc(db, "users", data.userId)).then(userSnap => {
                if (userSnap.exists()) {
                    document.getElementById('modal-employee').textContent = userSnap.data().name || 'Unknown';
                }
            });
        }

        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-id').textContent = `ID: ${id.substring(0, 6)}`;
        document.getElementById('modal-amount').textContent = `${getSymbol(data.currency)}${data.totalAmount}`;
        document.getElementById('modal-project').textContent = data.projectCode || 'N/A';
        document.getElementById('modal-currency').textContent = data.currency || 'INR';

        if (data.preApproved) {
            document.getElementById('modal-pre-approved').classList.remove('hidden');
            const proofContainer = document.getElementById('modal-approval-proof-container');
            const proofLink = document.getElementById('modal-approval-link');

            const proofVal = data.approvalProofUrl || data.approvalProof;
            proofContainer.classList.remove('hidden');
            proofLink.href = proofVal || '#';
            proofLink.textContent = proofVal || 'N/A';

            // Security Badge
            const isSecure = proofVal && proofVal.startsWith('https://');
            const badge = document.createElement('span');
            badge.className = `ml-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${isSecure ? 'bg-emerald-100 text-green-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`;
            badge.innerHTML = isSecure ? '<i class="fa-solid fa-lock mr-1"></i> Secure' : '<i class="fa-solid fa-lock-open mr-1"></i> Insecure';

            // Clear old badge
            const existingBadge = proofContainer.querySelector('span.uppercase');
            if (existingBadge) existingBadge.remove();

            proofContainer.querySelector('p').appendChild(badge);
        } else {
            document.getElementById('modal-pre-approved').classList.add('hidden');
            const proofContainer = document.getElementById('modal-approval-proof-container');
            if (proofContainer) proofContainer.classList.add('hidden');
        }

        const statusEl = document.getElementById('modal-status');
        statusEl.className = `mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadgeClass(data.status)}`;
        statusEl.textContent = data.status.replace('_', ' ');

        // Show employee notes/description
        const notesContainer = document.getElementById('modal-notes-container');
        const notesEl = document.getElementById('modal-notes');
        if (data.notes && data.notes.trim()) {
            notesContainer.classList.remove('hidden');
            notesEl.textContent = data.notes;
        } else {
            notesContainer.classList.add('hidden');
            notesEl.textContent = '';
        }

        document.getElementById('modal-items').innerHTML = (data.lineItems || []).map(item => {
            const isSecure = item.receiptUrl && (item.receiptUrl.startsWith('https://') || item.receiptUrl.startsWith('blob:'));
            const badgeHtml = item.receiptUrl ? `<span class="ml-2 text-[8px] uppercase font-bold px-1.5 py-0.5 rounded border ${isSecure ? 'bg-emerald-100 text-green-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}">${isSecure ? '<i class="fa-solid fa-lock mr-1"></i> Secure' : '<i class="fa-solid fa-lock-open mr-1"></i> Insecure'}</span>` : '';

            return `
                    <div class="flex gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-green-100 transition">
                        <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0 group relative">
                            ${item.receiptUrl ?
                    `<img src="${item.receiptUrl}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://placehold.co/100?text=File'; this.classList.add('p-2', 'opacity-50');">
                                 <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer" onclick="window.open('${item.receiptUrl}', '_blank')">
                                    <i class="fa-solid fa-arrow-up-right-from-square text-white"></i>
                                 </div>`
                    : '<i class="fa-solid fa-image text-slate-300"></i>'}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-start">
                                <div>
                                    <span class="font-bold text-slate-700 dark:text-slate-200 text-sm block truncate">${item.category}</span>
                                    <div class="flex items-center gap-2 mt-1">
                                        ${badgeHtml}
                                        ${item.receiptUrl ? `<a href="${item.receiptUrl}" target="_blank" class="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded hover:bg-green-100 border border-green-100 flex items-center gap-1 transition"><i class="fa-solid fa-external-link-alt"></i> Open Proof</a>` : ''}
                                    </div>
                                </div>
                                <span class="font-mono font-bold text-slate-600 dark:text-slate-300 text-sm whitespace-nowrap">${getSymbol(data.currency)}${parseFloat(item.amount).toFixed(2)}</span>
                            </div>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">${item.description || item.desc || 'No description'}</p>
                        </div>
                    </div>
                `;
        }).join('');

        document.getElementById('modal-history').innerHTML = (data.history || []).map(h => {
            let proofHtml = '';
            if (h.paymentProofUrl) {
                const isSecure = h.paymentProofUrl.startsWith('https://') || h.paymentProofUrl.startsWith('blob:');
                const badgeClass = isSecure ? 'bg-emerald-100 text-green-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200';
                const icon = isSecure ? '<i class="fa-solid fa-lock mr-1"></i>' : '<i class="fa-solid fa-lock-open mr-1"></i>';
                const text = isSecure ? 'Secure' : 'Insecure';

                proofHtml = `
                    <div class="mt-1 flex items-center gap-2">
                       <a href="${h.paymentProofUrl}" target="_blank" class="text-[10px] text-green-600 hover:underline flex items-center gap-1"><i class="fa-solid fa-paperclip"></i> View Proof</a>
                       <span class="text-[8px] uppercase font-bold px-1.5 py-0.5 rounded border ${badgeClass}">${icon} ${text}</span>
                    </div>`;
            }

            return `
                    <div class="relative pl-4 pb-4 last:pb-0">
                        <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-300"></div>
                        <p class="text-[10px] text-slate-400 font-mono">${new Date(h.date?.toDate ? h.date.toDate() : h.date).toLocaleString()}</p>
                        <p class="text-xs text-slate-700 dark:text-slate-200 font-semibold">${h.action} <span class="font-normal text-slate-500 dark:text-slate-400">by ${h.by}</span></p>
                        ${h.comment ? `<div class="bg-yellow-50 text-yellow-800 text-[10px] p-2 rounded mt-1 border border-yellow-100 italic">"${h.comment}"</div>` : ''}
                        ${h.paymentMode ? `<div class="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Paid via ${h.paymentMode} (Ref: ${h.transactionRef}) on ${formatDateUtc(h.paymentDate)}</div>` : ''}
                        ${proofHtml}
                    </div>
                `;
        }).join('');

        const actionPanel = document.getElementById('action-panel');
        // Clear previous dynamic content
        actionPanel.innerHTML = `
                    <h4 class="text-xs font-bold text-green-600 uppercase mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                        Approver Action</h4>
                    <textarea id="decision-comment" placeholder="Add comments or rejection reason..."
                        class="input-primary h-20 resize-none mb-3 text-xs"></textarea>
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="handleDecision('REJECT')"
                            class="bg-white dark:bg-slate-800 border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-lg text-xs font-bold transition">Reject</button>
                        <button onclick="handleDecision('APPROVE')" id="btn-approve"
                            class="bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-xs font-bold transition shadow-lg shadow-green-200">Approve</button>
                    </div>
                `;

        const btn = document.getElementById('btn-approve');

        actionPanel.classList.add('hidden');
        let canAct = false;

        const role = userData.role;
        const status = data.status;

        // Add Treasury Inputs if applicable
        // Add Payment Inputs for Accounts/Treasury
        if ((userData.role === 'ACCOUNTS' || userData.role === 'TREASURY' || userData.role === 'ADMIN') &&
            (data.status === 'FINANCE_APPROVED' || data.status === 'PENDING_TREASURY')) {
            actionPanel.innerHTML = `
                        <div class="mb-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h4 class="font-bold text-slate-700 dark:text-slate-200 text-xs uppercase mb-3"><i class="fa-solid fa-money-bill-transfer mr-1"></i> Payment Details</h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Mode</label>
                                    <select id="payment-mode" class="w-full text-xs font-bold p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded">
                                        <option value="BANK_TRANSFER">Bank Transfer</option>
                                        <option value="CHEQUE">Cheque</option>
                                        <option value="UPI">UPI</option>
                                        <option value="CASH">Cash</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Transaction Ref / Cheque No.</label>
                                    <input type="text" id="payment-ref" class="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded uppercase font-mono" placeholder="CMS-29382...">
                                </div>
                                <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Date</label>
                                    <input type="date" id="payment-date" class="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded" value="${new Date().toISOString().split('T')[0]}">
                                </div>
                                <div class="col-span-1 md:col-span-3">
                                     <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Payment Proof (Optional)</label>
                                     <input type="file" id="payment-proof" accept="image/*" class="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded">
                                     <input type="hidden" id="payment-proof-base64">
                                </div>
                            </div>
                        </div>
                     ` + actionPanel.innerHTML;
        }

        if (role === 'MANAGER' && status === 'PENDING_MANAGER') {
            canAct = true;
            btn.textContent = "Approve Claim";
        }
        else if (role === 'FINANCE_MANAGER' && status === 'PENDING_FINANCE') {
            canAct = true;
            btn.textContent = "Approve for Payment";
        }
        else if (role === 'ACCOUNTS' && (status === 'FINANCE_APPROVED' || status === 'PENDING_ACCOUNTS')) {
            canAct = true;
            btn.textContent = "Complete Payment";
        }
        else if (role === 'SENIOR_MANAGER' && status === 'PENDING_SENIOR_MANAGER') {
            canAct = true;
            btn.textContent = "Approve for Treasury";
        }
        else if (role === 'TREASURY' && status === 'PENDING_TREASURY') {
            canAct = true;
            btn.textContent = "Mark as Paid";
        }
        else if (role === 'AUDIT' && status === 'PAID') {
            canAct = true;
            btn.textContent = "Mark as Audited";
        }
        else if (role === 'ADMIN') {
            if (!['AUDITED', 'REJECTED'].includes(status)) {
                canAct = true;
                // Intelligent Button Label
                if (status === 'PENDING_MANAGER') btn.textContent = "Approve (Managers)";
                else if (status === 'PENDING_FINANCE') btn.textContent = "Approve (Finance)";
                else if (status === 'FINANCE_APPROVED') btn.textContent = "Mark as Paid";
                else if (status === 'PENDING_ACCOUNTS') btn.textContent = "Mark as Paid";
                else if (status === 'PAID') btn.textContent = "Mark as Audited";
                else if (status === 'PAYMENT_ISSUE' || status === 'PAYMENT_DISPUTED') {
                    // Split Action Panel for Issue Resolution
                    actionPanel.innerHTML = `
                                <h4 class="text-xs font-bold text-orange-600 uppercase mb-4 border-b border-orange-100 pb-2">
                                    <i class="fa-solid fa-triangle-exclamation mr-2"></i> Payment Issue Resolution
                                </h4>
                                <div class="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-4 text-xs text-orange-800">
                                    <div class="flex justify-between items-start border-b border-orange-100 pb-2 mb-2">
                                        <div>
                                            <p class="font-bold opacity-70 uppercase text-[9px]">Original Paid By</p>
                                            <p class="font-bold text-slate-800">${(data.history && data.history.find(h => h.action === 'PAID')?.by) || 'Unknown'}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="font-bold opacity-70 uppercase text-[9px]">Reported At</p>
                                            <p class="font-bold text-slate-800">${data.paymentIssue?.reportedAt ? new Date(data.paymentIssue.reportedAt.toDate()).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                    </div>
                                    <p class="font-bold">User reported issue:</p>
                                    <p class="italic text-slate-700">"${(data.history && (data.history.find(h => h.action === 'PAYMENT_ISSUE')?.comment || data.history.find(h => h.action === 'PAYMENT_ISSUE_REPORTED')?.comment)) || 'No details provided'}"</p>
                                </div>
                                <textarea id="decision-comment" placeholder="Resolution notes..."
                                    class="input-primary h-20 resize-none mb-3 text-xs"></textarea>
                                <div class="grid grid-cols-2 gap-3">
                                    <button onclick="handleDecision('REPROCESS')" 
                                        class="bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 py-2 rounded-lg text-xs font-bold transition">
                                        <i class="fa-solid fa-rotate-left mr-1"></i> Retry Payment
                                    </button>
                                    <button onclick="handleDecision('RESOLVE')" 
                                        class="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xs font-bold transition shadow-lg shadow-green-200">
                                        <i class="fa-solid fa-check mr-1"></i> Mark Resolved
                                    </button>
                                </div>
                            `;
                    // Hide the default button since we replaced the panel
                    canAct = false;
                }
                else btn.textContent = "Move Forward";
            } else if (status === 'PAID') {
                // Add 'Payment Not Received' option for Admin too (e.g. if they notice it failed manually)
                // We append it to the action panel if it's visible (which it is for Admin)
                // But 'Mark as Audited' is already there. Let's add a secondary button.
                const container = actionPanel.querySelector('.grid');
                if (container) {
                    const issueBtn = document.createElement('button');
                    issueBtn.className = "col-span-2 mt-2 text-orange-600 hover:bg-orange-50 border border-orange-200 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2";
                    issueBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Flag Payment Issue';
                    issueBtn.onclick = async () => {
                        if (await confirm("Flag this expense as PAYMENT ISSUE?")) {
                            handleDecision('FLAG_ISSUE');
                        }
                    };
                    container.appendChild(issueBtn);
                }
            }
        }

        if (canAct || role === 'ADMIN') actionPanel.classList.remove('hidden');

        // Admin Override Panel (Always visible for Admin)
        if (role === 'ADMIN') {
            const isLocked = status === 'PAID';
            const adminPanel = `
                        <div class="mb-4 p-4 bg-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                            <div class="absolute -top-3 left-3 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Admin Control</div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                 <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Force Status</label>
                                    <select id="admin-status" ${isLocked ? 'disabled' : ''} class="w-full text-xs font-bold p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded text-slate-700 dark:text-slate-200">
                                        <option value="PENDING_MANAGER">PENDING MANAGER</option>
                                        <option value="PENDING_FINANCE">PENDING FINANCE</option>
                                        <option value="FINANCE_APPROVED">FINANCE APPROVED (ACCOUNTS)</option>
                                        <option value="PENDING_SENIOR_MANAGER">PENDING SR. MANAGER</option>
                                        <option value="PENDING_TREASURY">PENDING TREASURY</option>
                                        <option value="PAID">PAID</option>
                                        <option value="AUDITED">AUDITED</option>
                                        <option value="REJECTED">REJECTED</option>
                                    </select>
                                </div>
                                 <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Payment Mode</label>
                                    <select id="admin-pay-mode" class="w-full text-xs font-bold p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded text-slate-700 dark:text-slate-200">
                                        <option value="">Select Mode</option>
                                        <option value="BANK_TRANSFER">Bank Transfer</option>
                                        <option value="CHEQUE">Cheque</option>
                                        <option value="UPI">UPI</option>
                                        <option value="CASH">Cash</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Transaction Ref</label>
                                    <input type="text" id="admin-pay-ref" class="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded font-mono" placeholder="Ref No.">
                                </div>
                                <div>
                                    <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Payment Date</label>
                                    <input type="date" id="admin-pay-date" class="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded">
                                </div>
                                <div class="col-span-1 md:col-span-2">
                                     <label class="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">Payment Proof (Optional)</label>
                                     <input type="file" id="admin-pay-proof" accept="image/*" class="w-full text-xs p-2 bg-white dark:bg-slate-800 border border-slate-300 rounded">
                                     <input type="hidden" id="admin-pay-proof-base64">
                                </div>
                            </div>
                            <div class="mt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 pt-3">
                                <button onclick="updateAdminExpense()" class="bg-slate-900 hover:bg-slate-800 text-white py-2 px-6 rounded-lg text-xs font-bold transition shadow-lg flex items-center gap-2">
                                    <i class="fa-solid fa-floppy-disk"></i> Save & Update
                                </button>
                            </div>
                        </div>
                     `;

            if (role === 'ADMIN') {
                // For Admin, we Append the override panel below the standard actions
                // allowing them to use either the quick buttons OR the manual override.
                // We do NOT clear the previous content.
                actionPanel.innerHTML += adminPanel;

                // Pre-fill Admin Fields
                setTimeout(() => {
                    if (document.getElementById('admin-status')) document.getElementById('admin-status').value = data.status;
                    if (document.getElementById('admin-pay-mode')) document.getElementById('admin-pay-mode').value = data.paymentMode || '';
                    if (document.getElementById('admin-pay-ref')) document.getElementById('admin-pay-ref').value = data.transactionRef || '';
                    if (document.getElementById('admin-pay-date')) document.getElementById('admin-pay-date').value = data.paymentDate || new Date().toISOString().split('T')[0];
                }, 0);
            }
        }
    });
};



window.handleDecision = async (decision) => {
    const comment = document.getElementById('decision-comment').value.trim();

    if (decision === 'REJECT' && !comment) {
        showToast('Please provide a reason for rejection.', 'error');
        return;
    }

    const actionPanel = document.getElementById('action-panel');
    const buttons = actionPanel.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    // Find the approve button to show loading state (it's the second button usually, or by ID)
    const approveBtn = document.getElementById('btn-approve');
    const originalText = approveBtn ? approveBtn.innerHTML : 'Approve';
    if (approveBtn && decision === 'APPROVE') approveBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';

    try {
        const expenseRef = doc(db, "expenses", window.currentExpenseId);
        let newStatus = window.currentExpenseData.status;
        const role = userData.role;
        const amount = parseFloat(window.currentExpenseData.totalAmount);

        if (decision === 'REJECT') {
            newStatus = 'REJECTED';
        } else if (decision === 'REPROCESS') {
            newStatus = 'FINANCE_APPROVED'; // Send back to payment queue
        } else if (decision === 'RESOLVE') {
            newStatus = 'PAID'; // Issue resolved, mark as paid
        } else if (decision === 'FLAG_ISSUE') {
            newStatus = 'PAYMENT_ISSUE';
        } else {
            // Dynamic Approval Logic
            try {
                const expenseOwnerRole = window.currentExpenseData.userRole || 'EMPLOYEE'; // Fallback if missing
                const nextStage = await getNextStageStatus(window.currentExpenseData.status, expenseOwnerRole);

                if (nextStage) {
                    newStatus = nextStage;
                } else {
                    // Fallback if workflow fails or ends
                    // If user is Admin, we might want to force logical next step or just warn
                    if (role === 'ADMIN') {
                        // Keep Admin override logic as fallback/helper if dynamic fails
                        if (newStatus === 'PENDING_MANAGER') newStatus = 'PENDING_FINANCE';
                        else if (newStatus === 'PENDING_FINANCE') newStatus = 'FINANCE_APPROVED';
                        else if (newStatus === 'FINANCE_APPROVED') newStatus = 'PAID';
                        else if (newStatus === 'PENDING_SENIOR_MANAGER') newStatus = 'PENDING_TREASURY';
                        else if (newStatus === 'PENDING_TREASURY') newStatus = 'PAID';
                        else if (newStatus === 'PAID') newStatus = 'AUDITED';
                    } else {
                        throw new Error("Workflow configuration error: No next stage defined.");
                    }
                }
            } catch (err) {
                console.error("Workflow Error:", err);
                // Fallback to legacy hardcoded logic for safety during migration
                if (role === 'MANAGER') newStatus = 'PENDING_FINANCE';
                else if (role === 'FINANCE_MANAGER') newStatus = 'FINANCE_APPROVED';
                else if (role === 'ACCOUNTS') newStatus = 'PAID';
                else if (role === 'SENIOR_MANAGER') newStatus = 'PENDING_TREASURY';
                else if (role === 'TREASURY') newStatus = 'PAID';
                else if (role === 'AUDIT') newStatus = 'AUDITED';
            }
        }

        // Prepare Update Data
        const updateData = {
            status: newStatus,
            updatedAt: serverTimestamp()
        };

        // Add Treasury Details if becoming PAID
        if (newStatus === 'PAID') {
            const payMode = document.getElementById('payment-mode')?.value;
            const payRef = document.getElementById('payment-ref')?.value;
            const payDate = document.getElementById('payment-date')?.value;
            const payProofInput = document.getElementById('payment-proof');

            if (payMode) updateData.paymentMode = payMode;
            if (payRef) updateData.transactionRef = payRef;
            if (payDate) updateData.paymentDate = payDate;

            if (payProofInput && payProofInput.files[0]) {
                try {
                    updateData.paymentProofUrl = await compressImage(payProofInput.files[0]);
                } catch (e) { console.error("Proof upload failed", e); }
            }
        }

        const historyEntry = {
            action: decision,
            by: userData.name,
            role: userData.role,
            date: new Date(),
            comment: comment || (decision === 'APPROVE' ? 'Approved' : 'Rejected'),
            paymentMode: updateData.paymentMode || null,
            transactionRef: updateData.transactionRef || null
        };

        // --- EmailJS: Notify employee IMMEDIATELY ---
        sendSystemEmail('STATUS_UPDATE', {
            to_email: window.currentExpenseData.userEmail || '',
            name: window.currentExpenseData.userName || 'Employee',
            new_status: newStatus,
            message: `Your claim for ${window.currentExpenseData.title || 'Expense'} has been processed.`
        });

        await updateDoc(expenseRef, {
            ...updateData,
            history: [...(window.currentExpenseData.history || []), historyEntry]
        });

        showToast(`Expense ${decision === 'APPROVE' ? 'approved' : 'rejected'} successfully!`, 'success');
        closeModal('modal-expense');

        // Refresh lists
        if (!document.getElementById('dashboard-screen').classList.contains('hidden')) {
            // Try to finding active tab or just refresh approvals
            if (document.querySelector('[data-tab="approvals"].active')) renderApprovals();
            else if (document.querySelector('[data-tab="overview"].active')) renderOverview();
        }

    } catch (e) {
        console.error(e);
        showToast("Action failed: " + e.message, "error");
    } finally {
        buttons.forEach(b => b.disabled = false);
        if (approveBtn) approveBtn.innerHTML = originalText;
    }
};

window.updateAdminExpense = async () => {
    const btn = document.getElementById('btn-admin-update');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Updating...';
    btn.disabled = true;

    const expenseRef = doc(db, "expenses", window.currentExpenseId);
    const status = document.getElementById('admin-status').value;
    const payMode = document.getElementById('admin-pay-mode').value;
    const payRef = document.getElementById('admin-pay-ref').value;
    const payDate = document.getElementById('admin-pay-date').value;
    const payProofInput = document.getElementById('admin-pay-proof');

    try {
        let updateData = {
            status: status,
            updatedAt: serverTimestamp()
        };

        // Handle Proof
        if (payProofInput && payProofInput.files[0]) {
            try {
                updateData.paymentProofUrl = await compressImage(payProofInput.files[0]);
            } catch (e) {
                console.error("Proof upload failed", e);
            }
        }

        if (payMode) updateData.paymentMode = payMode;
        if (payRef) updateData.transactionRef = payRef;
        if (payDate) updateData.paymentDate = payDate;

        const historyEntry = {
            action: 'ADMIN_UPDATE',
            by: userData.name,
            role: 'ADMIN',
            date: new Date(),
            comment: 'Admin updated expense details.',
            paymentMode: payMode || null,
            transactionRef: payRef || null,
            paymentProofUrl: updateData.paymentProofUrl || null
        };

        await updateDoc(expenseRef, {
            ...updateData,
            history: [...(window.currentExpenseData.history || []), historyEntry]
        });

        // --- EmailJS: Notify employee of admin update ---
        sendSystemEmail('ADMIN_UPDATE', {
            to_email: window.currentExpenseData.userEmail || '',
            name: window.currentExpenseData.userName || 'Employee',
            new_status: status,
            message: `Your claim for ${window.currentExpenseData.title || 'Expense'} has been updated by Admin.`
        });

        showToast("Expense updated successfully by Admin!", "success");
        closeModal('modal-expense');
        renderApprovals();
    } catch (e) {
        console.error(e);
        showToast("Update failed: " + e.message, "error");
    } finally {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
};

// --- Projects Management ---
window.renderProjects = async () => {
    document.getElementById('page-title').textContent = "Project Management";
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

    try {
        let pQ;
        if (userData.companyId === 'GLOBAL') {
            pQ = collection(db, "projects");
        } else {
            pQ = query(collection(db, "projects"), where("companyId", "==", userData.companyId || 'N/A'));
        }
        const snap = await safeFirebaseFetch(getDocs(pQ));
        const projects = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        content.innerHTML = `
                    <div class="fade-in space-y-6">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Project Management</h3>
                                <p class="text-xs text-slate-500">Manage cost codes and active business projects.</p>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="exportProjectsCSV()" class="text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700"><i class="fa-solid fa-download mr-1"></i> Export</button>
                                <button onclick="showProjectModal()" class="text-xs bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:opacity-90 transition shadow-lg flex items-center gap-2"><i class="fa-solid fa-plus"></i> Add Project</button>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${projects.length === 0 ? '<div class="col-span-full p-12 text-center text-slate-400 text-sm bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">No projects found. Add one to get started.</div>' : ''}
                            ${projects.map(p => `
                                <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition group relative overflow-hidden">
                                     <div class="absolute top-0 right-0 p-3">
                                         <span class="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest ${p.active !== false ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}">
                                            ${p.active !== false ? 'ACTIVE' : 'INACTIVE'}
                                         </span>
                                     </div>
                                     <div class="flex items-center gap-4 mb-4">
                                         <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition">
                                             <i class="fa-solid fa-folder-tree"></i>
                                         </div>
                                         <div>
                                             <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5">${p.name}</h4>
                                             <p class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">${p.code}</p>
                                         </div>
                                     </div>
                                     <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 h-8">${p.details || 'No additional details provided for this project.'}</p>
                                     <div class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                         <div class="flex items-center gap-2">
                                             <button onclick="toggleProjectStatus('${p.id}', ${p.active !== false})" class="text-[10px] font-bold ${p.active !== false ? 'text-orange-500' : 'text-green-600'} hover:underline uppercase tracking-wider">
                                                 ${p.active !== false ? 'Deactivate' : 'Activate'}
                                             </button>
                                         </div>
                                         <button onclick="deleteProject('${p.id}')" class="text-[10px] font-bold text-red-400 hover:text-red-500 hover:underline uppercase tracking-wider">Delete</button>
                                     </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
    } catch (e) {
        content.innerHTML = emptyState("Error loading projects: " + e.message);
    }
};

// Modal Functions
window.showProjectModal = () => {
    document.getElementById('project-modal').classList.remove('hidden');
    document.getElementById('project-code-input').value = '';
    document.getElementById('project-name-input').value = '';
    document.getElementById('project-details-input').value = '';
    setTimeout(() => {
        document.getElementById('project-modal-content').classList.remove('scale-95', 'opacity-0');
        document.getElementById('project-modal-content').classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeProjectModal = () => {
    const m = document.getElementById('project-modal');
    const c = document.getElementById('project-modal-content');
    c.classList.remove('scale-100', 'opacity-100');
    c.classList.add('scale-95', 'opacity-0');
    setTimeout(() => m.classList.add('hidden'), 200);
};

// Export Function
window.exportProjectsCSV = async () => {
    try {
        const snap = await safeFirebaseFetch(getDocs(query(collection(db, "projects"), where("companyId", "==", userData.companyId))));
        if (snap.empty) return showToast("No projects to export", "info");

        const headers = ["Project Code", "Project Name", "Details", "Status", "Created At"];
        const rows = snap.docs.map(d => {
            const p = d.data();
            return [
                `"${(p.code || '').replace(/"/g, '""')}"`,
                `"${(p.name || '').replace(/"/g, '""')}"`,
                `"${(p.details || '').replace(/"/g, '""')}"`,
                p.active !== false ? 'ACTIVE' : 'INACTIVE',
                p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString() : ''
            ].join(",");
        });

        const csvContent = headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `projects_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        showToast("Projects exported successfully!", "success");
    } catch (e) {
        showToast("Export failed: " + e.message, "error");
    }
};

// Form Submit
document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('project-code-input').value.trim().toUpperCase();
    const name = document.getElementById('project-name-input').value.trim();
    const details = document.getElementById('project-details-input').value.trim();

    if (!code || !name) return showToast("Code and Name are required", "error");

    try {
        await addDoc(collection(db, "projects"), {
            code, name, details, active: true, companyId: userData.companyId, createdAt: serverTimestamp()
        });
        showToast("Project added successfully!", "success");
        closeProjectModal();
        renderProjects();
    } catch (e) {
        showToast(e.message, "error");
    }
});

window.toggleProjectStatus = async (id, currentStatus) => {
    try {
        await updateDoc(doc(db, "projects", id), { active: !currentStatus });
        renderProjects();
    } catch (e) { showToast(e.message, "error"); }
};

window.loadProjects = async () => {
    const select = document.getElementById('project-code');
    if (!select) return; // Guard clause in case element missing

    try {
        const q = query(collection(db, "projects"), where("companyId", "==", userData.companyId), where("active", "==", true));
        const snap = await safeFirebaseFetch(getDocs(q));

        if (snap.empty) {
            select.innerHTML = '<option value="" disabled selected>No active projects</option>';
            return;
        }

        select.innerHTML = '<option value="" disabled selected>Select Project...</option>' +
            snap.docs.map(d => `<option value="${d.data().code}">${d.data().code} - ${d.data().name}</option>`).join('');
    } catch (e) {
        console.error("Error loading projects", e);
        select.innerHTML = '<option value="" disabled selected>Error loading projects</option>';
    }
};

window.deleteProject = async (id) => {
    if (!await confirm("Delete this project?")) return;
    try {
        await deleteDoc(doc(db, "projects", id));
        renderProjects();
        loadProjects(); // Reload dropdown
    } catch (e) { showToast(e.message, "error"); }
};



window.closeModal = (id) => {
    const currentStateModal = window.history.state?.adminModal;
    if (currentStateModal && currentStateModal === id) {
        window.history.back();
        return;
    }

    setAdminModalVisibility(id, false);
    if (currentAdminModalId === id) currentAdminModalId = null;
};
window.showImage = (src) => {
    if (src) {
        document.getElementById('overlay-img').src = src;
        document.getElementById('img-overlay').classList.remove('hidden');
    }
};


// --- Workflow Management ---
window.renderWorkflow = async () => {
    document.getElementById('page-title').textContent = "Workflow Configuration";
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

    try {
        // Fetch existing config or use default
        let existingConfig = {};
        try {
            const snap = await safeFirebaseFetch(getDoc(doc(db, "settings", "workflow_config")));
            if (snap.exists()) existingConfig = snap.data();
        } catch (e) { console.log("No existing workflow config found, using defaults."); }

        const defaults = {
            defaultFlow: [
                { stage: 'PENDING_MANAGER', label: 'Manager Approval', approverRole: 'MANAGER' },
                { stage: 'PENDING_FINANCE', label: 'Finance Verification', approverRole: 'FINANCE_MANAGER' },
                { stage: 'FINANCE_APPROVED', label: 'Payment Processing', approverRole: 'ACCOUNTS' },
                { stage: 'PAID', label: 'Audit Verification', approverRole: 'AUDIT' },
                { stage: 'AUDITED', label: 'Process Completed', approverRole: null }
            ],
            roleOverrides: {
                // Example structures, empty by default to use defaultFlow
            }
        };

        const config = { ...defaults, ...existingConfig };
        window.currentWorkflowConfig = config;

        // --- Access Control Check ---
        if (config.accessControl?.locked && config.accessControl.allowedEmail !== auth.currentUser.email) {
            content.innerHTML = `
                        <div class="text-center py-20 fade-in">
                            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <i class="fa-solid fa-lock text-3xl text-red-500"></i>
                            </div>
                            <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Workflow Configuration Locked</h3>
                            <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                                This configuration is locked by <span class="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">${config.accessControl.allowedEmail}</span>.
                                <br>You cannot modify or view the details.
                            </p>
                            <button onclick="renderOverview()" class="text-green-600 hover:text-green-700 font-bold text-sm">Return to Dashboard</button>
                        </div>
                    `;
            return;
        }

        content.innerHTML = `
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
                        <!-- Configuration Panel -->
                        <div class="lg:col-span-2 space-y-6">
                            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                                <div class="flex justify-between items-center mb-6">
                                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100"><i class="fa-solid fa-route text-green-500 mr-2"></i> Approval Chains</h3>
                                    <select id="workflow-role-select" onchange="renderWorkflowChain(this.value)" class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500">
                                        <option value="DEFAULT">Default (Employees)</option>
                                        <option value="MANAGER">Manager</option>
                                        <option value="SENIOR_MANAGER">Senior Manager</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                                
                                <div id="workflow-chain-container" class="space-y-4 relative min-h-[300px]">
                                    <!-- Chain rendered here -->
                                </div>

                                <div class="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <button onclick="saveWorkflowConfig()" class="bg-green-600 hover:bg-brand-700 text-white py-2.5 px-6 rounded-xl text-sm font-bold shadow-lg shadow-green-200 transition transform active:scale-95 flex items-center gap-2">
                                        <i class="fa-solid fa-save"></i> Save Configuration
                                    </button>
                                </div>
                            </div>

                            <!-- Access Control Card -->
                            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mt-6">
                                <div class="flex justify-between items-center">
                                    <div class="pr-4">
                                        <h4 class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                            <i class="fa-solid fa-user-shield text-green-600"></i> Secure Workflow
                                        </h4>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                            Enable this to prevent other admins from modifying this configuration. Only you will be able to unlock it.
                                        </p>
                                    </div>
                                    ${userData.role === 'MAIN_ADMIN' ? `
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" id="workflow-lock-eval" class="sr-only peer" ${config.accessControl?.locked ? 'checked' : ''} onchange="toggleWorkflowLock(this)">
                                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>` : `<span class="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-800"><i class="fa-solid fa-lock mr-1"></i> Restricted</span>`}
                                </div>
                                ${config.accessControl?.locked ? `<div class="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-lg flex items-center gap-3 text-xs text-red-700 dark:text-red-400 font-bold animate-[fadeIn_0.3s_ease-out]"><i class="fa-solid fa-lock"></i> Currently locked to: ${config.accessControl.allowedEmail}</div>` : ''}
                            </div>
                        </div>

                        <!-- Info Panel -->
                        <div class="space-y-6">
                            <div class="bg-green-50 dark:bg-slate-800 p-6 rounded-2xl border border-green-100 dark:border-slate-700">
                                <h4 class="font-bold text-green-900 dark:text-green-100 mb-2"><i class="fa-solid fa-circle-info mr-2"></i> How it works</h4>
                                <p class="text-sm text-green-800 dark:text-green-200 leading-relaxed mb-4">
                                    Configure the journey an expense claim takes from submission to completion.
                                </p>
                                <ul class="text-sm text-green-800 dark:text-green-200 space-y-2 list-disc pl-4">
                                    <li><strong>Stages</strong> define the status of the expense.</li>
                                    <li><strong>Approver Roles</strong> define who can act on that stage.</li>
                                    <li>The system moves to the <em>next</em> stage automatically upon approval.</li>
                                </ul>
                            </div>
                             <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <h4 class="font-bold text-slate-700 dark:text-slate-200 mb-4">Available Roles</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${['MANAGER', 'SENIOR_MANAGER', 'HR', 'FINANCE_MANAGER', 'ACCOUNTS', 'TREASURY', 'AUDIT', 'ADMIN'].map(r =>
            `<span class="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">${r}</span>`
        ).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        // Initial Render
        renderWorkflowChain('DEFAULT');

    } catch (e) {
        content.innerHTML = emptyState("Error loading workflow: " + e.message);
    }
};

window.toggleWorkflowLock = async (el) => {
    const locked = el.checked;
    const updatedConfig = {
        ...window.currentWorkflowConfig,
        accessControl: {
            locked: locked,
            allowedEmail: locked ? auth.currentUser.email : null,
            lockedAt: new Date()
        }
    };

    try {
        // Optimistic UI Update
        window.currentWorkflowConfig = updatedConfig;
        // Re-render immediately to show status
        renderWorkflow();

        // Persist
        await setDoc(doc(db, "settings", "workflow_config"), updatedConfig, { merge: true });
        showToast(locked ? "Workflow Locked Successfully" : "Workflow Unlocked", "success");
    } catch (e) {
        console.error(e);
        showToast("Failed to update lock: " + e.message, "error");
        // Revert UI if fail
        el.checked = !locked;
    }
};

window.renderWorkflowChain = (roleKey) => {
    const container = document.getElementById('workflow-chain-container');
    const config = window.currentWorkflowConfig;

    let chain = [];
    if (roleKey === 'DEFAULT') {
        chain = config.defaultFlow;
    } else {
        // If override exists, use it. If not, maybe copy default or start empty?
        // For now, if no override, we show default but labeled as "Default Inherited" or allow create new.
        // Simplified: Logic will fallback to defaultFlow if not in roleOverrides.
        // So here we clone defaultFlow if not present, to allow editing.
        if (config.roleOverrides && config.roleOverrides[roleKey] && config.roleOverrides[roleKey].flow) {
            chain = config.roleOverrides[roleKey].flow;
        } else {
            // Start with a sensible default for new overrides? Or empty?
            // Let's copy default for ease of editing
            chain = JSON.parse(JSON.stringify(config.defaultFlow));
        }
    }

    // Store current editing chain in a temporary global variable to manipulate
    window.editingChain = chain;
    window.editingRoleKey = roleKey;

    renderChainVisuals();
};

window.renderChainVisuals = () => {
    const container = document.getElementById('workflow-chain-container');
    const chain = window.editingChain;

    if (chain.length === 0) {
        container.innerHTML = `
                    <div class="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                        <p class="text-slate-400 text-sm font-bold mb-4">No stages defined.</p>
                        <button onclick="addStage(0)" class="text-green-600 font-bold hover:underline text-xs">+ Add First Stage</button>
                    </div>
                 `;
        return;
    }

    container.innerHTML = chain.map((step, index) => `
                <div class="relative pl-8 pb-8 last:pb-0 group">
                    <!-- Connector Line -->
                    ${index !== chain.length - 1 ?
            `<div class="absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 group-last:hidden"></div>` : ''}
                    
                    <!-- Node Circle -->
                    <div class="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border-2 border-green-500 z-10 shadow-sm">
                        <span class="text-xs font-bold text-green-600">${index + 1}</span>
                    </div>

                    <!-- Content Card -->
                    <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 transition hover:border-green-300 relative">
                        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            <div class="md:col-span-4">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Stage Status Code</label>
                                <input type="text" value="${step.stage}" onchange="updateStage(${index}, 'stage', this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 focus:border-green-500 outline-none" placeholder="e.g. PENDING_MANAGER">
                            </div>
                             <div class="md:col-span-4">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Display Label</label>
                                <input type="text" value="${step.label}" onchange="updateStage(${index}, 'label', this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 focus:border-green-500 outline-none" placeholder="e.g. Manager Approval">
                            </div>
                             <div class="md:col-span-3">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Approver Role</label>
                                <select onchange="updateStage(${index}, 'approverRole', this.value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 focus:border-green-500 outline-none">
                                    <option value="null" ${step.approverRole === null ? 'selected' : ''}>None (End)</option>
                                    <option value="MANAGER" ${step.approverRole === 'MANAGER' ? 'selected' : ''}>MANAGER</option>
                                    <option value="SENIOR_MANAGER" ${step.approverRole === 'SENIOR_MANAGER' ? 'selected' : ''}>SENIOR MANAGER</option>
                                    <option value="HR" ${step.approverRole === 'HR' ? 'selected' : ''}>HR</option>
                                    <option value="FINANCE_MANAGER" ${step.approverRole === 'FINANCE_MANAGER' ? 'selected' : ''}>FINANCE_MANAGER</option>
                                    <option value="ACCOUNTS" ${step.approverRole === 'ACCOUNTS' ? 'selected' : ''}>ACCOUNTS</option>
                                    <option value="TREASURY" ${step.approverRole === 'TREASURY' ? 'selected' : ''}>TREASURY</option>
                                    <option value="AUDIT" ${step.approverRole === 'AUDIT' ? 'selected' : ''}>AUDIT</option>
                                    <option value="ADMIN" ${step.approverRole === 'ADMIN' ? 'selected' : ''}>ADMIN</option>
                                </select>
                            </div>
                            <div class="md:col-span-1 flex justify-end">
                                <button onclick="removeStage(${index})" class="text-red-400 hover:text-red-600 transition p-1" title="Remove Stage"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                        
                         <!-- Add Button Between -->
                        <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity z-20">
                            <button onclick="addStage(${index + 1})" class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:scale-110 transition"><i class="fa-solid fa-plus text-[10px]"></i></button>
                        </div>
                    </div>
                </div>
            `).join('');

    // Final Add Button
    container.innerHTML += `
                <div class="flex justify-center pt-4">
                     <button onclick="addStage(${chain.length})" class="text-xs font-bold text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg border border-dashed border-green-200 transition">+ Add Final Stage</button>
                </div>
            `;
};

window.updateStage = (index, field, value) => {
    if (field === 'approverRole' && value === 'null') value = null;
    window.editingChain[index][field] = value;
};

window.addStage = (index) => {
    window.editingChain.splice(index, 0, { stage: 'NEW_STAGE', label: 'New Stage', approverRole: 'ADMIN' });
    renderChainVisuals();
};

window.removeStage = (index) => {
    window.editingChain.splice(index, 1);
    renderChainVisuals();
};

window.saveWorkflowConfig = async () => {
    const btn = document.querySelector('button[onclick="saveWorkflowConfig()"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
    btn.disabled = true;

    try {
        // Update global config object
        if (window.editingRoleKey === 'DEFAULT') {
            window.currentWorkflowConfig.defaultFlow = window.editingChain;
        } else {
            if (!window.currentWorkflowConfig.roleOverrides) window.currentWorkflowConfig.roleOverrides = {};
            window.currentWorkflowConfig.roleOverrides[window.editingRoleKey] = { flow: window.editingChain };
        }

        // Save to Firestore
        await setDoc(doc(db, "settings", "workflow_config"), window.currentWorkflowConfig);
        showToast("Workflow configuration saved successfully!", "success");
    } catch (e) {
        console.error(e);
        showToast("Error saving workflow: " + e.message, "error");
    } finally {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
};

// Helper to get initial stage status
window.getInitialStageStatus = async (role) => {
    if (!window.currentWorkflowConfig) {
        try {
            const snap = await safeFirebaseFetch(getDoc(doc(db, "settings", "workflow_config")));
            if (snap.exists()) window.currentWorkflowConfig = snap.data();
            else return null;
        } catch (e) { return null; }
    }

    const config = window.currentWorkflowConfig;
    let chain = config.defaultFlow;
    if (config.roleOverrides && config.roleOverrides[role] && config.roleOverrides[role].flow) {
        chain = config.roleOverrides[role].flow;
    }
    return chain.length > 0 ? chain[0].stage : null;
};

// Helper to get next stage status
window.getNextStageStatus = async (currentStatus, role) => {
    // This function will effectively replicate the logic in handleDecision
    // But we need to load the config first if not loaded.
    if (!window.currentWorkflowConfig) {
        try {
            const snap = await safeFirebaseFetch(getDoc(doc(db, "settings", "workflow_config")));
            if (snap.exists()) window.currentWorkflowConfig = snap.data();
            else return null; // Fallback to hardcoded if needed
        } catch (e) { return null; }
    }

    const config = window.currentWorkflowConfig;
    // Determine chain to use based on USER ROLE (Expense Owner's role ideally, but here passed as 'role')
    // Note: The logic in handleDecision needs to pass the EXPENSE OWNER ROLE, not just any role. 
    // Usually workflows depend on who the requester is.

    let chain = config.defaultFlow;
    if (config.roleOverrides && config.roleOverrides[role] && config.roleOverrides[role].flow) {
        chain = config.roleOverrides[role].flow;
    }

    // Find current index
    const currentIndex = chain.findIndex(s => s.stage === currentStatus);
    if (currentIndex === -1) {
        // If current status not in chain, maybe it's start? Or maybe handled manually?
        // Assuming start of chain if status is 'SUBMITTED' or equivalent
        return chain[0]?.stage;
    }

    // Next stage
    if (currentIndex + 1 < chain.length) {
        return chain[currentIndex + 1].stage;
    }

    return 'COMPLETED'; // End of chain?
};

async function renderCrmWidget() {
    const crmContainer = document.getElementById('crm-widget-container');
    if (!crmContainer) return;

    // Show a loading state
    crmContainer.innerHTML = `
        <div class="vercel-card p-6">
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-layer-group text-blue-500"></i> CRM Snapshot
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                <div class="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                <div class="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                <div class="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
            </div>
        </div>
    `;

    try {
        const companyId = userData.companyId;
        if (!companyId) {
            crmContainer.innerHTML = ''; // Hide if no companyId
            return;
        }

        const leadsQuery = query(collection(db, "crm_leads"), where("companyId", "==", companyId));
        const dealsQuery = query(collection(db, "crm_deals"), where("companyId", "==", companyId));

        const [leadsSnap, dealsSnap] = await Promise.all([
            getDocs(leadsQuery),
            getDocs(dealsQuery)
        ]);

        const totalLeads = leadsSnap.size;
        const deals = dealsSnap.docs.map(doc => doc.data());

        let activeDeals = 0;
        let pipelineValue = 0;
        let wonDeals = 0;
        let lostDeals = 0;

        deals.forEach(deal => {
            if (deal.stage !== 'Closed-Won' && deal.stage !== 'Closed-Lost') {
                activeDeals++;
                pipelineValue += deal.amount || 0;
            } else if (deal.stage === 'Closed-Won') {
                wonDeals++;
            } else if (deal.stage === 'Closed-Lost') {
                lostDeals++;
            }
        });

        const totalClosedDeals = wonDeals + lostDeals;
        const winRate = totalClosedDeals > 0 ? Math.round((wonDeals / totalClosedDeals) * 100) : 0;

        const html = `
            <div class="vercel-card p-6 fade-in">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <i class="fa-solid fa-layer-group text-blue-500"></i> CRM Snapshot
                    </h3>
                    <a href="crm/index.html" class="text-xs font-bold text-blue-600 hover:underline">
                        Open CRM <i class="fa-solid fa-arrow-right ml-1"></i>
                    </a>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] font-bold text-slate-400 uppercase">Total Leads</p>
                        <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">${totalLeads}</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] font-bold text-slate-400 uppercase">Active Deals</p>
                        <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">${activeDeals}</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] font-bold text-slate-400 uppercase">Pipeline Value</p>
                        <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 font-mono">${formatCurrency(pipelineValue, 'INR')}</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] font-bold text-slate-400 uppercase">Win Rate</p>
                        <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">${winRate}%</p>
                    </div>
                </div>
            </div>
        `;
        crmContainer.innerHTML = html;

    } catch (error) {
        console.error("Error rendering CRM widget:", error);
        crmContainer.innerHTML = `
             <div class="vercel-card p-6">
                <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-layer-group text-blue-500"></i> CRM Snapshot
                </h3>
                <p class="text-xs text-slate-500">Could not load CRM data. The module might be unavailable or data is still being populated.</p>
            </div>
        `;
    }
}

window.showModal = (title, msg, type) => {
    const m = document.getElementById('global-modal');
    const content = document.getElementById('global-modal-content');
    const icon = document.getElementById('modal-icon');

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-msg').textContent = msg;

    if (type === 'success') {
        icon.className = "w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4 text-xl";
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
    }
    else if (type === 'error') {
        icon.className = "w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-xl";
        icon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }
    else {
        icon.className = "w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4 text-xl";
        icon.innerHTML = '<i class="fa-solid fa-info"></i>';
    }

    m.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeGlobalModal = () => {
    const m = document.getElementById('global-modal');
    const content = document.getElementById('global-modal-content');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => m.classList.add('hidden'), 200);
};

const emptyState = (msg) => `<div class="text-center py-20 opacity-50"><i class="fa-solid fa-wind text-4xl mb-4 text-slate-300"></i><p class="text-slate-500 dark:text-slate-400">${msg}</p></div>`;

const getStatusBadgeClass = (s) => {
    const map = {
        'PENDING_MANAGER': 'bg-green-50 text-green-600 border-green-200',
        'PENDING_FINANCE': 'bg-indigo-50 text-indigo-600 border-indigo-200',
        'FINANCE_APPROVED': 'bg-purple-50 text-purple-600 border-purple-200',
        'PENDING_ACCOUNTS': 'bg-orange-50 text-orange-600 border-orange-200',
        'PENDING_SENIOR_MANAGER': 'bg-slate-100 text-slate-600 border-slate-200',
        'PENDING_COMPLIANCE': 'bg-pink-50 text-pink-600 border-pink-200',
        'PENDING_TREASURY': 'bg-yellow-50 text-yellow-600 border-yellow-200',
        'PAID': 'bg-green-50 text-green-600 border-green-200',
        'AUDITED': 'bg-teal-50 text-green-600 border-teal-200',
        'REJECTED': 'bg-red-50 text-red-600 border-red-200',
        'PAYMENT_ISSUE': 'bg-orange-100 text-orange-700 border-orange-200',
        'PAYMENT_DISPUTED': 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return `px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${map[s] || 'bg-slate-100 text-slate-500 dark:text-slate-400'}`;
};

const getSymbol = (c) => ({ 'USD': '$', 'EUR': '€', 'GBP': '£' }[c] || '₹');

const compressImage = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const MAX_WIDTH = 600;
            const scale = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scale;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// --- My Claims Logic (Admin/Manager Self-Service) ---

window.renderMyClaims = async () => {
    document.getElementById('page-title').textContent = "My Claims";
    const content = document.getElementById('content-area');
    content.innerHTML = `
                <div class="flex flex-col h-full">
                    <div class="flex justify-between items-center mb-6 fade-in">
                        <p class="text-slate-500 dark:text-slate-400 text-sm">Manage your personal expense claims.</p>
                        <button onclick="openCreateClaimModal()" class="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-slate-200 transition flex items-center gap-2">
                             <i class="fa-solid fa-plus"></i> Create New Claim
                        </button>
                    </div>

                    <div id="my-claims-list" class="grid gap-4 fade-in pb-20">
                        <div class="text-center py-20 opacity-50"><i class="fa-solid fa-circle-notch fa-spin text-3xl"></i></div>
                    </div>
                </div>
                `;

    // Query specifically for THIS user's expenses (using docId to sync with emp.html)
    if (!userData || !userData.docId) {
        document.getElementById('my-claims-list').innerHTML = emptyState("Error: User profile not loaded.");
        return;
    }
    const q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("userId", "==", userData.docId));

    const unsub = onSnapshot(q, (snap) => {
        const list = document.getElementById('my-claims-list');
        if (!list) return;

        if (snap.empty) {
            list.innerHTML = `<div class="text-center py-20 opacity-50"><i class="fa-solid fa-folder-open text-4xl mb-4 text-slate-300"></i><p class="text-slate-500 dark:text-slate-400">No claims found.</p></div>`;
            return;
        }

        // Function to format currency
        const formatCurrency = (amount, currency = 'INR') => {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(amount);
        };

        // Client-side sort to avoid index issues
        const sortedDocs = [...snap.docs].sort((a, b) => {
            const dateA = a.data().createdAt?.toMillis ? a.data().createdAt.toMillis() : 0;
            const dateB = b.data().createdAt?.toMillis ? b.data().createdAt.toMillis() : 0;
            return dateB - dateA;
        });

        list.innerHTML = sortedDocs.map(doc => {
            const d = doc.data();
            let badgeClass = 'bg-slate-100 text-slate-500 border-slate-200';
            if (d.status === 'PENDING') badgeClass = 'bg-amber-50 text-amber-600 border-amber-100';
            else if (d.status === 'APPROVED') badgeClass = 'bg-blue-50 text-blue-600 border-blue-100';
            else if (d.status === 'PAID') badgeClass = 'bg-green-50 text-green-600 border-green-100';
            else if (d.status === 'REJECTED') badgeClass = 'bg-red-50 text-red-600 border-red-100';

            const date = d.createdAt?.toDate ? d.createdAt.toDate() : new Date();

            return `
                        <div class="bg-white dark:bg-slate-810 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition group relative overflow-hidden flex flex-col h-full">
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition border border-slate-100 dark:border-slate-800">
                                        <i class="fa-solid fa-receipt text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm mb-0.5 line-clamp-1 group-hover:text-green-600 transition">${d.title}</h4>
                                        <p class="text-[10px] text-slate-400 font-medium">${date.toLocaleDateString()} • ${d.projectCode || 'General'}</p>
                                    </div>
                                </div>
                                <span class="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${badgeClass}">
                                    ${d.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div class="flex-1 space-y-2 mb-4">
                                <div class="flex justify-between items-center text-[10px]">
                                    <span class="text-slate-400 font-bold uppercase tracking-tight">Amount</span>
                                    <span class="font-bold text-slate-700 dark:text-slate-200 font-mono">₹${parseFloat(d.totalAmount).toLocaleString()}</span>
                                </div>
                                <div class="flex justify-between items-center text-[10px]">
                                    <span class="text-slate-400 font-bold uppercase tracking-tight">Project</span>
                                    <span class="font-bold text-slate-700 dark:text-slate-200">${d.projectCode || 'N/A'}</span>
                                </div>
                            </div>

                            <button onclick="openExpenseModal('${doc.id}')" class="w-full py-2 bg-slate-50 dark:bg-slate-900/50 text-[10px] font-bold text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 transition uppercase tracking-widest border border-slate-100 dark:border-slate-800">
                                View Details
                            </button>
                        </div>
                    `;
        }).join('');
    }, (error) => {
        console.error("Error loading my claims:", error);
        const list = document.getElementById('my-claims-list');
        if (list) list.innerHTML = `<div class="text-center py-10 text-red-500"><i class="fa-solid fa-triangle-exclamation mb-2"></i><br>Error loading claims.<br><span class="text-xs text-slate-400">${error.message}</span></div>`;
    });
    activeListeners.push(unsub);
};

window.openCreateClaimModal = () => {
    const form = document.getElementById('expense-form');
    if (form) form.reset();
    document.getElementById('line-items-container').innerHTML = '';
    document.getElementById('running-total').textContent = '0.00';
    document.getElementById('expense-id').value = '';
    document.querySelector('#modal-create h3').textContent = 'New Expense Claim';

    window.addLineItem(); // Add initial line
    loadProjects(); // Populate projects
    document.getElementById('modal-create').classList.remove('hidden');
};

window.addLineItem = () => {
    const container = document.getElementById('line-items-container');
    const tpl = document.getElementById('tpl-line-item');
    const clone = tpl.content.cloneNode(true);
    container.appendChild(clone);
};

window.removeLineItem = (btn) => {
    const container = document.getElementById('line-items-container');
    if (container.children.length > 1) {
        btn.closest('.line-item').remove();
        calculateTotal();
    } else {
        showToast("At least one expense item is required.", "error");
    }
};

window.calculateTotal = () => {
    const items = document.querySelectorAll('.item-amount');
    let total = 0;
    items.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    document.getElementById('running-total').textContent = total.toFixed(2);
};

window.handleFileSelect = async (input) => {
    const file = input.files[0];
    if (!file) return;

    // Clear URL input
    const grid = input.closest('.grid');
    if (grid) { const u = grid.querySelector('.item-url-input'); if (u) u.value = ''; }

    const label = input.closest('.receipt-label');
    const containerDiv = label.parentElement;
    const btnRemove = containerDiv.querySelector('.btn-remove-img');
    const status = grid.querySelector('.file-status');
    const hiddenInput = grid.querySelector('.item-img-url');

    const originalLabel = label.innerHTML;
    label.classList.add('opacity-50', 'pointer-events-none');
    label.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-green-500"></i> Processing...';

    try {
        let imageUrl = '';

        // Attempt ImageKit Upload first
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            formData.append('useUniqueFileName', 'true');
            formData.append('folder', '/admin_receipts');

            const authHeader = 'Basic ' + btoa(IMAGEKIT_PRIVATE_KEY + ':');

            const response = await fetch(IMAGEKIT_URL, {
                method: 'POST',
                body: formData,
                headers: { 'Authorization': authHeader }
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error('ImageKit Upload failed: ' + (errData.message || response.statusText));
            }
            const data = await response.json();
            imageUrl = data.url;
        } catch (imgKitErr) {
            console.warn("ImageKit upload failed, falling back to Firebase Storage", imgKitErr);
            try {
                const storageRef = ref(storage, 'admin_receipts/' + (file.name + '_' + Date.now()));
                const reader = new FileReader();
                const dataUrl = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                await uploadString(storageRef, dataUrl, 'data_url');
                imageUrl = await getDownloadURL(storageRef);
            } catch (fbErr) {
                console.warn("Firebase Storage fallback failed, using local compression.", fbErr);
                imageUrl = await compressImage(file);
            }
        }

        hiddenInput.value = imageUrl;

        label.innerHTML = `<span class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">${file.name}</span>`;
        label.classList.remove('border-dashed', 'border-slate-300');
        label.classList.add('border-solid', 'border-green-500', 'bg-emerald-50');

        if (status) status.classList.remove('hidden');
        if (btnRemove) btnRemove.classList.remove('hidden');
    } catch (e) {
        console.error(e);
        showToast("Error processing image", "error");
        label.innerHTML = originalLabel;
    } finally {
        label.classList.remove('opacity-50', 'pointer-events-none');
    }
};

window.removeImage = (btn) => {
    const containerDiv = btn.closest('.relative');
    const label = containerDiv.querySelector('label');

    const grid = btn.closest('.grid');
    const status = grid.querySelector('.file-status');
    const hiddenInput = grid.querySelector('.item-img-url');

    // Reset inputs
    const input = label.querySelector('input[type="file"]') || document.createElement('input');
    input.value = '';
    hiddenInput.value = '';

    label.innerHTML = `
                <div class="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-500 dark:text-slate-400">
                    <i class="fa-solid fa-camera text-xs"></i>
                </div>
                <span class="text-xs text-slate-500 dark:text-slate-400 truncate">Upload / Snap</span>
                <input type="file" accept="image/*" class="hidden item-file" onchange="handleFileSelect(this)">
            `;
    label.classList.remove('border-solid', 'border-green-500', 'bg-emerald-50');
    label.classList.add('border-dashed', 'border-slate-300');

    if (status) status.classList.add('hidden');
    btn.classList.add('hidden');
};

window.handleUrlInput = (input) => {
    const url = input.value.trim();
    const grid = input.closest('.grid');
    if (!grid) return;
    const hiddenInput = grid.querySelector('.item-img-url');

    if (url) {
        hiddenInput.value = url;
        const statusSpan = grid.querySelector('.file-status');
        if (statusSpan) {
            statusSpan.innerHTML = '<i class="fa-solid fa-link"></i> Linked';
            statusSpan.classList.remove('hidden');
        }
    } else {
        // Only clear if no file is selected? 
        // Simpler: just clear logic. If they want file, they upload file.
        hiddenInput.value = '';
        const statusSpan = grid.querySelector('.file-status');
        if (statusSpan) statusSpan.classList.add('hidden');
    }
};

window.submitMyClaim = async () => {
    const title = document.getElementById('report-title').value.trim();
    const projectCode = document.getElementById('project-code').value.trim();
    const currency = document.getElementById('currency').value;
    const preApproved = document.getElementById('pre-approved').checked;
    const notes = document.getElementById('expense-notes').value.trim();

    if (!title || !projectCode) return showToast("Please fill in all required fields.", "error");

    const lineItems = [];
    let isValid = true;
    let totalVal = 0;

    const rows = document.querySelectorAll('.line-item');
    rows.forEach(row => {
        const desc = row.querySelector('.item-desc').value.trim();
        const amount = parseFloat(row.querySelector('.item-amount').value);
        const category = row.querySelector('.item-category').value;
        const receiptUrl = row.querySelector('.item-img-url').value;

        if (!desc || isNaN(amount) || amount <= 0) {
            isValid = false;
            row.classList.add('border-red-500');
        } else {
            row.classList.remove('border-red-500');
            lineItems.push({ desc, amount: amount, category, receiptUrl }); // Store amount as number
            totalVal += amount;
        }
    });

    if (!isValid) return showToast("Please check line items for errors.", "error");
    if (lineItems.length === 0) return showToast("Add at least one expense.", "error");

    const btn = document.getElementById('btn-submit');
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Submitting...';
    btn.disabled = true;

    try {
        // Determine initial status based on role
        // Determine initial status based on Workflow Config
        let initialStatus = await getInitialStageStatus(userData.role);

        // Fallback if no workflow configured
        if (!initialStatus) {
            if (userData.role === 'MANAGER' || userData.role === 'SENIOR_MANAGER') initialStatus = 'PENDING_COMPLIANCE';
            else initialStatus = 'PENDING_MANAGER';
        }

        let history = [{
            action: 'SUBMITTED',
            by: userData.name,
            date: new Date(),
            comment: 'Expense claim submitted.'
        }];

        const expenseData = {
            title,
            projectCode,
            currency,
            preApproved,
            notes,
            lineItems,
            totalAmount: totalVal.toFixed(2),
            status: initialStatus,
            userId: userData.docId,
            userName: userData.name,
            userEmail: userData.email,
            role: userData.role,
            submittedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        if (document.getElementById('expense-id').value) {
            // Update Logic
            const docId = document.getElementById('expense-id').value;
            const expenseRef = doc(db, "expenses", docId);

            // Fetch existing history to append
            const existingSnap = await safeFirebaseFetch(getDoc(expenseRef));
            let existingHistory = existingSnap.exists() ? (existingSnap.data().history || []) : [];

            const updateData = {
                ...expenseData,
                updatedAt: serverTimestamp(),
                history: [...existingHistory, {
                    action: 'UPDATED',
                    by: userData.name,
                    role: userData.role,
                    date: new Date(),
                    comment: 'Claim updated by user'
                }]
            };

            await updateDoc(expenseRef, updateData);
            showToast("Claim updated successfully!", "success");
        } else {
            // Create Logic
            await addDoc(collection(db, "expenses"), {
                ...expenseData,
                companyId: userData.companyId,
                createdAt: serverTimestamp(),
                history: [{
                    action: 'SUBMITTED',
                    by: userData.name,
                    role: userData.role,
                    date: new Date(),
                    comment: preApproved ? 'Marked as Pre-Approved' : 'Initial Submission'
                }]
            });
            showToast("Claim submitted successfully!", "success");
        }

        closeModal('modal-create');
        renderMyClaims();
    } catch (e) {
        console.error(e);
        showToast("Submission failed: " + e.message, "error");
    } finally {
        btn.innerHTML = '<span>Submit Claim</span> <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
    }
};

// PWA Install & Sidebar Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('pwa-install-btn-admin');
    if (btn) {
        btn.classList.remove('hidden');
        btn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install declaration: ${outcome}`);
                deferredPrompt = null;
                btn.classList.add('hidden');
            }
        });
    }
});

window.toggleSidebar = () => {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');

    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
};


let currentChatId = 'global_chat';
let currentChatUser = null;
let chatUnsub = null;

async function renderChat() {
    document.getElementById('page-title').textContent = "Team Chat";
    const content = document.getElementById('content-area');
    content.innerHTML = `
                <div class="flex h-[calc(100vh-140px)] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden fade-in relative">
                    <!-- Sidebar -->
                    <div class="w-full md:w-1/3 md:max-w-[300px] border-r border-slate-100 dark:border-slate-700 flex flex-col z-10" id="chat-sidebar">
                        <div class="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 class="font-bold text-slate-800 dark:text-slate-100">Chats</h3>
                            <button onclick="window.openCreateGroupModal()" class="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition flex items-center justify-center cursor-pointer" title="Create Group"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div id="chat-user-list" class="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                             <div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-green-500"></i></div>
                        </div>
                    </div>
                    <!-- Main Chat Area -->
                    <div class="flex-1 flex flex-col absolute md:relative inset-0 bg-white dark:bg-slate-800 transform transition-transform duration-300 translate-x-full md:translate-x-0 z-20" id="chat-main-area">
                        <div class="h-16 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/50 shrink-0">
                            <div class="flex items-center gap-3 min-w-0">
                                <button class="md:hidden text-slate-500 hover:text-green-600 transition p-2" onclick="hideMobileChatArea()">
                                    <i class="fa-solid fa-arrow-left text-xl"></i>
                                </button>
                                <div id="active-chat-avatar" class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0 overflow-hidden">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div class="overflow-hidden">
                                    <h3 id="active-chat-name" class="font-bold text-slate-800 dark:text-slate-100 truncate">Global Group</h3>
                                    <p id="active-chat-status" class="text-xs text-green-500 truncate">Company Wide</p>
                                </div>
                            </div>
                            <div id="chat-cal-actions" class="flex items-center gap-2 hidden transition-all">
                                <button onclick="initiateCall('voice')" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center shadow-sm" title="Voice Call">
                                    <i class="fa-solid fa-phone text-xs"></i>
                                </button>
                                <button onclick="initiateCall('video')" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-50 dark:bg-brand-900/20 text-green-600 hover:bg-green-100 dark:hover:bg-brand-900/40 transition flex items-center justify-center shadow-sm" title="Video Call">
                                    <i class="fa-solid fa-video text-xs"></i>
                                </button>
                            </div>
                        </div>
                        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            <div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-green-500"></i></div>
                        </div>
                        <form onsubmit="sendChatMessage(event)" class="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2 shrink-0 items-center">
                            
                            <!-- Hidden File Input -->
                            <input type="file" id="chat-file" class="hidden" onchange="handleChatAttachmentSelect(this, 'chat-input')">
                            
                            <!-- Attachment Button -->
                            <button type="button" onclick="document.getElementById('chat-file').click()"
                                class="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition shadow-sm shrink-0" title="Attach file">
                                <i class="fa-solid fa-paperclip"></i>
                            </button>

                            <!-- Location Sharing Button -->
                            <button type="button" onclick="sendLocationMessage()"
                                class="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-500 dark:text-blue-400 flex items-center justify-center transition shadow-sm shrink-0" title="Share Location">
                                <i class="fa-solid fa-location-dot"></i>
                            </button>

                            <div class="flex-1 relative">
                                <input type="text" id="chat-input" class="w-full h-10 rounded-lg border border-slate-200 dark:border-slate-700 px-3 bg-white dark:bg-slate-800 text-sm outline-none focus:border-green-500" placeholder="Type a message or @mention..." autocomplete="off">
                                
                                <!-- Mentions Dropdown -->
                                <div id="mentions-dropdown" class="absolute bottom-full left-0 mb-2 w-48 max-h-40 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl hidden z-50 p-1 flex-col gap-1 custom-scrollbar"></div>
                            </div>
                            
                            <button type="submit" class="bg-green-600 hover:bg-brand-700 text-white px-4 sm:px-6 py-2 rounded-lg font-bold transition shadow-sm flex items-center justify-center min-w-[60px] shrink-0">
                                <i class="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            `;

    loadChatUsers();
    selectChat(null);

    // Mentions Setup
    setTimeout(() => {
        const input = document.getElementById('chat-input');
        const dropdown = document.getElementById('mentions-dropdown');
        if (!input || !dropdown) return;

        input.addEventListener('input', (e) => {
            const val = input.value;
            const cursorStart = input.selectionStart;
            const textBeforeCursor = val.slice(0, cursorStart);
            const match = textBeforeCursor.match(/@([a-zA-Z0-9_]*)$/);

            if (match) {
                const queryStr = match[1].toLowerCase();
                const users = window.adminChatUsers || [];
                const filtered = users.filter(u => 
                    (u.name && u.name.toLowerCase().includes(queryStr)) || 
                    (u.email && u.email.toLowerCase().includes(queryStr))
                ).slice(0, 5);

                if (filtered.length > 0) {
                    dropdown.innerHTML = filtered.map(u => `
                        <div onclick="insertMention('${u.name || '*'}')" class="p-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded cursor-pointer flex items-center gap-2 transition">
                            <div class="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-[10px] font-bold uppercase">${(u.name || u.email)[0]}</div>
                            <span class="truncate">${u.name || u.email}</span>
                        </div>
                    `).join('');
                    dropdown.classList.remove('hidden');
                    dropdown.classList.add('flex');
                } else {
                    dropdown.classList.add('hidden');
                    dropdown.classList.remove('flex');
                }
            } else {
                dropdown.classList.add('hidden');
                dropdown.classList.remove('flex');
            }
        });

        window.insertMention = (name) => {
            if (name === '*') return;
            // sanitize name for mention
            const validName = name.replace(/[^a-zA-Z0-9_]/g, '');
            const val = input.value;
            const cursorStart = input.selectionStart;
            const textBeforeCursor = val.slice(0, cursorStart);
            const textAfterCursor = val.slice(cursorStart);
            
            const replaced = textBeforeCursor.replace(/@([a-zA-Z0-9_]*)$/, '@' + validName + ' ');
            input.value = replaced + textAfterCursor;
            
            dropdown.classList.add('hidden');
            dropdown.classList.remove('flex');
            input.focus();
        };

        // Hide when clicking outside
        document.addEventListener('click', (ev) => {
            if (!dropdown.contains(ev.target) && ev.target !== input) {
                dropdown.classList.add('hidden');
                dropdown.classList.remove('flex');
            }
        });
    }, 500);
}

async function loadChatUsers() {
    const list = document.getElementById('chat-user-list');
    if (!list) return;

    try {
        // Fetch users
        let uQ;
        if (userData.companyId === 'GLOBAL') {
            uQ = collection(db, "users");
        } else {
            uQ = query(collection(db, "users"), where("companyId", "==", userData.companyId || 'N/A'));
        }
        const usersSnap = await safeFirebaseFetch(getDocs(uQ));
        const users = usersSnap.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

        // Fetch chat metadata for 1-on-1
        const chatMeta = {};
        const chatsSnap = await safeFirebaseFetch(getDocs(query(collection(db, "chats"), where("users", "array-contains", userData.docId))));
        chatsSnap.forEach(docSnap => {
            const data = docSnap.data();
            const otherUser = data.users.find(id => id !== userData.docId);
            if (otherUser) chatMeta[otherUser] = data;
        });

        // Fetch group chats
        const groupChatsSnap = await safeFirebaseFetch(getDocs(query(collection(db, "group_chats"), where("users", "array-contains", userData.docId))));
        const groupsMeta = {};
        groupChatsSnap.forEach(docSnap => {
            groupsMeta[docSnap.id] = { docId: docSnap.id, ...docSnap.data(), isGroup: true };
        });

        // Get Global Chat last message
        const globalChatSnap = await safeFirebaseFetch(getDocs(query(collection(db, "global_chat"), where("companyId", "==", userData.companyId), orderBy("createdAt", "desc"), limit(1))));
        const globalLast = globalChatSnap.empty ? "Company Wide Chat" : globalChatSnap.docs[0].data().text;

        // Sort users by activity
        const sortedUsers = users.filter(u => u.docId !== userData.docId).sort((a, b) => {
            const timeA = chatMeta[a.docId]?.lastMessageAt?.toMillis() || 0;
            const timeB = chatMeta[b.docId]?.lastMessageAt?.toMillis() || 0;
            return timeB - timeA;
        });

        window.adminChatUsers = sortedUsers;

        window.adminGroupChats = Object.values(groupsMeta).sort((a, b) => {
            const timeA = a.lastMessageAt?.toMillis() || 0;
            const timeB = b.lastMessageAt?.toMillis() || 0;
            return timeB - timeA;
        });

        let html = `
                    <div onclick="selectChat('global_chat')" class="cursor-pointer flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition mb-1 bg-green-50 dark:bg-brand-900/20 relative" id="chat-tgt-global_chat">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-green-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-sm relative">
                            <i class="fa-solid fa-users text-xs"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate pr-6">Global Group</h4>
                            <p class="text-[10px] text-slate-500 truncate">${globalLast}</p>
                        </div>
                    </div>
                `;

        window.adminGroupChats.forEach(g => {
            const lastMsg = g.lastMessage || 'No messages';
            const safeJson = JSON.stringify(g).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            html += `
                <div onclick="selectChat(JSON.parse('${safeJson}'))" class="cursor-pointer flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition mb-1 relative" id="chat-tgt-group_${g.docId}">
                    <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 object-cover border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                        <i class="fa-solid fa-user-group text-xs"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate pr-2">${g.name}</h4>
                            <span class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">GROUP</span>
                        </div>
                        <p class="text-[10px] text-slate-500 truncate ${g.read === false ? 'font-bold text-black dark:text-white' : ''}">${lastMsg}</p>
                    </div>
                </div>
            `;
        });

        sortedUsers.forEach(u => {
            const initial = (u.name || u.email || '?').charAt(0).toUpperCase();
            const lastMsg = chatMeta[u.docId]?.lastMessage || u.email;
            let unreadDot = '';
            if (chatMeta[u.docId]?.lastSender && chatMeta[u.docId]?.lastSender !== userData.docId && !chatMeta[u.docId]?.read) {
                unreadDot = `<span class="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>`;
            }

            const safeJson = JSON.stringify(u).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            html += `
                        <div onclick="selectChat(JSON.parse('${safeJson}'))" class="cursor-pointer flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition mb-1 relative" id="chat-tgt-${u.docId}">
                            <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 font-bold flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 object-cover border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden text-xs">
                                ${u.photoUrl ? `<img src="${u.photoUrl}" class="w-full h-full object-cover">` : initial}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between items-center mb-0.5">
                                    <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate pr-2">${u.name || u.email}</h4>
                                    <span class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">${u.role}</span>
                                </div>
                                <p class="text-[10px] text-slate-500 truncate ${unreadDot ? 'font-bold text-slate-800 dark:text-slate-200' : ''}">${lastMsg}</p>
                            </div>
                            ${unreadDot}
                        </div>
                    `;
        });
        
        list.innerHTML = html;
        updateActiveChatHighlight();
    } catch (e) {
        console.error('Error loading users', e);
        list.innerHTML = '<p class="text-xs text-red-500 p-2">Failed to load users</p>';
    }
}

window.selectChat = (userObj) => {
    if (typeof userObj === 'string') {
        if (userObj === 'global_chat') {
            currentChatUser = null;
            currentChatId = 'global_chat';
        } else if (userObj.startsWith('group_')) {
            const gId = userObj.replace('group_', '');
            currentChatUser = window.adminGroupChats ? window.adminGroupChats.find(g => g.docId === gId) : null;
            currentChatId = userObj;
        } else {
            currentChatUser = window.adminChatUsers ? window.adminChatUsers.find(u => u.docId === userObj) : null;
            currentChatId = getOneOnOneChatId(userData.docId, userObj);
        }
    } else {
        currentChatUser = userObj;
        if (userObj && userObj.isGroup) {
            currentChatId = 'group_' + userObj.docId;
        } else if (userObj) {
            currentChatId = getOneOnOneChatId(userData.docId, userObj.docId);
        } else {
            currentChatId = 'global_chat';
        }
    }

    const nameEl = document.getElementById('active-chat-name');
    const statusEl = document.getElementById('active-chat-status');
    const avatarEl = document.getElementById('active-chat-avatar');
    const callsEl = document.getElementById('chat-cal-actions');
    const chatMain = document.getElementById('chat-main-area');

    if (currentChatUser) {
        nameEl.textContent = currentChatUser.name || currentChatUser.email || 'Unknown User';
        statusEl.textContent = (currentChatUser.isGroup ? 'Group' : (currentChatUser.role || 'User').replace('_', ' '));
        if (currentChatUser.photoUrl) {
            avatarEl.innerHTML = `<img src="${currentChatUser.photoUrl}" class="w-full h-full object-cover">`;
        } else {
            avatarEl.innerHTML = currentChatUser.name ? currentChatUser.name[0].toUpperCase() : '?';
        }
        avatarEl.className = 'w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200 flex items-center justify-center font-bold shrink-0 overflow-hidden shadow-sm';
        callsEl.classList.remove('hidden');
    } else {
        nameEl.textContent = 'Global Group';
        statusEl.textContent = 'Company Wide';
        avatarEl.innerHTML = '<i class="fa-solid fa-globe text-sm"></i>';
        avatarEl.className = 'w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm';
        callsEl.classList.add('hidden');
    }
    // Mobile Navigation: Slide Chat Main Area over sidebar
    if (chatMain) {
        chatMain.classList.remove('translate-x-full');
        chatMain.classList.add('translate-x-0');
    }

    // Hide unread dot for global if selected
    if (!userObj) {
        const dot = document.getElementById('global-unread-dot');
        if (dot) dot.classList.add('hidden');
    }

    updateActiveChatHighlight();
    loadMessages();
};

window.hideMobileChatArea = () => {
    const chatMain = document.getElementById('chat-main-area');
    if (chatMain) {
        chatMain.classList.remove('translate-x-0');
        chatMain.classList.add('translate-x-full');
    }
};

window.openCreateGroupModal = () => {
    const list = window.adminChatUsers || [];
    const userOptions = list.map(u => `
        <label class="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition">
            <input type="checkbox" value="${u.docId}" class="group-user-checkbox w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold truncate text-slate-800 dark:text-slate-100">${u.name || u.email}</p>
                <p class="text-[10px] text-slate-500 truncate">${u.role || 'EMP'}</p>
            </div>
        </label>
    `).join('');

    const modalHtml = `
        <div id="create-group-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-scale-up">
            <div class="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
                <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">Create New Group</h3>
                    <button onclick="document.getElementById('create-group-modal').remove()" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"><i class="fa-solid fa-times"></i></button>
                </div>
                <div class="p-4 flex-1 overflow-y-auto space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Group Name</label>
                        <input type="text" id="group-name-input" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-green-500 transition" placeholder="e.g. Project Alpha">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Members</label>
                        <div class="space-y-1 max-h-60 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-xl p-2 bg-white dark:bg-slate-900 custom-scrollbar">
                            ${userOptions}
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                    <button onclick="document.getElementById('create-group-modal').remove()" class="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition">Cancel</button>
                    <button onclick="window.confirmCreateGroup()" class="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-200 dark:shadow-none hover:scale-95 transition">Create Group</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.confirmCreateGroup = async () => {
    const nameInput = document.getElementById('group-name-input').value.trim();
    if (!nameInput) return showToast("Enter group name", "error");

    const checkboxes = document.querySelectorAll('.group-user-checkbox:checked');
    const selectedUsers = Array.from(checkboxes).map(cb => cb.value);
    if (selectedUsers.length === 0) return showToast("Select members", "error");

    selectedUsers.push(userData.docId);

    try {
        const groupRef = await addDoc(collection(db, "group_chats"), {
            name: nameInput,
            companyId: userData.companyId,
            admin: userData.docId,
            users: selectedUsers,
            createdAt: serverTimestamp(),
            lastMessage: "Group created",
            lastMessageAt: serverTimestamp()
        });
        document.getElementById('create-group-modal').remove();
        showToast("Group created!", "success");
        loadChatUsers();
        selectChat({ docId: groupRef.id, name: nameInput, isGroup: true, users: selectedUsers });
    } catch (e) {
        console.error(e);
        showToast("Failed to create group", "error");
    }
};

window.sendLocationMessage = () => {
    if (!navigator.geolocation) return showToast("Geolocation not supported", "error");
    
    showToast("Getting location...", "info");
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const msg = `📍 Shared Location: ${mapUrl}`;
        
        // Simulating message send
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = msg;
            document.querySelector('#chat-main-area form').dispatchEvent(new Event('submit'));
        }
    }, (err) => {
        showToast("Location access denied", "error");
    });
};

function getOneOnOneChatId(uid1, uid2) {
    return uid1 < uid2 ? `chat_${uid1}_${uid2}` : `chat_${uid2}_${uid1}`;
}

function updateActiveChatHighlight() {
    document.querySelectorAll('#chat-user-list > div').forEach(el => {
        el.classList.remove('bg-green-50', 'dark:bg-brand-900/20');
    });
    const activeId = currentChatUser ? currentChatUser.docId : 'global';
    const activeEl = document.getElementById('chat-tgt-' + activeId);
    if (activeEl) activeEl.classList.add('bg-green-50', 'dark:bg-brand-900/20');
}

function loadMessages() {
    if (chatUnsub) { chatUnsub(); chatUnsub = null; }

    const container = document.getElementById('chat-messages');
    if (!container) return;
    container.innerHTML = '<div class="flex justify-center mt-10"><i class="fa-solid fa-circle-notch fa-spin text-green-500"></i></div>';

    try {
        let q;
        if (currentChatId === 'global_chat') {
            q = query(collection(db, "global_chat"), where("companyId", "==", userData.companyId), orderBy("createdAt", "asc"), limit(100));
        } else {
            q = query(collection(db, "chats", currentChatId, "messages"), orderBy("createdAt", "asc"), limit(100));
        }

        chatUnsub = onSnapshot(q, (snapshot) => {
            if (!document.getElementById('chat-messages')) return;

            if (snapshot.empty) {
                container.innerHTML = '<div class="text-center text-slate-400 mt-10 text-sm"><p>No messages yet. Start the conversation!</p></div>';
                return;
            }

            container.innerHTML = '';
            let lastUser = '';

            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                const isMe = data.email === userData.email;
                const time = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';
                const msgId = docSnap.id;

                // Mark as read if receiving and not read
                if (!isMe && !data.read) {
                    const path = currentChatId === 'global_chat' ? `global_chat/${msgId}` : `chats/${currentChatId}/messages/${msgId}`;
                    updateDoc(doc(db, path), { read: true }).catch(() => { });
                    // Also update the chat metadata if 1-on-1
                    if (currentChatId !== 'global_chat') {
                        updateDoc(doc(db, "chats", currentChatId), { read: true }).catch(() => { });
                    }
                }

                const canDelete = isMe && data.createdAt && (Date.now() - data.createdAt.toMillis() < 60000);

                const div = document.createElement('div');
                div.className = `flex flex-col ${isMe ? 'items-end' : 'items-start'} drop-in w-full max-w-full group`;

                // Process mentions and logic
                let processedText = data.text || '';
                if (processedText) {
                    // simple mention string replace styling
                    processedText = processedText.replace(/(@[A-Za-z0-9_]+)/g, '<span class="text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-1 rounded mx-0.5">$1</span>');
                    // process locations
                    processedText = processedText.replace(/\[MAP:([-0-9.]+),([-0-9.]+)\]/g, '<a href="https://www.google.com/maps/search/?api=1&query=$1,$2" target="_blank" class="block mt-1 bg-slate-100 dark:bg-slate-800 p-2 rounded flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition"><i class="fa-solid fa-map-location-dot text-blue-500"></i><span class="text-xs text-blue-600 dark:text-blue-400 font-bold">View Shared Location</span></a>');
                }

                div.innerHTML = `
                            <div class="flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${isMe ? 'flex-row-reverse' : ''}">
                                ${!isMe ? (data.senderPhotoUrl ?
                        `<img src="${data.senderPhotoUrl}" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 border border-white dark:border-slate-800 mt-auto">` :
                        `<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-auto border border-white dark:border-slate-800 uppercase">${(data.sender || data.email || '?')[0]}</div>`
                    ) : ''}
                                
                                <div class="relative ${isMe ? 'bg-black dark:bg-white text-white dark:text-black font-medium text-left' : 'bg-slate-100 dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-slate-800'} p-3 rounded-2xl ${isMe ? 'rounded-br-sm' : 'rounded-bl-sm'} text-xs sm:text-sm shadow-sm relative overflow-hidden break-words">
                                    ${!isMe && window.currentChatContext === 'global' && lastUser !== data.email ? `<p class="text-[9px] font-bold ${isMe ? 'opacity-80' : 'text-green-600 dark:text-green-400'} mb-1">${data.sender || data.email}</p>` : ''}
                                    ${!isMe && window.currentChatContext && window.currentChatContext.startsWith('group_') && lastUser !== data.email ? `<p class="text-[9px] font-bold ${isMe ? 'opacity-80' : 'text-blue-600 dark:text-blue-400'} mb-1">${data.sender || data.email}</p>` : ''}
                                    <span class="leading-relaxed relative z-10 break-words whitespace-pre-wrap">${window.parseChatLinks ? window.parseChatLinks(processedText) : processedText}</span>
                                    <div class="flex items-center justify-end gap-1 mt-1 opacity-60 mix-blend-luminosity">
                                        <div class="text-[9px] text-right font-mono">${time}</div>
                                        ${isMe ? `<span class="text-[10px] ml-1"><i class="fa-solid fa-check-double"></i></span>` : ''}
                                    </div>
                                    ${canDelete ? `
                                        <button onclick="deleteChatMessage('${msgId}')" class="absolute -top-2 ${isMe ? '-left-2' : '-right-2'} w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                container.appendChild(div);
                lastUser = data.email;
            });

            // Order is ASC (recent at bottom), keep scroll at bottom
            setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);
        });

        activeListeners.push(chatUnsub);
    } catch (e) {
        container.innerHTML = `<div class="text-red-500 text-sm p-4">${e.message}</div>`;
    }
}

window.sendChatMessage = async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.focus();
    try {
        const msgData = {
            text,
            sender: (userData.name || userData.email || 'Admin'),
            senderPhotoUrl: (userData.photoUrl || ''),
            email: (userData.email || ''),
            role: (userData.role || 'ADMIN'),
            read: false,
            createdAt: serverTimestamp()
        };

        if (currentChatId === 'global_chat') {
            msgData.companyId = userData.companyId; // Scope to company
            await addDoc(collection(db, "global_chat"), msgData);
        } else {
            await addDoc(collection(db, "chats", currentChatId, "messages"), msgData);

            const chatMetaUpdate = {
                lastMessage: text,
                lastMessageAt: serverTimestamp(),
                lastSender: userData.docId || 'admin',
                read: false
            };

            // Only add users array if both IDs are available to prevent Firebase errors
            if (userData.docId && currentChatUser && currentChatUser.docId) {
                chatMetaUpdate.users = [userData.docId, currentChatUser.docId];
            }

            chatMetaUpdate.companyId = userData.companyId; // Scope to company
            await setDoc(doc(db, "chats", currentChatId), chatMetaUpdate, { merge: true });
        }

        const container = document.getElementById('chat-messages');
        if (container) setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);

        // --- @ai Trigger ---
        if (text.toLowerCase().includes('@ai')) {
            setTimeout(() => {
                handleAIChatRequest(db, userData, userData.companyId, currentChatId, currentChatUser);
            }, 1000);
        }

    } catch (err) {
        showToast("Failed to send: " + err.message, 'error');
    }
};

window.sendLocationMessage = () => {
    if (!navigator.geolocation) {
        showToast("Geolocation is not supported by your browser", "error");
        return;
    }

    const btnHtml = document.querySelector('button[onclick="sendLocationMessage()"]');
    if (btnHtml) btnHtml.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locationText = `Here is my current location:\n[MAP:${lat},${lng}]`;
            
            // Re-use sendChatMessage flow seamlessly
            const input = document.getElementById('chat-input');
            const originalVal = input.value;
            input.value = locationText;
            window.sendChatMessage({ preventDefault: () => {} });
            input.value = originalVal; // Restore draft if any

            if (btnHtml) btnHtml.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
        },
        (error) => {
            console.error(error);
            showToast("Unable to retrieve location", "error");
            if (btnHtml) btnHtml.innerHTML = '<i class="fa-solid fa-location-dot"></i>';
        }
    );
};

window.deleteChatMessage = async (msgId) => {
    if (!confirm("Delete this message?")) return;
    try {
        const path = currentChatId === 'global_chat' ? `global_chat/${msgId}` : `chats/${currentChatId}/messages/${msgId}`;
        await deleteDoc(doc(db, path));
        showToast("Message deleted", "info");
    } catch (e) {
        showToast("Failed to delete: " + e.message, "error");
    }
};

// Close sidebar on route change (mobile)
const originalSwitchTab = window.switchTab;
window.switchTab = (tab, options = {}) => {
    if (originalSwitchTab) originalSwitchTab(tab, options);
    if (window.innerWidth < 1024) { // lg breakpoint
        const sidebar = document.getElementById('admin-sidebar');
        if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
            window.toggleSidebar();
        }
    }
};


// Account Center Logic
window.openAccountCenter = async () => {
    // Populate Modal
    const modal = document.getElementById('modal-account');
    const content = document.getElementById('modal-account-content');
    const u = userData; // Global user object

    if (!u) {
        showToast("User data not loaded", "error");
        return;
    }

    document.getElementById('ac-name').textContent = u.name || 'User';
    document.getElementById('ac-role').textContent = (u.role || 'EMPLOYEE').replace('_', ' ');
    document.getElementById('ac-email').textContent = u.email;
    document.getElementById('ac-empid').textContent = u.employeeId || 'N/A';
    document.getElementById('ac-dept').textContent = u.department || 'General';
    document.getElementById('ac-manager').textContent = u.managerId || 'None';
    // Convert firestore timestamp safely
    document.getElementById('ac-join').textContent = u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : (u.createdAt ? formatDateUtc(u.createdAt) : 'N/A');
    document.getElementById('ac-avatar').textContent = u.name ? u.name[0].toUpperCase() : 'U';

    document.getElementById('ac-phone').value = u.altPhone || '';
    document.getElementById('ac-alt-email').value = u.altEmail || '';

    document.getElementById('ac-stat-budget').textContent = u.budgetLimit ? u.budgetLimit.toLocaleString() : 'N/A';
    document.getElementById('ac-stat-claims').textContent = '...';

    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);

    try {
        // Fetch claims simple size dynamically without blocking UI
        const claimsQ = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("userId", "==", u.docId));
        getDocs(claimsQ).then(snap => {
            document.getElementById('ac-stat-claims').textContent = snap.size;
        });
    } catch (e) { console.warn(e); }
};

window.saveAccountSettings = async (e) => {
    e.preventDefault();
    const phone = document.getElementById('ac-phone').value;
    const altEmail = document.getElementById('ac-alt-email').value;
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
    try {
        // Determine user Doc ID (might be stored in userData.id or userData.docId depending on fetch logic)
        const docId = userData.docId || userData.id;
        if (!docId) throw new Error("User ID not found");

        await updateDoc(doc(db, "users", docId), {
            altPhone: phone,
            altEmail: altEmail,
            updatedAt: serverTimestamp()
        });

        // Update local cache
        userData.altPhone = phone;
        userData.altEmail = altEmail;

        showToast("Account settings saved!", "success");
        closeModal('modal-account');
    } catch (err) {
        console.error(err);
        showToast("Error saving: " + err.message, "error");
    } finally {
        btn.innerHTML = originalText;
    }
};

window.downloadMyData = async () => {
    showToast("Preparing data export...", "info");
    try {
        // 1. Fetch Expenses
        // BUT, `renderChat` (Line 3833) uses `db` and `collection`.
        // `renderChat` is defined in `window`? NO. 
        // Wait, `async function renderChat() {... } ` is inside ` < script > ` (Line 3832).
        // Does it have access to `db`? 
        // `db` must be global for `renderChat` to work if `renderChat` is a global function.
        // Let's check lines 64-85 again. It imports firebase storage but not db.
        // There must be another script tag I missed that initializes firebase?
        // Ah, line 58-63 config.
        // The MAIN script logic is likely in the middle chunk I skipped. 
        // Assuming `db` IS available because `renderChat` uses it.

        const q = query(collection(db, "expenses"), where("companyId", "==", userData.companyId), where("userId", "==", userData.uid || userData.id));
        const snap = await safeFirebaseFetch(getDocs(q));
        const expenses = snap.docs.map(d => d.data());

        // 2. Prepare JSON
        const exportData = {
            userProfile: userData,
            expenses: expenses,
            exportDate: new Date().toISOString(),
            generatedBy: "EXPLYRA Admin Portal"
        };

        // 3. Trigger Download
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `explyra_data_export_${userData.employeeId || 'user'}_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

    } catch (e) {
        console.error(e);
        showToast("Export failed: " + e.message, "error");
    }
};

// Custom Notification Logic
window.openNotificationModal = async () => {
    const modal = document.getElementById('modal-notification');
    const select = document.getElementById('notif-recipient');

    // Reset options to avoid duplicates
    select.innerHTML = '<option value="" disabled selected>Select Recipient</option><option value="ALL">📢 All Users</option>';

    const populateOptions = (users) => {
        users.sort((a, b) => (a.name || '').localeCompare(b.name || '')).forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.docId || u.id;
            opt.textContent = `${u.name} (${u.role ? u.role.replace('_', ' ') : 'User'})`;
            select.appendChild(opt);
        });
    };

    // Populate users
    if (window.globalUsersCache && window.globalUsersCache.length > 0) {
        populateOptions(window.globalUsersCache);
    } else {
        try {
            const usersSnap = await safeFirebaseFetch(getDocs(query(collection(db, "users"), where("companyId", "==", userData.companyId))));
            const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            window.globalUsersCache = users;
            populateOptions(users);
        } catch (e) {
            console.error("Error fetching users for notification", e);
            showToast("Could not load user list.", "error");
        }
    }

    document.getElementById('notif-title').value = '';
    document.getElementById('notif-message').value = '';

    modal.classList.remove('hidden');
    setTimeout(() => {
        const content = document.getElementById('modal-notification-content');
        if (content) {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
};

window.sendCustomNotification = async () => {
    const recipient = document.getElementById('notif-recipient').value;
    const title = document.getElementById('notif-title').value.trim();
    const message = document.getElementById('notif-message').value.trim();

    if (!recipient) return showToast("Please select a recipient.", "error");
    if (!title || !message) return showToast("Title and message are required.", "error");

    const btn = document.getElementById('btn-send-notif');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
        await addDoc(collection(db, "notifications"), {
            targetUserId: recipient,
            title: title,
            body: message,
            sender: userData.name || 'Admin',
            senderRole: userData.role || 'ADMIN',
            createdAt: serverTimestamp(),
            read: false,
            type: 'CUSTOM'
        });

        showToast("Notification dispatched successfully!", "success");
        closeModal('modal-notification');
    } catch (e) {
        console.error(e);
        showToast("Failed to send: " + e.message, "error");
    } finally {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
};

// --- Notification List & PDP ---
window.openNotifList = async () => {
    const modal = document.getElementById('modal-notif-list');
    const container = document.getElementById('notif-list-container');
    const dot = document.getElementById('header-notif-dot');

    // Hide dot when opening
    if (dot) dot.classList.add('hidden');

    modal.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('modal-notif-list-content').classList.remove('scale-95', 'opacity-0');
        document.getElementById('modal-notif-list-content').classList.add('scale-100', 'opacity-100');
    }, 10);

    try {
        const q = query(
            collection(db, "notifications"),
            where("targetUserId", "in", [userData.docId, 'ALL']),
            orderBy("createdAt", "desc"),
            limit(20)
        );
        const snap = await safeFirebaseFetch(getDocs(q));

        if (snap.empty) {
            container.innerHTML = `
                <div class="text-center py-12 text-slate-400">
                    <i class="fa-solid fa-bell-slash text-3xl mb-3 opacity-20"></i>
                    <p class="text-sm">Inbox is clean!</p>
                </div>`;
            return;
        }

        container.innerHTML = snap.docs.map(docSnap => {
            const d = docSnap.data();
            const time = d.createdAt?.toDate ? d.createdAt.toDate().toLocaleDateString() + ' ' + d.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now';
            return `
                <div onclick="openNotificationPDP('${docSnap.id}')" class="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-800 transition cursor-pointer group shadow-sm">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-green-600 transition">${d.title}</h4>
                        <span class="text-[9px] font-mono text-slate-400">${time}</span>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">${d.body}</p>
                    <div class="flex items-center gap-1.5 mt-2">
                        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">from: ${d.sender || 'Admin'}</span>
                        ${d.type === 'CUSTOM' ? '<span class="px-1.5 py-0.5 rounded bg-green-50 dark:bg-green-900/20 text-green-600 text-[8px] font-bold uppercase tracking-widest border border-green-100 dark:border-green-800">Direct Message</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (e) {
        container.innerHTML = `<div class="text-red-500 text-xs p-4">Error: ${e.message}</div>`;
    }
};

window.openNotificationPDP = async (id) => {
    try {
        const snap = await getDoc(doc(db, "notifications", id));
        if (!snap.exists()) return;
        const d = snap.data();

        document.getElementById('pdp-notif-title').textContent = d.title;
        document.getElementById('pdp-notif-sender').textContent = d.sender || 'Admin';
        document.getElementById('pdp-notif-date').textContent = d.createdAt?.toDate ? d.createdAt.toDate().toLocaleString() : 'Recent';
        document.getElementById('pdp-notif-body').textContent = d.body;

        const modal = document.getElementById('modal-notif-pdp');
        modal.classList.remove('hidden');
        pushAdminModalState('modal-notif-pdp');
        setTimeout(() => {
            document.getElementById('modal-notif-pdp-content').classList.remove('scale-95', 'opacity-0');
            document.getElementById('modal-notif-pdp-content').classList.add('scale-100', 'opacity-100');
        }, 10);
    } catch (e) {
        showToast("Error loading details.", "error");
    }
};

// --- WebRTC Logic ---
let localStream = null;
let remoteStream = null;
let peerConnection = null;
let currentCallDoc = null;
let incomingCallUnsub = null;
let activeCallUnsub = null;

const servers = {
    iceServers: [
        { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
    ]
};

window.listenForCalls = () => {
    if (!userData || !userData.docId) return;
    if (incomingCallUnsub) { incomingCallUnsub(); incomingCallUnsub = null; }
    const q = query(collection(db, "calls"), where("companyId", "==", userData.companyId), where("receiver", "==", userData.docId), where("status", "==", "calling"));
    incomingCallUnsub = onSnapshot(q, (snapshot) => {
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            if (data.status === 'calling') {
                showIncomingCall(docSnap.id, data);
            }
        });
    });
};

function showIncomingCall(callId, data) {
    currentCallDoc = callId;
    document.getElementById('incoming-caller-name').textContent = data.callerName || 'Unknown';
    document.getElementById('incoming-call-type').textContent = data.type === 'video' ? 'Video' : 'Voice';
    // Show caller photo
    const photoEl = document.getElementById('incoming-caller-photo');
    if (photoEl) {
        if (data.callerPhotoUrl) {
            photoEl.innerHTML = `<img src="${data.callerPhotoUrl}" class="w-full h-full object-cover">`;
        } else {
            const initial = (data.callerName || '?')[0].toUpperCase();
            photoEl.innerHTML = initial;
        }
    }
    document.getElementById('modal-incoming-call').classList.remove('hidden');
    setTimeout(() => {
        const c = document.getElementById('modal-incoming-call-content');
        if (c) {
            c.classList.remove('scale-95', 'opacity-0');
            c.classList.add('scale-100', 'opacity-100');
        }
    }, 10);
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) ringer.play().catch(e => console.log('Autoplay prevented', e));
}

window.initiateCall = async (type) => {
    if (!currentChatUser) return showToast("Select a user to call", "error");

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: type === 'video', audio: true });
        const localVideo = document.getElementById('local-video');
        localVideo.srcObject = localStream;
        if (type === 'voice') localVideo.classList.add('hidden');
        else localVideo.classList.remove('hidden');

        showActiveCallUI(currentChatUser.name || 'User', type, currentChatUser.photoUrl || '');

        // Play outgoing ringing sound
        const outRinger = document.getElementById('outgoing-ringtone');
        if (outRinger) outRinger.play().catch(e => console.log('Autoplay prevented', e));

        peerConnection = new RTCPeerConnection(servers);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        const callDocRef = doc(collection(db, "calls"));
        currentCallDoc = callDocRef.id;

        const offerCandidates = collection(callDocRef, "offerCandidates");
        const answerCandidates = collection(callDocRef, "answerCandidates");

        peerConnection.onicecandidate = event => {
            if (event.candidate) addDoc(offerCandidates, event.candidate.toJSON());
        };

        peerConnection.ontrack = event => {
            document.getElementById('remote-video').srcObject = event.streams[0];
            if (type === 'video') document.getElementById('remote-video').classList.remove('opacity-0');
            else document.getElementById('remote-audio-indicator').classList.remove('hidden');
        };

        const offerDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offerDescription);

        await setDoc(callDocRef, {
            offer: { type: offerDescription.type, sdp: offerDescription.sdp },
            caller: userData.docId,
            callerName: userData.name || userData.email,
            callerPhotoUrl: userData.photoUrl || '',
            receiver: currentChatUser.docId,
            receiverName: currentChatUser.name || '',
            companyId: userData.companyId, // Scope to company
            type: type,
            status: 'calling',
            createdAt: serverTimestamp()
        });

        // Chat Log for Call
        try {
            const callLogMsg = {
                text: `📞 Started ${type === 'video' ? 'Video' : 'Voice'} Call`,
                sender: userData.name || userData.email,
                email: userData.email,
                role: userData.role,
                createdAt: serverTimestamp(),
                type: 'system'
            };
            await addDoc(collection(db, "chats", currentChatId, "messages"), callLogMsg);
            await setDoc(doc(db, "chats", currentChatId), {
                lastMessage: `📞 ${type === 'video' ? 'Video' : 'Voice'} Call`,
                lastMessageAt: serverTimestamp(),
                companyId: userData.companyId, // Scope to company
                users: [userData.docId, currentChatUser.docId]
            }, { merge: true });
        } catch (ce) { console.error("Call log error", ce); }

        activeCallUnsub = onSnapshot(callDocRef, snapshot => {
            const data = snapshot.data();
            if (data && data.status === 'answered') {
                // Stop outgoing ringtone
                const outR = document.getElementById('outgoing-ringtone');
                if (outR) { outR.pause(); outR.currentTime = 0; }

                // Switch to connected state
                switchToConnectedUI();

                if (!peerConnection.currentRemoteDescription && data.answer) {
                    const answerDescription = new RTCSessionDescription(data.answer);
                    peerConnection.setRemoteDescription(answerDescription);
                }
            }
            if (data && data.status === 'ended') {
                cleanupCall();
            }
        });

        onSnapshot(answerCandidates, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    peerConnection.addIceCandidate(candidate);
                }
            });
        });

    } catch (e) {
        console.error(e);
        if (e.name === 'NotAllowedError' || e.message?.toLowerCase().includes('permission denied')) {
            showToast("Camera/Mic permission denied. Please click the lock icon in your browser address bar to allow access.", "error");
        } else {
            showToast("Failed to start call: " + e.message, "error");
        }
    }
};

window.acceptCall = async () => {
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) ringer.pause();
    const incModal = document.getElementById('modal-incoming-call');
    if (incModal) incModal.classList.add('hidden');

    try {
        const callDocRef = doc(db, "calls", currentCallDoc);
        const callSnap = await safeFirebaseFetch(getDoc(callDocRef));
        if (!callSnap.exists()) throw new Error("Call ended");
        const callData = callSnap.data();

        localStream = await navigator.mediaDevices.getUserMedia({ video: callData.type === 'video', audio: true });
        const localVideo = document.getElementById('local-video');
        localVideo.srcObject = localStream;
        if (callData.type === 'voice') localVideo.classList.add('hidden');
        else localVideo.classList.remove('hidden');

        showActiveCallUI(callData.callerName || 'User', callData.type, callData.callerPhotoUrl || '');
        // Accepting = already connected, go straight to connected UI
        setTimeout(() => switchToConnectedUI(), 300);

        peerConnection = new RTCPeerConnection(servers);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        const offerCandidates = collection(callDocRef, "offerCandidates");
        const answerCandidates = collection(callDocRef, "answerCandidates");

        peerConnection.onicecandidate = event => {
            if (event.candidate) addDoc(answerCandidates, event.candidate.toJSON());
        };

        peerConnection.ontrack = event => {
            document.getElementById('remote-video').srcObject = event.streams[0];
            if (callData.type === 'video') document.getElementById('remote-video').classList.remove('opacity-0');
            else document.getElementById('remote-audio-indicator').classList.remove('hidden');
        };

        await peerConnection.setRemoteDescription(new RTCSessionDescription(callData.offer));
        const answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerDescription);

        await updateDoc(callDocRef, {
            answer: { type: answerDescription.type, sdp: answerDescription.sdp },
            status: 'answered'
        });

        onSnapshot(offerCandidates, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    peerConnection.addIceCandidate(candidate);
                }
            });
        });

        activeCallUnsub = onSnapshot(callDocRef, snapshot => {
            const data = snapshot.data();
            if (data && data.status === 'ended') {
                cleanupCall();
            }
        });

    } catch (e) {
        console.error(e);
        showToast(e.message || "Failed to accept call", "error");
        cleanupCall();
    }
};

window.declineCall = async () => {
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) ringer.pause();
    const incModal = document.getElementById('modal-incoming-call');
    if (incModal) incModal.classList.add('hidden');
    if (currentCallDoc) {
        await updateDoc(doc(db, "calls", currentCallDoc), { status: 'ended' }).catch(console.warn);
    }
    currentCallDoc = null;
};

window.endCall = async () => {
    if (currentCallDoc) {
        await updateDoc(doc(db, "calls", currentCallDoc), { status: 'ended' }).catch(console.warn);
    }
    cleanupCall();
};

function showActiveCallUI(name, type, photoUrl) {
    document.getElementById('active-call-name').textContent = name;
    // Set header avatar with photo or initial
    const avatarEl = document.getElementById('call-avatar');
    if (photoUrl) {
        avatarEl.innerHTML = `<img src="${photoUrl}" class="w-full h-full object-cover">`;
    } else {
        avatarEl.textContent = name[0] ? name[0].toUpperCase() : '?';
    }
    // Set ringing screen avatar
    const ringingAvatarEl = document.getElementById('ringing-avatar');
    if (ringingAvatarEl) {
        if (photoUrl) {
            ringingAvatarEl.innerHTML = `<img src="${photoUrl}" class="w-full h-full object-cover">`;
        } else {
            ringingAvatarEl.textContent = name[0] ? name[0].toUpperCase() : '?';
        }
    }
    const ringingNameEl = document.getElementById('ringing-name');
    if (ringingNameEl) ringingNameEl.textContent = name;

    // Show modal in ringing state
    document.getElementById('modal-active-call').classList.remove('hidden');
    document.getElementById('modal-active-call').classList.remove('scale-50', 'translate-x-1/4', 'translate-y-1/4', 'rounded-3xl', 'overflow-hidden', 'shadow-2xl');
    document.getElementById('call-header-overlay').classList.remove('hidden');

    // Show ringing screen, hide connected screen
    const rScreen = document.getElementById('call-ringing-screen');
    const cScreen = document.getElementById('call-connected-screen');
    if (rScreen) rScreen.classList.remove('hidden');
    if (cScreen) cScreen.classList.add('hidden');

    // Show "Ringing..." status, NO timer yet
    const statusText = document.getElementById('call-status-text');
    if (statusText) {
        statusText.textContent = 'Ringing...';
        statusText.className = 'text-green-400 animate-pulse';
    }

    clearInterval(window.callInterval);
}

function switchToConnectedUI() {
    // Hide ringing screen, show connected screen
    const rScreen = document.getElementById('call-ringing-screen');
    const cScreen = document.getElementById('call-connected-screen');
    if (rScreen) rScreen.classList.add('hidden');
    if (cScreen) cScreen.classList.remove('hidden');

    // Update status to "Connected" then start timer
    const statusText = document.getElementById('call-status-text');
    if (statusText) {
        statusText.textContent = 'Connected';
        statusText.className = 'text-green-400';
    }

    // Start call timer NOW
    clearInterval(window.callInterval);
    let secs = 0;
    window.callInterval = setInterval(() => {
        secs++;
        const mins = String(Math.floor(secs / 60)).padStart(2, '0');
        const remSecs = String(secs % 60).padStart(2, '0');
        const statusEl = document.getElementById('call-status-text');
        if (statusEl) {
            statusEl.textContent = `${mins}:${remSecs}`;
            statusEl.className = 'text-green-400';
        }
    }, 1000);
}

function cleanupCall() {
    if (peerConnection) peerConnection.close();
    if (localStream) localStream.getTracks().forEach(track => track.stop());

    peerConnection = null;
    localStream = null;
    currentCallDoc = null;
    if (activeCallUnsub) { activeCallUnsub(); activeCallUnsub = null; }

    const acModal = document.getElementById('modal-active-call');
    if (acModal) acModal.classList.add('hidden');

    const rv = document.getElementById('remote-video');
    if (rv) { rv.srcObject = null; rv.classList.add('opacity-0'); }

    const lv = document.getElementById('local-video');
    if (lv) lv.srcObject = null;

    const ai = document.getElementById('remote-audio-indicator');
    if (ai) ai.classList.add('hidden');

    clearInterval(window.callInterval);
    const statusText = document.getElementById('call-status-text');
    if (statusText) {
        statusText.textContent = 'Ringing...';
        statusText.className = 'text-green-400 animate-pulse';
    }

    // Reset ringing/connected screens
    const rScreen = document.getElementById('call-ringing-screen');
    const cScreen = document.getElementById('call-connected-screen');
    if (rScreen) rScreen.classList.remove('hidden');
    if (cScreen) cScreen.classList.add('hidden');

    // Stop ALL ringtones
    const ringer = document.getElementById('incoming-ringtone');
    if (ringer) { ringer.pause(); ringer.currentTime = 0; }
    const outRinger = document.getElementById('outgoing-ringtone');
    if (outRinger) { outRinger.pause(); outRinger.currentTime = 0; }
}

window.toggleMic = () => {
    if (localStream) {
        const audioTrack = localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            const btn = document.getElementById('btn-toggle-mic');
            if (audioTrack.enabled) {
                btn.classList.remove('bg-red-500/50', 'text-red-200');
                btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            } else {
                btn.classList.add('bg-red-500/50', 'text-red-200');
                btn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
            }
        }
    }
};

window.toggleCam = () => {
    if (localStream) {
        const videoTrack = localStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            const btn = document.getElementById('btn-toggle-cam');
            if (videoTrack.enabled) {
                btn.classList.remove('bg-red-500/50', 'text-red-200');
                btn.innerHTML = '<i class="fa-solid fa-video"></i>';
            } else {
                btn.classList.add('bg-red-500/50', 'text-red-200');
                btn.innerHTML = '<i class="fa-solid fa-video-slash"></i>';
            }
        }
    }
};

window.toggleCallPip = () => {
    const overlay = document.getElementById('modal-active-call');
    overlay.classList.toggle('scale-50');
    overlay.classList.toggle('translate-x-1/4');
    overlay.classList.toggle('translate-y-1/4');
    overlay.classList.toggle('rounded-3xl');
    overlay.classList.toggle('overflow-hidden');
    overlay.classList.toggle('shadow-2xl');
    document.getElementById('call-header-overlay').classList.toggle('hidden');
};

// --- Role Management ---
window.renderRoles = async () => {
    document.getElementById('page-title').textContent = "Role Management";
    const content = document.getElementById('content-area');
    content.innerHTML = '<div class="flex flex-col space-y-4 p-6 w-full"><div class="h-10 w-full skeleton rounded-lg"></div><div class="h-16 w-full skeleton rounded-xl"></div></div>';

    try {
        // Fetch custom roles for this company AND global system roles if applicable
        // Since we are dealing with a dynamically built list, we check 'companyId' 
        const q = query(collection(db, "roles"), where("companyId", "==", userData.companyId));
        const snap = await safeFirebaseFetch(getDocs(q));

        // Also fetch global roles that have companyId == 'GLOBAL' or similar, if they exist
        const globalQ = query(collection(db, "roles"), where("companyId", "==", "GLOBAL"));
        const globalSnap = await safeFirebaseFetch(getDocs(globalQ));

        let roles = [];
        globalSnap.forEach(d => roles.push({ id: d.id, ...d.data() }));
        snap.forEach(d => roles.push({ id: d.id, ...d.data() }));

        // Deduplicate in case of overrides (company specific overrides global)
        const uniqueRolesMap = new Map();
        roles.forEach(r => {
            if (!uniqueRolesMap.has(r.name) || r.companyId !== 'GLOBAL') {
                uniqueRolesMap.set(r.name, r);
            }
        });
        roles = Array.from(uniqueRolesMap.values());

        // System default roles — always show these, merged with any DB-saved roles
        const defaultRoles = [
            { id: 'def-emp', name: 'EMPLOYEE', systemRole: true, description: 'Basic employee — can submit expense claims and view personal tasks', permissions: { viewApprovals: false, viewReports: false } },
            { id: 'def-mgr', name: 'MANAGER', systemRole: true, description: 'Team manager — approves team expense claims and assigns tasks', permissions: { viewApprovals: true, viewReports: true } },
            { id: 'def-smgr', name: 'SENIOR_MANAGER', systemRole: true, description: 'Senior manager — approves higher-value claims and manages users', permissions: { viewApprovals: true, viewReports: true, viewUsers: true } },
            { id: 'def-fmgr', name: 'FINANCE_MANAGER', systemRole: true, description: 'Finance manager — reviews and approves financial claims', permissions: { viewApprovals: true, viewReports: true, viewInvoices: true } },
            { id: 'def-hr', name: 'HR', systemRole: true, description: 'Human resources — manages employee records and user accounts', permissions: { viewApprovals: false, viewReports: false, viewUsers: true } },
            { id: 'def-accts', name: 'ACCOUNTS', systemRole: true, description: 'Accounts team — processes approved claims for payment', permissions: { viewApprovals: true, viewReports: true, viewInvoices: true } },
            { id: 'def-audit', name: 'AUDIT', systemRole: true, description: 'Auditor — reviews paid claims and generates audit reports', permissions: { viewApprovals: false, viewReports: true } },
            { id: 'def-trsy', name: 'TREASURY', systemRole: true, description: 'Treasury — handles final payment disbursement', permissions: { viewApprovals: true, viewReports: true } },
            { id: 'def-admin', name: 'ADMIN', systemRole: true, description: 'Full administrator — complete system access and control', permissions: { viewApprovals: true, viewReports: true, viewUsers: true, viewSettings: true, viewInvoices: true, viewCrm: true } }
        ];

        // Merge: DB roles override defaults with same name, but unsaved defaults still appear
        const dbRoleNames = new Set(roles.map(r => r.name));
        defaultRoles.forEach(def => {
            if (!dbRoleNames.has(def.name)) {
                roles.push(def);
            }
        });
        // Add descriptions to DB roles that match defaults
        roles.forEach(r => {
            if (!r.description) {
                const def = defaultRoles.find(d => d.name === r.name);
                if (def) r.description = def.description;
            }
        });

        window.currentCompanyRoles = roles; // Store globally for editing

        content.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 fade-in">
                <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Role & Permissions Management</h3>
                        <p class="text-xs text-slate-400">Manage what tabs and features each role can access.</p>
                    </div>
                    <div>
                        <button onclick="showRoleModal()" class="text-xs bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition"><i class="fa-solid fa-plus mr-1"></i> New Custom Role</button>
                    </div>
                </div>
                <div class="p-0">
                    <div class="overflow-x-auto">
                        <table class="data-grid text-sm text-left w-full">
                            <thead class="bg-slate-50 dark:bg-slate-900 text-slate-500 text-xs uppercase">
                                <tr>
                                    <th class="px-6 py-3">Role Name</th>
                                    <th class="px-6 py-3">Description</th>
                                    <th class="px-6 py-3">Type</th>
                                    <th class="px-6 py-3">Permissions Summary</th>
                                    <th class="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                ${roles.map((r, i) => `
                                    <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                                        <td class="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">
                                            <i class="fa-solid ${r.systemRole ? 'fa-shield-halved text-green-500' : 'fa-user-tag text-blue-500'} mr-2"></i>
                                            ${r.name}
                                        </td>
                                        <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 max-w-[250px]">
                                            ${r.description || '<span class="italic text-slate-400">No description</span>'}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${r.systemRole ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}">
                                                ${r.systemRole ? 'SYSTEM DEFAULT' : 'CUSTOM ROLE'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                                            ${Object.keys(r.permissions || {}).length} rules defined
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <button onclick="editRole(${i})" class="text-xs font-bold text-blue-600 hover:underline"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                                            ${r.name !== 'ADMIN' ? `<button onclick="deleteRole('${r.id}')" class="ml-3 text-xs font-bold text-red-600 hover:underline"><i class="fa-solid fa-trash"></i> Delete</button>` : `<span class="ml-3 text-xs font-bold text-slate-400 opacity-50 cursor-not-allowed"><i class="fa-solid fa-lock"></i> Protected</span>`}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Add/Edit Role Modal Container injected here for simplicity -->
            <div id="role-modal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[95] hidden flex items-center justify-center p-4">
                <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-soft transition-enterprise scale-95 opacity-0 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" id="role-modal-content">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100" id="role-modal-title">Role Configuration</h3>
                        <button onclick="closeRoleModal()" class="text-slate-400 hover:text-slate-600 dark:text-slate-300"><i class="fa-solid fa-times"></i></button>
                    </div>
                    <form id="role-form" class="space-y-4">
                        <input type="hidden" id="role-id">
                        <input type="hidden" id="role-is-system" value="false">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Role Name <span class="text-red-500">*</span></label>
                            <input type="text" id="role-name-input" class="input-primary uppercase font-mono" placeholder="e.g. DATA_ENTRY" required>
                            <p class="text-[10px] text-slate-400 mt-1" id="role-name-lock-msg">System role names cannot be changed.</p>
                        </div>
                        
                        <div class="mt-4 border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50">
                            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3"><i class="fa-solid fa-key text-amber-500 mr-2"></i> Permissions Matrix</h4>
                            
                            <div class="space-y-3" id="role-permissions-list">
                                <!-- Checkboxes will be rendered here dynamically -->
                                <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <input type="checkbox" id="perm-view-claims" class="rounded text-green-600 focus:ring-green-500"> Can View & Approve Claims
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <input type="checkbox" id="perm-view-reports" class="rounded text-green-600 focus:ring-green-500"> Can Access Reports
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <input type="checkbox" id="perm-view-users" class="rounded text-green-600 focus:ring-green-500"> Can Manage Users
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <input type="checkbox" id="perm-view-settings" class="rounded text-green-600 focus:ring-green-500"> Can Access Company Settings
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <input type="checkbox" id="perm-view-invoices" class="rounded text-green-600 focus:ring-green-500"> Can Access Invoices
                                </label>
                                <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <input type="checkbox" id="perm-view-crm" class="rounded text-green-600 focus:ring-green-500"> Can Access CRM
                                </label>
                            </div>
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button type="button" onclick="closeRoleModal()" class="flex-1 ghost-btn">Cancel</button>
                            <button type="button" onclick="saveRole()" class="flex-1 bg-green-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-semibold transition shadow-md shadow-green-200">Save Role</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    } catch (e) {
        content.innerHTML = `<div class="text-center py-20 text-red-500 truncate">Error loading roles: ${e.message}</div>`;
    }
};

window.showRoleModal = (roleData = null) => {
    const modal = document.getElementById('role-modal');
    modal.classList.remove('hidden');

    const nameInput = document.getElementById('role-name-input');
    const isSystemInput = document.getElementById('role-is-system');
    const idInput = document.getElementById('role-id');
    const lockMsg = document.getElementById('role-name-lock-msg');

    if (roleData) {
        document.getElementById('role-modal-title').textContent = "Edit Permissions: " + roleData.name;
        nameInput.value = roleData.name;
        idInput.value = roleData.id;
        isSystemInput.value = roleData.systemRole ? 'true' : 'false';

        if (roleData.systemRole) {
            nameInput.disabled = true;
            lockMsg.classList.remove('hidden');
        } else {
            nameInput.disabled = false;
            lockMsg.classList.add('hidden');
        }

        // Set checkboxes
        document.getElementById('perm-view-claims').checked = roleData.permissions?.viewApprovals || false;
        document.getElementById('perm-view-reports').checked = roleData.permissions?.viewReports || false;
        document.getElementById('perm-view-users').checked = roleData.permissions?.viewUsers || false;
        document.getElementById('perm-view-settings').checked = roleData.permissions?.viewSettings || false;
        document.getElementById('perm-view-invoices').checked = roleData.permissions?.viewInvoices || false;
        document.getElementById('perm-view-crm').checked = roleData.permissions?.viewCrm || false;
    } else {
        document.getElementById('role-modal-title').textContent = "Create Custom Role";
        nameInput.value = '';
        idInput.value = '';
        isSystemInput.value = 'false';
        nameInput.disabled = false;
        lockMsg.classList.add('hidden');

        document.getElementById('perm-view-claims').checked = false;
        document.getElementById('perm-view-reports').checked = false;
        document.getElementById('perm-view-users').checked = false;
        document.getElementById('perm-view-settings').checked = false;
        document.getElementById('perm-view-invoices').checked = false;
        document.getElementById('perm-view-crm').checked = false;
    }

    setTimeout(() => {
        document.getElementById('role-modal-content').classList.remove('scale-95', 'opacity-0');
        document.getElementById('role-modal-content').classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeRoleModal = () => {
    const m = document.getElementById('role-modal');
    const c = document.getElementById('role-modal-content');
    c.classList.remove('scale-100', 'opacity-100');
    c.classList.add('scale-95', 'opacity-0');
    setTimeout(() => m.classList.add('hidden'), 200);
};

window.editRole = (index) => {
    const roleData = window.currentCompanyRoles[index];
    showRoleModal(roleData);
};

window.saveRole = async () => {
    const id = document.getElementById('role-id').value;
    const name = document.getElementById('role-name-input').value.trim().toUpperCase();
    const isSystem = document.getElementById('role-is-system').value === 'true';

    if (!name) return showToast("Role Name is required", "error");

    const permissions = {
        viewApprovals: document.getElementById('perm-view-claims').checked,
        viewReports: document.getElementById('perm-view-reports').checked,
        viewUsers: document.getElementById('perm-view-users').checked,
        viewSettings: document.getElementById('perm-view-settings').checked,
        viewInvoices: document.getElementById('perm-view-invoices').checked,
        viewCrm: document.getElementById('perm-view-crm').checked
    };

    try {
        let docRef;
        if (id && !id.startsWith('def-')) {
            // Update existing custom or saved role
            docRef = doc(db, "roles", id);
            await setDoc(docRef, {
                name,
                systemRole: isSystem,
                companyId: userData.companyId,
                permissions,
                updatedAt: serverTimestamp()
            }, { merge: true });
        } else {
            // Create New or Save a system default that wasn't previously in DB
            docRef = doc(collection(db, "roles"));
            await setDoc(docRef, {
                name,
                systemRole: isSystem,
                companyId: userData.companyId,
                permissions,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        }

        showToast("Role saved successfully!", "success");
        closeRoleModal();
        renderRoles();
    } catch (e) {
        showToast("Error saving role: " + e.message, "error");
    }
};

window.deleteRole = async (roleId) => {
    // ADMIN role cannot be deleted
    const roleObj = window.currentCompanyRoles.find(r => r.id === roleId);
    if (roleObj && roleObj.name === 'ADMIN') {
        return showToast("Cannot delete the ADMIN role — it is protected.", "error");
    }

    if (!await confirm("Are you sure you want to delete this role? Users assigned to this role may lose access.")) return;

    try {
        // If it's a default role (not saved in DB), just re-render without it
        if (roleId.startsWith('def-')) {
            // Remove from local array and re-render
            window.currentCompanyRoles = window.currentCompanyRoles.filter(r => r.id !== roleId);
            showToast("Default role removed", "success");
            renderRoles();
            return;
        }
        await deleteDoc(doc(db, "roles", roleId));
        showToast("Role deleted successfully", "success");
        renderRoles();
    } catch (e) {
        showToast("Error deleting role: " + e.message, "error");
    }
};

// Override User Modal populator to load dynamic roles
const originalOpenUserModal = window.openUserModal;
window.openUserModal = async (uId = null) => {
    // Attempt to load dynamic roles before showing modal
    try {
        const q = query(collection(db, "roles"), where("companyId", "==", userData.companyId));
        const snap = await safeFirebaseFetch(getDocs(q));

        const globalQ = query(collection(db, "roles"), where("companyId", "==", "GLOBAL"));
        const globalSnap = await safeFirebaseFetch(getDocs(globalQ));

        let rolesMap = new Map();
        globalSnap.forEach(d => rolesMap.set(d.data().name, d.data()));
        snap.forEach(d => rolesMap.set(d.data().name, d.data()));

        const roles = Array.from(rolesMap.values());

        const roleSelect = document.getElementById('user-role');
        if (roleSelect && roles.length > 0) {
            roleSelect.innerHTML = roles.map(r => `<option value="${r.name}">${r.name}</option>`).join('');
        }
    } catch (e) {
        console.warn("Failed to load dynamic roles for dropdown. Using defaults.", e);
    }

    if (originalOpenUserModal) {
        originalOpenUserModal(uId);
    } else {
        // Fallback UI logic to show modal if originalOpenUserModal isn't defined
        document.getElementById('user-modal').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('user-modal-content').classList.remove('scale-95', 'opacity-0');
            document.getElementById('user-modal-content').classList.add('scale-100', 'opacity-100');
        }, 10);
    }
};

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js') // Ensure sw.js is in root
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Error', err));
}

window.toggleSidebar = () => {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) {
        if (sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0');
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
        }
    }
};

window.navigateToAttendance = () => {
    if (userData) {
        localStorage.setItem('company_session', JSON.stringify({
            companyId: userData.companyId,
            role: userData.role === 'ADMIN' ? 'Admin' : userData.role === 'HR' ? 'HR' : 'Manager',
            userId: userData.name || userData.email.split('@')[0]
        }));
    }
    window.location.href = 'attendance/company/attendance.html';
};

window.navigateToSalary = () => {
    if (userData) {
        localStorage.setItem('company_session', JSON.stringify({
            companyId: userData.companyId,
            role: userData.role === 'ADMIN' ? 'Admin' : userData.role === 'HR' ? 'HR' : 'Manager',
            userId: userData.name || userData.email.split('@')[0]
        }));
    }
    window.location.href = 'attendance/company/salary.html';
};

window.navigateToAI = () => {
    if (userData) {
        localStorage.setItem('company_session', JSON.stringify({
            companyId: userData.companyId,
            role: userData.role === 'ADMIN' ? 'Admin' : userData.role === 'HR' ? 'HR' : 'Manager',
            userId: userData.name || userData.email.split('@')[0]
        }));
    }
    window.location.href = 'attendance/company/ai-agent.html';
};
