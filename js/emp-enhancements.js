(() => {
    const ATTENDANCE_KEY = 'explyra-emp-attendance-v1';
    const FEED_KEY = 'explyra-emp-feed-v1';
    const INITIAL_RENDER_DELAY_MS = 700;
    const REFRESH_INTERVAL_MS = 30000;
    const MAX_STREAK_DAYS = 12;
    const MIN_STREAK_DAYS = 1;
    const STREAK_OFFSET_DAYS = 2;

    const safeJsonParse = (value, fallback) => {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch {
            return fallback;
        }
    };

    const getAttendance = () => safeJsonParse(localStorage.getItem(ATTENDANCE_KEY), {
        checkedInAt: null,
        todayEntries: []
    });
    const setAttendance = (value) => localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(value));

    const getFeed = () => safeJsonParse(localStorage.getItem(FEED_KEY), [
        { id: 'f-1', title: 'Policy update', text: 'Q2 reimbursement thresholds were refreshed.', time: new Date(Date.now() - 1000 * 60 * 80).toISOString() },
        { id: 'f-2', title: 'Team reminder', text: 'Submit travel claims within 48 hours for faster approvals.', time: new Date(Date.now() - 1000 * 60 * 180).toISOString() }
    ]);
    const setFeed = (feed) => localStorage.setItem(FEED_KEY, JSON.stringify(feed.slice(0, 8)));

    const timeAgo = (isoDate) => {
        const seconds = Math.max(1, Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000));
        if (seconds < 60) return `${seconds}s ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    const getTodayDateKey = () => new Date().toISOString().slice(0, 10);

    const calculateTodayHours = (entries) => {
        return entries.reduce((sum, entry) => {
            if (!entry.in || !entry.out) return sum;
            const inTime = new Date(entry.in).getTime();
            const outTime = new Date(entry.out).getTime();
            if (!Number.isFinite(inTime) || !Number.isFinite(outTime) || outTime < inTime) return sum;
            return sum + (outTime - inTime);
        }, 0);
    };

    const formatHours = (milliseconds) => {
        const hours = milliseconds / (1000 * 60 * 60);
        return `${hours.toFixed(1)}h`;
    };

    const makeRoot = () => {
        const dashboard = document.getElementById('main-view-dashboard');
        if (!dashboard) return null;
        let root = document.getElementById('emp-smart-dashboard-root');
        if (!root) {
            root = document.createElement('section');
            root.id = 'emp-smart-dashboard-root';
            root.className = 'grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10';
            const anchor = document.getElementById('stats-container');
            if (anchor && anchor.parentNode) {
                anchor.parentNode.insertBefore(root, anchor.nextSibling);
            } else {
                dashboard.appendChild(root);
            }
        }
        return root;
    };

    const getTaskStats = () => {
        const tasks = Array.isArray(window.empTasksData) ? window.empTasksData : [];
        const completed = tasks.filter((task) => task.status === 'COMPLETED').length;
        const inProgress = tasks.filter((task) => task.status === 'IN_PROGRESS').length;
        const total = tasks.length;
        const completionPct = total ? Math.round((completed / total) * 100) : 0;
        return { completed, inProgress, total, completionPct };
    };

    const renderFeed = (root) => {
        const feedHost = root.querySelector('[data-emp-feed]');
        if (!feedHost) return;
        const feed = getFeed();
        const tasks = Array.isArray(window.empTasksData) ? window.empTasksData : [];
        const nearestTask = tasks
            .filter((task) => task.dueDate && task.status !== 'COMPLETED')
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
        if (nearestTask) {
            feed.unshift({
                id: `task-${nearestTask.id}`,
                title: 'Upcoming task deadline',
                text: `${nearestTask.title || 'Untitled task'} is due ${new Date(nearestTask.dueDate).toLocaleDateString()}.`,
                time: new Date().toISOString()
            });
        }
        const normalized = feed
            .filter((item, index, arr) => arr.findIndex((a) => a.id === item.id) === index)
            .slice(0, 5);
        setFeed(normalized);

        feedHost.innerHTML = normalized.map((item) => `
            <div class="py-2 border-b border-slate-100 dark:border-slate-800">
                <p class="text-xs font-semibold text-slate-700 dark:text-slate-200">${item.title}</p>
                <p class="text-[11px] text-slate-500 mt-0.5">${item.text}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">${timeAgo(item.time)}</p>
            </div>
        `).join('');
    };

    const render = () => {
        const root = makeRoot();
        if (!root) return;

        const attendance = getAttendance();
        const today = getTodayDateKey();
        const todayEntries = attendance.todayEntries.filter((entry) => entry.dateKey === today);
        const todayMilliseconds = calculateTodayHours(todayEntries);
        const checkedIn = Boolean(attendance.checkedInAt);
        const taskStats = getTaskStats();
        const userName = document.getElementById('sidebar-user-name')?.textContent?.trim() || 'Employee';
        const userRole = document.getElementById('sidebar-user-role')?.textContent?.trim() || 'Team Member';
        const streak = Math.min(MAX_STREAK_DAYS, Math.max(MIN_STREAK_DAYS, todayEntries.length + STREAK_OFFSET_DAYS));

        root.innerHTML = `
            <article class="vercel-card xl:col-span-2 p-5">
                <div class="flex items-start justify-between gap-3 mb-4">
                    <div>
                        <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">Attendance + Tasks</p>
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Daily Productivity Tracker</h3>
                    </div>
                    <span class="px-2 py-1 rounded-full text-[10px] font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">${formatHours(todayMilliseconds)} logged</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] uppercase text-slate-400 font-semibold">Completed tasks</p>
                        <p class="text-xl font-bold mt-1">${taskStats.completed}<span class="text-xs text-slate-400">/${taskStats.total || 0}</span></p>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] uppercase text-slate-400 font-semibold">In progress</p>
                        <p class="text-xl font-bold mt-1">${taskStats.inProgress}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <p class="text-[10px] uppercase text-slate-400 font-semibold">Focus streak</p>
                        <p class="text-xl font-bold mt-1">${streak} days</p>
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between text-[11px] mb-1">
                        <span class="text-slate-500">Performance completion</span>
                        <span class="font-semibold">${taskStats.completionPct}%</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div class="h-full bg-emerald-500 transition-all duration-300" style="width:${taskStats.completionPct}%"></div>
                    </div>
                </div>
            </article>
            <article class="vercel-card p-5">
                <p class="text-[10px] uppercase tracking-widest font-bold text-slate-400">My Workday</p>
                <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">${userName}</h3>
                <p class="text-[11px] text-slate-500">${userRole}</p>
                <div class="mt-4 flex gap-2">
                    <button type="button" data-check-action="in" class="flex-1 px-3 py-2 rounded-lg text-xs font-semibold ${checkedIn ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 cursor-not-allowed' : 'bg-black text-white dark:bg-white dark:text-black'}" ${checkedIn ? 'disabled' : ''}>Check in</button>
                    <button type="button" data-check-action="out" class="flex-1 px-3 py-2 rounded-lg text-xs font-semibold ${checkedIn ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 cursor-not-allowed'}" ${checkedIn ? '' : 'disabled'}>Check out</button>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <p class="text-[11px] text-slate-500">Current status: <span class="font-semibold ${checkedIn ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-500'}">${checkedIn ? 'Checked in' : 'Not checked in'}</span></p>
                    <p class="text-[11px] text-slate-500 mt-1">Sessions today: <span class="font-semibold">${todayEntries.length}</span></p>
                </div>
                <div class="mt-4 max-h-44 overflow-y-auto" data-emp-feed></div>
            </article>
        `;

        renderFeed(root);
    };

    document.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const action = button.getAttribute('data-check-action');
        if (!action) return;

        const attendance = getAttendance();
        const dateKey = getTodayDateKey();
        attendance.todayEntries = attendance.todayEntries.filter((entry) => entry.dateKey === dateKey);

        if (action === 'in' && !attendance.checkedInAt) {
            const now = new Date().toISOString();
            attendance.checkedInAt = now;
            attendance.todayEntries.push({ dateKey, in: now, out: null });
            if (typeof window.showToast === 'function') window.showToast('Checked in successfully', 'success');
        }

        if (action === 'out' && attendance.checkedInAt) {
            const now = new Date().toISOString();
            const openEntry = [...attendance.todayEntries].reverse().find((entry) => entry.in && !entry.out);
            if (openEntry) {
                openEntry.out = now;
            }
            attendance.checkedInAt = null;
            if (typeof window.showToast === 'function') window.showToast('Checked out. Great work!', 'success');
        }

        setAttendance(attendance);
        render();
    });

    window.addEventListener('load', () => setTimeout(render, INITIAL_RENDER_DELAY_MS));
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') render();
    });
    setInterval(render, REFRESH_INTERVAL_MS);
})();
