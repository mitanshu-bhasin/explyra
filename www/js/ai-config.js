// Explyra AI Configuration
const AI_CONFIG = {
    apiKey: 'REDACTED_GROQ_API_KEY_2',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: ''
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
