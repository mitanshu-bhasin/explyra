import { corsHeadersForRequest } from "../_cors.js";

export async function onRequest(context) {
    const { request, env } = context;

    const headers = corsHeadersForRequest(request, env, {
        skipContentType: request.method === "OPTIONS",
    });

    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: corsHeadersForRequest(request, env),
        });
    }

    try {
        const { base64Data, prompt } = await request.json();
        if (!base64Data) {
            return new Response(JSON.stringify({ error: 'Missing "base64Data"' }), {
                status: 400,
                headers: corsHeadersForRequest(request, env),
            });
        }

        const GEMINI_KEY = env.GEMINI_API_KEY;
        if (!GEMINI_KEY) {
            return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured in environment" }), {
                status: 500,
                headers: corsHeadersForRequest(request, env),
            });
        }

        const MODEL = "gemini-flash-latest";
        const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt || "Analyze this receipt image and return JSON array of items." },
                        { inlineData: { mimeType: "image/jpeg", data: base64Data } }
                    ]
                }],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            })
        });

        const data = await response.json();
        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Gemini API call failed", details: data }), {
                status: response.status,
                headers: corsHeadersForRequest(request, env),
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: corsHeadersForRequest(request, env),
        });

    } catch (error) {
        console.error("Scan error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
            status: 500,
            headers: corsHeadersForRequest(request, env),
        });
    }
}
