import { kvGet, kvPut, jsonResponse, errorResponse } from './utils.js';
import { syncToFirebase } from './firebase.js';

const PLAN_QUOTAS = {
  starter: 1000,
  growth: 10000,
  enterprise: 100000
};

/**
 * Validate API Key & Check Quota
 */
export async function validateRequest(request, env) {
  const authHeader = request.headers.get("Authorization") || request.headers.get("x-api-key");
  const apiKey = authHeader?.replace("Bearer ", "");

  if (!apiKey) {
    return { error: errorResponse("missing_key", "API key required", 401) };
  }

  const keyData = await kvGet(env.EXPLYRA_API_KEYS, `key:${apiKey}`);
  if (!keyData || keyData.revoked) {
    return { error: errorResponse("invalid_key", "Invalid or revoked API key", 401) };
  }

  const company = await kvGet(env.EXPLYRA_COMPANIES, `company:${keyData.company_id}`);
  if (!company) {
    return { error: errorResponse("company_not_found", "Company account missing", 404) };
  }

  // Check Usage
  const hourKey = new Date().toISOString().substring(0, 13); // YYYY-MM-DDTHH
  const usageKey = `usage:${company.id}:${hourKey}`;
  const currentUsage = (await env.EXPLYRA_USAGE.get(usageKey)) || 0;
  const limit = PLAN_QUOTAS[company.plan] || PLAN_QUOTAS.starter;

  if (parseInt(currentUsage) >= limit) {
    return { error: errorResponse("rate_limit_exceeded", `Hourly quota exceeded for ${company.plan} plan`, 429) };
  }

  // Increment Usage (Async - fire and forget or wait if consistency is critical)
  await env.EXPLYRA_USAGE.put(usageKey, (parseInt(currentUsage) + 1).toString(), { expirationTtl: 3600 * 24 });

  return { company, apiKey };
}

/**
 * Public Endpoint: Ping
 */
export async function handlePing(request, env, context) {
  return jsonResponse({ message: "pong", timestamp: new Date().toISOString(), company: context.company.id });
}

/**
 * Public Endpoint: Expenses CRUD
 */
export async function handleExpenses(request, env, context) {
  const method = request.method;
  const companyId = context.company.id;

  if (method === "GET") {
    const list = await env.EXPLYRA_EXPENSES.list({ prefix: `exp:${companyId}:` });
    const expenses = [];
    for (const item of list.keys) {
      const val = await env.EXPLYRA_EXPENSES.get(item.name);
      if (val) expenses.push(JSON.parse(val));
    }
    
    // If empty, return a sample stub
    if (expenses.length === 0) {
      return jsonResponse({
        expenses: [
          { id: "exp_1", amount: 120.50, currency: "USD", category: "Travel", date: "2026-03-16", note: "Sample data" }
        ]
      });
    }

    return jsonResponse({ expenses });
  }

  if (method === "POST") {
    const body = await request.json();
    const expId = `exp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newExpense = {
      id: expId,
      company_id: companyId,
      amount: body.amount,
      currency: body.currency || "USD",
      category: body.category || "General",
      date: body.date || new Date().toISOString().split('T')[0],
      note: body.note || "",
      created_at: new Date().toISOString(),
      created_by: context.apiKey.substring(0, 10) + "..."
    };

    await env.EXPLYRA_EXPENSES.put(`exp:${companyId}:${expId}`, JSON.stringify(newExpense));

    // --- Sync to Main Firebase ---
    const synced = await syncToFirebase(newExpense, env);

    return jsonResponse({ 
      message: "Expense created successfully", 
      expense: newExpense,
      firebase_sync: synced ? "success" : "failed" 
    }, 201);
  }

  return errorResponse("method_not_allowed", "Method not supported", 405);
}
