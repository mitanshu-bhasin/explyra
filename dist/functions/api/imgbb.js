import { corsHeadersForRequest } from "../_cors.js";

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

    try {
        const formData = await request.formData();
        const image = formData.get("image");
        if (!image) {
            return new Response(JSON.stringify({ error: "No image provided" }), {
                status: 400,
                headers: corsHeadersForRequest(request, env),
            });
        }

        const imgbbData = new FormData();
        imgbbData.append("key", env.IMGBB_KEY);
        imgbbData.append("image", image);

        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: imgbbData,
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
