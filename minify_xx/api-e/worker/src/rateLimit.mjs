/**
 * Edge rate limiting using EXPLYRA_USAGE KV (keys prefixed with rl: to avoid quota keys).
 */
const WINDOW_MS = 60_000;

export async function rateLimitCheck(env, ip, pathname) {
  const bucket = Math.floor(Date.now() / WINDOW_MS);
  const key = `rl:${ip}:${bucket}`;
  const limit = pathname.startsWith("/webhook/") ? 120 : pathname.startsWith("/v1/") ? 100 : 80;

  const raw = await env.EXPLYRA_USAGE.get(key);
  const count = parseInt(raw || "0", 10);
  if (count >= limit) {
    return { ok: false };
  }
  await env.EXPLYRA_USAGE.put(key, String(count + 1), { expirationTtl: 120 });
  return { ok: true };
}
