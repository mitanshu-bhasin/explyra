// js/emp-profile.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { doc, updateDoc, serverTimestamp, collection, query, where, getDocs, orderBy, getDoc, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const EMP_DELEGATE_APP_NAME = 'emp-delegate-auth-worker';
const getEmpDelegateAuth = () => {
    const baseConfig = window.EXPLYRA_CONFIG?.firebase || {
        apiKey: (window.EXPLYRA_CONFIG?.firebase?.apiKey || ''),
        authDomain: 'explyras.firebaseapp.com',
        projectId: 'explyras',
        storageBucket: 'explyras.firebasestorage.app',
        messagingSenderId: '411853553644',
        appId: '1:411853553644:web:eca79eab846b6a5149cac9'
    };
    let workerApp = getApps().find((entry) => entry.name === EMP_DELEGATE_APP_NAME);
    if (!workerApp) workerApp = initializeApp(baseConfig, EMP_DELEGATE_APP_NAME);
    return getAuth(workerApp);
};

const dateAtDayEnd = (value) => {
    if (!value) return null;
    const dt = new Date(`${value}T23:59:59`);
    return Number.isNaN(dt.getTime()) ? null : dt;
};

const formatDateInput = (value) => {
    const dt = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(dt.getTime())) return '';
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const randomPass = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let out = '';
    for (let i = 0; i < 12; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
};

window.removeProfileDelegateAccess = async (delegationDocId, silent = false) => {
    if (!delegationDocId) return;
    if (!silent) {
        const ok = confirm('Remove this delegate account now?');
        if (!ok) return;
    }

    const delegationRef = doc(window.db, 'account_delegations', delegationDocId);
    const delegationSnap = await getDoc(delegationRef);
    if (!delegationSnap.exists()) {
        if (!silent) window.showToast('Delegation record not found.', 'warning');
        return;
    }

    const delegation = delegationSnap.data() || {};

    await updateDoc(delegationRef, {
        status: 'REVOKED',
        revokedAt: serverTimestamp(),
        revokedByDocId: window.userData?.docId || null,
        updatedAt: serverTimestamp()
    });

    if (delegation.delegateUserDocId) {
        try {
            await updateDoc(doc(window.db, 'users', delegation.delegateUserDocId), {
                status: 'INACTIVE',
                delegationStatus: 'REVOKED',
                updatedAt: serverTimestamp()
            });
        } catch (err) {
            console.warn('Failed to mark delegate user inactive', err);
        }
    }

    const workerAuth = getEmpDelegateAuth();
    if (delegation.delegateEmail && delegation.generatedPassword) {
        try {
            await signInWithEmailAndPassword(workerAuth, delegation.delegateEmail, delegation.generatedPassword);
            if (workerAuth.currentUser) await deleteUser(workerAuth.currentUser);
        } catch (err) {
            console.warn('Delegate auth delete failed', err);
        }
    }

    try {
        await signOut(workerAuth);
    } catch (err) {
        console.warn('Worker signout failed', err);
    }

    if (typeof window.loadProfileDelegations === 'function') await window.loadProfileDelegations();
    if (!silent) window.showToast('Delegate access removed.', 'success');
};

window.loadProfileDelegations = async () => {
    const listEl = document.getElementById('profile-delegate-list');
    if (!listEl || !window.userData?.docId) return;

    listEl.innerHTML = '<div class="text-[10px] text-slate-500">Loading delegates...</div>';
    const sourceUserDocId = window.userData.docId;

    try {
        const snap = await getDocs(query(collection(window.db, 'account_delegations'), where('sourceUserDocId', '==', sourceUserDocId)));
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        rows.sort((a, b) => {
            const ad = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const bd = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return bd - ad;
        });

        for (const entry of rows) {
            const expiry = entry.expiresAt?.toDate ? entry.expiresAt.toDate() : new Date(entry.expiresAt || 0);
            if (entry.status === 'ACTIVE' && expiry.getTime() < Date.now()) {
                await window.removeProfileDelegateAccess(entry.id, true);
            }
        }

        const refreshed = await getDocs(query(collection(window.db, 'account_delegations'), where('sourceUserDocId', '==', sourceUserDocId)));
        const finalRows = refreshed.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => {
            const ad = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const bd = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return bd - ad;
        });

        if (!finalRows.length) {
            listEl.innerHTML = '<div class="text-[10px] text-slate-500">No delegate records.</div>';
            return;
        }

        listEl.innerHTML = finalRows.map((entry) => {
            const expiry = entry.expiresAt?.toDate ? entry.expiresAt.toDate() : new Date(entry.expiresAt || 0);
            const expText = Number.isNaN(expiry.getTime()) ? 'N/A' : expiry.toLocaleString();
            const isActive = entry.status === 'ACTIVE';
            return `
                <div class="rounded-lg border ${isActive ? 'border-slate-200 dark:border-slate-700' : 'border-slate-100 dark:border-slate-800'} bg-white dark:bg-slate-900 p-2.5">
                    <div class="flex items-center justify-between gap-2">
                        <div class="min-w-0">
                            <p class="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">${entry.delegateEmail || 'delegate'}</p>
                            <p class="text-[9px] text-slate-500">Expires: ${expText}</p>
                            <p class="text-[9px] ${isActive ? 'text-green-600' : 'text-slate-500'} font-semibold">${entry.status || 'UNKNOWN'}</p>
                        </div>
                        <button type="button" onclick="removeProfileDelegateAccess('${entry.id}')"
                            class="px-2 py-1 rounded border border-red-200 text-red-600 text-[10px] font-bold hover:bg-red-50 transition">
                            Remove
                        </button>
                    </div>
                </div>`;
        }).join('');
    } catch (err) {
        console.error(err);
        listEl.innerHTML = '<div class="text-[10px] text-red-500">Failed to load delegates.</div>';
    }
};

window.generateProfileDelegateAccess = async () => {
    if (window.userData?.delegatedSession) {
        window.showToast('Delegated session cannot generate another delegate.', 'warning');
        return;
    }
    if (!window.userData?.docId || !window.userData?.companyId) {
        window.showToast('User profile not loaded.', 'error');
        return;
    }

    const expiryInput = document.getElementById('profile-delegate-expiry');
    const btn = document.getElementById('profile-delegate-generate-btn');
    const credEl = document.getElementById('profile-delegate-cred');
    const expiry = dateAtDayEnd(expiryInput?.value || '');

    if (!expiry || expiry.getTime() <= Date.now()) {
        window.showToast('Choose a future expiration date.', 'warning');
        return;
    }

    const originalBtn = btn?.innerHTML || '';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...';
    }

    try {
        const workerAuth = getEmpDelegateAuth();
        const email = `delegate.${Date.now()}.${Math.floor(Math.random() * 9999)}@explyra-delegate.com`;
        const password = randomPass();
        const credential = await createUserWithEmailAndPassword(workerAuth, email, password);

        const delegateUserRef = doc(collection(window.db, 'users'));
        const employeeId = `DLG-${String(Date.now()).slice(-6)}`;

        await setDoc(delegateUserRef, {
            uid: credential.user.uid,
            email,
            name: `${window.userData.name || 'User'} Delegate`,
            role: 'DELEGATE',
            delegatedRole: window.userData.role || 'EMPLOYEE',
            status: 'ACTIVE',
            companyId: window.userData.companyId,
            companyName: window.userData.companyName || '',
            department: window.userData.department || 'Delegated Access',
            employeeId,
            delegationStatus: 'ACTIVE',
            delegation: {
                sourceUserDocId: window.userData.docId,
                sourceUserUid: window.currentUser?.uid || null,
                sourceUserName: window.userData.name || 'User',
                sourceRole: window.userData.role || 'EMPLOYEE',
                expiresAt: expiry,
                status: 'ACTIVE',
                generatedPassword: password,
                createdByDocId: window.userData.docId
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        const delegationRef = await addDoc(collection(window.db, 'account_delegations'), {
            sourceUserDocId: window.userData.docId,
            sourceCompanyId: window.userData.companyId,
            sourceUserName: window.userData.name || 'User',
            delegateUid: credential.user.uid,
            delegateUserDocId: delegateUserRef.id,
            delegateEmail: email,
            generatedPassword: password,
            status: 'ACTIVE',
            expiresAt: expiry,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        await updateDoc(delegateUserRef, {
            delegation: {
                sourceUserDocId: window.userData.docId,
                sourceUserUid: window.currentUser?.uid || null,
                sourceUserName: window.userData.name || 'User',
                sourceRole: window.userData.role || 'EMPLOYEE',
                expiresAt: expiry,
                status: 'ACTIVE',
                generatedPassword: password,
                createdByDocId: window.userData.docId,
                delegationId: delegationRef.id
            },
            updatedAt: serverTimestamp()
        });

        await signOut(workerAuth);

        if (credEl) {
            credEl.classList.remove('hidden');
            credEl.textContent = `Email: ${email} | Password: ${password} | Expires: ${expiry.toLocaleString()}`;
        }

        window.showToast('Delegate account generated.', 'success');
        await window.loadProfileDelegations();
    } catch (err) {
        console.error(err);
        window.showToast('Delegate generation failed: ' + (err.message || 'Unknown error'), 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalBtn;
        }
    }
};

window.exportUserExpenses = async (uid, format, userName = 'User') => {
    if (typeof showToast === 'function') showToast(`Preparing export for ${userName}...`, 'info');
    
    try {
        const db = window.db;
        const q = query(collection(db, "expenses"), where("userId", "==", uid), orderBy("createdAt", "desc"));
        let snapshot = await getDocs(q);
        if (snapshot.empty && window.userData?.docId && window.userData.docId !== uid) {
            snapshot = await getDocs(query(collection(db, "expenses"), where("userId", "==", window.userData.docId), orderBy("createdAt", "desc")));
        }
        
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

window.openProfileModal = async () => {
    const userData = window.userData;
    if (!userData) return;
    document.getElementById('profile-name').value = userData.name || '';
    document.getElementById('profile-email').value = userData.email || '';
    document.getElementById('profile-dept').value = userData.department || '';
    document.getElementById('profile-empid').value = userData.employeeId || '';
    const rawPhone = userData.phone || '';
    if (rawPhone.startsWith('+')) {
        document.getElementById('profile-phone-cc').value = rawPhone.slice(0, 3);
        document.getElementById('profile-phone-num').value = rawPhone.slice(3).trim();
    } else if (rawPhone.length > 10) {
        document.getElementById('profile-phone-cc').value = '+' + rawPhone.slice(0, 2);
        document.getElementById('profile-phone-num').value = rawPhone.slice(2).trim();
    } else {
        document.getElementById('profile-phone-cc').value = '+91';
        document.getElementById('profile-phone-num').value = rawPhone;
    }
    document.getElementById('profile-dob').value = userData.dob || '';
    if (document.getElementById('profile-photo-url')) {
        document.getElementById('profile-photo-url').value = userData.photoUrl || '';
    }

    const companyNameEl = document.getElementById('profile-company-display');
    const companyBadgeEl = document.getElementById('profile-company-verify-badge');
    if (companyNameEl && companyBadgeEl) {
        let companyName = userData.companyName || 'Corporate Account';
        let isVerified = false;

        if (userData.companyId) {
            try {
                const companySnap = await getDoc(doc(window.db, 'companies', userData.companyId));
                if (companySnap.exists()) {
                    const companyData = companySnap.data();
                    companyName = companyData.name || companyData.companyName || companyName;
                    isVerified = !!companyData.phoneVerified;
                }
            } catch (err) {
                console.warn('Could not load company verification status', err);
            }
        }

        companyNameEl.textContent = companyName;
        companyBadgeEl.textContent = isVerified ? 'Verified' : 'Unverified';
        companyBadgeEl.className = isVerified
            ? 'px-1.5 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-wide'
            : 'px-1.5 py-0.5 rounded-full border border-slate-300 bg-slate-100 text-slate-500 text-[8px] font-bold uppercase tracking-wide';
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

    const ownerPanel = document.getElementById('profile-delegate-owner-panel');
    const delegateBanner = document.getElementById('profile-delegate-banner');
    const credEl = document.getElementById('profile-delegate-cred');
    const expiryInput = document.getElementById('profile-delegate-expiry');
    if (credEl) {
        credEl.classList.add('hidden');
        credEl.textContent = '';
    }
    if (expiryInput && !expiryInput.value) {
        expiryInput.value = formatDateInput(new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)));
    }

    const delegatedSession = !!userData.delegatedSession;
    if (ownerPanel) ownerPanel.classList.toggle('hidden', delegatedSession);
    if (delegateBanner) delegateBanner.classList.toggle('hidden', !delegatedSession);

    if (!delegatedSession && typeof window.loadProfileDelegations === 'function') {
        window.loadProfileDelegations();
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
        if (window.userData?.delegatedSession) {
            throw new Error('Delegated session cannot edit source profile.');
        }

        const name = document.getElementById('profile-name').value;
        const cc = document.getElementById('profile-phone-cc').value || '';
        const num = document.getElementById('profile-phone-num').value || '';
        const phone = (cc + num).replace(/\s+/g, '');
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

