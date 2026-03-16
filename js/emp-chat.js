// js/emp-chat.js
import { collection, query, where, getDocs, doc, onSnapshot, serverTimestamp, orderBy, limit, addDoc, setDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { handleAIChatRequest } from './chat-ai-helper.js';


let activeChatUnsub = null;
let chatUsers = [];
window.currentChatContext = 'global'; // 'global' or 'userDocId'
window.currentChatUser = null;

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
            users: selectedUsers,
            createdAt: serverTimestamp(),
            lastMessage: "Group created",
            lastMessageAt: serverTimestamp(),
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
    window.currentChatContext = contextId;
    
    if (contextId === 'global') {
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
        mainArea.classList.add('translate-x-0');
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

    if (contextId === 'global') {
        if (headerName) headerName.textContent = 'Global Group';
        if (headerStatus) headerStatus.textContent = 'Company Chat';
        if (headerAvatar) {
            headerAvatar.innerHTML = '<i class="fa-solid fa-users text-sm"></i>';
            headerAvatar.className = 'w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0 font-bold';
        }
        if (callActions) callActions.classList.add('hidden');
        runChatListener('global_chat', null);
    } else if (contextId.startsWith('group_')) {
        if (headerName) headerName.textContent = window.currentGroupChat.name;
        if (headerStatus) headerStatus.textContent = window.currentGroupChat.users.length + ' Members';
        if (headerAvatar) {
            headerAvatar.innerHTML = '<i class="fa-solid fa-user-group text-sm"></i>';
            headerAvatar.className = 'w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold overflow-hidden text-xs';
        }
        if (callActions) callActions.classList.remove('hidden');
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

    activeChatUnsub = onSnapshot(q, (snapshot) => {
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

            // Mark as read if receiving and not read
            if (!isMe && !data.read) {
                const path = subCollectionId ? `chats/${subCollectionId}/messages/${msgId}` : `global_chat/${msgId}`;
                updateDoc(doc(db, path), { read: true }).catch(() => { });
                // Update chat doc if private
                if (subCollectionId) {
                    updateDoc(doc(db, "chats", subCollectionId), { read: true }).catch(() => { });
                }
            }

            const canDelete = isMe && data.createdAt && (Date.now() - data.createdAt.toMillis() < 60000);

            const div = document.createElement('div');
            div.className = `flex flex-col ${isMe ? 'items-end' : 'items-start'} drop-in w-full max-w-full group`;

            div.innerHTML = `
                <div class="flex items-end gap-2 max-w-[85%] ${isMe ? 'flex-row-reverse' : ''}">
                    ${!isMe ? (data.senderPhotoUrl ?
                    `<img src="${data.senderPhotoUrl}" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 border border-white dark:border-[#111] mt-auto">` :
                    `<div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 bg-gray-200 dark:bg-[#333] text-gray-600 dark:text-gray-200 mt-auto border border-white dark:border-[#111] uppercase">${(data.sender || data.email || '?')[0]}</div>`
                ) : ''}
                    
                    <div class="relative ${isMe ? 'bg-black dark:bg-white text-white dark:text-black font-medium' : 'bg-gray-100 dark:bg-[#111] dark:text-white border border-[#eaeaea] dark:border-[#333] text-black'} p-3 rounded-2xl ${isMe ? 'rounded-br-sm' : 'rounded-bl-sm'} sm:text-sm text-xs relative overflow-hidden break-words">
                        ${!isMe && subCollectionId === null && lastSenderId !== data.email ? `<p class="text-[9px] font-bold ${isMe ? 'dark:text-gray-800 text-gray-200' : 'text-gray-500'} mb-1">${data.sender || data.email}</p>` : ''}
                        <span class="leading-relaxed relative z-10 break-words">${window.parseChatLinks ? window.parseChatLinks(data.text) : data.text}</span>
                        <div class="flex items-center justify-end gap-1 mt-1">
                            <div class="text-[9px] ${isMe ? 'opacity-70' : 'text-gray-500'} text-right font-mono">${time}</div>
                            ${isMe ? `<span class="text-[10px] ${data.read ? 'text-green-400' : 'opacity-70'}"><i class="fa-solid fa-check-double"></i></span>` : ''}
                        </div>
                        ${canDelete ? `
                            <button onclick="window.deleteChatMessage('${msgId}', '${subCollectionId}')" class="absolute -top-1 ${isMe ? '-left-1' : '-right-1'} w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
            container.appendChild(div);
            lastSenderId = data.email;
        });

        // Keep scroll at bottom
        setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
    });
}

window.sendChatMessage = async (e) => {
    if (e) e.preventDefault();
    const input = document.getElementById('chat-input-emp');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    try {
        const db = window.db;
        const messageData = {
            text,
            sender: (window.userData.name || window.userData.email || 'Employee'),
            senderPhotoUrl: (window.userData.photoUrl || ''),
            email: (window.userData.email || ''),
            role: (window.userData.role || 'USER'),
            read: false,
            createdAt: serverTimestamp(),
            companyId: window.companyId // INJECT COMPANY ID!
        };

        if (window.currentChatContext === 'global') {
            await addDoc(collection(db, "global_chat"), messageData);
        } else if (window.currentChatContext.startsWith('group_')) {
            const groupId = window.currentChatContext.replace('group_', '');
            await setDoc(doc(db, "group_chats", groupId), { lastMessage: text, lastMessageAt: serverTimestamp() }, { merge: true });
            await addDoc(collection(db, "group_chats", groupId, "messages"), messageData);
        } else {
            const combinedId = window.userData.docId < window.currentChatUser.docId ?
                `chat_${window.userData.docId}_${window.currentChatUser.docId}` :
                `chat_${window.currentChatUser.docId}_${window.userData.docId}`;

            const chatMetaUpdate = {
                lastMessage: text,
                lastMessageAt: serverTimestamp(),
                lastSender: window.userData.docId || 'system',
                read: false,
                users: [window.userData.docId, window.currentChatUser.docId],
                companyId: window.companyId // ALSO INJECT IN CHAT META
            };

            await setDoc(doc(db, "chats", combinedId), chatMetaUpdate, { merge: true });
            await addDoc(collection(db, "chats", combinedId, "messages"), messageData);
        }

        const container = document.getElementById('chat-messages-emp');
        if (container) setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);

        // --- @ai Trigger ---
        if (text.toLowerCase().includes('@ai')) {
            setTimeout(() => {
                handleAIChatRequest(db, window.userData, window.companyId, window.currentChatContext, window.currentChatUser);
            }, 1000);
        }

    } catch (e) {
        console.error("Chat Error:", e);
        window.showToast("Failed to send: " + e.message, "error");
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
        window.showToast("Message deleted", "info");
    } catch (e) {
        window.showToast("Failed to delete: " + e.message, "error");
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
