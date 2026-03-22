/**
 * Logic for creating secondary DNS records under a user's namespace
 */

const createDnsRecord = async (name, type, content, userSubdomain, ttl = 1) => {
    try {
        const db = window.db;
        const auth = window.auth;
        const _cloudflare = window.cloudflareService;

        if (!auth.currentUser) throw new Error("Unauthorized");
        const userId = auth.currentUser.uid;

        // 1. Cloudflare API
        const fullName = name.includes('.') ? name : `${name}.${userSubdomain}.mitanshu.tech`;
        const cfResult = await _cloudflare.createRecord(type, fullName, content, parseInt(ttl));

        // 2. Save to Firestore
        const dnsRecord = {
            uid: userId, 
            userSubdomain: userSubdomain,
            type: type,
            name: fullName,
            content: content,
            ttl: ttl,
            cloudflareId: cfResult.id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection("dns_records").add(dnsRecord);
        console.log("[DNS] Record saved to Firestore:", docRef.id);
        return { success: true, id: docRef.id, cloudflareId: cfResult.id };

    } catch (error) {
        console.error("Error creating record:", error);
        throw error;
    }
};

window.createDnsRecord = createDnsRecord;
