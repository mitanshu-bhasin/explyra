// js/emp-utils.js
import { doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

window.showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-green-600',
        warning: 'bg-yellow-600'
    };
    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-[slideUp_0.3s] z-50`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span class="text-sm">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

window.getFriendlyAuthMessage = (error, fallback = 'Something went wrong. Please try again.') => {
    const code = String(error?.code || '').toLowerCase();
    const messageByCode = {
        'auth/invalid-email': 'Please enter a valid work email address.',
        'auth/user-not-found': 'Account not found. Contact your admin to get access.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid login credentials. Please verify your email and password.',
        'auth/too-many-requests': 'Too many attempts. Please wait a minute and try again.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed before completion.',
        'auth/popup-blocked': 'Your browser blocked the popup. Allow popups and try again.',
        'auth/network-request-failed': 'Network issue detected. Please check your internet and retry.',
        'permission-denied': 'You do not have permission for this action.',
        'unavailable': 'Service is temporarily unavailable. Please try again shortly.',
        'deadline-exceeded': 'The request took too long. Please retry.'
    };

    if (code && messageByCode[code]) return messageByCode[code];
    if (code.includes('network') || code.includes('unavailable') || code.includes('deadline')) {
        return 'Network issue detected. Please check your internet and retry.';
    }
    return fallback;
};

window.withTimeout = (promise, timeoutMs = 12000, timeoutMessage = 'Request timed out. Please try again.') => {
    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutHandle = setTimeout(() => {
            const timeoutErr = new Error(timeoutMessage);
            timeoutErr.code = 'deadline-exceeded';
            reject(timeoutErr);
        }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => {
        clearTimeout(timeoutHandle);
    });
};

window.withRetry = async (operation, options = {}) => {
    const maxRetries = Number.isInteger(options.maxRetries) ? options.maxRetries : 2;
    const initialDelayMs = Number.isInteger(options.initialDelayMs) ? options.initialDelayMs : 450;
    const retryableCodes = options.retryableCodes || ['unavailable', 'deadline-exceeded', 'network-request-failed', 'resource-exhausted'];

    let attempt = 0;
    while (attempt <= maxRetries) {
        try {
            return await operation();
        } catch (error) {
            const code = String(error?.code || '').toLowerCase();
            const isRetryable = retryableCodes.some((entry) => code.includes(entry));
            if (!isRetryable || attempt === maxRetries) throw error;

            const delay = initialDelayMs * Math.pow(2, attempt);
            await new Promise((resolve) => setTimeout(resolve, delay));
            attempt += 1;
        }
    }
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

let currentEmpModalId = null;
let isApplyingEmpHistoryState = false;
let activeEmpModalKeydownHandler = null;
let lastFocusedElementBeforeModal = null;

const getFocusableModalElements = (modal) => {
    if (!modal) return [];
    const selectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    return Array.from(modal.querySelectorAll(selectors)).filter((el) => {
        return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    });
};

const releaseModalKeydownHandler = () => {
    if (activeEmpModalKeydownHandler) {
        document.removeEventListener('keydown', activeEmpModalKeydownHandler);
        activeEmpModalKeydownHandler = null;
    }
};

const attachModalFocusTrap = (modal) => {
    releaseModalKeydownHandler();
    activeEmpModalKeydownHandler = (event) => {
        if (event.key === 'Escape' && currentEmpModalId) {
            event.preventDefault();
            window.closeModal(currentEmpModalId);
            return;
        }

        if (event.key !== 'Tab') return;
        const focusableElements = getFocusableModalElements(modal);
        if (!focusableElements.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    };

    document.addEventListener('keydown', activeEmpModalKeydownHandler);
};

window.getEmpNavState = () => ({
    empMainView: document.getElementById('main-view-messages')?.classList.contains('hidden') ? 'dashboard' : 'messages',
    empTab: document.getElementById('section-financials') && !document.getElementById('section-financials').classList.contains('emp-tab-hidden')
        ? 'financials'
        : (!document.getElementById('section-tasks')?.classList.contains('emp-tab-hidden') ? 'tasks' : 'claims'),
    empMode: window.currentMode || 'company',
    empModal: currentEmpModalId || null
});

window.pushEmpNavState = ({ replace = false } = {}) => {
    if (isApplyingEmpHistoryState) return;
    const state = window.getEmpNavState();
    const url = new URL(window.location.href);
    url.searchParams.set('view', state.empMainView);
    url.searchParams.set('tab', state.empTab);
    url.searchParams.set('mode', state.empMode);
    const finalUrl = `${url.pathname}${url.search}${url.hash}`;

    if (replace) window.history.replaceState(state, '', finalUrl);
    else window.history.pushState(state, '', finalUrl);
};

window.openModalWithHistory = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocusedElementBeforeModal = document.activeElement;
    modal.classList.remove('hidden');
    currentEmpModalId = id;
    attachModalFocusTrap(modal);

    setTimeout(() => {
        const focusableElements = getFocusableModalElements(modal);
        if (focusableElements.length) focusableElements[0].focus();
    }, 0);

    window.pushEmpNavState();
};

window.applyEmpHistoryState = (state) => {
    isApplyingEmpHistoryState = true;
    try {
        const nextMain = state?.empMainView || 'dashboard';
        const nextMode = state?.empMode || 'company';
        const nextTab = state?.empTab || 'claims';
        const nextModal = state?.empModal || null;

        window.toggleMainView(nextMain, { skipHistory: true });
        if (typeof window.toggleMode === 'function') {
            window.toggleMode(nextMode, { skipHistory: true });
        }
        window.toggleEmpView(nextTab, { skipHistory: true });

        if (currentEmpModalId && currentEmpModalId !== nextModal) {
            const currentModalEl = document.getElementById(currentEmpModalId);
            if (currentModalEl) currentModalEl.classList.add('hidden');
            releaseModalKeydownHandler();
        }

        if (nextModal) {
            const nextModalEl = document.getElementById(nextModal);
            if (nextModalEl) {
                lastFocusedElementBeforeModal = document.activeElement;
                nextModalEl.classList.remove('hidden');
                attachModalFocusTrap(nextModalEl);
                const focusableElements = getFocusableModalElements(nextModalEl);
                if (focusableElements.length) focusableElements[0].focus();
            }
            currentEmpModalId = nextModal;
        } else {
            currentEmpModalId = null;
            releaseModalKeydownHandler();
        }
    } finally {
        isApplyingEmpHistoryState = false;
    }
};

window.addEventListener('popstate', (event) => {
    const dash = document.getElementById('dashboard-screen');
    if (!dash || dash.classList.contains('hidden')) return;
    const state = event.state || {
        empMainView: new URL(window.location.href).searchParams.get('view') || 'dashboard',
        empTab: new URL(window.location.href).searchParams.get('tab') || 'claims',
        empMode: new URL(window.location.href).searchParams.get('mode') || 'company',
        empModal: null
    };
    window.applyEmpHistoryState(state);
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('dashboard-screen')?.classList.contains('hidden')) return;
        window.pushEmpNavState({ replace: true });
    }, 600);
});


window.toggleEmpView = (view, options = {}) => {
    if (!['claims', 'tasks', 'financials', 'scheduler'].includes(view)) {
        view = 'claims';
    }

    const btnClaims = document.getElementById('btn-view-claims');
    const btnTasks = document.getElementById('btn-view-tasks');
    const btnFinancials = document.getElementById('btn-view-financials');
    const btnScheduler = document.getElementById('btn-view-scheduler');

    const secClaims = document.getElementById('section-claims');
    const secTasks = document.getElementById('section-tasks');
    const secFinancials = document.getElementById('section-financials');
    const secScheduler = document.getElementById('section-scheduler');

    // Reset all buttons
    [btnClaims, btnTasks, btnFinancials, btnScheduler].forEach(btn => {
        if (btn) {
            btn.classList.remove('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btn.classList.add('text-gray-500', 'dark:text-gray-400', 'hover:text-black', 'dark:hover:text-white');
        }
    });

    // Hide all sections — use emp-tab-hidden (no !important) not Tailwind hidden
    [secClaims, secTasks, secFinancials, secScheduler].forEach(sec => {
        if (sec) {
            sec.classList.add('emp-tab-hidden');
            sec.classList.remove('hidden'); // clear legacy class if present
        }
    });

    if (view === 'claims') {
        if (btnClaims) {
            btnClaims.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnClaims.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secClaims) secClaims.classList.remove('emp-tab-hidden');
    } else if (view === 'tasks') {
        if (btnTasks) {
            btnTasks.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnTasks.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secTasks) secTasks.classList.remove('emp-tab-hidden');
        if (!window.empTasksLoaded && window.fetchEmpTasks) window.fetchEmpTasks();
    } else if (view === 'financials') {
        if (btnFinancials) {
            btnFinancials.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnFinancials.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secFinancials) secFinancials.classList.remove('emp-tab-hidden');
        if (window.fetchFinancialAccounts) window.fetchFinancialAccounts();
    } else if (view === 'scheduler') {
        if (btnScheduler) {
            btnScheduler.classList.add('bg-gray-100', 'dark:bg-[#111]', 'text-black', 'dark:text-white');
            btnScheduler.classList.remove('text-gray-500', 'dark:text-gray-400');
        }
        if (secScheduler) secScheduler.classList.remove('emp-tab-hidden');
        window.renderEmpScheduler();
    }

    if (!options.skipHistory) window.pushEmpNavState();
};

window.closeModal = (id) => {
    const stateModal = window.history.state?.empModal;
    if (stateModal && stateModal === id) {
        window.history.back();
        return;
    }

    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
    if (currentEmpModalId === id) {
        currentEmpModalId = null;
        releaseModalKeydownHandler();
        if (lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === 'function') {
            lastFocusedElementBeforeModal.focus();
        }
        lastFocusedElementBeforeModal = null;
    }
};

window.toggleMainView = (viewId, options = {}) => {
    // viewId can be 'dashboard' or 'messages'
    if (viewId !== 'dashboard' && viewId !== 'messages') {
        viewId = 'dashboard';
    }

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
        if (viewDashboard) {
            viewDashboard.classList.remove('hidden');
            viewDashboard.classList.add('flex-1', 'overflow-y-auto');
            viewDashboard.style.display = '';
            viewDashboard.style.visibility = '';
        }
        if (viewMessages) {
            viewMessages.classList.add('hidden');
            viewMessages.classList.remove('flex-1', 'flex', 'flex-col');
            viewMessages.style.display = 'none';
        }
    } else if (viewId === 'messages') {
        if (viewDashboard) {
            viewDashboard.classList.add('hidden');
            viewDashboard.classList.remove('flex-1', 'overflow-y-auto');
            viewDashboard.style.display = 'none';
        }
        if (viewMessages) {
            viewMessages.classList.remove('hidden');
            viewMessages.classList.add('flex-1', 'flex', 'flex-col');
            viewMessages.style.display = 'flex';
        }

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

    if (!options.skipHistory) window.pushEmpNavState();
};

window.toggleMobileSidebar = () => {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    if (sidebar) {
        if (sidebar.classList.contains('hidden') || sidebar.style.display === 'none') {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex', 'fixed', 'z-50', 'h-full', 'left-0');
            sidebar.style.display = 'flex';
            if (overlay) overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex', 'fixed', 'z-50', 'h-full', 'left-0');
            sidebar.style.display = 'none';
            if (overlay) overlay.classList.add('hidden');
        }
    }
};

// --- NEW FEATURES LOGIC ---

// Scheduler Implementation
let empCalendar = null;
window.renderEmpScheduler = () => {
    const calendarEl = document.getElementById('emp-calendar-container');
    if (!calendarEl || typeof FullCalendar === 'undefined') return;
    
    if (empCalendar) {
        setTimeout(() => {
            empCalendar.updateSize();
            empCalendar.render();
        }, 100);
        return;
    }

    empCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        themeSystem: 'standard',
        height: 'auto',
        events: async (info, success, failure) => {
            try {
                // Fetch company events and user tasks
                const events = [];
                events.push({ title: 'Today Task', start: new Date().toISOString().split('T')[0], color: '#4f46e5' });
                success(events);
            } catch (err) {
                failure(err);
            }
        }
    });
    empCalendar.render();
};

// Currency Conversion Implementation
let exchangeRates = null;
window.baseCurrency = localStorage.getItem('empBaseCurrency') || 'INR';

window.getExchangeRates = async () => {
    if (exchangeRates) return exchangeRates;
    try {
        const res = await fetch(`https://api.exchangerate.host/latest?base=INR`);
        const data = await res.json();
        exchangeRates = data.rates;
        return exchangeRates;
    } catch (e) {
        console.error("Exchange rate fetch failed", e);
        return { "INR": 1, "USD": 0.012, "EUR": 0.011, "GBP": 0.010 };
    }
};

window.formatCurrency = (amount, code = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: code,
    }).format(amount);
};

window.convertCurrency = async (amount, from = 'INR', to = window.baseCurrency) => {
    if (from === to) return amount;
    const rates = await window.getExchangeRates();
    if (!rates) return amount;
    const inINR = amount / rates[from];
    return inINR * rates[to];
};

window.updateBaseCurrency = async (currency) => {
    window.baseCurrency = currency;
    localStorage.setItem('empBaseCurrency', currency);
    document.getElementById('emp-base-currency').value = currency;
    window.showToast(`Currency updated to ${currency}`, 'info');
    const state = window.getEmpNavState();
    window.toggleEmpView(state.empTab, { skipHistory: true });
};

// WebSpeech Implementation
let recognition = null;
window.toggleWebSpeech = (enabled) => {
    const guide = document.getElementById('speech-guide');
    if (enabled) {
        guide?.classList.remove('hidden');
        if (!('webkitSpeechRecognition' in window)) {
            window.showToast("WebSpeech not supported in this browser.", "error");
            return;
        }
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
            handleSpeechCommand(command);
        };

        recognition.onerror = (e) => console.error("Speech Error", e);
        recognition.start();
        window.showToast("Voice control enabled.", "success");
    } else {
        guide?.classList.add('hidden');
        if (recognition) recognition.stop();
        window.showToast("Voice control disabled.", "info");
    }
};

function handleSpeechCommand(cmd) {
    if (cmd.includes("expenses") || cmd.includes("claims")) window.toggleEmpView('claims');
    else if (cmd.includes("tasks")) window.toggleEmpView('tasks');
    else if (cmd.includes("scheduler") || cmd.includes("schedule")) window.toggleEmpView('scheduler');
    else if (cmd.includes("messages")) window.toggleMainView('messages');
    else if (cmd.includes("new claim") || cmd.includes("create claim")) window.openModalWithHistory('modal-create');
    else if (cmd.includes("logout")) window.handleLogout();
}
