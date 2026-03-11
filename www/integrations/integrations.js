/* integrations.js - Theme handling and subtle interactions */

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('explyra-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    // Sync theme with main site if possible (listening for changes if needed)
    window.addEventListener('storage', (e) => {
        if (e.key === 'explyra-theme') {
            html.setAttribute('data-theme', e.newValue);
        }
    });

    // Reveal animation for cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});
