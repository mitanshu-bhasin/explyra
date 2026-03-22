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
        if (!user) {
            // Redirect to main login if not authenticated
            window.location.href = '../login.html';
            return;
        }

        try {
            // Fetch role from Firestore
            // Note: We prioritize userData.uid which is usually set globally, 
            // but fallback to user.uid from the listener
            const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
            const userData = userDoc.exists ? userDoc.data() : {};
            const mrRole = userData.mrRole; // STRICT CHECK
            
            if (!mrRole) {
                showAccessDeniedScreen();
                return;
            }

            renderSidebar(user, mrRole);
            // No need for checkAccess(userRole) anymore as it's handled above
        } catch (error) {
            console.error("Error fetching user role:", error);
            // Fallback or error handling
            renderSidebar(user, 'visitor');
            checkAccess('visitor');
        }
    });

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
                <li class="nav-item"><a href="index.html" class="nav-link" id="nav-home"><i class="fas fa-home"></i> <span>Home</span></a></li>
                <li class="nav-item"><a href="dashboard.html" class="nav-link" id="nav-dashboard"><i class="fas fa-chart-line"></i> <span>Dashboard</span></a></li>
                <li class="nav-item"><a href="production.html" class="nav-link" id="nav-production"><i class="fas fa-industry"></i> <span>Production</span></a></li>
                <li class="nav-item"><a href="inventory.html" class="nav-link" id="nav-inventory"><i class="fas fa-boxes"></i> <span>Inventory</span></a></li>
                <li class="nav-item"><a href="machines.html" class="nav-link" id="nav-machines"><i class="fas fa-cogs"></i> <span>Machines</span></a></li>
                <li class="nav-item"><a href="orders.html" class="nav-link" id="nav-orders"><i class="fas fa-shopping-cart"></i> <span>Orders</span></a></li>
                <li class="nav-item"><a href="suppliers.html" class="nav-link" id="nav-suppliers"><i class="fas fa-truck-loading"></i> <span>Suppliers</span></a></li>
                <li class="nav-item"><a href="reports.html" class="nav-link" id="nav-reports"><i class="fas fa-file-alt"></i> <span>Reports</span></a></li>
            </ul>
            <div class="user-profile" style="margin-top: auto; padding: 1rem; border-top: 1px solid var(--glass-border); display: flex; align-items: center; gap: 10px;">
                <div style="width: 32px; height: 32px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; overflow: hidden;">
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
        const modalHtml = `
            <div id="role-setup-modal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="glass-card" style="max-width: 420px; width: 100%; text-align: center; border: 1px solid rgba(239, 68, 68, 0.3); padding: 3rem;">
                    <div style="width: 80px; hieght: 80px; background: rgba(239, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem;">
                        <i class="fas fa-lock fa-2x" style="color: var(--danger);"></i>
                    </div>
                    <h2 style="margin-bottom: 1rem; color: #fff;">Access Restricted</h2>
                    <p style="color: var(--text-muted); margin-bottom: 2.5rem; font-size: 0.95rem; line-height: 1.6;">
                        Your account does not have a <strong>Manufacturing Role (MR Role)</strong> assigned. 
                        Please contact your System Administrator to grant access.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="btn btn-primary" onclick="window.location.href='../index.html'" style="width: 100%;">
                            <i class="fas fa-home"></i> Back to Dashboard
                        </button>
                        <button class="btn" onclick="firebase.auth().signOut()" style="color: var(--danger); background: transparent; border: 1px solid rgba(239, 68, 68, 0.2);">
                            <i class="fas fa-sign-out-alt"></i> Logout
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

});

// Toast Animation Base
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0);    opacity: 0;
    pointer-events: none;
}
`;
document.head.appendChild(style);

window.deleteItem = async (fileName, key, value) => {
    if (confirm("Are you sure you want to permanently delete this item?")) {
        try {
            const success = await DataHandler.deleteItem(fileName, key, value);
            if (success) {
                window.showToast("Item deleted successfully", "success");
                setTimeout(() => window.location.reload(), 1000);
            } else {
                window.showToast("Item not found", "error");
            }
        } catch (e) {
            console.error(e);
            window.showToast("Error deleting item", "error");
        }
    }
};
