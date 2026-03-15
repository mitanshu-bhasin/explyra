/**
 * Explyra Learning - Firebase Auth Sync
 * Include this on course pages to persist the Firebase user's display name
 * into localStorage so certificates reference the correct name.
 *
 * Usage: <script type="module" src="../scripts/auth-sync.js"></script>
 */
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = window.EXPLYRA_CONFIG?.firebase || {
    apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9"
};

// Avoid duplicate app initialization
const app = getApps().find(a => a.name === 'learning')
    || initializeApp(firebaseConfig, 'learning');
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    const navAuthArea = document.getElementById('course-auth-nav');
    if (user) {
        const name = user.displayName || user.email.split('@')[0];
        // Save for certificate generation
        localStorage.setItem('explyra_user_name', name);
        // Update nav UI if element exists
        if (navAuthArea) {
            const initial = name[0].toUpperCase();
            navAuthArea.innerHTML = `
                <div style="display:flex; align-items:center; gap:.6rem; background:var(--bg3); border:1px solid var(--bdr2); border-radius:100px; padding:.3rem .9rem .3rem .3rem;">
                    <div style="width:26px; height:26px; border-radius:50%; background:var(--blue); color:#fff; font-size:.7rem; font-weight:700; display:flex; align-items:center; justify-content:center;">${initial}</div>
                    <span style="font-size:.82rem; font-weight:600; color:var(--ink2);">${name}</span>
                </div>
            `;
        }
    } else {
        // Clear cached name on logout
        localStorage.removeItem('explyra_user_name');
        // Redirect unauthenticated users back to login
        // Uncomment the line below to enforce auth on course pages
        // window.location.href = '../index.html';
    }
});

// Expose signOut globally for nav buttons
window.__learningAuth = auth;
window.__learningSignOut = () => signOut(auth).then(() => window.location.href = '../index.html');
