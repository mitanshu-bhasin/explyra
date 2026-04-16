import { db, collection, getDocs, deleteDoc, doc } from './fb.config.js';

async function clearArticles() {
    console.log('Listing articles to clear...');
    const q = collection(db, 'generated_articles');
    const snap = await getDocs(q);
    console.log(`Found ${snap.size} articles.`);
    
    for (const d of snap.docs) {
        console.log(`Deleting ${d.id}...`);
        await deleteDoc(doc(db, 'generated_articles', d.id));
    }
    console.log('All articles cleared.');
    process.exit(0);
}

clearArticles().catch(err => {
    console.error(err);
    process.exit(1);
});
