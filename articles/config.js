import dotenv from 'dotenv';
dotenv.config();

/**
 * Unified config for the Explyra Articles backend.
 * Reads from articles/.env — no fragile file parsing needed.
 */
const config = {
    firebase: {
        apiKey:            "AIzaSyDadazHFf525KrsOoQWUP5yJ7q7uxyf3lw",
        authDomain:        "explyras.firebaseapp.com",
        databaseURL:       "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId:         "explyras",
        storageBucket:     "explyras.firebasestorage.app",
        messagingSenderId: "411853553644",
        appId:             "1:411853553644:web:eca79eab846b6a5149cac9",
        measurementId:     "G-TFBZ5GZ22C"
    },
    // Gemini API key — from .env GEMINI_API_KEY
    geminiKey:  process.env.GEMINI_API_KEY || "AIzaSyDefIPTvfbaZtW4yD47mzWotFwdDHrut2E",
    // NewsAPI key — from .env NEWS_API_KEY
    newsKey:    process.env.NEWS_API_KEY,
    // Server
    port:       process.env.PORT || 3000,
};

if (!config.geminiKey) {
    console.error('[Config] CRITICAL: GEMINI_API_KEY is missing!');
    process.exit(1);
}
if (!config.newsKey) {
    console.warn('[Config] WARNING: NEWS_API_KEY is missing — news fetching will fail.');
}

export default config;
