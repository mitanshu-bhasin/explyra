const fs = require('fs');

const path = 'scripts/sync-env.js';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('fs.mkdirSync(path.dirname(mobileOutputPath), { recursive: true });')) {
    content = content.replace(
        "fs.writeFileSync(mobileOutputPath, outputContent);",
        "if (!fs.existsSync(path.dirname(mobileOutputPath))) { fs.mkdirSync(path.dirname(mobileOutputPath), { recursive: true }); }\n    fs.writeFileSync(mobileOutputPath, outputContent);"
    );
    fs.writeFileSync(path, content);
    console.log("Patched sync-env.js");
}
