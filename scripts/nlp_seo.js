const language = require('@google-cloud/language');
const fs = require('fs');
const path = require('path');

// Path to your Service Account Key
const KEY_FILE = path.resolve(__dirname, '..', 'explyras-7b760ded92c1.json');

console.log(`🔑 Using Key File: ${KEY_FILE}`);
if (!fs.existsSync(KEY_FILE)) {
    console.error('❌ Key file not found!');
    process.exit(1);
}

// Read credentials directly
const credentials = require(KEY_FILE);

// Initialize the Natural Language client
const client = new language.LanguageServiceClient({
    credentials
});

/**
 * Strips HTML tags and script/style content to get clean text for analysis.
 */
function cleanHTML(html) {
    // Remove scripts and styles
    let text = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '');
    text = text.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, '');
    // Remove all tags
    text = text.replace(/<[^>]+>/g, ' ');
    // Remove extra whitespace
    text = text.replace(/\s+/g, ' ').trim();
    return text;
}

async function analyzeSEO(filePath) {
    try {
        console.log(`\n🔍 Analyzing SEO for: ${filePath}`);
        const html = fs.readFileSync(filePath, 'utf8');
        const textToAnalyze = cleanHTML(html);

        const document = {
            content: textToAnalyze,
            type: 'PLAIN_TEXT',
        };

        // Detects entities in the document
        console.log('📡 Calling Google Cloud NLP API...');
        const [result] = await client.analyzeEntities({ document });
        const entities = result.entities;

        console.log('\n✅ Analysis Complete!');
        console.log('==================================================');
        console.log('🚀 TOP ENTITIES (The core topics Google sees)');
        console.log('==================================================');

        // Sort by salience (importance)
        const sortedEntities = entities
            .sort((a, b) => b.salience - a.salience)
            .slice(0, 15); // Top 15

        sortedEntities.forEach(entity => {
            const salience = (entity.salience * 100).toFixed(2);
            let bar = '█'.repeat(Math.floor(entity.salience * 50));
            console.log(`${entity.name.padEnd(20)} | Salience: ${salience}% ${bar}`);
            if (entity.metadata && entity.metadata.wikipedia_url) {
                console.log(`   🔗 Knowledge Graph: ${entity.metadata.wikipedia_url}`);
            }
        });

        console.log('==================================================');
        
        // Simple SEO Logic
        console.log('\n💡 SEO INSIGHTS:');
        const hasBrand = sortedEntities.some(e => e.name.toLowerCase().includes('explyra'));
        if (!hasBrand) {
            console.log('⚠️  CRITICAL: Your brand name "Explyra" is not among the top entities. Google might not associate this page with your brand strongly.');
        } else {
            console.log('✔️  Brand Strength: "Explyra" is recognized as a key entity.');
        }

        const topEntity = sortedEntities[0];
        console.log(`🎯 Main Focus: Google thinks this page is primarily about "${topEntity.name}".`);
        
    } catch (error) {
        console.error('❌ Error during analysis:', error.message);
    }
}

// Run for index.html as default
const target = process.argv[2] || path.join(__dirname, '..', 'index.html');
analyzeSEO(target);
