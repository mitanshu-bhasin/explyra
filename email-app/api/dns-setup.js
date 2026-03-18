import { auth, db } from './_lib/firebase.js';
import { applyCors } from './_lib/cors.js';

const CLOUDFLARE_API = 'https://api.cloudflare.com/client/v4';
const REQUIRED_MX = [
  { priority: 28, value: 'isaac.mx.cloudflare.net' },
  { priority: 64, value: 'linda.mx.cloudflare.net' },
  { priority: 98, value: 'amir.mx.cloudflare.net' }
];
const REQUIRED_TXT = 'v=spf1 include:_spf.mailchannels.net ~all';

function getTokenFromReq(req) {
  return req.headers.authorization?.split('Bearer ')[1] || null;
}

async function requireUser(req) {
  const token = getTokenFromReq(req);
  if (!token) throw new Error('NO_AUTH');
  return auth.verifyIdToken(token);
}

async function assertDomainOwnership(userId, domainId, domain) {
  const ref = db.collection('custom_domains').doc(String(domainId));
  const snap = await ref.get();
  if (!snap.exists) {
    const err = new Error('DOMAIN_NOT_FOUND');
    err.code = 404;
    throw err;
  }

  const data = snap.data() || {};
  if (data.userId !== userId) {
    const err = new Error('FORBIDDEN_DOMAIN');
    err.code = 403;
    throw err;
  }

  if (String(data.domain || '').toLowerCase() !== String(domain || '').toLowerCase()) {
    const err = new Error('DOMAIN_MISMATCH');
    err.code = 400;
    throw err;
  }

  return { ref, data };
}

async function fetchZoneForDomain(domain, token) {
  const url = `${CLOUDFLARE_API}/zones?name=${encodeURIComponent(domain)}&status=active`;
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error('Could not read Cloudflare zone for domain');
  }

  const zone = (json.result || [])[0];
  if (!zone) {
    throw new Error('Domain zone not found in connected Cloudflare account');
  }
  return zone;
}

async function listDnsRecords(zoneId, token) {
  const res = await fetch(`${CLOUDFLARE_API}/zones/${zoneId}/dns_records?per_page=100`, {
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error('Could not list existing DNS records');
  }
  return json.result || [];
}

async function createRecord(zoneId, token, payload) {
  const res = await fetch(`${CLOUDFLARE_API}/zones/${zoneId}/dns_records`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    const msg = (json.errors || []).map((x) => x.message).join(', ') || 'Record creation failed';
    throw new Error(msg);
  }

  return json.result;
}

function registrarLinks(domain) {
  return {
    godaddy: `https://dcc.godaddy.com/manage/${domain}/dns`,
    namecheap: 'https://ap.www.namecheap.com/domains/domaincontrolpanel/',
    cloudflare: 'https://dash.cloudflare.com/'
  };
}

function manualRecords() {
  return {
    txt: [
      {
        type: 'TXT',
        host: '@',
        value: REQUIRED_TXT
      }
    ],
    mx: REQUIRED_MX.map((x) => ({
      type: 'MX',
      host: '@',
      priority: x.priority,
      value: x.value
    }))
  };
}

function zoneTemplate(domain) {
  return [
    `; DNS template for ${domain}`,
    '',
    `@ TXT \"${REQUIRED_TXT}\"`,
    `@ MX 28 ${REQUIRED_MX[0].value}`,
    `@ MX 64 ${REQUIRED_MX[1].value}`,
    `@ MX 98 ${REQUIRED_MX[2].value}`,
    ''
  ].join('\n');
}

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const decoded = await requireUser(req);
    const { mode, domainId, domain } = req.body || {};

    if (!domainId || !domain) {
      return res.status(400).json({ error: 'domainId and domain are required' });
    }

    const normalizedDomain = String(domain).trim().toLowerCase();
    const domainDoc = await assertDomainOwnership(decoded.uid, domainId, normalizedDomain);

    if (mode === 'manual') {
      return res.status(200).json({
        success: true,
        mode: 'manual',
        records: manualRecords(),
        links: registrarLinks(normalizedDomain),
        zoneTemplate: zoneTemplate(normalizedDomain)
      });
    }

    if (mode !== 'cloudflare_auto') {
      return res.status(400).json({ error: 'Unsupported mode' });
    }

    const cfToken = process.env.CLOUDFLARE_TOKEN;
    if (!cfToken) {
      return res.status(500).json({ error: 'Cloudflare token is not configured' });
    }

    const zone = await fetchZoneForDomain(normalizedDomain, cfToken);
    const existing = await listDnsRecords(zone.id, cfToken);

    const ensure = async (payload, matcher) => {
      const found = existing.some(matcher);
      if (found) return { skipped: true, payload };
      const created = await createRecord(zone.id, cfToken, payload);
      return { skipped: false, payload, createdId: created.id };
    };

    const applied = [];

    applied.push(
      await ensure(
        {
          type: 'TXT',
          name: normalizedDomain,
          content: REQUIRED_TXT,
          ttl: 3600
        },
        (rec) => rec.type === 'TXT' && rec.name === normalizedDomain && String(rec.content || '').includes('include:_spf.mailchannels.net')
      )
    );

    for (const mx of REQUIRED_MX) {
      applied.push(
        await ensure(
          {
            type: 'MX',
            name: normalizedDomain,
            content: mx.value,
            priority: mx.priority,
            ttl: 3600
          },
          (rec) =>
            rec.type === 'MX' &&
            rec.name === normalizedDomain &&
            String(rec.content || '').toLowerCase().replace(/\.$/, '') === mx.value &&
            Number(rec.priority) === mx.priority
        )
      );
    }

    await domainDoc.ref.set(
      {
        status: 'pending_dns',
        dnsSetup: {
          mode: 'cloudflare_auto',
          zoneId: zone.id,
          zoneName: zone.name,
          appliedAt: new Date().toISOString(),
          applied
        }
      },
      { merge: true }
    );

    return res.status(200).json({
      success: true,
      mode: 'cloudflare_auto',
      zone: { id: zone.id, name: zone.name },
      applied
    });
  } catch (error) {
    if (error.message === 'NO_AUTH') {
      return res.status(401).json({ error: 'No auth token' });
    }

    const code = error.code || 500;
    return res.status(code).json({ error: error.message || 'DNS setup failed' });
  }
}
