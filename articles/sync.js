import fs from 'fs';
import path from 'path';

const CLOUD_URL = 'https://explyra-news-engine-3k63eqvzfa-uc.a.run.app';

async function downloadArticles() {
    console.log(`--- FETCHING ARTICLES FROM: ${CLOUD_URL} ---`);
    const outputDir = path.resolve('public', 'generated');
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Try fetching the feed or sitemap to get the list, or fetch directly
    const articlesToFetch = 10;
    let fetchedCount = 0;

    for (let i = 1; i <= articlesToFetch; i++) {
        const fileName = `article_${i}.html`;
        const fileUrl = `${CLOUD_URL}/generated/${fileName}`;
        
        try {
            const response = await fetch(fileUrl);
            if (response.ok) {
                const html = await response.text();
                fs.writeFileSync(path.join(outputDir, fileName), html);
                console.log(`✅ Downloaded: ${fileName} (${html.length} bytes)`);
                fetchedCount++;
            } else {
                console.log(`⚠️ Skipped ${fileName}: HTTP ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ Failed to fetch ${fileName}:`, error.message);
        }
    }

    // Also try to download index.html which has the frontend layout for these
    try {
        const idxRes = await fetch(`${CLOUD_URL}/index.html`);
        if (idxRes.ok) {
            const idxHtml = await idxRes.text();
            fs.writeFileSync(path.resolve('public', 'index.html'), idxHtml);
            console.log(`✅ Downloaded: index.html (Updated feeds)`);
        }
    } catch(e) {
         console.error(`❌ Failed to fetch index.html:`, e.message);
    }
    
    console.log(`--- DOWNLOAD COMPLETE: ${fetchedCount} articles synced ---`);
}

downloadArticles();
