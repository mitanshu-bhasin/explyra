module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { to, subject, body, from } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'Missing "to" or "subject"' });
    }

    // Hardcoded Resend API Key & sender
    const RESEND_KEY = 're_frUajX2k_7oWbz3faKEkzYcH4hfJetQnw';
    const fromAddress = from || 'Mitanshu <mitanshu@explyra.me>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: Array.isArray(to) ? to : [to],
        subject,
        text: body || '',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, id: data.id });
    } else {
      return res.status(response.status).json({ 
        error: data.message || 'Resend API error', 
        details: data,
      });
    }
  } catch (error) {
    console.error('Send error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
