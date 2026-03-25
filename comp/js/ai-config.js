// Explyra AI Configuration — Hardcoded Groq Key
const AI_CONFIG = {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'moonshotai/kimi-k2-instruct-0905',
    apiKey: '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'
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
