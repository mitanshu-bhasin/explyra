const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '..');

const replacements = [
    {
        // Firebase key
        regex: /[`'"]"+"(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")+"[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")'
    },
    {
        // Groq Key
        regex: /[`'"]REDACTED_GROQ_API_KEY[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.ai?.apiKey || "REDACTED")'
    },
    {
        // Cloudflare Token
        regex: /[`'"]REDACTED_CLOUDFLARE_TOKEN[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.emailApp?.cloudflareToken || "REDACTED")'
    },
    {
        // Resend
        regex: /[`'"]REDACTED_RESEND_KEY[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.emailApp?.resendKey || "REDACTED")'
    },
    {
        // Imagekit public
        regex: /[`'"]public_A7ZHxCiIBfl\/fxzXlk1tXUUR\+B4=[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.imagekit?.publicKey || "")'
    },
    {
        // Imagekit private
        regex: /[`'"]private_m7Ie0ZXD\/4WpBlly116odVbWhhM=[`'"]/g,
        replace: '"REDACTED"'
    },
    {
        // EmailJS
        regex: /[`'"]"+"(window.EXPLYRA_CONFIG?.emailjs?.publicKey || "")+"[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.emailjs?.publicKey || "")'
    },
    {
        // Gemini
        regex: /[`'"]REDACTED_GEMINI_KEY[`'"]/g,
        replace: '(window.EXPLYRA_CONFIG?.ai?.geminiKey || "REDACTED")'
    }
];

function walkDir(dir) {
    if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('dist') || dir.includes('.firebase')) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.html')) {
            if (fullPath.endsWith('env.js') || fullPath.endsWith('sync-env.js')) continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const {regex, replace} of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replace);
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
console.log('Done scanning for exposed keys.');
