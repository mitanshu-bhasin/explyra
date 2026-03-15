/* shared.js - Shared JavaScript for Explyra marketing pages */

/* ── Theme Toggle (runs immediately to prevent flash of wrong theme) ── */
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('explyra-theme') || 'light';
  html.setAttribute('data-theme', saved);

  function initThemePill() {
    const pill = document.getElementById('themePill');
    const lbl = document.getElementById('themeLabel');
    if (lbl) lbl.textContent = saved === 'dark' ? 'Dark' : 'Light';
    if (pill) {
      pill.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', nextTheme);
        if (lbl) lbl.textContent = nextTheme === 'dark' ? 'Dark' : 'Light';
        localStorage.setItem('explyra-theme', nextTheme);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemePill);
  } else {
    initThemePill();
  }
})();

/* ── Everything below runs after the DOM is ready ── */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Scroll Reveal (IntersectionObserver) ── */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Smooth Scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Mobile Menu ── */
  const menuBtn = document.getElementById('menuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mobile-nav-links a').forEach(function (link) {
    if (!link.closest('.mobile-has-submenu')) {
      link.addEventListener('click', toggleMenu);
    }
  });

  document.querySelectorAll('.mobile-submenu-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const parent = trigger.closest('.mobile-has-submenu');
      if (parent) parent.classList.toggle('open');
    });
  });

  /* ── Back to Top ── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) btt.classList.add('visible');
      else btt.classList.remove('visible');
    });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Coming Soon Toast ── */
  const toast = document.getElementById('exToast');
  let toastTimeout;
  function showComingSoon() {
    if (!toast) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    toast.classList.add('visible');
    toastTimeout = setTimeout(function () { toast.classList.remove('visible'); }, 3000);
  }
  document.querySelectorAll('.coming-soon-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); showComingSoon(); });
  });

  /* ── Footer Accordion (mobile) ── */
  document.querySelectorAll('.foot-col h4').forEach(function (header) {
    header.addEventListener('click', function () {
      const col = header.parentElement;
      if (window.innerWidth <= 640) {
        col.classList.toggle('active');
        document.querySelectorAll('.foot-col').forEach(function (other) {
          if (other !== col) other.classList.remove('active');
        });
      }
    });
  });

});
