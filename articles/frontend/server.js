import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const app = express();
const PORT = 3000;

// Serve public directory at root
app.use(express.static(PUBLIC_DIR));

// Fallback to index.html for SPA-like behavior or just home access
app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`📱 Frontend Blog: http://localhost:${PORT}`);
});
