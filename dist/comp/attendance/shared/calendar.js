/* shared/calendar.js - Shared calendar builder for Attendance modules */

class CalendarModule {
    constructor(containerId, moduleType, options = {}) {
        this.container = document.getElementById(containerId);
        this.moduleType = moduleType; // 'school' or 'company'
        this.currentDate = new Date();
        this.onDateSelect = options.onDateSelect || (() => { });
        this.render();
    }

    render() {
        if (!this.container) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let html = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold">${monthNames[month]} ${year}</h3>
                <div class="flex items-center gap-2">
                    <button id="cal-prev" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition flex items-center justify-center">
                        <i class="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                    <button id="cal-next" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition flex items-center justify-center">
                        <i class="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="calendar-grid rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        `;

        // Fetch Holidays from App Data
        const sessionKey = `${this.moduleType}_session`;
        const session = getSession(sessionKey);
        const dataKey = this.moduleType === 'company' ? 'attendance_app_data' : 'school_attendance_data';
        const data = getAppData(dataKey, {});

        let orgId = '';
        if (session) {
            orgId = this.moduleType === 'company' ? session.companyId : session.schoolId;
        }

        // Ensure calendar schema exists
        if (!data.calendar) data.calendar = {};
        if (!data.calendar[orgId]) data.calendar[orgId] = {};
        const calData = data.calendar[orgId];

        // Empty cells for prior month
        for (let i = 0; i < firstDay; i++) {
            html += `<div class="calendar-cell calendar-cell-other-month p-2"></div>`;
        }

        // Active month cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = (dateStr === new Date().toISOString().split('T')[0]);
            const isHoliday = calData[dateStr] === 'Holiday';

            let statusBadge = '';
            if (isHoliday) {
                statusBadge = `<span class="badge badge-special mt-1 text-[8px]">Holiday</span>`;
            }

            let extraClasses = 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition';
            if (isToday) extraClasses += ' ring-2 ring-indigo-500 ring-inset';

            html += `
                <div class="calendar-cell ${extraClasses}" data-date="${dateStr}">
                    <span class="font-bold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : ''}">${day}</span>
                    <div class="flex-1 flex flex-col justify-end mt-1">${statusBadge}</div>
                </div>
            `;
        }
        html += `</div>`;
        this.container.innerHTML = html;

        // Attach Events
        document.getElementById('cal-prev').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
        });
        document.getElementById('cal-next').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render();
        });

        const cells = this.container.querySelectorAll('.calendar-cell[data-date]');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                this.onDateSelect(cell.dataset.date);
            });
        });
    }

    markHoliday(dateString, isHoliday) {
        const sessionKey = `${this.moduleType}_session`;
        const session = getSession(sessionKey);
        if (!session) return;

        const dataKey = this.moduleType === 'company' ? 'attendance_app_data' : 'school_attendance_data';
        const data = getAppData(dataKey, {});
        const orgId = this.moduleType === 'company' ? session.companyId : session.schoolId;

        if (!data.calendar) data.calendar = {};
        if (!data.calendar[orgId]) data.calendar[orgId] = {};

        if (isHoliday) {
            data.calendar[orgId][dateString] = 'Holiday';
        } else {
            delete data.calendar[orgId][dateString];
        }

        saveAppData(dataKey, data);
        this.render(); // Re-render to show badge
    }
}
