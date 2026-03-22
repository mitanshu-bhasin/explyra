import { auth, db } from './_lib/firebase.js';
import { applyCors } from './_lib/cors.js';

const REQUIRED_MX = [
  'isaac.mx.cloudflare.net',
  'linda.mx.cloudflare.net',
  'amir.mx.cloudflare.net'
];

async function resolveDns(name, type) {
  const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
  const res = await fetch(url, {
    headers: { accept: 'application/dns-json' }
  });
  if (!res.ok) {
    throw new Error(`DNS lookup failed (${type}): ${res.status}`);
  }
  return res.json();
}

function normalizeTxt(value) {
  return String(value || '').replace(/"/g, '').trim().toLowerCase();
}

function normalizeHost(value) {
  return String(value || '').trim().toLowerCase().replace(/\.$/, '');
}

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No auth token' });

  try {
    const decoded = await auth.verifyIdToken(token);
    const { domainId, domain } = req.body || {};

    if (!domainId || !domain) {
      return res.status(400).json({ error: 'domainId and domain are required' });
    }

    const normalizedDomain = String(domain).trim().toLowerCase();
    const docRef = db.collection('custom_domains').doc(String(domainId));
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    const data = docSnap.data() || {};
    if (data.userId !== decoded.uid) {
      return res.status(403).json({ error: 'Not allowed for this domain' });
    }
    if (String(data.domain || '').toLowerCase() !== normalizedDomain) {
      return res.status(400).json({ error: 'Domain mismatch' });
    }

    const [txtResult, mxResult] = await Promise.all([
      resolveDns(normalizedDomain, 'TXT'),
      resolveDns(normalizedDomain, 'MX')
    ]);

    const txtAnswers = (txtResult.Answer || []).map((x) => normalizeTxt(x.data));
    const mxAnswers = (mxResult.Answer || []).map((x) => {
      const value = String(x.data || '').trim();
      const host = value.split(/\s+/).slice(1).join(' ');
      return normalizeHost(host || value);
    });

    const hasSpf = txtAnswers.some((txt) => txt.includes('include:_spf.mailchannels.net'));
    const missingMx = REQUIRED_MX.filter((host) => !mxAnswers.includes(host));
    const verified = hasSpf && missingMx.length === 0;
    const status = verified ? 'verified' : 'pending_dns';

    await docRef.set(
      {
        status,
        verified,
        verifiedAt: new Date().toISOString(),
        verification: {
          hasSpf,
          missingMx,
          txtFound: txtAnswers.slice(0, 10),
          mxFound: mxAnswers.slice(0, 10)
        }
      },
      { merge: true }
    );

    return res.status(200).json({
      success: true,
      status,
      verified,
      hasSpf,
      missingMx,
      txtFound: txtAnswers,
      mxFound: mxAnswers
    });
  } catch (error) {
    console.error('Domain verification error:', error);
    return res.status(500).json({ error: 'Domain verification failed' });
  }
}
