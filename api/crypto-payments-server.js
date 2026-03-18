const express = require("express");
const dotenv = require("dotenv");
const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

dotenv.config();
const app = express();

const PORT = Number(process.env.PORT || 8787);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || "http://localhost:8787";
const STATE_FILE = path.join(__dirname, "payment-state.json");

const PLAN_PRICES_INR = {
  Starter: { monthly: 999, yearly: 799 },
  Growth: { monthly: 2499, yearly: 1999 },
  Scale: { monthly: 6999, yearly: 5599 },
  Enterprise: { monthly: 9999, yearly: 7999 }
};

const USD_INR_RATE = Number(process.env.USD_INR_RATE || 83);

function convertInrToUsd(amountInr) {
  const safeRate = Number.isFinite(USD_INR_RATE) && USD_INR_RATE > 0 ? USD_INR_RATE : 83;
  return Number((amountInr / safeRate).toFixed(2));
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-nowpayments-sig");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "crypto-payments" });
});

app.use(express.static(ROOT_DIR));

app.post("/create-payment", express.json(), async (req, res) => {
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "NOWPAYMENTS_API_KEY is missing" });
    }

    const {
      plan,
      period = "monthly",
      user_id = null,
      customer_email = null,
      public_identifier = null
    } = req.body || {};

    const normalizedPlan = typeof plan === "string" ? plan.trim() : "";
    const normalizedPeriod = period === "yearly" ? "yearly" : "monthly";
    const selectedPlan = PLAN_PRICES_INR[normalizedPlan];

    if (!selectedPlan) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const selectedPlanPriceInr = selectedPlan[normalizedPeriod];
    const selectedPlanPriceUsd = convertInrToUsd(selectedPlanPriceInr);
    const orderId = `EXPLYRA_${Date.now()}`;

    const payload = {
      price_amount: selectedPlanPriceUsd,
      price_currency: "usd",
      pay_currency: "usdttrc20",
      order_id: orderId,
      order_description: `Explyra ${normalizedPlan} (${normalizedPeriod}) plan purchase - INR ${selectedPlanPriceInr} (~USD ${selectedPlanPriceUsd})`,
      success_url: `${PUBLIC_SITE_URL}/pricing.html?payment=success&order_id=${orderId}`,
      cancel_url: `${PUBLIC_SITE_URL}/pricing.html?payment=cancelled&order_id=${orderId}`
    };

    if (process.env.PUBLIC_API_URL) {
      payload.ipn_callback_url = `${process.env.PUBLIC_API_URL.replace(/\/$/, "")}/webhook`;
    }

    const nowResponse = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const rawText = await nowResponse.text();
    let nowData = null;
    try {
      nowData = rawText ? JSON.parse(rawText) : {};
    } catch {
      nowData = { raw: rawText };
    }

    if (!nowResponse.ok) {
      return res.status(nowResponse.status).json({
        error: "NOWPayments invoice creation failed",
        details: nowData
      });
    }

    const invoiceUrl = nowData.invoice_url;
    if (!invoiceUrl) {
      return res.status(502).json({
        error: "NOWPayments response missing invoice_url",
        details: nowData
      });
    }

    await writeLocalPaymentState({
      order_id: orderId,
      plan: normalizedPlan,
      period: normalizedPeriod,
      amount_inr: selectedPlanPriceInr,
      amount_usd: selectedPlanPriceUsd,
      currency: "usd",
      user_id,
      customer_email,
      public_identifier,
      payment_status: "pending",
      unlock_access: false,
      created_at: new Date().toISOString(),
      nowpayments_invoice_id: nowData.id || null,
      invoice_url: invoiceUrl
    });

    return res.json({
      invoice_url: invoiceUrl,
      order_id: orderId,
      amount_inr: selectedPlanPriceInr,
      amount_usd: selectedPlanPriceUsd,
      usd_inr_rate: USD_INR_RATE
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : "";

    if (process.env.NOWPAYMENTS_IPN_SECRET) {
      const signature = req.get("x-nowpayments-sig") || "";
      const expected = crypto
        .createHmac("sha512", process.env.NOWPAYMENTS_IPN_SECRET)
        .update(rawBody)
        .digest("hex");

      if (!signature || signature !== expected) {
        return res.status(401).json({ error: "Invalid webhook signature" });
      }
    }

    const payload = rawBody ? JSON.parse(rawBody) : {};
    const orderId = payload.order_id || payload.orderId || null;
    const paymentStatus = payload.payment_status || payload.paymentStatus || "unknown";

    const updates = {
      order_id: orderId,
      nowpayments_payment_id: payload.payment_id || null,
      pay_currency: payload.pay_currency || payload.payCurrency || null,
      price_currency: payload.price_currency || payload.priceCurrency || null,
      payment_status: paymentStatus,
      updated_at: new Date().toISOString()
    };

    if (paymentStatus === "finished") {
      updates.paid_at = new Date().toISOString();
      updates.unlock_access = true;
      updates.access_unlocked = true;
      updates.user_paid = true;
    }

    await writeLocalPaymentState(updates);
    await syncPaymentToFirestoreIfConfigured(payload, updates);

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: "Webhook processing failed",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

async function writeLocalPaymentState(update) {
  const state = await readLocalPaymentState();
  const entries = Array.isArray(state.payments) ? state.payments : [];

  const index = entries.findIndex((item) => {
    if (update.order_id && item.order_id === update.order_id) return true;
    if (update.nowpayments_payment_id && item.nowpayments_payment_id === update.nowpayments_payment_id) return true;
    return false;
  });

  if (index >= 0) {
    entries[index] = { ...entries[index], ...update };
  } else {
    entries.push(update);
  }

  await fs.writeFile(
    STATE_FILE,
    JSON.stringify({ payments: entries }, null, 2),
    "utf8"
  );
}

async function readLocalPaymentState() {
  try {
    const raw = await fs.readFile(STATE_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { payments: [] };
  }
}

async function syncPaymentToFirestoreIfConfigured(webhookPayload, updates) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey = process.env.FIREBASE_API_KEY;

  if (!projectId || !apiKey) {
    return;
  }

  const userId = webhookPayload.user_id || webhookPayload.userId || null;
  if (!userId) {
    return;
  }

  const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${encodeURIComponent(
    userId
  )}?key=${apiKey}&updateMask.fieldPaths=paid&updateMask.fieldPaths=accessUnlocked&updateMask.fieldPaths=paymentStatus&updateMask.fieldPaths=lastOrderId`;

  const body = {
    fields: {
      paid: { booleanValue: updates.payment_status === "finished" },
      accessUnlocked: { booleanValue: updates.payment_status === "finished" },
      paymentStatus: { stringValue: updates.payment_status || "unknown" },
      lastOrderId: { stringValue: updates.order_id || "" }
    }
  };

  await fetch(docUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

app.listen(PORT, () => {
  console.log(`Crypto payments API running at http://localhost:${PORT}`);
});
