// Explyra AI Configuration — Dynamic Environment Routing
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const envApiKey = window.EXPLYRA_CONFIG?.ai?.apiKey;
const localApiKey = window.localStorage?.getItem('groq_api_key') || '';

const AI_CONFIG = {
    url: isLocal
        ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
        : '/api/ai/gemini',
    model: 'gemini-2.5-flash',
    // In production, the key is handled by the Cloudflare Worker Proxy (env.GA)
    apiKey: isLocal ? (localApiKey || envApiKey || '') : 'HANDLED_BY_PROXY'
};

window.AI_CONFIG = AI_CONFIG;
