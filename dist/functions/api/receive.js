import { corsHeadersForRequest } from "../_cors.js";

export async function onRequest(context) {
  const { request, env } = context;

  const headers = corsHeadersForRequest(request, env, {
    allowHeaders: "Content-Type, X-Webhook-Secret",
    skipContentType: request.method === "OPTIONS",
  });

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeadersForRequest(request, env, {
        allowHeaders: "Content-Type, X-Webhook-Secret",
      }),
    });
  }

  try {
    const body = await request.json();
    const { from, to, subject, body: emailBody } = body;

    const PROJECT_ID = env.FIREBASE_PROJECT_ID || "explyras";
    const API_KEY = env.FIREBASE_API_KEY || "";

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "FIREBASE_API_KEY is not configured" }), {
        status: 500,
        headers: corsHeadersForRequest(request, env, {
          allowHeaders: "Content-Type, X-Webhook-Secret",
        }),
      });
    }

    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/emails?key=${API_KEY}`;

    const firestoreDoc = {
      fields: {
        from: { stringValue: from || "unknown" },
        to: { stringValue: to || "unknown" },
        subject: { stringValue: subject || "(No Subject)" },
        body: { stringValue: emailBody || "" },
        timestamp: { stringValue: new Date().toISOString() },
        read: { booleanValue: false },
        folder: { stringValue: "inbox" },
      },
    };

    const response = await fetch(firestoreUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(firestoreDoc),
    });

    const data = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, docId: data.name }), {
        status: 200,
        headers: corsHeadersForRequest(request, env, {
          allowHeaders: "Content-Type, X-Webhook-Secret",
        }),
      });
    } else {
      console.error("Firestore write error:", data);
      return new Response(JSON.stringify({ success: false, error: "Firestore write failed", details: data }), {
        status: 200,
        headers: corsHeadersForRequest(request, env, {
          allowHeaders: "Content-Type, X-Webhook-Secret",
        }),
      });
    }
  } catch (error) {
    console.error("Receive error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: corsHeadersForRequest(request, env, {
        allowHeaders: "Content-Type, X-Webhook-Secret",
      }),
    });
  }
}
