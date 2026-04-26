const fs = require('fs');
const path = require('path');
const terser = require('terser');
const CleanCSS = require('clean-css');
const minifyHtml = require('html-minifier-terser').minify;

const inputDir = __dirname; 
const outputDir = path.join(__dirname, 'minify_xx');

// Inhe chhod kar baaki sab copy/minify hoga
const blockedNames = new Set(['node_modules', '.venv', 'dist', 'shop', '.next', '.git', 'minify_xx', '.github', 'android', 'functions', 'ruild.js', 'package-lock.json', '.vscode', '__pycache__', 'articles']);

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
}

async function processFile(fullPath, destPath, relPath) {
    ensureDir(destPath);
    const ext = path.extname(fullPath).toLowerCase();
    const item = path.basename(fullPath);

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
            fs.copyFileSync(fullPath, destPath);
            console.log(`📁 Copied: ${relPath}`);
        }
    } catch (e) {
        console.log(`⚠️ Failed to minify ${relPath}, copying original.`);
        fs.copyFileSync(fullPath, destPath);
    }
}

async function processDir(currentPath, baseOutputDir = outputDir, baseInputDir = inputDir) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
        if (blockedNames.has(item)) continue;

        const fullPath = path.join(currentPath, item);
        const relPath = path.relative(baseInputDir, fullPath);
        const stat = fs.statSync(fullPath);

        const destPath = path.join(baseOutputDir, relPath);

        if (stat.isDirectory()) {
            ensureDir(path.join(destPath, 'dummy.txt'));
            await processDir(fullPath, baseOutputDir, baseInputDir);
        } else {
            await processFile(fullPath, destPath, relPath);
        }
    }
}

async function processArticles() {
    const articlesPublicDir = path.join(inputDir, 'articles', 'public');
    const articlesDestDir = path.join(outputDir, 'articles');
    
    if (fs.existsSync(articlesPublicDir)) {
        console.log("\n📰 Processing Articles (Flattening public folder)...");
        // We pass the public dir as input and articles folder as output to flatten
        await processDir(articlesPublicDir, articlesDestDir, articlesPublicDir);
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
        
        // Specially process articles after the main mirror
        await processArticles();
        
        console.log("\n✅ DHAMAKA! Tera 100% project minify_xx mein ready hai.");
    } catch (err) {
        console.error("Fatal Error:", err);
    }
}

run();
