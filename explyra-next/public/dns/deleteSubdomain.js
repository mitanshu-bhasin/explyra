/**
 * Logic for deleting a subdomain and all its associated DNS records
 */

const deleteSubdomain = async (subdomain) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    console.log(`[DNS] Deleting subdomain: ${subdomain}`);

    // 1. Get the subdomain document to find the Cloudflare ID for the main record
    const subRef = db.collection("subdomains").doc(subdomain);
    const subDoc = await subRef.get();
    
    if (!subDoc.exists) {
        throw new Error("Subdomain not found");
    }

    const subData = subDoc.data();
    if (subData.uid !== user.uid) {
        throw new Error("Permission denied");
    }

    // 2. Fetch all DNS records associated with this subdomain
    const dnsRecordsSnapshot = await db.collection("dns_records")
        .where("uid", "==", user.uid)
        .where("userSubdomain", "==", subdomain)
        .get();

    console.log(`[DNS] Found ${dnsRecordsSnapshot.size} associated DNS records to delete.`);

    // 3. Delete each associated DNS record from Cloudflare and Firestore
    for (const doc of dnsRecordsSnapshot.docs) {
        const data = doc.data();
        try {
            if (data.cloudflareId) {
                await cloudflareService.deleteRecord(data.cloudflareId);
            }
        } catch (e) {
            console.warn(`[DNS] Failed to delete record ${data.cloudflareId} from Cloudflare:`, e);
        }
        await doc.ref.delete();
    }

    // 4. Delete the main subdomain A record from Cloudflare
    try {
        if (subData.cloudflareId) {
            await cloudflareService.deleteRecord(subData.cloudflareId);
        }
    } catch (e) {
        console.warn(`[DNS] Failed to delete main record ${subData.cloudflareId} from Cloudflare:`, e);
    }

    // 5. Delete the subdomain document from Firestore
    await subRef.delete();

    // 6. Check if user has any other subdomains left
    const remainingSubs = await db.collection("subdomains").where("uid", "==", user.uid).limit(1).get();
    
    if (remainingSubs.empty) {
        await db.collection("users").doc(user.uid).update({
            hasSubdomain: false,
            primarySubdomain: null
        });
    } else if (subData.subdomain === (await db.collection("users").doc(user.uid).get()).data().primarySubdomain) {
        // If we deleted the primary subdomain but others exist, pick another one as primary
        await db.collection("users").doc(user.uid).update({
            primarySubdomain: remainingSubs.docs[0].id
        });
    }

    return true;
};

window.deleteSubdomain = deleteSubdomain;
