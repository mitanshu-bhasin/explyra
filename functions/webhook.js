export async function onRequest(context) {
  const { request, env } = context;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-nowpayments-sig",
    "Content-Type": "application/json"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers
    });
  }

  try {
    const payload = await request.json();
    const paymentStatus = payload?.payment_status || "unknown";

    if (paymentStatus === "finished") {
      await markUserAsPaid(payload, env);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Webhook processing failed", details: error?.message || String(error) }),
      { status: 500, headers }
    );
  }
}

async function markUserAsPaid(payload, env) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;
  const userId = payload?.user_id || payload?.userId;

  if (!projectId || !apiKey || !userId) {
    return;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${encodeURIComponent(
    userId
  )}?key=${apiKey}&updateMask.fieldPaths=paid&updateMask.fieldPaths=accessUnlocked&updateMask.fieldPaths=paymentStatus&updateMask.fieldPaths=lastOrderId`;

  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        paid: { booleanValue: true },
        accessUnlocked: { booleanValue: true },
        paymentStatus: { stringValue: "finished" },
        lastOrderId: { stringValue: String(payload?.order_id || "") }
      }
    })
  });
}
