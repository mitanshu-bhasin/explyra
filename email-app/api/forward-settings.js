import { db } from './_lib/firebase.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Verify webhook secret from Cloudflare Worker
  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Missing email parameter' });
  }

  try {
    const normalizedEmail = email.toLowerCase();

    // Users are stored by UID; resolve by email field.
    const q = await db.collection('users').where('email', '==', normalizedEmail).limit(1).get();

    if (q.empty) {
      return res.status(200).json({ 
        forwardingEnabled: false, 
        personalEmail: null 
      });
    }

    const userData = q.docs[0].data();
    
    return res.status(200).json({ 
      forwardingEnabled: userData.forwardingEnabled ?? userData.forwarding ?? false,
      personalEmail: userData.personalEmail || null
    });
  } catch (error) {
    console.error('Error fetching forward settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
