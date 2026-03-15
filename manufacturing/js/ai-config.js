// Explyra AI Configuration
const AI_CONFIG = {
    apiKey: window.EXPLYRA_CONFIG?.ai?.apiKey || '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',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
