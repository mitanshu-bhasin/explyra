const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const KEY_FILE = path.join(__dirname, '..', 'explyras-7b760ded92c1.json');
const SITEMAP_FILE = path.join(__dirname, '..', 'sitemap.xml');

// Initialize Google Indexing API
async function submitUrls() {
    try {
        const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
        // Ensure private key handles newlines correctly
        keyData.private_key = keyData.private_key.replace(/\\n/g, '\n');

        const auth = new google.auth.GoogleAuth({
            credentials: keyData,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        const client = await auth.getClient();
        const indexing = google.indexing({
            version: 'v3',
            auth: client,
        });

        // Read and parse sitemap.xml
        const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf8');
        const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
        
        if (!urlMatches) {
            console.error("No URLs found in sitemap.xml");
            return;
        }

        const urls = [...new Set(urlMatches.map(m => m.replace(/<\/?loc>/g, '').trim()))];
        console.log(`🚀 Found ${urls.length} unique URLs. Starting submission...`);

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            try {
                process.stdout.write(`[${i + 1}/${urls.length}] Submitting: ${url} ... `);
                
                const res = await indexing.urlNotifications.publish({
                    requestBody: {
                        url: url,
                        type: 'URL_UPDATED',
                    },
                });

                console.log(`✅ Success (${res.status})`);
            } catch (err) {
                console.log(`❌ Failed: ${err.message}`);
            }
            
            // respect rate limits if many URLs
            if (i > 0 && i % 10 === 0) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }

        console.log("\n✨ Bulk indexing request completed.");
    } catch (criticalError) {
        console.error("Critical error in batch submission:", criticalError.message);
    }
}

submitUrls();
