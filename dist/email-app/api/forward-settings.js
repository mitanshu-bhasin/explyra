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
    // 1. Fetch user by email address (which we use as the doc ID in the users collection)
    const userDocRef = db.collection('users').doc(email.toLowerCase());
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(200).json({ 
        forwardingEnabled: false, 
        personalEmail: null 
      });
    }

    const userData = userDoc.data();
    
    return res.status(200).json({ 
      forwardingEnabled: userData.forwardingEnabled || false,
      personalEmail: userData.personalEmail || null
    });
  } catch (error) {
    console.error('Error fetching forward settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
