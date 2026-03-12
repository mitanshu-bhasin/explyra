/**
 * Logic for editing DNS records
 */

const editDnsRecord = async (firestoreId, cloudflareId, type, name, content) => {
    try {
        const db = window.db;
        const auth = window.auth;
        const _cloudflare = window.cloudflareService;

        if (!auth.currentUser) throw new Error("Unauthorized");

        // 1. Update Cloudflare
        await _cloudflare.updateRecord(cloudflareId, type, name, content);

        // 2. Update Firestore
        await db.collection("dns_records").doc(firestoreId).update({
            type: type,
            name: name,
            content: content,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        return { success: true };

    } catch (error) {
        console.error("Error editing record:", error);
        throw error;
    }
};

window.editDnsRecord = editDnsRecord;
