// js/emp-chat.js
import { collection, query, where, getDocs, getDoc, doc, onSnapshot, serverTimestamp, orderBy, limit, addDoc, setDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { checkSpam } from './spam-filter.js';
import { handleAIChatRequest } from './chat-ai-helper.js';


let activeChatUnsub = null;
let chatUsers = [];
window.currentChatContext = 'global'; // 'global' or 'userDocId'
window.currentChatUser = null;
let currentReplyMessage = null;
let voiceRecorder = null;
let voiceBlob = null;
let voiceStartTime = null;
let voiceTimerInterval = null;

class VoiceRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.chunks = [];
        this.stream = null;
    }

    async start() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.chunks = [];
            this.mediaRecorder.ondataavailable = (e) => this.chunks.push(e.data);
            this.mediaRecorder.start();
            return true;
        } catch (e) {
            console.error("Mic access denied:", e);
            showToast("Microphone access denied!", "error");
            return false;
        }
    }

    stop() {
        return new Promise((resolve) => {
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.chunks, { type: 'audio/webm;codecs=opus' });
                this.stream.getTracks().forEach(track => track.stop());
                resolve(blob);
            };
            this.mediaRecorder.stop();
        });
    }
}

window.openChatModal = async () => {
    document.getElementById('modal-chat').classList.remove('hidden');
    document.getElementById('chat-main-area').classList.remove('translate-x-0'); // reset mobile view
    document.getElementById('chat-main-area').classList.add('translate-x-full');
    await fetchChatUsers();
    window.selectChat('global'); // default

    // Mentions Setup
    setTimeout(() => {
        const input = document.getElementById('chat-input-emp');
        const dropdown = document.getElementById('mentions-dropdown-emp');
        if (!input || !dropdown) return;

        input.addEventListener('input', (e) => {
            const val = input.value;
            const cursorStart = input.selectionStart;
            const textBeforeCursor = val.slice(0, cursorStart);
            const match = textBeforeCursor.match(/@([a-zA-Z0-9_]*)$/);

            if (match) {
                const queryStr = match[1].toLowerCase();
                const users = chatUsers || [];
                const filtered = users.filter(u => 
                    (u.name && u.name.toLowerCase().includes(queryStr)) || 
                    (u.email && u.email.toLowerCase().includes(queryStr))
                ).slice(0, 5);

                if (filtered.length > 0) {
                    dropdown.innerHTML = filtered.map(u => `
                        <div onclick="window.insertMentionEmp('${u.name || u.email}')" class="p-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer flex items-center gap-2 transition">
                            <div class="w-5 h-5 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center text-[10px] font-bold uppercase">${(u.name || u.email)[0]}</div>
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

        window.insertMentionEmp = (name) => {
            const validName = name.replace(/ /g, '_'); // space to underscore
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

        document.addEventListener('click', (ev) => {
            if (!dropdown.contains(ev.target) && ev.target !== input) {
                dropdown.classList.add('hidden');
                dropdown.classList.remove('flex');
            }
        });
    }, 500);
};

window.hideMobileChatArea = () => {
    document.getElementById('chat-main-area').classList.remove('translate-x-0');
    document.getElementById('chat-main-area').classList.add('translate-x-full');
};

async function fetchChatUsers() {
    if (!window.userData || !window.userData.docId || !window.companyId) return;

    try {
        const db = window.db;
        // Fetch users from same companyId
        const qUsers = query(collection(db, "users"), where("companyId", "==", window.companyId));
        const snap = await getDocs(qUsers);
        const allUsers = snap.docs.map(d => ({ docId: d.id, ...d.data() })).filter(u => u.docId !== window.userData.docId);

        // Fetch chats for sorting and last message
        const chatsSnap = await getDocs(query(collection(db, "chats"), where("users", "array-contains", window.userData.docId)));
        const chatMeta = {};
        chatsSnap.forEach(docSnap => {
            const data = docSnap.data();
            const otherUser = data.users.find(id => id !== window.userData.docId);
            if (otherUser) chatMeta[otherUser] = data;
        });

        // Fetch group chats
        const groupChatsSnap = await getDocs(query(collection(db, "group_chats"), where("users", "array-contains", window.userData.docId)));
        const groupsMeta = {};
        groupChatsSnap.forEach(docSnap => {
            groupsMeta[docSnap.id] = { docId: docSnap.id, ...docSnap.data(), isGroup: true };
        });

        // Get Global Chat last message
        const globalChatSnap = await getDocs(query(collection(db, "global_chat"), where("companyId", "==", window.companyId), orderBy("createdAt", "desc"), limit(1)));
        const globalLast = globalChatSnap.empty ? "Company wide chat" : globalChatSnap.docs[0].data().text;

        // Sort users by activity
        chatUsers = allUsers.sort((a, b) => {
            const timeA = chatMeta[a.docId]?.lastMessageAt?.toMillis() || 0;
            const timeB = chatMeta[b.docId]?.lastMessageAt?.toMillis() || 0;
            return timeB - timeA;
        });

        window.groupChats = Object.values(groupsMeta).sort((a, b) => {
            const timeA = a.lastMessageAt?.toMillis() || 0;
            const timeB = b.lastMessageAt?.toMillis() || 0;
            return timeB - timeA;
        });

        renderChatUserSearch('', globalLast, chatMeta);
    } catch (e) {
        console.error("Failed to load chat users:", e);
    }
}

window.fetchChatUsers = fetchChatUsers; // Export for external use

window.openCreateGroupModal = () => {
    // Generate inner HTML for modal with chatUsers
    const userOptions = chatUsers.map(u => `
        <label class="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-[#111] rounded-lg cursor-pointer transition">
            <input type="checkbox" value="${u.docId}" class="group-user-checkbox w-4 h-4 text-black border-gray-300 rounded focus:ring-black">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold truncate text-black dark:text-white">${u.name || u.email}</p>
                <p class="text-[10px] text-gray-500 truncate">${u.role || 'EMP'}</p>
            </div>
        </label>
    `).join('');

    const modalHtml = `
        <div id="create-group-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in">
            <div class="bg-white dark:bg-[#0a0a0a] rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-[#333] overflow-hidden flex flex-col max-h-[90vh]">
                <div class="p-4 border-b border-gray-100 dark:border-[#222] flex justify-between items-center">
                    <h3 class="text-lg font-bold text-black dark:text-white">Create New Group</h3>
                    <button onclick="document.getElementById('create-group-modal').remove()" class="text-gray-400 hover:text-black dark:hover:text-white transition"><i class="fa-solid fa-times"></i></button>
                </div>
                <div class="p-4 flex-1 overflow-y-auto space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Group Name</label>
                        <input type="text" id="group-name-input" class="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-2 text-sm text-black dark:text-white outline-none focus:border-black dark:focus:border-white transition" placeholder="e.g. Project Alpha">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Select Members</label>
                        <div class="space-y-1 max-h-60 overflow-y-auto border border-gray-100 dark:border-[#222] rounded-xl p-2 bg-white dark:bg-[#0a0a0a]">
                            ${userOptions}
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t border-gray-100 dark:border-[#222] flex justify-end gap-3">
                    <button onclick="document.getElementById('create-group-modal').remove()" class="px-4 py-2 text-sm font-bold text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition">Cancel</button>
                    <button onclick="window.confirmCreateGroup()" class="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl text-sm font-bold hover:scale-95 transition">Create</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.confirmCreateGroup = async () => {
    const nameInput = document.getElementById('group-name-input').value.trim();
    if (!nameInput) {
        window.showToast("Please enter a group name", "error");
        return;
    }

    const checkboxes = document.querySelectorAll('.group-user-checkbox:checked');
    const selectedUsers = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedUsers.length === 0) {
        window.showToast("Please select at least one member", "error");
        return;
    }

    // Include self
    selectedUsers.push(window.userData.docId);

    try {
        const db = window.db;
        const groupRef = await addDoc(collection(db, "group_chats"), {
            name: nameInput,
            companyId: window.companyId,
            admin: window.userData.docId,
            admins: [window.userData.docId],
            users: selectedUsers,
            createdAt: serverTimestamp(),
            lastMessage: "Group created",
            lastMessageAt: serverTimestamp(),
            spamFilter: false,
            activeCall: {}
        });

        document.getElementById('create-group-modal').remove();
        window.showToast("Group created successfully!", "success");
        await fetchChatUsers(); // Refresh list
        window.selectChat('group_' + groupRef.id);
    } catch (e) {
        console.error("Error creating group:", e);
        window.showToast("Failed to create group", "error");
    }
};

window.filterChatUsers = (term) => renderChatUserSearch(term.toLowerCase());

function renderChatUserSearch(term, globalLastText = "Company wide chat", chatMeta = {}) {
    const list = document.getElementById('chat-user-list');
    if (!list) return;

    list.innerHTML = `
        <button onclick="window.selectChat('global')" class="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-[#111] flex items-center gap-3 border-b border-[#eaeaea] dark:border-[#333] transition relative">
            <div class="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0 relative">
                <i class="fa-solid fa-users text-sm"></i>
                <span id="global-unread-badge" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full hidden"></span>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold tracking-tight text-black dark:text-white">Global Group</h4>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">${globalLastText}</p>
            </div>
        </button>
    `;

    const filtered = chatUsers.filter(u => (u.name || u.email || '').toLowerCase().includes(term));

    const filteredGroups = (window.groupChats || []).filter(g => (g.name || '').toLowerCase().includes(term));

    filteredGroups.forEach(g => {
        const lastMsg = g.lastMessage || 'No messages';
        
        const btn = document.createElement('button');
        btn.onclick = () => window.selectChat('group_' + g.docId);
        btn.className = "w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-[#111] flex items-center gap-3 border-b border-[#eaeaea] dark:border-[#333] transition relative";
        btn.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 font-bold flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 overflow-hidden">
                <i class="fa-solid fa-user-group text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center mb-0.5">
                    <h4 class="text-sm font-semibold tracking-tight text-black dark:text-white truncate pr-2">${g.name}</h4>
                    <span class="text-[9px] text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-[#222] px-1.5 py-0.5 rounded">GROUP</span>
                </div>
                <p class="text-[10px] text-gray-500 truncate">${lastMsg}</p>
            </div>
        `;
        list.appendChild(btn);
    });

    filtered.forEach(u => {
        const initial = (u.name || u.email || '?').charAt(0).toUpperCase();
        const lastMsg = chatMeta[u.docId]?.lastMessage || u.email;
        const isUnread = chatMeta[u.docId]?.lastSender && chatMeta[u.docId]?.lastSender !== window.userData.docId && !chatMeta[u.docId]?.read;

        const btn = document.createElement('button');
        btn.onclick = () => window.selectChat(u.docId);
        btn.className = "w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-[#111] flex items-center gap-3 border-b border-[#eaeaea] dark:border-[#333] transition relative";
        btn.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#333] font-bold flex items-center justify-center text-gray-600 dark:text-gray-200 shrink-0 overflow-hidden">
                ${u.photoUrl ? `<img src="${u.photoUrl}" class="w-full h-full object-cover">` : initial}
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center mb-0.5">
                    <h4 class="text-sm font-semibold tracking-tight text-black dark:text-white truncate pr-2">${u.name || u.email}</h4>
                    <span class="text-[9px] text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-[#222] px-1.5 py-0.5 rounded">${u.role || 'EMP'}</span>
                </div>
                <p class="text-[10px] text-gray-500 truncate">${lastMsg}</p>
            </div>
            ${isUnread ? `<span class="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-black dark:bg-white rounded-full"></span>` : ''}
        `;
        list.appendChild(btn);
    });
}

window.selectChat = (contextId) => {
    if (!contextId || typeof contextId !== 'string') return;
    window.currentChatContext = contextId;
    
    if (contextId === 'global' || contextId === 'global_chat') {
        window.currentChatUser = null;
        window.currentGroupChat = null;
    } else if (contextId.startsWith('group_')) {
        window.currentChatUser = null;
        const groupId = contextId.replace('group_', '');
        window.currentGroupChat = window.groupChats.find(g => g.docId === groupId);
    } else {
        window.currentGroupChat = null;
        window.currentChatUser = chatUsers.find(u => u.docId === contextId);
    }

    // UI Update Left Sidebar (Mobile Shift)
    const mainArea = document.getElementById('chat-main-area');
    if (mainArea) {
        mainArea.classList.remove('translate-x-full');
        mainArea.classList.add('translate-x-0', 'active');
    }

    // Header Update
    const headerName = document.getElementById('active-chat-name');
    const headerStatus = document.getElementById('active-chat-status');
    const headerAvatar = document.getElementById('active-chat-avatar');
    const callActions = document.getElementById('chat-call-actions');
    const groupCallBtn = document.getElementById('btn-group-call'); // Need to ensure this exists or is injected

    // Handle extra call action injection for groups
    if (callActions) {
        if (!document.getElementById('btn-group-call-action')) {
            const btnHtml = `<button id="btn-group-call-action" onclick="window.startGroupCall()" class="hidden w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400 transition flex items-center justify-center shrink-0" title="Start Group Video Call"><i class="fa-solid fa-video text-xs"></i></button>`;
            callActions.insertAdjacentHTML('afterbegin', btnHtml);
        }
        const b = document.getElementById('btn-group-call-action');
        if (contextId.startsWith('group_')) b.classList.remove('hidden');
        else b.classList.add('hidden');
    }

    const gearBtn = document.getElementById('btn-chat-group-settings');

    if (contextId === 'global') {
        if (headerName) headerName.textContent = 'Global Group';
        if (headerStatus) headerStatus.textContent = 'Company Chat';
        if (headerAvatar) {
            headerAvatar.innerHTML = '<i class="fa-solid fa-users text-sm"></i>';
            headerAvatar.className = 'w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0 font-bold';
        }
        if (callActions) callActions.classList.add('hidden');
        if (gearBtn) gearBtn.classList.add('hidden');
        runChatListener('global_chat', null);
    } else if (contextId.startsWith('group_')) {
        const gc = window.currentGroupChat;
        if (headerName) headerName.textContent = gc.name;
        if (headerStatus) headerStatus.textContent = gc.users.length + ' Members';
        if (headerAvatar) {
            headerAvatar.className = 'w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold overflow-hidden text-xs';
            headerAvatar.innerHTML = gc.photoUrl ? `<img src="${gc.photoUrl}" class="w-full h-full object-cover">` : '<i class="fa-solid fa-user-group text-sm"></i>';
        }
        if (callActions) callActions.classList.remove('hidden');
        if (gearBtn) gearBtn.classList.remove('hidden');
        const groupId = contextId.replace('group_', '');
        runChatListener('group_chats', groupId);
    } else {
        if (headerName) headerName.textContent = window.currentChatUser.name || window.currentChatUser.email;
        if (headerStatus) headerStatus.textContent = window.currentChatUser.email;
        if (headerAvatar) {
            const initial = (window.currentChatUser.name || window.currentChatUser.email)[0].toUpperCase();
            if (window.currentChatUser.photoUrl) headerAvatar.innerHTML = `<img src="${window.currentChatUser.photoUrl}" class="w-full h-full object-cover">`;
            else headerAvatar.innerHTML = initial;
            headerAvatar.className = 'w-8 h-8 rounded-full bg-gray-200 dark:bg-[#333] text-gray-600 dark:text-gray-200 flex items-center justify-center shrink-0 font-bold overflow-hidden text-xs';
        }
        if (callActions) callActions.classList.remove('hidden');
        if (gearBtn) gearBtn.classList.add('hidden');

        const combinedId = window.userData.docId < window.currentChatUser.docId ?
            `chat_${window.userData.docId}_${window.currentChatUser.docId}` :
            `chat_${window.currentChatUser.docId}_${window.userData.docId}`;

        runChatListener('chats', combinedId);
    }
};

function runChatListener(collectionName, subCollectionId) {
    if (activeChatUnsub) activeChatUnsub();

    const db = window.db;
    const container = document.getElementById('chat-messages-emp');
    if (container) container.innerHTML = '<div class="flex justify-center mt-20"><i class="fa-solid fa-circle-notch fa-spin text-slate-300 dark:text-slate-600 text-2xl"></i></div>';

    let q;
    if (collectionName === 'global_chat') {
        // Global Chat - Filtered by CompanyId
        q = query(collection(db, "global_chat"), where("companyId", "==", window.companyId), orderBy("createdAt", "asc"), limit(100));
    } else if (collectionName === 'group_chats') {
        q = query(collection(db, "group_chats", subCollectionId, "messages"), orderBy("createdAt", "asc"), limit(100));
    } else {
        // 1-on-1 Chat
        q = query(collection(db, "chats", subCollectionId, "messages"), orderBy("createdAt", "asc"), limit(100));
    }

    activeChatUnsub = onSnapshot(q, async (snapshot) => {
        if (!container) return;

        if (snapshot.empty) {
            container.innerHTML = '<div class="text-center text-slate-400 mt-20 text-xs"><p>No messages yet. Start the conversation!</p></div>';
            return;
        }

        container.innerHTML = '';
        let lastSenderId = null;

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const isMe = data.email === window.userData.email;
            const time = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...';
            const msgId = docSnap.id;

            // Mark as seenBy
            if (!isMe && (!data.seenBy || !data.seenBy.includes(window.userData.docId))) {
                const path = collectionName === 'global_chat' ? `global_chat/${msgId}` : (collectionName === 'group_chats' ? `group_chats/${subCollectionId}/messages/${msgId}` : `chats/${subCollectionId}/messages/${msgId}`);
                updateDoc(doc(db, path), { seenBy: arrayUnion(window.userData.docId) }).catch(() => { });
            }

            const canDelete = isMe && data.createdAt && (Date.now() - data.createdAt.toMillis() < 3600000);

            const div = document.createElement('div');
            div.className = `flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-2 w-full max-w-full group/msg`;

            let replyHtml = '';
            if (data.replyTo) {
                replyHtml = `
                    <div class="mb-2 p-2 rounded-lg bg-black/5 dark:bg-white/10 border-l-4 border-green-500 text-[10px] opacity-80 cursor-pointer overflow-hidden" onclick="document.getElementById('${data.replyTo.id}')?.scrollIntoView({behavior:'smooth', block:'center'})">
                        <p class="font-bold text-green-600 truncate">${data.replyTo.sender}</p>
                        <p class="truncate text-slate-500 dark:text-slate-300 italic">${data.replyTo.text}</p>
                    </div>
                `;
            }

            let contentHtml = '';
            if (data.type === 'spam') {
                contentHtml = `<div class="flex items-center gap-2 text-red-300 italic text-[11px]"><i class="fa-solid fa-shield-virus"></i><span>🚫 Message deleted by AI — Spam detected</span></div>`;
            } else {
                contentHtml = `<span class="leading-relaxed relative z-10 break-words">${window.parseChatLinks ? window.parseChatLinks(data.text) : data.text}</span>`;
            }
            if (data.type === 'voice' && data.audioUrl) {
                contentHtml = `
                    <div class="flex items-center gap-3 py-1 min-w-[200px]">
                        <button onclick="window.toggleVoicePlay('${data.audioUrl}', this)" class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-md"><i class="fa-solid fa-play ml-1"></i></button>
                        <div class="flex-1">
                            <div class="h-1 bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden mb-1"><div class="voice-progress h-full bg-green-500 w-0 transition-all duration-100"></div></div>
                            <div class="flex justify-between text-[8px] opacity-60"><span>Voice Message</span><span class="voice-duration">0:00</span></div>
                        </div>
                    </div>
                `;
            } else if (data.type === 'meet_link') {
                contentHtml = `
                    <div class="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/20 max-w-xs min-w-[220px]">
                        <div class="flex items-center gap-2 mb-2"><i class="fa-solid fa-video text-blue-600"></i><span class="text-xs font-bold text-blue-700 dark:text-blue-400">Google Meet Invite</span></div>
                        <p class="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">${data.meetTitle || 'Team Meeting'}</p>
                        <p class="text-[11px] text-slate-600 dark:text-slate-300 mb-1">Host: ${data.meetHost || data.sender || 'Host'}</p>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 mb-3">${data.meetDate || ''}</p>
                        <div class="flex gap-2">
                            <a href="${data.meetUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition"><i class="fa-solid fa-right-to-bracket text-[10px]"></i> Join Meeting</a>
                            <button type="button" onclick="navigator.clipboard && navigator.clipboard.writeText('${data.meetUrl || ''}'); window.showToast && window.showToast('Meet link copied', 'success');" class="px-3 py-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900/40 rounded-lg text-xs font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
                                Copy
                            </button>
                        </div>
                    </div>
                `;
            }

            div.innerHTML = `
                <div class="flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}" id="${msgId}">
                    ${!isMe ? (data.senderPhotoUrl ?
                    `<img src="${data.senderPhotoUrl}" class="w-8 h-8 rounded-full object-cover shrink-0 mt-auto">` :
                    `<div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-500 mt-auto uppercase">${(data.sender || '?')[0]}</div>`
                    ) : ''}
                    
                    <div class="relative ${isMe ? 'bg-green-600 text-white rounded-2xl rounded-tr-none' : 'bg-white dark:bg-[#1a1a1a] dark:text-white border border-[#eaeaea] dark:border-[#333] text-black rounded-2xl rounded-tl-none'} p-3 sm:text-sm text-xs shadow-sm min-w-[80px]">
                        ${!isMe && (collectionName === 'global_chat' || collectionName === 'group_chats') && lastSenderId !== data.email ? `<p class="text-[10px] font-black text-green-600 mb-1">${data.sender || data.email}</p>` : ''}
                        ${replyHtml}
                        ${contentHtml}
                        <div class="flex items-center justify-end gap-1 mt-1 opacity-70">
                            <span class="text-[9px]">${time}</span>
                            ${isMe && collectionName === 'group_chats' ? `<button onclick="window.showSeenInfo('${msgId}', '${subCollectionId}', '${collectionName}')" title="Message info" class="text-[10px] px-1 rounded hover:bg-black/10 dark:hover:bg-white/10 ${data.seenBy?.length > 1 ? 'text-blue-200' : 'text-white/80 dark:text-black/70'}"><i class="fa-solid fa-circle-info"></i></button>` : ''}
                            ${isMe && collectionName !== 'group_chats' ? `<span class="text-[10px] ${data.seenBy?.length > 1 ? 'text-blue-200' : 'text-white/80 dark:text-black/70'}"><i class="fa-solid fa-check-double"></i></span>` : ''}
                        </div>
                        <div class="absolute top-0 ${isMe ? '-left-8' : '-right-8'} flex flex-col gap-1 opacity-80 group-hover/msg:opacity-100 transition-opacity p-1">
                             <button onclick="window.replyToMessage('${msgId}', '${data.sender}', '${(data.text || '').replace(/'/g, "\\'")}')" class="w-6 h-6 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] hover:text-green-500 transition" title="Reply"><i class="fa-solid fa-reply"></i></button>
                             ${canDelete ? `<button onclick="window.deleteChatMessage('${msgId}', '${subCollectionId}')" class="w-6 h-6 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] hover:text-red-500 transition" title="Delete"><i class="fa-solid fa-trash"></i></button>` : ''}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(div);
            lastSenderId = data.email;
        });

    });
}

window.showSeenInfo = async (msgId, subCollectionId, collectionName) => {
    try {
        const path = collectionName === 'global_chat' ? `global_chat/${msgId}` : (collectionName === 'group_chats' ? `group_chats/${subCollectionId}/messages/${msgId}` : `chats/${subCollectionId}/messages/${msgId}`);
        const msgSnap = await getDoc(doc(db, path));
        const data = msgSnap.data();
        if (!data || !data.seenBy) return showToast("No one has seen this yet", "info");

        // Fetch users to get names
        const usersSnap = await getDocs(query(collection(db, "users"), where("companyId", "==", window.companyId)));
        const usersMap = {};
        usersSnap.forEach(d => { usersMap[d.id] = d.data().name || d.data().email; });

        const seenByNames = data.seenBy.map(uid => usersMap[uid] || "Unknown").filter(n => n !== "Unknown");
        
        const modalHtml = `
            <div id="seen-info-modal" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4 animate-fade-in">
                <div class="bg-white dark:bg-[#0a0a0a] rounded-2xl w-full max-w-xs shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                    <div class="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                        <h3 class="text-xs font-black uppercase tracking-widest text-slate-400">Message Info</h3>
                        <button onclick="document.getElementById('seen-info-modal').remove()" class="text-slate-400 hover:text-black dark:hover:text-white transition"><i class="fa-solid fa-times"></i></button>
                    </div>
                    <div class="p-4 max-h-60 overflow-y-auto space-y-3 custom-scrollbar">
                        <p class="text-[10px] font-bold text-blue-500 uppercase mb-2">Read by</p>
                        ${seenByNames.map(name => `
                            <div class="flex items-center gap-2">
                                <i class="fa-solid fa-check-double text-blue-400 text-[10px]"></i>
                                <span class="text-xs text-slate-700 dark:text-slate-200">${name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    } catch(e) { showToast(e.message, "error"); }
};

window.toggleVoicePlay = (url, btn) => {
    const icon = btn.querySelector('i');
    const container = btn.closest('div');
    const progress = container.querySelector('.voice-progress');
    const durationEl = container.querySelector('.voice-duration');
    
    if (window.currentAudio && window.currentAudio.src === url) {
        if (!window.currentAudio.paused) {
            window.currentAudio.pause();
            icon.className = 'fa-solid fa-play ml-1';
        } else {
            window.currentAudio.play();
            icon.className = 'fa-solid fa-pause';
        }
        return;
    }

    if (window.currentAudio) window.currentAudio.pause();
    
    const audio = new Audio(url);
    window.currentAudio = audio;
    icon.className = 'fa-solid fa-pause';
    
    audio.addEventListener('timeupdate', () => {
        const pct = (audio.currentTime / audio.duration) * 100;
        if (progress) progress.style.width = pct + '%';
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        if (durationEl) durationEl.textContent = `${mins}:${secs < 10 ? '0':''}${secs}`;
    });
    
    audio.addEventListener('ended', () => {
        icon.className = 'fa-solid fa-play ml-1';
        if (progress) progress.style.width = '0%';
    });
    
    audio.play();
};

function resolveChatTarget() {
    if (window.currentChatContext === 'global') {
        return { kind: 'global' };
    }

    if (window.currentChatContext && window.currentChatContext.startsWith('group_')) {
        return { kind: 'group', id: window.currentChatContext.replace('group_', '') };
    }

    const otherUserId = window.currentChatUser?.docId;
    if (!otherUserId) {
        throw new Error('No active direct chat selected.');
    }

    const combinedId = window.userData.docId < otherUserId
        ? `chat_${window.userData.docId}_${otherUserId}`
        : `chat_${otherUserId}_${window.userData.docId}`;

    return { kind: 'direct', id: combinedId, otherUserId };
}

async function writeChatMessageByTarget(db, target, messageData) {
    const lastMessageText = messageData.type === 'meet_link'
        ? '📹 Meeting Link'
        : (messageData.type === 'voice' ? '🎤 Voice Message' : messageData.text);

    if (target.kind === 'global') {
        await addDoc(collection(db, 'global_chat'), messageData);
        return;
    }

    if (target.kind === 'group') {
        await setDoc(doc(db, 'group_chats', target.id), {
            lastMessage: lastMessageText,
            lastMessageAt: serverTimestamp(),
            lastSender: window.userData.docId || 'system',
            read: false
        }, { merge: true });
        await addDoc(collection(db, 'group_chats', target.id, 'messages'), messageData);
        return;
    }

    await setDoc(doc(db, 'chats', target.id), {
        lastMessage: lastMessageText,
        lastMessageAt: serverTimestamp(),
        lastSender: window.userData.docId || 'system',
        read: false,
        users: [window.userData.docId, target.otherUserId],
        companyId: window.companyId
    }, { merge: true });
    await addDoc(collection(db, 'chats', target.id, 'messages'), messageData);
}

window.sendChatMessage = async (e, payload = null) => {
    if (e) e.preventDefault();

    const payloadType = payload?.type || null;
    const payloadText = typeof payload?.text === 'string' ? payload.text.trim() : '';
    const input = document.getElementById('chat-input-emp');
    const userTypedText = input ? input.value.trim() : '';
    const text = payloadType
        ? (payloadText || (payloadType === 'voice' ? '🎤 Voice Message' : ''))
        : userTypedText;

    if (!text && !payloadType) return;

    if (!payloadType && input) input.value = '';

    try {
        const db = window.db;
        const target = resolveChatTarget();
        let isSpam = false;
        let groupId = null;

        if (!payloadType && (window.currentChatContext.startsWith('group_') || window.currentChatContext === 'global')) {
            groupId = window.currentChatContext === 'global' ? 'global' : window.currentChatContext.replace('group_', '');
            
            // Check spam filter if group
            if (groupId !== 'global') {
                const groupSnap = await getDoc(doc(db, "group_chats", groupId));
                const group = groupSnap.data();
                if (group && group.spamFilter && checkSpam(text)) {
                    isSpam = true;
                }
            }
        }

        const messageData = {
            text: isSpam ? '🚫 *Message deleted by AI: Spam detected*' : text,
            sender: (window.userData.name || window.userData.email || 'Employee'),
            senderPhotoUrl: (window.userData.photoUrl || ''),
            email: (window.userData.email || ''),
            role: (window.userData.role || 'USER'),
            read: false,
            createdAt: serverTimestamp(),
            companyId: window.companyId,
            seenBy: [window.userData.docId], // Initialize seenBy with sender
            replyTo: currentReplyMessage || null,
            type: payloadType || (isSpam ? 'spam' : 'text'),
            audioUrl: payload?.audioUrl || null,
            meetUrl: payload?.meetUrl || null,
            meetTitle: payload?.meetTitle || null,
            meetHost: payload?.meetHost || null,
            meetDate: payload?.meetDate || null
        };

        if (isSpam) {
            messageData.originalText = text; // Log for audit if needed
        }

        await writeChatMessageByTarget(db, target, messageData);

        cancelReply();
        if (input) input.focus();
        const container = document.getElementById('chat-messages-emp');
        if (container) setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);

        // Notify AI if tagged in user text messages
        if (!payloadType && !isSpam && text.toLowerCase().includes('@ai')) {
            setTimeout(() => {
                handleAIChatRequest(db, window.userData, window.companyId, window.currentChatContext, window.currentChatUser);
            }, 1000);
        }

        // Handle @meet (only for user text, non-spam)
        if (!payloadType && !isSpam && text.toLowerCase().includes('@meet')) {
            setTimeout(async () => {
                try {
                    if (!window.GDriveService || !window.GDriveService.isConnected()) {
                        await window.sendChatMessage(null, {
                            type: 'system',
                            text: '⚠️ Google account connect karo: Profile -> Integrations, tab @meet ka link banega.'
                        });
                        return;
                    }

                    const meetResult = await window.GDriveService.createMeetLink('Explyra Meeting — ' + (window.userData.name || 'Team'));
                    await window.sendChatMessage(null, { 
                        type: 'meet_link', 
                        text: `Meeting invite created by ${window.userData.name || 'Host'}`,
                        meetUrl: meetResult.meetUrl,
                        meetTitle: 'Team Sync Meeting',
                        meetHost: window.userData.name || window.userData.email,
                        meetDate: new Date().toLocaleString()
                    });
                } catch (err) { console.error('@meet error:', err); }
            }, 500);
        }
    } catch (e) {
        console.error("Chat Error:", e);
        showToast("Failed to send: " + e.message, "error");
    }
};

window.deleteChatMessage = async (msgId, subCollectionId) => {
    if (!confirm("Delete this message?")) return;
    try {
        const db = window.db;
        let path = '';
        if (window.currentChatContext === 'global') {
            path = `global_chat/${msgId}`;
        } else if (window.currentChatContext.startsWith('group_')) {
            const groupId = window.currentChatContext.replace('group_', '');
            path = `group_chats/${groupId}/messages/${msgId}`;
        } else {
            path = `chats/${subCollectionId}/messages/${msgId}`;
        }
        await deleteDoc(doc(db, path));
        showToast("Message deleted", "info");
    } catch (e) {
        showToast("Failed to delete: " + e.message, "error");
    }
};

window.sendLocationMessage = () => {
    if (!navigator.geolocation) return window.showToast("Geolocation not supported", "error");
    
    window.showToast("Getting location...", "info");
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const msg = `📍 Shared Location: ${mapUrl}`;
        
        const input = document.getElementById('chat-input-emp');
        if (input) {
            input.value = msg;
            const form = input.closest('form');
            if (form) form.dispatchEvent(new Event('submit'));
        }
    }, (err) => {
        window.showToast("Location access denied", "error");
    });
};

// --- Reply & Voice Functions ---
window.replyToMessage = (msgId, sender, text) => {
    currentReplyMessage = { id: msgId, sender, text };
    const container = document.getElementById('reply-preview-container');
    const nameEl = document.getElementById('reply-to-name');
    const contentEl = document.getElementById('reply-to-content');
    if (container && nameEl && contentEl) {
        nameEl.textContent = `Replying to ${sender}`;
        contentEl.textContent = text;
        container.classList.remove('hidden');
        container.classList.add('flex');
        document.getElementById('chat-input-emp').focus();
    }
};

window.cancelReply = () => {
    currentReplyMessage = null;
    const container = document.getElementById('reply-preview-container');
    if (container) {
        container.classList.add('hidden');
        container.classList.remove('flex');
    }
};

window.startVoiceRecord = async () => {
    if (!voiceRecorder) voiceRecorder = new VoiceRecorder();
    const success = await voiceRecorder.start();
    if (success) {
        document.getElementById('voice-recorder-ui').classList.remove('hidden');
        document.getElementById('voice-recorder-ui').classList.add('flex');
        document.getElementById('chat-form-emp').classList.add('hidden');
        
        voiceStartTime = Date.now();
        voiceTimerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - voiceStartTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            document.getElementById('voice-timer').textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            document.getElementById('voice-waveform').style.width = `${Math.min(100, elapsed * 10)}%`;
        }, 100);
    }
};

window.cancelVoiceRecord = () => {
    if (voiceRecorder) voiceRecorder.stop();
    clearInterval(voiceTimerInterval);
    document.getElementById('voice-recorder-ui').classList.add('hidden');
    document.getElementById('voice-recorder-ui').classList.remove('flex');
    document.getElementById('chat-form-emp').classList.remove('hidden');
};

window.stopAndSendVoice = async () => {
    const blob = await voiceRecorder.stop();
    clearInterval(voiceTimerInterval);
    document.getElementById('voice-recorder-ui').classList.add('hidden');
    document.getElementById('voice-recorder-ui').classList.remove('flex');
    document.getElementById('chat-form-emp').classList.remove('hidden');

    if (blob.size < 1000) return showToast("Recording too short", "error");

    showToast("Uploading voice message...", "info");
    const filename = `voice_${Date.now()}.webm`;
    const storageRef = ref(window.storage, `chats/voice/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed', null, (e) => showToast(e.message, "error"), async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        window.sendChatMessage(null, { type: 'voice', audioUrl: url });
    });
};

// --- Group Settings ---
window.openGroupSettings = async () => {
    const ctx = window.currentChatContext;
    if (ctx === 'global') return showToast("Settings not available for Global Group", "info");
    if (!ctx.startsWith('group_')) return showToast("Settings only for groups", "info");
    const groupId = ctx.replace('group_', '');
    const groupSnap = await getDoc(doc(db, "group_chats", groupId));
    const group = groupSnap.data();
    if (!group) return;

    const isAdmin = group.admins?.includes(window.userData.docId) || window.userData.role === 'ADMIN' || window.userData.role === 'HR';
    const usersSnap = await getDocs(query(collection(db, "users"), where("companyId", "==", window.companyId)));
    const allUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    const membersHtml = allUsers.map(u => {
        const isMember = group.users.includes(u.id);
        const isGroupAdmin = group.admins?.includes(u.id);
        if (!isMember && !isAdmin) return ''; // Only show members unless you are admin
        return `
            <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-[#111] rounded-xl transition">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs uppercase">${u.name[0]}</div>
                    <div>
                        <p class="text-xs font-bold text-slate-800 dark:text-slate-100">${u.name} ${isGroupAdmin ? '<span class="text-[8px] bg-green-100 text-green-600 px-1 rounded ml-1">ADMIN</span>' : ''}</p>
                        <p class="text-[9px] text-slate-400">${u.role}</p>
                    </div>
                </div>
                ${isAdmin && u.id !== window.userData.docId ? `
                    <div class="flex gap-1">
                        <button onclick="window.toggleGroupMember('${groupId}', '${u.id}', ${isMember})" class="p-1.5 rounded-lg ${isMember ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'} transition"><i class="fa-solid ${isMember ? 'fa-user-minus' : 'fa-user-plus'}"></i></button>
                        ${isMember ? `<button onclick="window.toggleGroupAdmin('${groupId}', '${u.id}', ${isGroupAdmin})" class="p-1.5 rounded-lg ${isGroupAdmin ? 'text-orange-500 hover:bg-orange-50' : 'text-blue-500 hover:bg-blue-50'} transition" title="${isGroupAdmin ? 'Remove Admin' : 'Make Admin'}"><i class="fa-solid fa-crown"></i></button>` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    const modalHtml = `
        <div id="group-settings-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fade-in shadow-2xl">
            <div class="bg-white dark:bg-[#0a0a0a] rounded-3xl w-full max-w-md border border-gray-200 dark:border-[#333] overflow-hidden flex flex-col max-h-[85vh]">
                <div class="p-5 border-b border-gray-100 dark:border-[#222] flex justify-between items-center bg-slate-50 dark:bg-[#0a0a0a]">
                    <h3 class="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm">Group Settings</h3>
                    <button onclick="document.getElementById('group-settings-modal').remove()" class="text-gray-400 hover:text-black dark:hover:text-white transition"><i class="fa-solid fa-times"></i></button>
                </div>
                <div class="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                    <div class="flex flex-col items-center gap-4">
                        <div class="relative group">
                            <div id="group-settings-pic" class="w-24 h-24 rounded-3xl bg-green-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden shadow-xl shadow-green-500/20">
                                ${group.photoUrl ? `<img src="${group.photoUrl}" class="w-full h-full object-cover">` : `<i class="fa-solid fa-users"></i>`}
                            </div>
                            ${isAdmin ? `
                                <label class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition border border-gray-100 dark:border-gray-800">
                                    <i class="fa-solid fa-camera text-slate-600 text-xs"></i>
                                    <input type="file" class="hidden" onchange="window.uploadGroupPic(this, '${groupId}')" accept="image/*">
                                </label>
                            ` : ''}
                        </div>
                        <div class="text-center w-full">
                            ${isAdmin ? 
                                `<input type="text" id="edit-group-name" class="text-center w-full font-bold text-slate-800 dark:text-white text-lg bg-transparent border-b border-dashed border-slate-300 focus:border-green-500 outline-none pb-1" value="${group.name}">` : 
                                `<h4 class="font-bold text-slate-800 dark:text-white text-lg">${group.name}</h4>`
                            }
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                        <div class="flex items-center gap-2">
                             <div class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center"><i class="fa-solid fa-shield-virus"></i></div>
                             <div>
                                <p class="text-xs font-bold text-red-700 dark:text-red-400">AI Spam Filter</p>
                                <p class="text-[9px] text-red-600/80">Deletes toxic/spam messages</p>
                             </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" onchange="window.toggleGroupSpam('${groupId}', this.checked)" class="sr-only peer" ${group.spamFilter ? 'checked' : ''} ${!isAdmin ? 'disabled' : ''}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                        </label>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Group Members (${group.users.length})</h4>
                            <button onclick="window.exportMessages('${groupId}')" class="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-widest"><i class="fa-solid fa-download mr-1"></i> Export Chats</button>
                        </div>
                        <div class="space-y-1 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                            ${membersHtml}
                        </div>
                    </div>
                </div>
                ${isAdmin ? `
                    <div class="p-5 border-t border-gray-100 dark:border-[#222] bg-slate-50 dark:bg-[#0a0a0a]">
                        <button onclick="window.saveGroupSettings('${groupId}')" class="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-bold shadow-lg hover:opacity-90 active:scale-95 transition text-sm">Save Changes</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.toggleGroupMember = async (groupId, uid, isMember) => {
    try {
        await updateDoc(doc(db, "group_chats", groupId), {
            users: isMember ? arrayRemove(uid) : arrayUnion(uid)
        });
        showToast(isMember ? "Member removed" : "Member added", "success");
        document.getElementById('group-settings-modal')?.remove();
        openGroupSettings();
    } catch (e) { showToast(e.message, "error"); }
};

window.toggleGroupAdmin = async (groupId, uid, isGroupAdmin) => {
    try {
        await updateDoc(doc(db, "group_chats", groupId), {
            admins: isGroupAdmin ? arrayRemove(uid) : arrayUnion(uid)
        });
        showToast(isGroupAdmin ? "Admin role removed" : "User appointed as Admin", "success");
        document.getElementById('group-settings-modal')?.remove();
        openGroupSettings();
    } catch (e) { showToast(e.message, "error"); }
};

window.toggleGroupSpam = async (groupId, enabled) => {
    try {
        await updateDoc(doc(db, "group_chats", groupId), { spamFilter: enabled });
        showToast(`AI Spam Filter ${enabled ? 'Enabled' : 'Disabled'}`, enabled ? "success" : "info");
    } catch (e) { showToast(e.message, "error"); }
};

window.uploadGroupPic = async (input, groupId) => {
    const file = input.files[0];
    if (!file) return;
    
    showToast("Updating picture...", "info");
    const filename = `group_${groupId}_${Date.now()}`;
    const storageRef = ref(window.storage, `groups/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', null, (e) => showToast(e.message, "error"), async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, "group_chats", groupId), { photoUrl: url });
        const picEl = document.getElementById('group-settings-pic');
        if (picEl) picEl.innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
        showToast("Picture updated!", "success");
        if (window.currentChatContext === 'group_' + groupId) {
             document.getElementById('active-chat-avatar').innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
        }
    });
};

window.saveGroupSettings = async (groupId) => {
    const newName = document.getElementById('edit-group-name').value.trim();
    if (!newName) return;
    try {
        await updateDoc(doc(db, "group_chats", groupId), { name: newName });
        showToast("Settings saved!", "success");
        document.getElementById('group-settings-modal')?.remove();
        window.fetchChatUsers();
    } catch (e) { showToast(e.message, "error"); }
};

window.exportMessages = async (groupId) => {
    showToast("Preparing export...", "info");
    const q = query(collection(db, "group_chats", groupId, "messages"), orderBy("createdAt", "asc"));
    const snap = await getDocs(q);
    const msgs = snap.docs.map(d => {
        const data = d.data();
        let timestamp = 'N/A';
        try { timestamp = data.createdAt?.toDate().toISOString(); } catch(err) {}
        return `"${data.sender || data.email}","${(data.text || '').replace(/"/g, '""')}","${timestamp}"`;
    });
    
    const csv = "Sender,Message,Timestamp\n" + msgs.join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `group_chat_${groupId}.csv`;
    a.click();
};

// Wrappers for HTML modal buttons
window.exportChatMessages = () => {
    const ctx = window.currentChatContext;
    if (!ctx.startsWith('group_')) return showToast("Export only available for groups", "info");
    window.exportMessages(ctx.replace('group_', ''));
};

window.saveGroupName = async () => {
    const ctx = window.currentChatContext;
    if (!ctx.startsWith('group_')) return;
    const groupId = ctx.replace('group_', '');
    const nameInput = document.getElementById('group-settings-name');
    const newName = nameInput?.value?.trim();
    if (!newName) return showToast("Enter a group name", "error");
    try {
        await updateDoc(doc(db, "group_chats", groupId), { name: newName });
        showToast("Group name updated!", "success");
        document.getElementById('active-chat-name').textContent = newName;
        window.fetchChatUsers();
    } catch (e) { showToast(e.message, "error"); }
};

window.toggleSpamFilter = async (enabled) => {
    const ctx = window.currentChatContext;
    if (!ctx.startsWith('group_')) return;
    const groupId = ctx.replace('group_', '');
    window.toggleGroupSpam(groupId, enabled);
};
