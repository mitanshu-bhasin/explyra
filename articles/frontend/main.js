document.addEventListener('DOMContentLoaded', () => {
    const featuredSection = document.getElementById('featured-article');
    const articlesGrid = document.getElementById('articles-grid');
    const modal = document.getElementById('article-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Set Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('en-US', options).toUpperCase();

    // Fetch Articles
    async function fetchArticles() {
        try {
            const response = await fetch('/api/articles');
            const articles = await response.json();

            if (articles.length === 0) {
                featuredSection.innerHTML = '<p>No intelligence reports found. Initialization required.</p>';
                return;
            }

            renderArticles(articles);
        } catch (error) {
            console.error('Fetch error:', error);
            featuredSection.innerHTML = '<p>Error connecting to intelligence network.</p>';
        }
    }

    function renderArticles(articles) {
        // Featured Article (First one)
        const featured = articles[0];
        featuredSection.innerHTML = `
            <div class="featured-main">
                <div class="meta">FEATURED DAILY TECH | ${new Date(featured.createdAt).toLocaleDateString()}</div>
                <h1 onclick="openArticle('${featured.id}')">${featured.title}</h1>
                <div class="summary">
                    ${stripHtml(featured.content).substring(0, 300)}...
                </div>
            </div>
            <div class="featured-side">
                <blockquote style="border-left: 2px solid var(--accent-color); padding: 10px; font-style: italic;">
                    "Artificial Intelligence is not a tool, it's a teammate. This report analyzes the fundamental shift in technical paradigms."
                </blockquote>
            </div>
        `;

        // Remaining Articles
        articlesGrid.innerHTML = '';
        articles.slice(1).forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <div class="meta">${article.newsSources ? article.newsSources[0] : 'TECH NEWS'}</div>
                <h3 onclick="openArticle('${article.id}')">${article.title}</h3>
                <p>${stripHtml(article.content).substring(0, 150)}...</p>
            `;
            articlesGrid.appendChild(card);
        });

        // Store articles globally for modal
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
