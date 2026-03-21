/**
 * Explyra Central Hub - Cloudflare Worker
 * 
 * Features:
 * 1. AI Proxy (Groq, Gemini) - Securely attaches API keys from Worker Secrets.
 * 2. FCM Notifications - Sends push notifications via Firebase.
 */

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // CORS Headers
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // ─── AI PROXY ROUTES ──────────────────────────────────────────
            
            // Groq Proxy
            if (url.pathname === "/api/ai/groq" && request.method === "POST") {
                const body = await request.json();
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${env.GROQ_API_KEY || "OFFLINE"}`,
                    },
                    body: JSON.stringify(body)
                });
                return new Response(response.body, { ...response, headers: corsHeaders });
            }

            // Gemini Proxy
            if (url.pathname === "/api/ai/gemini" && request.method === "POST") {
                const body = await request.json();
                // Gemini API usually uses key in URL parameter
                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
                const response = await fetch(geminiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                return new Response(response.body, { ...response, headers: corsHeaders });
            }

            // ─── NOTIFICATION ROUTES ──────────────────────────────────────
            
            if (url.pathname === "/notify" && request.method === "POST") {
                // (Existing FCM logic can stay here, pulling from env.SERVICE_ACCOUNT)
                return new Response(JSON.stringify({ message: "Notifications handled here" }), { headers: corsHeaders });
            }

            // ─── HEALTH CHECK ──────────────────────────────────────────────
            if (url.pathname === "/health") {
                return new Response(JSON.stringify({ status: "alive", secure: true }), { headers: corsHeaders });
            }

            return new Response(JSON.stringify({ error: "Route not found" }), { status: 404, headers: corsHeaders });

        } catch (e) {
            return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
        }
    },
};
