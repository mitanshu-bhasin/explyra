(() => {
    const PRODUCT_KEY = 'explyra-admin-kg-products-v1';
    const LOG_KEY = 'explyra-admin-ops-log-v1';
    const NOTIF_FILTER_KEY = 'explyra-admin-notif-filter-v1';
    const INITIAL_RENDER_DELAY_MS = 800;
    const allowedPublishRoles = new Set(['ADMIN', 'FINANCE_MANAGER', 'SENIOR_MANAGER']);
    const defaultProducts = [
        { id: 'KGH-001', name: 'Clear Toughened Glass 8mm', category: 'Architectural', stock: 26, threshold: 20, price: 1450 },
        { id: 'KGH-002', name: 'Decorative Mirror Panel', category: 'Retail', stock: 11, threshold: 15, price: 2290 },
        { id: 'KGH-003', name: 'Laminated Safety Glass 10mm', category: 'Commercial', stock: 34, threshold: 18, price: 1920 }
    ];

    const mockUsers = 128;
    const mockMonthlyRevenue = 1834500;
    const mockPendingApprovals = 14;
    const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    const safeJsonParse = (value, fallback) => {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch {
            return fallback;
        }
    };

    const getProducts = () => safeJsonParse(localStorage.getItem(PRODUCT_KEY), defaultProducts);
    const setProducts = (products) => localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
    const getLogs = () => safeJsonParse(localStorage.getItem(LOG_KEY), []).slice(0, 10);
    const setLogs = (logs) => localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(0, 25)));
    const getFilter = () => localStorage.getItem(NOTIF_FILTER_KEY) || 'all';
    const setFilter = (filter) => localStorage.setItem(NOTIF_FILTER_KEY, filter);

    const formatCurrency = (value) => {
        try {
            return inrCurrencyFormatter.format(value);
        } catch {
            return `₹${value}`;
        }
    };

    const getCurrentUserRole = () => (document.getElementById('current-user-role')?.textContent || '').trim().toUpperCase();

    const appendLog = (eventText, severity = 'info') => {
        const logs = getLogs();
        logs.unshift({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            eventText,
            severity,
            createdAt: new Date().toISOString(),
            unread: true
        });
        setLogs(logs);
    };

    const timeAgo = (isoDate) => {
        const seconds = Math.max(1, Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000));
        if (seconds < 60) return `${seconds}s ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    const makeRoot = () => {
        const content = document.getElementById('content-area');
        if (!content) return null;
        let root = document.getElementById('admin-smart-ops-root');
        if (!root) {
            root = document.createElement('section');
            root.id = 'admin-smart-ops-root';
            root.className = 'grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8';
            content.appendChild(root);
        }
        return root;
    };

    const renderProducts = (root, products) => {
        const body = root.querySelector('[data-admin-products]');
        if (!body) return;
        body.innerHTML = products.map((product) => {
            const isLow = product.stock < product.threshold;
            const statusClass = isLow
                ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
                : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
            const statusText = isLow ? 'Low Stock' : 'Healthy';
            return `
                <tr class="border-b border-slate-100 dark:border-slate-800">
                    <td class="py-2 pr-2">
                        <p class="text-xs font-semibold text-slate-800 dark:text-slate-100">${product.name}</p>
                        <p class="text-[10px] text-slate-400">${product.id} • ${product.category}</p>
                    </td>
                    <td class="py-2 px-2 text-xs font-mono text-slate-700 dark:text-slate-200">${product.stock}</td>
                    <td class="py-2 px-2 text-xs font-semibold text-slate-700 dark:text-slate-200">${formatCurrency(product.price)}</td>
                    <td class="py-2 pl-2">
                        <span class="inline-flex px-2 py-1 rounded-full text-[10px] font-bold border ${statusClass}">${statusText}</span>
                    </td>
                    <td class="py-2 pl-2 text-right">
                        <button type="button" data-restock-id="${product.id}" class="px-2 py-1 text-[10px] font-semibold rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                            Restock +5
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    };

    const renderLogs = (root) => {
        const logHost = root.querySelector('[data-admin-log]');
        const notifBadge = root.querySelector('[data-admin-unread-count]');
        const logs = getLogs();
        const filter = getFilter();
        const filteredLogs = filter === 'unread' ? logs.filter((l) => l.unread) : logs;
        const unreadCount = logs.filter((l) => l.unread).length;
        if (notifBadge) notifBadge.textContent = String(unreadCount);

        if (!logHost) return;
        if (!filteredLogs.length) {
            logHost.innerHTML = '<p class="text-xs text-slate-500">No operational events yet.</p>';
            return;
        }

        logHost.innerHTML = filteredLogs.map((log) => {
            const color = log.severity === 'warning'
                ? 'text-amber-600 dark:text-amber-300'
                : log.severity === 'success'
                    ? 'text-green-600 dark:text-green-300'
                    : 'text-blue-600 dark:text-blue-300';
            const unreadMark = log.unread ? '<span class="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block ml-2"></span>' : '';
            return `
                <div class="py-2 border-b border-slate-100 dark:border-slate-800">
                    <p class="text-xs font-medium text-slate-700 dark:text-slate-200">${log.eventText}${unreadMark}</p>
                    <p class="text-[10px] ${color}">${timeAgo(log.createdAt)}</p>
                </div>
            `;
        }).join('');
    };

    const render = () => {
        const overviewActive = document.querySelector('.sidebar-item.active[data-tab="overview"]');
        if (!overviewActive) return;
        const root = makeRoot();
        if (!root) return;

        const products = getProducts();
        const lowStockCount = products.filter((product) => product.stock < product.threshold).length;
        const role = getCurrentUserRole();
        const canPublish = allowedPublishRoles.has(role);
        const filter = getFilter();

        root.innerHTML = `
            <article class="vercel-card xl:col-span-2">
                <div class="flex items-center justify-between gap-3 mb-3">
                    <div>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Krishna Glass House</p>
                        <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100">Shop Operations</h3>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-1 rounded-full text-[10px] font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">${lowStockCount} low stock</span>
                        <button type="button" data-admin-mark-read class="px-2 py-1 text-[10px] rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">Mark alerts read</button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-[10px] uppercase tracking-wider text-slate-400">
                                <th class="py-2 pr-2">Product</th>
                                <th class="py-2 px-2">Stock</th>
                                <th class="py-2 px-2">Unit Price</th>
                                <th class="py-2 pl-2">Status</th>
                                <th class="py-2 pl-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody data-admin-products></tbody>
                    </table>
                </div>
            </article>
            <article class="vercel-card">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SaaS Control Hub</p>
                <h3 class="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 mb-3">Ops + Notifications</h3>
                <div class="space-y-2 text-xs mb-4">
                    <div class="flex justify-between"><span class="text-slate-500">Active users</span><span class="font-semibold">${mockUsers}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">MRR (mock)</span><span class="font-semibold">${formatCurrency(mockMonthlyRevenue)}</span></div>
                    <div class="flex justify-between"><span class="text-slate-500">Pending approvals</span><span class="font-semibold">${mockPendingApprovals}</span></div>
                </div>
                <button type="button" data-admin-publish class="w-full px-3 py-2 rounded-lg text-xs font-semibold transition ${canPublish ? 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90' : 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed'}" ${canPublish ? '' : 'disabled'}>Publish storefront update</button>
                <p class="text-[10px] text-slate-400 mt-2">Role detected: <span class="font-semibold">${role || 'UNKNOWN'}</span></p>
                <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div class="flex items-center justify-between">
                        <h4 class="text-xs font-semibold text-slate-700 dark:text-slate-200">Ops Notifications</h4>
                        <div class="flex items-center gap-2">
                            <button type="button" data-filter="all" class="text-[10px] px-2 py-1 rounded-md border ${filter === 'all' ? 'border-slate-400' : 'border-slate-200 dark:border-slate-700'}">All</button>
                            <button type="button" data-filter="unread" class="text-[10px] px-2 py-1 rounded-md border ${filter === 'unread' ? 'border-slate-400' : 'border-slate-200 dark:border-slate-700'}">Unread</button>
                        </div>
                    </div>
                    <p class="text-[10px] text-slate-500 mt-1">Unread: <span data-admin-unread-count>0</span></p>
                    <div class="mt-2 max-h-52 overflow-y-auto" data-admin-log></div>
                </div>
            </article>
        `;

        renderProducts(root, products);
        renderLogs(root);
    };

    document.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;

        const restockId = target.getAttribute('data-restock-id');
        if (restockId) {
            const products = getProducts().map((product) => (
                product.id === restockId ? { ...product, stock: product.stock + 5 } : product
            ));
            setProducts(products);
            const changedProduct = products.find((product) => product.id === restockId);
            if (changedProduct) {
                appendLog(`Restocked ${changedProduct.name} to ${changedProduct.stock} units`, 'success');
            }
            render();
            return;
        }

        if (target.hasAttribute('data-admin-mark-read')) {
            const logs = getLogs().map((log) => ({ ...log, unread: false }));
            setLogs(logs);
            render();
            return;
        }

        if (target.hasAttribute('data-admin-publish')) {
            appendLog('Storefront update published for Krishna Glass House catalog', 'info');
            if (typeof window.showToast === 'function') {
                window.showToast('Storefront update published', 'success');
            }
            render();
            return;
        }

        const filter = target.getAttribute('data-filter');
        if (filter) {
            setFilter(filter);
            render();
        }
    });

    const contentArea = document.getElementById('content-area');
    if (contentArea) {
        const observer = new MutationObserver(() => {
            window.requestAnimationFrame(render);
        });
        observer.observe(contentArea, { childList: true, subtree: false });
    }

    const originalRefresh = window.refreshNewAdminUI;
    window.refreshNewAdminUI = function refreshEnhancedAdminUI(...args) {
        if (typeof originalRefresh === 'function') {
            originalRefresh.apply(this, args);
        }
        window.requestAnimationFrame(render);
    };

    window.addEventListener('load', () => {
        if (getLogs().length === 0) {
            appendLog('Operations center initialized for Krishna Glass House', 'info');
        }
        setTimeout(render, INITIAL_RENDER_DELAY_MS);
    });
})();
