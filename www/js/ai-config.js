// Explyra AI Configuration
const resolveGroqKey = () => {
    const metaKey = document.querySelector('meta[name="groq-api-key"]')?.content?.trim();
    return (
        window.__GROQ_API_KEY ||
        window.AI_CONFIG?.apiKey ||
        metaKey ||
        localStorage.getItem('explyra_groq_key') ||
        ''
    );
};

window.resolveGroqKey = window.resolveGroqKey || resolveGroqKey;

const AI_CONFIG = {
    apiKey: resolveGroqKey(),
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: ''
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
