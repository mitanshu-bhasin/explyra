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

// ── DYNAMIC ARTICLE RECOVERY ROUTE ──
// If a user requests a generated article that doesn't exist on disk, 
// we fetch it from Firestore and render it on the fly.
app.get('/generated/:fileName', async (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(GEN_DIR, fileName);

    // If file exists, static middleware would have served it, 
    // but we add this as a fallback just in case.
    if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }

    try {
        console.log(`[Recovery] Article ${fileName} not found on disk. Attempting recovery from Firestore...`);
        const { db, doc, getDoc } = await import('./fb.config.js');
        const articleId = fileName.replace('.html', '');
        const articleRef = doc(db, "generated_articles", articleId);
        const articleSnap = await getDoc(articleRef);

        if (articleSnap.exists()) {
            const data = articleSnap.data();
            const templatePath = path.resolve(__dirname, '..', 'template.html');
            let template = fs.readFileSync(templatePath, 'utf8');

            const html = template
                .replace(/{{TITLE}}/g, data.title || 'Technical Report')
                .replace(/{{IMAGE}}/g, data.thumb || data.image || 'https://picsum.photos/seed/tech/1200/600')
                .replace(/{{CONTENT}}/g, data.content || '<p>Detailed analysis for this report is being synchronized...</p>');

            // Cache it back to disk for performance
            fs.writeFileSync(filePath, html);
            return res.send(html);
        }

        console.log(`[Recovery] No data found in Firestore for ${articleId}`);
        res.status(404).send('Article not found in archive');
    } catch (error) {
        console.error('[Recovery Error]', error);
        res.status(500).send('Error recovering article');
    }
});

// ── BATCH GENERATION API ──
app.post('/api/trigger', async (req, res) => {
    try {
        console.log('\n═══════════════════════════════════════');
        console.log('  EXPLYRA BATCH GENERATION STARTING');
        console.log('═══════════════════════════════════════\n');

        // Note: we are NOT deleting old files anymore so we can build an archive!
        // Get existing files to build the full list for index.html
        
        // Fetch 10 unique headlines
        const news = await fetchLatestTechNews();
        const newArticles = [];
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];

        for (let i = 0; i < news.length; i++) {
            const item = news[i];
            const html = await generateProfessionalArticle(item, i);
            
            // Create a smart SEO slug directly from title
            const safeTitle = (item.title || `tech-news-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const fileName = `${safeTitle.substring(0, 80)}.html`;
            const savePath = path.join(GEN_DIR, fileName);
            fs.writeFileSync(savePath, html);

            const thumbUrl = item.image || `https://picsum.photos/seed/card${i}${Date.now()}/400/250`;
            newArticles.push({
                title: item.title,
                description: (item.description || '').substring(0, 150),
                url: `/articles/generated/${fileName}`, // Updated to /articles/ base
                fileName: fileName,
                thumb: thumbUrl,
                source: item.source || 'Explyra Intelligence',
                category: ['AI & ML', 'Cloud', 'Security', 'Hardware', 'Software', 'Quantum', 'Space', 'Consumer', 'Enterprise', 'Regulation'][i % 10],
                date: today.toISOString()
            });
        }

        // Sync everything: index.html, sitemap, and feed
        syncEverything(newArticles);

        res.json({ success: true, count: newArticles.length, articles: newArticles });
    } catch (e) {
        console.error('[FATAL]', e);
        res.status(500).json({ success: false, error: e.message });
    }
});

function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           
      .replace(/[^\w\-]+/g, '')       
      .replace(/\-\-+/g, '-')         
      .replace(/^-+/, '')             
      .replace(/-+$/, '');            
}

/**
 * Updates index.html, archive.html, generates sitemap.xml and feed.xml
 */
function syncEverything(newArticles) {
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    const archivePath = path.join(PUBLIC_DIR, 'archive.html');
    
    // Read all existing generated articles from disk to build the full history
    const files = fs.readdirSync(GEN_DIR).filter(f => f.endsWith('.html'));
    
    // Sort files by name (which starts with date- if we use that, otherwise just stats)
    // Actually, let's keep track of them in a more robust way if possible, 
    // but for now we'll just sort by mtime (modification time) descending.
    const allArticles = files.map(f => {
        const stats = fs.statSync(path.join(GEN_DIR, f));
        // We need the title from the file content if possible, or just parse from filename
        // Let's assume the filename is the slug.
        const slug = f.replace('.html', '');
        const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        return {
            title: title,
            url: `/articles/generated/${f}`,
            date: stats.mtime,
            fileName: f
        };
    }).sort((a, b) => b.date - a.date);

    // 1. Sync index.html (Latest 10)
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        const latestArticles = allArticles.slice(0, 10);
        const feedCards = latestArticles.map(art => `
                <div class="article-card">
                    <div class="meta">INTELLIGENCE REPORT</div>
                    <h3 style="cursor:pointer;"><a href="${art.url}" target="_blank" style="color:inherit;text-decoration:none;">${art.title}</a></h3>
                    <p>Authoritative technical analysis and deep-dive report on ${art.title}...</p>
                    <a href="${art.url}" target="_blank" style="color:#a00;font-weight:700;font-size:0.85rem;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">Read Full Report →</a>
                </div>`).join('\n');

        const gridRegex = /(<div id="articles-grid" class="masonry-grid">)([\s\S]*?)(<\/div>)/;
        if (content.match(gridRegex)) {
            content = content.replace(gridRegex, `$1\n${feedCards}\n            $3`);
        }
        
        // Past 3
        const pastArticles = allArticles.slice(10, 13);
        const pastCards = pastArticles.map(art => `
                <div class="article-card past-card" style="opacity: 0.85;">
                    <div class="meta">PAST BRIEF | ${art.date.toISOString().split('T')[0]}</div>
                    <h4 style="font-size:1.1rem;margin-bottom:5px;"><a href="${art.url}" target="_blank" style="color:inherit;text-decoration:none;">${art.title}</a></h4>
                    <a href="${art.url}" target="_blank" style="color:#a00;font-size:0.75rem;text-transform:uppercase;">Read Base Report →</a>
                </div>`).join('\n');

        const pastRegex = /(<div id="past-articles-grid" class="past-grid">)([\s\S]*?)(<\/div>)/;
        if (content.match(pastRegex)) {
            content = content.replace(pastRegex, `$1\n${pastCards}\n            $3`);
        }

        fs.writeFileSync(indexPath, content);
    }

    // 2. Sync archive.html (Everything)
    if (fs.existsSync(archivePath)) {
        let content = fs.readFileSync(archivePath, 'utf8');
        const archiveCards = allArticles.map(art => `
                <div class="article-card">
                    <div class="meta">${art.date.toISOString().split('T')[0]} | EXPLYRA</div>
                    <h3><a href="${art.url}" target="_blank">${art.title}</a></h3>
                    <p>Deep-dive research into the implications of ${art.title}. Published for Explyra Tech Intelligence.</p>
                </div>`).join('\n');

        const targetRegex = /(<div id="archive-grid" class="archive-grid">)([\s\S]*?)(<\/div>)/;
        if (content.match(targetRegex)) {
            content = content.replace(targetRegex, `$1\n${archiveCards}\n            $3`);
            fs.writeFileSync(archivePath, content);
        }
    }

    // 3. Generate sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://explyra.me/articles/</loc><priority>1.0</priority></url>
    <url><loc>https://explyra.me/articles/archive.html</loc><priority>0.8</priority></url>
    ${allArticles.map(art => `<url><loc>https://explyra.me${art.url}</loc><lastmod>${art.date.toISOString().split('T')[0]}</lastmod></url>`).join('\n    ')}
</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);

    // 4. Generate feed.xml
    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
    <title>Explyra Tech Intelligence Feed</title>
    <link>https://explyra.me/articles/</link>
    <description>Daily authoritative technical reports and news analysis.</description>
    <language>en-us</language>
    ${allArticles.map(art => `
    <item>
        <title>${art.title.replace(/&/g, '&amp;')}</title>
        <link>https://explyra.me${art.url}</link>
        <description>Authoritative intelligence report from Explyra Tech.</description>
        <pubDate>${art.date.toUTCString()}</pubDate>
    </item>`).join('')}
</channel>
</rss>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), feed);

    console.log('[Sync] ✅ Archive synced. Total Articles: ' + allArticles.length);
}

app.listen(PORT, () => {
    console.log(`\n⚡ EXPLYRA TECH — UNIFIED SERVER LIVE (PORT ${PORT})`);
});
