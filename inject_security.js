const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const ignoreDirs = new Set(['node_modules', '.git', 'minify_xx', '.venv', 'dist', '.wrangler']);

function walk(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!ignoreDirs.has(item)) {
                walk(fullPath);
            }
        } else if (item.endsWith('.html')) {
            injectSecurityScript(fullPath);
        }
    }
}

function injectSecurityScript(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already injected
    if (content.includes('security.js"')) return;

    // Use root-relative path for deeper files, or relative if in root
    const relDepth = path.relative(rootDir, filePath).split(path.sep).length - 1;
    let scriptPath = "js/security.js";
    if (relDepth > 0) {
        scriptPath = "../".repeat(relDepth) + "js/security.js";
    }

    const scriptTag = `\n    <!-- Security & Context Menu -->\n    <script src="${scriptPath}" defer></script>\n`;

    // Try to insert before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', scriptTag + '</head>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected into: ${filePath}`);
    } else if (content.includes('</body>')) {
        content = content.replace('</body>', scriptTag + '</body>');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected into: ${filePath}`);
    }
}

walk(rootDir);
console.log('Injection complete.');
