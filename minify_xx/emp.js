
(function () {
    // ── Helper: Time Ago ──
    function getTimeAgo(date) {
        if (!date) return 'Recently';
        const now = new Date();
        const past = date instanceof Date ? date : (date.toDate ? date.toDate() : new Date(date));
        const diff = Math.floor((now - past) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }

    // ── Greeting Banner ──
    function renderEmpGreeting() {
        const container = document.getElementById('emp-greeting-container');
        if (!container) return;
        const hour = new Date().getHours();
        let greeting = 'Good Evening';
        let icon = 'fa-moon';
        let motivational = 'Wind down and review your day.';
        if (hour < 12) { greeting = 'Good Morning'; icon = 'fa-sun'; motivational = 'Start your day strong with a clear overview.'; }
        else if (hour < 17) { greeting = 'Good Afternoon'; icon = 'fa-cloud-sun'; motivational = 'Stay focused — you're doing great!'; }
        const nameEl = document.getElementById('sidebar-user-name');
        const name = nameEl?.textContent?.trim() || (window.userData ? window.userData.name : 'Employee');
        const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

        // Calculate real stats
        const claims = window.expensesData || [];
        const pendingCount = claims.filter(c => !['PAID', 'REJECTED', 'DRAFT'].includes(c.status)).length;
        const paidCount = claims.filter(c => c.status === 'PAID').length;

        container.innerHTML = `
        <div class="emp-greeting-banner">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px">
                <div style="animation:empSlideUp 0.5s ease forwards">
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
                        <i class="fa-solid ${icon}" style="color:rgba(255,255,255,0.4);font-size:12px"></i>
                        <span style="font-size:10px;color:rgba(255,255,255,0.4);font-weight:600;text-transform:uppercase;letter-spacing:0.12em">${dateStr}</span>
                    </div>
                    <h2 style="color:#fff;font-size:22px;font-weight:800;margin:0;letter-spacing:-0.3px">${greeting}, <span style="background:linear-gradient(to right,#34d399,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${name.split(' ')[0]}</span></h2>
                    <p style="color:rgba(255,255,255,0.35);font-size:12px;margin-top:5px;font-weight:400">${motivational}</p>
                </div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:flex-start">
                    <div class="emp-stat-chip"><i class="fa-solid fa-receipt" style="margin-right:3px"></i> <span id="greet-claims">${claims.length}</span> Claims</div>
                    <div class="emp-stat-chip"><i class="fa-solid fa-hourglass-half" style="margin-right:3px;color:#f59e0b"></i> <span id="greet-pending">${pendingCount}</span> Pending</div>
                    <div class="emp-stat-chip"><i class="fa-solid fa-check" style="margin-right:3px;color:#22c55e"></i> <span id="greet-paid">${paidCount}</span> Paid</div>
                </div>
            </div>
            <div style="margin-top:14px;display:flex;gap:8px;align-items:center">
                <button onclick="openCreateModal && openCreateModal('EXPENSE')" style="display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.25);color:#34d399;cursor:pointer;transition:all 0.2s">
                    <i class="fa-solid fa-plus" style="font-size:9px"></i> Quick Claim
                </button>
                <button onclick="openKbdOverlay()" style="display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);cursor:pointer;transition:all 0.2s">
                    <i class="fa-solid fa-keyboard" style="font-size:9px"></i> Shortcuts
                    <kbd style="padding:1px 5px;border:1px solid rgba(255,255,255,0.1);border-radius:3px;font-size:8px;margin-left:3px;color:rgba(255,255,255,0.3)">?</kbd>
                </button>
            </div>
        </div>
    `;
    }

    // ── Recent Activity Feed ──
    function injectActivityFeed() {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer) return;
        // Ensure container exists
        let feedCard = document.getElementById('emp-activity-feed-card');
        if (!feedCard) {
            feedCard = document.createElement('div');
            feedCard.id = 'emp-activity-feed-card';
            feedCard.className = 'vercel-card mb-8 animate-fade-in';
            feedCard.style.cssText = 'padding:0;overflow:hidden;animation-delay:0.15s';
            feedCard.innerHTML = `
            <div style="padding:12px 18px;border-bottom:1px solid #eaeaea;display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;align-items:center;gap:8px">
                    <div style="width:26px;height:26px;border-radius:6px;background:#f3f4f6;display:flex;align-items:center;justify-content:center">
                        <i class="fa-solid fa-clock-rotate-left" style="font-size:10px;color:#6b7280"></i>
                    </div>
                    <span style="font-size:11px;font-weight:700;color:#111">Recent Activity</span>
                </div>
                <button onclick="this.closest('.vercel-card').querySelector('.feed-body').classList.toggle('hidden')" style="background:none;border:none;color:#9ca3af;cursor:pointer;font-size:11px;font-weight:600"><i class="fa-solid fa-chevron-down"></i></button>
            </div>
            <div class="feed-body" style="padding:10px 18px">
                <div id="emp-activity-list"></div>
            </div>
        `;
            statsContainer.parentNode.insertBefore(feedCard, statsContainer.nextSibling);
        }

        const list = document.getElementById('emp-activity-list');
        if (!list) return;

        // Gather real activities
        const activities = [];

        // 1. Recent Expenses
        (window.expensesData || []).forEach(e => {
            let action = 'submitted';
            let icon = 'fa-receipt';
            let color = '#3b82f6';
            if (e.status === 'PAID') { action = 'paid'; color = '#22c55e'; icon = 'fa-check-circle'; }
            else if (e.status === 'REJECTED') { action = 'rejected'; color = '#ef4444'; icon = 'fa-xmark-circle'; }
            else if (e.status.includes('PENDING')) { action = 'processing'; color = '#f59e0b'; }

            activities.push({
                ts: e.createdAt?.toDate ? e.createdAt.toDate() : new Date(e.createdAt || 0),
                icon, color,
                text: `Claim "${e.title || 'Untitled'}" ${action}`,
                sub: `${window.getSymbol ? window.getSymbol(e.currency) : '₹'}${parseFloat(e.totalAmount || 0).toLocaleString()}`
            });
        });

        // 2. Recent Tasks
        (window.empTasksData || []).forEach(t => {
            let action = 'assigned to you';
            let icon = 'fa-list-check';
            let color = '#8b5cf6';
            if (t.status === 'COMPLETED') { action = 'completed'; color = '#22c55e'; icon = 'fa-check-double'; }

            activities.push({
                ts: t.createdAt?.toDate ? t.createdAt.toDate() : new Date(t.createdAt || 0),
                icon, color,
                text: `Task "${t.title || 'Untitled'}" ${action}`,
                sub: t.assignedBy || 'Manager'
            });
        });

        // Sort by TS desc
        activities.sort((a, b) => b.ts - a.ts);

        // Limit to 4
        const recent = activities.slice(0, 4);

        if (recent.length === 0) {
            list.innerHTML = `<div style="text-align:center;padding:20px;font-size:11px;color:#9ca3af">No recent activity detected.</div>`;
            return;
        }

        list.innerHTML = recent.map((a, i) => `
        <div class="emp-feed-item" style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f3f4f6;animation-delay:${i * 0.06}s">
            <div style="width:28px;height:28px;border-radius:6px;background:${a.color}12;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <i class="fa-solid ${a.icon}" style="font-size:10px;color:${a.color}"></i>
            </div>
            <div style="flex:1">
                <p style="font-size:11px;font-weight:600;color:#111;margin:0">${a.text}</p>
                <p style="font-size:9px;color:#9ca3af;margin:2px 0 0">${a.sub} • ${getTimeAgo(a.ts)}</p>
            </div>
        </div>
    `).join('');
    }

    // ── Sparkline SVGs for stat cards ──
    function addSparklines() {
        const sparkData = {
            'stat-card-paid': [20, 35, 28, 45, 38, 55, 48],
            'stat-card-pending': [10, 15, 8, 22, 18, 12, 20],
        };
        Object.entries(sparkData).forEach(([id, values]) => {
            const card = document.getElementById(id);
            if (!card || card.querySelector('.sparkline-svg')) return;
            const max = Math.max(...values);
            const w = 80, h = 30;
            const points = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * h}`).join(' ');
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            svg.setAttribute('width', w);
            svg.setAttribute('height', h);
            svg.classList.add('sparkline-svg');
            svg.innerHTML = `<polyline fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${points}"/>`;
            card.style.position = 'relative';
            card.appendChild(svg);
        });
    }

    // ── Claim Lifecycle Stepper ──
    window.showClaimStepper = function (currentStep) {
        const container = document.getElementById('emp-claim-stepper-container');
        if (!container) return;
        const steps = [
            { label: 'Submitted', icon: 'fa-paper-plane' },
            { label: 'Manager', icon: 'fa-user-tie' },
            { label: 'Finance', icon: 'fa-building-columns' },
            { label: 'Treasury', icon: 'fa-vault' },
            { label: 'Paid', icon: 'fa-check-double' },
        ];
        container.classList.remove('hidden');
        container.innerHTML = `
        <div class="vercel-card" style="padding:20px">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px">
                <i class="fa-solid fa-route" style="font-size:10px;color:#9ca3af"></i>
                <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af">Claim Progress</span>
            </div>
            <div class="claim-stepper">
                ${steps.map((s, i) => {
            let cls = '';
            if (i < currentStep) cls = 'completed';
            else if (i === currentStep) cls = 'active';
            const line = i < steps.length - 1 ? `<div class="claim-step-line ${i < currentStep ? 'done' : ''}"></div>` : '';
            return `
                        <div class="claim-step ${cls}">
                            <div class="step-dot"><i class="fa-solid ${s.icon}" style="font-size:10px"></i></div>
                            <span class="step-label">${s.label}</span>
                        </div>
                        ${line}
                    `;
        }).join('')}
            </div>
        </div>
    `;
    };
    window.hideClaimStepper = function () {
        const c = document.getElementById('emp-claim-stepper-container');
        if (c) c.classList.add('hidden');
    };

    // ── Empty State Helper ──
    window.renderEmpEmptyState = function (targetId, opts) {
        const el = document.getElementById(targetId);
        if (!el) return;
        const color = opts.color || '#22c55e';
        el.innerHTML = `
        <div class="emp-empty-state">
            <div class="empty-icon" style="background:${color}10;border-color:${color}">
                <i class="fa-solid ${opts.icon || 'fa-inbox'}" style="font-size:28px;color:${color}"></i>
            </div>
            <h4 style="font-size:14px;font-weight:700;color:#111;margin:0 0 4px">${opts.title || 'Nothing here yet'}</h4>
            <p style="font-size:12px;color:#9ca3af;max-width:260px;line-height:1.5">${opts.message || 'Start by creating your first item.'}</p>
            ${opts.action ? `<button onclick="${opts.action}" style="margin-top:14px;padding:8px 18px;border-radius:8px;background:${color};color:#fff;border:none;font-size:11px;font-weight:700;cursor:pointer;transition:opacity 0.2s" onmouseover="this.style.opacity=0.85" onmouseout="this.style.opacity=1"><i class="fa-solid fa-plus" style="margin-right:4px"></i>${opts.actionText || 'Create'}</button>` : ''}
        </div>
    `;
    };

    // ── Keyboard Shortcuts ──
    window.openKbdOverlay = function () {
        document.getElementById('kbd-overlay')?.classList.add('open');
    };
    window.closeKbdOverlay = function () {
        document.getElementById('kbd-overlay')?.classList.remove('open');
    };

    document.addEventListener('keydown', (e) => {
        // Ignore if typing in an input
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        const dashScreen = document.getElementById('dashboard-screen');
        if (!dashScreen || dashScreen.classList.contains('hidden')) return;

        if (e.key === '?') {
            e.preventDefault();
            openKbdOverlay();
        }
        if (e.key === 'Escape') {
            closeKbdOverlay();
        }
        if (e.key === 'n' || e.key === 'N') {
            if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                if (typeof openCreateModal === 'function') openCreateModal('EXPENSE');
            }
        }
        if (e.key === 't' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            if (typeof toggleTheme === 'function') toggleTheme();
        }
        if (e.key === 'T' && e.shiftKey) {
            e.preventDefault();
            if (typeof toggleEmpView === 'function') toggleEmpView('tasks');
        }
        if (e.key === 'b' || e.key === 'B') {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                if (typeof openNotifList === 'function') openNotifList();
            }
        }
        if (e.key === 'p' || e.key === 'P') {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                if (typeof openProfileModal === 'function') openProfileModal();
            }
        }
        if (e.key === 'm' || e.key === 'M') {
            if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                if (typeof toggleMainView === 'function') toggleMainView('messages');
            }
        }
        if (e.key === 'd' || e.key === 'D') {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                const compact = localStorage.getItem('emp-ui-density') === 'compact';
                applyEmpDensity(compact ? 'comfortable' : 'compact');
            }
        }
    });

    // ── Drag-and-Drop Upload Enhancement ──
    function enhanceDragDrop() {
        document.addEventListener('dragover', (e) => {
            const label = e.target.closest('.receipt-label, label[for]');
            if (label) {
                e.preventDefault();
                label.classList.add('drop-zone-active');
            }
        });
        document.addEventListener('dragleave', (e) => {
            const label = e.target.closest('.receipt-label, label[for]');
            if (label) label.classList.remove('drop-zone-active');
        });
        document.addEventListener('drop', (e) => {
            const label = e.target.closest('.receipt-label, label[for]');
            if (label) {
                label.classList.remove('drop-zone-active');
                const fileInput = label.querySelector('input[type=file]');
                if (fileInput && e.dataTransfer?.files?.length) {
                    e.preventDefault();
                    fileInput.files = e.dataTransfer.files;
                    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    }

    function injectExpenseQuickFilters() {
        const toolbar = document.querySelector('#section-claims > div.p-4');
        if (!toolbar || document.getElementById('emp-quick-filters')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'emp-quick-filters';
        wrapper.className = 'flex flex-wrap items-center gap-2 mt-2';
        wrapper.innerHTML = `
            <button class="emp-quick-filter active" data-filter="ALL">All</button>
            <button class="emp-quick-filter" data-filter="PENDING">Pending</button>
            <button class="emp-quick-filter" data-filter="PAID">Paid</button>
            <button class="emp-quick-filter" data-filter="REJECTED">Rejected</button>
        `;
        toolbar.appendChild(wrapper);

        wrapper.addEventListener('click', (event) => {
            const btn = event.target.closest('.emp-quick-filter');
            if (!btn) return;
            applyExpenseQuickFilter(btn.getAttribute('data-filter'));
        });
    }

    function applyExpenseQuickFilter(filterKey) {
        const searchInput = document.getElementById('emp-search');
        const map = {
            ALL: '',
            PENDING: 'pending',
            PAID: 'paid',
            REJECTED: 'rejected'
        };

        document.querySelectorAll('#emp-quick-filters .emp-quick-filter').forEach((btn) => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filterKey);
        });

        if (searchInput) searchInput.value = map[filterKey] || '';
        if (typeof filterExpenses === 'function') {
            filterExpenses(map[filterKey] || '');
        }

        const list = document.getElementById('expenses-list');
        if (!list) return;
        const items = Array.from(list.children || []);
        items.forEach((item) => {
            if (filterKey === 'ALL') {
                item.classList.remove('hidden');
                return;
            }

            const text = (item.textContent || '').toUpperCase();
            let visible = false;
            if (filterKey === 'PENDING') visible = /(PENDING|PROCESS|MANAGER|FINANCE|TREASURY)/.test(text);
            if (filterKey === 'PAID') visible = /PAID/.test(text);
            if (filterKey === 'REJECTED') visible = /REJECTED/.test(text);
            item.classList.toggle('hidden', !visible);
        });
    }

    function applyEmpDensity(mode) {
        const compact = mode === 'compact';
        document.body.classList.toggle('emp-compact', compact);
        localStorage.setItem('emp-ui-density', compact ? 'compact' : 'comfortable');
        const icon = document.querySelector('#emp-density-toggle i');
        if (icon) {
            icon.className = compact ? 'fa-solid fa-compress text-sm text-gray-500 dark:text-gray-400' : 'fa-solid fa-expand text-sm text-gray-500 dark:text-gray-400';
        }
    }

    function injectDensityToggle() {
        const headerActions = document.querySelector('header .flex.items-center.gap-1.sm\:gap-2');
        if (!headerActions || document.getElementById('emp-density-toggle')) return;

        const btn = document.createElement('button');
        btn.id = 'emp-density-toggle';
        btn.type = 'button';
        btn.title = 'Toggle compact view';
        btn.className = 'w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#111] transition-colors';
        btn.innerHTML = '<i class="fa-solid fa-expand text-sm text-gray-500 dark:text-gray-400"></i>';
        btn.addEventListener('click', () => {
            const compact = localStorage.getItem('emp-ui-density') === 'compact';
            applyEmpDensity(compact ? 'comfortable' : 'compact');
        });

        headerActions.prepend(btn);
    }

    function initScrollTopButton() {
        if (document.getElementById('emp-scroll-top')) return;

        const btn = document.createElement('button');
        btn.id = 'emp-scroll-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        document.body.appendChild(btn);

        const host = document.getElementById('main-view-dashboard');
        if (!host) return;

        host.addEventListener('scroll', () => {
            btn.style.display = host.scrollTop > 280 ? 'flex' : 'none';
        }, { passive: true });

        btn.addEventListener('click', () => {
            host.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Dashboard Auto-Refresh (Real-time sync) ──
    function refreshDashboardFeatures() {
        renderEmpGreeting();
        injectActivityFeed();
        injectExpenseQuickFilters();

        // Auto-stepper: show progress of the most recent pending claim
        const pendingClaims = (window.expensesData || [])
            .filter(c => !['PAID', 'REJECTED', 'DRAFT'].includes(c.status))
            .sort((a, b) => {
                const da = a.updatedAt?.toDate ? a.updatedAt.toDate() : new Date();
                const db = b.updatedAt?.toDate ? b.updatedAt.toDate() : new Date();
                return db - da;
            });

        if (pendingClaims.length > 0) {
            const latest = pendingClaims[0];
            const stageMap = { 'PENDING_MANAGER': 1, 'PENDING_FINANCE': 2, 'FINANCE_APPROVED': 2, 'PENDING_TREASURY': 3, 'PAID': 4 };
            const step = stageMap[latest.status] || 0;
            window.showClaimStepper(step);
        } else {
            window.hideClaimStepper();
        }

        if (!document.querySelector('#emp-quick-filters .emp-quick-filter.active')) {
            applyExpenseQuickFilter('ALL');
        }
    }

    // ── Init all features ──
    window.addEventListener('load', () => {
        setTimeout(() => {
            refreshDashboardFeatures();
            addSparklines();
            enhanceDragDrop();
            injectDensityToggle();
            initScrollTopButton();
            applyEmpDensity(localStorage.getItem('emp-ui-density') === 'compact' ? 'compact' : 'comfortable');
        }, 1200);

        // Periodic refresh to keep TS and real data in sync
        setInterval(refreshDashboardFeatures, 5000);
    });

    // Re-render features on dashboard show
    const dashObs = new MutationObserver(() => {
        const greeting = document.getElementById('emp-greeting-container');
        if (greeting && !greeting.children.length) {
            setTimeout(refreshDashboardFeatures, 200);
        }
    });
    const dashMain = document.getElementById('main-view-dashboard');
    if (dashMain) dashObs.observe(dashMain, { childList: true, subtree: false });
})();
