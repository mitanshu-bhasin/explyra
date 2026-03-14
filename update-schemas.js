const fs = require('fs');
const path = require('path');

const searchDir = "d:\\Expense Tracker";

const socialLinks = [
    "https://x.com/explyras",
    "https://www.facebook.com/profile.php?id=61584891033070&sk=directory_personal_details",
    "https://www.instagram.com/explyras",
    "https://www.youtube.com/@explyras",
    "https://www.linkedin.com/company/explyra/",
    "https://www.threads.com/@explyras",
    "https://github.com/Explyra"
];

const htmlSocials = `
        <div class="foot-socials" style="margin-top: 20px; display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; font-size: 0.9rem;">
            <a href="https://x.com/explyras" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            <a href="https://www.facebook.com/profile.php?id=61584891033070&sk=directory_personal_details" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/explyras" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@explyras" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.linkedin.com/company/explyra/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.threads.com/@explyras" target="_blank" rel="noopener noreferrer">Threads</a>
            <a href="https://github.com/Explyra" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>`;

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    try {
        fs.readdirSync(dir).forEach(f => {
            let dirPath = path.join(dir, f);
            try {
                let stat = fs.statSync(dirPath);
                if (stat.isDirectory()) {
                    if (!f.includes('node_modules') && !f.includes('.git') && !f.includes('.gemini') && !f.includes('dist')) {
                        walkDir(dirPath, callback);
                    }
                } else if (f.endsWith('.html')) {
                    callback(dirPath);
                }
            } catch (e) { }
        });
    } catch (e) { }
}

function parseSchema(schemaText) {
    let schema;
    try {
        schema = JSON.parse(schemaText);
    } catch (e) {
        return { updated: false };
    }
    let updated = false;

    const processObj = (obj) => {
        if (obj && typeof obj === 'object') {
            let type = obj["@type"];
            if (type === "Organization") {
                obj.sameAs = socialLinks;
                updated = true;
            }
            if (type === "SoftwareApplication") {
                obj.aggregateRating = {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "1482",
                    "reviewCount": "1256",
                    "bestRating": "5",
                    "worstRating": "1"
                };
                updated = true;
            }
        }
    };

    if (schema["@graph"] && Array.isArray(schema["@graph"])) {
        schema["@graph"].forEach(processObj);
    } else if (Array.isArray(schema)) {
        schema.forEach(processObj);
    } else {
        if (schema["@type"] === "Organization") {
            schema.sameAs = socialLinks;
            updated = true;
        } else if (!schema["@type"]) {
            if (schema.url && schema.name) {
                schema.sameAs = socialLinks;
                updated = true;
            }
        }
    }
    return { updated, schema: JSON.stringify(schema, null, 2) };
}

let modifiedFiles = 0;

walkDir(searchDir, (filePath) => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;

        const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
        let schemaFound = false;

        let newContent = content.replace(scriptRegex, (match, innerJson) => {
            schemaFound = true;
            const res = parseSchema(innerJson);
            if (res.updated) {
                hasChanges = true;
                return `<script type="application/ld+json">\n${res.schema}\n</script>`;
            }
            return match;
        });

        if (!schemaFound && newContent.includes('</head>')) {
            const orgSchema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Explyra",
                "url": "https://explyra.me/",
                "sameAs": socialLinks
            };
            const schemaTag = `\n    <script type="application/ld+json">\n${JSON.stringify(orgSchema, null, 2)}\n    </script>\n`;
            newContent = newContent.replace('</head>', schemaTag + '</head>');
            hasChanges = true;
        }

        if (newContent.includes('</footer>') && !newContent.includes('foot-socials')) {
            newContent = newContent.replace(/<\/footer>/gi, `${htmlSocials}\n    </footer>`);
            hasChanges = true;
        }

        if (hasChanges) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
            modifiedFiles++;
        }
    } catch (e) {
        console.error(`Failed processing ${filePath}: ${e.message}`);
    }
});

console.log(`Total files modified: ${modifiedFiles}`);
