export async function onRequest(context) {
  const { request, env } = context;

  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Secret',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  try {
    const body = await request.json();
    const { from, to, subject, body: emailBody } = body;

    // Environment variables
    const PROJECT_ID = env.FIREBASE_PROJECT_ID || 'explyras';
    const API_KEY = env.FIREBASE_API_KEY || 'AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0';

    // Write to Firestore "emails" collection using REST API
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/emails?key=${API_KEY}`;

    const firestoreDoc = {
      fields: {
        from: { stringValue: from || 'unknown' },
        to: { stringValue: to || 'unknown' },
        subject: { stringValue: subject || '(No Subject)' },
        body: { stringValue: emailBody || '' },
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
      return new Response(JSON.stringify({ success: true, docId: data.name }), { status: 200, headers });
    } else {
      console.error('Firestore write error:', data);
      return new Response(JSON.stringify({ success: false, error: 'Firestore write failed', details: data }), { status: 200, headers });
    }
  } catch (error) {
    console.error('Receive error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500, headers });
  }
}
