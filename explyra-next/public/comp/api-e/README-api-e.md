# Explyra API-E (Enhanced) A-Z Setup & Usage Guide

Production-ready Cloudflare Worker API for Explyra. This system bridges the gap between third-party API consumers and the main Explyra ecosystem.

## 🚀 Live Demo Link
**API Endpoint**: `https://api.explyra.me`  
**Admin UI**: `https://api.explyra.me/admin/dashboard` (Or local `api-e/admin-ui/index.html`)

---

## 🏗️ Architecture & Concepts

### 1. Key Entities
- **Company ID**: Internal identifier (e.g., `cmp_ksi8vqw87`). Link between API usage and organizational data.
- **Admin Email**: Credentials for the API Management Dashboard (e.g., `explyras@gmail.com`).
- **API Key**: Secure tokens (format: `exp_...`) for client authentication.
- **Firebase Sync**: Automated mirroring of API entries into the main Firestore database.

### 2. Plan Quotas (Hourly)
| Plan | Request Limit |
| :--- | :--- |
| **Starter** | 1,000 / hour |
| **Growth** | 10,000 / hour |
| **Enterprise** | 100,000 / hour |

---

## 🛠️ Detailed Features

### 🔐 Advanced Key Management
The Management Dashboard allows full control over your credentials:
- **Generation**: Create labeled keys for different services (Mobile, Web, Zapier).
- **Restricting**: Instantly "Revoke" a key to block access without deleting it.
- **Permanent Deletion**: Delete old or compromised keys.
- **History**: View all keys associated with your company.

### 🔄 Main System Synchronization
Unlike isolated state, this API syncs directly with the **Main Explyra Ecosystem**:
- Every expense created via API `/v1/expenses` is automatically pushed to Firestore.
- Expenses appear in `admin.html` (Admin Portal) and `emp.html` (Employee Portal) under the assigned user.
- **Field Mapping**: API categories are mapped to Project Codes/Categories in the main system.

---

## 💻 How to Use the API

### A. Administration Flow

1. **Login**:
   Use the Admin UI (`api-e/admin-ui/index.html`) to login.
2. **Dashboard**:
   View your current keys, generate new ones, or toggle status (Active/Restricted).
3. **Quick Test**:
   Use the built-in "Quick Expense Test" form in the UI to send a live request.

### B. Accessing Public Data

Use your `api_key` in the header of any request using `x-api-key` or `Authorization: Bearer <key>`.

**1. Create Real Expense (Synced to Firebase)**
```bash
curl -X POST https://api.explyra.me/v1/expenses \
     -H "Content-Type: application/json" \
     -H "x-api-key: YOUR_API_KEY" \
     -d '{"amount": 500, "category": "Travel", "note": "Sync Test from API"}'
```

**2. List All Expenses (KV Storage)**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     https://api.explyra.me/v1/expenses
```

---

## ⚙️ Configuration & Redeployment

### Variables in `wrangler.toml`
- `FIREBASE_PROJECT_ID`: The target Firestore project.
- `FIREBASE_API_KEY`: The public API key for Firestore REST access.

### Redeploying
If you modify the source code in `api-e/worker/src/`:
1. Open terminal in `api-e/worker/`.
2. Run `npx wrangler deploy`.

---

## 🔐 Security & Optimization
- **Web Crypto**: High-performance PBKDF2 hashing for admin passwords.
- **JWT**: Stateless session management for the Admin UI.
- **Atomic Counters**: Hourly usage tracking using KV window-keys.
- **CORS Enabled**: Ready for direct cross-origin browser integrations.

---

*Authored by Antigravity AI for Explyra Ecosystem.*
