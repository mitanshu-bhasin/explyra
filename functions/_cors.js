/**
 * CORS for Cloudflare Pages Functions: reflect Origin only when listed in ALLOWED_ORIGINS.
 * Default list includes production + common local dev ports.
 */
const DEFAULT_ALLOWED =
  "https://explyra.me,https://www.explyra.me,http://localhost:3000,http://127.0.0.1:3000,http://localhost:8787,http://127.0.0.1:8787,http://localhost:5000,http://127.0.0.1:5000";

export function parseAllowedOrigins(env) {
  const raw = env.ALLOWED_ORIGINS || DEFAULT_ALLOWED;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * @param {Request} request
 * @param {Record<string, string | undefined>} env
 * @param {{ methods?: string; allowHeaders?: string; contentType?: string; skipContentType?: boolean }} [opts]
 */
export function corsHeadersForRequest(request, env, opts = {}) {
  const allowed = parseAllowedOrigins(env);
  const origin = request.headers.get("Origin");
  let allowOrigin = null;
  if (origin && allowed.includes(origin)) {
    allowOrigin = origin;
  }

  const methods = opts.methods ?? "POST, OPTIONS";
  const allowHeaders = opts.allowHeaders ?? "Content-Type, Authorization";

  /** @type {Record<string, string>} */
  const headers = {
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": allowHeaders,
    "Vary": "Origin",
  };
  if (allowOrigin) {
    headers["Access-Control-Allow-Origin"] = allowOrigin;
  }
  if (!opts.skipContentType) {
    headers["Content-Type"] = opts.contentType ?? "application/json";
  }
  return headers;
}
