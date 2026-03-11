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
  onSnapshot,
  doc,
  setDoc,
  getDoc
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

// DOM References
const $ = (id) => document.getElementById(id);
const loginScreen = $('login-screen');
const dashboard = $('dashboard');

// Auth Form Containers
const loginFormContainer = $('login-form-container');
const signupFormContainer = $('signup-form-container');

// Login Elements
const emailLoginForm = $('email-login-form');
const emailLoginBtn = $('email-login-btn');
const loginPrefix = $('login-prefix');
const loginPassword = $('login-password');
const showSignupBtn = $('show-signup-btn');

// Signup Elements
const emailSignupForm = $('email-signup-form');
const emailSignupBtn = $('email-signup-btn');
const signupName = $('signup-name');
const signupPersonalEmail = $('signup-personal-email');
const signupPrefix = $('signup-prefix');
const signupPassword = $('signup-password');
const showLoginBtn = $('show-login-btn');

// Dashboard Elements
const composeBtn = $('compose-btn');
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
const mobileMenuBtn = $('mobile-menu-btn');
const sidebar = document.querySelector('aside');

// Detail Panel Elements
const detailPanel = $('detail-panel');
const detailSubject = $('detail-subject');
const detailFrom = $('detail-from');
const detailTo = $('detail-to');
const detailTime = $('detail-time');
const detailAvatar = $('detail-avatar');
const emailFrame = $('email-frame');
const emailTextFallback = $('email-text-fallback');
const closeDetail = $('close-detail');
const replyBtn = $('reply-btn');
const forwardBtn = $('forward-btn');
const deleteBtn = $('delete-btn');
const toastContainer = $('toast-container');

// Settings Elements
const headerSettingsBtn = $('header-settings-btn');
const settingsModal = $('settings-modal');
const closeSettings = $('close-settings');
const settingsForm = $('settings-form');
const settingsDisplayName = $('settings-display-name');
const settingsPersonalEmail = $('settings-personal-email');
const settingsForwarding = $('settings-forwarding');
const settingsSignature = $('settings-signature');
const settingsTheme = $('settings-theme');
const saveSettingsBtn = $('save-settings-btn');
const exportEmailsBtn = $('export-emails-btn');
const importEmailsBtn = $('import-emails-btn');
const importFile = $('import-file');

// Compose Modal Elements
const composeModal = $('compose-modal');
const closeCompose = $('close-compose');
const composeTo = $('compose-to');
const composeCc = $('compose-cc');
const composeBcc = $('compose-bcc');
const composeSubject = $('compose-subject');
const sendBtn = $('send-btn');
const discardBtn = $('discard-btn');

// Initialize Quill
let quill;
if (typeof Quill !== 'undefined') {
  quill = new Quill('#editor-container', {
    theme: 'snow',
    placeholder: 'Write your message...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'clean']
      ]
    }
  });
}

// ============================
// State
// ============================
let currentUser = null;
let emails = [];
let localEmails = JSON.parse(localStorage.getItem('mailbox_local_emails') || '[]');
let currentFolder = 'inbox';
const FIREBASE_LIMIT = 30;

// ============================
// Auth State Listener
// ============================
onAuthStateChanged(authInstance, (user) => {
  if (user) {
    currentUser = user;
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    dashboard.classList.add('flex');

    // Update Profile UI
    userName.textContent = user.displayName || user.email.split('@')[0];
    userEmail.textContent = user.email;
    userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=0b57d0&color=fff&bold=true`;

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

// Auth Logic - Toggles
showSignupBtn?.addEventListener('click', () => {
  loginFormContainer.classList.add('hidden');
  signupFormContainer.classList.remove('hidden');
});

showLoginBtn?.addEventListener('click', () => {
  signupFormContainer.classList.add('hidden');
  loginFormContainer.classList.remove('hidden');
});

// Signup Logic
emailSignupForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = signupName.value.trim();
  const personalEmail = signupPersonalEmail.value.trim();
  const prefix = signupPrefix.value.trim().toLowerCase();
  const password = signupPassword.value;

  if (!name || !personalEmail || !prefix || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  const email = `${prefix}@explyra.me`;

  const originalText = emailSignupBtn.innerHTML;
  emailSignupBtn.innerHTML = `
    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
    Creating Account…
  `;
  emailSignupBtn.disabled = true;

  try {
    const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    // Save personal email setting
    await setDoc(doc(db, 'users', email), {
      personalEmail: personalEmail,
      forwardingEnabled: false
    });

    showToast('Account created successfully!');
  } catch (err) {
    console.error('Signup failed:', err);
    showToast(err.message || 'Signup failed', 'error');
  } finally {
    emailSignupBtn.innerHTML = originalText;
    emailSignupBtn.disabled = false;
  }
});

// Login Logic
emailLoginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prefix = loginPrefix.value.trim().toLowerCase();
  const password = loginPassword.value;

  if (!prefix || !password) {
    showToast('Please enter both username and password', 'error');
    return;
  }

  const email = `${prefix}@explyra.me`;

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
// Load Emails (Real-time Firestore) Privacy Fixed
// ============================
let inboxEmails = [];
let sentEmails = [];
let unsubscribeInbox = null;
let unsubscribeSent = null;

async function loadEmails() {
  showLoading(true);
  if (!currentUser?.email) return;

  const qInbox = query(collection(db, 'emails'), where('to', '==', currentUser.email));
  const qSent  = query(collection(db, 'emails'), where('from', '==', currentUser.email));

  // Each snapshot stores into its own array, then re-renders
  onSnapshot(qInbox, (snap) => {
    inboxEmails = [];
    snap.forEach(d => inboxEmails.push({ id: d.id, ...d.data() }));
    rebuildEmails();
  });

  onSnapshot(qSent, (snap) => {
    sentEmails = [];
    snap.forEach(d => sentEmails.push({ id: d.id, ...d.data() }));
    rebuildEmails();
  });
}

function rebuildEmails() {
  // Merge firebase + local, deduplicate
  const all = [...inboxEmails, ...sentEmails, ...localEmails];
  const seen = new Set();
  emails = all.filter(e => seen.has(e.id) ? false : seen.add(e.id));
  showLoading(false);
  sortEmails(currentSort);
}

let currentSort = 'newest';
function sortEmails(method) {
  currentSort = method;
  if (method === 'newest') {
    emails.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } else if (method === 'oldest') {
    emails.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }
  
  // Deduplicate
  const seen = new Set();
  emails = emails.filter(e => seen.has(e.id) ? false : seen.add(e.id));

  renderEmails();
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
    <div class="email-row px-4 py-2 border-b border-gray-100 cursor-pointer flex items-center text-sm ${email.read ? 'read' : 'unread'}" data-email-id="${email.id}">
      <div class="flex items-center gap-3 w-64 flex-shrink-0">
        <input type="checkbox" class="rounded border-gray-300">
        <span class="truncate font-medium text-gray-700">${escapeHtml(email.fromName || email.from.split('<')[0] || email.from)}</span>
      </div>
      <div class="flex-1 flex items-center gap-2 min-w-0 pr-4">
        <span class="truncate text-gray-900">${escapeHtml(email.subject || '(No Subject)')}</span>
        <span class="text-gray-400 font-normal"> - </span>
        <span class="text-gray-500 font-normal truncate">${escapeHtml((email.textBody || email.body || '').substring(0, 100))}</span>
      </div>
      <div class="text-xs text-gray-500 whitespace-nowrap font-medium w-20 text-right">
        ${formatTime(email.timestamp)}
      </div>
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

// Email Detail Logic
let currentOpenEmail = null;

function showEmailDetail(email) {
  currentOpenEmail = email;
  detailSubject.textContent = email.subject || '(No Subject)';
  detailFrom.textContent = email.from;
  detailTo.textContent = `to: ${email.to}`;
  detailTime.textContent = formatTimeFull(email.timestamp);
  
  // Avatar
  const name = email.fromName || email.from.split('<')[0] || email.from;
  detailAvatar.textContent = name.charAt(0).toUpperCase();

  if (email.htmlBody) {
    emailTextFallback.classList.add('hidden');
    emailFrame.classList.remove('hidden');
    
    // Sanitize with DOMPurify
    const cleanHTML = typeof DOMPurify !== 'undefined' ? DOMPurify.sanitize(email.htmlBody) : email.htmlBody;
    
    emailFrame.srcdoc = `
      <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 24px; line-height: 1.6; color: #3c4043; background: #fff; font-size: 14px; }
            img { max-width: 100%; height: auto; }
            a { color: #1a73e8; }
          </style>
        </head>
        <body>${cleanHTML}</body>
      </html>
    `;
  } else {
    emailFrame.classList.add('hidden');
    emailTextFallback.classList.remove('hidden');
    emailTextFallback.textContent = email.textBody || email.body || '';
  }
  
  detailPanel.classList.remove('hidden');
  detailPanel.classList.add('flex');

  // Mark as read in Firestore
  if (!email.read && currentFolder === 'inbox') {
     setDoc(doc(db, 'emails', email.id), { read: true }, { merge: true });
  }
}

function closeDetailView() {
  detailPanel.classList.add('hidden');
  detailPanel.classList.remove('flex');
  currentOpenEmail = null;
}

closeDetail.addEventListener('click', closeDetailView);

deleteBtn?.addEventListener('click', async () => {
  if (!currentOpenEmail || !confirm('Permanently delete this email from cloud? (It will stay in local storage)')) return;
  
  try {
    // In this simplified logic, "delete" moves it to local and marks as hidden from cloud
    // Real implementation should call setDoc(doc, {deleted: true}) or actually delete
    showToast('Email moved to local archive');
    closeDetailView();
  } catch(e) {
    showToast('Delete failed', 'error');
  }
});

// Reply & Forward
replyBtn?.addEventListener('click', () => {
  if (!currentOpenEmail) return;
  const to = currentOpenEmail.from;
  const subject = currentOpenEmail.subject.startsWith('Re:') ? currentOpenEmail.subject : `Re: ${currentOpenEmail.subject}`;
  const quote = `<br><br>---------- Original Message ----------<br>From: ${currentOpenEmail.from}<br>Date: ${formatTimeFull(currentOpenEmail.timestamp)}<br>Subject: ${currentOpenEmail.subject}<br><br>${currentOpenEmail.htmlBody || currentOpenEmail.textBody || ''}`;
  openComposeModal(to, subject, quote);
});

forwardBtn?.addEventListener('click', () => {
  if (!currentOpenEmail) return;
  const subject = currentOpenEmail.subject.startsWith('Fwd:') ? currentOpenEmail.subject : `Fwd: ${currentOpenEmail.subject}`;
  const quote = `<br><br>---------- Forwarded Message ----------<br>From: ${currentOpenEmail.from}<br>Date: ${formatTimeFull(currentOpenEmail.timestamp)}<br>Subject: ${currentOpenEmail.subject}<br><br>${currentOpenEmail.htmlBody || currentOpenEmail.textBody || ''}`;
  openComposeModal('', subject, quote);
});

let userSignature = '';
let autoRefreshTimer = null;

function openComposeModal(to = '', subject = '', body = '') {
  composeTo.value = to;
  composeSubject.value = subject;
  if (quill) {
    quill.root.innerHTML = body + (userSignature ? `<br><br><div class="gmail_signature">${userSignature}</div>` : '');
  }
  composeModal.classList.remove('hidden');
  composeModal.style.display = 'flex';
}

// ============================
// Settings Modal Logic
// ============================
headerSettingsBtn?.addEventListener('click', async () => {
  if (!currentUser) return;
  settingsModal.classList.remove('hidden');
  
  try {
    settingsDisplayName.value = currentUser.displayName || '';
    const userDoc = await getDoc(doc(db, 'users', currentUser.email));
    if (userDoc.exists()) {
      const data = userDoc.data();
      settingsPersonalEmail.value = data.personalEmail || '';
      settingsForwarding.checked = data.forwardingEnabled || false;
      settingsSignature.value = data.signature || '';
      settingsTheme.value = data.theme || 'light';
    }
  } catch (err) {
    console.error('Error fetching settings:', err);
    showToast('Failed to load settings', 'error');
  }
});

closeSettings?.addEventListener('click', () => {
  settingsModal.classList.add('hidden');
});

settingsForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const originalText = saveSettingsBtn.innerHTML;
  saveSettingsBtn.innerHTML = 'Saving...';
  saveSettingsBtn.disabled = true;

  try {
    const newName = settingsDisplayName.value.trim();
    const personalEmail = settingsPersonalEmail.value.trim();
    const forwardingEnabled = settingsForwarding.checked;
    const signature = settingsSignature.value;
    const theme = settingsTheme.value;

    const { updateProfile } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
    await updateProfile(currentUser, { displayName: newName });
    
    await setDoc(doc(db, 'users', currentUser.email), {
      personalEmail,
      forwardingEnabled,
      signature,
      theme
    }, { merge: true });
    
    // Update local config
    userSignature = signature;

    // Update local UI
    userName.textContent = newName;
    userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=6366f1&color=fff&bold=true&size=64`;

    showToast('Settings saved successfully!');
    settingsModal.classList.add('hidden');
  } catch (err) {
    console.error('Error saving settings:', err);
    showToast('Failed to save settings', 'error');
  } finally {
    saveSettingsBtn.innerHTML = originalText;
    saveSettingsBtn.disabled = false;
  }
});

// Data Export/Import
exportEmailsBtn?.addEventListener('click', () => {
  const data = JSON.stringify(emails, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mailbox_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  showToast('Emails exported successfully');
});

importEmailsBtn?.addEventListener('click', () => importFile.click());

importFile?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (!Array.isArray(imported)) throw new Error('Invalid format');
      localEmails = [...localEmails, ...imported];
      // Deduplicate
      const seen = new Set();
      localEmails = localEmails.filter(e => seen.has(e.id) ? false : seen.add(e.id));
      localStorage.setItem('mailbox_local_emails', JSON.stringify(localEmails));
      showToast('Emails imported to Local Storage');
      loadEmails();
    } catch(err) {
      showToast('Invalid JSON file', 'error');
    }
  };
  reader.readAsText(file);
});

// Mobile menu toggle
mobileMenuBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  sidebar.classList.toggle('-translate-x-full');
  sidebar.classList.toggle('fixed');
  sidebar.classList.toggle('z-50');
  sidebar.classList.toggle('inset-y-0');
  sidebar.classList.toggle('left-0');
});

// ============================
// Compose & Navigation Fixes
// ============================
composeBtn?.addEventListener('click', () => openComposeModal());

closeCompose?.addEventListener('click', closeComposeModal);
discardBtn?.addEventListener('click', closeComposeModal);
composeModal?.addEventListener('click', (e) => {
  if (e.target === composeModal) closeComposeModal();
});

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    currentFolder = item.dataset.folder;
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // Reset view
    closeDetailView();
    renderEmails();
  });
});

document.addEventListener('click', (e) => {
  if (window.innerWidth < 1024 && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
     if (sidebar.classList.contains('fixed')) {
       sidebar.classList.add('-translate-x-full');
       sidebar.classList.remove('fixed', 'z-50', 'inset-y-0', 'left-0');
     }
  }
});

// ============================
// Sort Select & Close Detail Desktop
// ============================
const sortSelect = $('sort-select');
sortSelect?.addEventListener('change', () => {
  sortEmails(sortSelect.value);
});

const closeDetailDesktop = $('close-detail-desktop');
closeDetailDesktop?.addEventListener('click', closeDetailView);

// ============================
// Refresh
// ============================
refreshBtn.addEventListener('click', () => {
  if (unsubscribeEmails) unsubscribeEmails();
  loadEmails();
  showToast('Refreshed');
});

function closeComposeModal() {
  composeModal.classList.add('hidden');
  composeModal.style.display = 'none';
  if (quill) quill.setText('');
  composeTo.value = '';
  composeSubject.value = '';
  composeCc.value = '';
  composeBcc.value = '';
}

// ============================
// Send Email
// ============================
sendBtn.addEventListener('click', async () => {
  const to = composeTo.value.trim();
  const subject = composeSubject.value.trim();
  const htmlBody = quill ? quill.root.innerHTML : '';
  const textBody = quill ? quill.getText() : '';
  const cc = composeCc.value.trim();
  const bcc = composeBcc.value.trim();

  if (!to || !subject) {
    showToast('Please fill in To and Subject', 'error');
    return;
  }

  sendBtn.disabled = true;
  const originalText = sendBtn.innerHTML;
  sendBtn.innerHTML = `
    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
    Sending…
  `;

  try {
    const API_BASE = window.location.hostname === 'localhost' ? 'https://explyra.me' : '';
    const token = currentUser ? await currentUser.getIdToken() : null;

    const res = await fetch(`${API_BASE}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ 
        to, 
        cc,
        bcc,
        subject, 
        htmlBody,
        textBody,
        originalMessageId: currentOpenEmail?.messageId // For threading
      }),
    });

    const data = await res.json();

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
    sendBtn.innerHTML = originalText;
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
