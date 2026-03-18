const MAILCHANNELS_URL = "https://api.mailchannels.net/tx/v1/send";

function parseAllowedOrigins(raw) {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function withCors(origin, allowedOrigins, headers = {}) {
  const out = {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type, authorization",
    ...headers
  };

  if (origin && allowedOrigins.includes(origin)) {
    out["access-control-allow-origin"] = origin;
    out["vary"] = "origin";
  }
  return out;
}

function json(data, status, origin, allowedOrigins, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: withCors(origin, allowedOrigins, headers)
  });
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function htmlToText(html) {
  return String(html || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin") || "";
    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: withCors(origin, allowedOrigins)
      });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405, origin, allowedOrigins);
    }

    if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
      return json({ ok: false, error: "Origin not allowed" }, 403, origin, allowedOrigins);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid JSON payload" }, 400, origin, allowedOrigins);
    }

    const { fromEmail, fromName, toEmail, subject, htmlContent } = body || {};

    if (!isValidEmail(fromEmail) || !isValidEmail(toEmail)) {
      return json({ ok: false, error: "Invalid fromEmail or toEmail" }, 400, origin, allowedOrigins);
    }
    if (typeof subject !== "string" || !subject.trim()) {
      return json({ ok: false, error: "subject is required" }, 400, origin, allowedOrigins);
    }
    if (typeof htmlContent !== "string" || !htmlContent.trim()) {
      return json({ ok: false, error: "htmlContent is required" }, 400, origin, allowedOrigins);
    }

    const payload = {
      personalizations: [{ to: [{ email: toEmail.trim() }] }],
      from: {
        email: fromEmail.trim(),
        name: typeof fromName === "string" && fromName.trim() ? fromName.trim() : fromEmail.trim()
      },
      subject: subject.trim(),
      content: [
        { type: "text/plain", value: htmlToText(htmlContent) || " " },
        { type: "text/html", value: htmlContent }
      ]
    };

    try {
      const mcResp = await fetch(MAILCHANNELS_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseText = await mcResp.text();
      if (!mcResp.ok) {
        return json(
          { ok: false, error: "MailChannels request failed", details: responseText },
          502,
          origin,
          allowedOrigins
        );
      }

      return json({ ok: true, message: "Email sent", provider: responseText }, 200, origin, allowedOrigins);
    } catch (error) {
      return json(
        { ok: false, error: "Unexpected send error", details: String(error) },
        500,
        origin,
        allowedOrigins
      );
    }
  }
};
