import PostalMime from "postal-mime";

function base64UrlEncode(input) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function pemToArrayBuffer(pemText) {
  const normalized = String(pemText || "").replace(/\\n/g, "\n");
  const b64 = normalized
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function getAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: env.GCP_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaim = base64UrlEncode(JSON.stringify(claim));
  const unsignedJwt = `${encodedHeader}.${encodedClaim}`;

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(env.GCP_PRIVATE_KEY),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedJwt)
  );

  const assertion = `${unsignedJwt}.${base64UrlEncode(signature)}`;

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  if (!resp.ok) {
    throw new Error(`Google token fetch failed: ${await resp.text()}`);
  }

  const json = await resp.json();
  return json.access_token;
}

async function findMailboxId(env, accessToken, toEmail) {
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
  const body = {
    structuredQuery: {
      from: [{ collectionId: "mailboxes" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "email" },
          op: "EQUAL",
          value: { stringValue: toEmail }
        }
      },
      limit: 1
    }
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    throw new Error(`Mailbox lookup failed: ${await resp.text()}`);
  }

  const rows = await resp.json();
  const doc = rows.find((x) => x.document)?.document;
  if (!doc?.name) return null;
  return doc.name.split("/").pop();
}

async function insertReceivedEmail(env, accessToken, payload) {
  const docId = crypto.randomUUID();
  const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/received_emails?documentId=${encodeURIComponent(docId)}`;

  const body = {
    fields: {
      mailboxId: { stringValue: payload.mailboxId },
      toEmail: { stringValue: payload.toEmail },
      from: { stringValue: payload.from },
      subject: { stringValue: payload.subject },
      bodyHtml: { stringValue: payload.bodyHtml },
      bodyText: { stringValue: payload.bodyText },
      receivedAt: { timestampValue: new Date().toISOString() }
    }
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    throw new Error(`Firestore insert failed: ${await resp.text()}`);
  }
}

export default {
  async email(message, env) {
    try {
      const parser = new PostalMime();
      const parsed = await parser.parse(message.raw);

      const toEmail = String(message.to || "").trim().toLowerCase();
      const fromRaw = parsed.from?.address || message.from || "";
      const from = String(fromRaw).trim().toLowerCase();
      const subject = String(parsed.subject || message.headers.get("subject") || "(No Subject)");
      const bodyHtml = typeof parsed.html === "string" ? parsed.html : "";
      const bodyText = typeof parsed.text === "string" ? parsed.text : "";

      const accessToken = await getAccessToken(env);
      const mailboxId = await findMailboxId(env, accessToken, toEmail);

      if (!mailboxId) {
        message.setReject("550 Unknown mailbox");
        return;
      }

      await insertReceivedEmail(env, accessToken, {
        mailboxId,
        toEmail,
        from,
        subject,
        bodyHtml,
        bodyText
      });
    } catch (error) {
      console.error("Inbound worker processing error", error);
      message.setReject("451 Temporary processing failure");
    }
  }
};
