// common.js - Shared JavaScript for admin.html and emp.html

// ===== Tailwind Configuration =====
// This must run after the Tailwind CDN script loads
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Outfit', 'sans-serif'],
                    serif: ['Playfair Display', 'serif']
                },
                colors: {
                    slate: {
                        50: '#F8F7F4',
                        100: '#F1EFE9',
                        200: '#E4E1DB',
                        300: '#CCC8C0',
                        400: '#939BAC',
                        500: '#8290A8',
                        600: '#586070',
                        700: '#0D1117',
                        800: '#141928',
                        900: '#080B14'
                    },
                    green: {
                        50: '#eef2ff',
                        100: 'rgba(21,70,192,0.08)',
                        200: '#93B4FF',
                        300: '#5B8AF5',
                        400: '#5B8AF5',
                        500: '#1546C0',
                        600: '#1546C0',
                        700: '#113A9F',
                        800: '#0C2B7A',
                        900: '#051234'
                    },
                    brand: {
                        50: '#F8F7F4',
                        100: '#F1EFE9',
                        200: '#c7d2fe',
                        300: '#a5b4fc',
                        400: '#818cf8',
                        500: '#1546C0',
                        600: '#1546C0',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a'
                    }
                }
            }
        }
    };
}

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.error('Service Worker Error', err));
    });
}

// ===== Notification Permission =====
if ('Notification' in window && Notification.permission === 'default') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            Notification.requestPermission().then(perm => {
                if (perm === 'granted') {
                    setTimeout(() => {
                        const title = "Test Notification";
                        const opts = {
                            body: "This is a test notification to confirm setup.",
                            icon: "assets/images/explyra_logo.png"
                        };
                        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                            navigator.serviceWorker.ready.then(reg => reg.showNotification(title, opts));
                        }
                    }, 5000);
                }
            });
        }, 3000);
    });
}

// ===== Shared Utility Functions =====

/**
 * Close a modal by ID
 */
window.closeModal = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
};

/**
 * Get status color classes for expense status badges
 */
window.getStatusColor = (status) => {
    const colors = {
        'PENDING_MANAGER': 'bg-green-100 text-green-700 border border-green-200',
        'PENDING_FINANCE': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
        'FINANCE_APPROVED': 'bg-purple-100 text-purple-700 border border-purple-200',
        'PENDING_ACCOUNTS': 'bg-orange-100 text-orange-700 border border-orange-200',
        'PENDING_COMPLIANCE': 'bg-pink-100 text-pink-700 border border-pink-200',
        'PENDING_TREASURY': 'bg-amber-100 text-amber-700 border border-amber-200',
        'PAID': 'bg-emerald-100 text-green-700 border border-emerald-200',
        'AUDITED': 'bg-teal-100 text-green-700 border border-teal-200',
        'REJECTED': 'bg-red-100 text-red-700 border border-red-200',
    };
    return colors[status] || 'bg-slate-100 text-slate-500 dark:text-slate-400';
};

/**
 * Get currency symbol
 */
window.getSymbol = (curr) => {
    const sym = { 'INR': '₹', 'USD': '$', 'EUR': '€', 'GBP': '£' };
    return sym[curr] || '₹';
};
