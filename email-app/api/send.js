import { Resend } from 'resend';
import { auth } from './_lib/firebase.js';

const resend = new Resend(process.env.RESEND_API_KEY || 're_frUajX2k_7oWbz3faKEkzYcH4hfJetQnw');

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify Firebase Auth token
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No auth token' });

  try {
    const decoded = await auth.verifyIdToken(token);
    const { to, subject, body } = req.body;

    if (!to || !subject) {
      return res.status(400).json({ error: 'Missing required fields: to, subject' });
    }

    const fromAddress = `${decoded.name || 'User'} <${decoded.email.split('@')[0]}@${process.env.EMAIL_DOMAIN || 'explyra.me'}>`;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      text: body || '',
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
