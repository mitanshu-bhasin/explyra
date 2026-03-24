/* 
   EXPLYRA INDEX DEMOS
   Interactivity for Expense, CRM, Health, Learning, and Dev Tool prototypes
*/

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', () => {
        initHeroCounters();
        initSectionSync();
        initParallax();
        initTilt();
        initExpenseDemo();
        initCrmDemo();
        initHealthDemo();
        initLearningDemo();
        initDevIDE();
        initHeroPills();
        initAiStrip();
        initVideoModal();
    });

    const isLowSpec = (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const allowEnhanced = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !isLowSpec;

    // --- Hero Stats Counter ---
    function initHeroCounters() {
        const stats = document.querySelector('.hero-stats');
        const counters = document.querySelectorAll('.h-stat-num[data-count]');
        if (!stats) return;

        const animate = (el) => {
            const target = Number(el.dataset.count || 0);
            const suffix = el.dataset.suffix || '';
            const duration = 1500;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
                const val = Math.floor(target * eased);
                el.textContent = `${val}${suffix}`;
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(animate);
                observer.unobserve(stats);
            }
        }, { threshold: 0.5 });
        observer.observe(stats);
    }

    // --- Section Sync (Active Nav Link) ---
    function initSectionSync() {
        const links = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav-links a[href^="#"]');
        const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

        const observer = new IntersectionObserver((entries) => {
            const visible = entries.find(e => e.isIntersecting);
            if (visible) {
                const id = `#${visible.target.id}`;
                links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
            }
        }, { threshold: 0.3, rootMargin: '-20% 0px -40% 0px' });

        sections.forEach(s => observer.observe(s));
    }

    // --- Parallax Effects ---
    function initParallax() {
        if (!allowEnhanced) return;
        const mesh = document.querySelector('.parallax-mesh');
        const blobs = document.querySelectorAll('.parallax-blob');

        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (mesh) mesh.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
            blobs.forEach((b, i) => {
                const speed = 0.02 + (i * 0.01);
                b.style.transform = `translate3d(0, ${y * speed}px, 0)`;
            });
        }, { passive: true });
    }

    // --- Card Tilt ---
    function initTilt() {
        if (!allowEnhanced || window.innerWidth < 1024) return;
        const cards = document.querySelectorAll('.exp-dash, .dev-card, .health-card, .learn-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => card.style.transform = '');
        });
    }

    // --- Expense Demo ---
    function initExpenseDemo() {
        const btn = document.getElementById('addExpense');
        const dash = document.querySelector('.expense-sec .dash-body');
        if (!btn || !dash) return;

        const cycle = ['Pending', 'Review', 'Paid'];
        const classes = ['st-e', 'st-r', 'st-p'];

        const bindPill = (pill) => {
            pill.addEventListener('click', () => {
                let idx = cycle.indexOf(pill.textContent.trim());
                idx = (idx + 1) % cycle.length;
                pill.className = `er-st ${classes[idx]}`;
                pill.textContent = cycle[idx];
            });
        };

        document.querySelectorAll('.er-st').forEach(bindPill);

        btn.addEventListener('click', () => {
            const row = document.createElement('div');
            row.className = 'er reveal visible';
            row.innerHTML = `
                <div class="er-ic" style="background:rgba(21,70,192,0.1)">💸</div>
                <div><div class="er-n">New Expense</div><div class="er-c">Business</div></div>
                <div class="er-r"><div class="er-a">₹${Math.floor(Math.random() * 2000 + 100)}</div><div class="er-st st-e">Pending</div></div>
            `;
            dash.appendChild(row);
            bindPill(row.querySelector('.er-st'));
        });
    }

    // --- CRM Demo ---
    function initCrmDemo() {
        document.querySelectorAll('#crm .dev-card span[style*="text-transform:uppercase"]').forEach(badge => {
            badge.addEventListener('click', () => {
                const states = ['New', 'Qualified', 'Won'];
                const colors = ['var(--blue)', 'var(--teal)', 'var(--purp)'];
                let idx = states.indexOf(badge.textContent.trim());
                idx = (idx + 1) % states.length;
                badge.textContent = states[idx];
                badge.style.color = colors[idx];
                badge.style.background = colors[idx].replace(')', '-g)');
            });
        });
    }

    // --- Health Demo ---
    function initHealthDemo() {
        const btn = document.getElementById('logHeart');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const val = document.querySelector('.hm:nth-child(1) .hm-val');
            if (val) val.textContent = (parseInt(val.textContent.replace(',', '')) + 120).toLocaleString();
            window.showExToast("Activity logged! Keep it up.");
        });
    }

    // --- Learning Progress ---
    function initLearningDemo() {
        document.querySelectorAll('.course-st').forEach(st => {
            st.addEventListener('click', () => {
                const isDone = st.classList.toggle('cs-done');
                st.classList.toggle('cs-prog', !isDone);
                st.textContent = isDone ? '✓ Done' : '▶ In Progress';
                
                const fill = document.querySelector('.lc-progress-fill');
                if (fill) {
                    const total = document.querySelectorAll('.course-st').length;
                    const done = document.querySelectorAll('.cs-done').length;
                    fill.style.width = `${(done/total)*100}%`;
                }
            });
        });
    }

    // --- Dev IDE Simulator ---
    function initDevIDE() {
        const run = document.getElementById('runCode');
        const ide = document.querySelector('.dev-ide-preview');
        if (!run || !ide) return;

        run.addEventListener('click', () => {
            const original = ide.innerHTML;
            ide.innerHTML = `<div style="color:var(--teal2)">> Initializing Explyra AI Compiler...</div><div style="color:var(--blue2)">> Optimization Level: MAX</div><div style="color:var(--amber)">> Build Successful. Performance +42%.</div>`;
            setTimeout(() => ide.innerHTML = original, 2500);
        });
    }

    // --- Hero Pills ---
    function initHeroPills() {
        document.querySelectorAll('.suite-pills .suite-pill').forEach(p => {
            p.addEventListener('click', () => {
                const target = document.querySelector(p.dataset.target || `#${p.textContent.toLowerCase().split(' ')[0]}`);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // --- AI Strip ---
    function initAiStrip() {
        document.querySelectorAll('.ai-f').forEach(f => {
            f.addEventListener('click', () => {
                f.style.transform = 'scale(1.1) rotate(2deg)';
                setTimeout(() => f.style.transform = '', 400);
            });
        });
    }

    // --- Video Modal ---
    function initVideoModal() {
        const modal = document.getElementById('videoModal');
        const trigger = document.getElementById('videoTrigger');
        const close = document.getElementById('closeVideo');
        const iframe = document.getElementById('videoIframe');
        const overlay = document.getElementById('videoOverlay');

        if (!modal || !trigger) return;

        trigger.addEventListener('click', () => {
            modal.classList.add('active');
            iframe.src = "https://www.youtube.com/embed/7Ti-C171jyw?autoplay=1";
            document.body.style.overflow = 'hidden';
        });

        const hide = () => {
            modal.classList.remove('active');
            iframe.src = "";
            document.body.style.overflow = '';
        };

        if (close) close.addEventListener('click', hide);
        if (overlay) overlay.addEventListener('click', hide);
    }

})();
