// Admin Logic for Explyra Directories
document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const adminLayout = document.getElementById('admin-layout');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loginError = document.getElementById('login-error');
    
    const submissionList = document.getElementById('submission-list');
    const editForm = document.getElementById('edit-form');

    const ALLOWED_ADMIN = 'explyra@gmail.com';

    // Auth State Observer
    auth.onAuthStateChanged((user) => {
        if (user) {
            if (user.email === ALLOWED_ADMIN) {
                showAdmin(user);
            } else {
                loginError.textContent = 'Access Denied: You are not authorized to access this panel.';
                loginError.classList.remove('hidden');
                auth.signOut();
                showLogin();
            }
        } else {
            showLogin();
        }
        loadingOverlay.style.opacity = '0';
        setTimeout(() => loadingOverlay.style.display = 'none', 500);
    });

    // Login Action
    googleLoginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(error => {
            console.error(error);
            loginError.textContent = error.message;
            loginError.classList.remove('hidden');
        });
    });

    // Logout Action
    logoutBtn.addEventListener('click', () => auth.signOut());

    function showAdmin(user) {
        loginScreen.classList.add('hidden');
        adminLayout.classList.remove('hidden');
        document.getElementById('admin-name').textContent = user.displayName || 'Admin';
        document.getElementById('admin-email').textContent = user.email;
        if (user.photoURL) document.getElementById('admin-photo').src = user.photoURL;
        
        loadSubmissions();
    }

    function showLogin() {
        adminLayout.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    }

    async function loadSubmissions() {
        db.collection('business_submissions').orderBy('submittedAt', 'desc').onSnapshot(snapshot => {
            renderSubmissions(snapshot.docs);
            updateStats(snapshot.docs);
        });
    }

    function renderSubmissions(docs) {
        submissionList.innerHTML = '';
        if (docs.length === 0) {
            submissionList.innerHTML = '<tr><td colspan="6" class="px-6 py-12 text-center text-gray-400">No submissions found.</td></tr>';
            return;
        }

        docs.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 transition';
            
            const date = data.submittedAt ? new Date(data.submittedAt.seconds * 1000).toLocaleDateString() : 'N/A';
            
            row.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center p-1">
                            <img src="${data.logo || 'https://via.placeholder.com/40'}" class="max-w-full max-h-full rounded-sm" onerror="this.src='https://via.placeholder.com/40'">
                        </div>
                        <div>
                            <p class="font-bold text-gray-900">${data.name}</p>
                            <p class="text-xs text-gray-500">${data.email}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">${data.category}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">${date}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 ${data.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded text-xs font-bold uppercase">
                        ${data.paymentStatus || 'unpaid'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 ${getStatusClass(data.status)} rounded text-xs font-bold uppercase">
                        ${data.status || 'pending'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <button onclick="editSubmission('${id}')" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit"><i class="fas fa-edit"></i></button>
                        <button onclick="approveSubmission('${id}')" class="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Approve"><i class="fas fa-check"></i></button>
                        <button onclick="rejectSubmission('${id}')" class="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Reject"><i class="fas fa-times"></i></button>
                        <a href="generator.html?id=${id}" class="p-2 text-purple-600 hover:bg-purple-50 rounded-lg" title="Generate Page"><i class="fas fa-file-code"></i></a>
                    </div>
                </td>
            `;
            submissionList.appendChild(row);
        });
    }

    function getStatusClass(status) {
        switch(status) {
            case 'approved': return 'bg-green-100 text-green-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-orange-100 text-orange-700';
        }
    }

    function updateStats(docs) {
        const stats = { pending: 0, approved: 0, rejected: 0, total: docs.length };
        docs.forEach(doc => {
            const s = doc.data().status || 'pending';
            if (stats[s] !== undefined) stats[s]++;
        });
        document.getElementById('stat-pending').textContent = stats.pending;
        document.getElementById('stat-approved').textContent = stats.approved;
        document.getElementById('stat-rejected').textContent = stats.rejected;
        document.getElementById('stat-total').textContent = stats.total;
    }

    window.editSubmission = async (id) => {
        const doc = await db.collection('business_submissions').doc(id).get();
        const data = doc.data();
        document.getElementById('edit-id').value = id;
        document.getElementById('edit-name').value = data.name;
        document.getElementById('edit-category').value = data.category || 'SaaS';
        document.getElementById('edit-description').value = data.description || '';
        document.getElementById('edit-longDescription').value = data.longDescription || '';
        document.getElementById('edit-website').value = data.website || '';
        document.getElementById('edit-logo').value = data.logo || '';
        document.getElementById('edit-phone').value = data.phone || '';
        document.getElementById('edit-address').value = data.address || '';
        document.getElementById('edit-openingHours').value = data.openingHours || '';
        document.getElementById('edit-sameAs').value = data.sameAs || '';
        document.getElementById('edit-payment').value = data.paymentStatus || 'unpaid';
        document.getElementById('edit-status').value = data.status || 'pending';
        
        document.getElementById('edit-modal').classList.remove('hidden');
    };

    window.closeModal = (id) => document.getElementById(id).classList.add('hidden');

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const updates = {
            name: document.getElementById('edit-name').value,
            category: document.getElementById('edit-category').value,
            description: document.getElementById('edit-description').value,
            longDescription: document.getElementById('edit-longDescription').value,
            website: document.getElementById('edit-website').value,
            logo: document.getElementById('edit-logo').value,
            phone: document.getElementById('edit-phone').value,
            address: document.getElementById('edit-address').value,
            openingHours: document.getElementById('edit-openingHours').value,
            sameAs: document.getElementById('edit-sameAs').value,
            paymentStatus: document.getElementById('edit-payment').value,
            status: document.getElementById('edit-status').value
        };
        
        try {
            await db.collection('business_submissions').doc(id).update(updates);
            closeModal('edit-modal');
            alert('Updated successfully!');
        } catch (error) {
            alert('Update failed: ' + error.message);
        }
    });

    window.approveSubmission = async (id) => {
        if (confirm('Approve this listing?')) {
            await db.collection('business_submissions').doc(id).update({ status: 'approved', paymentStatus: 'paid' });
        }
    };

    window.rejectSubmission = async (id) => {
        if (confirm('Reject this listing?')) {
            await db.collection('business_submissions').doc(id).update({ status: 'rejected' });
        }
    };
});
