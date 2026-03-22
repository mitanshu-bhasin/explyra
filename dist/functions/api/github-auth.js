import { corsHeadersForRequest } from "../_cors.js";

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === "OPTIONS") {
        return new Response(null, {
            headers: corsHeadersForRequest(request, env, {
                methods: "GET, POST, OPTIONS",
                skipContentType: true,
            }),
        });
    }

    if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
            headers: corsHeadersForRequest(request, env),
        });
    }

    const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        console.error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not configured");
        return new Response(JSON.stringify({ error: "OAuth not configured" }), {
            status: 503,
            headers: corsHeadersForRequest(request, env),
        });
    }

    try {
        const body = await request.json();
        const { code } = body;

        if (!code) {
            return new Response(JSON.stringify({ error: "Code is required" }), {
                status: 400,
                headers: corsHeadersForRequest(request, env),
            });
        }

        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return new Response(JSON.stringify({ error: data.error_description || data.error }), {
                status: 400,
                headers: corsHeadersForRequest(request, env),
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: corsHeadersForRequest(request, env),
        });
    } catch (error) {
        console.error("[OAuth Backend Error]", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: corsHeadersForRequest(request, env),
        });
    }
}
