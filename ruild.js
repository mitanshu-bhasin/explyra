const fs = require('fs');
const path = require('path');
const terser = require('terser');
const CleanCSS = require('clean-css');
const minifyHtml = require('html-minifier-terser').minify;

const inputDir = __dirname; 
const outputDir = path.join(__dirname, 'minify_xx');

// Inhe chhod kar baaki sab copy/minify hoga
const blockedNames = new Set(['node_modules', '.venv', 'dist', 'shop', '.next', '.git', 'minify_xx', '.github', 'android', 'functions', 'ruild.js', 'package-lock.json', '.vscode', '__pycache__']);

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
}

async function processDir(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
        if (blockedNames.has(item)) continue;

        const fullPath = path.join(currentPath, item);
        const relPath = path.relative(inputDir, fullPath);
        const stat = fs.statSync(fullPath);

        const destPath = path.join(outputDir, relPath);

        if (stat.isDirectory()) {
            ensureDir(path.join(destPath, 'dummy.txt')); // Folder create karne ke liye
            await processDir(fullPath);
        } else {
            ensureDir(destPath);
            const ext = path.extname(item).toLowerCase();

            try {
                if (ext === '.js' && !item.includes('.min.')) {
                    console.log(`⚡ Minifying JS: ${relPath}`);
                    const code = fs.readFileSync(fullPath, 'utf8');
                    const result = await terser.minify(code, { compress: true, mangle: true });
                    fs.writeFileSync(destPath, result.code || code);
                } 
                else if (ext === '.css' && !item.includes('.min.')) {
                    console.log(`🎨 Minifying CSS: ${relPath}`);
                    const cssCode = fs.readFileSync(fullPath, 'utf8');
                    const output = new CleanCSS({}).minify(cssCode);
                    fs.writeFileSync(destPath, output.styles || cssCode);
                } 
                else if (ext === '.html') {
                    console.log(`📄 Minifying HTML: ${relPath}`);
                    const htmlCode = fs.readFileSync(fullPath, 'utf8');
                    const minifiedHtml = await minifyHtml(htmlCode, {
                        collapseWhitespace: true,
                        removeComments: true,
                        minifyJS: true,
                        minifyCSS: true
                    });
                    fs.writeFileSync(destPath, minifiedHtml);
                } 
                else {
                    // Baaki sab (Images, JSON, etc.) ko bas copy karo
                    fs.copyFileSync(fullPath, destPath);
                    console.log(`📁 Copied: ${relPath}`);
                }
            } catch (e) {
                console.log(`⚠️ Failed to minify ${relPath}, copying original.`);
                fs.copyFileSync(fullPath, destPath);
            }
        }
    }
}

async function run() {
    try {
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
        }
        fs.mkdirSync(outputDir);
        
        console.log("🚀 Starting FULL MIRROR RUILD for Explyra...");
        await processDir(inputDir);
        console.log("\n✅ DHAMAKA! Tera 100% project minify_xx mein ready hai.");
    } catch (err) {
        console.error("Fatal Error:", err);
    }
}

run();