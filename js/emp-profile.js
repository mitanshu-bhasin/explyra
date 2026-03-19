// js/emp-profile.js
import { doc, updateDoc, serverTimestamp, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

window.exportUserExpenses = async (uid, format, userName = 'User') => {
    if (typeof showToast === 'function') showToast(`Preparing export for ${userName}...`, 'info');
    
    try {
        const db = window.db;
        const q = query(collection(db, "expenses"), where("userId", "==", uid), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            showToast("No expenses found.", "warning");
            return;
        }
        
        const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const headers = ["ID", "Title", "Category", "Amount", "Currency", "Status", "Date", "Items"];
        const rows = expenses.map(e => [
            e.id,
            e.title || 'Untitled',
            e.category || 'General',
            e.totalAmount || 0,
            e.currency || 'INR',
            e.status || 'SUBMITTED',
            e.createdAt?.toDate ? e.createdAt.toDate().toISOString().split('T')[0] : 'N/A',
            (e.lineItems || []).map(item => `${item.description}(${item.amount})`).join('; ')
        ]);

        if (format === 'CSV') {
            let csv = headers.join(',') + '\n';
            rows.forEach(row => {
                const line = row.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',');
                csv += line + '\n';
            });
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Expenses_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            showToast("CSV Exported successfully!", "success");
        } else if (format === 'SHEETS') {
            if (!window.GDriveService) {
                showToast("Google Drive Service not loaded", "error");
                return;
            }
            
            if (!GDriveService.isConnected()) {
                const connect = await confirm("Please connect Google Drive from settings first. Connect now?");
                if (connect && GDriveService.authenticate) {
                   GDriveService.authenticate(() => {
                        showToast("Re-click export to continue.", "info");
                   });
                }
                return;
            }
            
            const title = `Expenses - ${userName} (${new Date().toLocaleDateString()})`;
            const result = await GDriveService.createSpreadsheet(title, headers, rows);
            
            if (result && result.url) {
                window.open(result.url, '_blank');
                showToast("Google Sheet created and opened!", "success");
            }
        }
    } catch (err) {
        console.error("Export failed:", err);
        showToast("Export failed: " + err.message, "error");
    }
};

window.openProfileModal = () => {
    const userData = window.userData;
    if (!userData) return;
    document.getElementById('profile-name').value = userData.name || '';
    document.getElementById('profile-email').value = userData.email || '';
    document.getElementById('profile-dept').value = userData.department || '';
    document.getElementById('profile-empid').value = userData.employeeId || '';
    document.getElementById('profile-phone').value = userData.phone || '';
    document.getElementById('profile-dob').value = userData.dob || '';
    if (document.getElementById('profile-photo-url')) {
        document.getElementById('profile-photo-url').value = userData.photoUrl || '';
    }

    // 2FA Population
    const twoFactorToggle = document.getElementById('profile-2fa-enabled');
    const pinContainer = document.getElementById('profile-2fa-pin-container');
    const pinInput = document.getElementById('profile-2fa-pin');

    if (twoFactorToggle) {
        twoFactorToggle.checked = userData.twoFactorEnabled || false;
        pinContainer.classList.toggle('hidden', !userData.twoFactorEnabled);
        pinInput.value = userData.twoFactorPin || '';
    }

    document.getElementById('modal-profile').classList.remove('hidden');
};

window.submitProfile = async (e) => {
    if (e) e.preventDefault();
    const btn = document.querySelector('#modal-profile button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Updating...';
    btn.disabled = true;

    try {
        const name = document.getElementById('profile-name').value;
        const phone = document.getElementById('profile-phone').value;
        const photoUrl = document.getElementById('profile-photo-url')?.value || '';
        const twoFactorEnabled = document.getElementById('profile-2fa-enabled').checked;
        const twoFactorPin = document.getElementById('profile-2fa-pin').value;

        if (twoFactorEnabled && (!twoFactorPin || twoFactorPin.length !== 4)) {
            throw new Error("Please enter a 4-digit PIN for 2FA");
        }

        await updateDoc(doc(window.db, "users", window.userData.docId), {
            name, phone, photoUrl,
            twoFactorEnabled,
            twoFactorPin,
            updatedAt: serverTimestamp()
        });

        window.userData.name = name;
        window.userData.phone = phone;
        window.userData.photoUrl = photoUrl;
        window.userData.twoFactorEnabled = twoFactorEnabled;
        window.userData.twoFactorPin = twoFactorPin;

        // Update UI
        const nameD = document.getElementById('user-name-display');
        if (nameD) nameD.textContent = name;

        const sidebarName = document.getElementById('sidebar-user-name');
        if (sidebarName) sidebarName.textContent = name;

        // Update Avatars
        const avatars = ['header-profile-avatar', 'sidebar-user-avatar', 'ac-avatar'];
        avatars.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (photoUrl) {
                el.innerHTML = `<img src="${photoUrl}" class="w-full h-full object-cover ${id.includes('sidebar') ? 'rounded-full' : ''}">`;
            } else {
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true`;
                el.innerHTML = `<img src="${avatarUrl}" class="w-full h-full object-cover ${id.includes('sidebar') ? 'rounded-full' : ''}">`;
            }
        });

        window.showToast("Profile updated successfully!", "success");
        window.closeModal('modal-profile');
    } catch (err) {
        window.showToast("Update failed: " + err.message, "error");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

window.resetUserPassword = async () => {
    if (await window.showInputPromise("Reset Password", `Send password reset email to ${window.userData.email}?`, "", "none")) {
        try {
            await sendPasswordResetEmail(window.auth, window.userData.email);
            window.showToast("Password reset email sent!", "success");
        } catch (e) {
            window.showToast(e.message, "error");
        }
    }
};

window.downloadMyData = async (event) => {
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
    try {
        const data = {
            userProfile: window.userData,
            expenses: window.expensesData,
            personalVault: window.personalData,
            generatedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `my_data_${window.userData.employeeId || 'user'}_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.showToast("Data downloaded successfully!", "success");
    } catch (e) {
        window.showToast("Download failed: " + e.message, "error");
    } finally {
        btn.innerHTML = originalContent;
    }
};

