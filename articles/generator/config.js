import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load from project root .env (CWD when running `node generator/server.js` from articles/)
dotenv.config();

// Also try generator/.env as secondary source
dotenv.config({ path: path.resolve('generator', '.env') });

/**
 * Gracefully parses the fb.config file to extract firebase configuration.
 */
function parseFbConfig() {
    try {
        const configPath = path.resolve('fb.config');
        let firebaseConfig = null;

        if (fs.existsSync(configPath)) {
            const content = fs.readFileSync(configPath, 'utf-8');
            const match = content.match(/const firebaseConfig = ({[\s\S]+?});/);
            if (match) {
                const rawObj = match[1]
                    .replace(/^\s*(\w+):/gm, (m, p1) => `"${p1}":`)
                    .replace(/'/g, '"')
                    .replace(/,(\s*[}\]])/g, '$1');
                firebaseConfig = JSON.parse(rawObj);
            }
        }

        return {
            firebase: firebaseConfig,
            geminiKey: process.env.GEMINI_API_KEY || '',
            newsKey: process.env.NEWS_API_KEY || '',      // NewsData.io fallback
            gnewsKey: process.env.n2 || '',                // GNews primary
        };
    } catch (error) {
        console.error('Error parsing config:', error.message);
        return {
            firebase: null,
            geminiKey: process.env.GEMINI_API_KEY || '',
            newsKey: process.env.NEWS_API_KEY || '',
            gnewsKey: process.env.n2 || '',
        };
    }
}

const config = parseFbConfig();

console.log('[Config] Gemini Key:', config.geminiKey ? '✅ Loaded' : '❌ Missing');
console.log('[Config] GNews Key (n2):', config.gnewsKey ? '✅ Loaded' : '❌ Missing');
console.log('[Config] NewsData Key:', config.newsKey ? '✅ Loaded' : '❌ Missing');

export default config;
