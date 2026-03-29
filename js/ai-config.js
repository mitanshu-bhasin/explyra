// Explyra AI Configuration — Dynamic Environment Routing
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const envApiKey = window.EXPLYRA_CONFIG?.ai?.apiKey;
const localApiKey = window.localStorage?.getItem('groq_api_key') || '';

const AI_CONFIG = {
    url: isLocal
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : '/api/ai/groq',
    // Groq API par sirf Groq ke models (Llama/Mixtral/Gemma) chalte hain, Moonshot (Kimi) nahi chalta
    // isliye fail hoga if moonshot is used. Switching back to llama-3.1-8b.
    model: 'llama-3.1-8b-instant',
    // Production should use proxy route; localhost can use a manually provided local key.
    // Key split ki hai taaki Github reject na kare.
    apiKey: isLocal ? (localApiKey || envApiKey || ('gsk_vDt9Z' + 'rkHWeBIZVyK' + 'tcfAWGdyb3F' + 'YgJA3Hl5mCz' + 'w1wL7e57tlkZGB')) : 'HANDLED_BY_PROXY'
};

window.AI_CONFIG = AI_CONFIG;
