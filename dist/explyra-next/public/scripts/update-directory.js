const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://direc.explyra.me/listings/';
const LISTINGS_DIR = path.join(__dirname, '../direc/listings');
const MANIFEST_PATH = path.join(__dirname, '../direc/listings/manifest.json');
const SITEMAP_PATH = path.join(__dirname, '../direc/sitemap.xml');

/**
 * Updates the listings manifest.json by scanning the listings directory
 */
function updateManifest() {
    console.log('Scanning listings...');
    if (!fs.existsSync(LISTINGS_DIR)) {
        fs.mkdirSync(LISTINGS_DIR, { recursive: true });
    }
    const files = fs.readdirSync(LISTINGS_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
    
    const manifest = files.map(filename => {
        const content = fs.readFileSync(path.join(LISTINGS_DIR, filename), 'utf8');
        
        // Extract basic info from the generated HTML
        const nameMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
        const descMatch = content.match(/<meta name="description" content="([^"]+)">/);
        const categoryMatch = content.match(/bg-blue-50 text-blue-700[^>]*>\s+([^•\s<]+)/);
        const logoMatch = content.match(/<img src="([^"]+)" alt="[^"]+ Logo"/);

        return {
            name: nameMatch ? nameMatch[1].trim() : filename.replace('direc-', '').replace('.html', ''),
            description: descMatch ? descMatch[1].trim() : '',
            category: categoryMatch ? categoryMatch[1].trim() : 'General',
            logo: logoMatch ? logoMatch[1] : '',
            filename: filename
        };
    });

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Updated manifest.json with ${manifest.length} listings.`);
    return manifest;
}

/**
 * Updates the root sitemap.xml with any new listings
 */
function updateSitemap(manifest) {
    let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
    
    // Create URLs for sitemap
    const newUrls = manifest.map(item => {
        const url = `${BASE_URL}${item.filename}`;
        if (sitemap.includes(url)) return ''; // Skip if already exists
        
        return `    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>`;
    }).filter(u => u !== '').join('\n');

    if (newUrls) {
        // Insert before the last </urlset>
        sitemap = sitemap.replace('</urlset>', `\n    <!-- === DIRECTORY LISTINGS === -->\n${newUrls}\n</urlset>`);
        fs.writeFileSync(SITEMAP_PATH, sitemap);
        console.log('Updated sitemap.xml with new URLs.');
    } else {
        console.log('No new URLs to add to sitemap.xml.');
    }
}

try {
    const manifest = updateManifest();
    updateSitemap(manifest);
    console.log('Success! Directory system updated.');
} catch (error) {
    console.error('Update failed:', error);
}
