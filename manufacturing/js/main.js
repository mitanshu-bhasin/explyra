window.showToast = (msg, type = 'success') => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    const color = type === 'success' ? '#10B981' : (type === 'error' ? '#EF4444' : '#5B8AF5');
    toast.style.cssText = `padding: 12px 20px; border-radius: 8px; color: white; font-size: 0.9rem; font-weight: 500; background: ${color}; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 10px; animation: slideIn 0.3s ease forwards; pointer-events: auto;`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${msg}`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = '0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Global Button Handlers for Placeholders
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    
    // If the button has no specific onclick or specific listener already attached 
    // we can show a placeholder toast for certain text matches if they aren't working
    const text = btn.innerText.toLowerCase();
    if (text.includes('scan now') || text.includes('scan item')) {
        if (!btn.onclick) window.showToast('Initializing Camera Scanner...', 'info');
    } else if (text.includes('new batch')) {
        window.showActionModal('production');
    } else if (text.includes('add material')) {
        window.showActionModal('inventory');
    } else if (text.includes('new order')) {
        window.showActionModal('orders');
    } else if (text.includes('export data')) {
        window.showToast('Preparing PDF/CSV Export...', 'info');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Firebase Auth State Listener
    firebase.auth().onAuthStateChanged(async (user) => {
        // Quick check for cached clearance to prevent flicker
        const cachedClearance = localStorage.getItem('erp_clearance');
        if (user && cachedClearance) {
            renderSidebar(user, cachedClearance);
        }

        if (!user) {
            localStorage.removeItem('erp_clearance');
            showLoginModal();
            return;
        }

        try {
            const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
            const userData = userDoc.exists ? userDoc.data() : {};
            
            const role = userData.role || 'visitor';
            const mrRole = userData.mrRole; 
            const isHRAccess = (role === 'hr' && userData.erpPermissions?.manufacturing);
            const isAdmin = (role === 'admin' || role === 'owner');

            if (isAdmin || mrRole || isHRAccess) {
                const finalRole = mrRole || role;
                window.companyId = userData.companyId; // Set globally for DataHandler
                localStorage.setItem('erp_clearance', finalRole);
                
                // Only re-render if it wasn't already rendered by cache, or if role changed
                if (!cachedClearance || cachedClearance !== finalRole) {
                    renderSidebar(user, finalRole);
                }

                if (document.getElementById('erp-login-modal')) {
                    document.getElementById('erp-login-modal').remove();
                }
            } else {
                localStorage.removeItem('erp_clearance');
                showAccessDeniedScreen();
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
            if (!localStorage.getItem('erp_clearance')) {
                showLoginModal();
            }
        }
    });

    function showLoginModal() {
        if (document.getElementById('erp-login-modal')) return;

        const modalHtml = `
            <div id="erp-login-modal" style="position: fixed; inset: 0; background: rgba(255,255,255,0.7); backdrop-filter: blur(24px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="glass-card" style="max-width: 400px; width: 100%; border: 1px solid #E2E8F0; padding: 3rem; text-align: center; box-shadow: 0 30px 60px -12px rgba(0,0,0,0.15);">
                    <div class="logo" style="margin-bottom: 2rem; justify-content: center; transform: scale(1.2);">
                        <svg class="logo-icon" viewBox="0 0 24 24" style="width: 32px; height:32px;">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#020617"></path>
                            <path d="M2 17l10 5 10-5" fill="#020617"></path>
                            <path d="M2 12l10 5 10-5" fill="#020617"></path>
                        </svg>
                        <span class="logo-text" style="font-size: 1.5rem; color: #020617; font-weight: 800;">Explyra ERP</span>
                    </div>
                    <h2 style="margin-bottom: 0.5rem; color: #020617; font-family: 'Outfit', sans-serif; font-weight: 700;">System Login</h2>
                    <p style="color: #64748B; margin-bottom: 2.5rem; font-size: 0.9rem; font-weight: 500;">Console access for Manufacturing & Ops.</p>
                    
                    <form id="erp-auth-form">
                        <div style="text-align: left; margin-bottom: 1.2rem;">
                            <label style="display: block; font-size: 0.7rem; font-weight: 700; color: #94A3B8; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Authorized Email</label>
                            <input type="email" id="erp-email" required style="width: 100%; padding: 0.8rem 1rem; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; color: #020617; font-family: inherit; outline: none; transition: 0.2s;" placeholder="admin@company.com">
                        </div>
                        <div style="text-align: left; margin-bottom: 0.5rem;">
                            <label style="display: block; font-size: 0.7rem; font-weight: 700; color: #94A3B8; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Security Key</label>
                            <input type="password" id="erp-password" required style="width: 100%; padding: 0.8rem 1rem; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; color: #020617; font-family: inherit; outline: none; transition: 0.2s;" placeholder="••••••••">
                        </div>
                        <div style="text-align: right; margin-bottom: 2rem;">
                            <a href="#" id="erp-forgot-pwd" style="font-size: 0.75rem; color: #020617; text-decoration: none; font-weight: 600;">Recover Access?</a>
                        </div>
                        <button type="submit" class="btn btn-primary" id="erp-login-btn" style="width: 100%; padding: 1.1rem; font-weight: 700; font-size: 0.95rem; border-radius: 8px; background: #020617; color: #fff; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);">
                            Authenticate System <i class="fas fa-key" style="margin-left: 8px; font-size: 0.8rem;"></i>
                        </button>
                    </form>
                    
                    <div style="margin-top: 2.5rem; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.7rem; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fas fa-shield-check" style="color: #10B981;"></i> Security Protocol Active
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Forgot Password Logic
        document.getElementById('erp-forgot-pwd').onclick = async (e) => {
            e.preventDefault();
            const email = document.getElementById('erp-email').value;
            if (!email) {
                window.showToast("Please enter your email address first", "error");
                return;
            }
            try {
                await firebase.auth().sendPasswordResetEmail(email);
                window.showToast("Reset link sent to your email!");
            } catch (err) {
                window.showToast("Error: " + err.message, "error");
            }
        };

        document.getElementById('erp-auth-form').onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('erp-email').value;
            const password = document.getElementById('erp-password').value;
            const btn = document.getElementById('erp-login-btn');
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Initializing...';
            btn.disabled = true;

            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                window.showToast("Authentication successful!");
            } catch (error) {
                console.error(error);
                window.showToast("Invalid credentials or unauthorized access", "error");
                btn.innerHTML = 'Unlock System <i class="fas fa-arrow-right"></i>';
                btn.disabled = false;
            }
        };
    }

    function renderSidebar(user, role) {
        const sidebar = `
            <a href="index.html" class="logo">
                <svg class="logo-icon" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span class="logo-text">Explyra</span>
            </a>
            <ul class="nav-menu">
                <li class="nav-category">Core Integration</li>
                <li class="nav-item"><a href="index.html" class="nav-link" id="nav-home"><i class="fas fa-home-alt"></i> <span>Home</span></a></li>
                <li class="nav-item"><a href="dashboard.html" class="nav-link" id="nav-dashboard"><i class="fas fa-grid-horizontal"></i> <span>Console Dashboard</span></a></li>
                
                <li class="nav-category">Operations Management</li>
                <li class="nav-item"><a href="production.html" class="nav-link" id="nav-production"><i class="fas fa-microchip"></i> <span>Production Flow</span></a></li>
                <li class="nav-item"><a href="machines.html" class="nav-link" id="nav-machines"><i class="fas fa-microscope"></i> <span>Asset Management</span></a></li>
                <li class="nav-item"><a href="orders.html" class="nav-link" id="nav-orders"><i class="fas fa-rectangle-list"></i> <span>Work Orders</span></a></li>
                
                <li class="nav-category">Supply Chain</li>
                <li class="nav-item"><a href="inventory.html" class="nav-link" id="nav-inventory"><i class="fas fa-warehouse"></i> <span>Real-time Inventory</span></a></li>
                <li class="nav-item"><a href="suppliers.html" class="nav-link" id="nav-suppliers"><i class="fas fa-address-book"></i> <span>Supplier Directory</span></a></li>
                <li class="nav-item"><a href="reports.html" class="nav-link" id="nav-reports"><i class="fas fa-chart-mixed"></i> <span>Advanced Analytics</span></a></li>
                <li class="nav-category">Intelligence</li>
                <li class="nav-item"><a href="ai-agent.html" class="nav-link" id="nav-ai"><i class="fas fa-robot"></i> <span>AI Agent</span></a></li>
            </ul>
            <div class="user-profile" style="margin-top: auto; padding: 1rem; border-top: 1px solid var(--glass-border); display: flex; align-items: center; gap: 10px;">
                <div style="width: 32px; height: 32px; background: #020617; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; overflow: hidden;">
                    ${user.photoURL ? `<img src="${user.photoURL}" style="width: 100%; height: 100%; object-fit: cover;">` : user.email.substring(0,2).toUpperCase()}
                </div>
                <div style="font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    <div style="font-weight: 600;">${user.displayName || user.email.split('@')[0]}</div>
                    <div style="color: var(--text-muted); font-size: 0.7rem;">${role.toUpperCase()}</div>
                </div>
                <button onclick="firebase.auth().signOut()" style="background: none; border: none; color: var(--danger); cursor: pointer; margin-left: auto;"><i class="fas fa-sign-out-alt"></i></button>
            </div>
        `;

        const sidebarContainer = document.querySelector('.sidebar');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = sidebar;
            
            // Active link highlighting
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const activeLink = document.querySelector(`.nav-link[href="${currentPath}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }

    function showAccessDeniedScreen() {
        if (document.getElementById('role-setup-modal')) return;
        const modalHtml = `
            <div id="role-setup-modal" style="position: fixed; inset: 0; background: rgba(255,255,255,0.7); backdrop-filter: blur(24px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="glass-card" style="max-width: 440px; width: 100%; text-align: center; border: 1px solid rgba(239, 68, 68, 0.1); padding: 3.5rem; box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1);">
                    <div style="width: 80px; height: 80px; background: #FEF2F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; border: 1px solid #FEE2E2;">
                        <i class="fas fa-lock fa-2x" style="color: var(--danger);"></i>
                    </div>
                    <h2 style="margin-bottom: 1rem; color: #020617; font-weight: 700; letter-spacing: -0.5px;">Clearance Required</h2>
                    <p style="color: #64748B; margin-bottom: 3rem; font-size: 0.95rem; line-height: 1.7; font-weight: 500;">
                        Your credentials lack the necessary **Manufacturing Level Permissions**. 
                        Please request an upgrade from your administrator.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        <button class="btn btn-primary" onclick="window.location.href='../index.html'" style="width: 100%; padding: 1rem; background: #020617; color: #fff; font-weight: 700;">
                            <i class="fas fa-house" style="margin-right: 8px;"></i> Return to Hub
                        </button>
                        <button class="btn" onclick="firebase.auth().signOut().then(() => window.location.reload())" style="color: var(--danger); background: transparent; border: 1px solid #E2E8F0; padding: 1rem; font-weight: 600;">
                            <i class="fas fa-user-xmark" style="margin-right: 8px;"></i> Re-authenticate
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    window.showActionModal = (type) => {
        let title = '';
        let fields = '';
        let fileName = '';

        if (type === 'inventory') {
            title = 'Add New Material';
            fileName = 'inventory';
            fields = `
                <input type="text" id="m-name" placeholder="Material Name" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="text" id="m-type" placeholder="Type (e.g. Raw Metal)" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="number" id="m-qty" placeholder="Initial Quantity" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="number" id="m-reorder" placeholder="Reorder Level" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="text" id="m-supplier" placeholder="Supplier Name" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
            `;
        } else if (type === 'production') {
            title = 'Create Production Batch';
            fileName = 'production';
            fields = `
                <input type="text" id="p-id" placeholder="Batch ID (e.g. B-999)" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="text" id="p-product" placeholder="Product Name" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="text" id="p-machine" placeholder="Machine Assignment" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="number" id="p-target" placeholder="Target Units" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
            `;
        } else if (type === 'orders') {
            title = 'Explyra — Create New Order';
            fileName = 'orders';
            fields = `
                <input type="text" id="o-id" placeholder="Order ID (e.g. ORD-101)" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="text" id="o-product" placeholder="Product Name" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="number" id="o-qty" placeholder="Quantity" class="btn" style="width:100%; text-align:left; margin-bottom:10px;">
                <input type="date" id="o-date" class="btn" style="width:100%; text-align:left; margin-bottom:10px; color:white;">
            `;
        }

        const modalHtml = `
            <div id="action-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="glass-card" style="max-width: 450px; width: 100%; border: 1px solid var(--glass-border); padding: 2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
                        <h3 style="margin:0;">${title}</h3>
                        <button onclick="document.getElementById('action-modal').remove()" style="background:none; border:none; color:white; cursor:pointer;"><i class="fas fa-times"></i></button>
                    </div>
                    <form id="action-form">
                        ${fields}
                        <div style="display:flex; gap:10px; margin-top:1.5rem;">
                            <button type="button" class="btn" style="flex:1;" onclick="document.getElementById('action-modal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary" style="flex:1;">Save Data</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('action-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('.btn-primary');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            btn.disabled = true;

            let newItem = {};
            if (type === 'inventory') {
                newItem = {
                    name: document.getElementById('m-name').value,
                    type: document.getElementById('m-type').value,
                    quantity: parseInt(document.getElementById('m-qty').value),
                    reorderLevel: parseInt(document.getElementById('m-reorder').value),
                    supplier: document.getElementById('m-supplier').value,
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
            } else if (type === 'production') {
                newItem = {
                    id: document.getElementById('p-id').value,
                    product: document.getElementById('p-product').value,
                    machine: document.getElementById('p-machine').value,
                    target: parseInt(document.getElementById('p-target').value),
                    worker: "Current User",
                    progress: 0,
                    status: "In Progress"
                };
            } else if (type === 'orders') {
                newItem = {
                    id: document.getElementById('o-id').value,
                    product: document.getElementById('o-product').value,
                    quantity: parseInt(document.getElementById('o-qty').value),
                    dueDate: document.getElementById('o-date').value,
                    batchId: "TBD",
                    status: "Pending"
                };
            }

            // Fixed Validation: Check for empty strings and NaN only for numeric fields
            const hasEmpty = Object.values(newItem).some(v => v === '');
            const hasNaN = (type === 'inventory' && (isNaN(newItem.quantity) || isNaN(newItem.reorderLevel))) ||
                           (type === 'production' && isNaN(newItem.target)) ||
                           (type === 'orders' && isNaN(newItem.quantity));

            if (hasEmpty || hasNaN) {
                window.showToast('Please fill all required fields correctly', 'error');
                btn.innerHTML = 'Save Data';
                btn.disabled = false;
                return;
            }

            await DataHandler.addItem(fileName, newItem);
            window.showToast('Data saved successfully!');
            document.getElementById('action-modal').remove();
            
            // Reload if we are on the relevant page
            const currentFile = window.location.pathname.split('/').pop();
            if (currentFile.includes(fileName) || (currentFile === 'dashboard.html' && (fileName === 'production' || fileName === 'orders'))) {
                window.location.reload();
            }
        };
    };


    // Call mobile UI injection moved outside or earlier if possible
    // injectMobileUI(); 
});

// Mobile Navigation Logic moved to top level for faster execution
window.toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
};

window.closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
};

function injectMobileUI() {
    if (document.querySelector('.mobile-header')) return;
    
    // Mobile Header
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    mobileHeader.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <button onclick="toggleSidebar()" style="background:none; border:none; color:#020617; font-size:1.2rem; cursor:pointer; padding:5px;">
                <i class="fas fa-bars"></i>
            </button>
            <div class="logo" style="margin:0; padding:0;">
                <svg class="logo-icon" viewBox="0 0 24 24" style="width:24px; height:24px;">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#020617"></path>
                    <path d="M2 17l10 5 10-5" fill="#020617"></path>
                    <path d="M2 12l10 5 10-5" fill="#020617"></path>
                </svg>
                <span class="logo-text" style="font-size: 1rem; color: #020617; font-weight: 800;">Explyra</span>
            </div>
        </div>
        <div style="width: 30px; height: 30px; background: #020617; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.65rem; font-weight: bold;">
            EX
        </div>
    `;
    
    // Mobile Tab Nav (Quick Switcher)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const mobileTabNav = document.createElement('div');
    mobileTabNav.className = 'mobile-tab-nav';
    mobileTabNav.innerHTML = `
        <a href="index.html" class="mobile-tab-link ${currentPath === 'index.html' ? 'active' : ''}"><i class="fas fa-home" style="font-size:0.8rem;"></i> Home</a>
        <a href="dashboard.html" class="mobile-tab-link ${currentPath === 'dashboard.html' ? 'active' : ''}"><i class="fas fa-chart-line" style="font-size:0.8rem;"></i> Dash</a>
        <a href="production.html" class="mobile-tab-link ${currentPath === 'production.html' ? 'active' : ''}"><i class="fas fa-microchip" style="font-size:0.8rem;"></i> Prod</a>
        <a href="inventory.html" class="mobile-tab-link ${currentPath === 'inventory.html' ? 'active' : ''}"><i class="fas fa-warehouse" style="font-size:0.8rem;"></i> Inv</a>
        <a href="machines.html" class="mobile-tab-link ${currentPath === 'machines.html' ? 'active' : ''}"><i class="fas fa-microscope" style="font-size:0.8rem;"></i> Asset</a>
        <a href="orders.html" class="mobile-tab-link ${currentPath === 'orders.html' ? 'active' : ''}"><i class="fas fa-rectangle-list" style="font-size:0.8rem;"></i> Orders</a>
        <a href="suppliers.html" class="mobile-tab-link ${currentPath === 'suppliers.html' ? 'active' : ''}"><i class="fas fa-address-book" style="font-size:0.8rem;"></i> Suppliers</a>
        <a href="reports.html" class="mobile-tab-link ${currentPath === 'reports.html' ? 'active' : ''}"><i class="fas fa-chart-bar" style="font-size:0.8rem;"></i> Analytics</a>
        <a href="ai-agent.html" class="mobile-tab-link ${currentPath === 'ai-agent.html' ? 'active' : ''}"><i class="fas fa-robot" style="font-size:0.8rem;"></i> AI</a>
    `;
    
    // Sidebar Overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.onclick = window.closeSidebar;
    
    document.body.prepend(mobileTabNav);
    document.body.prepend(mobileHeader);
    document.body.appendChild(overlay);

    // Auto-scroll to active tab with a slight delay to ensure rendering
    setTimeout(() => {
        const activeLink = mobileTabNav.querySelector('.mobile-tab-link.active');
        if (activeLink) {
            const containerWidth = mobileTabNav.offsetWidth;
            const linkOffset = activeLink.offsetLeft;
            const linkWidth = activeLink.offsetWidth;
            mobileTabNav.scrollLeft = linkOffset - (containerWidth / 2) + (linkWidth / 2);
        }
    }, 100);
}

// Call mobile UI injection immediately since script is at end of body
if (document.body) {
    injectMobileUI();
} else {
    document.addEventListener('DOMContentLoaded', injectMobileUI);
}

// Toast Animation Base
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { 
        from { transform: translateX(100%); opacity: 0; } 
        to { transform: translateX(0); opacity: 1; } 
    }
`;
document.head.appendChild(style);

window.deleteItem = async (fileName, key, value) => {
    if (confirm("Are you sure you want to permanently delete this item?")) {
        try {
            let idToDelete = (key === 'id') ? value : null;
            
            // If key is not 'id', we need to find the document ID first
            if (!idToDelete) {
                const data = await DataHandler.fetchData(fileName);
                const item = data.find(i => String(i[key]) === String(value));
                if (item) idToDelete = item.id;
            }

            if (!idToDelete) {
                window.showToast("Item not found", "error");
                return;
            }

            const success = await DataHandler.deleteItem(fileName, idToDelete);
            if (success) {
                window.showToast("Item deleted successfully", "success");
                setTimeout(() => window.location.reload(), 1000);
            } else {
                window.showToast("Error deleting item", "error");
            }
        } catch (e) {
            console.error(e);
            window.showToast("Error processing request", "error");
        }
    }
};
