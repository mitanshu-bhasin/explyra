import { getArticles } from './services/firebaseService.js';
async function run() {
    const articles = await getArticles(10);
    console.log('Articles found:', articles.length);
    if (articles.length > 0) {
        console.log('First article title:', articles[0].title);
    }
}
run();
