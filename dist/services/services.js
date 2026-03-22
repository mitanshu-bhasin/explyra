/* ═══════════════════════════════════════════
   SERVICES PAGE LOGIC
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. THEME INITIALIZATION
    const html = document.documentElement;
    const themePill = document.getElementById('themePill');
    const themeLabel = document.getElementById('themeLabel');
    
    const savedTheme = localStorage.getItem('explyra-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    if (themeLabel) themeLabel.textContent = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);

    if (themePill) {
        themePill.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('explyra-theme', newTheme);
            if (themeLabel) themeLabel.textContent = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
        });
    }

    // 2. CUSTOM CURSOR
    const cursor = document.getElementById('ex-cursor');
    const dot = cursor.querySelector('.ex-dot');
    const ring = cursor.querySelector('.ex-ring');
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    const animateCursor = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .service-category, .feature-card, .testimonial-card, .faq-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });

    // 3. BACKGROUND PARTICLES
    const particleContainer = document.getElementById('particle-container');
    const createParticle = () => {
        const p = document.createElement('div');
        p.className = 'p-dot';
        
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        
        p.style.opacity = Math.random() * 0.5;
        p.style.animationDuration = (Math.random() * 10 + 10) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        
        particleContainer.appendChild(p);
        
        // Remove after animation
        setTimeout(() => {
            p.remove();
        }, 20000);
    };

    for(let i = 0; i < 20; i++) createParticle();
    setInterval(createParticle, 2000);

    // 4. SCROLL REVEAL (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. PARALLAX HERO
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(1.1)`;
        }
    });

    // 6. FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 7. SMOOTH SCROLL FOR ANCHORS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 8. IMAGE MODAL (PDP PREVIEW)
    const imgModal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const closeImgModal = document.querySelector('.img-modal-close');
    const sampleLinks = document.querySelectorAll('.sample-link');

    if (imgModal && modalImg) {
        sampleLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = link.getAttribute('data-sample');
                modalImg.src = imgSrc;
                imgModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeFunc = () => {
            imgModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeImgModal) closeImgModal.addEventListener('click', closeFunc);
        imgModal.querySelector('.img-modal-overlay').addEventListener('click', closeFunc);

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imgModal.classList.contains('active')) closeFunc();
        });
    }
});
