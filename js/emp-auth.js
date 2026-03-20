// emp-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
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

// Globals attached to window for other modules
window.auth = auth;
window.db = db;
window.storage = storage;

window.companyId = null;
window.currentUser = null;
window.userData = null;

const empUrlParams = new URLSearchParams(window.location.search);
const empModeParam = (empUrlParams.get('mode') || '').toLowerCase();
window.IS_DEMO_MODE = window.IS_DEMO_MODE || ['demo', 'sandbox', 'readonly'].includes(empModeParam) || localStorage.getItem('explyra_demo_mode') === 'true';

const renderEmployeeDemoBanner = () => {
    if (!window.IS_DEMO_MODE) return;
    if (document.getElementById('demo-mode-banner-emp')) return;
    const dash = document.getElementById('dashboard-screen');
    if (!dash) return;

    const banner = document.createElement('div');
    banner.id = 'demo-mode-banner-emp';
    banner.className = 'mx-4 mt-3 mb-1 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-xs font-semibold flex items-center gap-2 shadow-sm';
    banner.innerHTML = '<i class="fa-solid fa-flask-vial"></i><span>Demo mode is active. Some actions are intentionally restricted.</span>';
    dash.insertBefore(banner, dash.firstChild);
};

const ensureFieldHint = (inputEl, hintId) => {
    if (!inputEl) return null;
    let hint = document.getElementById(hintId);
    if (!hint) {
        hint = document.createElement('p');
        hint.id = hintId;
        hint.className = 'mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400';
        inputEl.insertAdjacentElement('afterend', hint);
    }
    return hint;
};

const setFieldValidationState = (inputEl, isValid, message, hintId) => {
    if (!inputEl) return;
    inputEl.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    inputEl.classList.toggle('border-red-400', !isValid);
    inputEl.classList.toggle('focus:ring-red-400/30', !isValid);
    const hint = ensureFieldHint(inputEl, hintId);
    if (hint) {
        hint.textContent = message || '';
        hint.classList.toggle('text-red-500', !isValid && !!message);
        hint.classList.toggle('text-slate-500', isValid || !message);
    }
};

const safeWithRetry = (operation, options) => (typeof window.withRetry === 'function' ? window.withRetry(operation, options) : operation());
const safeWithTimeout = (promise, timeoutMs, timeoutMessage) => (typeof window.withTimeout === 'function' ? window.withTimeout(promise, timeoutMs, timeoutMessage) : promise);
const authMessage = (error, fallback) => (typeof window.getFriendlyAuthMessage === 'function' ? window.getFriendlyAuthMessage(error, fallback) : (fallback || error?.message || 'Request failed.'));

const validateEnterprisePassword = (password) => {
    const value = String(password || '');
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Password must include at least 1 uppercase letter.';
    if (!/[0-9]/.test(value)) return 'Password must include at least 1 number.';
    if (!/[^A-Za-z0-9]/.test(value)) return 'Password must include at least 1 special character.';
    return null;
};

const setAuthButtonsLoading = (isLoading, activeLabel = 'Processing...') => {
    const buttons = Array.from(document.querySelectorAll('#login-form button, #google-signin-container button'));
    buttons.forEach((button) => {
        if (!button.dataset.defaultHtml) {
            button.dataset.defaultHtml = button.innerHTML;
        }
        button.disabled = !!isLoading;
    });

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = isLoading
            ? `<i class="fa-solid fa-circle-notch fa-spin"></i> ${activeLabel}`
            : (loginBtn.dataset.defaultHtml || 'Sign In');
    }
};

const initAuthFieldValidation = () => {
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');

    loginEmail?.addEventListener('input', () => {
        const isValid = /.+@.+\..+/.test((loginEmail.value || '').trim());
        setFieldValidationState(loginEmail, isValid, isValid ? '' : 'Enter a valid work email address.', 'login-email-hint');
    });

    loginPassword?.addEventListener('input', () => {
        const isValid = String(loginPassword.value || '').length >= 6;
        setFieldValidationState(loginPassword, isValid, isValid ? '' : 'Use at least 6 characters for sign-in.', 'login-password-hint');
    });

    signupPassword?.addEventListener('input', () => {
        const error = validateEnterprisePassword(signupPassword.value || '');
        setFieldValidationState(signupPassword, !error, error || 'Strong password looks good.', 'signup-password-hint');
    });

    signupEmail?.addEventListener('input', () => {
        const isValid = /.+@.+\..+/.test((signupEmail.value || '').trim());
        setFieldValidationState(signupEmail, isValid, isValid ? '' : 'Use a valid company email to activate account.', 'signup-email-hint');
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthFieldValidation);
} else {
    initAuthFieldValidation();
}

if (window.__empAuthInitialized) {
    console.info('[emp-auth] Initialization already completed, skipping duplicate listener setup.');
} else {
    window.__empAuthInitialized = true;

// The requested Employee Architecture logic
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const snap = await safeWithRetry(
                () => safeWithTimeout(getDocs(q), 12000, 'User lookup timed out. Please retry.'),
                { maxRetries: 2 }
            );

            if (!snap.empty) {
                window.userData = snap.docs[0].data() || {};
                window.userData.docId = snap.docs[0].id; // store docId for updates
                window.companyId = window.userData.companyId;
                window.currentUser = user;

                // --- GOOGLE DRIVE CLOUD SYNC ---
                if (window.GDriveService) {
                    window.GDriveService.setOnStateChange(async (isConnected) => {
                        try {
                            const { updateDoc, doc } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
                            await updateDoc(doc(window.db, "users", window.userData.docId), { gdriveConnected: isConnected });
                            console.log("Employee GDrive state synced to cloud.");
                        } catch (e) {
                            console.error("GDrive cloud sync failed:", e);
                        }
                    });

                    if (window.userData.gdriveConnected) {
                        window.GDriveService.restoreConnection(true);
                    }
                }

                try {
                    const compSnap = await safeWithRetry(
                        () => safeWithTimeout(getDoc(doc(db, "companies", window.companyId)), 10000, 'Company status check timed out.'),
                        { maxRetries: 1 }
                    );
                    if (compSnap.exists() && compSnap.data().status === "suspended") {
                        window.showToast("Your company account is suspended. Please contact Explyra Support.", "error");
                        auth.signOut();
                        return;
                    }
                } catch (e) {
                    console.error("Error checking company status:", e);
                }

                // --- 2FA CHECK ---
                if (window.userData.twoFactorEnabled && sessionStorage.getItem('explyra_2fa_verified') !== (window.userData.twoFactorPin || 'true')) {
                    document.getElementById('modal-2fa-verify').classList.remove('hidden');
                    return; // Stop here, wait for 2FA
                }

                showEmployeeDashboard();
            } else {
                // Don't sign out Explyra internal admins — they have no entry in `users`
                if (user.email.toLowerCase() === 'explyra@gmail.com' || user.email.toLowerCase().endsWith('@explyra.com')) {
                    console.log('[Auth] Explyra admin detected on emp portal, skipping.');
                } else {
                    window.showToast("User record not found. Contact Admin.", "error");
                    auth.signOut();
                }
            }
        } catch (error) {
            console.error("Auth state error:", error);
            window.showToast(authMessage(error, 'Unable to validate your session. Please sign in again.'), 'error');
        }
    } else {
        // User is signed out, show auth screen
        const authSc = document.getElementById('auth-screen');
        const dashSc = document.getElementById('dashboard-screen');
        if (authSc && dashSc) {
            authSc.classList.remove('hidden');
            dashSc.classList.add('hidden');
        }
    }
});
}

function showEmployeeDashboard() {
    const authSc = document.getElementById('auth-screen');
    const dashSc = document.getElementById('dashboard-screen');
    if (authSc && dashSc) {
        authSc.classList.add('hidden');
        dashSc.classList.remove('hidden');
    }
    renderEmployeeDemoBanner();

    // Update Profile UI
    const nameD = document.getElementById('user-name-display');
    if (nameD) nameD.textContent = window.userData.name || '';

    const roleD = document.getElementById('user-role-display');
    if (roleD) roleD.textContent = window.userData.role || 'Employee';

    // Update Sidebar Profile
    const sidebarName = document.getElementById('sidebar-user-name');
    if (sidebarName) sidebarName.textContent = window.userData.name || 'User';

    const sidebarRole = document.getElementById('sidebar-user-role');
    if (sidebarRole) sidebarRole.textContent = window.userData.role || 'Employee';

    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    if (sidebarAvatar) {
        if (window.userData.photoUrl) {
            sidebarAvatar.innerHTML = `<img src="${window.userData.photoUrl}" class="w-full h-full object-cover rounded-full">`;
        } else {
            const firstLetter = (window.userData.name || 'U').charAt(0).toUpperCase();
            sidebarAvatar.innerHTML = `<span class="text-xs font-bold">${firstLetter}</span>`;
        }
    }

    const avContainer = document.getElementById('header-profile-avatar');
    if (avContainer) {
        if (window.userData.photoUrl) {
            avContainer.innerHTML = `<img src="${window.userData.photoUrl}" class="w-full h-full object-cover">`;
        } else {
            const firstLetter = (window.userData.name || 'U').charAt(0).toUpperCase();
            avContainer.innerHTML = `<span class="text-xs font-bold text-gray-400">${firstLetter}</span>`;
        }
    }

    // Load Features
    loadCompanyBranding();

    if (window.toggleMode) {
        window.toggleMode('company'); // will call fetchExpenses
    } else if (window.fetchEmpTasks) window.fetchEmpTasks();
    if (window.initNotifications) window.initNotifications();
    console.log("Employee Dashboard Loaded for:", window.userData.name);

    // Role handling for managers (extra manager view)
    if (window.userData.role === "MANAGER" || window.userData.role === "FINANCE_MANAGER") {
        if (window.initManagerTasksView) window.initManagerTasksView();
    }
}

window.loadCompanyBranding = async () => {
    if (!window.companyId) return;
    try {
        const db = window.db;
        // 1. Try settings/branding first
        const brandingRef = doc(db, "companies", window.companyId, "settings", "branding");
        const brandingSnap = await getDoc(brandingRef);

        if (brandingSnap.exists()) {
            const data = brandingSnap.data();
            applyBranding(data);
        } else {
            // 2. Fallback to company doc
            const cmpRef = doc(db, "companies", window.companyId);
            const cmpSnap = await getDoc(cmpRef);
            if (cmpSnap.exists()) {
                applyBranding(cmpSnap.data());
            }
        }
    } catch (e) {
        console.error("Error loading branding:", e);
    }
};

function applyBranding(data) {
    if (!data) return;

    const loginName = document.getElementById("login-company-name");
    if (loginName && data.companyName) loginName.innerText = data.companyName;
    else if (loginName && data.name) loginName.innerText = data.name;

    const headerName = document.getElementById("header-company-name");
    if (headerName) {
        const name = data.companyName || data.name || "Explyra";
        headerName.innerHTML = name.replace(/(\S+)/, '$1 <span class="text-green-600">Expense</span>');
    }

    const logoUrl = data.logo;
    if (logoUrl) {
        const loginImg = document.getElementById("login-logo-img");
        const loginFallback = document.getElementById("login-logo-fallback");
        if (loginImg) {
            loginImg.src = logoUrl;
            loginImg.classList.remove("hidden");
            if (loginFallback) loginFallback.classList.add("hidden");
        }

        const headerImg = document.getElementById("header-logo-img");
        const headerFallback = document.getElementById("header-logo-fallback");
        if (headerImg) {
            headerImg.src = logoUrl;
            headerImg.classList.remove("hidden");
            if (headerFallback) headerFallback.classList.add("hidden");
        }
    }
}


// ---------------- Login / Signup Flows ---------------- 
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    setAuthButtonsLoading(true, 'Authenticating...');
    try {
        await safeWithRetry(
            () => safeWithTimeout(signInWithEmailAndPassword(auth, email, pass), 12000, 'Login request timed out.'),
            { maxRetries: 1 }
        );
        window.showToast('Login successful!', 'success');
    } catch (err) {
        window.showToast(authMessage(err, 'Login failed. Please try again.'), 'error');
    } finally {
        setAuthButtonsLoading(false);
    }
});

window.handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    try {
        setAuthButtonsLoading(true, 'Opening Google...');
        const result = await safeWithRetry(
            () => safeWithTimeout(signInWithPopup(auth, provider), 15000, 'Google sign-in timed out.'),
            { maxRetries: 1 }
        );
        const user = result.user;

        const q = query(collection(db, "users"), where("email", "==", user.email));
        let snap = await safeWithTimeout(getDocs(q), 12000, 'Account lookup timed out.');

        if (snap.empty) {
            try {
                const allUsersSnap = await safeWithTimeout(getDocs(collection(db, "users")), 12000, 'Account verification timed out.');
                const foundDoc = allUsersSnap.docs.find(doc => doc.data().email?.trim().toLowerCase() === user.email.trim().toLowerCase());
                if (foundDoc) {
                    snap = { empty: false, docs: [foundDoc] };
                    await updateDoc(doc(db, "users", foundDoc.id), { email: user.email });
                }
            } catch (e) { console.error(e); }
        }

        if (snap.empty) {
            await signOut(auth);
            window.showToast(`Access Denied: Email [${user.email}] not registered.`, "error");
            return;
        }

        const docId = snap.docs[0].id;
        await updateDoc(doc(db, "users", docId), {
            uid: user.uid,
            updatedAt: serverTimestamp(),
            status: 'ACTIVE',
            authProvider: 'google'
        });

        window.showToast("Login successful!", "success");
    } catch (error) {
        window.showToast(authMessage(error, 'Google sign-in failed. Please try again.'), "error");
    } finally {
        setAuthButtonsLoading(false);
    }
};

window.handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('openid');
    provider.addScope('email');
    provider.addScope('profile');

    try {
        setAuthButtonsLoading(true, 'Opening Microsoft...');
        const result = await safeWithRetry(
            () => safeWithTimeout(signInWithPopup(auth, provider), 15000, 'Microsoft sign-in timed out.'),
            { maxRetries: 1 }
        );
        const user = result.user;

        const q = query(collection(db, "users"), where("email", "==", user.email));
        let snap = await safeWithTimeout(getDocs(q), 12000, 'Account lookup timed out.');

        if (snap.empty) {
            try {
                const allUsersSnap = await safeWithTimeout(getDocs(collection(db, "users")), 12000, 'Account verification timed out.');
                const normalizedEmail = (user.email || '').trim().toLowerCase();
                const foundDoc = allUsersSnap.docs.find(d => (d.data().email || '').trim().toLowerCase() === normalizedEmail);
                if (foundDoc) {
                    snap = { empty: false, docs: [foundDoc] };
                    await updateDoc(doc(db, "users", foundDoc.id), { email: user.email });
                }
            } catch (e) { console.error(e); }
        }

        if (snap.empty) {
            await signOut(auth);
            window.showToast(`Access Denied: Email [${user.email}] not registered.`, "error");
            return;
        }

        const docId = snap.docs[0].id;
        await updateDoc(doc(db, "users", docId), {
            uid: user.uid,
            updatedAt: serverTimestamp(),
            status: 'ACTIVE',
            authProvider: 'microsoft'
        });

        window.showToast("Login successful!", "success");
    } catch (error) {
        window.showToast(authMessage(error, 'Microsoft sign-in failed. Please try again.'), "error");
    } finally {
        setAuthButtonsLoading(false);
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
        if (googleBtn) googleBtn.classList.add('hidden');
    } else {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginFooter.classList.remove('hidden');
        signupFooter.classList.add('hidden');
        if (googleBtn) googleBtn.classList.remove('hidden');
    }
};

window.handleAccountActivation = async (e) => {
    e.preventDefault();
    if (window.IS_DEMO_MODE) {
        window.showToast('Account activation is disabled in demo mode.', 'warning');
        return;
    }
    const email = (document.getElementById('signup-email').value || '').trim().toLowerCase();
    const pass = document.getElementById('signup-password').value || '';
    const btn = document.getElementById('signup-btn');

    if (!email || !pass) return window.showToast("Please fill in all fields", "error");
    const passwordError = validateEnterprisePassword(pass);
    if (passwordError) return window.showToast(passwordError, "warning");

    const originalBtnContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Activating...';
    btn.disabled = true;

    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const snap = await safeWithRetry(
            () => safeWithTimeout(getDocs(q), 12000, 'Activation lookup timed out.'),
            { maxRetries: 1 }
        );

        if (snap.empty) throw new Error("Email not found in employee database.");

        const userDoc = snap.docs[0];
        if (userDoc.data().uid) throw new Error("Account already activated. Please login.");

        const userCred = await safeWithRetry(
            () => safeWithTimeout(createUserWithEmailAndPassword(auth, email, pass), 15000, 'Account activation timed out.'),
            { maxRetries: 1 }
        );

        await safeWithTimeout(updateDoc(doc(db, "users", userDoc.id), {
            uid: userCred.user.uid,
            updatedAt: serverTimestamp(),
            status: 'ACTIVE'
        }), 12000, 'Profile update timed out.');

        window.showToast("Account activated successfully!", "success");
    } catch (err) {
        window.showToast(authMessage(err, 'Unable to activate account right now.'), "error");
    } finally {
        btn.innerHTML = originalBtnContent;
        btn.disabled = false;
    }
};

window.forgotPassword = async () => {
    try {
        const email = await window.showInputPromise("Reset Password", "Enter your corporate email:", "user@brandname.com", "email");
        if (email) {
            await sendPasswordResetEmail(auth, email);
            window.showToast('Password reset email sent!', 'success');
        }
    } catch (e) {
        window.showToast(authMessage(e, 'Unable to send reset email right now.'), "error");
    }
};

window.verify2FAPin = () => {
    const enteredPin = document.getElementById('verify-2fa-pin').value;
    
    if (!window.userData || !window.userData.twoFactorPin) {
        window.showToast("Configuration error. Please login again.", "error");
        return;
    }

    if (enteredPin === window.userData.twoFactorPin) {
        sessionStorage.setItem('explyra_2fa_verified', window.userData.twoFactorPin);
        document.getElementById('modal-2fa-verify').classList.add('hidden');
        showEmployeeDashboard();
        window.showToast("Identity verified!", "success");
    } else {
        window.showToast("Incorrect PIN. Please try again.", "error");
        document.getElementById('verify-2fa-pin').value = '';
    }
};

window.handleLogout = async () => {
    if (await window.showInputPromise("Logout", "Are you sure you want to logout?", "", "none")) {
        sessionStorage.removeItem('explyra_2fa_verified'); // Clear 2FA on logout
        signOut(auth);
        window.showToast('Logged out successfully', 'info');
        window.location.reload();
    }
};
