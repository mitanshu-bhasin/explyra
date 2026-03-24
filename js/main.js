/* 
   EXPLYRA MAIN LOGIC
   Shared app lifecycle, theme management, and UI enhancements
*/

(function () {
    "use strict";

    // --- State & Config ---
    const html = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    // --- Initialize ---
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initScrollProgress();
        initMobileMenu();
        initBackToTop();
        initRevealAnimations();
        initSmoothScroll();
        initFooterAccordions();
    });

    // --- Theme Management ---
    function initTheme() {
        const themePill = document.getElementById('themePill');
        const themeLabel = document.getElementById('themeLabel');
        const savedTheme = localStorage.getItem('explyra-theme') || 'light';

        const setTheme = (theme) => {
            html.setAttribute('data-theme', theme);
            if (themeLabel) themeLabel.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            localStorage.setItem('explyra-theme', theme);
            window.dispatchEvent(new CustomEvent('explyra-theme-changed', { detail: { theme } }));
        };

        setTheme(savedTheme);

        if (themePill) {
            themePill.addEventListener('click', () => {
                const current = html.getAttribute('data-theme');
                setTheme(current === 'light' ? 'dark' : 'light');
            });

            themePill.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    themePill.click();
                }
            });
        }
    }

    // --- Scroll Progress ---
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgressBar');
        if (!bar) return;

        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = `${Math.min(progress, 100)}%`;
        };

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // --- Mobile Menu ---
    function initMobileMenu() {
        const menuBtn = document.getElementById('menuBtn');
        const closeBtn = document.getElementById('closeMenuBtn');
        const menu = document.getElementById('mobileMenu');
        const links = document.querySelectorAll('.mobile-nav-links a');

        if (!menuBtn || !menu) return;

        const toggle = (force) => {
            const isOpen = typeof force === 'boolean' ? force : menu.classList.toggle('open');
            if (typeof force === 'boolean') menu.classList.toggle('open', force);
            
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        menuBtn.addEventListener('click', () => toggle(true));
        if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));

        links.forEach(link => {
            if (!link.closest('.mobile-has-submenu')) {
                link.addEventListener('click', () => toggle(false));
            }
        });

        // Submenu logic
        document.querySelectorAll('.mobile-submenu-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                trigger.closest('.mobile-has-submenu').classList.toggle('open');
            });
        });
    }

    // --- Back To Top ---
    function initBackToTop() {
        const btt = document.getElementById('backToTop');
        if (!btt) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) btt.classList.add('visible');
            else btt.classList.remove('visible');
        }, { passive: true });

        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Reveal Animations ---
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        if (reducedMotion) {
            revealElements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // --- Smooth Scroll ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#contact') return; // Let page specific logic handle contact
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // --- Footer Accordions (Mobile) ---
    function initFooterAccordions() {
        const headers = document.querySelectorAll('.foot-col h4');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                if (window.innerWidth <= 640) {
                    const col = header.parentElement;
                    const isActive = col.classList.contains('active');
                    
                    // Close others
                    document.querySelectorAll('.foot-col').forEach(c => c.classList.remove('active'));
                    
                    if (!isActive) col.classList.add('active');
                }
            });
        });
    }

    // --- Toast Notification ---
    window.showExToast = function(message) {
        const toast = document.getElementById('exToast');
        if (!toast) return;
        
        const span = toast.querySelector('span');
        if (span && message) span.textContent = message;
        
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
    };

})();
