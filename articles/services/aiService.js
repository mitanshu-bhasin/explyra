import { GoogleGenerativeAI } from "@google/generative-ai";
import { VertexAI } from '@google-cloud/vertexai';
import config from "../config.js";

// Initialize Gemini SDK (Primary)
const genAI = new GoogleGenerativeAI(config.geminiKey);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Initialize Vertex AI SDK (Fallback)
const project = config.firebase.projectId || process.env.GOOGLE_CLOUD_PROJECT;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
const vertexAI = new VertexAI({ project: project, location: location });
const vertexModel = vertexAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateProfessionalArticle = async (newsItems) => {
    const prompt = `
    You are an expert tech journalist for a top-tier publication like The New York Times or Times of India.
    Based on the following news snippets, write a comprehensive, 1000-word, highly technical, and SEO-optimized article.
    
    News Snippets:
    ${JSON.stringify(newsItems, null, 2)}
    
    Requirements:
    1. Tone: Professional, authoritative, and crisp.
    2. Format: Return ONLY valid HTML content.
    3. Hierarchy: Use <h2> for major sections, <h3> for sub-sections. Use <ul> and <li> for lists.
    4. Content: Deep-dive technical analysis with industry predictions.
    5. Length: Exactly 1000 words. (Do not truncate).
    
    The article should have a compelling headline wrapped in an <h1> tag.
    `;

    // Try Primary: Gemini API Key
    try {
        console.log('[AI] Attempting generation with Gemini SDK (API Key)...');
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (geminiError) {
        console.warn('[AI] Gemini SDK failed, falling back to Vertex AI...', geminiError.message);
        
        // Try Fallback: Vertex AI
        try {
            console.log('[AI] Attempting generation with Vertex AI SDK (ADC)...');
            const result = await vertexModel.generateContent(prompt);
            const response = await result.response;
            const text = response.candidates[0].content.parts[0].text;
            return text;
        } catch (vertexError) {
            console.error('[AI] All AI providers failed.');
            throw new Error(`AI generation failed: ${geminiError.message} | ${vertexError.message}`);
        }
    }
};
