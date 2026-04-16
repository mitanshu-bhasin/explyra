import fs from 'fs';
import path from 'path';
import { GoogleAuth } from 'google-auth-library';

const SITEMAP_PATH = path.join(process.cwd(), 'minify_xx', 'articles', 'public', 'sitemap.xml');
const KEY_FILE = path.join(process.cwd(), 'articles', 'explyras-service-account.json');

async function run() {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error('Sitemap not found at:', SITEMAP_PATH);
        return;
    }

    const content = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const urls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(content)) !== null) {
        urls.push(match[1]);
    }

    console.log(`Found ${urls.length} URLs in sitemap.`);

    const auth = new GoogleAuth({
        keyFile: KEY_FILE,
        scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const client = await auth.getClient();

    for (const url of urls) {
        console.log(`Submitting Indexing Request for: ${url}...`);
        try {
            const res = await client.request({
                url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
                method: 'POST',
                data: {
                    url: url,
                    type: 'URL_UPDATED'
                }
            });
            console.log(`[Success] ${url}`);
        } catch (err) {
            console.error(`[Error] ${url}:`, err.message);
        }
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('--- Finished Indexing ---');
}

run();
