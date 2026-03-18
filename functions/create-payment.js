export async function onRequest(context) {
  const { request, env } = context;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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
    const apiKey = env.NOWPAYMENTS_API_KEY || "";
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "NOWPAYMENTS_API_KEY is missing" }), {
        status: 500,
        headers
      });
    }

    const body = await request.json();
    const plan = String(body?.plan || "").trim();
    const period = body?.period === "yearly" ? "yearly" : "monthly";
    const userId = body?.user_id ? String(body.user_id).trim() : "";
    const companyId = body?.company_id ? String(body.company_id).trim() : "";

    const planPrices = {
      Starter: { monthly: 999, yearly: 799 },
      Growth: { monthly: 2499, yearly: 1999 },
      Scale: { monthly: 6999, yearly: 5599 },
      Enterprise: { monthly: 9999, yearly: 7999 }
    };

    const usdInrRate = Number(env.USD_INR_RATE || 83);
    const safeRate = Number.isFinite(usdInrRate) && usdInrRate > 0 ? usdInrRate : 83;

    if (!planPrices[plan]) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400,
        headers
      });
    }

    if (!companyId) {
      return new Response(JSON.stringify({ error: "company_id is required" }), {
        status: 400,
        headers
      });
    }

    const selectedPlanPriceInr = planPrices[plan][period];
    const selectedPlanPriceUsd = Number((selectedPlanPriceInr / safeRate).toFixed(2));
    const orderId = `EXPLYRA_${Date.now()}`;
    const origin = new URL(request.url).origin;
    const webhookUrl = `${origin}/webhook`;

    const nowResponse = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price_amount: selectedPlanPriceUsd,
        price_currency: "usd",
        pay_currency: "usdttrc20",
        order_id: orderId,
        order_description: `Explyra ${plan} (${period}) plan purchase for ${companyId} - INR ${selectedPlanPriceInr} (~USD ${selectedPlanPriceUsd})`,
        ipn_callback_url: webhookUrl
      })
    });

    const rawText = await nowResponse.text();
    let nowData = {};
    try {
      nowData = rawText ? JSON.parse(rawText) : {};
    } catch {
      nowData = { raw: rawText };
    }

    if (!nowResponse.ok || !nowData.invoice_url) {
      return new Response(
        JSON.stringify({
          error: "NOWPayments invoice creation failed",
          details: nowData
        }),
        {
          status: nowResponse.ok ? 502 : nowResponse.status,
          headers
        }
      );
    }

    await savePaymentOrder(env, {
      orderId,
      userId,
      companyId,
      plan,
      period,
      amountInr: selectedPlanPriceInr,
      amountUsd: selectedPlanPriceUsd,
      paymentStatus: "pending"
    });

    return new Response(
      JSON.stringify({
        invoice_url: nowData.invoice_url,
        order_id: orderId,
        amount_inr: selectedPlanPriceInr,
        amount_usd: selectedPlanPriceUsd,
        usd_inr_rate: safeRate
      }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error?.message || String(error)
      }),
      { status: 500, headers }
    );
  }
}

async function savePaymentOrder(env, order) {
  const projectId = env.FIREBASE_PROJECT_ID;
  const apiKey = env.FIREBASE_API_KEY;

  if (!projectId || !apiKey || !order.orderId) {
    return;
  }

  const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/payment_orders/${encodeURIComponent(
    order.orderId
  )}?key=${apiKey}`;

  await fetch(docUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {
        orderId: { stringValue: order.orderId },
        userId: { stringValue: order.userId || "" },
        companyId: { stringValue: order.companyId || "" },
        plan: { stringValue: order.plan || "" },
        period: { stringValue: order.period || "" },
        amountInr: { integerValue: String(order.amountInr || 0) },
        amountUsd: { doubleValue: order.amountUsd || 0 },
        paymentStatus: { stringValue: order.paymentStatus || "pending" },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    })
  });
}
