// admin.js - Logic for updates management

const AUTHORIZED_EMAIL = 'explyra@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initFormListeners();
});

function initAuth() {
    if (!window.auth) {
        setTimeout(initAuth, 100);
        return;
    }

    window.auth.onAuthStateChanged(user => {
        if (user) {
            if (user.email === AUTHORIZED_EMAIL) {
                showAdmin();
                loadUpdates();
            } else {
                window.auth.signOut();
                showLoginError('Access denied. Only authorized accounts can access this panel.');
            }
        } else {
            showLogin();
        }
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');

        errorEl.classList.add('hidden');

        if (email !== AUTHORIZED_EMAIL) {
            showLoginError('Unauthorized email address.');
            return;
        }

        try {
            await window.auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
            showLoginError('Invalid credentials. Check your password.');
        }
    });
}

function showLogin() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
}

function showAdmin() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    document.getElementById('user-display').textContent = AUTHORIZED_EMAIL;
}

function showLoginError(msg) {
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
}

function handleLogout() {
    window.auth.signOut();
}

// Update CRUD Logic
async function loadUpdates() {
    const list = document.getElementById('updates-list');
    const loader = document.getElementById('list-loader');

    // Wait for window.db
    if (!window.db) {
        setTimeout(loadUpdates, 100);
        return;
    }

    list.innerHTML = '';
    loader.classList.remove('hidden');

    try {
        const snapshot = await window.db.collection('updates').get();
        loader.classList.add('hidden');

        if (snapshot.empty) {
            list.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-slate-400">No updates found. Click "New Update" to create one.</td></tr>';
            return;
        }

        // Sort client-side
        const updates = [];
        snapshot.forEach(doc => updates.push({ id: doc.id, ...doc.data() }));
        updates.sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0));

        updates.forEach(update => {
            const tr = document.createElement('tr');
            tr.className = 'border-b last:border-0 hover:bg-slate-50 transition';

            const date = update.date ? new Date(update.date.seconds * 1000).toLocaleDateString() : 'N/A';
            const statusClass = update.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600';
            const statusText = update.published ? 'Published' : 'Draft';
            const category = update.category || 'Update';

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <img src="${update.thumbnail}" class="w-10 h-10 rounded object-cover border">
                        <span class="font-bold text-slate-800">${update.title}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-500">${category}</td>
                <td class="px-6 py-4 text-sm text-slate-500">${date}</td>
                <td class="px-6 py-4 text-sm">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusClass}">${statusText}</span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button onclick="editUpdate('${update.id}')" class="text-blue-600 hover:text-blue-800 font-bold text-sm mr-4">Edit</button>
                    <button onclick="deleteUpdate('${update.id}')" class="text-red-500 hover:text-red-700 font-bold text-sm">Delete</button>
                </td>
            `;
            list.appendChild(tr);
        });
    } catch (error) {
        console.error("Error loading updates:", error);
    }
}

function initFormListeners() {
    const form = document.getElementById('update-form');
    const thumbInput = document.getElementById('update-thumb-url');
    const preview = document.getElementById('thumb-preview');
    const previewImg = preview.querySelector('img');

    thumbInput.addEventListener('input', (e) => {
        if (e.target.value) {
            previewImg.src = e.target.value;
            preview.classList.remove('hidden');
        } else {
            preview.classList.add('hidden');
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('update-id').value;
        const updateData = {
            title: document.getElementById('update-title').value,
            category: document.getElementById('update-category').value,
            summary: document.getElementById('update-summary').value,
            content: document.getElementById('update-content').value,
            thumbnail: document.getElementById('update-thumb-url').value,
            published: document.getElementById('update-published').checked
        };

        try {
            if (id) {
                await window.db.collection('updates').doc(id).update(updateData);
            } else {
                updateData.date = firebase.firestore.FieldValue.serverTimestamp();
                await window.db.collection('updates').add(updateData);
            }

            closeUpdateModal();
            loadUpdates();
            alert('Update saved successfully!');
        } catch (error) {
            console.error("Error saving update:", error);
            alert('Error saving update. Check console.');
        }
    });
}

function openUpdateModal() {
    document.getElementById('update-form').reset();
    document.getElementById('update-id').value = '';
    document.getElementById('modal-title').textContent = 'Create New Update';
    document.getElementById('thumb-preview').classList.add('hidden');
    document.getElementById('update-modal').classList.remove('hidden');
}

function closeUpdateModal() {
    document.getElementById('update-modal').classList.add('hidden');
}

async function editUpdate(id) {
    try {
        const doc = await window.db.collection('updates').doc(id).get();
        const data = doc.data();

        document.getElementById('update-id').value = id;
        document.getElementById('update-title').value = data.title;
        document.getElementById('update-category').value = data.category || 'Update';
        document.getElementById('update-summary').value = data.summary;
        document.getElementById('update-content').value = data.content;
        document.getElementById('update-thumb-url').value = data.thumbnail;
        document.getElementById('update-published').checked = data.published;

        document.getElementById('thumb-preview').querySelector('img').src = data.thumbnail;
        document.getElementById('thumb-preview').classList.remove('hidden');

        document.getElementById('modal-title').textContent = 'Edit Update';
        document.getElementById('update-modal').classList.remove('hidden');
    } catch (error) {
        console.error("Error fetching update:", error);
    }
}

async function deleteUpdate(id) {
    if (confirm('Are you sure you want to delete this update?')) {
        try {
            await window.db.collection('updates').doc(id).delete();
            loadUpdates();
        } catch (error) {
            console.error("Error deleting update:", error);
        }
    }
}
