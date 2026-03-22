const ALLOWED_ORIGINS = new Set([
  'https://explyra.me',
  'https://www.explyra.me',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5502',
  'http://localhost:5502'
]);

export function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}
