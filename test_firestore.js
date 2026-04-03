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

const app = firebase.initializeApp(CS_FIREBASE_CONFIG, 'testApp');
const db = firebase.firestore(app);

// Test Unauthenticated read on cs_companies
db.collection('cs_companies').limit(1).get()
  .then(snap => {
    console.log("Unauthenticated read success:", snap.size, "documents");
    // Test Unauthenticated write on cs_companies
    return db.collection('cs_companies').add({ test: true, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
  })
  .then(docRef => {
    console.log("Unauthenticated write success:", docRef.id);
    process.exit(0);
  })
  .catch(err => {
    console.error("Firestore test failed:", err.message);
    process.exit(1);
  });
