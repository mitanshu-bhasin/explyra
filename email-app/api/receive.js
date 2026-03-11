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
    let cleanHtml = htmlBody || '';

    // If the textBody looks like a raw email (has RFC headers), extract the body properly
    const looksRaw = /^(Received:|ARC-Seal:|DKIM-Signature:|MIME-Version:|From:|Message-ID:)/im.test(cleanText);
    if (looksRaw) {
      // Split on the first blank line to separate headers from body
      const parts = cleanText.split(/\r?\n\r?\n/);
      if (parts.length > 1) {
        // The body is everything after the first blank line
        let rawBody = parts.slice(1).join('\n\n').trim();

        // Handle quoted-printable soft line breaks and =XX encoding
        rawBody = rawBody
          .replace(/=\r?\n/g, '')                        // soft line breaks
          .replace(/=[0-9A-Fa-f]{2}/g, m =>              // =XX → char
            String.fromCharCode(parseInt(m.slice(1), 16))
          );

        // If multipart boundary exists, try to extract text/plain part
        const boundaryMatch = cleanText.match(/boundary="([^"]+)"/i);
        if (boundaryMatch) {
          const boundary = boundaryMatch[1];
          const boundaryParts = rawBody.split(new RegExp(`--${boundary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
          for (const part of boundaryParts) {
            if (/Content-Type:\s*text\/plain/i.test(part)) {
              const bodyContent = part.split(/\r?\n\r?\n/).slice(1).join('\n\n').trim();
              if (bodyContent) { cleanText = bodyContent; break; }
            }
          }
        } else {
          cleanText = rawBody;
        }

        // Strip any remaining header-like lines from the top
        cleanText = cleanText.replace(/^(Content-Type|Content-Transfer-Encoding|MIME-Version)[^\n]*\n/gim, '').trim();
      }
    }

    await db.collection('emails').add({
      messageId: messageId || "",
      from: fromAddress || 'unknown',
      to: to || 'unknown',
      subject: subject || '(No Subject)',
      textBody: cleanText,
      htmlBody: cleanHtml,
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
