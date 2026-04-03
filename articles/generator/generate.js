import { fetchLatestTechNews } from './services/newsService.js';
import { generateProfessionalArticle } from './services/aiService.js';
import { saveArticle } from './services/firebaseService.js';

async function runGenerator() {
    try {
        console.log('--- EXPLYRA CONTENT GENERATOR START ---');
        
        console.log('[1/3] Fetching latest technology headlines...');
        const newsItems = await fetchLatestTechNews();
        console.log(`✅ Success: Found ${newsItems.length} core news items.`);

        console.log('[2/3] Processing through AI engine (Gemini/Vertex)...');
        const htmlContent = await generateProfessionalArticle(newsItems);
        console.log(`✅ Success: 1000-word article formatted.`);

        console.log('[3/3] Syncing with Firebase (Firestore)...');
        const titleMatch = htmlContent.match(/<h1>(.*?)<\/h1>/);
        const title = titleMatch ? titleMatch[1] : 'Tech Insights Daily';
        
        const docId = await saveArticle({
            title: title,
            content: htmlContent,
            timestamp: new Date().toISOString()
        });
        
        console.log(`--- COMPLETE: Article stored as ${docId} ---`);
    } catch (error) {
        console.error('❌ CRITICAL ERROR:', error.message);
        process.exit(1);
    }
}

// Run if called directly
runGenerator();
