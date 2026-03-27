export async function onRequest(context) {
    const { env } = context;

    const config = {
        firebase: {
            apiKey: env.FIREBASE_API_KEY || "",
            authDomain: env.FIREBASE_AUTH_DOMAIN || "explyras.firebaseapp.com",
            projectId: env.FIREBASE_PROJECT_ID || "explyras",
            storageBucket: env.FIREBASE_STORAGE_BUCKET || "explyras.firebasestorage.app",
            messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID || "411853553644",
            appId: env.FIREBASE_APP_ID || "1:411853553644:web:eca79eab846b6a5149cac9",
            measurementId: env.FIREBASE_MEASUREMENT_ID || "G-TFBZ5GZ22C"
        },
        ai: {
            model: 'moonshotai/kimi-k2-instruct-0905',
            apiKey: "HANDLED_BY_PROXY",
            geminiKey: "HANDLED_BY_PROXY"
        },
        analyticsId: env.FIREBASE_MEASUREMENT_ID || "G-TFBZ5GZ22C",
        emailApp: {
            cloudflareZoneId: env.CLOUDFLARE_ZONE_ID || "",
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

    const scriptContent = `window.EXPLYRA_CONFIG = ${JSON.stringify(config, null, 4)};`;

    return new Response(scriptContent, {
        headers: {
            "Content-Type": "application/javascript;charset=UTF-8",
            "Cache-Control": "public, max-age=3600"
        }
    });
}
