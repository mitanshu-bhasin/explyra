export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, name, content, ttl, proxied, action } = req.body;

  const CLOUDFLARE_API_TOKEN = '41nEaOY-cxIY0QAXQ23s1vjhF1FEQxcqH7j1wxQW';
  const CLOUDFLARE_ZONE_ID = '3e1dbacd4f4677b1a48b07d0f2bfe585';

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
