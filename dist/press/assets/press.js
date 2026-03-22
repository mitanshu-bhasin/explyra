/* ═══════════════════════════════════════════
   PRESS & NEWS SCRIPTS
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only apply reveal to cards and body sections, not the main header/hero
    document.querySelectorAll('.news-card, .featured-image-container, .article-body').forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });

    // 2. Share Functionality
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-type');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            let shareUrl = '';
            switch(type) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'link':
                    navigator.clipboard.writeText(window.location.href);
                    // Show a small toast or change icon briefly
                    const icon = btn.querySelector('i');
                    icon.className = 'fa-solid fa-check';
                    setTimeout(() => {
                        icon.className = 'fa-solid fa-link';
                    }, 2000);
                    return;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
});
