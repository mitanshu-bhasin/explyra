// emp-auth.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, OAuthProvider, signInWithPopup, deleteUser } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, serverTimestamp, limit } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = window.EXPLYRA_CONFIG?.firebase || {
    apiKey: "AIzaSyAoDQhHlUbiUl57azSrst5M2eGDeQ8EydA",
    authDomain: "explyras.firebaseapp.com",
    databaseURL: "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9",
    measurementId: "G-TFBZ5GZ22C"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);
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

window.resolveUserIdentity = async (identifier) => {
    if (!identifier) return null;
    let input = identifier.toLowerCase().trim();
    const devEmails = ['explyras@gmail.com', 'explyra@gmail.com'];
    if (devEmails.includes(input)) {
        return {
            email: input,
            name: 'Explyra Developer',
            role: 'ADMIN',
            status: 'ACTIVE',
            companyId: 'EXPLYRA'
        };
    }

    // 1. Check Primary Email
    try {
        const qEmail = query(collection(db, "users"), where("email", "==", input), limit(1));
        const snapEmail = await getDocs(qEmail);
        if (!snapEmail.empty) return snapEmail.docs[0].data();
    } catch (e) {}

    // 2. Check Phone (Multi-Format)
    const digits = input.replace(/\D/g, '');
    if (digits.length >= 10 && digits.length <= 13) {
        const formats = [];
        if (digits.length === 10) {
            formats.push('+91' + digits, '91' + digits, digits);
        } else if (digits.length === 12 && digits.startsWith('91')) {
            formats.push('+' + digits, digits, digits.substring(2));
        } else {
            formats.push('+' + digits, digits);
        }

        for (const fmt of [...new Set(formats)]) {
            try {
                // Check 'phone' field
                const qPhone = query(collection(db, "users"), where("phone", "==", fmt), limit(1));
                const snapPhone = await getDocs(qPhone);
                if (!snapPhone.empty) return snapPhone.docs[0].data();

                // Check 'altPhone' field
                const qAltPhone = query(collection(db, "users"), where("altPhone", "==", fmt), limit(1));
                const snapAltPhone = await getDocs(qAltPhone);
                if (!snapAltPhone.empty) return snapAltPhone.docs[0].data();
            } catch (e) {}
        }
    }

    // 3. Check Alternative Email
    try {
        const qAltEmail = query(collection(db, "users"), where("altEmail", "==", input), limit(1));
        const snapAltEmail = await getDocs(qAltEmail);
        if (!snapAltEmail.empty) return snapAltEmail.docs[0].data();
    } catch (e) {}

    return null;
};

/**
 * Resolve identifier (email or phone) to primary email
 */
window.resolveEmailToPrimary = async function(identifier) {
    const user = await window.resolveUserIdentity(identifier);
    if (user) return user.email;
    return identifier; 
};

window.showStep = function(stepId) {
    const currentStep = document.querySelector('.step-content.active');
    const nextStep = document.getElementById(stepId);
    
    if (currentStep) {
        currentStep.classList.remove('active');
        currentStep.classList.add('fade-out');
        setTimeout(() => currentStep.classList.remove('fade-out'), 500);
    }
    if (nextStep) nextStep.classList.add('active');
};

window.backToIdentifier = () => window.showStep('step-identifier');

window.handleIdentifierNext = async function(e) {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value.trim();
    if (!identifier) return showToast('Please enter an identifier', 'warning');

    const loadingStep = document.getElementById('step-loading');
    loadingStep.classList.add('active');

    try {
        const resolvedEmail = await window.resolveEmailToPrimary(identifier);
        await new Promise(r => setTimeout(r, 800));

        // Get user details to see if active or pending
        const q = query(collection(db, "users"), where("email", "==", resolvedEmail));
        const snap = await getDocs(q);
        loadingStep.classList.remove('active');

        if (snap.empty) {
            const devEmails = ['explyras@gmail.com', 'explyra@gmail.com'];
            if (devEmails.includes(resolvedEmail.toLowerCase())) {
                document.getElementById('display-resolved-email').textContent = resolvedEmail;
                window.showStep('step-password');
                return;
            }
            window.showToast("Account not found.", "error");
            return;
        }

        const userData = snap.docs[0].data();
        document.getElementById('display-resolved-email').textContent = resolvedEmail;
        
        if (userData.status === 'ACTIVE' || userData.uid) {
            window.showStep('step-password');
        } else {
            document.getElementById('signup-email').value = resolvedEmail;
            window.showStep('step-activation');
        }
    } catch (err) {
        showToast(err.message, 'error');
        document.getElementById('step-loading').classList.remove('active');
    }
};

window.handleAccountActivation = async function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (password !== confirmPass) {
        return showToast("Passwords do not match!", "error");
    }

    setAuthButtonsLoading(true, 'Activating...');
    try {
        const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
        const user = userCredential.user;

        // Update user document in Firestore
        const q = query(collection(db, "users"), where("email", "==", email), limit(1));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
            const userDocRef = doc(db, "users", snap.docs[0].id);
            await updateDoc(userDocRef, {
                uid: user.uid,
                status: 'ACTIVE',
                updatedAt: serverTimestamp()
            });
        }

        showToast("Account activated successfully! Logging in...", "success");
        // Firebase automatically logs in the user after creation
    } catch (err) {
        showToast(authMessage(err, "Activation failed. Try again."), "error");
    } finally {
        setAuthButtonsLoading(false);
    }
};

window.backToIdentifier = () => window.showStep('step-identifier');

window.handleAccountActivationVerify = async function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('activation-email-input').value.trim().toLowerCase();
    if (!email) return showToast('Please enter your email', 'warning');

    const loadingStep = document.getElementById('step-loading');
    loadingStep.classList.add('active');

    try {
        const q = query(collection(db, "users"), where("email", "==", email), limit(1));
        const snap = await getDocs(q);
        
        await new Promise(r => setTimeout(r, 800));
        loadingStep.classList.remove('active');

        if (snap.empty) {
            return showToast("Account not found. Contact your administrator to be added.", "error");
        }

        const userData = snap.docs[0].data();
        if (userData.status === 'ACTIVE' || userData.uid) {
            showToast("This account is already active. Please sign in.", "info");
            showStep('step-identifier');
            document.getElementById('login-identifier').value = email;
            return;
        }

        // Proceed to password creation
        document.getElementById('signup-email').value = email;
        showStep('step-activation');
    } catch (err) {
        showToast(err.message, 'error');
        loadingStep.classList.remove('active');
    }
};

window.handleFinalLogin = async function(e) {
    if (e) e.preventDefault();
    const displayEmailEl = document.getElementById('display-resolved-email');
    const email = displayEmailEl ? displayEmailEl.textContent : '';
    const loginPassEl = document.getElementById('login-password');
    const pass = loginPassEl ? loginPassEl.value : '';
    
    if (!email || !pass) return window.showToast('Please enter both email and password.', 'warning');

    if (typeof setAuthButtonsLoading === 'function') {
        setAuthButtonsLoading(true, 'Signing in...');
    }

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        window.showToast('Welcome back!', 'success');
    } catch (err) {
        console.error("Employee Login Error:", err);
        let msg = 'Invalid password. Please try again.';
        if (err.code === 'auth/user-not-found') msg = "User account not found.";
        else if (err.code === 'auth/wrong-password') msg = "Incorrect password.";
        else if (err.code === 'auth/network-request-failed') msg = "Network failure. Check your connection.";
        
        // Use authMessage if it exists, otherwise fallback to our built message
        const finalMsg = (typeof authMessage === 'function') ? authMessage(err, msg) : msg;
        window.showToast(finalMsg, 'error');
    } finally {
        if (typeof setAuthButtonsLoading === 'function') {
            setAuthButtonsLoading(false);
        }
    }
};

window.forgotPassword = () => {
    const currentId = document.getElementById('login-identifier').value.trim();
    if (currentId) document.getElementById('forgot-identifier').value = currentId;
    window.showStep('step-forgot-password');
    setTimeout(() => document.getElementById('forgot-identifier').focus(), 500);
};

window.handleForgotPasswordNext = async (e) => {
    if (e) e.preventDefault();
    const identifier = document.getElementById('forgot-identifier').value.trim();
    if(!identifier) return showToast('Please enter email or phone', 'warning');
    
    const loadingStep = document.getElementById('step-loading');
    loadingStep.classList.add('active');

    try {
        const user = await window.resolveUserIdentity(identifier);
        await new Promise(r => setTimeout(r, 800));
        loadingStep.classList.remove('active');

        if (!user) {
            showToast("Account not found.", "error");
            return;
        }

        document.getElementById('confirm-user-name').textContent = user.name || 'Explyra User';
        document.getElementById('confirm-user-email').textContent = user.email;
        document.getElementById('confirm-send-email').textContent = user.email;

        if (user.photoUrl) {
            const img = document.getElementById('confirm-avatar-img');
            img.src = user.photoUrl;
            img.classList.remove('hidden');
            document.getElementById('confirm-avatar-placeholder').classList.add('hidden');
        } else {
            document.getElementById('confirm-avatar-placeholder').classList.remove('hidden');
            document.getElementById('confirm-avatar-img').classList.add('hidden');
        }
        window.showStep('step-confirm-identity');
    } catch (err) {
        showToast(err.message, 'error');
        loadingStep.classList.remove('active');
    }
};

window.sendResetToConfirmedUser = async () => {
    const email = document.getElementById('confirm-user-email').textContent;
    const btn = document.getElementById('confirm-identity-btn');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

    try {
        await sendPasswordResetEmail(auth, email);
        showToast('Reset email sent!', 'success');
        setTimeout(() => window.backToIdentifier(), 2000);
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
};

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

const asDate = (value) => {
    if (!value) return null;
    if (value?.toDate) return value.toDate();
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const cleanupExpiredDelegateAccount = async (delegateDocId, delegateData, authUser) => {
    try {
        const delegationId = delegateData?.delegation?.delegationId;
        if (delegationId) {
            await updateDoc(doc(db, 'account_delegations', delegationId), {
                status: 'EXPIRED',
                expiredAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        }

        if (delegateDocId) {
            await updateDoc(doc(db, 'users', delegateDocId), {
                status: 'INACTIVE',
                delegationStatus: 'EXPIRED',
                updatedAt: serverTimestamp()
            });
        }

        if (authUser) {
            try {
                await deleteUser(authUser);
            } catch (err) {
                console.warn('Delegate auth self-delete failed', err);
            }
        }
    } catch (err) {
        console.error('Expired delegate cleanup failed', err);
    }
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

    // Don't override the messages view if it's currently active
    const isMessagesActive = mainMsg && !mainMsg.classList.contains('hidden');
    if (isMessagesActive) return;

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
                const signedInDoc = snap.docs[0];
                const signedInData = signedInDoc.data() || {};
                let resolvedUserData = { ...signedInData, docId: signedInDoc.id };
                const isDelegate = (signedInData.role || '').toUpperCase() === 'DELEGATE';
                if (isDelegate) {
                    const delegation = signedInData.delegation || {};
                    const expiry = asDate(delegation.expiresAt);
                    const isExpired = !expiry || expiry.getTime() <= Date.now();
                    const isActive = (delegation.status || '').toUpperCase() === 'ACTIVE';

                    if (!isActive || isExpired || !delegation.sourceUserDocId) {
                        await cleanupExpiredDelegateAccount(signedInDoc.id, signedInData, user);
                        await signOut(auth);
                        window.showToast('Delegated account expired. Ask owner to generate a new one.', 'warning');
                        return;
                    }

                    const sourceSnap = await safeWithRetry(
                        () => safeWithTimeout(getDoc(doc(db, 'users', delegation.sourceUserDocId)), 10000, 'Delegated source account lookup timed out.'),
                        { maxRetries: 1 }
                    );

                    if (!sourceSnap.exists()) {
                        await cleanupExpiredDelegateAccount(signedInDoc.id, signedInData, user);
                        await signOut(auth);
                        window.showToast('Delegate source account not found. Contact admin.', 'error');
                        return;
                    }

                    resolvedUserData = {
                        ...sourceSnap.data(),
                        docId: sourceSnap.id,
                        delegatedSession: true,
                        delegateAccount: {
                            delegateDocId: signedInDoc.id,
                            delegateUid: user.uid,
                            delegateEmail: user.email,
                            expiresAt: delegation.expiresAt,
                            delegationId: delegation.delegationId || null
                        }
                    };

                    window.delegateSession = {
                        delegateDocId: signedInDoc.id,
                        sourceUserDocId: sourceSnap.id,
                        expiresAt: delegation.expiresAt,
                        delegationId: delegation.delegationId || null
                    };
                } else {
                    window.delegateSession = null;
                }

                window.userData = resolvedUserData;
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
                    // Show the dashboard background first so auth-screen is hidden properly,
                    // then overlay the 2FA modal on top. Without this, the page is blank.
                    showEmployeeDashboard();
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
                    // Set mock data for internal admin to avoid crashes if they visit emp portal
                    window.userData = window.userData || {
                        name: 'Explyra System Admin',
                        role: 'ADMIN',
                        companyId: 'EXPLYRA'
                    };
                    window.companyId = window.userData.companyId || 'EXPLYRA';
                    window.currentUser = user;
                    window.delegateSession = null;
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
    const loginEmailInput = document.getElementById('login-email');
    const resolvedEmailEl = document.getElementById('display-resolved-email');
    const email = (loginEmailInput?.value || resolvedEmailEl?.textContent || '').trim();
    const pass = (document.getElementById('login-password')?.value || '').trim();

    if (!email) {
        window.showToast('Please enter your email first.', 'warning');
        return;
    }
    if (!pass) {
        window.showToast('Please enter your password.', 'warning');
        return;
    }

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
        const { setPersistence, browserLocalPersistence } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js");
        await setPersistence(auth, browserLocalPersistence);

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
            const devEmails = ['explyras@gmail.com', 'explyra@gmail.com'];
            if (!devEmails.includes((user.email || '').toLowerCase())) {
                await signOut(auth);
                window.showToast(`Access Denied: Email [${user.email}] not registered.`, "error");
                return;
            }
        }

        if (!snap.empty) {
            const docId = snap.docs[0].id;
            await updateDoc(doc(db, "users", docId), {
                uid: user.uid,
                updatedAt: serverTimestamp(),
                status: 'ACTIVE',
                authProvider: 'google'
            });
        }

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
            const devEmails = ['explyras@gmail.com', 'explyra@gmail.com'];
            if (!devEmails.includes((user.email || '').toLowerCase())) {
                await signOut(auth);
                window.showToast(`Access Denied: Email [${user.email}] not registered.`, "error");
                return;
            }
        }

        if (!snap.empty) {
            const docId = snap.docs[0].id;
            await updateDoc(doc(db, "users", docId), {
                uid: user.uid,
                updatedAt: serverTimestamp(),
                status: 'ACTIVE',
                authProvider: 'microsoft'
            });
        }

        window.showToast("Login successful!", "success");
    } catch (error) {
        window.showToast(authMessage(error, 'Microsoft sign-in failed. Please try again.'), "error");
    } finally {
        setAuthButtonsLoading(false);
    }
};

window.toggleAuthMode = (mode) => {
    if (mode === 'signup') {
        const identifier = document.getElementById('login-identifier').value.trim();
        if (identifier) {
            // If they already typed an identifier, try to go to activation
            window.handleIdentifierNext({ preventDefault: () => {} });
        } else {
            window.showToast("Enter your email/phone to check activation status.", "info");
        }
    } else {
        window.backToIdentifier();
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
window.forgotPassword = () => {
    const currentId = document.getElementById('login-identifier').value.trim();
    if (currentId) document.getElementById('forgot-identifier').value = currentId;
    
    document.getElementById('step-identifier').classList.add('-translate-x-full', 'opacity-0', 'pointer-events-none');
    document.getElementById('step-password').classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
    const stepForgot = document.getElementById('step-forgot-password');
    stepForgot.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
    stepForgot.classList.add('translate-x-0', 'opacity-100');
};

window.handleForgotPasswordNext = async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('forgot-identifier').value.trim();
    if(!identifier) return window.showToast('Please enter your email or phone', 'warning');
    
    try {
        const loadingStep = document.getElementById('step-loading');
        if (loadingStep) {
            loadingStep.classList.remove('opacity-0', 'pointer-events-none');
            loadingStep.classList.add('opacity-100');
        }

        const user = await window.resolveUserIdentity(identifier);
        
        await new Promise(r => setTimeout(r, 800));

        if (loadingStep) {
            loadingStep.classList.remove('opacity-100');
            loadingStep.classList.add('opacity-0', 'pointer-events-none');
        }

        if (!user) {
            window.showToast("Account not found. Check the identifier entered.", "error");
            return;
        }

        // Populate Step 4
        document.getElementById('confirm-user-name').textContent = user.name || 'Explyra User';
        document.getElementById('confirm-user-email').textContent = user.email;
        document.getElementById('confirm-send-email').textContent = user.email;

        if (user.photoUrl) {
            document.getElementById('confirm-avatar-img').src = user.photoUrl;
            document.getElementById('confirm-avatar-img').classList.remove('hidden');
            document.getElementById('confirm-avatar-placeholder').classList.add('hidden');
        } else {
            document.getElementById('confirm-avatar-img').classList.add('hidden');
            document.getElementById('confirm-avatar-placeholder').classList.remove('hidden');
        }

        // Transition to Step 4
        document.getElementById('step-forgot-password').classList.add('-translate-x-full', 'opacity-0', 'pointer-events-none');
        const stepConfirm = document.getElementById('step-confirm-identity');
        stepConfirm.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
        stepConfirm.classList.add('translate-x-0', 'opacity-100');
    } catch (err) {
        console.error(err);
        window.showToast(err.message, 'error');
        const loadingStep = document.getElementById('step-loading');
        if (loadingStep) {
            loadingStep.classList.remove('opacity-100');
            loadingStep.classList.add('opacity-0', 'pointer-events-none');
        }
    }
};

window.backToIdentifier = () => {
    const steps = ['step-password', 'step-activation', 'step-confirm-identity', 'step-forgot-password'];
    steps.forEach(s => {
        const el = document.getElementById(s);
        if (el) {
            el.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
            el.classList.remove('translate-x-0', 'opacity-100');
        }
    });
    document.getElementById('step-identifier').classList.remove('-translate-x-full', 'opacity-0', 'pointer-events-none');
};

window.sendResetToConfirmedUser = async () => {
    const email = document.getElementById('confirm-user-email').textContent;
    const btn = document.getElementById('confirm-identity-btn');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

    try {
        await sendPasswordResetEmail(auth, email);
        window.showToast('Reset email sent to your primary email!', 'success');
        setTimeout(() => window.backToIdentifier(), 2000);
    } catch (err) {
        console.error(err);
        window.showToast(authMessage(err, 'Unable to send reset email.'), 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
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
