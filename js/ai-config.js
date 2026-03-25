// Explyra AI Configuration — Dynamic Environment Routing
const AI_CONFIG = {
    url: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : '/api/ai/groq',
    model: 'moonshotai/kimi-k2-instruct-0905',
    apiKey: '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'
};

window.AI_CONFIG = AI_CONFIG;
