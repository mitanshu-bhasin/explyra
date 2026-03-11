import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    // Basic verification - ignore spam
    if (message.headers.get("X-Spam-Status")?.includes('Yes')) {
      return;
    }

    try {
      // Get the raw email stream
      const rawEmail = await new Response(message.raw).arrayBuffer();
      
      // Check Forwarding Settings
      const settingsRes = await fetch(`https://explyra.me/api/forward-settings?email=${encodeURIComponent(message.to)}`, {
        headers: {
          'x-webhook-secret': env.WEBHOOK_SECRET
        }
      });
      
      if (settingsRes.ok) {
        const { forwardingEnabled, personalEmail } = await settingsRes.json();
        if (forwardingEnabled && personalEmail) {
          console.log(`Forwarding email from ${message.from} to ${personalEmail}`);
          await message.forward(personalEmail);
        }
      }

      // Parse with postal-mime
      const parser = new PostalMime();
      const parsedEmail = await parser.parse(rawEmail);

      // Extract details
      const fromName = parsedEmail.from?.name || '';
      const fromEmail = parsedEmail.from?.address || message.from;
      const toEmail = parsedEmail.to?.[0]?.address || message.to;
      const subject = parsedEmail.subject || "No Subject";
      const textBody = parsedEmail.text || "";
      const htmlBody = parsedEmail.html || "";

      // Send to Vercel API
      const response = await fetch('https://explyra.me/api/receive', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-webhook-secret': env.WEBHOOK_SECRET
        },
        body: JSON.stringify({
          fromName,
          fromEmail,
          to: toEmail,
          subject,
          textBody,
          htmlBody
        })
      });

      if (!response.ok) {
        console.error("Failed to forward email:", await response.text());
      }

    } catch (error) {
      console.error("Error processing email:", error);
    }
  }
};
