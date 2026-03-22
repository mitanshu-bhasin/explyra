import { corsHeadersForRequest } from "./_cors.js";

export async function onRequest(context) {
  const { request, env } = context;

  const headers = corsHeadersForRequest(request, env, {
    allowHeaders: "Content-Type, x-nowpayments-sig",
    skipContentType: request.method === "OPTIONS",
  });

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeadersForRequest(request, env, {
        allowHeaders: "Content-Type, x-nowpayments-sig",
      }),
    });
  }

  try {
    const payload = await request.json();
    const paymentStatus = payload?.payment_status || "unknown";
    const orderId = String(payload?.order_id || "");

    if (paymentStatus === "finished") {
      let userId = payload?.user_id || payload?.userId || "";
      if (!userId && orderId) {
        userId = await resolveUserIdByOrderId(env, orderId);
      }

      if (userId) {
        await markUserAsPaid(userId, orderId, env);
      }
    }

    if (orderId) {
      await updatePaymentOrderStatus(env, orderId, paymentStatus);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Webhook processing failed", details: error?.message || String(error) }),
      { status: 500, headers }
    );
  }
}

async function markUserAsPaid(userId, orderId, env) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;

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
        lastOrderId: { stringValue: String(orderId || "") }
      }
    })
  });
}

async function resolveUserIdByOrderId(env, orderId) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;

  if (!projectId || !apiKey || !orderId) {
    return "";
  }

  const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/payment_orders/${encodeURIComponent(
    orderId
  )}?key=${apiKey}`;

  const response = await fetch(docUrl);
  if (!response.ok) {
    return "";
  }

  const data = await response.json();
  return data?.fields?.userId?.stringValue || "";
}

async function updatePaymentOrderStatus(env, orderId, paymentStatus) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;

  if (!projectId || !apiKey || !orderId) {
    return;
  }

  const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/payment_orders/${encodeURIComponent(
    orderId
  )}?key=${apiKey}`;

  await fetch(docUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        paymentStatus: { stringValue: paymentStatus || "unknown" },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    })
  });
}
