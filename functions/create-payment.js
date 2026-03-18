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

    const planPrices = {
      Starter: { monthly: 999, yearly: 799 },
      Growth: { monthly: 2499, yearly: 1999 },
      Scale: { monthly: 6999, yearly: 5599 },
      Enterprise: { monthly: 9999, yearly: 7999 }
    };

    if (!planPrices[plan]) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        status: 400,
        headers
      });
    }

    const selectedPlanPrice = planPrices[plan][period];
    const orderId = `EXPLYRA_${Date.now()}`;

    const nowResponse = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price_amount: selectedPlanPrice,
        price_currency: "usd",
        pay_currency: "usdttrc20",
        order_id: orderId,
        order_description: `Explyra ${plan} (${period}) plan purchase`
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

    return new Response(
      JSON.stringify({
        invoice_url: nowData.invoice_url,
        order_id: orderId
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
