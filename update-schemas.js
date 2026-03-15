const fs = require('fs');
const path = require('path');

const searchDir = "d:\\Expense Tracker";
const structuredDataPath = path.join(searchDir, 'structured-data.json');

// ── HYPER-DETAILED METADATA MAPPING ──
const PAGE_META = {
    "index.html": {
        title: "Explyra — The All-in-One SaaS Ecosystem for Developers & Teams",
        desc: "Explyra is the ultimate productivity suite. Manage expenses, developer utilities, CRM, and team collaboration in one unified, secure platform."
    },
    "login.html": {
        title: "Sign In to Explyra — Access Your Developer Dashboard & Tools",
        desc: "Log in to your Explyra account to manage your developer utilities, track business expenses, and access your personalized team workspace."
    },
    "signup.html": {
        title: "Join Explyra — Create Your Professional Developer Account",
        desc: "Start your journey with Explyra today. Get access to a complete suite of developer tools, expense trackers, and team management utilities for free."
    },
    "pricing.html": {
        title: "Explyra Pricing Plans — Affordable Premium Tools for Teams",
        desc: "Compare Explyra's flexible pricing plans. From free tools for individuals to enterprise-grade solutions for large organizations and dev teams."
    },
    "support.html": {
        title: "Explyra Support & Help Center — Get Technical Assistance",
        desc: "Need help? Reach out to the Explyra support team, submit technical tickets, or browse our documentation for guides on using our suite."
    },
    "contact.html": {
        title: "Contact Explyra — Technical Sales & Enterprise Inquiries",
        desc: "Contact the Explyra team for business partnerships, enterprise licensing, or technical inquiries. We're here to help you scale your workflow."
    },
    "developers/index.html": {
        title: "Explyra Developer Hub — Free Online Utilities & Code Tools",
        desc: "The go-to destination for modern developers. Access free code beautifiers, CSS generators, JSON formatters, and secure web utilities instantly."
    },
    "dashboard.html": {
        title: "Explyra Dashboard — Manage Your Services & Workspace",
        desc: "Overview of your Explyra account activities, active services, and team performance metrics in one centralized view."
    }
};

// Load central schema
let centralData;
try {
    centralData = JSON.parse(fs.readFileSync(structuredDataPath, 'utf8'));
} catch (e) {
    console.error("Failed to load structured-data.json");
    process.exit(1);
}

const centralOrg = centralData["@graph"].find(i => i["@type"] === "Organization");
const centralWebSite = centralData["@graph"].find(i => i["@type"] === "WebSite");
const centralSoftware = centralData["@graph"].find(i => i["@type"] === "SoftwareApplication");

const socialLinks = centralOrg.sameAs || [];

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
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let stat = fs.statSync(dirPath);
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', '.gemini', 'dist', 'cms'].some(skip => f.includes(skip))) {
                walkDir(dirPath, callback);
            }
        } else if (f.endsWith('.html')) {
            callback(dirPath);
        }
    });
}

function getUniversalMetadata(filePath) {
    const relative = path.relative(searchDir, filePath).replace(/\\/g, '/');
    const parts = relative.split('/');
    const baseName = path.basename(filePath, '.html');
    
    let pageName = baseName.charAt(0).toUpperCase() + baseName.slice(1).replace(/-/g, ' ');
    if (baseName === 'index') {
        const parent = parts[parts.length - 2] || 'Home';
        pageName = parent.charAt(0).toUpperCase() + parent.slice(1).replace(/-/g, ' ');
    }

    // Context detection
    let context = "Explyra Suite";
    if (relative.includes('developers/')) context = "Explyra Developer Hub";
    else if (relative.includes('admin/')) context = "Explyra Admin Panel";
    else if (relative.includes('booking/')) context = "Explyra Booking System";

    const title = `${pageName} — Free ${context} Tool | Fast & Secure`;
    const desc = `Use ${pageName} on ${context}. A high-performance, secure, and professional tool designed to optimize your workflow within the Explyra ecosystem.`;

    return { title, desc };
}

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    const fileName = path.relative(searchDir, filePath).replace(/\\/g, '/');
    const isHome = fileName === 'index.html';
    
    // 1. Extract and preserve existing schemas
    let existingSchemas = [];
    const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let match;
    while ((match = scriptRegex.exec(content)) !== null) {
        try {
            let parsed = JSON.parse(match[1]);
            let items = parsed["@graph"] || (Array.isArray(parsed) ? parsed : [parsed]);
            items = items.filter(item => {
                const id = item["@id"] || "";
                return !id.includes("#organization") && !id.includes("#website") && !id.includes("#software") && item["@type"] !== "BreadcrumbList";
            });
            existingSchemas.push(...items);
        } catch (e) {}
    }

    // 2. Clear all existing JSON-LD tags
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');

    // 3. Prepare new graph
    let pageGraph = [centralOrg];
    if (isHome) {
        if (centralWebSite) pageGraph.push(centralWebSite);
        if (centralSoftware) pageGraph.push(centralSoftware);
    } else {
        const parts = fileName.split('/').filter(p => !p.endsWith('.html'));
        if (parts.length > 0) {
            const breadcrumb = {
                "@type": "BreadcrumbList",
                "@id": `https://explyra.me/${fileName}#breadcrumb`,
                "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://explyra.me/" }]
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

    pageGraph.push(...existingSchemas);

    const schemaTag = `\n    <script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", "@graph": pageGraph }, null, 2)}\n    </script>\n`;
    if (content.includes('</head>')) {
        content = content.replace('</head>', schemaTag + '</head>');
    }

    // 4. UNIVERSAL HYPER-DETAILED METADATA
    const meta = PAGE_META[fileName] || getUniversalMetadata(filePath);
    
    // Update Title
    const titleRegex = /<title>([\s\S]*?)<\/title>/i;
    if (content.match(titleRegex)) {
        content = content.replace(titleRegex, `<title>${meta.title}</title>`);
    } else if (content.includes('</head>')) {
        content = content.replace('</head>', `    <title>${meta.title}</title>\n</head>`);
    }

    // Update Meta Description
    const descRegex = /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i;
    if (content.match(descRegex)) {
        content = content.replace(descRegex, `<meta name="description" content="${meta.desc}">`);
    } else if (content.includes('</head>')) {
        content = content.replace('</head>', `    <meta name="description" content="${meta.desc}">\n</head>`);
    }

    // 5. Footer Socials
    if (content.includes('</footer>') && !content.includes('foot-socials')) {
        content = content.replace(/<\/footer>/gi, `${htmlSocials}\n    </footer>`);
    } else if (content.includes('foot-socials')) {
        content = content.replace(/<div class="foot-socials"[\s\S]*?<\/div>/, htmlSocials.trim());
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

let count = 0;
walkDir(searchDir, (f) => {
    if (updateFile(f)) count++;
});
console.log(`Updated ${count} files with universal hyper-detailed metadata.`);
