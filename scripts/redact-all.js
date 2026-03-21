const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '..');

const keysToRedact = [
    { key: 'REDACTED_FIREBASE_API_KEY', replacement: 'REDACTED_FIREBASE_API_KEY' },
    { key: 'REDACTED_GROQ_API_KEY', replacement: 'REDACTED_GROQ_API_KEY' },
    { key: 'REDACTED_CLOUDFLARE_TOKEN', replacement: 'REDACTED_CLOUDFLARE_TOKEN' },
    { key: 'REDACTED_RESEND_KEY', replacement: 'REDACTED_RESEND_KEY' },
    { key: 'REDACTED_IMAGEKIT_PUBLIC', replacement: 'REDACTED_IMAGEKIT_PUBLIC' },
    { key: 'REDACTED_IMAGEKIT_PRIVATE', replacement: 'REDACTED_IMAGEKIT_PRIVATE' },
    { key: 'REDACTED_EMAILJS_KEY', replacement: 'REDACTED_EMAILJS_KEY' },
    { key: 'REDACTED_GEMINI_KEY', replacement: 'REDACTED_GEMINI_KEY' },
    { key: 'REDACTED_GROQ_API_KEY_2', replacement: 'REDACTED_GROQ_API_KEY_2' },
    { key: 'REDACTED_KEY_2', replacement: 'REDACTED_KEY_2' },
    { key: 'REDACTED_GROQ_API_KEY_3', replacement: 'REDACTED_GROQ_API_KEY_3' },
    { key: 'REDACTED_KEY_3', replacement: 'REDACTED_KEY_3' }
];

function walkDir(dir) {
    if (dir.includes('node_modules') || dir.includes('.git')) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.html') || fullPath.endsWith('.md')) {
            if (fullPath.endsWith('env.js') || fullPath.endsWith('sync-env.js') || fullPath.endsWith('.env')) continue;
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const {key, replacement} of keysToRedact) {
                if (content.includes(key)) {
                    // Do simple string replacement
                    content = content.split(key).join(replacement);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Secured ${fullPath}`);
            }
        }
    }
}

walkDir(directory);
console.log('Done scanning for all leaked keys!');
