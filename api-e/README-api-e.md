# Explyra API-E (Enhanced API)

Production-ready Cloudflare Worker API with Admin portal and quota-enforced public endpoints.

## Features
- **Admin Management**: Register company, login, and manage API keys.
- **Quota Enforcement**: Starter (1k/hr), Growth (10k/hr), Enterprise (100k/hr).
- **Billing Integration**: HMAC-validated webhook for plan upgrades.
- **Security**: PBKDF2 password hashing, JWT sessions, and API key validation.

## Project Structure
- `worker/`: Cloudflare Worker source code.
- `admin-ui/`: Static administration dashboard.
- `openapi.yaml`: API specification.
- `postman_collection.json`: Testing collection.
- `sample_sdk.md`: Code snippets for clients.

## Setup & Deployment

### 1. Initialize KV Namespaces
Run the following commands to create the required KV namespaces:

```bash
# Production
wrangler kv:namespace create EXPLYRA_COMPANIES
wrangler kv:namespace create EXPLYRA_API_KEYS
wrangler kv:namespace create EXPLYRA_USAGE
wrangler kv:namespace create EXPLYRA_SESSIONS

# Preview (for local/staging)
wrangler kv:namespace create EXPLYRA_COMPANIES --preview
wrangler kv:namespace create EXPLYRA_API_KEYS --preview
wrangler kv:namespace create EXPLYRA_USAGE --preview
wrangler kv:namespace create EXPLYRA_SESSIONS --preview
```

Take the IDs from the output and paste them into `worker/wrangler.toml`.

### 2. Set Secrets
```bash
wrangler secret put JWT_SECRET
wrangler secret put WEBHOOK_SECRET
```

### 3. Local Development
```bash
cd worker
npm install
npm run dev
```

### 4. Deploy
```bash
npm run deploy
```

## Testing Webhooks Locally
Use the following `curl` command to simulate a billing upgrade (ensure `WEBHOOK_SECRET` matches):

```bash
curl -X POST http://localhost:8787/webhook/billing \
  -H "Content-Type: application/json" \
  -H "x-webhook-signature: <HMAC_SHA256_BASE64_OF_BODY>" \
  -d '{"company_id": "acme-corp", "event": "plan_update", "new_plan": "growth"}'
```

## Production Hardening Recommendations
- [ ] Use Durable Objects for exact usage counters (KV is eventually consistent).
- [ ] Implement rate limiting using Cloudflare's native `rateloop` or `rate-limit` features.
- [ ] Add email notifications (SendGrid/Mailgun) in `billingWebhook.js`.
- [ ] Hash API keys in KV for extra security.
