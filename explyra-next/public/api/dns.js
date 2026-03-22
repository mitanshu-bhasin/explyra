export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, name, content, ttl, proxied, action } = req.body;

  const CLOUDFLARE_API_TOKEN = (window.EXPLYRA_CONFIG?.emailApp?.cloudflareToken || "REDACTED");
  const CLOUDFLARE_ZONE_ID = '17279e3699e4721a9952206ddbe8b1ee';

  try {
    let url = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records`;
    let method = 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, name, content, ttl: ttl || 1, proxied: proxied || false }),
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ error: data.errors[0].message });
    }

    return res.status(200).json(data.result);
  } catch (error) {
    console.error('[DNS Backend Error]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
