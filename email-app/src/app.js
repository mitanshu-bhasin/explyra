// ============================
// Firebase SDK Imports (CDN)
// ============================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ============================
// 🔧 Firebase Config
// ============================
const firebaseConfig = {
  apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
  authDomain: "explyras.firebaseapp.com",
  projectId: "explyras",
  storageBucket: "explyras.firebasestorage.app",
  messagingSenderId: "411853553644",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9",
};

const fApp = initializeApp(firebaseConfig);
const auth = getAuth(fApp);
const db = getFirestore(fApp);

// DOM References
const $ = (id) => document.getElementById(id);
const emailList = $('email-list');
const detailPanel = $('detail-panel');
const contactsList = $('contacts-list');
const calendarGrid = $('calendar-grid');

// State
let currentUser = null;
let allEmails = [];
let contacts = [];
let events = [];
let currentFolder = 'inbox';
let currentSection = 'mail'; 
let quill = null;
let currentMonth = new Date();

// ============================
// 📧 MIME & Email Parsing
// ============================

function parseEmail(raw) {
  if (!raw || !raw.includes('Received:')) return null;
  
  const getHeader = (name) => {
    const r = new RegExp(`^${name}:\\s*(.*)$`, 'mi');
    const m = raw.match(r);
    return m ? m[1].trim() : null;
  };

  const subject = getHeader('Subject');
  const from = getHeader('From');
  const to = getHeader('To');
  
  let body = '';
  const bMatch = raw.match(/boundary="?([^"]*)"?/i);
  if (bMatch) {
    const b = bMatch[1];
    const parts = raw.split('--' + b);
    const htmlPart = parts.find(p => p.includes('Content-Type: text/html'));
    if (htmlPart) body = htmlPart.split('\n\n').slice(1).join('\n\n').replace(/--.*$/, '').trim();
    else body = parts[1] ? parts[1].split('\n\n').slice(1).join('\n\n').replace(/--.*$/, '').trim() : '';
  } else {
    body = raw.split('\n\n').slice(1).join('\n\n').trim();
  }

  body = body.replace(/=([0-9A-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))).replace(/=\r?\n/g, '');

  return { subject, from, to, body };
}

// ============================
// 🔐 Auth Logic
// ============================

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    $('login-screen').classList.add('hidden');
    $('dashboard').classList.remove('hidden');
    
    $('user-name').textContent = user.displayName || user.email;
    $('user-email').textContent = user.email;
    $('user-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=0b57d0&color=fff&bold=true`;
    
    initListeners();
    loadSettings();
  } else {
    $('login-screen').classList.remove('hidden');
    $('dashboard').classList.add('hidden');
  }
});

$('email-login-form').onsubmit = async (e) => {
  e.preventDefault();
  const email = `${$('login-prefix').value.trim()}@explyra.me`;
  const pass = $('login-password').value;
  try { await signInWithEmailAndPassword(auth, email, pass); } catch (err) { showToast(err.message, 'error'); }
};

$('logout-btn').onclick = () => signOut(auth);

// UI Toggles
$('show-signup-btn').onclick = () => {
  $('login-form-container').classList.add('hidden');
  $('signup-form-container').classList.remove('hidden');
};

$('show-login-btn').onclick = () => {
  $('signup-form-container').classList.add('hidden');
  $('login-form-container').classList.remove('hidden');
};

// Signup Logic
$('email-signup-form').onsubmit = async (e) => {
  e.preventDefault();
  const name = $('signup-name').value.trim();
  const personalEmail = $('signup-personal-email').value.trim();
  const prefix = $('signup-prefix').value.trim();
  const pass = $('signup-password').value;
  
  if (!prefix || !pass) return showToast('Fill all required fields', 'error');
  
  const email = `${prefix}@explyra.me`;
  
  try {
    showToast('Creating account...', 'success');
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    
    // Update Profile
    await updateProfile(cred.user, { displayName: name });
    
    // Save to users collection
    await setDoc(doc(db, 'users', email), {
      displayName: name,
      personalEmail: personalEmail,
      forwarding: true,
      createdAt: new Date().toISOString()
    }, { merge: true });
    
    showToast('Account created successfully!');
  } catch (err) {
    console.error('Signup Error:', err);
    showToast(err.message, 'error');
  }
};

// ============================
// 📊 Load Data
// ============================

function initListeners() {
  // Clear state on re-init
  allEmails = [];
  
  // Single listener per "To" and "From" to ensure real-time updates don't wipe data
  const qTo = query(collection(db, 'emails'), where('to', '==', currentUser.email));
  const qFrom = query(collection(db, 'emails'), where('from', '==', currentUser.email));

  onSnapshot(qTo, (snap) => syncEmails(snap));
  onSnapshot(qFrom, (snap) => syncEmails(snap));

  // Contacts
  const qContacts = query(collection(db, 'users', currentUser.email, 'contacts'));
  onSnapshot(qContacts, (snap) => {
    contacts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (currentSection === 'contacts') renderContacts();
  });

  // Calendar
  const qEvents = query(collection(db, 'users', currentUser.email, 'events'), orderBy('date'));
  onSnapshot(qEvents, (snap) => {
    events = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    if (currentSection === 'calendar') renderCalendar();
  });
}

function syncEmails(snap) {
  snap.docChanges().forEach(change => {
    const data = change.doc.data();
    if (change.type === 'added' || change.type === 'modified') {
      const parsed = parseEmail(data.body);
      const email = {
        id: change.doc.id,
        ...data,
        subject: parsed?.subject || data.subject,
        body: parsed?.body || (data.htmlBody || data.textBody || ''),
        from: parsed?.from || data.from,
        folder: data.folder || (data.from === currentUser.email ? 'sent' : 'inbox'),
        timestamp: data.timestamp || new Date().toISOString()
      };
      
      const idx = allEmails.findIndex(e => e.id === email.id);
      if (idx !== -1) allEmails[idx] = email;
      else allEmails.push(email);
    }
    if (change.type === 'removed') {
      allEmails = allEmails.filter(e => e.id !== change.doc.id);
    }
  });
  renderEmails();
}

// ============================
// 📬 Render Mail
// ============================

function renderEmails(searchQuery = '', advancedFilter = null) {
  if (currentSection !== 'mail') return;
  
  let filtered = allEmails.filter(e => {
    if (currentFolder === 'starred') return e.starred;
    if (currentFolder === 'trash') return e.folder === 'trash' || e.trash;
    if (currentFolder === 'spam') return e.folder === 'spam' || e.spam;
    if (currentFolder === 'sent') return e.folder === 'sent' && !e.trash;
    return e.folder === currentFolder && !e.trash && !e.spam;
  });

  // Apply Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(e => 
      (e.subject || '').toLowerCase().includes(q) || 
      (e.from || '').toLowerCase().includes(q) || 
      (e.body || '').toLowerCase().includes(q)
    );
  }

  // Apply Advanced Filter
  if (advancedFilter) {
    filtered = filtered.filter(e => {
      let match = true;
      if (advancedFilter.from && !(e.from || '').toLowerCase().includes(advancedFilter.from.toLowerCase())) match = false;
      if (advancedFilter.to && !(e.to || '').toLowerCase().includes(advancedFilter.to.toLowerCase())) match = false;
      if (advancedFilter.subject && !(e.subject || '').toLowerCase().includes(advancedFilter.subject.toLowerCase())) match = false;
      if (advancedFilter.hasAttachment && !e.hasAttachment) match = false;
      if (advancedFilter.unread && e.read) match = false;
      return match;
    });
  }

  const unreadCount = allEmails.filter(e => e.folder === 'inbox' && !e.read && !e.trash).length;
  $('inbox-count').textContent = unreadCount > 0 ? unreadCount : '0';

  if (filtered.length === 0) {
    $('empty-state').classList.remove('hidden');
    emailList.innerHTML = '';
  } else {
    $('empty-state').classList.add('hidden');
    emailList.innerHTML = filtered.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(e => `
        <div class="email-row px-4 py-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${e.read ? 'read opacity-80' : 'unread'}" onclick="window.openEmail('${e.id}')">
          <div class="flex items-center gap-3 w-48 flex-shrink-0">
             <input type="checkbox" onclick="event.stopPropagation()" class="rounded border-gray-300">
             <svg class="w-5 h-5 ${e.starred ? 'text-yellow-400 fill-current' : 'text-gray-300'} transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" onclick="window.toggleStar(event, '${e.id}')"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>
             <span class="truncate font-medium dark:text-gray-200">${escapeHtml((e.from || '').split('<')[0] || e.from)}</span>
          </div>
          <div class="flex-1 truncate text-sm">
            <span class="font-bold dark:text-white">${escapeHtml(e.subject || '(No Subject)')}</span>
            <span class="text-gray-400 font-normal ml-2">— ${escapeHtml((e.body || '').substring(0, 150).replace(/<[^>]*>/g, '').replace(/\s+/g, ' '))}</span>
          </div>
          <div class="text-xs text-gray-400 w-24 text-right flex-shrink-0">${formatTime(e.timestamp)}</div>
        </div>
      `).join('');
  }
}

window.openEmail = (id) => {
  const email = allEmails.find(e => e.id === id);
  if (!email) return;
  
  $('detail-subject').textContent = email.subject || '(No Subject)';
  $('detail-from').textContent = email.from;
  $('detail-time').textContent = formatTimeFull(email.timestamp);
  $('meta-from').textContent = email.from;
  $('meta-to').textContent = email.to || currentUser.email;
  $('meta-date').textContent = email.timestamp;
  $('meta-subject').textContent = email.subject;

  if (email.body?.includes('<') && email.body?.includes('>')) {
    $('email-frame').classList.remove('hidden');
    $('email-text-fallback').classList.add('hidden');
    $('email-frame').srcdoc = `<html><body style="font-family: sans-serif; font-size: 14px; color: #3c4043;">${DOMPurify.sanitize(email.body)}</body></html>`;
  } else {
    $('email-frame').classList.add('hidden');
    $('email-text-fallback').classList.remove('hidden');
    $('email-text-fallback').textContent = email.body || '';
  }

  detailPanel.classList.remove('hidden');
  detailPanel.classList.add('flex');
  
  if (!email.read) setDoc(doc(db, 'emails', email.id), { read: true }, { merge: true });
};

window.toggleStar = async (e, id) => {
  e.stopPropagation();
  const email = allEmails.find(em => em.id === id);
  await setDoc(doc(db, 'emails', id), { starred: !email.starred }, { merge: true });
};

$('delete-btn').onclick = async () => {
  const currentTitle = $('detail-subject').textContent;
  const email = allEmails.find(e => e.subject === currentTitle);
  if (!email) return;
  
  if (email.folder === 'trash' || email.trash) {
    await deleteDoc(doc(db, 'emails', email.id));
    showToast('Deleted Permanently');
  } else {
    await setDoc(doc(db, 'emails', email.id), { trash: true, folder: 'trash' }, { merge: true });
    showToast('Moved to Trash');
  }
  $('close-detail').click();
};

// ============================
// 👥 Contacts
// ============================

function renderContacts() {
  contactsList.innerHTML = contacts.map(c => `
    <div class="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 dark:bg-gray-800">
      <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold dark:bg-gray-700">${(c.name || 'C').charAt(0)}</div>
      <div class="flex-1 min-w-0">
        <p class="font-bold truncate dark:text-white">${escapeHtml(c.name)}</p>
        <p class="text-xs text-gray-500 truncate">${escapeHtml(c.email)}</p>
      </div>
      <button onclick="window.deleteContact('${c.id}')" class="text-gray-400 hover:text-red-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
    </div>
  `).join('');
}

$('add-contact-btn').onclick = () => $('contact-modal').classList.remove('hidden');
$('close-contact-modal').onclick = () => $('contact-modal').classList.add('hidden');

$('contact-form').onsubmit = async (e) => {
  e.preventDefault();
  const name = $('contact-name').value;
  const email = $('contact-email').value;
  await addDoc(collection(db, 'users', currentUser.email, 'contacts'), { name, email });
  $('contact-modal').classList.add('hidden');
  $('contact-form').reset();
  showToast('Contact Added');
};

window.deleteContact = async (id) => {
  await deleteDoc(doc(db, 'users', currentUser.email, 'contacts', id));
};

// ============================
// 📅 Calendar
// ============================

function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  $('calendar-title').textContent = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const header = Array.from(calendarGrid.children).slice(0, 7);
  calendarGrid.innerHTML = '';
  header.forEach(h => calendarGrid.appendChild(h));

  for (let i = 0; i < firstDay; i++) {
    const d = document.createElement('div');
    d.className = 'p-2 border-r border-b min-h-[100px] bg-gray-50/30 dark:border-gray-800 dark:bg-gray-900/10';
    calendarGrid.appendChild(d);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === dStr);
    
    const d = document.createElement('div');
    d.className = 'p-2 border-r border-b min-h-[100px] hover:bg-gray-50 transition-colors dark:border-gray-800 dark:hover:bg-gray-800 relative';
    d.innerHTML = `<span class="text-xs font-bold dark:text-gray-400">${day}</span>
      <div class="mt-1 space-y-1">
        ${dayEvents.map(e => `<div class="text-[10px] bg-blue-100 text-blue-700 p-1 rounded truncate dark:bg-blue-900 dark:text-blue-200" title="${e.title}">${e.title}</div>`).join('')}
      </div>`;
    calendarGrid.appendChild(d);
  }
}

$('cal-prev').onclick = () => { currentMonth.setMonth(currentMonth.getMonth() - 1); renderCalendar(); };
$('cal-next').onclick = () => { currentMonth.setMonth(currentMonth.getMonth() + 1); renderCalendar(); };
$('add-event-btn').onclick = () => $('event-modal').classList.remove('hidden');
$('close-event-modal').onclick = () => $('event-modal').classList.add('hidden');

$('event-form').onsubmit = async (e) => {
  e.preventDefault();
  const title = $('event-title').value;
  const date = $('event-date').value;
  const time = $('event-time').value;
  const desc = $('event-desc').value;
  await addDoc(collection(db, 'users', currentUser.email, 'events'), { title, date, time, desc });
  $('event-modal').classList.add('hidden');
  $('event-form').reset();
  showToast('Meeting Scheduled');
};

// ============================
// 🎨 Settings & Section Switch
// ============================

async function loadSettings() {
  const d = await getDoc(doc(db, 'users', currentUser.email));
  if (d.exists()) {
    const data = d.data();
    applySettings(data);
    $('settings-display-name').value = data.displayName || '';
    $('settings-bg-url').value = data.backgroundUrl || '';
    $('settings-bg-opacity').value = data.bgOpacity || 1;
    $('settings-signature').value = data.signature || '';
    $('settings-font-size').value = data.fontSize || '14px';
    $('settings-forwarding').checked = data.forwarding || false;
  }
}

function applySettings(data) {
  if (data.backgroundUrl) {
    document.body.style.setProperty('--bg-image', `url(${data.backgroundUrl})`);
    document.body.style.setProperty('--gmail-bg', 'transparent');
  }
  document.body.style.setProperty('--bg-opacity', data.bgOpacity || 1);
  if (data.darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
  
  // Use CSS variable for font scaling
  document.documentElement.style.setProperty('--font-size', data.fontSize || '14px');
}

$('save-settings-btn').onclick = async () => {
  const settings = {
    displayName: $('settings-display-name').value,
    backgroundUrl: $('settings-bg-url').value,
    bgOpacity: $('settings-bg-opacity').value,
    signature: $('settings-signature').value,
    fontSize: $('settings-font-size').value,
    forwarding: $('settings-forwarding').checked,
    darkMode: document.documentElement.classList.contains('dark')
  };
  await setDoc(doc(db, 'users', currentUser.email), settings, { merge: true });
  applySettings(settings);
  showToast('Changes Saved!');
  $('settings-modal').classList.add('hidden');
  
  if (currentUser) {
    updateProfile(auth.currentUser, { displayName: settings.displayName }).catch(console.error);
  }
};

// Section Switching
document.querySelectorAll('#sidebar-nav-items .sidebar-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    currentSection = item.dataset.section || 'mail';
    currentFolder = item.dataset.folder || 'inbox';
    
    $('list-panel').classList.toggle('hidden', currentSection !== 'mail');
    $('contacts-panel').classList.toggle('hidden', currentSection !== 'contacts');
    $('calendar-panel').classList.toggle('hidden', currentSection !== 'calendar');
    detailPanel.classList.add('hidden');

    if (currentSection === 'mail') renderEmails();
    if (currentSection === 'contacts') renderContacts();
    if (currentSection === 'calendar') renderCalendar();
  });
});

// ============================
// 📝 Compose
// ============================

// ============================
// 📝 Compose & Actions
// ============================

if (typeof Quill !== 'undefined' && !quill) {
  quill = new Quill('#editor-container', { 
    theme: 'snow', 
    placeholder: 'Write message...', 
    modules: { toolbar: [['bold', 'italic'], ['link', 'image']] } 
  });
}

$('compose-btn').onclick = () => {
  $('compose-modal').classList.remove('hidden');
  $('compose-to').value = '';
  $('compose-subject').value = '';
  $('contact-dropdown').classList.add('hidden');
  if (quill) quill.setText('');
};

// Reply & Forward
$('reply-btn').onclick = () => {
  const from = $('detail-from').textContent;
  const sub = $('detail-subject').textContent;
  $('compose-modal').classList.remove('hidden');
  $('compose-to').value = from.match(/<([^>]*)>/)?.[1] || from;
  $('compose-subject').value = sub.startsWith('Re:') ? sub : `Re: ${sub}`;
  if (quill) quill.setContents([{ insert: '\n\n\n--- Original Message ---\n' }]);
};

$('forward-btn').onclick = () => {
  const sub = $('detail-subject').textContent;
  $('compose-modal').classList.remove('hidden');
  $('compose-to').value = '';
  $('compose-subject').value = sub.startsWith('Fwd:') ? sub : `Fwd: ${sub}`;
  // Copy body? A bit complex with iframes, leaving basic for now
  if (quill) quill.setContents([{ insert: '\n\n\n--- Forwarded Message ---\n' }]);
};

$('show-contacts-btn').onclick = (e) => {
  e.stopPropagation();
  const dropdown = $('contact-dropdown');
  if (dropdown.classList.contains('hidden')) {
    dropdown.innerHTML = contacts.length > 0 
      ? contacts.map(c => `<div class="p-3 hover:bg-gray-100 cursor-pointer text-sm dark:hover:bg-gray-700 dark:text-gray-200 border-b last:border-0 dark:border-gray-700" onclick="window.selectContact('${c.email}')">${c.name} (${c.email})</div>`).join('')
      : '<div class="p-3 text-xs text-center text-gray-500">No contacts found</div>';
    dropdown.classList.remove('hidden');
  } else {
    dropdown.classList.add('hidden');
  }
};

window.selectContact = (email) => {
  $('compose-to').value = email;
  $('contact-dropdown').classList.add('hidden');
};

document.addEventListener('click', () => {
  $('contact-dropdown')?.classList.add('hidden');
});

$('send-btn').onclick = async () => {
  const to = $('compose-to').value.trim();
  const sub = $('compose-subject').value.trim();
  if (!to || !sub) return showToast('Fill all fields', 'error');
  
  const signature = $('settings-signature').value ? `<br><br>--<br>${$('settings-signature').value}` : '';
  const htmlContent = quill.root.innerHTML + signature;

  const btn = $('send-btn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
      },
      body: JSON.stringify({
        to,
        subject: sub,
        htmlBody: htmlContent,
        fromEmail: currentUser.email,
        senderName: currentUser.displayName || currentUser.email.split('@')[0]
      })
    });

    const result = await response.json();

    if (result.success) {
      showToast('Email Sent Successfully!');
      $('compose-modal').classList.add('hidden');
      if (quill) quill.setText('');
      $('compose-to').value = '';
      $('compose-subject').value = '';
    } else {
      throw new Error(result.error || 'Failed to send email');
    }
  } catch (error) {
    console.error('Send Error:', error);
    showToast(error.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
};

$('discard-btn').onclick = () => $('compose-modal').classList.add('hidden');
$('close-compose').onclick = () => $('compose-modal').classList.add('hidden');

// ============================
// 🛠 Helpers & UI Utils
// ============================

function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (d.toDateString() === new Date().toDateString()) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function formatTimeFull(iso) { return iso ? new Date(iso).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' }) : ''; }

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text || '';
  return d.innerHTML;
}

function showToast(msg, type = 'success') {
  const container = $('toast-container') || document.body;
  const t = document.createElement('div');
  t.className = `fixed bottom-4 left-4 p-4 rounded-xl shadow-lg text-sm font-bold z-[200] slide-up ${type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Search & Filter Listeners
$('search-input').oninput = (e) => renderEmails(e.target.value);

$('advanced-filter-btn').onclick = (e) => {
  e.stopPropagation();
  $('advanced-search-panel').classList.toggle('hidden');
};

$('search-filter-apply').onclick = () => {
  const filter = {
    from: $('filter-from').value,
    to: $('filter-to').value,
    subject: $('filter-subject').value,
    hasAttachment: $('filter-has-attachment').checked,
    unread: $('filter-unread').checked
  };
  $('advanced-search-panel').classList.add('hidden');
  renderEmails('', filter);
};

document.addEventListener('click', (e) => {
  if (!$('advanced-search-panel').contains(e.target) && e.target !== $('advanced-filter-btn')) {
    $('advanced-search-panel').classList.add('hidden');
  }
});

// UI Event Listeners
$('refresh-btn').onclick = () => { renderEmails(); showToast('Refreshing...'); };
$('header-settings-btn').onclick = () => $('settings-modal').classList.remove('hidden');
$('close-settings').onclick = () => $('settings-modal').classList.add('hidden');

$('toggle-metadata').onclick = () => {
  const meta = $('detail-metadata');
  const isHidden = meta.classList.toggle('hidden');
  $('toggle-metadata').innerHTML = `${isHidden ? 'show' : 'hide'} details <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: ${isHidden ? 'rotate(0)' : 'rotate(180deg)'}"><path d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`;
};

$('theme-toggle').onclick = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('explyra-theme', isDark ? 'dark' : 'light');
  if (window.updateMailThemePill) window.updateMailThemePill();
};

$('close-detail').onclick = () => {
  detailPanel.classList.add('hidden');
  detailPanel.classList.remove('flex');
};

