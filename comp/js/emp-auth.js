// emp-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

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
const storage = getStorage(app);

// Globals attached to window for other modules
window.auth = auth;
window.db = db;
window.storage = storage;

const tenantCompanyFromPath = window.ExplyraTenant?.getCompanyIdFromPath() || null;
if (tenantCompanyFromPath) {
    window.companyId = tenantCompanyFromPath;
    document.addEventListener('DOMContentLoaded', () => {
        window.ExplyraTenant?.applyTenantLinkTransform({ companyId: tenantCompanyFromPath, forcePrefix: true });
    });
}

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

const EMP_PROFILE_CACHE_KEY = 'explyra_emp_profile_cache_v1';

const isLikelyFirestoreNetworkError = (error) => {
    const code = String(error?.code || '').toLowerCase();
    const message = String(error?.message || '').toLowerCase();
    return (
        code.includes('network') ||
        code.includes('unavailable') ||
        code.includes('deadline') ||
        message.includes('fetch') ||
        message.includes('listen/channel') ||
        message.includes('offline')
    );
};

const saveCachedEmpProfile = (profile) => {
    if (!profile || typeof localStorage === 'undefined') return;
    try {
        const payload = {
            name: profile.name || '',
            role: profile.role || 'EMPLOYEE',
            companyId: profile.companyId || null,
            photoUrl: profile.photoUrl || '',
            docId: profile.docId || null,
            cachedAt: Date.now()
        };
        localStorage.setItem(EMP_PROFILE_CACHE_KEY, JSON.stringify(payload));
    } catch (_) {}
};

const loadCachedEmpProfile = () => {
    if (typeof localStorage === 'undefined') return null;
    try {
        const raw = localStorage.getItem(EMP_PROFILE_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        return parsed;
    } catch (_) {
        return null;
    }
};

const recoverWithOfflineProfile = (authUser, reasonError) => {
    const urlCompanyId = window.ExplyraTenant?.getCompanyIdFromPath() || null;
    const cached = loadCachedEmpProfile();
    const fallbackName = authUser?.displayName || (authUser?.email ? authUser.email.split('@')[0] : 'User');

    window.userData = {
        name: cached?.name || fallbackName,
        role: cached?.role || 'EMPLOYEE',
        companyId: urlCompanyId || cached?.companyId || window.companyId || null,
        photoUrl: authUser?.photoURL || cached?.photoUrl || '',
        docId: cached?.docId || null,
        offlineMode: true
    };
    window.companyId = window.userData.companyId;
    window.currentUser = authUser;
    window.delegateSession = null;
    showEmployeeDashboard();
    window.showToast('Network issue detected. Dashboard loaded in safe mode.', 'warning');
    console.warn('[emp-auth] Recovered with offline profile due to Firestore failure:', reasonError);
};

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

const setPortalVisibility = (showDashboard) => {
    const authSc = document.getElementById('auth-screen');
    const dashSc = document.getElementById('dashboard-screen');
    if (!authSc || !dashSc) return;

    authSc.style.display = showDashboard ? 'none' : 'flex';
    dashSc.style.display = showDashboard ? 'flex' : 'none';

    if (showDashboard) {
        authSc.classList.add('hidden');
        dashSc.classList.remove('hidden');
    } else {
        authSc.classList.remove('hidden');
        dashSc.classList.add('hidden');
    }
};

const fallbackToAuthScreen = async (reason) => {
    console.warn('[emp-auth] Falling back to auth screen:', reason);
    setPortalVisibility(false);
    try {
        if (auth.currentUser) {
            await signOut(auth);
        }
    } catch (signOutErr) {
        console.error('[emp-auth] Sign out during fallback failed:', signOutErr);
    }
};

const ensurePortalScreenVisible = () => {
    const authSc = document.getElementById('auth-screen');
    const dashSc = document.getElementById('dashboard-screen');
    if (!authSc || !dashSc) return;

    const authHidden = authSc.classList.contains('hidden');
    const dashHidden = dashSc.classList.contains('hidden');
    if (authHidden && dashHidden) {
        if (auth.currentUser && window.userData) {
            setPortalVisibility(true);
        } else {
            setPortalVisibility(false);
        }
    }
};

const ensureDashboardShellVisible = () => {
    const dashSc = document.getElementById('dashboard-screen');
    const mainDash = document.getElementById('main-view-dashboard');
    const mainMsg = document.getElementById('main-view-messages');
    const sectionClaims = document.getElementById('section-claims');
    const sectionTasks = document.getElementById('section-tasks');
    const sectionFinancials = document.getElementById('section-financials');
    const sectionScheduler = document.getElementById('section-scheduler');
    const btnClaims = document.getElementById('btn-view-claims');

    if (dashSc) {
        dashSc.classList.remove('hidden');
        dashSc.style.display = 'flex';
    }
    if (mainDash) {
        mainDash.classList.remove('hidden');
        mainDash.classList.add('flex-1', 'overflow-y-auto');
        mainDash.style.display = 'block';
        mainDash.style.visibility = 'visible';
    }
    if (mainMsg) {
        mainMsg.classList.add('hidden');
        mainMsg.classList.remove('flex-1', 'flex', 'flex-col');
        mainMsg.style.display = 'none';
    }

    const allSectionsHidden = [sectionClaims, sectionTasks, sectionFinancials, sectionScheduler]
        .filter(Boolean)
        .every((el) => el.classList.contains('hidden'));

    if (allSectionsHidden && sectionClaims) {
        sectionClaims.classList.remove('hidden');
        sectionClaims.style.display = '';
        if (btnClaims) {
            btnClaims.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnClaims.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
    }

    [sectionClaims, sectionTasks, sectionFinancials, sectionScheduler].forEach((section) => {
        if (!section) return;
        section.style.display = section.classList.contains('hidden') ? 'none' : '';
    });
};

const scheduleDashboardShellRecovery = () => {
    [0, 80, 250, 700, 1400].forEach((delay) => {
        setTimeout(() => {
            try {
                ensureDashboardShellVisible();
            } catch (_) {}
        }, delay);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(ensurePortalScreenVisible, 1200);
    });
} else {
    setTimeout(ensurePortalScreenVisible, 1200);
}
window.addEventListener('load', () => {
    setTimeout(ensurePortalScreenVisible, 1800);
});

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
    window.__empAuthHeartbeat = Date.now();
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
                saveCachedEmpProfile(window.userData);
                const urlCompanyId = window.ExplyraTenant?.getCompanyIdFromPath() || null;
                if (urlCompanyId && window.userData.companyId && urlCompanyId !== window.userData.companyId) {
                    window.showToast('Company access mismatch. Please sign in using your company link.', 'error');
                    auth.signOut();
                    return;
                }
                window.companyId = urlCompanyId || window.userData.companyId;
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
                    setPortalVisibility(true);
                    const modal2fa = document.getElementById('modal-2fa-verify');
                    if (modal2fa) {
                        modal2fa.classList.remove('hidden');
                        modal2fa.style.display = 'flex';
                    }
                    return; // Stop here, wait for 2FA
                }

                showEmployeeDashboard();
            } else {
                // Don't sign out Explyra internal admins — they have no entry in `users`
                const emailLower = (user.email || '').toLowerCase();
                if (emailLower === 'explyras@gmail.com' || emailLower === 'explyra@gmail.com' || emailLower.endsWith('@explyra.com')) {
                    window.userData = window.userData || {
                        name: 'Explyra System Admin',
                        role: 'ADMIN',
                        companyId: 'EXPLYRA'
                    };
                    window.companyId = window.userData.companyId || 'EXPLYRA';
                    window.currentUser = user;
                    window.delegateSession = null;
                    console.log('[Auth] Explyra admin detected on emp portal, continuing with admin fallback profile.');
                    showEmployeeDashboard();
                } else {
                    window.showToast("User record not found. Contact Admin.", "error");
                    auth.signOut();
                }
            }
        } catch (error) {
            console.error("Auth state error:", error);
            if (user && isLikelyFirestoreNetworkError(error)) {
                recoverWithOfflineProfile(user, error);
                return;
            }
            window.showToast(authMessage(error, 'Unable to validate your session. Please sign in again.'), 'error');
            await fallbackToAuthScreen('auth-state-validation-failed');
        }
    } else {
        // User is signed out, show auth screen
        setPortalVisibility(false);
    }
});
}

function showEmployeeDashboard() {
    window.__empAuthHeartbeat = Date.now();
    setPortalVisibility(true);
    ensureDashboardShellVisible();
    scheduleDashboardShellRecovery();
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

    const safeInit = (label, fn) => {
        try {
            fn();
        } catch (err) {
            console.error(`[emp-auth] ${label} failed:`, err);
        }
    };

    safeInit('loadCompanyBranding', () => loadCompanyBranding());
    safeInit('tenant-link-transform', () => window.ExplyraTenant?.applyTenantLinkTransform({ companyId: window.companyId, forcePrefix: true }));
    safeInit('primary-data-load', () => {
        if (window.toggleMode) {
            window.toggleMode('company');
        } else if (window.fetchEmpTasks) {
            window.fetchEmpTasks();
        }
    });
    safeInit('notifications', () => {
        if (window.initNotifications) window.initNotifications();
    });
    safeInit('manager-view-init', () => {
        if (window.userData.role === "MANAGER" || window.userData.role === "FINANCE_MANAGER") {
            if (window.initManagerTasksView) window.initManagerTasksView();
        }
    });

    ensureDashboardShellVisible();
    console.log("Employee Dashboard Loaded for:", window.userData.name);
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

if (tenantCompanyFromPath) {
    window.companyId = tenantCompanyFromPath;
    window.loadCompanyBranding();
}

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
    const confirm = document.getElementById('confirm-password').value || '';
    const btn = document.getElementById('signup-btn');

    if (!email || !pass || !confirm) return window.showToast("Please fill in all fields", "error");
    if (pass !== confirm) return window.showToast("Passwords do not match", "warning");
    
    // Check for strong password (all 3 bars)
    if ((window.currentPasswordStrength || 0) < 3) {
        return window.showToast("Password is not strong enough. Please follow all rules.", "warning");
    }

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
