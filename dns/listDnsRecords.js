/**
 * Logic for listing all DNS records belonging to a user's namespace
 */

const listDnsRecords = async (userSubdomain) => {
    const auth = window.auth;
    const db = window.db;
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    console.log(`[DNS] Fetching records for: ${userSubdomain} (UID: ${user.uid})`);

    const snapshot = await db.collection("dns_records")
        .where("uid", "==", user.uid)
        .where("userSubdomain", "==", userSubdomain)
        .get();

    console.log(`[DNS] Found ${snapshot.docs.length} records`);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

window.listDnsRecords = listDnsRecords;
