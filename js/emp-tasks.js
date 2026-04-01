// js/emp-tasks.js — Enhanced Task Manager v2
// Features: Comments, CC, Followup view, Dashboard, Reopen

import {
    collection, query, where, onSnapshot, updateDoc, doc,
    serverTimestamp, getDocs, addDoc, orderBy, limit,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ─── State ────────────────────────────────────────────────────────────────────
window.empTasksData = [];
window.empTasksLoaded = false;
window.empTasksUnsub = null;
window.empTasksTab = 'assigned'; // 'assigned' | 'created' | 'cc'
window._taskDetailId = null;

// ─── Load Tasks (live) ────────────────────────────────────────────────────────
window.fetchEmpTasks = () => {
    if (!window.currentUser || !window.userData) return;

    const tab = window.empTasksTab || 'assigned';

    if (window.empTasksUnsub && window.lastTasksTab === tab) {
        console.log('[emp-tasks] Listener already active for tab:', tab);
        return;
    }

    if (typeof window.empTasksUnsub === 'function') {
        window.empTasksUnsub();
        window.empTasksUnsub = null;
    }
    window.lastTasksTab = tab;

    window.empTasksLoaded = true;
    const list = document.getElementById('emp-tasks-list');
    if (list) list.innerHTML = '<div class="text-center text-slate-400 mt-6"><i class="fa-solid fa-circle-notch fa-spin text-2xl"></i><p class="text-xs mt-2">Syncing tasks...</p></div>';

    const db = window.db;
    const email = window.userData.email;

    let q;
    if (tab === 'assigned') {
        q = query(collection(db, "tasks"), where("assignedTo", "==", email), limit(150));
    } else if (tab === 'created') {
        q = query(collection(db, "tasks"), where("assignedBy", "==", email), limit(150));
    } else if (tab === 'cc') {
        q = query(collection(db, "tasks"), where("cc", "array-contains", email), limit(150));
    } else {
        q = query(collection(db, "tasks"), where("assignedTo", "==", email), limit(150));
    }

    window.empTasksUnsub = onSnapshot(q, (snapshot) => {
        window.empTasksData = [];
        snapshot.forEach(s => window.empTasksData.push({ id: s.id, ...s.data() }));
        window.empTasksData.sort((a, b) => {
            const dA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dB - dA;
        });
        window.filterEmpTasks();
    }, (err) => {
        console.error("Task Sync Error:", err);
        if (list) list.innerHTML = `<div class="text-center text-red-500 mt-4 p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-xl"><i class="fa-solid fa-exclamation-triangle text-2xl mb-2"></i><p class="font-bold text-sm">Sync Error</p><p class="text-xs mt-1">${err.code || err.message}</p></div>`;
    });
};

// ─── Switch Tab ───────────────────────────────────────────────────────────────
window.switchTaskTab = (tab) => {
    window.empTasksTab = tab;
    
    const render = () => {
        ['assigned', 'created', 'cc'].forEach(t => {
            const btn = document.getElementById(`task-tab-${t}`);
            if (btn) {
                if (t === tab) {
                    btn.classList.add('bg-black', 'dark:bg-white', 'text-white', 'dark:text-black');
                    btn.classList.remove('text-slate-500', 'hover:text-slate-800');
                } else {
                    btn.classList.remove('bg-black', 'dark:bg-white', 'text-white', 'dark:text-black');
                    btn.classList.add('text-slate-500', 'hover:text-slate-800');
                }
            }
        });
        
        if (typeof window.fetchEmpTasks === 'function') {
            window.fetchEmpTasks();
        }
    };
    
    requestAnimationFrame(render);
};

// ─── Filter/Render Tasks ──────────────────────────────────────────────────────
window.filterEmpTasks = () => {
    const list = document.getElementById('emp-tasks-list');
    if (!list || !window.empTasksData) return;

    const search = (document.getElementById('emp-task-search')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('emp-task-status-filter')?.value || 'ALL';
    const isReadOnly = window.empTasksTab === 'cc';

    let filtered = window.empTasksData.filter(t => {
        const matchesSearch = (t.title + (t.description || '')).toLowerCase().includes(search);
        const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
        list.innerHTML = _emptyState("No tasks match your criteria.");
        return;
    }

    list.innerHTML = filtered.map(t => _renderTaskCard(t, isReadOnly)).join('');
};

function _renderTaskCard(t, isReadOnly = false) {
    const statusMeta = {
        'PENDING': { cls: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400', icon: 'fa-clock', label: 'Pending' },
        'IN_PROGRESS': { cls: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400', icon: 'fa-spinner', label: 'In Progress' },
        'COMPLETED': { cls: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400', icon: 'fa-check-circle', label: 'Completed' },
        'REOPENED': { cls: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400', icon: 'fa-rotate-left', label: 'Reopened' },
        'ON_HOLD': { cls: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300', icon: 'fa-pause', label: 'On Hold' }
    };
    const s = statusMeta[t.status] || statusMeta['PENDING'];
    const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED';
    const ccList = (t.cc || []).join(', ');
    const commentCount = t.commentCount || 0;

    return `
    <div class="group bg-white dark:bg-slate-800 rounded-xl border ${isOverdue ? 'border-red-200 dark:border-red-800' : 'border-slate-100 dark:border-slate-700'} shadow-sm hover:shadow-md transition-all duration-200 mb-3 overflow-hidden">
        <div class="p-4">
            <div class="flex items-start justify-between gap-3 mb-2">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        ${isOverdue ? '<span class="text-[9px] font-black uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">Overdue</span>' : ''}
                        ${t.priority === 'HIGH' ? '<span class="text-[9px] font-black uppercase tracking-wider text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded"><i class="fa-solid fa-fire mr-0.5"></i>High</span>' : ''}
                    </div>
                    <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm leading-snug">${t.title}</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">${t.description || 'No description.'}</p>
                </div>
                <span class="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${s.cls}">
                    <i class="fa-solid ${s.icon} text-[9px]"></i>${s.label}
                </span>
            </div>

            <div class="mt-3 pt-3 border-t border-slate-50 dark:border-slate-700/50 flex flex-wrap gap-3 text-[10px] text-slate-500 dark:text-slate-400 items-center">
                <span class="flex items-center gap-1"><i class="fa-solid fa-user-pen text-indigo-400"></i> <span class="font-semibold">${t.assignedBy || '—'}</span></span>
                <span class="flex items-center gap-1"><i class="fa-solid fa-user-check text-green-400"></i> <span class="font-semibold">${t.assignedTo || '—'}</span></span>
                <span class="flex items-center gap-1 ${isOverdue ? 'text-red-500 font-bold' : ''}"><i class="fa-regular fa-calendar-xmark text-red-400"></i> Due: <span class="font-semibold">${t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—'}</span></span>
                ${ccList ? `<span class="flex items-center gap-1"><i class="fa-solid fa-at text-purple-400"></i> CC: <span class="font-semibold truncate max-w-[120px]">${ccList}</span></span>` : ''}
                <span class="flex items-center gap-1 ml-auto">
                    <button onclick="window.openTaskDetail('${t.id}')" class="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-bold transition">
                        <i class="fa-solid fa-comment-dots"></i> Comments ${commentCount > 0 ? `<span class="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">${commentCount}</span>` : ''}
                    </button>
                    ${!isReadOnly && t.status !== 'COMPLETED' ? `
                    <button onclick="window.updateTaskStatus('${t.id}', 'COMPLETED')" class="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow-sm ml-1">
                        <i class="fa-solid fa-check"></i> Done
                    </button>` : ''}
                    ${!isReadOnly && t.status === 'COMPLETED' ? `
                    <button onclick="window.updateTaskStatus('${t.id}', 'REOPENED')" class="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition shadow-sm ml-1">
                        <i class="fa-solid fa-rotate-left"></i> Reopen
                    </button>` : ''}
                </span>
            </div>
        </div>
    </div>`;
}

function _emptyState(msg) {
    return `
    <div class="flex flex-col items-center justify-center p-10 text-center bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 mt-2">
        <div class="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
            <i class="fa-solid fa-list-check text-2xl"></i>
        </div>
        <h3 class="font-bold text-slate-700 dark:text-slate-200 mb-1">No Tasks Found</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">${msg}</p>
    </div>`;
}

// ─── Update Status ────────────────────────────────────────────────────────────
window.updateTaskStatus = async (taskId, newStatus) => {
    try {
        const db = window.db;
        await updateDoc(doc(db, "tasks", taskId), {
            status: newStatus,
            updatedAt: serverTimestamp(),
            [`statusHistory.${Date.now()}`]: {
                status: newStatus,
                by: window.userData.email,
                at: new Date().toISOString()
            }
        });
        // Add system comment for status change
        await addDoc(collection(db, "tasks", taskId, "comments"), {
            text: `Status changed to **${newStatus.replace('_', ' ')}**`,
            type: 'SYSTEM',
            author: window.userData.email,
            authorName: window.userData.name || window.userData.email,
            createdAt: serverTimestamp()
        });
        await updateDoc(doc(db, "tasks", taskId), { commentCount: (await _getCommentCount(taskId)) });
        window.showToast(`Task marked as ${newStatus.replace('_', ' ')}`, "success");
    } catch (err) {
        window.showToast("Failed to update: " + err.message, "error");
    }
};

async function _getCommentCount(taskId) {
    try {
        const snap = await getDocs(collection(window.db, "tasks", taskId, "comments"));
        return snap.size;
    } catch { return 0; }
}

// ─── Task Detail & Comments Modal ────────────────────────────────────────────
window.openTaskDetail = async (taskId) => {
    window._taskDetailId = taskId;
    const modal = document.getElementById('modal-task-detail');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.getElementById('task-detail-body').innerHTML = '<div class="flex items-center justify-center h-40"><i class="fa-solid fa-circle-notch fa-spin text-2xl text-slate-400"></i></div>';
    document.getElementById('task-comments-list').innerHTML = '';

    const db = window.db;
    try {
        const taskSnap = await getDoc(doc(db, "tasks", taskId));
        if (!taskSnap.exists()) { window.showToast("Task not found", "error"); return; }
        const t = { id: taskSnap.id, ...taskSnap.data() };

        const statusOptions = ['PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'REOPENED'].map(s =>
            `<option value="${s}" ${t.status === s ? 'selected' : ''}>${s.replace('_', ' ')}</option>`
        ).join('');

        const isAssignee = t.assignedTo === window.userData.email;
        const isCreator = t.assignedBy === window.userData.email;
        const canEdit = isAssignee || isCreator;
        const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED';

        document.getElementById('task-detail-body').innerHTML = `
            <div class="space-y-4">
                <div class="flex items-start gap-3">
                    <div class="flex-1">
                        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">${t.title}</h2>
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${t.description || 'No description.'}</p>
                    </div>
                    ${canEdit ? `
                    <select onchange="window.updateTaskStatus('${t.id}', this.value)" class="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none">
                        ${statusOptions}
                    </select>` : `<span class="text-xs font-bold px-3 py-1 rounded-full border bg-slate-100 text-slate-600">${t.status}</span>`}
                </div>
                <div class="grid grid-cols-2 gap-3 text-xs">
                    <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                        <p class="text-slate-400 uppercase font-bold text-[9px] mb-1">Assigned By</p>
                        <p class="font-semibold text-slate-700 dark:text-slate-300">${t.assignedBy || '—'}</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                        <p class="text-slate-400 uppercase font-bold text-[9px] mb-1">Assigned To</p>
                        <p class="font-semibold text-slate-700 dark:text-slate-300">${t.assignedTo || '—'}</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 ${isOverdue ? 'border border-red-200 dark:border-red-800' : ''}">
                        <p class="text-slate-400 uppercase font-bold text-[9px] mb-1">Due Date</p>
                        <p class="font-semibold ${isOverdue ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}">${t.dueDate ? new Date(t.dueDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '—'} ${isOverdue ? '⚠️' : ''}</p>
                    </div>
                    <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                        <p class="text-slate-400 uppercase font-bold text-[9px] mb-1">Priority</p>
                        <p class="font-semibold text-slate-700 dark:text-slate-300">${t.priority || 'Normal'}</p>
                    </div>
                </div>
                ${t.cc && t.cc.length > 0 ? `
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-xs">
                    <p class="text-purple-500 uppercase font-bold text-[9px] mb-1"><i class="fa-solid fa-at mr-1"></i>CC'd Observers</p>
                    <div class="flex flex-wrap gap-1 mt-1">${t.cc.map(e => `<span class="bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-[10px] font-medium">${e}</span>`).join('')}</div>
                </div>` : ''}

                ${t.attachment ? `
                <div class="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-4">
                    <h4 class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><i class="fa-solid fa-paperclip"></i> Attachment</h4>
                    ${t.attachment.type.startsWith('image/') ? `
                        <div class="relative group rounded-lg overflow-hidden border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 aspect-video flex-shrink-0 cursor-zoom-in" onclick="document.getElementById('img-overlay').classList.remove('hidden'); document.getElementById('overlay-img').src='${t.attachment.url}';">
                            <img src="${t.attachment.url}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Attachment Preview">
                            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <i class="fa-solid fa-magnifying-glass-plus text-white text-3xl"></i>
                            </div>
                        </div>
                        <div class="mt-2 text-center text-[10px] text-slate-500 font-medium truncate">${t.attachment.name}</div>
                    ` : `
                        <div class="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
                            <div class="flex items-center gap-3 overflow-hidden">
                                <div class="w-10 h-10 shrink-0 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center text-lg">
                                    <i class="fa-solid ${t.attachment.name.endsWith('.pdf') ? 'fa-file-pdf' : 'fa-file-lines'}"></i>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">${t.attachment.name}</p>
                                    <p class="text-[10px] text-slate-500 uppercase tracking-wider">${(t.attachment.size / 1024).toFixed(1)} KB • ${t.attachment.name.split('.').pop()}</p>
                                </div>
                            </div>
                            <a href="${t.attachment.url}" target="_blank" download class="w-8 h-8 shrink-0 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition" title="Download Document">
                                <i class="fa-solid fa-download text-sm"></i>
                            </a>
                        </div>
                    `}
                </div>
                ` : ''}
            </div>`;

        // Load comments live
        _loadTaskComments(taskId);
    } catch (err) {
        document.getElementById('task-detail-body').innerHTML = `<p class="text-red-500 text-sm">${err.message}</p>`;
    }
};

function _loadTaskComments(taskId) {
    const db = window.db;
    const list = document.getElementById('task-comments-list');
    if (!list) return;

    const q = query(collection(db, "tasks", taskId, "comments"), orderBy("createdAt", "asc"), limit(100));
    onSnapshot(q, (snap) => {
        if (snap.empty) {
            list.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">No comments yet. Be the first to update!</p>';
            return;
        }
        list.innerHTML = '';
        snap.forEach(s => {
            const c = s.data();
            const isSystem = c.type === 'SYSTEM';
            const isMe = c.author === window.userData?.email;
            const time = c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }) : '—';

            if (isSystem) {
                list.innerHTML += `
                <div class="flex items-center gap-2 my-2">
                    <div class="h-px flex-1 bg-slate-100 dark:bg-slate-700"></div>
                    <span class="text-[10px] text-slate-400 font-medium italic">${c.text} · ${time}</span>
                    <div class="h-px flex-1 bg-slate-100 dark:bg-slate-700"></div>
                </div>`;
            } else {
                list.innerHTML += `
                <div class="flex gap-3 ${isMe ? 'flex-row-reverse' : ''}">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
                        ${(c.authorName || c.author || '?')[0].toUpperCase()}
                    </div>
                    <div class="max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5">
                        <span class="text-[10px] text-slate-400 font-medium">${isMe ? 'You' : (c.authorName || c.author)} · ${time}</span>
                        <div class="px-3 py-2 rounded-2xl ${isMe ? 'bg-black dark:bg-white text-white dark:text-black rounded-tr-sm' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm'} text-sm">
                            ${c.text}
                        </div>
                    </div>
                </div>`;
            }
        });
        list.scrollTop = list.scrollHeight;
    });
}

window.submitTaskComment = async () => {
    const taskId = window._taskDetailId;
    const input = document.getElementById('task-comment-input');
    if (!taskId || !input) return;

    const text = input.value.trim();
    if (!text) return;

    const btn = document.getElementById('btn-submit-comment');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>'; }

    try {
        const db = window.db;
        await addDoc(collection(db, "tasks", taskId, "comments"), {
            text,
            type: 'USER',
            author: window.userData.email,
            authorName: window.userData.name || window.userData.email,
            createdAt: serverTimestamp()
        });
        // Update comment count
        const snap = await getDocs(collection(db, "tasks", taskId, "comments"));
        await updateDoc(doc(db, "tasks", taskId), {
            commentCount: snap.size,
            lastComment: text,
            lastCommentBy: window.userData.email,
            updatedAt: serverTimestamp()
        });
        input.value = '';
    } catch (err) {
        window.showToast("Failed to send: " + err.message, "error");
    } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>'; }
    }
};

window.closeTaskDetail = () => {
    const modal = document.getElementById('modal-task-detail');
    if (modal) modal.classList.add('hidden');
    window._taskDetailId = null;
};

// ─── Task Dashboard ───────────────────────────────────────────────────────────
window.openTaskDashboard = async () => {
    const modal = document.getElementById('modal-task-dashboard');
    if (!modal) return;
    modal.classList.remove('hidden');

    const body = document.getElementById('task-dashboard-body');
    body.innerHTML = '<div class="flex items-center justify-center h-40"><i class="fa-solid fa-circle-notch fa-spin text-2xl text-slate-400"></i></div>';

    try {
        const db = window.db;
        const companyId = window.companyId || window.userData?.companyId;
        if (!companyId) { body.innerHTML = '<p class="text-center text-slate-400 py-8">No company context found.</p>'; return; }

        const snap = await getDocs(query(collection(db, "tasks"), where("companyId", "==", companyId), limit(500)));
        const tasks = [];
        snap.forEach(s => tasks.push({ id: s.id, ...s.data() }));

        const today = new Date(); today.setHours(0, 0, 0, 0);

        const stats = {
            total: tasks.length,
            open: tasks.filter(t => ['PENDING', 'IN_PROGRESS', 'REOPENED'].includes(t.status)).length,
            closed: tasks.filter(t => t.status === 'COMPLETED').length,
            overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED').length,
            createdToday: tasks.filter(t => {
                const d = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt || 0);
                d.setHours(0, 0, 0, 0); return d.getTime() === today.getTime();
            }).length,
            closedToday: tasks.filter(t => {
                if (t.status !== 'COMPLETED') return false;
                const d = t.updatedAt?.toDate ? t.updatedAt.toDate() : new Date(t.updatedAt || 0);
                d.setHours(0, 0, 0, 0); return d.getTime() === today.getTime();
            }).length
        };

        // Group by creator
        const byCreator = {};
        tasks.forEach(t => {
            const k = t.assignedBy || 'Unknown';
            byCreator[k] = (byCreator[k] || 0) + 1;
        });

        // Group by assignee
        const byAssignee = {};
        tasks.forEach(t => {
            const k = t.assignedTo || 'Unknown';
            if (!byAssignee[k]) byAssignee[k] = { open: 0, closed: 0 };
            if (t.status === 'COMPLETED') byAssignee[k].closed++;
            else byAssignee[k].open++;
        });

        // Recent tasks (today)
        const todayTasks = tasks.filter(t => {
            const d = t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt || 0);
            d.setHours(0, 0, 0, 0); return d.getTime() === today.getTime();
        }).sort((a, b) => {
            const dA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dB - dA;
        });

        body.innerHTML = `
        <!-- KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            ${[
                { label: 'Total', val: stats.total, icon: 'fa-layer-group', color: 'from-slate-500 to-slate-700' },
                { label: 'Open', val: stats.open, icon: 'fa-folder-open', color: 'from-blue-500 to-blue-700' },
                { label: 'Closed', val: stats.closed, icon: 'fa-folder-closed', color: 'from-green-500 to-green-700' },
                { label: 'Overdue', val: stats.overdue, icon: 'fa-triangle-exclamation', color: 'from-red-500 to-red-700' },
                { label: 'Created Today', val: stats.createdToday, icon: 'fa-calendar-plus', color: 'from-indigo-500 to-indigo-700' },
                { label: 'Closed Today', val: stats.closedToday, icon: 'fa-calendar-check', color: 'from-emerald-500 to-emerald-700' }
            ].map(k => `
            <div class="bg-gradient-to-br ${k.color} rounded-xl p-4 text-white shadow-lg">
                <i class="fa-solid ${k.icon} text-white/60 text-lg mb-2"></i>
                <p class="text-3xl font-black">${k.val}</p>
                <p class="text-xs font-semibold text-white/80 mt-0.5">${k.label}</p>
            </div>`).join('')}
        </div>

        <!-- Two column: Created by + Assigned to -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- Created By -->
            <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-user-pen text-indigo-400"></i> Tasks Created By</h4>
                <div class="space-y-2">
                    ${Object.entries(byCreator).sort((a,b) => b[1]-a[1]).slice(0,8).map(([name, count]) => `
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">${name[0]?.toUpperCase()}</div>
                        <span class="text-xs text-slate-600 dark:text-slate-300 flex-1 truncate">${name}</span>
                        <div class="flex items-center gap-1">
                            <div class="h-1.5 rounded-full bg-indigo-400" style="width:${Math.max(20, count * 8)}px"></div>
                            <span class="text-xs font-bold text-slate-700 dark:text-slate-300 w-4 text-right">${count}</span>
                        </div>
                    </div>`).join('')}
                </div>
            </div>

            <!-- Assigned To -->
            <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
                <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-user-check text-green-400"></i> Tasks Assigned To</h4>
                <div class="space-y-2">
                    ${Object.entries(byAssignee).sort((a,b) => (b[1].open+b[1].closed)-(a[1].open+a[1].closed)).slice(0,8).map(([name, cnt]) => `
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">${name[0]?.toUpperCase()}</div>
                        <span class="text-xs text-slate-600 dark:text-slate-300 flex-1 truncate">${name}</span>
                        <div class="flex items-center gap-1 text-[10px]">
                            <span class="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold">${cnt.open} open</span>
                            <span class="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded font-bold">${cnt.closed} done</span>
                        </div>
                    </div>`).join('')}
                </div>
            </div>
        </div>

        <!-- Today's Tasks -->
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
            <h4 class="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2"><i class="fa-solid fa-calendar-day text-amber-400"></i> Created Today (${todayTasks.length})</h4>
            ${todayTasks.length === 0 ? '<p class="text-xs text-slate-400 text-center py-4">No tasks created today yet.</p>' : `
            <div class="divide-y divide-slate-50 dark:divide-slate-700">
                ${todayTasks.map(t => {
                    const statusCls = { PENDING: 'text-amber-500', IN_PROGRESS: 'text-blue-500', COMPLETED: 'text-green-500', REOPENED: 'text-red-500', ON_HOLD: 'text-slate-500' };
                    return `
                    <div class="py-2.5 flex items-start justify-between gap-3">
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">${t.title}</p>
                            <p class="text-[10px] text-slate-400 mt-0.5"><span class="font-bold">${t.assignedBy}</span> → <span class="font-bold">${t.assignedTo}</span></p>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <span class="text-[10px] font-bold ${statusCls[t.status] || 'text-slate-500'}">${t.status.replace('_', ' ')}</span>
                            ${t.status !== 'COMPLETED' ? `
                            <button onclick="window.updateTaskStatus('${t.id}', 'COMPLETED'); window.openTaskDashboard();" class="text-[9px] bg-green-500 text-white px-2 py-0.5 rounded font-bold hover:bg-green-600 transition">Close</button>` :
                            `<button onclick="window.updateTaskStatus('${t.id}', 'REOPENED'); window.openTaskDashboard();" class="text-[9px] bg-amber-500 text-white px-2 py-0.5 rounded font-bold hover:bg-amber-600 transition">Reopen</button>`}
                        </div>
                    </div>`;
                }).join('')}
            </div>`}
        </div>`;
    } catch (err) {
        body.innerHTML = `<p class="text-red-500 text-center py-8">Failed to load dashboard: ${err.message}</p>`;
    }
};

window.closeTaskDashboard = () => {
    const modal = document.getElementById('modal-task-dashboard');
    if (modal) modal.classList.add('hidden');
};

// ─── Create Task ──────────────────────────────────────────────────────────────
window.handleEmpCreateTask = async (e) => {
    if (e) e.preventDefault();
    const btn = document.getElementById('btn-emp-create-task');
    const origHTML = btn?.innerHTML;
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...'; btn.disabled = true; }

    try {
        const title = document.getElementById('emp-task-title')?.value.trim();
        const desc = document.getElementById('emp-task-desc')?.value.trim();
        const assignee = document.getElementById('emp-task-assignee')?.value;
        const dueDate = document.getElementById('emp-task-due-date')?.value;
        const priority = document.getElementById('emp-task-priority')?.value || 'NORMAL';
        const ccRaw = document.getElementById('emp-task-cc')?.value || '';
        const cc = ccRaw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

        if (!title || !assignee || !dueDate) throw new Error('Title, Assignee, and Due Date are required');

        const isPersonal = window.currentMode === 'personal';
        const db = window.db;

        const taskRef = await addDoc(collection(db, "tasks"), {
            companyId: isPersonal ? null : (window.companyId || null),
            type: isPersonal ? 'PERSONAL' : 'COMPANY',
            title,
            description: desc,
            assignedTo: isPersonal ? window.userData.email : assignee,
            assignedBy: window.userData.email,
            assignedByName: window.userData.name || window.userData.email,
            status: 'PENDING',
            priority,
            dueDate,
            cc,
            commentCount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        // Add initial system comment
        await addDoc(collection(db, "tasks", taskRef.id, "comments"), {
            text: `Task created and assigned to **${isPersonal ? window.userData.email : assignee}** by **${window.userData.name || window.userData.email}**`,
            type: 'SYSTEM',
            author: window.userData.email,
            authorName: window.userData.name || window.userData.email,
            createdAt: serverTimestamp()
        });
        await updateDoc(doc(db, "tasks", taskRef.id), { commentCount: 1 });

        window.showToast('Task created successfully!', 'success');
        window.closeEmpTaskModal();
    } catch (err) {
        window.showToast(err.message, 'error');
    } finally {
        if (btn) { btn.innerHTML = origHTML; btn.disabled = false; }
    }
};

// ─── Open/Close Create Modal ──────────────────────────────────────────────────
window.openEmpTaskModal = async () => {
    const modal = document.getElementById('modal-emp-task');
    const dueInput = document.getElementById('emp-task-due-date');
    if (dueInput) dueInput.min = new Date().toISOString().split('T')[0];
    if (modal) modal.classList.remove('hidden');

    const select = document.getElementById('emp-task-assignee');
    const isPersonal = window.currentMode === 'personal';
    const creatorGroup = document.getElementById('task-assignee-group');

    if (isPersonal) {
        if (creatorGroup) creatorGroup.classList.add('hidden');
        if (select) { select.innerHTML = `<option value="${window.userData.email}">${window.userData.name} (Me)</option>`; select.value = window.userData.email; }
    } else {
        if (creatorGroup) creatorGroup.classList.remove('hidden');
        if (select) {
            select.innerHTML = '<option value="">Loading...</option>';
            try {
                const q = query(collection(window.db, "users"), where("companyId", "==", window.companyId), where("status", "==", "ACTIVE"));
                const snap = await getDocs(q);
                let options = '<option value="">Select Employee...</option>';
                snap.forEach(d => {
                    const u = d.data();
                    options += `<option value="${u.email}">${u.name || u.email} (${(u.role || 'EMPLOYEE').replace('_', ' ')})</option>`;
                });
                select.innerHTML = options;
            } catch (e) { select.innerHTML = '<option value="">Failed to load</option>'; }
        }
    }
};

window.closeEmpTaskModal = () => {
    const modal = document.getElementById('modal-emp-task');
    if (modal) modal.classList.add('hidden');
    const form = document.getElementById('emp-create-task-form');
    if (form) form.reset();
};
