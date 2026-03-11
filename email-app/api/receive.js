import { db } from './_lib/firebase.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify webhook secret from Cloudflare Worker
  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { from, to, subject, body } = req.body;

    await db.collection('emails').add({
      from: from || 'unknown',
      to: to || 'unknown',
      subject: subject || '(No Subject)',
      body: body || '',
      timestamp: new Date().toISOString(),
      read: false,
      folder: 'inbox',
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return res.status(500).json({ error: 'Failed to save email' });
  }
}
