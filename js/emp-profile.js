// js/emp-profile.js
import { doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

window.openProfileModal = () => {
    const userData = window.userData;
    if (!userData) return;
    document.getElementById('profile-name').value = userData.name || '';
    document.getElementById('profile-email').value = userData.email || '';
    document.getElementById('profile-dept').value = userData.department || '';
    document.getElementById('profile-empid').value = userData.employeeId || '';
    document.getElementById('profile-phone').value = userData.phone || '';
    document.getElementById('profile-dob').value = userData.dob || '';
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
        const dob = document.getElementById('profile-dob').value;

        await updateDoc(doc(window.db, "users", window.userData.docId), {
            name, phone, dob, updatedAt: serverTimestamp()
        });

        window.userData.name = name;
        window.userData.phone = phone;
        window.userData.dob = dob;

        const nameD = document.getElementById('user-name-display');
        if (nameD) nameD.textContent = name;

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

