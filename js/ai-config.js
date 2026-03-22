// Explyra AI Configuration — Groq key lives in Pages/Functions env as GROQ_API_KEY (proxy only).
// Do not set apiKey here; ai-assistant.js omits Authorization for same-origin /api/ai/groq.
const AI_CONFIG = {
    url: '/api/ai/groq',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

window.AI_CONFIG = AI_CONFIG;
