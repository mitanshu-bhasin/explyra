export async function onRequest(context) {
  const { request, env } = context;

  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  try {
    const body = await request.json();
    const { to, cc, bcc, subject, htmlBody, textBody, fromEmail, senderName, from, originalMessageId } = body;

    if (!to || !subject) {
      return new Response(JSON.stringify({ error: 'Missing "to" or "subject"' }), { status: 400, headers });
    }

    // Environment variables with fallback for local dev/initial deploy
    const RESEND_KEY = env.RESEND_API_KEY || 'REDACTED_RESEND_KEY';
    const FIREBASE_API_KEY = env.FIREBASE_API_KEY || '"+"(window.EXPLYRA_CONFIG?.firebase?.apiKey || "")+"';
    
    if (!RESEND_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured' }), { status: 500, headers });
    }

    // Construct Resend From address
    let resendFrom = from || env.DEFAULT_FROM_EMAIL || 'Explyra <noreply@explyra.me>';
    if (fromEmail) {
      resendFrom = senderName ? `${senderName} <${fromEmail}>` : fromEmail;
    }

    // Prepare Resend Payload
    const resendPayload = {
      from: resendFrom,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: htmlBody || `<p>${textBody || ''}</p>`,
      text: textBody || (htmlBody ? htmlBody.replace(/<[^>]+>/g, '') : subject),
    };

    if (cc) resendPayload.cc = Array.isArray(cc) ? cc : cc.split(',').map(e => e.trim());
    if (bcc) resendPayload.bcc = Array.isArray(bcc) ? bcc : bcc.split(',').map(e => e.trim());
    
    if (originalMessageId) {
      resendPayload.headers = {
        'In-Reply-To': originalMessageId,
        'References': originalMessageId
      };
    }

    // Call Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    const resendData = await response.json();

    if (response.ok) {
      // Log to Firestore "emails" collection for the "Sent" folder
      try {
        const PROJECT_ID = env.FIREBASE_PROJECT_ID || 'explyras';
        const API_KEY = FIREBASE_API_KEY;
        
        if (API_KEY) {
          const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/emails?key=${API_KEY}`;
          
          await fetch(firestoreUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: {
                from: { stringValue: fromEmail || resendFrom },
                to: { stringValue: Array.isArray(to) ? to.join(', ') : to },
                subject: { stringValue: subject },
                htmlBody: { stringValue: htmlBody || '' },
                textBody: { stringValue: textBody || '' },
                timestamp: { stringValue: new Date().toISOString() },
                read: { booleanValue: true },
                folder: { stringValue: 'sent' },
              }
            })
          });
        }
      } catch (dbError) {
        console.error('Failed to log email to Firestore:', dbError);
      }

      return new Response(JSON.stringify({ success: true, id: resendData.id }), { status: 200, headers });
    } else {
      return new Response(JSON.stringify({ 
        error: resendData.message || 'Resend API error', 
        details: resendData,
      }), { status: response.status, headers });
    }
  } catch (error) {
    console.error('Send error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500, headers });
  }
}
