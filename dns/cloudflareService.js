const CLOUDFLARE_API_TOKEN = "41nEaOY-cxIY0QAXQ23s1vjhF1FEQxcqH7j1wxQW";
const CLOUDFLARE_ZONE_ID = "3e1dbacd4f4677b1a48b07d0f2bfe585";
// Using a CORS proxy for local development to avoid "Failed to fetch" errors.
const CORS_PROXY = "https://corsproxy.io/?";
const BASE_URL = `${CORS_PROXY}https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records`;

const cloudflareService = {
    async listRecords() {
        const targetUrl = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records?per_page=100`;
        const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxiedUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.errors[0].message);
        return data.result;
    },

    async createRecord(type, name, content, ttl = 1, proxied = false) {
        const targetUrl = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records`;
        const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxiedUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, name, content, ttl, proxied })
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.errors[0].message);
        return data.result;
    },

    async updateRecord(recordId, type, name, content, ttl = 1, proxied = false) {
        const targetUrl = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`;
        const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxiedUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, name, content, ttl, proxied })
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.errors[0].message);
        return data.result;
    },

    async deleteRecord(recordId) {
        const targetUrl = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`;
        const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxiedUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.errors[0].message);
        return data.result;
    }
};

window.cloudflareService = cloudflareService;
