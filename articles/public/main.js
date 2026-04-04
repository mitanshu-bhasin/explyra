document.addEventListener('DOMContentLoaded', () => {
    const featuredSection = document.getElementById('featured-article');
    const articlesGrid = document.getElementById('articles-grid') || document.getElementById('archive-grid');
    const modal = document.getElementById('article-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Set Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString('en-US', options).toUpperCase();

    // Fetch Articles
    async function fetchArticles() {
        try {
            const response = await fetch('/api/articles');
            const articles = await response.json();

            if (articles.length === 0) {
                if (featuredSection) featuredSection.innerHTML = '<p>No intelligence reports found.</p>';
                return;
            }

            renderArticles(articles);
        } catch (error) {
            console.error('Fetch error:', error);
            if (featuredSection) featuredSection.innerHTML = '<p>Error connecting to intelligence network.</p>';
        }
    }

    function renderArticles(articles) {
        // Featured Article (Only if section exists)
        if (featuredSection && articles.length > 0) {
            const featured = articles[0];
            const featuredImage = featured.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200';
            
            featuredSection.innerHTML = `
                <div class="featured-main">
                    <div class="meta">FEATURED DAILY TECH | ${new Date(featured.createdAt).toLocaleDateString()}</div>
                    <h1 onclick="location.href='/generated/article_${featured.id}.html'">${featured.title}</h1>
                    <div class="summary">${stripHtml(featured.content).substring(0, 300)}...</div>
                    <div class="featured-image-container" style="margin-top:20px;">
                        <img src="${featuredImage}" style="width:100%; border-radius:8px; height:350px; object-fit:cover;" onerror="this.src='https://picsum.photos/seed/tech/1200/600'">
                    </div>
                </div>
                <div class="featured-side">
                    <blockquote style="border-left: 2px solid #a00; padding: 10px; font-style: italic;">
                        "AI analysis engine initialized. Mapping technical paradigms across global vectors."
                    </blockquote>
                </div>
            `;
        }

        // Grid Articles
        if (articlesGrid) {
            articlesGrid.innerHTML = '';
            // If on archive, show all. If on index, maybe skip the featured one?
            const startIdx = featuredSection ? 1 : 0;
            articles.slice(startIdx).forEach(article => {
                const card = document.createElement('div');
                card.className = 'article-card';
                const cardImage = article.image || `https://picsum.photos/seed/${article.id}/600/400`;
                
                card.innerHTML = `
                    <div class="image-wrapper" style="height:200px; overflow:hidden; border-radius:8px; margin-bottom:15px;">
                        <img src="${cardImage}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div class="meta">${article.newsSources ? article.newsSources[0] : 'TECH NEWS'}</div>
                    <h3 onclick="location.href='/generated/article_${article.id}.html'">${article.title}</h3>
                    <p>${stripHtml(article.content).substring(0, 150)}...</p>
                `;
                articlesGrid.appendChild(card);
            });
        }

        window.allArticles = articles;
    }

    window.openArticle = (id) => {
        const article = window.allArticles.find(a => a.id === id);
        if (article) {
            modalBody.innerHTML = article.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Stop scroll
        }
    };

    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    function stripHtml(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    fetchArticles();
});
