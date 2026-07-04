// ============================================
// Shared Utilities — Toast, Loading, Helpers
// ============================================

const Utils = {
  // ── Toast Notifications ──
  _toastContainer: null,

  _ensureToastContainer() {
    if (!this._toastContainer) {
      this._toastContainer = document.createElement('div');
      this._toastContainer.className = 'toast-container';
      document.body.appendChild(this._toastContainer);
    }
    return this._toastContainer;
  },

  toast(message, type = 'info', duration = 4000) {
    const container = this._ensureToastContainer();
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span style="font-size:18px;font-weight:700">${icons[type] || 'ℹ'}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // ── Loading Overlay ──
  showLoading(text = 'Loading...') {
    let overlay = document.getElementById('cs-loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'cs-loading-overlay';
      overlay.className = 'loading-overlay';
      overlay.innerHTML = `<div class="loading-spinner"></div><p class="loading-text">${text}</p>`;
      document.body.appendChild(overlay);
    } else {
      overlay.querySelector('.loading-text').textContent = text;
      overlay.style.display = 'flex';
    }
  },

  hideLoading() {
    const overlay = document.getElementById('cs-loading-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  // ── Date Formatting ──
  formatDate(timestamp) {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  formatTime(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  },

  formatRelative(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return Utils.formatDate(timestamp);
  },

  // ── Sanitize HTML ──
  escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  // ── Generate unique ID ──
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // ── Debounce ──
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  // ── Get initials from name ──
  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  },

  // ── Truncate text ──
  truncate(str, maxLen = 100) {
    if (!str || str.length <= maxLen) return str;
    return str.substring(0, maxLen).trim() + '…';
  }
};

window.Utils = Utils;
