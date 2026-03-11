import { auth, db } from './_lib/firebase.js';

const CF_API = 'https://api.cloudflare.com/client/v4';
const CF_TOKEN = process.env.CLOUDFLARE_TOKEN || 'YgjDGPr4Kt2A2lnTVI71vaJqDPs70LAue9c1ZGMK';
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || '17279e3699e4721a9952206ddbe8b1ee';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify Firebase Auth token
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No auth token' });

  try {
    const decoded = await auth.verifyIdToken(token);
    const { alias } = req.body;

    if (!alias) {
      return res.status(400).json({ error: 'Missing alias email address' });
    }

    // Check if alias already exists for this user
    const userDoc = await db.collection('users').doc(decoded.uid).get();
    if (userDoc.exists && userDoc.data().alias) {
      return res.status(200).json({ success: true, message: 'Alias already exists', alias: userDoc.data().alias });
    }

    // Step 1: Create a destination address (the user's real email)
    const destRes = await fetch(`${CF_API}/accounts/${ACCOUNT_ID}/email/routing/addresses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: decoded.email }),
    });
    const destData = await destRes.json();

    // Step 2: Create a routing rule to forward alias → email worker
    const ruleRes = await fetch(`${CF_API}/zones/${ZONE_ID}/email/routing/rules`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        actions: [{ type: 'worker', value: ['email-worker'] }],
        matchers: [{ field: 'to', type: 'literal', value: alias }],
        enabled: true,
        name: `Route for ${alias}`,
      }),
    });
    const ruleData = await ruleRes.json();

    // Step 3: Save user alias mapping in Firestore
    await db.collection('users').doc(decoded.uid).set({
      email: decoded.email,
      alias,
      displayName: decoded.name || '',
      createdAt: new Date().toISOString(),
    }, { merge: true });

    return res.status(200).json({
      success: true,
      destination: destData,
      rule: ruleData,
    });
  } catch (error) {
    console.error('Error creating alias:', error);
    return res.status(500).json({ error: 'Failed to create alias' });
  }
}
