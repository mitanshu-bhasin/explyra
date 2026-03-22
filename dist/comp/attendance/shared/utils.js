/* shared/utils.js - Shared utilities and App Data setup */

function getAppData(schemaKey, defaultSchema) {
    let data = localStorage.getItem(schemaKey);
    if (!data) {
        data = defaultSchema;
        saveAppData(schemaKey, data);
    } else {
        data = JSON.parse(data);
    }
    return data;
}

function saveAppData(schemaKey, data) {
    localStorage.setItem(schemaKey, JSON.stringify(data));
}

function getSession(sessionKey) {
    return JSON.parse(localStorage.getItem(sessionKey));
}

function saveSession(sessionKey, session) {
    localStorage.setItem(sessionKey, JSON.stringify(session));
}

function logout(sessionKey, redirectUrl) {
    localStorage.removeItem(sessionKey);
    window.location.href = redirectUrl;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('explyra-theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('explyra-theme', 'dark');
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('explyra-theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
});
