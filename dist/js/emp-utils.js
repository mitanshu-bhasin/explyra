// js/emp-utils.js

export const IMGBB_KEY = "dbcb9de125850fefa4337db8d1f37ab6";
export const IMGBB_URL = "https://api.imgbb.com/1/upload";

window.showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-green-600',
        warning: 'bg-yellow-600'
    };
    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-[slideUp_0.3s] z-50`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span class="text-sm">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

let inputModalResolve = null;
window.showInputPromise = (title, message, placeholder = '', type = 'text', defaultValue = '') => {
    if (inputModalResolve) {
        inputModalResolve(null);
        inputModalResolve = null;
    }

    return new Promise((resolve) => {
        inputModalResolve = resolve;

        const titleEl = document.getElementById('input-modal-title');
        const msgEl = document.getElementById('input-modal-message');
        const inputel = document.getElementById('input-modal-value');
        const modal = document.getElementById('input-modal');
        const content = document.getElementById('input-modal-content');

        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = message;

        if (inputel) {
            if (type === 'none') {
                inputel.classList.add('hidden');
            } else {
                inputel.classList.remove('hidden');
                inputel.type = type;
                inputel.placeholder = placeholder;
                inputel.value = defaultValue;
            }
        }

        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
                if (type !== 'none' && inputel) inputel.focus();
            }, 50);
        }
    });
};

window.closeInputModal = (val) => {
    const modal = document.getElementById('input-modal');
    const content = document.getElementById('input-modal-content');
    if (!modal) return;

    if (content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
    }

    setTimeout(() => {
        modal.classList.add('hidden');
        const input = document.getElementById('input-modal-value');
        if (input) input.value = '';
    }, 200);

    if (inputModalResolve) {
        const resolve = inputModalResolve;
        inputModalResolve = null;
        resolve(val);
    }
};

window.confirmInputModal = () => {
    const input = document.getElementById('input-modal-value');
    if (input && input.classList.contains('hidden')) {
        window.closeInputModal(true);
    } else if (input) {
        window.closeInputModal(input.value);
    }
};

window.triggerGoogleTranslate = (lang) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
    }
};

window.toggleEmpLanguageDropdown = () => {
    const dd = document.getElementById('emp-lang-dropdown');
    if (dd) dd.classList.toggle('hidden');
};

window.selectEmpLanguage = (lang) => {
    window.triggerGoogleTranslate(lang);
    updateEmpLangUI(lang);
    const dd = document.getElementById('emp-lang-dropdown');
    if (dd) dd.classList.add('hidden');
};

function updateEmpLangUI(lang) {
    const select = document.getElementById('emp-lang-select');
    if (select) select.value = lang;
}


window.toggleEmpView = (view) => {
    const btnClaims = document.getElementById('btn-view-claims');
    const btnTasks = document.getElementById('btn-view-tasks');
    const btnFinancials = document.getElementById('btn-view-financials');
    const secClaims = document.getElementById('section-claims');
    const secTasks = document.getElementById('section-tasks');
    const secFinancials = document.getElementById('section-financials');

    // Reset all buttons
    [btnClaims, btnTasks, btnFinancials].forEach(btn => {
        if (btn) {
            btn.classList.remove('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btn.classList.add('text-gray-500', 'dark:text-gray-400', 'hover:text-black', 'dark:hover:text-white');
        }
    });

    // Hide all sections
    [secClaims, secTasks, secFinancials].forEach(sec => {
        if (sec) sec.classList.add('hidden');
    });

    if (view === 'claims') {
        if (btnClaims) {
            btnClaims.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnClaims.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secClaims) secClaims.classList.remove('hidden');
    } else if (view === 'tasks') {
        if (btnTasks) {
            btnTasks.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnTasks.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secTasks) secTasks.classList.remove('hidden');
        if (!window.empTasksLoaded && window.fetchEmpTasks) window.fetchEmpTasks();
    } else if (view === 'financials') {
        if (btnFinancials) {
            btnFinancials.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnFinancials.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secFinancials) secFinancials.classList.remove('hidden');
        if (window.fetchFinancialAccounts) window.fetchFinancialAccounts();
    }
};

window.closeModal = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
};

window.toggleMainView = (viewId) => {
    // viewId can be 'dashboard' or 'messages'
    const viewDashboard = document.getElementById('main-view-dashboard');
    const viewMessages = document.getElementById('main-view-messages');

    // Sidebar items
    const sidebarItems = document.querySelectorAll('#main-sidebar .sidebar-item');
    
    // First remove active state from all
    sidebarItems.forEach(item => {
        item.classList.remove('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white', 'hover:bg-gray-100', 'dark:hover:bg-[#111]');
        item.classList.add('text-gray-500', 'dark:text-gray-400', 'hover:text-black', 'dark:hover:text-white', 'hover:bg-gray-100', 'dark:hover:bg-[#111]');
        
        const icon = item.querySelector('i');
        if (icon) {
            icon.classList.remove('text-black', 'dark:text-white');
            icon.classList.add('text-gray-400', 'group-hover:text-black', 'dark:group-hover:text-white');
        }
    });

    // Make the clicked one active
    const tgtText = viewId === 'dashboard' ? 'Home' : 'Messages';
    sidebarItems.forEach(item => {
        if (item.textContent.includes(tgtText)) {
            item.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            item.classList.remove('text-gray-500', 'dark:text-gray-400', 'hover:text-black', 'dark:hover:text-white', 'hover:bg-gray-100', 'dark:hover:bg-[#111]');
            
            const icon = item.querySelector('i');
            if (icon) {
                icon.classList.remove('text-gray-400', 'group-hover:text-black', 'dark:group-hover:text-white');
            }
        }
    });

    if (viewId === 'dashboard') {
        if (viewDashboard) viewDashboard.classList.remove('hidden');
        if (viewDashboard) viewDashboard.classList.add('flex-1', 'overflow-y-auto');
        if (viewMessages) viewMessages.classList.add('hidden');
        if (viewMessages) viewMessages.classList.remove('flex-1', 'flex', 'flex-col');
    } else if (viewId === 'messages') {
        if (viewDashboard) viewDashboard.classList.add('hidden');
        if (viewDashboard) viewDashboard.classList.remove('flex-1', 'overflow-y-auto');
        if (viewMessages) viewMessages.classList.remove('hidden');
        if (viewMessages) viewMessages.classList.add('flex-1', 'flex', 'flex-col');
        
        // Fetch chat users if not already fetched
        if (window.fetchChatUsers) {
            window.fetchChatUsers();
            if (window.currentChatContext === 'global' || !window.currentChatContext) {
                 window.selectChat('global');
            }
        }
    }

    // On mobile, close sidebar after clicking
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar && !sidebar.classList.contains('hidden') && window.innerWidth < 768) {
         sidebar.classList.add('hidden');
         sidebar.classList.remove('flex', 'absolute', 'z-50', 'h-full', 'left-0');
    }
};

window.toggleMobileSidebar = () => {
    const sidebar = document.getElementById('main-sidebar');
    if (sidebar) {
        if (sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex', 'absolute', 'z-50', 'h-full', 'left-0');
        } else {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex', 'absolute', 'z-50', 'h-full', 'left-0');
        }
    }
};
