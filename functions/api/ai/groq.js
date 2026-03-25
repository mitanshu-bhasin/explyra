import { corsHeadersForRequest } from "../../_cors.js";

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === "OPTIONS") {
        return new Response(null, {
            headers: corsHeadersForRequest(request, env, { skipContentType: true }),
        });
    }

    if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405,
            headers: corsHeadersForRequest(request, env, { contentType: "text/plain" }),
        });
    }

    // Hardcoded Groq Key as requested by user
    const GROQ_API_KEY = "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";

    try {
        const body = await request.json();
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: corsHeadersForRequest(request, env),
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: corsHeadersForRequest(request, env),
        });
    }
}
