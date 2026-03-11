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
    const { messageId, fromName, fromEmail, to, subject, textBody, htmlBody } = req.body;

    const fromAddress = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

    let cleanText = textBody || '';
    
    // Fallback: Strip common SMTP headers if they accidentally appear at the start of the body
    const headerPattern = /^(Received:|ARC-Seal:|ARC-Message-Signature:|ARC-Authentication-Results:|DKIM-Signature:|X-Google-DKIM-Signature:|X-Gm-Message-State:|X-Gm-Gg:|X-Received:|MIME-Version:|From:|Date:|X-Gm-Features:|Message-ID:|Subject:|To:|Content-Type:|--)/i;
    
    if (headerPattern.test(cleanText)) {
      // If we find headers, try to find the first double newline or boundary that separates headers from body
      const bodyStart = cleanText.search(/\r?\n\r?\n/);
      if (bodyStart !== -1) {
        cleanText = cleanText.substring(bodyStart).trim();
      }
    }

    await db.collection('emails').add({
      messageId: messageId || "",
      from: fromAddress || 'unknown',
      to: to || 'unknown',
      subject: subject || '(No Subject)',
      textBody: cleanText,
      htmlBody: htmlBody || '',
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
