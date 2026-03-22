const deleteDnsRecord = async (firestoreId, cloudflareId) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    // 1. Delete from Cloudflare
    try {
        await cloudflareService.deleteRecord(cloudflareId);
    } catch (error) {
        console.error("Cloudflare deletion failed, proceeding with Firestore cleanup", error);
    }

    // 2. Delete from Firestore
    await db.collection("dns_records").doc(firestoreId).delete();

    return true;
};

window.deleteDnsRecord = deleteDnsRecord;
