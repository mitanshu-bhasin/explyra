import express from 'express';
import cron from 'node-cron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { fetchLatestTechNews } from './services/newsService.js';
import { generateProfessionalArticle } from './services/aiService.js';
import { saveArticle, getArticles } from './services/firebaseService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// SEO Routes
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// API: Get latest articles for the frontend
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await getArticles(30);
        res.json(articles);
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// Dynamic Article Viewer (Fallback if static file missing)
app.get('/generated/article_:id.html', async (req, res) => {
    try {
        const { id } = req.params;
        const articles = await getArticles(100);
        const article = articles.find(a => a.id === id);

        if (!article) {
            return res.status(404).send('Article not found');
        }

        const templatePath = path.resolve(__dirname, 'template.html');
        if (fs.existsSync(templatePath)) {
            let template = fs.readFileSync(templatePath, 'utf-8');
            const dateStr = new Date(article.createdAt || Date.now()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase();

            const finalHtml = template
                .replace(/{{TITLE}}/g, article.title)
                .replace(/{{DESCRIPTION}}/g, article.description || '')
                .replace(/{{IMAGE}}/g, article.image || '')
                .replace(/{{DATE}}/g, dateStr)
                .replace(/{{CONTENT}}/g, article.content);

            res.send(finalHtml);
        } else {
            res.send(article.content);
        }
    } catch (e) {
        res.status(500).send('Error rendering article');
    }
});

// API: Manual trigger for news generation
app.post('/api/generate', async (req, res) => {
    try {
        const result = await triggerAutomation();
        res.json({ success: true, articleId: result });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Automation Logic
async function triggerAutomation() {
    console.log('[Automation] Starting news cycle...');
    const newsItems = await fetchLatestTechNews();
    console.log(`[Automation] Fetched ${newsItems.length} news items.`);

    const htmlArticle = await generateProfessionalArticle(newsItems);
    console.log('[Automation] AI generated HTML article content.');

    // Extract title
    const titleMatch = htmlArticle.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'Tech News Update';
    
    // Choose primary image
    const image = (newsItems[0] && newsItems[0].urlToImage) || 'https://picsum.photos/seed/tech/1200/600';
    const description = (newsItems[0] && newsItems[0].description) || 'Deep-dive technical analysis of the latest industry developments.';

    const articleData = {
        title: title,
        content: htmlArticle,
        image: image,
        description: description,
        newsSources: newsItems.map(n => n.source)
    };

    const articleId = await saveArticle(articleData);
    console.log(`[Automation] Successfully saved article: ${articleId}`);

    // --- Generate Static HTML ---
    try {
        const templatePath = path.resolve(__dirname, 'template.html');
        if (fs.existsSync(templatePath)) {
            let template = fs.readFileSync(templatePath, 'utf-8');
            const now = new Date();
            const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase();

            const finalHtml = template
                .replace(/{{TITLE}}/g, title)
                .replace(/{{DESCRIPTION}}/g, description)
                .replace(/{{IMAGE}}/g, image)
                .replace(/{{DATE}}/g, dateStr)
                .replace(/{{CONTENT}}/g, htmlArticle);

            const outputDir = path.join(__dirname, 'public', 'generated');
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

            const fileName = `article_${articleId}.html`;
            fs.writeFileSync(path.join(outputDir, fileName), finalHtml);
            console.log(`[Automation] Generated static file: /generated/${fileName}`);
            
            updateSEOFiles();
        }
    } catch (err) {
        console.error('[Automation] Static generation failed:', err.message);
    }

    return articleId;
}

function updateSEOFiles() {
    const publicDir = path.join(__dirname, 'public');
    const genDir = path.join(publicDir, 'generated');
    if (!fs.existsSync(genDir)) return;

    const robots = `User-agent: *\nAllow: /\nSitemap: https://explyra.me/articles/sitemap.xml`;
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);

    const files = fs.readdirSync(genDir).filter(f => f.endsWith('.html'));
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    sitemap += `  <url><loc>https://explyra.me/articles/</loc><priority>1.0</priority></url>\n`;
    sitemap += `  <url><loc>https://explyra.me/articles/archive.html</loc><priority>0.8</priority></url>\n`;
    files.forEach(f => { sitemap += `  <url><loc>https://explyra.me/articles/generated/${f}</loc><priority>0.9</priority></url>\n`; });
    sitemap += `</urlset>`;
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
}

// Scheduler: Run every 6 hours
cron.schedule('0 */6 * * *', () => {
    triggerAutomation().catch(console.error);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
