# Explyra API-E (Enhanced) A-Z Setup & Usage Guide

Production-ready Cloudflare Worker API for Explyra. This guide covers how everything works, from registration to usage tracking.

## 🚀 Live Demo Link
**API Endpoint**: `https://explyra-api-e.mfskufgu.workers.dev`
**Admin UI**: Open `api-e/admin-ui/index.html` in your browser.

---

## 🏗️ Architecture & Concepts

### 1. Key Entities
- **Company ID**: The unique internal identifier for an organization (e.g., `cmp_ksi8vqw87`). Used for usage tracking and API key metadata.
- **Admin Email**: Used for logging into the Admin Dashboard (e.g., `explyras@gmail.com`).
- **API Key**: A secure token (format: `exp_...`) used by clients to access `/v1/*` endpoints.

### 2. Plan Quotas (Hourly)
| Plan | Request Limit |
| :--- | :--- |
| **Starter** | 1,000 / hour |
| **Growth** | 10,000 / hour |
| **Enterprise** | 100,000 / hour |

---

## 🛠️ Step-by-Step Setup (Local & Production)

### 1. Project Variables (Secrets)
These are already set in production via `wrangler secret put`:
- `JWT_SECRET`: Used to sign admin session tokens.
- `WEBHOOK_SECRET`: Used to verify billing webhook signatures (HMAC-SHA256).

### 2. KV Namespaces
The following namespaces are bound in `wrangler.toml`:
- `EXPLYRA_COMPANIES`: Stores company profiles and email-to-id mappings.
- `EXPLYRA_API_KEYS`: Stores API key metadata and revocation status.
- `EXPLYRA_USAGE`: Keeps track of hourly request counts.
- `EXPLYRA_SESSIONS`: Manages admin login sessions.

---

## 💻 How to Use the API

### A. Administration Flow

1. **Register a Company**:
   Go to the "Onboard" tab in the Admin UI or run:
   ```bash
   curl -X POST https://explyra-api-e.mitanshu-bhasin.workers.dev/admin/register-company \
     -H "Content-Type: application/json" \
     -d '{"id": "cmp_ksi8vqw87", "admin_email": "explyras@gmail.com", "admin_password": "mitanshu"}'
   ```

2. **Login**:
   Login via the Admin UI with `explyras@gmail.com` and password `mitanshu`. This returns a **JWT Token**.

3. **Generate API Key**:
   Once logged in, provide a label (e.g., "Mobile App") to get your `api_key`.

### B. Accessing Public Data

Use your `api_key` in the header of any request to `/v1/`:

**Example: Check Status (Ping)**
```bash
curl -H "x-api-key: exp_0229dc541966e1bfaeb66276d4a20dcfff49121abe289859" \
     https://explyra-api-e.mfskufgu.workers.dev/v1/ping
```

**Example: Get Expenses (CRUD stub)**
```bash
curl -H "x-api-key: exp_0229dc541966e1bfaeb66276d4a20dcfff49121abe289859" \
     https://explyra-api-e.mfskufgu.workers.dev/v1/expenses
```

---

## 🌐 Custom Domain (explyra.me)
If you want to use `api.explyra.me` instead of the workers.dev URL:
1. Add this to your `wrangler.toml`:
   ```toml
   routes = [
     { pattern = "api.explyra.me/*", custom_domain = true }
   ]
   ```
2. Run `npm run deploy`. Cloudflare will automatically handle the DNS and SSL.

### To update the Worker:
1. Edit files in `api-e/worker/src/`.
2. Run `npm run deploy` inside the `worker/` folder.

### To change rate limits:
Edit `PLAN_QUOTAS` in [public.js](file:///d:/Expense%20Tracker/api-e/worker/src/public.js).

---

## 🔐 Security Notes
- **Passwords**: Stored as PBKDF2 hashes.
- **Quota Reset**: Counters reset automatically every hour as they are keyed by `YYYY-MM-DDTHH`.
- **Revocation**: API keys can be revoked via the `/admin/revoke-api-key` endpoint, immediately blocking all further requests with that key.
