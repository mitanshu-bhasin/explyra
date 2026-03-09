/* shared/auth.js - Common authentication and session routing */

/**
 * Initializes authentication state for a page.
 * @param {string} moduleType - 'company' or 'school'
 * @param {boolean} isLoginPage - true if on the login.html page
 */
function initAuth(moduleType, isLoginPage = false) {
    const sessionKey = `${moduleType}_session`;
    const session = getSession(sessionKey);

    if (isLoginPage) {
        if (session) {
            window.location.href = 'dashboard.html';
        }
    } else {
        if (!session) {
            window.location.href = 'login.html';
        } else {
            // Apply RBAC
            updateUIForRole(session.role, moduleType);

            // Populate Sidebar Info
            setTimeout(async () => {
                const userNameEl = document.getElementById('sidebar-user-name');
                if (userNameEl) userNameEl.textContent = session.userId || 'User';

                const userRoleEl = document.getElementById('sidebar-user-role');
                if (userRoleEl) userRoleEl.textContent = session.role || 'Role';

                const orgNameEl = document.getElementById('sidebar-org-name') || document.getElementById('sidebar-company-name');

                if (orgNameEl) {
                    if (typeof window.db !== 'undefined' && session.companyId) {
                        try {
                            // Try to get company name from Firebase if it's setup like the main app
                            const compRef = window.db.collection('companies').doc(session.companyId);
                            const snap = await compRef.get();
                            if (snap.exists && snap.data().name) {
                                orgNameEl.textContent = snap.data().name;
                            } else {
                                orgNameEl.textContent = session.companyId;
                            }
                        } catch (e) {
                            console.error("Firestore sidebar err:", e);
                            orgNameEl.textContent = session.companyId;
                        }
                    } else {
                        // Fallback logic
                        const dataKey = moduleType === 'company' ? 'attendance_app_data' : 'school_attendance_data';
                        const data = getAppData(dataKey, {});
                        if (moduleType === 'company') {
                            orgNameEl.textContent = data.companies?.[session.companyId]?.name || session.companyId;
                        } else {
                            orgNameEl.textContent = data.schools?.[session.schoolId]?.name || session.schoolId;
                        }
                    }
                }
            }, 100);
        }
    }
}

/**
 * Applies CSS display none to elements based on role.
 */
function updateUIForRole(role, moduleType) {
    if (moduleType === 'company') {
        const adminOnly = document.querySelectorAll('.admin-only');
        const hrAuth = document.querySelectorAll('.hr-auth');

        if (role === 'Manager') {
            adminOnly.forEach(el => el.style.display = 'none');
            hrAuth.forEach(el => el.style.display = 'none');
        } else if (role === 'HR') {
            adminOnly.forEach(el => el.style.display = 'none');
            hrAuth.forEach(el => el.style.display = '');
        } else if (role === 'Admin') {
            adminOnly.forEach(el => el.style.display = '');
            hrAuth.forEach(el => el.style.display = '');
        }
    } else {
        // School logic
        const principalOnly = document.querySelectorAll('.principal-only');
        const teacherAuth = document.querySelectorAll('.teacher-auth');

        if (role === 'Student') {
            principalOnly.forEach(el => el.style.display = 'none');
            teacherAuth.forEach(el => el.style.display = 'none');
        } else if (role === 'Teacher') {
            principalOnly.forEach(el => el.style.display = 'none');
            teacherAuth.forEach(el => el.style.display = '');
        } else if (role === 'Principal') {
            principalOnly.forEach(el => el.style.display = '');
            teacherAuth.forEach(el => el.style.display = '');
        }
    }
}

function hasAccess(requiredRoles, moduleType) {
    const session = getSession(`${moduleType}_session`);
    if (!session) return false;
    return requiredRoles.includes(session.role);
}

/**
 * Generates a unique 6-character alphanumeric ID
 */
function generateId(prefix) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + '-' + result;
}

// ==========================================
// COMPANY AUTHENTICATION (Email & Password)
// ==========================================

function handleCompanyRegister(e) {
    e.preventDefault();
    const companyName = document.getElementById('reg-company-name').value.trim();
    const adminEmail = document.getElementById('reg-email').value.trim().toLowerCase();
    const adminPass = document.getElementById('reg-password').value;

    if (!companyName || !adminEmail || !adminPass) return alert("Please fill all details");

    const dataKey = 'attendance_app_data';
    const defaultSchema = { companies: {}, employees: {}, attendance: {}, salaries: {}, users: {} };
    const data = getAppData(dataKey, defaultSchema);

    if (!data.users) data.users = {};

    if (data.users[adminEmail]) {
        return alert("Email is already registered. Please login.");
    }

    const companyId = generateId('CMP');

    data.companies[companyId] = { name: companyName, registeredAt: new Date().toISOString() };
    data.employees[companyId] = [];
    data.attendance[companyId] = {};
    data.salaries[companyId] = {};

    // Register Admin user mapping
    data.users[adminEmail] = {
        password: adminPass,
        companyId: companyId,
        role: 'Admin',
        userId: adminEmail.split('@')[0]
    };

    saveAppData(dataKey, data);
    alert(`Company Registered successfully!\nYour Company ID is: ${companyId}\nPlease login now.`);
    window.location.href = 'login.html';
}

async function handleCompanyLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pass = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');

    if (!email || !pass) return alert("Please fill details");

    // Integration with Main App Firebase
    if (typeof window.auth !== 'undefined' && typeof window.db !== 'undefined') {
        const originalBtnContent = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...';
        btn.disabled = true;

        try {
            await window.auth.signInWithEmailAndPassword(email, pass);

            // Fetch User metadata
            const usersRef = window.db.collection('users');
            const q = usersRef.where('email', '==', email);
            const snap = await q.get();

            let account = null;
            if (!snap.empty) {
                account = snap.docs[0].data();
            } else {
                // Ignore casing fallback
                const allUsers = await usersRef.get();
                const found = allUsers.docs.find(doc => doc.data().email?.trim().toLowerCase() === email);
                if (found) account = found.data();
            }

            if (!account || (!account.companyId && account.role !== 'System Admin')) {
                alert("Access Denied: You do not have an active corporate workspace assigned.");
                await window.auth.signOut();
                btn.innerHTML = originalBtnContent;
                btn.disabled = false;
                return;
            }

            saveSession('company_session', {
                companyId: account.companyId || 'EXPLYRA_INTERNAL',
                role: account.role || 'Admin',
                userId: account.name || account.email.split('@')[0]
            });
            window.location.href = 'dashboard.html';

        } catch (error) {
            console.error(error);
            alert("Login Error: " + error.message);
            btn.innerHTML = originalBtnContent;
            btn.disabled = false;
        }
    } else {
        // Fallback for offline mode or broken config
        const dataKey = 'attendance_app_data';
        const data = getAppData(dataKey, { users: {} });

        if (!data.users || !data.users[email]) {
            return alert("Email not found. Please register first.");
        }

        const account = data.users[email];
        if (account.password !== pass) {
            return alert("Incorrect password.");
        }

        saveSession('company_session', { companyId: account.companyId, role: account.role, userId: account.userId });
        window.location.href = 'dashboard.html';
    }
}

// ==========================================
// SCHOOL AUTHENTICATION (ID, Dropdown, Email, Pass)
// ==========================================

function handleSchoolRegister(e) {
    e.preventDefault();
    const schoolName = document.getElementById('reg-school-name').value.trim();
    const principalEmail = document.getElementById('reg-email').value.trim().toLowerCase();
    const principalPass = document.getElementById('reg-password').value;

    if (!schoolName || !principalEmail || !principalPass) return alert("Please fill all details");

    const dataKey = 'school_attendance_data';
    const defaultSchema = { schools: {}, teachers: {}, students: {}, attendance: {}, calendar: {}, users: {} };
    const data = getAppData(dataKey, defaultSchema);

    if (!data.users) data.users = {};

    const schoolId = generateId('SCH');

    if (data.users[schoolId] && data.users[schoolId][principalEmail]) {
        return alert("Email is already registered in this school.");
    }

    data.schools[schoolId] = { name: schoolName, registeredAt: new Date().toISOString() };
    data.teachers[schoolId] = [];
    data.students[schoolId] = [];
    data.attendance[schoolId] = {};
    data.calendar[schoolId] = {};

    // Scoped users
    if (!data.users[schoolId]) data.users[schoolId] = {};
    data.users[schoolId][principalEmail] = {
        password: principalPass,
        role: 'Principal', // Overriding role for the creator
        userId: principalEmail.split('@')[0]
    };

    saveAppData(dataKey, data);
    alert(`School Registered successfully!\nYour Auto-Generated School ID is: ${schoolId}\nPlease save this ID globally and login.`);
    window.location.href = 'login.html';
}

function handleSchoolLogin(e) {
    e.preventDefault();
    // No longer requiring schoolId from input, but we check if it exists in UI just in case
    const schIdInput = document.getElementById('login-school-id');
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pass = document.getElementById('login-password').value;
    const role = document.getElementById('login-role') ? document.getElementById('login-role').value : null;

    if (!email || !pass) return alert("Please fill details");

    const dataKey = 'school_attendance_data';
    const data = getAppData(dataKey, { users: {} });

    let foundSchoolId = null;
    let account = null;

    if (data.users) {
        if (schIdInput && schIdInput.value.trim() !== '') {
            // If they provided a school ID, search strictly there
            const explicitId = schIdInput.value.trim();
            if (data.users[explicitId] && data.users[explicitId][email]) {
                foundSchoolId = explicitId;
                account = data.users[explicitId][email];
            }
        } else {
            // Otherwise, iterate all schools to find their email
            for (const sId in data.users) {
                if (data.users[sId][email]) {
                    foundSchoolId = sId;
                    account = data.users[sId][email];
                    break;
                }
            }
        }
    }

    if (!account) {
        return alert("Email not found in any registered school.");
    }

    if (account.password !== pass) return alert("Incorrect password.");
    if (role && account.role !== role) {
        return alert(`You are registered as a ${account.role}. Please select the correct role from the dropdown.`);
    }

    saveSession('school_session', { schoolId: foundSchoolId, role: account.role, userId: account.userId });
    window.location.href = 'dashboard.html';
}

function forgotPassword() {
    const defaultEmail = document.getElementById('login-email') ? document.getElementById('login-email').value : '';
    const emailStr = prompt("Enter your registered email address to receive password reset instructions:", defaultEmail);
    if (emailStr && emailStr.trim() !== '') {
        alert("If that email is registered, a password reset link has been sent to " + emailStr + ".");
    }
}

function toggleLoginPassword() {
    const pwdInput = document.getElementById('login-password');
    const eyeIcon = document.getElementById('login-eye-icon');
    if (!pwdInput || !eyeIcon) return;
    if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        pwdInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

function doLogout(moduleType) {
    logout(`${moduleType}_session`, 'login.html');
}
