import { verifyJWT, errorResponse, jsonResponse } from './utils.js';
import { registerCompany, loginAdmin, createApiKey, revokeApiKey } from './admin.js';
import { validateRequest, handlePing, handleExpenses } from './public.js';
import { handleBillingWebhook } from './billingWebhook.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // --- CORS Handling ---
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key, x-webhook-signature",
          },
        });
      }

      // --- Admin Routes (Public) ---
      if (path === "/admin/register-company" && request.method === "POST") {
        return await registerCompany(request, env);
      }
      if (path === "/admin/login" && request.method === "POST") {
        return await loginAdmin(request, env);
      }

      // --- Admin Routes (Protected by JWT) ---
      if (path.startsWith("/admin/")) {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return errorResponse("unauthorized", "JWT required", 401);
        }
        const token = authHeader.split(" ")[1];
        const decoded = await verifyJWT(token, env.JWT_SECRET);
        if (!decoded) {
          return errorResponse("unauthorized", "Invalid or expired session", 401);
        }

        if (path === "/admin/create-api-key" && request.method === "POST") {
          return await createApiKey(request, env, decoded);
        }
        if (path === "/admin/revoke-api-key" && request.method === "POST") {
          return await revokeApiKey(request, env, decoded);
        }
      }

      // --- Webhook Routes ---
      if (path === "/webhook/billing" && request.method === "POST") {
        return await handleBillingWebhook(request, env);
      }

      // --- Public API Routes (v1) ---
      if (path.startsWith("/v1/")) {
        const auth = await validateRequest(request, env);
        if (auth.error) return auth.error;

        if (path === "/v1/ping") {
          return await handlePing(request, env, auth);
        }
        if (path === "/v1/expenses") {
          return await handleExpenses(request, env, auth);
        }
      }

      return errorResponse("not_found", "Route not found", 404);

    } catch (err) {
      console.error(err);
      return errorResponse("internal_error", "An unexpected error occurred", 500);
    }
  }
};
