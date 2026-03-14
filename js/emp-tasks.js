// js/emp-tasks.js
import { collection, query, where, onSnapshot, updateDoc, doc, serverTimestamp, getDocs, addDoc, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

window.empTasksData = [];
window.empTasksLoaded = false;

window.fetchEmpTasks = () => {
    if (!window.currentUser || !window.userData) return;

    window.empTasksLoaded = true;
    const list = document.getElementById('emp-tasks-list');
    if (list) list.innerHTML = '<div class="text-center text-slate-400 mt-4"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading tasks...</div>';

    const db = window.db;
    // Fetch all tasks where the user is assignee OR creator
    const q = query(
        collection(db, "tasks"),
        where("assignedTo", "==", window.userData.email),
        limit(100)
    );

    onSnapshot(q, (snapshot) => {
        window.empTasksData = [];

        if (snapshot.empty) {
            if (list) list.innerHTML = getEmptyStateTasks("No tasks assigned to you.");
            return;
        }

        snapshot.forEach(docSnap => {
            window.empTasksData.push({ id: docSnap.id, ...docSnap.data() });
        });

        // Client-side sort by createdAt desc
        window.empTasksData.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
            return dateB - dateA;
        });

        window.filterEmpTasks();
    }, (error) => {
        console.error("Task Sync Error:", error);
        if (list) list.innerHTML = `<div class="text-center text-red-500 mt-4 p-4 border border-red-200 bg-red-50 rounded-lg"><p class="font-bold">Sync Error</p></div>`;
    });
};

function getEmptyStateTasks(msg) {
    return `
    <div class="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
        <div class="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4 shadow-inner">
            <i class="fa-solid fa-list-check text-2xl"></i>
        </div>
        <h3 class="font-bold text-slate-700 dark:text-slate-200 mb-1">No Tasks Found</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">${msg}</p>
    </div>`;
}

window.filterEmpTasks = () => {
    const list = document.getElementById('emp-tasks-list');
    if (!list || !window.empTasksData) return;

    const search = (document.getElementById('emp-task-search')?.value || '').toLowerCase();
    const mode = window.currentMode || 'company';

    const filtered = window.empTasksData.filter(t => {
        const matchesSearch = (t.title + (t.description || '')).toLowerCase().includes(search);
        
        if (mode === 'personal') {
            // Personal tasks are those created by the user where type is PERSONAL
            return matchesSearch && t.type === 'PERSONAL' && t.assignedBy === window.userData.email;
        } else {
            // Company tasks are those where type is not PERSONAL or it's assigned to them by someone else
            return matchesSearch && t.type !== 'PERSONAL';
        }
    });

    if (filtered.length === 0) {
        list.innerHTML = getEmptyStateTasks("No tasks match your search.");
        return;
    }

    list.innerHTML = filtered.map(t => {
        const statusColors = {
            'PENDING': 'bg-amber-100 text-amber-700 border-amber-200',
            'IN_PROGRESS': 'bg-green-100 text-green-700 border-green-200',
            'COMPLETED': 'bg-green-100 text-green-700 border-green-200'
        };
        const statusColor = statusColors[t.status] || 'bg-slate-100 text-slate-700';
        return `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition relative mb-3">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm">${t.title}</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${t.description || 'No description provided.'}</p>
                </div>
                <select onchange="window.updateTaskStatus('${t.id}', this.value)" class="text-[10px] font-bold px-2 py-1 rounded badge ${statusColor} border outline-none appearance-none pr-3">
                    <option value="PENDING" class="bg-white text-slate-800" ${t.status === 'PENDING' ? 'selected' : ''}>PENDING</option>
                    <option value="IN_PROGRESS" class="bg-white text-slate-800" ${t.status === 'IN_PROGRESS' ? 'selected' : ''}>IN PROGRESS</option>
                    <option value="COMPLETED" class="bg-white text-slate-800" ${t.status === 'COMPLETED' ? 'selected' : ''}>COMPLETED</option>
                </select>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-50 dark:border-slate-700/50 flex flex-wrap gap-4 text-[10px] text-slate-500 dark:text-slate-400 items-center">
                <span class="flex items-center gap-1"><i class="fa-solid fa-user text-green-500"></i> Assigned By: <span class="font-bold text-slate-700 dark:text-slate-300">${t.assignedBy}</span></span>
                <span class="flex items-center gap-1"><i class="fa-regular fa-calendar-check text-red-400"></i> Due: <span class="font-bold ${new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED' ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}">${new Date(t.dueDate).toLocaleDateString()}</span></span>
                ${t.status !== 'COMPLETED' ? `<button onclick="window.updateTaskStatus('${t.id}', 'COMPLETED')" class="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold transition ml-auto shadow-sm"><i class="fa-solid fa-check"></i> Mark Done</button>` : ''}
            </div>
        </div>
    `}).join('');
};

window.updateTaskStatus = async (taskId, newStatus) => {
    try {
        await updateDoc(doc(window.db, "tasks", taskId), {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
        window.showToast("Task status updated", "success");
    } catch (err) {
        window.showToast("Failed to update task status", "error");
    }
};

window.handleEmpCreateTask = async (e) => {
    if (e) e.preventDefault();
    const btn = document.getElementById('btn-emp-create-task');
    const original = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...'; btn.disabled = true; }

    try {
        const title = document.getElementById('emp-task-title').value.trim();
        const desc = document.getElementById('emp-task-desc').value.trim();
        const assignee = document.getElementById('emp-task-assignee').value;
        const dueDate = document.getElementById('emp-task-due-date').value;

        if (!title || !assignee || !dueDate) throw new Error('Missing required fields');

        const isPersonal = window.currentMode === 'personal';

        await addDoc(collection(window.db, "tasks"), {
            companyId: isPersonal ? null : window.companyId,
            type: isPersonal ? 'PERSONAL' : 'COMPANY',
            title,
            description: desc,
            assignedTo: isPersonal ? window.userData.email : assignee,
            assignedBy: window.userData.email,
            status: 'PENDING',
            dueDate,
            createdAt: serverTimestamp()
        });

        window.showToast('Task sent successfully!', 'success');
        window.closeEmpTaskModal();
    } catch (err) {
        window.showToast(err.message, 'error');
    } finally {
        if (btn) { btn.innerHTML = original; btn.disabled = false; }
    }
};

window.openEmpTaskModal = async () => {
    const modal = document.getElementById('modal-emp-task');
    const dueInput = document.getElementById('emp-task-due-date');
    if (dueInput) dueInput.min = new Date().toISOString().split('T')[0];
    if (modal) modal.classList.remove('hidden');

    // Load users for assignee
    const select = document.getElementById('emp-task-assignee');
    const isPersonal = window.currentMode === 'personal';
    const creatorGroup = document.getElementById('task-assignee-group');

    if (isPersonal) {
        if (creatorGroup) creatorGroup.classList.add('hidden');
        if (select) {
            select.innerHTML = `<option value="${window.userData.email}">${window.userData.name} (Me)</option>`;
            select.value = window.userData.email;
        }
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
                if (window.userData.email) select.value = window.userData.email;
            } catch (e) {
                select.innerHTML = '<option value="">Failed to load</option>';
            }
        }
    }
};

window.closeEmpTaskModal = () => {
    const modal = document.getElementById('modal-emp-task');
    if (modal) modal.classList.add('hidden');
    const form = document.getElementById('emp-create-task-form');
    if (form) form.reset();
};
