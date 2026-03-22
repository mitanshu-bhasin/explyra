// Explyra AI Configuration
const AI_CONFIG = {
    url: '/api/ai/groq',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
