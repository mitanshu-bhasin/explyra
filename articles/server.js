import express from 'express';
import cron from 'node-cron';
import path from 'path';
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

// API: Get latest articles for the frontend
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await getArticles(20);
        res.json(articles);
    } catch (e) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// API: Manual trigger for news generation (for testing/admin)
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
    console.log('[Automation] AI generated HTML article.');

    // Simple regex to extract H1 for title
    const titleMatch = htmlArticle.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'Tech News Update';

    const articleId = await saveArticle({
        title: title,
        content: htmlArticle,
        newsSources: newsItems.map(n => n.source)
    });

    console.log(`[Automation] Successfully saved article: ${articleId}`);
    return articleId;
}

// Scheduler: Run every 6 hours
cron.schedule('0 */6 * * *', () => {
    triggerAutomation().catch(console.error);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Daily News Scheduler initialized (every 6 hours)');
});
