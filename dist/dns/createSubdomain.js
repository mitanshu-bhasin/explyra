/**
 * Logic for creating a primary user subdomain
 */

const createSubdomain = async (subdomain) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Authentication required");

    // 1. Check if user already has 5 subdomains
    const existingSubs = await db.collection("subdomains").where("uid", "==", user.uid).get();
    if (existingSubs.size >= 5) {
        throw new Error("Maximum limit of 5 subdomains reached.");
    }

    // 2. Check if subdomain is available in Firestore
    const subRef = db.collection("subdomains").doc(subdomain);
    const doc = await subRef.get();
    
    if (doc.exists) {
        throw new Error("Subdomain already taken");
    }

    // 3. Create DNS Record via Cloudflare
    const fullDomain = `${subdomain}.mitanshu.tech`;
    const record = await cloudflareService.createRecord("A", fullDomain, "1.1.1.1");

    // 4. Save to Firestore
    await subRef.set({
        uid: user.uid,
        subdomain: subdomain,
        fullDomain: fullDomain,
        cloudflareId: record.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // 5. Update user profile - Use set with merge to ensure doc exists
    await db.collection("users").doc(user.uid).set({
        hasSubdomain: true,
        primarySubdomain: subdomain // Keep as primary track
    }, { merge: true });

    return record;
};

window.createSubdomain = createSubdomain;
