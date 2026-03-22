const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '..');

const keysToRedact = [
    {
        key: '"+"(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")+"',
        replacement: '"+"'+'(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")'+'+"'
    },
    {
        key: 'REDACTED_GROQ_API_KEY',
        replacement: 'REDACTED_GROQ_API_KEY'
    },
    {
        key: 'REDACTED_CLOUDFLARE_TOKEN',
        replacement: 'REDACTED_CLOUDFLARE_TOKEN'
    },
    {
        key: 'REDACTED_RESEND_KEY',
        replacement: 'REDACTED_RESEND_KEY'
    },
    {
        key: '"+"(window.EXPLYRA_CONFIG?.imagekit?.publicKey || "")+"',
        replacement: '"+"'+'(window.EXPLYRA_CONFIG?.imagekit?.publicKey || "")'+'+"'
    },
    {
        key: 'REDACTED_PRIVATE',
        replacement: 'REDACTED_PRIVATE'
    },
    {
        key: '"+"(window.EXPLYRA_CONFIG?.emailjs?.publicKey || "")+"',
        replacement: '"+"'+'(window.EXPLYRA_CONFIG?.emailjs?.publicKey || "")'+'+"'
    },
    {
        key: 'REDACTED_GEMINI_KEY',
        replacement: 'REDACTED_GEMINI_KEY'
    }
];

function walkDir(dir) {
    if (dir.includes('node_modules') || dir.includes('.git')) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
            if (fullPath.endsWith('env.js') || fullPath.endsWith('sync-env.js')) continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const {key, replacement} of keysToRedact) {
                if (content.includes(key)) {
                    content = content.split(key).join(replacement);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Secured literal key in ${fullPath}`);
            }
        }
    }
}

walkDir(directory);
console.log('Done scanning for literal exposed keys.');
