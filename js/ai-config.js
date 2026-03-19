// Explyra AI Configuration
const AI_CONFIG = {
    apiKey: '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',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
