// Cloudflare Pages: set Build command to run this script (e.g. `node scripts/sync-env.js`)
// and define FIREBASE_*, GA_MEASUREMENT_ID, CLOUDFLARE_ZONE_ID, etc. in Project → Settings → Environment variables.

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const outputPath = path.join(__dirname, '..', 'js', 'env.js');
const mobileOutputPath = path.join(__dirname, '..', 'mobile_exp', 'js', 'env.js');

function sync() {
    let env = { ...process.env };

    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                let value = match[2] || '';
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                env[match[1]] = value.trim();
            }
        });
    }

    const config = {
        firebase: {
            apiKey: env.FIREBASE_API_KEY || "",
            authDomain: env.FIREBASE_AUTH_DOMAIN || "explyras.firebaseapp.com",
            databaseURL: env.FIREBASE_DATABASE_URL || "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: env.FIREBASE_PROJECT_ID || "explyras",
            storageBucket: env.FIREBASE_STORAGE_BUCKET || "explyras.firebasestorage.app",
            messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "411853553644",
            appId: env.FIREBASE_APP_ID || "1:411853553644:web:eca79eab846b6a5149cac9",
            measurementId: env.FIREBASE_MEASUREMENT_ID || "G-TFBZ5GZ22C"
        },
        ai: {
            model: 'gemini-2.5-flash',
            // API Keys are SECURELY handled by Cloudflare Workers /api/ai/gemini
            // We use "HANDLED_BY_PROXY" to tell the frontend to use the worker endpoint.
            apiKey: "HANDLED_BY_PROXY",
            geminiKey: "HANDLED_BY_PROXY"
        },
        analyticsId: env.GA_MEASUREMENT_ID || "G-TFBZ5GZ22C",
        emailApp: {
            cloudflareZoneId: env.CLOUDFLARE_ZONE_ID || "",
            // Token and Key are SECURELY handled in worker/functions env
            cloudflareToken: "HANDLED_BY_PROXY",
            resendKey: "HANDLED_BY_PROXY"
        },
        imagekit: {
            publicKey: env.IMAGEKIT_PUBLIC_KEY || "",
            url: env.IMAGEKIT_URL || "https://upload.imagekit.io/api/v1/files/upload"
        },
        emailjs: {
            publicKey: env.EMAILJS_PUBLIC_KEY || ""
        },
        imgbb: {
            url: "/api/imgbb",
            apiKey: "HANDLED_BY_PROXY"
        }
    };

    const outputContent = `// Environment Configuration (Auto-generated)
// Generated from .env / process.env (run: node scripts/sync-env.js).
// Cloudflare Pages: run this in the build step so js/env.js is created from dashboard env vars.
// SECURE: AI and Cloudflare Secrets are handled via Proxy, not exposed here.

window.EXPLYRA_CONFIG = ${JSON.stringify(config, null, 4)};
`;

    fs.writeFileSync(outputPath, outputContent);
    if (!fs.existsSync(path.dirname(mobileOutputPath))) { fs.mkdirSync(path.dirname(mobileOutputPath), { recursive: true }); }
    fs.writeFileSync(mobileOutputPath, outputContent);
    console.log('✓ Successfully synced .env to js/env.js and mobile_exp/js/env.js (Secure mode active)');
}

sync();
