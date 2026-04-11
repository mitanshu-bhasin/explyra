document.addEventListener('DOMContentLoaded', () => {
    const featuredSection = document.getElementById('featured-article');
    const articlesGrid = document.getElementById('articles-grid');
    const pastGrid = document.getElementById('past-articles-grid');
    const archiveGrid = document.getElementById('archive-grid');

    // Set Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateEls = document.querySelectorAll('.header-date, .current-date-display');
    const today = new Date().toLocaleDateString('en-US', options).toUpperCase();
    dateEls.forEach(el => el.innerText = today);

    // Fetch Articles
    async function fetchArticles() {
        try {
            const response = await fetch('/articles/api/articles');
            const articles = await response.json();

            if (!articles || articles.length === 0) {
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
        // Featured Article
        if (featuredSection && articles.length > 0) {
            const featured = articles[0];
            const featuredImage = featured.image || 'https://picsum.photos/seed/tech/1200/600';
            
            featuredSection.innerHTML = `
                <div class="featured-main" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; align-items: start;">
                    <div>
                        <div class="meta" style="color: #a00; font-weight: 800; font-size: 0.75rem; margin-bottom: 10px;">FEATURED DAILY TECH | ${new Date(featured.createdAt).toLocaleDateString()}</div>
                        <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 20px; cursor: pointer; line-height: 1.1;" onclick="location.href='/articles/generated/${featured.id}.html'">${featured.title}</h1>
                        <div class="summary" style="font-size: 1.1rem; color: #444; margin-bottom: 20px;">${stripHtml(featured.content).substring(0, 350)}...</div>
                        <a href="/articles/generated/${featured.id}.html" style="color: #a00; font-weight: 700; text-decoration: none; text-transform: uppercase; font-size: 0.8rem;">Read Full Analysis →</a>
                    </div>
                    <div class="featured-image-container">
                        <img src="${featuredImage}" style="width:100%; border-radius:4px; height:400px; object-fit:cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" onerror="this.src='https://picsum.photos/seed/techfallback/1200/600'">
                    </div>
                </div>
            `;
        }

        // Main Grid (Next 6 articles)
        if (articlesGrid) {
            articlesGrid.innerHTML = '';
            const mainArticles = articles.slice(1, 7);
            mainArticles.forEach(article => {
                articlesGrid.appendChild(createArticleCard(article));
            });
        }

        // Past Grid (Rest of articles)
        if (pastGrid) {
            pastGrid.innerHTML = '';
            const pastArticles = articles.slice(7, 15);
            pastArticles.forEach(article => {
                pastGrid.appendChild(createArticleCard(article, true));
            });
        }

        // Archive Grid (All)
        if (archiveGrid) {
            archiveGrid.innerHTML = '';
            articles.forEach(article => {
                archiveGrid.appendChild(createArticleCard(article));
            });
        }

        window.allArticles = articles;
    }

    function createArticleCard(article, isSmall = false) {
        const card = document.createElement('div');
        card.className = 'article-card';
        const cardImage = article.image || `https://picsum.photos/seed/${article.id}/600/400`;
        const dateStr = new Date(article.createdAt).toLocaleDateString();
        
        card.innerHTML = `
            <div class="image-wrapper" style="height: ${isSmall ? '150px' : '220px'}; overflow:hidden; border-radius:4px; margin-bottom:15px; background: #eee;">
                <img src="${cardImage}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://picsum.photos/seed/${article.id}/600/400'">
            </div>
            <div class="meta" style="font-size: 0.7rem; color: #a00; font-weight: 800; text-transform: uppercase; margin-bottom: 8px;">${article.newsSources ? article.newsSources[0] : 'TECH NEWS'} | ${dateStr}</div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: ${isSmall ? '1.1rem' : '1.4rem'}; line-height: 1.3; margin-bottom: 10px; cursor: pointer;" onclick="location.href='/articles/generated/${article.id}.html'">${article.title}</h3>
            ${isSmall ? '' : `<p style="font-size: 0.9rem; color: #666; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${stripHtml(article.content).substring(0, 150)}...</p>`}
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
