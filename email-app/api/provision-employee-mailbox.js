import { auth, db } from './_lib/firebase.js';
import { applyCors } from './_lib/cors.js';

function getTokenFromReq(req) {
  return req.headers.authorization?.split('Bearer ')[1] || null;
}

function generateTempPassword(length = 14) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

function isValidLocalPart(value) {
  return /^[a-z0-9._%+-]+$/.test(String(value || ''));
}

async function sendOnboardingEmail({ notifyEmail, mailboxEmail, employeeAuthEmail, tempPassword, resetLink, employeeName }) {
  const workerUrl = process.env.OUTBOUND_WORKER_URL || 'https://email-worker.mfskufgu.workers.dev';

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2>Welcome to Company Mail</h2>
      <p>Hi ${employeeName || 'Team Member'},</p>
      <p>Your account has been created by admin.</p>
      <ul>
        <li><strong>Login Email:</strong> ${employeeAuthEmail}</li>
        <li><strong>Mailbox:</strong> ${mailboxEmail}</li>
        <li><strong>Temporary Password:</strong> ${tempPassword}</li>
      </ul>
      <p>Please reset your password after first login.</p>
      <p><a href="${resetLink}" target="_blank" rel="noopener">Reset Password Link</a></p>
    </div>
  `;

  const response = await fetch(workerUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://explyra.me'
    },
    body: JSON.stringify({
      fromEmail: process.env.EMAIL_DOMAIN ? `support@${process.env.EMAIL_DOMAIN}` : 'support@explyra.me',
      fromName: 'Explyra Admin',
      toEmail: notifyEmail,
      subject: 'Your employee email account is ready',
      htmlContent: html
    })
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    throw new Error(result.error || 'Failed to send onboarding email');
  }

  return result;
}

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ error: 'No auth token' });

  try {
    const decoded = await auth.verifyIdToken(token);
    const {
      domainId,
      localPart,
      employeeName,
      employeeAuthEmail,
      notifyEmail
    } = req.body || {};

    if (!domainId || !localPart || !employeeAuthEmail || !notifyEmail) {
      return res.status(400).json({ error: 'domainId, localPart, employeeAuthEmail, notifyEmail are required' });
    }

    if (!isValidLocalPart(localPart)) {
      return res.status(400).json({ error: 'Invalid mailbox local part' });
    }

    const adminUser = await db.collection('users').doc(decoded.uid).get();
    const adminData = adminUser.exists ? adminUser.data() : {};
    const role = String(adminData?.role || '').toUpperCase();
    const isAdminRole = ['ADMIN', 'SUPER_ADMIN', 'FINANCE_MANAGER'].includes(role);
    const isMasterAdmin = ['explyra@gmail.com', 'epxlyra@gmail.com'].includes(String(decoded.email || '').toLowerCase());

    if (!isAdminRole && !isMasterAdmin) {
      return res.status(403).json({ error: 'Only admin can provision employee mailbox' });
    }

    const domainRef = db.collection('custom_domains').doc(String(domainId));
    const domainSnap = await domainRef.get();
    if (!domainSnap.exists) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    const domainData = domainSnap.data() || {};
    if (domainData.userId !== decoded.uid && !isMasterAdmin) {
      return res.status(403).json({ error: 'You are not owner of this domain' });
    }
    if (!domainData.verified) {
      return res.status(400).json({ error: 'Domain must be verified first' });
    }

    const mailboxEmail = `${String(localPart).toLowerCase()}@${String(domainData.domain).toLowerCase()}`;
    const mailboxExisting = await db.collection('mailboxes').where('email', '==', mailboxEmail).limit(1).get();
    if (!mailboxExisting.empty) {
      return res.status(409).json({ error: 'Mailbox already exists' });
    }

    const tempPassword = generateTempPassword();
    const normalizedAuthEmail = String(employeeAuthEmail).toLowerCase();

    let employeeAuthUser;
    let employeeCreated = false;
    try {
      employeeAuthUser = await auth.getUserByEmail(normalizedAuthEmail);
    } catch {
      employeeAuthUser = await auth.createUser({
        email: normalizedAuthEmail,
        password: tempPassword,
        displayName: employeeName || ''
      });
      employeeCreated = true;
    }

    await db.collection('users').doc(employeeAuthUser.uid).set(
      {
        uid: employeeAuthUser.uid,
        email: normalizedAuthEmail,
        displayName: employeeName || employeeAuthUser.displayName || '',
        role: 'EMPLOYEE',
        companyId: adminData?.companyId || null,
        createdBy: decoded.uid,
        createdAt: new Date().toISOString()
      },
      { merge: true }
    );

    const mailboxDoc = await db.collection('mailboxes').add({
      domainId,
      userId: employeeAuthUser.uid,
      email: mailboxEmail,
      createdAt: new Date().toISOString(),
      createdBy: decoded.uid
    });

    const resetLink = await auth.generatePasswordResetLink(normalizedAuthEmail);
    await sendOnboardingEmail({
      notifyEmail: String(notifyEmail).toLowerCase(),
      mailboxEmail,
      employeeAuthEmail: normalizedAuthEmail,
      tempPassword,
      resetLink,
      employeeName
    });

    await db.collection('provisioning_audit').add({
      type: 'employee_mailbox_provision',
      adminUid: decoded.uid,
      employeeUid: employeeAuthUser.uid,
      employeeAuthEmail: normalizedAuthEmail,
      mailboxEmail,
      mailboxId: mailboxDoc.id,
      domainId,
      employeeCreated,
      notifyEmail: String(notifyEmail).toLowerCase(),
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      mailboxEmail,
      employeeUid: employeeAuthUser.uid,
      employeeCreated
    });
  } catch (error) {
    console.error('Provision employee mailbox error:', error);
    return res.status(500).json({ error: error.message || 'Provisioning failed' });
  }
}
