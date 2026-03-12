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

const AI_CONFIG = {
    apiKey: resolveGroqKey(),
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

// Also expose as global for direct script access
window.GROQ_API_KEY = AI_CONFIG.apiKey;
window.AI_CONFIG = AI_CONFIG;
