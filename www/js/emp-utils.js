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
    const secClaims = document.getElementById('section-claims');
    const secTasks = document.getElementById('section-tasks');

    if (view === 'claims') {
        if (btnClaims) btnClaims.classList.add('border-green-500', 'bg-white', 'dark:bg-slate-800', 'text-slate-800', 'dark:text-slate-100');
        if (btnClaims) btnClaims.classList.remove('border-transparent', 'text-slate-500', 'dark:text-slate-400');

        if (btnTasks) btnTasks.classList.remove('border-green-500', 'bg-white', 'dark:bg-slate-800', 'text-slate-800', 'dark:text-slate-100');
        if (btnTasks) btnTasks.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');

        if (secClaims) secClaims.classList.remove('hidden');
        if (secTasks) secTasks.classList.add('hidden');
    } else {
        if (btnTasks) btnTasks.classList.add('border-green-500', 'bg-white', 'dark:bg-slate-800', 'text-slate-800', 'dark:text-slate-100');
        if (btnTasks) btnTasks.classList.remove('border-transparent', 'text-slate-500', 'dark:text-slate-400');

        if (btnClaims) btnClaims.classList.remove('border-green-500', 'bg-white', 'dark:bg-slate-800', 'text-slate-800', 'dark:text-slate-100');
        if (btnClaims) btnClaims.classList.add('border-transparent', 'text-slate-500', 'dark:text-slate-400');

        if (secTasks) secTasks.classList.remove('hidden');
        if (secClaims) secClaims.classList.add('hidden');

        if (!window.empTasksLoaded && window.fetchEmpTasks) {
            window.fetchEmpTasks();
        }
    }
};

window.closeModal = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
};
