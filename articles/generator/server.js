import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { fetchLatestTechNews } from './services/newsService.js';
import { generateProfessionalArticle } from './services/aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const GEN_DIR = path.join(PUBLIC_DIR, 'generated');

if (!fs.existsSync(GEN_DIR)) fs.mkdirSync(GEN_DIR, { recursive: true });

const app = express();
const PORT = 7777;

app.use(cors());
app.use(express.json());

// ── PATH NORMALIZATION (FOR SUBFOLDER) ──
app.use((req, res, next) => {
    const original = req.url;
    if (req.url.startsWith('/articles/')) {
        req.url = req.url.substring(9);
    } else if (req.url === '/articles') {
        req.url = '/';
    }
    if (req.url === '/' || req.url === '') {
        req.url = '/index.html';
    }
    next();
});

// ── API ROUTES ──

app.get('/api/articles', async (req, res) => {
    try {
        const { db, collection, getDocs, query, orderBy, limit } = await import('./fb.config.js');
        const q = query(collection(db, "generated_articles"), orderBy("createdAt", "desc"), limit(50));
        const querySnapshot = await getDocs(q);
        const articles = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            articles.push({ id: doc.id, ...data });
        });
        res.json(articles);
    } catch (e) {
        res.json([]);
    }
});

app.get('/api/trigger', async (req, res) => {
    console.log('[API] Batch generation started...');
    try {
        const news = await fetchLatestTechNews();
        const { db, doc, setDoc } = await import('./fb.config.js');
        const newArticles = [];

        for (let i = 0; i < news.length; i++) {
            const item = news[i];
            const html = await generateProfessionalArticle(item, i);
            const safeTitle = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const fileName = `${safeTitle.substring(0, 80)}.html`;
            
            fs.writeFileSync(path.join(GEN_DIR, fileName), html);

            const artData = {
                title: item.title,
                url: `/articles/generated/${fileName}`,
                thumb: item.image || `https://picsum.photos/seed/${i}${Date.now()}/600/400`,
                createdAt: Date.now(),
                newsSources: item.source || 'Explyra Tech',
                content: html
            };

            await setDoc(doc(db, "generated_articles", safeTitle), artData);
            newArticles.push(artData);
            console.log(`[AI] Generated: ${safeTitle}`);
        }
        
        syncInfrastructure(newArticles);
        res.json({ success: true, count: newArticles.length });
    } catch (e) {
        console.error('[API Error]', e);
        res.status(500).json({ error: e.message });
    }
});

app.get('/generated/:fileName', (req, res) => {
    const filePath = path.join(GEN_DIR, req.params.fileName);
    if (fs.existsSync(filePath)) return res.sendFile(filePath);
    res.status(404).send('Article not found');
});

// ── STATIC ──
app.use(express.static(PUBLIC_DIR));

function syncInfrastructure(newArticles) {
    const files = fs.readdirSync(GEN_DIR).filter(f => f.endsWith('.html'));
    const allArticles = files.map(f => {
        const stats = fs.statSync(path.join(GEN_DIR, f));
        return {
            title: f.replace('.html', '').replace(/-/g, ' '),
            url: `/articles/generated/${f}`,
            date: stats.mtime
        };
    }).sort((a, b) => b.date - a.date);

    // Sitemap & RSS
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://explyra.me/articles/</loc></url>
    ${allArticles.map(art => `<url><loc>https://explyra.me${art.url}</loc></url>`).join('')}
    </urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);

    const rss = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Explyra Tech</title>
    ${allArticles.map(art => `<item><title>${art.title}</title><link>https://explyra.me${art.url}</link></item>`).join('')}
    </channel></rss>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), rss);
    
    console.log('[Sync] ✅ Infrastructure updated.');
}

app.listen(PORT, () => console.log(`⚡ EXPLYRA LIVE ON ${PORT}`));
