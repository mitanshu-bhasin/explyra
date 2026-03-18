// Cloudflare Worker Script for Explyra Notifications
// This worker acts as a central hub for sending FCM notifications.

const SERVICE_ACCOUNT = {
  "project_id": "explyras",
  "client_email": "firebase-adminsdk-fbsvc@explyras.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+TRLvwjWlUK3S\nYuXghqNuNkntYnbFqG+MqHlQXcM91lHQQrOM/eD8043Yb65gszdstxMc/oLtD3Sy\n9cah3cBa/PXEKmJPTTooXQubB7VGXlj9m3E3i3FQk75xNVD4X0dWe991Npbok7Xc\nkFhzrYBbE5RFSxxlwixDk3Ag8VfmBKgGN/7R9xXbUZ1/NeLfVJosxPyCjQ5F5HP1\nlRlNZ5CeqQ2C0ophmcXaB/Msb4JG+X7xC1JfUL7Xq1gjSjb7YZ7PtmeUM7kseAVR\nKBro08NQnR2bApmdKlLWXhxccRUxc8dml5fo9hueiM8I2ebxwg3ZbWK74C514ma4\n6PkSexg7AgMBAAECggEAGwMIsZShFb6edbMJCzZBQ3ccRkBIOKVAdDhDxAcTHBds\nVIHrR5OP2INU6ohruZkmwF06Ls7nmausdmyRjc9SqvemEPqtKrF9FFaku5Q8BGmG\n+zSRvP8jjfryuNIHFMI9d4aswNAHWqsA0PaCP6U8h3D/hlhzhvQpYUwvydVIE0OO\nBPO02GMhLF/wZO7h/c8nh/moZYezEbkx61+XLn8wnej5YOZi0qFQby0K5FvF9c0v\nBpRwr3kIa5WKh+Al2y5c46DTubDS/v/mMlTUJIKcaEaq5vqI7tyT7iCs7Uw7RZRy\n1EDryU9Wm+d9pdzp198E9mKTGxUd7pxdC4dksPPPTQKBgQDxs2hngh+QfZT/OPbv\n+Flo3r/tcAjjnQo6zx27tsYia2ekmszz28G6eqAQjwL2X/Gp2XeeRFu6g1sUFeGn\nKJ5BTtPv1nRkfE6HM6mAm9szdNqpRJskU4E47YwJteK6kESpCKO+QmZlAXj6KPme\nGhUDwr6NuNsOWaRBGyHR2ajEvwKBgQDJjzW/vETzVXpUhpQtwtueTk2zOIupuBrO\nuwQj1huZn4rL2ym3Bdxc+2MKN9vaojbToFYC5V7jJsGPdUMWcIa85mXnoosC2Zv7\nZ7M8Bfo6qUXld1G02MoBqL0S8Ld637dNIXw/2gT2WxE/UutsnCeyxZwJWXrojlSV\ntMWsw7ZfhQKBgDXd9DDNcVd0hZZ0DaThxpt2uXOjenev8i21Jz1EuNfG9CxdS7w1\nh/GVjsLh/JkIPQXLr7sYJRFmYRAS6F2m0c5gUR+svff/NEkxnF9LXQkUy/7ZiXIJ\nIk2bs5Aed095A7Rgdo3aopN0RpAKPcecrH5QEsPnJPsHw3G3KExqpBBlAoGAart7\nKtz3ZiONc9UQAmt9AIdWfeEjk+v5xh8iQhfO5bqmNO0JWfGwj0xPVcnekhf0EHyH\nD2GGraKIPP9LV0afEsiujcp08j1pa+et8cr4hre8W5ajnbBuyBIijTUK8/YjiqSA\ntw8sMYhnybCPGiRWoUQjLJBFlYBJKj1fr+yzVkECgYAjdd8rAmPQyhjKcQAgLcG4\n3xsUDax3OsFPQuauTVL1TP5UfIDIXTyQPKiI6g7Nvk6iJf8fwDSTDDEEsjNHqINe\nLHUq9y7KJVlGcEJW/HuqH0qopg2VkKNq9ZqV/SDr3Bb/h61psTevQDzrNOb9UsJY\n5tRHet5/AE1raAOsMfh3JA==\n-----END PRIVATE KEY-----\n"
};

const HARDCODED_AUTH_TOKEN = "explyra_secret_token_123";

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // CORS
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
            });
        }

        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        };

        if (url.pathname === "/health") {
            return new Response(JSON.stringify({ status: "ok" }), { headers: corsHeaders });
        }

        if (url.pathname === "/notify" && request.method === "POST") {
            const authHeader = request.headers.get("Authorization");
            if (authHeader !== `Bearer ${HARDCODED_AUTH_TOKEN}`) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
            }

            try {
                const { subscriptions, message } = await request.json();
                if (!subscriptions || !Array.isArray(subscriptions)) {
                    return new Response(JSON.stringify({ error: "Invalid subscriptions" }), { status: 400, headers: corsHeaders });
                }

                const accessToken = await getGoogleAuthToken();
                const results = [];

                for (const sub of subscriptions) {
                    if (!sub.fcmToken) continue;
                    
                    try {
                        const fcmReq = await fetch(`https://fcm.googleapis.com/v1/projects/${SERVICE_ACCOUNT.project_id}/messages:send`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: {
                                    token: sub.fcmToken,
                                    notification: {
                                        title: message.title,
                                        body: message.body
                                    },
                                    data: message.data || {}
                                }
                            })
                        });
                        const resJson = await fcmReq.json();
                        results.push(resJson);
                    } catch (err) {
                        results.push({ error: err.message, token: sub.fcmToken });
                    }
                }

                return new Response(JSON.stringify({ success: true, results }), { status: 200, headers: corsHeaders });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
            }
        }

        return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
    },
};

// Helper to generate Google OAuth2 Token
async function getGoogleAuthToken() {
    const key = SERVICE_ACCOUNT.private_key;
    const clientEmail = SERVICE_ACCOUNT.client_email;
    const authUrl = "https://oauth2.googleapis.com/token";
    const scope = "https://www.googleapis.com/auth/cloud-platform";

    const header = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const now = Math.floor(Date.now() / 1000);
    const payload = b64(JSON.stringify({
        iss: clientEmail,
        scope: scope,
        aud: authUrl,
        exp: now + 3600,
        iat: now
    }));

    const unsignedJwt = `${header}.${payload}`;
    const signature = await sign(unsignedJwt, key);
    const jwt = `${unsignedJwt}.${signature}`;

    const res = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
    });

    const data = await res.json();
    return data.access_token;
}

function b64(str) {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(content, pem) {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length).replace(/\n/g, "");
    const binaryDerString = atob(pemContents);
    const binaryDer = str2ab(binaryDerString);

    const key = await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(content));
    return arrayBufferToBase64Url(signature);
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function arrayBufferToBase64Url(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
