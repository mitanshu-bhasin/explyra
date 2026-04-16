document.addEventListener('DOMContentLoaded', () => {
    const featuredSection = document.getElementById('featured-article');
    const articlesGrid = document.getElementById('articles-grid');
    const pastGrid = document.getElementById('past-articles-grid');

    // Set Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateEls = document.querySelectorAll('.current-date-display');
    const today = new Date().toLocaleDateString('en-US', options).toUpperCase();
    dateEls.forEach(el => el.innerText = today);

    // Fetch Articles
    async function fetchArticles() {
        try {
            const response = await fetch('/articles/api/articles');
            const articles = await response.json();

            if (!articles || articles.length === 0) {
                if (featuredSection) featuredSection.innerHTML = '<div class="featured-article-card"><div class="featured-content"><h1>Intelligence Stream Offline</h1><p class="summary">No reports found in the current sector.</p></div></div>';
                return;
            }

            renderArticles(articles);
        } catch (error) {
            console.error('Fetch error:', error);
            if (featuredSection) featuredSection.innerHTML = '<div class="featured-article-card"><div class="featured-content"><h1>Connection Interrupted</h1><p class="summary">Unable to sync with Explyra Intel nodes.</p></div></div>';
        }
    }

    function renderArticles(articles) {
        // Featured Article
        if (featuredSection && articles.length > 0) {
            const featured = articles[0];
            const featuredImage = featured.image || 'https://picsum.photos/seed/tech/1200/600';
            
            featuredSection.innerHTML = `
                <div class="featured-article-card" onclick="location.href='/articles/generated/${featured.id}.html'">
                    <div class="featured-content">
                        <div class="card-meta">
                            <span>PRIORITY INTELLIGENCE</span>
                            <span>${new Date(featured.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h1>${featured.title}</h1>
                        <p class="summary">${stripHtml(featured.content).substring(0, 280)}...</p>
                        <div class="btn-premium" style="display: inline-block;">Read Full Report</div>
                    </div>
                    <div class="featured-image-container">
                        <img src="${featuredImage}" onerror="this.src='https://picsum.photos/seed/techfallback/1200/600'">
                    </div>
                </div>
            `;
        }

        // Main Grid (Next 6 articles)
        if (articlesGrid) {
            articlesGrid.innerHTML = '';
            const mainArticles = articles.slice(1, 4); // Show top 3 in main briefings
            mainArticles.forEach(article => {
                articlesGrid.appendChild(createArticleCard(article));
            });
        }

        // Past Grid (Rest of articles)
        if (pastGrid) {
            pastGrid.innerHTML = '';
            const pastArticles = articles.slice(4, 12);
            pastArticles.forEach(article => {
                pastGrid.appendChild(createArticleCard(article, true));
            });
        }
    }

    function createArticleCard(article, isSmall = false) {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.onclick = () => location.href = `/articles/generated/${article.id}.html`;
        
        const cardImage = article.image || `https://picsum.photos/seed/${article.id}/600/400`;
        const dateStr = new Date(article.createdAt).toLocaleDateString();
        const category = article.newsSources ? article.newsSources[0] : 'TECH NEWS';
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${cardImage}" onerror="this.src='https://picsum.photos/seed/${article.id}/600/400'">
            </div>
            <div class="card-meta">
                <span>${category}</span>
                <span>${dateStr}</span>
            </div>
            <h3>${article.title}</h3>
            ${isSmall ? '' : `<p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${stripHtml(article.content).substring(0, 120)}...</p>`}
        `;
        return card;
    }

    function stripHtml(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    fetchArticles();
});
