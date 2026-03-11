// ============================
// Firebase SDK Imports (CDN)
// ============================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ============================
// 🔧 Firebase Config
// Replace with your project values from Firebase Console → Project Settings
// ============================
const firebaseConfig = {
  apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
  authDomain: "explyras.firebaseapp.com",
  projectId: "explyras",
  storageBucket: "explyras.firebasestorage.app",
  messagingSenderId: "411853553644",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9",
  measurementId: "G-TFBZ5GZ22C"
};

const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ============================
// DOM References
// ============================
const $ = (id) => document.getElementById(id);
const loginScreen = $('login-screen');
const dashboard = $('dashboard');
const emailLoginForm = $('email-login-form');
const emailLoginBtn = $('email-login-btn');
const loginEmail = $('login-email');
const loginPassword = $('login-password');
const googleLoginBtn = $('google-login-btn');
const composeBtn = $('compose-btn');
const composeModal = $('compose-modal');
const closeCompose = $('close-compose');
const discardBtn = $('discard-btn');
const composeForm = $('compose-form');
const sendBtn = $('send-btn');
const emailList = $('email-list');
const emptyState = $('empty-state');
const loadingState = $('loading-state');
const logoutBtn = $('logout-btn');
const userAvatar = $('user-avatar');
const userName = $('user-name');
const userEmail = $('user-email');
const inboxCount = $('inbox-count');
const refreshBtn = $('refresh-btn');
const folderTitle = $('folder-title');
const folderSubtitle = $('folder-subtitle');
const emailDetailModal = $('email-detail-modal');
const detailSubject = $('detail-subject');
const detailFrom = $('detail-from');
const detailTime = $('detail-time');
const detailBody = $('detail-body');
const closeDetail = $('close-detail');
const toastContainer = $('toast-container');

// ============================
// State
// ============================
let currentUser = null;
let unsubscribeEmails = null;
let emails = [];
let currentFolder = 'inbox';

// ============================
// Auth State Listener
// ============================
onAuthStateChanged(authInstance, (user) => {
  if (user) {
    currentUser = user;
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    dashboard.classList.add('flex');

    userAvatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=6366f1&color=fff&bold=true&size=64`;
    userName.textContent = user.displayName || 'User';
    userEmail.textContent = user.email;

    loadEmails();
    setupAlias(user);
  } else {
    currentUser = null;
    loginScreen.classList.remove('hidden');
    dashboard.classList.add('hidden');
    dashboard.classList.remove('flex');
    if (unsubscribeEmails) unsubscribeEmails();
  }
});

// ============================
// Google Login
// ============================
googleLoginBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(authInstance, provider);
    if (!result.user.email.endsWith('@explyra.me')) {
      await signOut(authInstance);
      showToast('Login restricted to @explyra.me emails', 'error');
    }
  } catch (err) {
    console.error('Login failed:', err);
    showToast('Login failed. Please try again.', 'error');
  }
});

// ============================
// Email/Password Login
// ============================
emailLoginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const password = loginPassword.value;
  
  if (!email || !password) {
    showToast('Please enter both email and password', 'error');
    return;
  }

  if (!email.endsWith('@explyra.me')) {
    showToast('Only @explyra.me emails are allowed', 'error');
    return;
  }

  const originalText = emailLoginBtn.innerHTML;
  emailLoginBtn.innerHTML = `
    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
    Signing In…
  `;
  emailLoginBtn.disabled = true;

  try {
    await signInWithEmailAndPassword(authInstance, email, password);
  } catch (err) {
    console.error('Email login failed:', err);
    showToast(err.message || 'Login failed', 'error');
  } finally {
    emailLoginBtn.innerHTML = originalText;
    emailLoginBtn.disabled = false;
  }
});

// ============================
// Logout
// ============================
logoutBtn.addEventListener('click', async () => {
  await signOut(authInstance);
  showToast('Signed out successfully');
});

// ============================
// Load Emails (Real-time Firestore)
// ============================
function loadEmails() {
  showLoading(true);

  const q = query(
    collection(db, 'emails'),
    orderBy('timestamp', 'desc')
  );

  unsubscribeEmails = onSnapshot(q, (snapshot) => {
    emails = [];
    snapshot.forEach((doc) => {
      emails.push({ id: doc.id, ...doc.data() });
    });
    showLoading(false);
    renderEmails();
  }, (error) => {
    console.error('Firestore error:', error);
    showLoading(false);
    showToast('Failed to load emails', 'error');
  });
}

// ============================
// Render Email List
// ============================
function renderEmails() {
  const filtered = currentFolder === 'inbox'
    ? emails.filter((e) => e.folder !== 'sent')
    : emails.filter((e) => e.folder === 'sent');

  const unreadCount = filtered.filter((e) => !e.read).length;
  inboxCount.textContent = currentFolder === 'inbox' ? unreadCount : filtered.length;

  if (filtered.length === 0) {
    emailList.classList.add('hidden');
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
    return;
  }

  emptyState.classList.add('hidden');
  emptyState.classList.remove('flex');
  emailList.classList.remove('hidden');

  emailList.innerHTML = filtered
    .map(
      (email) => `
    <div class="email-row px-6 py-4 border-b border-white/[0.04] cursor-pointer flex items-start gap-4" data-email-id="${email.id}">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
        ${getInitials(email.from)}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-0.5">
          <span class="text-sm font-semibold ${email.read ? 'text-slate-400' : 'text-white'} truncate">${escapeHtml(extractName(email.from))}</span>
          <span class="text-[11px] text-slate-500 flex-shrink-0 ml-3 font-medium">${formatTime(email.timestamp)}</span>
        </div>
        <p class="text-[13px] ${email.read ? 'text-slate-500' : 'text-slate-200'} font-medium truncate">${escapeHtml(email.subject)}</p>
        <p class="text-xs text-slate-600 truncate mt-0.5 leading-relaxed">${escapeHtml((email.body || '').substring(0, 120))}</p>
      </div>
      ${!email.read ? '<div class="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0 mt-3 unread-dot"></div>' : ''}
    </div>
  `
    )
    .join('');
}

// ============================
// Email List Click (Event Delegation)
// ============================
emailList.addEventListener('click', (e) => {
  const row = e.target.closest('.email-row');
  if (!row) return;
  const id = row.dataset.emailId;
  const email = emails.find((em) => em.id === id);
  if (!email) return;
  showEmailDetail(email);
});

// ============================
// Email Detail Modal
// ============================
function showEmailDetail(email) {
  detailSubject.textContent = email.subject || '(No Subject)';
  detailFrom.textContent = `From: ${email.from}`;
  detailTime.textContent = formatTimeFull(email.timestamp);
  detailBody.textContent = email.body || '';
  emailDetailModal.classList.remove('hidden');
}

closeDetail.addEventListener('click', () => {
  emailDetailModal.classList.add('hidden');
});

emailDetailModal.addEventListener('click', (e) => {
  if (e.target === emailDetailModal) emailDetailModal.classList.add('hidden');
});

// ============================
// Folder Navigation
// ============================
document.querySelectorAll('[data-folder]').forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFolder = btn.dataset.folder;

    document.querySelectorAll('[data-folder]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    folderTitle.textContent = currentFolder === 'inbox' ? 'Inbox' : 'Sent';
    folderSubtitle.textContent = currentFolder === 'inbox' ? 'Your received emails' : 'Emails you sent';

    renderEmails();
  });
});

// ============================
// Refresh
// ============================
refreshBtn.addEventListener('click', () => {
  if (unsubscribeEmails) unsubscribeEmails();
  loadEmails();
  showToast('Refreshed');
});

// ============================
// Compose Modal
// ============================
document.addEventListener('click', (e) => {
  if (e.target.closest('#compose-btn')) {
    composeModal.classList.remove('hidden');
    composeModal.style.display = 'flex';
  }
});

closeCompose?.addEventListener('click', closeComposeModal);
discardBtn?.addEventListener('click', closeComposeModal);
composeModal?.addEventListener('click', (e) => {
  if (e.target === composeModal) closeComposeModal();
});

function closeComposeModal() {
  composeModal.classList.add('hidden');
  composeModal.style.display = 'none';
  composeForm.reset();
}

// ============================
// Send Email
// ============================
composeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const to = $('compose-to').value.trim();
  const subject = $('compose-subject').value.trim();
  const body = $('compose-body').value.trim();

  if (!to || !subject) {
    showToast('Please fill in To and Subject', 'error');
    return;
  }

  sendBtn.disabled = true;
  sendBtn.innerHTML = `
    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
    Sending…
  `;

  try {
    // Use absolute production URL so it works from localhost too
    const API_BASE = window.location.hostname === 'localhost' 
      ? 'https://explyra.me' 
      : '';

    const res = await fetch(`${API_BASE}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        to, 
        subject, 
        body,
        from: `${currentUser.displayName || 'User'} <${currentUser.email.split('@')[0]}@explyra.me>`
      }),
    });

    // Safely parse response
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      showToast('API not available. Please deploy to Vercel first.', 'error');
      return;
    }

    if (data.success) {
      closeComposeModal();
      showToast('Email sent successfully!');
    } else {
      showToast(data.error || 'Failed to send email', 'error');
    }
  } catch (err) {
    console.error('Send failed:', err);
    showToast(`Send failed: ${err.message}`, 'error');
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
      Send
    `;
  }
});


// ============================
// Auto-Create Alias on Signup
// ============================
async function setupAlias(user) {
  try {
    const token = await user.getIdToken();
    const emailDomain = 'explyra.me'; 
    const alias = `${user.email.split('@')[0]}@${emailDomain}`;

    await fetch('/api/create-alias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ alias }),
    });
  } catch (err) {
    console.error('Alias setup failed:', err);
  }
}

// ============================
// Toast Notifications
// ============================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `slide-up px-5 py-3 rounded-xl text-sm font-medium shadow-2xl flex items-center gap-2 ${
    type === 'error'
      ? 'bg-red-500/90 text-white shadow-red-500/20'
      : 'bg-emerald-500/90 text-white shadow-emerald-500/20'
  }`;

  const icon =
    type === 'error'
      ? '<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>'
      : '<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';

  toast.innerHTML = `${icon}<span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================
// Utility Helpers
// ============================
function showLoading(show) {
  loadingState.classList.toggle('hidden', !show);
  loadingState.classList.toggle('flex', show);
  emailList.classList.toggle('hidden', show);
  emptyState.classList.add('hidden');
  emptyState.classList.remove('flex');
}

function getInitials(email) {
  if (!email) return '??';
  const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim();
  const parts = name.split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();
}

function extractName(email) {
  if (!email) return 'Unknown';
  // Handle "Name <email@domain>" format
  const match = email.match(/^(.+?)\s*<.+>$/);
  if (match) return match[1].trim();
  return email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);

  if (diffMin < 1) return 'Now';
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHr < 24) return `${diffHr}h`;
  if (diffHr < 168) return date.toLocaleDateString('en-US', { weekday: 'short' });
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTimeFull(timestamp) {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
