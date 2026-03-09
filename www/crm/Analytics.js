/**
 * crm/Analytics.js
 * Chart and statistical logic for CRM module
 */

window.CrmAnalytics = {
    pipelineChart: null,
    forecastChart: null,
    dealsData: [],

    init() {
        console.log("[CRM Analytics] Initialized");
        // Charts will be rendered when the Analytics tab is opened or deals update.
    },

    updateData(deals) {
        this.dealsData = deals;
        // Only render/update if the tab is visible to save resources
        const view = document.getElementById('view-analytics');
        if (view && !view.classList.contains('hidden')) {
            this.renderCharts();
        }
    },

    renderCharts() {
        if (!this.dealsData || this.dealsData.length === 0) {
            // No data placeholder logic could go here
        }

        this.calculateTopStats();
        this.renderPipelineChart();
        this.renderForecastChart();
    },

    calculateTopStats() {
        let totalValue = 0;
        let wonCount = 0;
        let closedCount = 0;
        let forecastSum = 0;

        this.dealsData.forEach(deal => {
            const amt = deal.amount || 0;
            const prob = deal.probability || 0;

            if (deal.stage !== 'Closed-Lost') {
                totalValue += amt;
            }

            if (deal.stage === 'Closed-Won') {
                wonCount++;
                closedCount++;
            } else if (deal.stage === 'Closed-Lost') {
                closedCount++;
            }

            // Forecast is Amount * Probability
            forecastSum += (amt * (prob / 100));
        });

        const winRate = closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;

        document.getElementById('stat-total-value').innerText = `₹${totalValue.toLocaleString()}`;
        document.getElementById('stat-win-rate').innerText = `${winRate}%`;
        document.getElementById('stat-forecast').innerText = `₹${Math.round(forecastSum).toLocaleString()}`;

        // Motion One stagger animation on stats
        if (window.Motion) {
            window.Motion.animate(
                '#view-analytics .text-3xl',
                { opacity: [0, 1], y: [10, 0] },
                { duration: 0.5, delay: window.Motion.stagger(0.1) }
            );
        }
    },

    renderPipelineChart() {
        const ctx = document.getElementById('pipeline-chart');
        if (!ctx) return;

        // Count value per stage
        const stageValues = {
            'Discovery': 0,
            'Proposal': 0,
            'Negotiation': 0,
            'Closed-Won': 0,
            'Closed-Lost': 0
        };

        this.dealsData.forEach(deal => {
            if (stageValues[deal.stage] !== undefined) {
                stageValues[deal.stage] += (deal.amount || 0);
            }
        });

        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#cbd5e1' : '#475569';

        if (this.pipelineChart) this.pipelineChart.destroy();

        this.pipelineChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(stageValues),
                datasets: [{
                    label: 'Pipeline Value (₹)',
                    data: Object.values(stageValues),
                    backgroundColor: [
                        '#94a3b8', // Discovery - slate
                        '#60a5fa', // Proposal - blue
                        '#f59e0b', // Negotiation - amber
                        '#10b981', // Won - emerald
                        '#ef4444'  // Lost - red
                    ],
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: isDark ? '#334155' : '#f1f5f9' },
                        ticks: { color: textColor }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor }
                    }
                }
            }
        });
    },

    renderForecastChart() {
        const ctx = document.getElementById('forecast-chart');
        if (!ctx) return;

        // Simple mock of a time-series forecast using 'probability' segments
        // In a real app, you plot forecast over expected close dates.
        const ranges = {
            'High Commit (>80%)': 0,
            'Upside (50-79%)': 0,
            'Pipeline (<50%)': 0
        };

        this.dealsData.forEach(deal => {
            if (deal.stage === 'Closed-Lost' || deal.stage === 'Closed-Won') return; // Only active pipeline
            const val = deal.amount * ((deal.probability || 0) / 100);

            if (deal.probability >= 80) ranges['High Commit (>80%)'] += val;
            else if (deal.probability >= 50) ranges['Upside (50-79%)'] += val;
            else ranges['Pipeline (<50%)'] += val;
        });

        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#cbd5e1' : '#475569';

        if (this.forecastChart) this.forecastChart.destroy();

        this.forecastChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(ranges),
                datasets: [{
                    data: Object.values(ranges),
                    backgroundColor: [
                        '#3b82f6', // blue
                        '#8b5cf6', // violet
                        '#cbd5e1'  // slate
                    ],
                    borderWidth: 2,
                    borderColor: isDark ? '#1e293b' : '#ffffff',
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: textColor, padding: 20 }
                    }
                }
            }
        });
    }
};
