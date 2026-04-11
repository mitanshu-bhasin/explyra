const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');
const Terser = require('terser');

const filesToMinify = [
    { src: 'articles/public/index.html', dest: 'minify_xx/articles/public/index.html', type: 'html' },
    { src: 'articles/public/main.js', dest: 'minify_xx/articles/public/main.js', type: 'js' },
    { src: 'articles/public/archive.html', dest: 'minify_xx/articles/public/archive.html', type: 'html' },
    { src: 'articles/template.html', dest: 'minify_xx/articles/template.html', type: 'html' },
    { src: 'articles/server.js', dest: 'minify_xx/articles/server.js', type: 'js' }
];

async function run() {
    for (const file of filesToMinify) {
        try {
            const srcPath = path.join(process.cwd(), file.src);
            const destPath = path.join(process.cwd(), file.dest);
            
            // Create directory if it doesn't exist
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            
            let content = fs.readFileSync(srcPath, 'utf8');
            let minified;
            
            if (file.type === 'html') {
                minified = await minify(content, {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true
                });
            } else if (file.type === 'js') {
                const result = await Terser.minify(content);
                minified = result.code;
            }
            
            fs.writeFileSync(destPath, minified);
            console.log(`Minified: ${file.src} -> ${file.dest}`);
        } catch (err) {
            console.error(`Error minifying ${file.src}:`, err);
        }
    }
}

run();
