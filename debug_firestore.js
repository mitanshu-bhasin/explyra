const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const CS_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAoDQhHlUbiUl57azSrst5M2eGDeQ8EydA",
  authDomain: "explyras.firebaseapp.com",
  projectId: "explyras",
};

const app = firebase.initializeApp(CS_FIREBASE_CONFIG, 'debugApp');
const db = firebase.firestore(app);

async function run() {
  console.log("Starting test...");
  try {
    const snap = await db.collection('cs_companies').limit(1).get();
    console.log("Read success, found", snap.size, "documents");
    
    console.log("Attempting write...");
    const ref = await db.collection('cs_companies').add({
      test: true,
      time: new Date().toISOString()
    });
    console.log("Write SUCCESS! Doc ID:", ref.id);
  } catch (err) {
    console.error("Test FAILED!");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
  }
}

run();
