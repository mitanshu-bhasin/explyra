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

    if (!env.GROQ_API_KEY) {
        console.error("GROQ_API_KEY is not configured");
        return new Response(JSON.stringify({ error: "Service unavailable" }), {
            status: 503,
            headers: corsHeadersForRequest(request, env),
        });
    }

    try {
        const body = await request.json();
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${env.GROQ_API_KEY}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: corsHeadersForRequest(request, env),
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: corsHeadersForRequest(request, env),
        });
    }
}
