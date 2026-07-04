// ============================================
// Route Protection & Navigation
// ============================================

const Router = {
  // Pages that don't require auth
  publicPages: ['index.html', 'login.html', 'signup.html', ''],

  // Guard: redirect to login if not authenticated
  requireAuth(callback) {
    AuthService.onAuthStateChanged((user) => {
      const page = window.location.pathname.split('/').pop() || 'index.html';
      if (!user && !this.publicPages.includes(page)) {
        window.location.href = 'login.html';
        return;
      }
      if (callback) callback(user);
    });
  },

  // Guard: redirect to dashboard if already logged in (for auth pages)
  redirectIfAuth() {
    AuthService.onAuthStateChanged((user) => {
      if (user) {
        window.location.href = 'dashboard.html';
      }
    });
  },

  // Navigate to a page
  navigate(page) {
    window.location.href = page;
  },

  // Get current page name
  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }
};

window.Router = Router;
