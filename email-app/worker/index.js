import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    try {
      // Read the raw email stream
      const rawEmail = await new Response(message.raw).arrayBuffer();

      // Parse with postal-mime
      const parser = new PostalMime();
      const parsed = await parser.parse(rawEmail);

      // Build payload
      const payload = {
        from: message.from,
        to: message.to,
        subject: parsed.subject || '(No Subject)',
        body: parsed.text || parsed.html || '',
      };

      // POST to Vercel receive endpoint
      const response = await fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': env.WEBHOOK_SECRET,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Webhook failed:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Email worker error:', error);
    }
  },
};
