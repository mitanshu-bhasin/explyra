const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
require('firebase/compat/auth');

const CS_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAoDQhHlUbiUl57azSrst5M2eGDeQ8EydA",
  authDomain: "explyras.firebaseapp.com",
  databaseURL: "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "explyras",
  storageBucket: "explyras.firebasestorage.app",
  messagingSenderId: "411853553644",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9",
  measurementId: "G-TFBZ5GZ22C"
};

const app = firebase.initializeApp(CS_FIREBASE_CONFIG, 'testApp2');
const db = firebase.firestore(app);

// Simulate the exact flow
const userId = "fake-user-id-123";

async function run() {
  try {
    // try creating a company
    const companyRef = await db.collection('cs_companies').add({
      name: "Test Co",
      goal: "Test Goal",
      industry: "Test Industry",
      description: "Desc",
      userId: userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Created company", companyRef.id);

    // try updating the user doc for a user that doesn't exist
    await db.collection('cs_users').doc(userId).update({
      companyId: companyRef.id
    });
    console.log("Updated user");
  } catch (e) {
    console.error("FAILED during flow:", e.message);
  }
  process.exit();
}

run();
