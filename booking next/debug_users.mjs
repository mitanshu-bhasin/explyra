import { db } from "./src/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function checkUsers() {
    const snap = await getDocs(collection(db, "users"));
    console.log("Total users:", snap.size);
    snap.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
    });
}

checkUsers();
