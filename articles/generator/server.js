import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { fetchLatestTechNews } from './services/newsService.js';
import { generateProfessionalArticle } from './services/aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute paths — bullet-proof resolution
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const GEN_DIR = path.join(PUBLIC_DIR, 'generated');

// Ensure output folder exists
if (!fs.existsSync(GEN_DIR)) fs.mkdirSync(GEN_DIR, { recursive: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Permissive CSP for local dev
app.use((req, res, next) => {
    res.removeHeader('Content-Security-Policy');
    next();
});

// Serve static files from public/
app.use(express.static(PUBLIC_DIR));

// Explicit route for generator dashboard
app.get('/x.html', (req, res) => {
    const xPath = path.join(__dirname, 'public', 'x.html');
    if (fs.existsSync(xPath)) return res.sendFile(xPath);
    res.status(404).send('Generator dashboard not found');
});

// ── BATCH GENERATION API ──
app.post('/api/trigger', async (req, res) => {
    try {
        console.log('\n═══════════════════════════════════════');
        console.log('  EXPLYRA BATCH GENERATION STARTING');
        console.log('═══════════════════════════════════════\n');

        // Clear old generated files
        const oldFiles = fs.readdirSync(GEN_DIR).filter(f => f.endsWith('.html'));
        oldFiles.forEach(f => fs.unlinkSync(path.join(GEN_DIR, f)));

        // Fetch 10 unique headlines
        const news = await fetchLatestTechNews();
        const articles = [];

        for (let i = 0; i < news.length; i++) {
            const item = news[i];
            const html = await generateProfessionalArticle(item, i);
            const fileName = `article_${i + 1}.html`;
            const savePath = path.join(GEN_DIR, fileName);
            fs.writeFileSync(savePath, html);

            const thumbUrl = item.image || `https://picsum.photos/seed/card${i}${Date.now()}/400/250`;
            articles.push({
                title: item.title,
                description: (item.description || '').substring(0, 120),
                url: `/generated/${fileName}`,
                thumb: thumbUrl,
                source: item.source || 'Explyra Intelligence',
                category: ['AI & ML', 'Cloud', 'Security', 'Hardware', 'Software', 'Quantum', 'Space', 'Consumer', 'Enterprise', 'Regulation'][i % 10],
                date: new Date().toISOString()
            });
        }

        // Sync everything: index.html, sitemap, and feed
        syncEverything(articles);

        res.json({ success: true, count: articles.length, articles });
    } catch (e) {
        console.error('[FATAL]', e);
        res.status(500).json({ success: false, error: e.message });
    }
});

/**
 * Updates index.html, generates sitemap.xml and feed.xml
 */
function syncEverything(articles) {
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    
    // 1. Sync index.html (Main 10 Articles)
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        const feedCards = articles.map(art => `
                <div class="article-card">
                    <img src="${art.thumb}" alt="${art.title}" style="width:100%;height:200px;object-fit:cover;border-radius:4px;margin-bottom:12px;">
                    <div class="meta">${art.category}</div>
                    <h3 style="cursor:pointer;"><a href="${art.url}" target="_blank" style="color:inherit;text-decoration:none;">${art.title}</a></h3>
                    <p>${art.description}...</p>
                    <a href="${art.url}" target="_blank" style="color:#a00;font-weight:700;font-size:0.85rem;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">Read Full Report →</a>
                </div>`).join('\n');

        const gridRegex = /(<div id="articles-grid" class="masonry-grid">)([\s\S]*?)(<\/div>)/;
        if (content.match(gridRegex)) {
            content = content.replace(gridRegex, `$1\n${feedCards}\n            $3`);
            fs.writeFileSync(indexPath, content);
        }
    }

    // 2. Generate sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://explyra.me/</loc><priority>1.0</priority></url>
    ${articles.map(art => `<url><loc>https://explyra.me${art.url.replace('/generated/', '/article/')}</loc><lastmod>${art.date.split('T')[0]}</lastmod></url>`).join('\n    ')}
</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);

    // 3. Generate feed.xml (RSS 2.0)
    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
    <title>Explyra Tech Intelligence Feed</title>
    <link>https://explyra.me</link>
    <description>Daily authoritative technical reports and news analysis.</description>
    ${articles.map(art => `
    <item>
        <title>${art.title.replace(/&/g, '&amp;')}</title>
        <link>https://explyra.me${art.url.replace('/generated/', '/article/')}</link>
        <description>${art.description.replace(/&/g, '&amp;')}</description>
        <pubDate>${new Date(art.date).toUTCString()}</pubDate>
    </item>`).join('')}
</channel>
</rss>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), feed);

    console.log('[Sync] ✅ index.html, sitemap.xml, and feed.xml updated.');
}

app.listen(PORT, () => {
    console.log(`\n⚡ EXPLYRA TECH — UNIFIED SERVER LIVE (PORT ${PORT})`);
});
