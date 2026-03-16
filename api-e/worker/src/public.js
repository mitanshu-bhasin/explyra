import { kvGet, kvPut, jsonResponse, errorResponse } from './utils.js';

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
 * Public Endpoint: Expenses CRUD Stubs
 */
export async function handleExpenses(request, env, context) {
  const method = request.method;

  if (method === "GET") {
    return jsonResponse({
      expenses: [
        { id: "exp_1", amount: 120.50, currency: "USD", category: "Travel", date: "2026-03-16" },
        { id: "exp_2", amount: 45.00, currency: "USD", category: "Meals", date: "2026-03-16" }
      ]
    });
  }

  if (method === "POST") {
    const body = await request.json();
    return jsonResponse({ message: "Expense created", data: body }, 201);
  }

  // TODO: Implement PUT, DELETE, and R2 integration for attachments
  return errorResponse("method_not_allowed", "Method not supported for this endpoint", 405);
}
