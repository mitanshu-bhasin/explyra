// js/emp-expenses.js
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc, deleteDoc, serverTimestamp, onSnapshot, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { checkSpam } from './spam-filter.js';
import { IMGBB_KEY, IMGBB_URL } from './emp-utils.js';

window.expensesData = [];
window.expensesUnsub = null;
window.currentMode = 'company';

const EXPENSE_DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

window.getExpenseDraftKey = () => {
    const userId = window.userData?.docId || 'anon';
    const companyId = window.companyId || 'no-company';
    return `explyra-expense-draft:${companyId}:${userId}`;
};

window.clearExpenseValidationErrors = () => {
    document.querySelectorAll('#expense-form .field-error').forEach((el) => el.remove());
    document.querySelectorAll('#expense-form .border-red-500').forEach((el) => {
        el.classList.remove('border-red-500', 'ring-1', 'ring-red-400');
    });
};

window.setFieldError = (inputEl, message) => {
    if (!inputEl) return;
    const id = inputEl.id || `field-${Math.random().toString(36).slice(2)}`;
    inputEl.id = id;
    inputEl.setAttribute('aria-invalid', 'true');
    const errorId = `${id}-error`;
    inputEl.setAttribute('aria-describedby', errorId);
    inputEl.classList.add('border-red-500', 'ring-1', 'ring-red-400');

    const existing = inputEl.parentElement?.querySelector(`#${errorId}`);
    if (existing) {
        existing.textContent = message;
        return;
    }

    const err = document.createElement('p');
    err.id = errorId;
    err.className = 'field-error text-[11px] text-red-600 mt-1 font-semibold';
    err.textContent = message;
    inputEl.parentElement?.appendChild(err);
};

window.validateExpenseClaimForm = () => {
    window.clearExpenseValidationErrors();
    let valid = true;

    const title = document.getElementById('report-title');
    const projectCode = document.getElementById('project-code');
    const preApproved = document.getElementById('pre-approved')?.checked || false;
    const proofUrlFile = document.getElementById('approval-proof-final-url')?.value.trim() || '';
    const proofUrlText = document.getElementById('approval-proof-url')?.value.trim() || '';
    const proofUrl = proofUrlFile || proofUrlText;

    if (!title?.value.trim()) {
        window.setFieldError(title, 'Title is required.');
        valid = false;
    }

    if (window.currentMode !== 'personal' && !projectCode?.value.trim()) {
        window.setFieldError(projectCode, 'Select a project or cost code.');
        valid = false;
    }

    if (preApproved && !proofUrl) {
        const proofInput = document.getElementById('approval-proof-url') || document.getElementById('proof-file-input');
        window.setFieldError(proofInput, 'Provide approval proof for pre-approved activity.');
        valid = false;
    }

    const lineItems = document.querySelectorAll('.line-item');
    if (!lineItems.length) {
        valid = false;
    }

    lineItems.forEach((el) => {
        const amountEl = el.querySelector('.item-amount');
        const descEl = el.querySelector('.item-desc');
        const dateEl = el.querySelector('.item-date');
        const amount = parseFloat(amountEl?.value || 0);

        if (!descEl?.value.trim()) {
            window.setFieldError(descEl, 'Description is required.');
            valid = false;
        }
        if (!amount || amount <= 0) {
            window.setFieldError(amountEl, 'Amount must be greater than 0.');
            valid = false;
        }
        if (!dateEl?.value) {
            window.setFieldError(dateEl, 'Date is required.');
            valid = false;
        }
    });

    const firstError = document.querySelector('#expense-form .field-error');
    if (!valid && firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
};

window.collectExpenseDraft = () => {
    const modal = document.getElementById('modal-create');
    if (!modal || modal.classList.contains('hidden')) return null;
    if (window.currentMode === 'personal') return null;
    if (document.getElementById('expense-id')?.value) return null;

    return {
        version: 1,
        savedAt: Date.now(),
        title: document.getElementById('report-title')?.value || '',
        projectCode: document.getElementById('project-code')?.value || '',
        currency: document.getElementById('currency')?.value || 'INR',
        preApproved: !!document.getElementById('pre-approved')?.checked,
        approvalProofUrl: document.getElementById('approval-proof-url')?.value || '',
        approvalProofFinalUrl: document.getElementById('approval-proof-final-url')?.value || '',
        notes: document.getElementById('expense-notes')?.value || '',
        claimType: document.getElementById('claim-type')?.value || 'EXPENSE',
        lineItems: Array.from(document.querySelectorAll('.line-item')).map((el) => ({
            category: el.querySelector('.item-category')?.value || 'Other',
            amount: el.querySelector('.item-amount')?.value || '',
            description: el.querySelector('.item-desc')?.value || '',
            receiptUrl: el.querySelector('.item-img-url')?.value || '',
            date: el.querySelector('.item-date')?.value || ''
        }))
    };
};

window.saveExpenseDraft = () => {
    try {
        const payload = window.collectExpenseDraft();
        if (!payload) return;
        localStorage.setItem(window.getExpenseDraftKey(), JSON.stringify(payload));
    } catch (e) {
        console.warn('Failed to save expense draft', e);
    }
};

window.clearExpenseDraft = () => {
    try {
        localStorage.removeItem(window.getExpenseDraftKey());
    } catch (e) {
        console.warn('Failed to clear expense draft', e);
    }
};

window.restoreExpenseDraft = () => {
    try {
        const raw = localStorage.getItem(window.getExpenseDraftKey());
        if (!raw) return false;
        const draft = JSON.parse(raw);
        if (!draft?.savedAt || Date.now() - draft.savedAt > EXPENSE_DRAFT_TTL_MS) {
            window.clearExpenseDraft();
            return false;
        }

        const title = document.getElementById('report-title');
        const projectCode = document.getElementById('project-code');
        const currency = document.getElementById('currency');
        const preApproved = document.getElementById('pre-approved');
        const proofUrl = document.getElementById('approval-proof-url');
        const proofFinal = document.getElementById('approval-proof-final-url');
        const notes = document.getElementById('expense-notes');
        const claimType = document.getElementById('claim-type');

        if (title && !title.readOnly) title.value = draft.title || '';
        if (currency) currency.value = draft.currency || 'INR';
        if (preApproved) preApproved.checked = !!draft.preApproved;
        if (proofUrl) proofUrl.value = draft.approvalProofUrl || '';
        if (proofFinal) proofFinal.value = draft.approvalProofFinalUrl || '';
        if (notes) notes.value = draft.notes || '';
        if (claimType) claimType.value = draft.claimType || 'EXPENSE';

        if (preApproved) {
            const proofBox = document.getElementById('pre-approved-proof-container');
            if (proofBox) {
                if (preApproved.checked) proofBox.classList.remove('hidden');
                else proofBox.classList.add('hidden');
            }
        }

        const container = document.getElementById('line-items-container');
        if (container && Array.isArray(draft.lineItems) && draft.lineItems.length) {
            container.innerHTML = '';
            draft.lineItems.forEach((item) => {
                window.addLineItem();
                const row = container.lastElementChild;
                if (!row) return;
                const c = row.querySelector('.item-category');
                const a = row.querySelector('.item-amount');
                const d = row.querySelector('.item-desc');
                const r = row.querySelector('.item-img-url');
                const dt = row.querySelector('.item-date');
                if (c) c.value = item.category || 'Other';
                if (a) a.value = item.amount || '';
                if (d) d.value = item.description || '';
                if (r) r.value = item.receiptUrl || '';
                if (dt) dt.value = item.date || '';
            });
            window.calculateTotal();
        }

        if (projectCode) {
            const applyProject = () => {
                if (draft.projectCode) projectCode.value = draft.projectCode;
            };
            setTimeout(applyProject, 120);
            setTimeout(applyProject, 500);
        }

        return true;
    } catch (e) {
        console.warn('Failed to restore expense draft', e);
        return false;
    }
};

window.fetchExpenses = () => {
    if (!window.currentUser || !window.userData) return;

    if (window.expensesUnsub) {
        window.expensesUnsub();
        window.expensesUnsub = null;
    }

    const list = document.getElementById('expenses-list');
    if (list) list.innerHTML = '<div class="text-center text-slate-400 mt-4"><i class="fa-solid fa-circle-notch fa-spin"></i> Syncing...</div>';

    const db = window.db;
    const q = query(
        collection(db, "expenses"),
        where("userId", "==", window.userData.docId)
    );

    window.expensesUnsub = onSnapshot(q, (snapshot) => {
        let pendingTotal = 0;
        let paidTotal = 0;
        window.expensesData = [];

        if (snapshot.empty) {
            window.renderExpensesList([]);
            window.updateStats(0, 0);
            return;
        }

        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            const amt = parseFloat(data.totalAmount) || 0;

            if (data.status === 'PAID') paidTotal += amt;
            else if (!['REJECTED', 'DRAFT'].includes(data.status)) pendingTotal += amt;

            window.expensesData.push({ id: docSnap.id, ...data });
        });

        window.expensesData.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA;
        });

        window.updateStats(pendingTotal, paidTotal);
        const searchTerm = document.getElementById('emp-search') ? document.getElementById('emp-search').value : '';
        window.filterExpenses(searchTerm);

        if (window.aiAssistant) {
            window.aiAssistant.updateContext({ dashboardData: { expenses: window.expensesData.slice(0, 20), summary: { pending: pendingTotal, paid: paidTotal } } });
        }
    }, (error) => {
        console.error("Sync Error:", error);
        if (list) {
            list.innerHTML = `<div class="text-center text-red-500 mt-4 p-4 border border-red-200 bg-red-50 rounded-lg">
                <p class="font-bold">Sync Error</p>
                <p class="text-xs">Failed to sync expenses. Please refresh or contact admin. (${error.code})</p>
            </div>`;
        }
    });
};

window.getStatusColor = (status) => {
    if (!status) return 'bg-slate-100 text-slate-600';
    if (status.includes('PENDING')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status.includes('APPROVED')) return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'PAID') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'AUDITED') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (status === 'REJECTED') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'PAYMENT_ISSUE' || status === 'PAYMENT_DISPUTED') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-slate-100 text-slate-600';
};

window.getSymbol = (curr) => {
    const sym = { 'INR': '₹', 'USD': '$', 'EUR': '€', 'GBP': '£' };
    return sym[curr] || '₹';
};

window.updateStats = async (pending, paid) => {
    const pEl = document.getElementById('stat-pending');
    const paEl = document.getElementById('stat-paid');
    
    // Convert to base currency
    const pendingConverted = await window.convertCurrency(pending, 'INR', window.baseCurrency);
    const paidConverted = await window.convertCurrency(paid, 'INR', window.baseCurrency);

    if (pEl) pEl.textContent = window.formatCurrency(pendingConverted, window.baseCurrency);
    if (paEl) paEl.textContent = window.formatCurrency(paidConverted, window.baseCurrency);
};

window.renderExpensesList = async (expenses) => {
    const list = document.getElementById('expenses-list');
    if (!list) return;
    list.innerHTML = '';

    if (expenses.length === 0) {
        list.innerHTML = `<div class="text-center py-12"><p class="text-slate-500">No expenses found</p></div>`;
        return;
    }

    for (const data of expenses) {
        const dateStr = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Now';
        const amt = parseFloat(data.totalAmount) || 0;
        const convertedAmt = await window.convertCurrency(amt, data.currency || 'INR', window.baseCurrency);
        const canEdit = !['PAID', 'AUDITED', 'PAYMENT_ISSUE', 'PAYMENT_DISPUTED'].includes(data.status);

        const div = document.createElement('div');
        div.className = `card p-4 rounded-lg flex justify-between items-center cursor-pointer hover:border-emerald-300 transition group animate-[slideUp_0.1s]`;
        div.onclick = (e) => {
            if (!e.target.closest('button')) window.viewReportHistory(data);
        };

        div.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="flex flex-col items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <span class="text-[10px] font-bold uppercase">${dateStr.split(' ')[1] || ''}</span>
                    <span class="text-lg font-bold text-slate-700 dark:text-slate-200">${dateStr.split(' ')[0] || ''}</span>
                </div>
                <div>
                    <p class="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-green-600 transition truncate max-w-[150px] sm:max-w-xs">${data.title}</p>
                    <div class="flex gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap">
                        <span class="bg-slate-100 dark:bg-slate-700 px-1.5 rounded font-medium">${window.formatCurrency(convertedAmt, window.baseCurrency)}</span>
                        <span class="bg-slate-100 dark:bg-slate-700 px-1.5 rounded">${data.status.replace(/_/g, ' ')}</span>
                    </div>
                </div>
            </div>
            ${canEdit ? `
            <div class="flex gap-2">
                <button onclick="window.editExpense('${data.id}')" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-green-100 hover:text-green-600 transition flex items-center justify-center"><i class="fa-solid fa-pen text-xs"></i></button>
                <button onclick="window.deleteExpense('${data.id}')" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-100 hover:text-red-600 transition flex items-center justify-center"><i class="fa-solid fa-trash text-xs"></i></button>
            </div>
            ` : ''}
        `;
        list.appendChild(div);
    }
};

window.filterExpenses = (term) => {
    if (window.currentMode === 'personal') {
        const filtered = (window.personalData || []).filter(i => (i.expenseName || '').toLowerCase().includes(term.toLowerCase()));
        if (window.renderPersonalList) window.renderPersonalList(filtered);
    } else {
        const filtered = (window.expensesData || []).filter(e => (e.title || '').toLowerCase().includes(term.toLowerCase()));
        window.renderExpensesList(filtered);
    }
};

window.getInitialStageStatus = async (role) => {
    let config = window.workflowConfigCache;
    if (!config) {
        try {
            const snap = await getDoc(doc(window.db, "settings", "workflow_config"));
            if (snap.exists()) {
                config = snap.data();
                window.workflowConfigCache = config;
            }
        } catch (e) {
            console.error("Config fetch error", e);
        }
    }

    if (!config) return 'PENDING_MANAGER';

    let chain = config.defaultFlow;
    if (config.roleOverrides && config.roleOverrides[role] && config.roleOverrides[role].flow) {
        chain = config.roleOverrides[role].flow;
    }
    return (chain && chain.length > 0) ? chain[0].stage : 'PENDING_MANAGER';
};

window.submitExpense = async () => {
    if (window.currentMode === 'personal') {
        if (window.submitPersonalExpense) return window.submitPersonalExpense();
        else return window.showToast("Personal vault logic not loaded.", "error");
    }

    const docId = document.getElementById('expense-id').value;
    const title = document.getElementById('report-title').value.trim();
    const projectCode = document.getElementById('project-code').value.trim();
    const currency = document.getElementById('currency').value;
    const preApproved = document.getElementById('pre-approved')?.checked || false;
    const proofUrlFile = document.getElementById('approval-proof-final-url')?.value.trim() || '';
    const proofUrlText = document.getElementById('approval-proof-url')?.value.trim() || '';
    const proofUrl = proofUrlFile || proofUrlText;
    const notes = document.getElementById('expense-notes')?.value.trim() || '';
    const claimType = document.getElementById('claim-type')?.value || 'EXPENSE';

    if (!window.validateExpenseClaimForm()) {
        return window.showToast("Please fix highlighted fields.", "error");
    }

    if (!title) return window.showToast("Enter title.", "error");

    if (preApproved && !proofUrl) {
        window.showToast("Please provide approval proof (upload or link) for pre-approved activity.", "warning");
        document.getElementById('approval-proof-url')?.focus();
        return;
    }

    const items = [];
    let total = 0;
    let isValid = true;
    document.querySelectorAll('.line-item').forEach(el => {
        const category = el.querySelector('.item-category').value;
        const amount = el.querySelector('.item-amount').value;
        const desc = el.querySelector('.item-desc').value;
        const imgUrl = el.querySelector('.item-img-url').value;
        const date = el.querySelector('.item-date').value;
        if (!amount || parseFloat(amount) <= 0 || !desc || !date) isValid = false;
        items.push({ category, amount: parseFloat(amount) || 0, description: desc, receiptUrl: imgUrl, date });
        total += parseFloat(amount) || 0;
    });

    if (!isValid || total <= 0) return window.showToast("Check all fields.", "error");

    const btn = document.getElementById('btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
        const initialStatus = await window.getInitialStageStatus(window.userData.role);
        const isSpam = checkSpam(title + ' ' + notes);
        const expenseData = {
            companyId: window.companyId || 'UNKNOWN_COMPANY',
            userId: window.userData.docId,
            userName: window.userData.name,
            userEmail: window.userData.email,
            userPhone: window.userData.phone || null,
            userRole: window.userData.role || 'EMPLOYEE',
            title, isSpam, projectCode, type: claimType, currency, preApproved,
            approvalProof: preApproved ? proofUrl : null,
            notes, status: initialStatus, totalAmount: total.toString(), lineItems: items,
            updatedAt: serverTimestamp()
        };

        const db = window.db;
        if (docId) {
            await updateDoc(doc(db, "expenses", docId), {
                ...expenseData,
                reviewRequested: true,
                history: [...(window.expensesData.find(e => e.id === docId)?.history || []), {
                    action: 'UPDATED', by: window.userData.name, date: new Date()
                }]
            });
            window.showToast("Claim Updated!", "success");
        } else {
            await addDoc(collection(db, "expenses"), {
                ...expenseData, createdAt: serverTimestamp(),
                history: [{ action: 'SUBMITTED', by: window.userData.name, date: new Date() }]
            });
            window.showToast("Claim Submitted!", "success");
            window.clearExpenseDraft();
        }
        window.closeModal('modal-create');
    } catch (e) {
        window.showToast(e.message, "error");
    } finally {
        btn.innerHTML = orig; btn.disabled = false;
    }
};

window.openModeSelector = () => {
    const viewDashboard = document.getElementById('main-view-dashboard');
    if (viewDashboard && viewDashboard.classList.contains('hidden')) {
        window.toggleMainView('dashboard');
    }
    window.toggleMode('personal');
};

window.toggleMode = (mode, options = {}) => {
    window.currentMode = mode;

    // UI Elements
    const statsContainer = document.getElementById('stats-container');
    const personalStatsContainer = document.getElementById('personal-stats-container');
    const tabsContainer = document.getElementById('tabs-container');
    const vaultHeader = document.getElementById('personal-vault-header');
    const personalAnalysis = document.getElementById('personal-analysis');

    const btnNew = document.getElementById('btn-new-expense');
    const btnReq = document.getElementById('btn-request-item');
    const iconNew = btnNew ? btnNew.querySelector('i') : null;
    const textNew = btnNew ? btnNew.querySelector('span') : null;

    const secClaims = document.getElementById('section-claims');
    const secTasks = document.getElementById('section-tasks');

    // Clear list immediately to prevent showing old data
    const list = document.getElementById('expenses-list');
    if (list) list.innerHTML = '';

    if (mode === 'personal') {
        // Show personal UI
        if (statsContainer) statsContainer.classList.add('hidden');
        if (personalStatsContainer) personalStatsContainer.classList.remove('hidden');
        if (tabsContainer) tabsContainer.classList.remove('hidden');
        if (vaultHeader) vaultHeader.classList.remove('hidden');
        if (personalAnalysis) personalAnalysis.classList.remove('hidden');

        // Show Accounts tab only in personal
        const btnF = document.getElementById('btn-view-financials');
        if (btnF) btnF.classList.remove('hidden');

        // Force Claims view
        if (secClaims) secClaims.classList.remove('hidden');
        if (secTasks) secTasks.classList.add('hidden');

        // Hide company-specific action buttons (using new personal stats buttons instead)
        if (btnNew) btnNew.parentElement.classList.add('hidden');

        if (window.fetchPersonalVault) window.fetchPersonalVault();
        if (window.fetchFinancialAccounts) window.fetchFinancialAccounts();
        if (window.filterEmpTasks) window.filterEmpTasks();
        
        // Update top-right mode selector
        const modeSel = document.getElementById('mode-selector');
        if (modeSel) modeSel.value = 'personal';
    } else {
        // Show company UI
        if (statsContainer) statsContainer.classList.remove('hidden');
        if (personalStatsContainer) personalStatsContainer.classList.add('hidden');
        if (tabsContainer) tabsContainer.classList.remove('hidden');
        if (vaultHeader) vaultHeader.classList.add('hidden');
        if (personalAnalysis) personalAnalysis.classList.add('hidden');

        // Hide Accounts tab
        const btnF = document.getElementById('btn-view-financials');
        if (btnF) btnF.classList.add('hidden');

        // Restore default views
        if (secClaims) secClaims.classList.remove('hidden');
        if (secTasks) secTasks.classList.add('hidden');

        // Show company action buttons
        if (btnNew) btnNew.parentElement.classList.remove('hidden');
        if (btnNew && btnReq) {
            btnNew.parentElement.classList.remove('grid-cols-1');
            btnNew.parentElement.classList.add('grid-cols-2');
            btnReq.classList.remove('hidden');
        }

        // Reset sidebar mode selector if it exists
        const modeSel = document.getElementById('mode-selector');
        if (modeSel) modeSel.value = 'company';

        window.fetchExpenses();
        if (window.filterEmpTasks) window.filterEmpTasks();
    }

    if (!options.skipHistory && typeof window.pushEmpNavState === 'function') {
        window.pushEmpNavState();
    }
};

window.openCreateModal = (type = 'EXPENSE') => {
    const modal = document.getElementById('modal-create');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.getElementById('line-items-container').innerHTML = '';
    document.getElementById('expense-id').value = '';
    document.getElementById('claim-type').value = type;

    // Generate Report ID
    const prefix = window.userData.name ? window.userData.name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '') : 'EMP';
    const count = (window.expensesData || []).length + 1;
    const reportId = `${prefix}-${String(count).padStart(3, '0')}`;

    // Reset fields
    const titleInput = document.getElementById('report-title');
    const titleLabel = document.getElementById('label-report-id');
    const projectCode = document.getElementById('project-code');
    const currency = document.getElementById('currency');
    const preApproved = document.getElementById('pre-approved');
    const proofContainer = document.getElementById('pre-approved-proof-container');
    const notes = document.getElementById('expense-notes');
    const runningTotal = document.getElementById('running-total');
    const modalTitle = modal.querySelector('h3');
    const submitBtn = document.getElementById('btn-submit');

    if (projectCode) projectCode.value = '';
    if (currency) currency.value = 'INR';
    if (preApproved) preApproved.checked = false;
    if (proofContainer) proofContainer.classList.add('hidden');
    if (notes) notes.value = '';
    if (runningTotal) runningTotal.textContent = '0.00';

    const projectDiv = projectCode?.closest('div');
    const preAppDiv = preApproved?.closest('div');

    if (window.currentMode === 'personal') {
        if (modalTitle) modalTitle.textContent = 'Save Personal Expense';
        if (submitBtn) submitBtn.innerHTML = '<span>Save to Vault</span> <i class="fa-solid fa-vault"></i>';
        if (projectDiv) projectDiv.classList.add('hidden');
        if (preAppDiv) preAppDiv.classList.add('hidden');
        if (titleLabel) titleLabel.innerHTML = 'Expense Name <span class="text-red-500">*</span>';
        if (titleInput) {
            titleInput.placeholder = "e.g., Coffee, Netflix, etc.";
            titleInput.value = "";
            titleInput.readOnly = false;
            titleInput.classList.remove('bg-slate-100', 'cursor-not-allowed');
        }
    } else if (type === 'REQUEST') {
        if (modalTitle) modalTitle.textContent = 'Request New Item / Subscription';
        if (submitBtn) submitBtn.innerHTML = '<span>Submit Request</span> <i class="fa-solid fa-paper-plane"></i>';
        if (projectDiv) projectDiv.classList.add('hidden');
        if (preAppDiv) preAppDiv.classList.add('hidden');
        if (titleLabel) titleLabel.innerHTML = 'Product / Item Name <span class="text-red-500">*</span>';
        if (titleInput) {
            titleInput.placeholder = "e.g., Adobe License";
            titleInput.value = "";
            titleInput.readOnly = false;
            titleInput.classList.remove('bg-slate-100', 'cursor-not-allowed');
        }
    } else {
        if (modalTitle) modalTitle.textContent = 'New Expense Claim';
        if (submitBtn) submitBtn.innerHTML = '<span>Submit Claim</span> <i class="fa-solid fa-paper-plane"></i>';
        if (projectDiv) projectDiv.classList.remove('hidden');
        if (preAppDiv) preAppDiv.classList.remove('hidden');
        if (titleLabel) titleLabel.innerHTML = 'Report ID <span class="text-green-500 text-[10px] font-normal">(Auto)</span>';
        if (titleInput) {
            titleInput.value = reportId;
            titleInput.readOnly = true;
            titleInput.classList.add('bg-slate-100', 'cursor-not-allowed');
        }
    }

    if (window.loadProjects) window.loadProjects();
    window.addLineItem();

    const isNewClaim = !document.getElementById('expense-id')?.value;
    if (window.currentMode !== 'personal' && isNewClaim) {
        const restored = window.restoreExpenseDraft();
        if (restored) {
            window.showToast('Restored your unsent draft.', 'info');
        }
    }
};

window.addLineItem = () => {
    const container = document.getElementById('line-items-container');
    const tpl = document.getElementById('tpl-line-item');
    if (!container || !tpl) return;

    const clone = tpl.content.cloneNode(true);
    const dateInput = clone.querySelector('.item-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    container.appendChild(clone);
};

window.calculateTotal = () => {
    let total = 0;
    document.querySelectorAll('.item-amount').forEach(inp => total += parseFloat(inp.value) || 0);
    const totalEl = document.getElementById('running-total');
    if (totalEl) totalEl.textContent = total.toFixed(2);
};

window.handleFileSelect = async (input) => {
    const file = input.files[0];
    if (!file) return;
    const el = input.closest('.line-item');
    const hidden = el.querySelector('.item-img-url');
    const label = el.querySelector('.receipt-label');
    const status = el.querySelector('.file-status');
    const removeBtn = el.querySelector('.btn-remove-img');
    const orig = label.innerHTML;

    label.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
        const fd = new FormData();
        fd.append('key', IMGBB_KEY);
        fd.append('image', file);
        const res = await fetch(IMGBB_URL, { method: 'POST', body: fd });
        const data = await res.json();

        if (data && data.data && data.data.url) {
            hidden.value = data.data.url;
            label.innerHTML = '<i class="fa-solid fa-check text-green-500"></i> Done';
            if (status) status.classList.remove('hidden');
            if (removeBtn) removeBtn.classList.remove('hidden');
        } else {
            throw new Error("Upload failed");
        }
    } catch (e) {
        label.innerHTML = orig;
        window.showToast("Upload failed", "error");
    }
};

window.removeImage = (btn) => {
    const el = btn.closest('.line-item');
    if (!el) return;
    const hidden = el.querySelector('.item-img-url');
    const label = el.querySelector('.receipt-label');
    const status = el.querySelector('.file-status');
    const removeBtn = el.querySelector('.btn-remove-img');
    const urlInput = el.querySelector('.item-url-input');

    if (hidden) hidden.value = '';
    if (urlInput) urlInput.value = '';
    if (label) label.innerHTML = `<div class="w-6 h-6 bg-slate-200 rounded flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0"><i class="fa-solid fa-camera text-xs"></i></div><span class="text-xs text-slate-500 dark:text-slate-400 truncate">Upload / Snap (Optional)</span>`;
    if (status) status.classList.add('hidden');
    if (removeBtn) removeBtn.classList.add('hidden');
};

window.handleUrlInput = (input) => {
    const el = input.closest('.line-item');
    if (!el) return;
    const hidden = el.querySelector('.item-img-url');
    const status = el.querySelector('.file-status');
    const removeBtn = el.querySelector('.btn-remove-img');

    if (input.value.trim()) {
        hidden.value = input.value.trim();
        if (status) status.classList.remove('hidden');
        if (removeBtn) removeBtn.classList.remove('hidden');
    } else {
        hidden.value = '';
        if (status) status.classList.add('hidden');
        if (removeBtn) removeBtn.classList.add('hidden');
    }
};

window.handleProofUpload = async (input) => {
    const file = input.files[0];
    if (!file) return;
    const hidden = document.getElementById('approval-proof-final-url');
    const urlInput = document.getElementById('approval-proof-url');
    const label = document.getElementById('proof-upload-label');
    const removeBtn = document.getElementById('btn-remove-proof');
    const orig = label.innerHTML;
    label.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';
    try {
        const fd = new FormData();
        fd.append('key', IMGBB_KEY);
        fd.append('image', file);
        const res = await fetch(IMGBB_URL, { method: 'POST', body: fd });
        const data = await res.json();
        if (data && data.data && data.data.url) {
            hidden.value = data.data.url;
            if (urlInput) urlInput.value = ''; // Clear manual link if file is uploaded
            label.innerHTML = '<i class="fa-solid fa-check text-green-500"></i> Attached';
            if (removeBtn) removeBtn.classList.remove('hidden');
        } else { throw new Error("Upload failed"); }
    } catch (e) {
        label.innerHTML = orig;
        window.showToast("Upload failed", "error");
    }
};

window.removeProof = () => {
    const hidden = document.getElementById('approval-proof-final-url');
    const urlInput = document.getElementById('approval-proof-url');
    const label = document.getElementById('proof-upload-label');
    const removeBtn = document.getElementById('btn-remove-proof');
    if (hidden) hidden.value = '';
    if (urlInput) urlInput.value = '';
    if (label) label.innerHTML = '<i class="fa-solid fa-arrow-up-from-bracket text-gray-400"></i><div class="flex-1"><span class="block text-[10px] font-bold text-black dark:text-white uppercase">Upload Proof</span><span class="block text-[9px] text-gray-500">PDF, JPG or PNG (Max 5MB)</span></div>';
    if (removeBtn) removeBtn.classList.add('hidden');
};

window.loadProjects = async () => {
    const select = document.getElementById('project-code');
    if (!select || !window.companyId) return;
    try {
        const q = query(collection(window.db, "projects"), where("companyId", "==", window.companyId), where("active", "==", true));
        const snap = await getDocs(q);
        let h = '<option value="">Select Project...</option>';
        snap.forEach(d => h += `<option value="${d.data().code}">${d.data().code}</option>`);
        select.innerHTML = h;
    } catch (e) { console.error(e); }
};

window.removeLineItem = (btn) => {
    if (document.querySelectorAll('.line-item').length > 1) {
        btn.closest('.line-item').remove();
        window.calculateTotal();
    } else {
        window.showToast("At least one expense item is required.", "warning");
    }
};

window.editExpense = (id) => {
    const e = window.expensesData.find(ex => ex.id === id);
    if (!e) return;

    window.openCreateModal(e.type);
    document.getElementById('expense-id').value = id;
    document.getElementById('report-title').value = e.title;
    if (e.projectCode) document.getElementById('project-code').value = e.projectCode;
    if (e.notes) document.getElementById('expense-notes').value = e.notes;

    const container = document.getElementById('line-items-container');
    container.innerHTML = '';
    e.lineItems.forEach(li => {
        window.addLineItem();
        const last = container.lastElementChild;
        if (last) {
            last.querySelector('.item-category').value = li.category;
            last.querySelector('.item-amount').value = li.amount;
            last.querySelector('.item-desc').value = li.description;
            last.querySelector('.item-img-url').value = li.receiptUrl || '';
            last.querySelector('.item-date').value = li.date;
        }
    });
    window.calculateTotal();
};

window.deleteExpense = async (id) => {
    if (await window.showInputPromise("Delete", "Are you sure you want to delete this claim?", "", "none")) {
        try {
            await deleteDoc(doc(window.db, "expenses", id));
            window.showToast("Claim deleted successfully", "success");
        } catch (e) {
            window.showToast("Failed to delete: " + e.message, "error");
        }
    }
};

const escapeEmpPdfText = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getEmpPdfDate = (value) => {
    const date = value?.toDate ? value.toDate() : (value ? new Date(value) : null);
    return date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'N/A';
};

const buildEmployeeExpensePdfHtml = (data, downloadedBy) => {
    const lineItems = Array.isArray(data.lineItems) ? data.lineItems : [];
    const history = Array.isArray(data.history) ? data.history : [];
    const currencySymbol = window.getSymbol ? window.getSymbol(data.currency || 'INR') : '₹';
    const generatedAt = new Date();

    const auditFields = [
        { label: 'Submitted By Email', value: escapeEmpPdfText(data.userEmail || 'N/A') },
        { label: 'Downloaded By', value: escapeEmpPdfText(downloadedBy || 'N/A') },
        { label: 'Downloaded At', value: escapeEmpPdfText(generatedAt.toLocaleString()) },
        { label: 'Created At', value: escapeEmpPdfText(getEmpPdfDate(data.createdAt)) },
        { label: 'Updated At', value: escapeEmpPdfText(getEmpPdfDate(data.updatedAt)) },
        { label: 'Last Status At', value: escapeEmpPdfText(getEmpPdfDate(data.statusUpdatedAt || data.lastUpdatedAt || data.approvedAt || data.rejectedAt)) }
    ];

    const auditRows = auditFields.map((field) => `
        <div style="padding:4px;border:1px solid #e2e8f0;border-radius:4px;background:#f8fafc;">
            <p style="margin:0 0 2px 0;font-size:7px;color:#64748b;text-transform:uppercase;font-weight:700;">${escapeEmpPdfText(field.label)}</p>
            <p style="margin:0;font-size:9px;font-weight:600;line-height:1.25;overflow-wrap:anywhere;">${field.value}</p>
        </div>
    `).join('');

    const lineItemRows = lineItems.length ? lineItems.map((item, idx) => `
        <tr>
            <td style="padding:4px;border:1px solid #e5e7eb;">${idx + 1}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;">${escapeEmpPdfText(item?.category || 'N/A')}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;overflow-wrap:anywhere;word-break:break-word;">${escapeEmpPdfText(item?.description || item?.desc || 'No description')}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;">${escapeEmpPdfText(item?.date || 'N/A')}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;">${currencySymbol}${Number(item?.amount || 0).toLocaleString()}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;overflow-wrap:anywhere;word-break:break-word;font-size:7px;">${escapeEmpPdfText(item?.receiptUrl || 'N/A')}</td>
        </tr>
    `).join('') : '<tr><td colspan="6" style="padding:12px;border:1px solid #e5e7eb;text-align:center;color:#64748b;">No line items added</td></tr>';

    const historyRows = history.length ? history.map((h, idx) => `
        <tr>
            <td style="padding:4px;border:1px solid #e5e7eb;">${idx + 1}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;">${escapeEmpPdfText((h?.action || 'UPDATED').replace(/_/g, ' '))}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;">${escapeEmpPdfText(h?.by || 'System')}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;font-size:7px;">${getEmpPdfDate(h?.date)}</td>
            <td style="padding:4px;border:1px solid #e5e7eb;overflow-wrap:anywhere;word-break:break-word;">${escapeEmpPdfText(h?.comment || h?.remarks || '-')}</td>
        </tr>
    `).join('') : '<tr><td colspan="5" style="padding:12px;border:1px solid #e5e7eb;text-align:center;color:#64748b;">No history available</td></tr>';

    return `
        <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;padding:6px 5px;margin:0;box-sizing:border-box;overflow:visible;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px;">
                <div style="flex:1;">
                    <h2 style="margin:0 0 1px 0;font-size:14px;font-weight:800;line-height:1.2;">Expense Detail Report</h2>
                    <p style="margin:2px 0 0 0;font-size:9px;color:#475569;">Employee Portal • Generated on ${generatedAt.toLocaleString()}</p>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                    <p style="margin:0;font-size:8px;color:#64748b;font-weight:700;">Report ID</p>
                    <p style="margin:1px 0 0 0;font-size:10px;font-weight:700;word-break:break-all;">${escapeEmpPdfText(data.id || 'N/A')}</p>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
                <div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px;">
                    <p style="margin:0 0 2px 0;font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;">Title</p>
                    <p style="margin:0;font-size:11px;font-weight:700;">${escapeEmpPdfText(data.title || 'N/A')}</p>
                </div>
                <div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px;">
                    <p style="margin:0 0 2px 0;font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;">Status</p>
                    <p style="margin:0;font-size:11px;font-weight:700;">${escapeEmpPdfText((data.status || 'N/A').replace(/_/g, ' '))}</p>
                </div>
                <div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px;">
                    <p style="margin:0 0 2px 0;font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;">Project</p>
                    <p style="margin:0;font-size:11px;font-weight:700;">${escapeEmpPdfText(data.projectCode || 'No Project')}</p>
                </div>
                <div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px;">
                    <p style="margin:0 0 2px 0;font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;">Total Amount</p>
                    <p style="margin:0;font-size:11px;font-weight:700;">${currencySymbol}${Number(data.totalAmount || 0).toLocaleString()}</p>
                </div>
            </div>

            <div style="border:1px solid #e2e8f0;border-radius:6px;padding:6px;margin-bottom:8px;">
                <p style="margin:0 0 3px 0;font-size:8px;color:#64748b;text-transform:uppercase;font-weight:700;">Notes / Description</p>
                <p style="margin:0;font-size:10px;line-height:1.4;white-space:pre-wrap;">${escapeEmpPdfText((data.notes || '').trim() || 'No notes provided.')}</p>
            </div>

            <h3 style="font-size:9px;text-transform:uppercase;letter-spacing:0.03em;color:#475569;margin:8px 0 4px;">Audit Metadata</h3>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;margin-bottom:8px;">
                ${auditRows}
            </div>

            <h3 style="font-size:9px;text-transform:uppercase;letter-spacing:0.03em;color:#475569;margin:8px 0 4px;">Line Items</h3>
            <table style="width:100%;border-collapse:collapse;font-size:8px;table-layout:fixed;">
                <thead>
                    <tr style="background:#f8fafc;">
                        <th style="padding:4px;border:1px solid #e5e7eb;width:5%;">#</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:14%;">Category</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:30%;">Description</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:12%;">Date</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:11%;">Amount</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:28%;">Receipt / Proof</th>
                    </tr>
                </thead>
                <tbody>${lineItemRows}</tbody>
            </table>

            <h3 style="font-size:9px;text-transform:uppercase;letter-spacing:0.03em;color:#475569;margin:8px 0 4px;">Status History</h3>
            <table style="width:100%;border-collapse:collapse;font-size:8px;table-layout:fixed;">
                <thead>
                    <tr style="background:#f8fafc;">
                        <th style="padding:4px;border:1px solid #e5e7eb;width:5%;">#</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:15%;">Action</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:18%;">By</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:18%;">Date</th>
                        <th style="padding:4px;border:1px solid #e5e7eb;width:44%;">Comments</th>
                    </tr>
                </thead>
                <tbody>${historyRows}</tbody>
            </table>
        </div>
    `;
};

window.downloadEmployeeExpensePdf = async () => {
    const data = window.currentViewedExpenseData;
    if (!data) {
        window.showToast('Open an expense first to download detailed PDF.', 'warning');
        return;
    }
    if (typeof html2pdf === 'undefined') {
        window.showToast('PDF engine not loaded. Please refresh and retry.', 'error');
        return;
    }

    const container = document.createElement('div');
    const downloaderIdentity = window.userData?.email || window.currentUser?.email || 'Employee User';
    container.innerHTML = buildEmployeeExpensePdfHtml(data, downloaderIdentity);
    container.style.background = '#ffffff';
    container.style.width = '730px';
    container.style.margin = '0';
    container.style.padding = '0';
    container.style.boxSizing = 'border-box';
    container.style.overflow = 'visible';

    try {
        window.showToast('Preparing detailed PDF...', 'info');
        await html2pdf().set({
            margin: [15, 12, 15, 12],
            filename: `expense_detail_${data.id || 'expense'}_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1.2, useCORS: true, windowWidth: 730, allowTaint: true, logging: false, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
        }).from(container).save();
        window.showToast('Detailed expense PDF downloaded.', 'success');
    } catch (e) {
        console.error(e);
        window.showToast('PDF export failed: ' + e.message, 'error');
    }
};

window.downloadEmployeeExpenseDocx = async () => {
    const data = window.currentViewedExpenseData;
    if (!data) {
        window.showToast('Open an expense first to download detailed DOCX.', 'warning');
        return;
    }
    const downloaderIdentity = window.userData?.email || window.currentUser?.email || 'Employee User';
    await window.downloadExpenseAsDocx(data, data.id, 'Employee Portal', downloaderIdentity);
};

window.viewReportHistory = (input) => {
    const data = (typeof input === 'string') ? window.expensesData.find(e => e.id === input) : input;
    if (!data) return;
    window.currentViewedExpenseData = data;

    const modal = document.getElementById('modal-view');
    if (!modal) return;

    if (typeof window.openModalWithHistory === 'function') {
        window.openModalWithHistory('modal-view');
    } else {
        modal.classList.remove('hidden');
    }
    document.getElementById('view-title').textContent = data.title;

    const statusEl = document.getElementById('view-status');
    if (statusEl) {
        statusEl.textContent = data.status.replace(/_/g, ' ');
        statusEl.className = 'badge ' + (window.getStatusColor(data.status));
    }

    const amountEl = document.getElementById('view-amount');
    if (amountEl) {
        amountEl.textContent = `${window.getSymbol(data.currency)} ${parseFloat(data.totalAmount).toLocaleString()}`;
    }

    const projectEl = document.getElementById('view-project');
    if (projectEl) projectEl.textContent = data.projectCode || 'No Project';

    const currEl = document.getElementById('view-currency');
    if (currEl) currEl.textContent = data.currency;

    const preApp = document.getElementById('view-pre-approved');
    if (preApp) {
        if (data.preApproved) {
            preApp.classList.remove('hidden');
            const proof = document.getElementById('view-approval-proof');
            const link = document.getElementById('view-approval-link');
            if (data.approvalProof) {
                if (proof) proof.classList.remove('hidden');
                if (link) {
                    link.href = data.approvalProof;
                    link.textContent = data.approvalProof;
                }
            } else {
                if (proof) proof.classList.add('hidden');
            }
        } else {
            preApp.classList.add('hidden');
        }
    }

    const rej = document.getElementById('view-reject-msg');
    if (rej) {
        if (data.status === 'REJECTED' && data.rejectionNote) {
            rej.classList.remove('hidden');
            document.getElementById('reject-reason-text').textContent = data.rejectionNote;
        } else {
            rej.classList.add('hidden');
        }
    }

    const timeline = document.getElementById('view-timeline');
    if (timeline) {
        timeline.innerHTML = (data.history || []).map(h => {
            const date = h.date?.toDate ? h.date.toDate() : new Date(h.date);
            return `
                <div class="flex gap-4 pb-4 border-l-2 border-slate-100 dark:border-slate-700 ml-2 pl-4 relative">
                    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <div class="w-2 h-2 rounded-full bg-slate-400"></div>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-700 dark:text-slate-200">${h.action.replace(/_/g, ' ')}</p>
                        <p class="text-[10px] text-slate-500">${h.by} • ${date.toLocaleString()}</p>
                    </div>
                </div>
             `;
        }).join('');
    }
};

window.createExpenseFromAI = async (data) => {
    console.log('Creating expense from AI:', data);
    window.openCreateModal('EXPENSE');
    await new Promise(r => setTimeout(r, 200));

    const projectSelect = document.getElementById('project-code');
    if (projectSelect && data.projectCode) {
        const options = Array.from(projectSelect.options);
        const match = options.find(o => o.value.toLowerCase() === data.projectCode.toLowerCase() || o.text.toLowerCase().includes(data.projectCode.toLowerCase()));
        if (match) projectSelect.value = match.value;
        else window.showToast('Project Code not found, please select manually.', 'warning');
    }

    const firstItem = document.querySelector('.line-item');
    if (firstItem) {
        if (firstItem.querySelector('.item-category')) firstItem.querySelector('.item-category').value = data.category || 'Other';
        if (firstItem.querySelector('.item-amount')) firstItem.querySelector('.item-amount').value = data.amount || 0;
        if (firstItem.querySelector('.item-desc')) firstItem.querySelector('.item-desc').value = data.description || '';
        if (firstItem.querySelector('.item-date')) firstItem.querySelector('.item-date').value = new Date().toISOString().split('T')[0];
    }

    if (window.calculateTotal) window.calculateTotal();
    window.showToast('AI prepared your expense claim.', 'info');
};

// Initialization for Pre-Approved toggle
document.addEventListener('change', (e) => {
    if (e.target.id === 'pre-approved') {
        const container = document.getElementById('pre-approved-proof-container');
        if (container) {
            if (e.target.checked) container.classList.remove('hidden');
            else container.classList.add('hidden');
        }
    }
});

document.addEventListener('input', (e) => {
    const modal = document.getElementById('modal-create');
    if (!modal || modal.classList.contains('hidden')) return;
    if (!e.target.closest('#expense-form')) return;
    if (window.currentMode === 'personal') return;
    if (document.getElementById('expense-id')?.value) return;
    window.saveExpenseDraft();
});

document.addEventListener('change', (e) => {
    const modal = document.getElementById('modal-create');
    if (!modal || modal.classList.contains('hidden')) return;
    if (!e.target.closest('#expense-form')) return;
    if (window.currentMode === 'personal') return;
    if (document.getElementById('expense-id')?.value) return;
    window.saveExpenseDraft();
});
