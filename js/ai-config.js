// Explyra AI Configuration — Dynamic Environment Routing
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const envApiKey = window.EXPLYRA_CONFIG?.ai?.apiKey;
const localApiKey = window.localStorage?.getItem('groq_api_key') || '';

const AI_CONFIG = {
    url: isLocal
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : '/api/ai/groq',
    model: 'moonshotai/kimi-k2-instruct-0905',
    // Production should use proxy route; localhost can use a manually provided local key.
    apiKey: isLocal ? (localApiKey || envApiKey || 'MISSING_KEY') : 'HANDLED_BY_PROXY'
};

window.AI_CONFIG = AI_CONFIG;
