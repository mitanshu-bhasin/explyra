const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');

function cleanup() {
    let content = fs.readFileSync(indexPath, 'utf8');

    // 1. Replace Style Block (Lines 470 to 4939 approx)
    // We'll use a regex that matches the start and end tokens we know are there.
    const styleRegex = /<style>\s* \/\* ═══════════[\s\S]*?<\/style>/;
    const styleReplacement = `<link rel="stylesheet" href="./css/main.css">\n    <link rel="stylesheet" href="./css/index.css">`;
    
    // Actually, I'll match the DESIGN TOKENS header specifically.
    const specificStyleRegex = /<style>\s+\/\* ═══════════════════════════════════════════\s+DESIGN TOKENS[\s\S]*?<\/style>/;
    
    if (specificStyleRegex.test(content)) {
        content = content.replace(specificStyleRegex, styleReplacement);
        console.log('✓ Style block replaced with main.css and index.css');
    } else {
        console.log('✗ Could not find specific style block');
    }

    // 2. Replace Script Block (Lines 6476 to 7092 approx)
    const scriptRegex = /<script>\s+\/\* THEME \*\/[\s\S]*?<\/script>/;
    const scriptReplacement = `<script src="./js/main.js"></script>\n    <script src="./js/index-demos.js"></script>`;
    
    if (scriptRegex.test(content)) {
        content = content.replace(scriptRegex, scriptReplacement);
        console.log('✓ Interactive script block replaced with main.js and index-demos.js');
    } else {
        console.log('✗ Could not find interactive script block');
    }

    // 3. Replace 3D Script Block (Lines 7097 to 7268 approx)
    const threeRegex = /<script>\s+\(function \(\) \{\s+const canvas = document.getElementById\('hero-3d-canvas'\);[\s\S]*?<\/script>/;
    const threeReplacement = `<script src="./js/hero-3d.js"></script>`;
    
    if (threeRegex.test(content)) {
        content = content.replace(threeRegex, threeReplacement);
        console.log('✓ 3D core script block replaced with hero-3d.js');
    } else {
        console.log('✗ Could not find 3D core script block');
    }

    fs.writeFileSync(indexPath, content);
}

cleanup();
