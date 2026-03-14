const fs = require('fs');
const path = require('path');

const searchDir = "d:\\Expense Tracker";
const structuredDataPath = path.join(searchDir, 'structured-data.json');

// Load central schema
let centralData;
try {
    centralData = JSON.parse(fs.readFileSync(structuredDataPath, 'utf8'));
} catch (e) {
    console.error("Failed to load structured-data.json. Using fallback values.");
    centralData = { "@graph": [] };
}

const orgSchema = centralData["@graph"].find(i => i["@type"] === "Organization") || {
    "@type": "Organization",
    "name": "Explyra",
    "url": "https://explyra.me/"
};

const webSiteSchema = centralData["@graph"].find(i => i["@type"] === "WebSite");
const softwareSchema = centralData["@graph"].find(i => i["@type"] === "SoftwareApplication");

const socialLinks = orgSchema.sameAs || [];

const htmlSocials = `
        <div class="foot-socials" style="margin-top: 20px; display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; font-size: 0.9rem;">
            ${socialLinks.map(link => {
                let label = "Social";
                if (link.includes('x.com')) label = "X (Twitter)";
                else if (link.includes('facebook.com')) label = "Facebook";
                else if (link.includes('instagram.com')) label = "Instagram";
                else if (link.includes('youtube.com')) label = "YouTube";
                else if (link.includes('linkedin.com')) label = "LinkedIn";
                else if (link.includes('threads.com')) label = "Threads";
                else if (link.includes('github.com')) label = "GitHub";
                else if (link.includes('ipecconsulting')) label = "IPEC Consulting";
                return `<a href="${link}" target="_blank" rel="noopener noreferrer">${label}</a>`;
            }).join('\n            ')}
        </div>`;

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    try {
        fs.readdirSync(dir).forEach(f => {
            let dirPath = path.join(dir, f);
            try {
                let stat = fs.statSync(dirPath);
                if (stat.isDirectory()) {
                    if (!['node_modules', '.git', '.gemini', 'dist', 'cms'].some(skip => f.includes(skip))) {
                        walkDir(dirPath, callback);
                    }
                } else if (f.endsWith('.html')) {
                    callback(dirPath);
                }
            } catch (e) { }
        });
    } catch (e) { }
}

function updateFileSchema(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    const isHome = path.basename(filePath) === 'index.html';

    // 1. Identify existing schema blocks
    const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let schemas = [];
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
        try {
            schemas.push(JSON.parse(match[1]));
        } catch (e) {}
    }

    // 2. Clear all existing application/ld+json schemas to rebuild them
    // This ensures consistency across all files.
    let newContent = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');

    // 3. Build new schema for this page
    let pageGraph = [orgSchema];
    
    if (isHome) {
        if (webSiteSchema) pageGraph.push(webSiteSchema);
        if (softwareSchema) pageGraph.push(softwareSchema);
    }

    // Add Breadcrumbs if it's not the home page
    if (!isHome) {
        const parts = filePath.replace(searchDir, '').split(path.sep).filter(p => p && !p.endsWith('.html'));
        if (parts.length > 0) {
            const breadcrumb = {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://explyra.me/"
                    }
                ]
            };
            let currentUrl = "https://explyra.me/";
            parts.forEach((part, idx) => {
                currentUrl += part + "/";
                breadcrumb.itemListElement.push({
                    "@type": "ListItem",
                    "position": idx + 2,
                    "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
                    "item": currentUrl
                });
            });
            pageGraph.push(breadcrumb);
        }
    }

    const finalSchema = {
        "@context": "https://schema.org",
        "@graph": pageGraph
    };

    const schemaTag = `\n    <script type="application/ld+json">\n${JSON.stringify(finalSchema, null, 2)}\n    </script>\n`;
    
    if (newContent.includes('</head>')) {
        newContent = newContent.replace('</head>', schemaTag + '</head>');
        hasChanges = true;
    }

    // 4. Update Footer Socials
    if (newContent.includes('</footer>') && !newContent.includes('foot-socials')) {
        newContent = newContent.replace(/<\/footer>/gi, `${htmlSocials}\n    </footer>`);
        hasChanges = true;
    } else if (newContent.includes('foot-socials')) {
        // Update existing foot-socials
        newContent = newContent.replace(/<div class="foot-socials"[\s\S]*?<\/div>/, htmlSocials.trim());
        hasChanges = true;
    }

    if (hasChanges && newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
        return true;
    }
    return false;
}

let modifiedFiles = 0;
walkDir(searchDir, (filePath) => {
    try {
        if (updateFileSchema(filePath)) {
            modifiedFiles++;
        }
    } catch (e) {
        console.error(`Failed processing ${filePath}: ${e.message}`);
    }
});

console.log(`Total files modified: ${modifiedFiles}`);
