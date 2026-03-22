import { corsHeadersForRequest } from "../_cors.js";

export async function onRequest(context) {
  const { request, env } = context;
  const urlObj = new URL(request.url);
  const recordId = urlObj.searchParams.get("id");

  const CLOUDFLARE_API_TOKEN = env.CLOUDFLARE_API_TOKEN || "";
  const CLOUDFLARE_ZONE_ID = env.CLOUDFLARE_ZONE_ID || "";

  const corsHeaders = corsHeadersForRequest(request, env, {
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    skipContentType: request.method === "OPTIONS",
  });

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!CLOUDFLARE_ZONE_ID || !CLOUDFLARE_API_TOKEN) {
    console.error("CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN is not configured");
    return new Response(JSON.stringify({ error: "DNS API not configured" }), {
      status: 503,
      headers: {
        ...corsHeadersForRequest(request, env, {
          methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        }),
      },
    });
  }

  const cfBaseUrl = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records`;

  try {
    let response;

    if (request.method === "POST") {
      const body = await request.json();
      const { type, name, content, ttl, proxied } = body;
      response = await fetch(cfBaseUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          name,
          content,
          ttl: ttl || 1,
          proxied: proxied || false
        }),
      });
    }
    else if (request.method === "DELETE") {
      const idToDelete = recordId || (await request.json().catch(() => ({}))).recordId;
      if (!idToDelete) {
        return new Response(JSON.stringify({ error: "Missing record ID" }), {
          status: 400,
          headers: {
            ...corsHeadersForRequest(request, env, {
              methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            }),
          },
        });
      }
      response = await fetch(`${cfBaseUrl}/${idToDelete}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}` },
      });
    }
    else if (request.method === "PUT" || request.method === "PATCH") {
      if (!recordId) {
        return new Response(JSON.stringify({ error: "Missing record ID" }), {
          status: 400,
          headers: {
            ...corsHeadersForRequest(request, env, {
              methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            }),
          },
        });
      }
      const body = await request.json();
      response = await fetch(`${cfBaseUrl}/${recordId}`, {
        method: request.method,
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
    else {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: {
          ...corsHeadersForRequest(request, env, {
            methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          }),
        },
      });
    }

    const data = await response.json();
    if (!data.success) {
      return new Response(JSON.stringify({ error: data.errors?.[0]?.message || "Cloudflare API Error" }), {
        status: 400,
        headers: {
          ...corsHeadersForRequest(request, env, {
            methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          }),
        },
      });
    }

    return new Response(JSON.stringify(data.result || { success: true }), {
      status: 200,
      headers: {
        ...corsHeadersForRequest(request, env, {
          methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        }),
      },
    });

  } catch (error) {
    console.error("[DNS Backend Error]", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: {
        ...corsHeadersForRequest(request, env, {
          methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        }),
      },
    });
  }
}
