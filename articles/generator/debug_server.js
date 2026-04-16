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
const PORT = 8888;

app.use(cors());
app.use(express.json());

// API - Trigger
app.get('/api/trigger', async (req, res) => {
    console.log('[DEBUG] Trigger Hit');
    try {
        const news = await fetchLatestTechNews();
        res.json({ news_found: news ? news.length : 0 });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'live', port: PORT });
});

app.listen(PORT, () => {
    console.log(`[DEBUG] Server listening on ${PORT}`);
});
