import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { verifyJWT, errorResponse } from "./utils.js";
import {
  registerCompany,
  loginAdmin,
  createApiKey,
  revokeApiKey,
  listApiKeys,
  updateApiKeyStatus,
  deleteApiKey,
} from "./admin.js";
import { validateRequest, handlePing, handleExpenses } from "./public.js";
import { handleBillingWebhook } from "./billingWebhook.js";
import { rateLimitCheck } from "./rateLimit.mjs";

const ALLOWED_ORIGINS = ["https://explyra.me", "https://www.explyra.me"];

const app = new Hono();

app.use(
  "*",
  secureHeaders({
    xFrameOptions: "DENY",
    xXssProtection: "1; mode=block",
    xContentTypeOptions: "nosniff",
    strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
    referrerPolicy: "strict-origin-when-cross-origin",
  })
);

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return "https://explyra.me";
      return ALLOWED_ORIGINS.includes(origin) ? origin : null;
    },
    allowMethods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    allowHeaders: ["Content-Type", "Authorization", "x-api-key", "x-webhook-signature"],
    exposeHeaders: [],
    maxAge: 86400,
    credentials: true,
  })
);

app.use("*", async (c, next) => {
  const ip = c.req.header("CF-Connecting-IP") || "0.0.0.0";
  const path = new URL(c.req.url).pathname;
  if (
    path.startsWith("/v1/") ||
    path.startsWith("/admin/") ||
    path.startsWith("/webhook/")
  ) {
    const rl = await rateLimitCheck(c.env, ip, path);
    if (!rl.ok) {
      return c.json({ error: "rate_limited", message: "Too many requests" }, 429);
    }
  }
  await next();
});

app.use("/admin/*", async (c, next) => {
  const path = new URL(c.req.url).pathname;
  if (path === "/admin/register-company" || path === "/admin/login") {
    return next();
  }
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse("unauthorized", "JWT required", 401);
  }
  const token = authHeader.split(" ")[1];
  const decoded = await verifyJWT(token, c.env.JWT_SECRET);
  if (!decoded) {
    return errorResponse("unauthorized", "Invalid or expired session", 401);
  }
  c.set("jwt", decoded);
  await next();
});

app.post("/admin/register-company", async (c) => registerCompany(c.req.raw, c.env));
app.post("/admin/login", async (c) => loginAdmin(c.req.raw, c.env));

app.post("/admin/create-api-key", async (c) =>
  createApiKey(c.req.raw, c.env, c.get("jwt"))
);
app.post("/admin/revoke-api-key", async (c) =>
  revokeApiKey(c.req.raw, c.env, c.get("jwt"))
);
app.get("/admin/list-api-keys", async (c) =>
  listApiKeys(c.req.raw, c.env, c.get("jwt"))
);
app.post("/admin/update-api-key-status", async (c) =>
  updateApiKeyStatus(c.req.raw, c.env, c.get("jwt"))
);
app.post("/admin/delete-api-key", async (c) =>
  deleteApiKey(c.req.raw, c.env, c.get("jwt"))
);

app.post("/webhook/billing", async (c) => handleBillingWebhook(c.req.raw, c.env));

app.all("/v1/*", async (c) => {
  const path = new URL(c.req.url).pathname;
  const auth = await validateRequest(c.req.raw, c.env);
  if (auth.error) return auth.error;

  if (path === "/v1/ping") {
    return handlePing(c.req.raw, c.env, auth);
  }
  if (path === "/v1/expenses") {
    return handleExpenses(c.req.raw, c.env, auth);
  }
  return errorResponse("not_found", "Route not found", 404);
});

app.notFound((c) => errorResponse("not_found", "Route not found", 404));

app.onError((err, c) => {
  console.error(err);
  return errorResponse("internal_error", "An unexpected error occurred", 500);
});

export default {
  fetch: app.fetch,
};
