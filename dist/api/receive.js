module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Secret');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { from, to, subject, body } = req.body;

    // Hardcoded Firebase config
    // Environment variables
    const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'explyras';
    const API_KEY = process.env.FIREBASE_API_KEY || 'ENV_MISSING';

    // Write to Firestore "emails" collection using REST API
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/emails?key=${API_KEY}`;

    const firestoreDoc = {
      fields: {
        from: { stringValue: from || 'unknown' },
        to: { stringValue: to || 'unknown' },
        subject: { stringValue: subject || '(No Subject)' },
        body: { stringValue: body || '' },
        timestamp: { stringValue: new Date().toISOString() },
        read: { booleanValue: false },
        folder: { stringValue: 'inbox' },
      },
    };

    const response = await fetch(firestoreUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(firestoreDoc),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, docId: data.name });
    } else {
      console.error('Firestore write error:', data);
      return res.status(200).json({ success: false, error: 'Firestore write failed', details: data });
    }
  } catch (error) {
    console.error('Receive error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
