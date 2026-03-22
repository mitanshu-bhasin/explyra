import { Resend } from 'resend';
import { auth } from './_lib/firebase.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify Firebase Auth token
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No auth token' });

  try {
    const decoded = await auth.verifyIdToken(token);
    const { to, cc, bcc, subject, htmlBody, textBody, originalMessageId } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'Missing required fields: to, subject' });
    }

    const fromAddress = `${decoded.name || 'User'} <${decoded.email.split('@')[0]}@${process.env.EMAIL_DOMAIN || 'explyra.me'}>`;

    // Resend requires at least one of html or text — never send both empty
    const plainText = (textBody || '').trim();
    const richHtml = (htmlBody || '').trim();
    const emailOptions = {
      from: fromAddress,
      to: [to],
      subject,
      html: richHtml || `<p>${plainText}</p>`,   // fallback: wrap plain text in <p>
      text: plainText || richHtml.replace(/<[^>]+>/g, '') || subject, // fallback: strip html tags
    };

    if (cc) emailOptions.cc = cc.split(',').map(e => e.trim());
    if (bcc) emailOptions.bcc = bcc.split(',').map(e => e.trim());

    // Threading headers
    if (originalMessageId) {
      emailOptions.headers = {
        'In-Reply-To': originalMessageId,
        'References': originalMessageId
      };
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(error.statusCode || 400).json({ 
        error: error.message, 
        details: error 
      });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
