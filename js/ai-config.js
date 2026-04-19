// Explyra AI Configuration — Dynamic Environment Routing
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const globalAI = window.EXPLYRA_CONFIG?.ai || {};

const AI_CONFIG = {
    url: isLocal
        ? 'https://generativelanguage.googleapis.com/v1beta/models/' + (globalAI.model || 'gemini-1.5-flash') + ':generateContent'
        : '/api/ai/gemini',
    model: globalAI.model || 'gemini-1.5-flash',
    // In production, the key is handled by the Cloudflare Worker Proxy (env.GA)
    apiKey: isLocal ? (globalAI.apiKey && globalAI.apiKey !== 'HANDLED_BY_PROXY' ? globalAI.apiKey : (window.localStorage?.getItem('groq_api_key') || '')) : 'HANDLED_BY_PROXY'
};

window.AI_CONFIG = AI_CONFIG;
