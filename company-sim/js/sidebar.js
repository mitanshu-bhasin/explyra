// ============================================
// Sidebar Component
// ============================================

function renderSidebar(activePage) {
  const user = csAuth.currentUser;
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const email = user?.email || '';
  const initials = Utils.getInitials(displayName);

  const sidebarHTML = `
    <aside class="sidebar" id="cs-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">CS</div>
        <span class="sidebar-title">CompanySim</span>
        <button class="btn-ghost btn-icon sidebar-toggle-btn" onclick="toggleSidebar()" style="margin-left:auto;display:none" id="sidebar-close">✕</button>
      </div>

      <nav class="sidebar-nav">
        <a class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" href="dashboard.html">
          <span class="nav-icon">📊</span> Dashboard
        </a>
        <a class="nav-item ${activePage === 'company-setup' ? 'active' : ''}" href="company-setup.html">
          <span class="nav-icon">🏢</span> Company Setup
        </a>
        <a class="nav-item ${activePage === 'agent-selection' ? 'active' : ''}" href="agent-selection.html">
          <span class="nav-icon">🤖</span> Agent Selection
        </a>

        <div class="nav-section-title">Workspace</div>
        <a class="nav-item ${activePage === 'meeting' ? 'active' : ''}" href="meeting.html">
          <span class="nav-icon">💬</span> Meetings
        </a>
        <a class="nav-item ${activePage === 'chat' ? 'active' : ''}" href="chat.html">
          <span class="nav-icon">👤</span> Personal Chat
        </a>
        <a class="nav-item ${activePage === 'presentation' ? 'active' : ''}" href="presentation.html">
          <span class="nav-icon">📽️</span> Presentation
        </a>
        <a class="nav-item ${activePage === 'memory' ? 'active' : ''}" href="memory.html">
          <span class="nav-icon">🧠</span> Memory & History
        </a>
        <a class="nav-item ${activePage === 'settings' ? 'active' : ''}" href="settings.html">
          <span class="nav-icon">⚙️</span> Settings
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user" onclick="document.getElementById('user-menu').classList.toggle('active')">
          <div class="sidebar-avatar">${initials}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${Utils.escapeHtml(displayName)}</div>
            <div class="sidebar-user-email">${Utils.escapeHtml(email)}</div>
          </div>
        </div>
        <div id="user-menu" style="display:none;padding-top:8px">
          <button class="btn btn-ghost btn-sm" onclick="handleLogout()" style="width:100%;color:var(--color-accent-red)">
            ↪ Sign Out
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile menu button -->
    <button class="btn btn-secondary btn-icon" id="mobile-menu-btn"
      style="position:fixed;top:16px;left:16px;z-index:201;display:none"
      onclick="toggleSidebar()">☰</button>
  `;

  // Insert at beginning of body
  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // Mobile responsiveness
  const mq = window.matchMedia('(max-width: 768px)');
  function handleMobile(e) {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('sidebar-close');
    if (e.matches) {
      mobileBtn.style.display = 'flex';
      closeBtn.style.display = 'flex';
    } else {
      mobileBtn.style.display = 'none';
      closeBtn.style.display = 'none';
      document.getElementById('cs-sidebar').classList.remove('open');
    }
  }
  mq.addEventListener('change', handleMobile);
  handleMobile(mq);
}

function toggleSidebar() {
  document.getElementById('cs-sidebar').classList.toggle('open');
}

function handleLogout() {
  const menu = document.getElementById('user-menu');
  if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  AuthService.logout().then(() => {
    window.location.href = 'login.html';
  });
}

// Toggle user menu
document.addEventListener('click', (e) => {
  const menu = document.getElementById('user-menu');
  if (menu && !e.target.closest('.sidebar-user') && !e.target.closest('#user-menu')) {
    menu.style.display = 'none';
  }
});

window.renderSidebar = renderSidebar;
window.toggleSidebar = toggleSidebar;
window.handleLogout = handleLogout;
