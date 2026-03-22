/**
 * Cloudflare Pages middleware: canonical host redirect + security headers on all responses.
 * Static asset headers also apply via wrangler.toml [[headers]].
 */
const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "geolocation=(), camera=(), microphone=(), interest-cohort=()",
};

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "explyra.pages.dev" || url.hostname.endsWith(".explyra.pages.dev")) {
    url.hostname = "explyra.me";
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
