// Explyra AI Configuration
const baseResolveGroqKey = (includeConfig = true) => {
    const metaKey = document.querySelector('meta[name="groq-api-key"]')?.content?.trim();
    return (
        window.__GROQ_API_KEY ||
        (includeConfig ? window.AI_CONFIG?.apiKey : '') ||
        metaKey ||
        localStorage.getItem('explyra_groq_key') ||
        ''
    );
};

window.resolveGroqKey = window.resolveGroqKey || baseResolveGroqKey;
const resolveGroqKey = window.resolveGroqKey;

const AI_CONFIG = {
    // Use includeConfig=false to avoid circular reference while initializing AI_CONFIG itself
    apiKey: baseResolveGroqKey(false),
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: ''
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
