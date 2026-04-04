import axios from 'axios';
import config from '../config.js';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchLatestTechNews = async () => {
    if (!config.newsKey) {
        throw new Error('NEWS_API_KEY is missing in fb.config or .env');
    }

    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                category: 'technology',
                language: 'en',
                apiKey: config.newsKey
            }
        });

        // Map to a simpler format for the AI
        return response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage, // Include image URL
            source: article.source.name,
            publishedAt: article.publishedAt
        })).slice(0, 5); // Just top 5 for generation
    } catch (error) {
        console.error('Error fetching news:', error.message);
        throw error;
    }
};
