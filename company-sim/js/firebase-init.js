// ============================================
// Firebase Initialization for Company Simulator
// ============================================

const CS_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDadazHFf525KrsOoQWUP5yJ7q7uxyf3lw",
  authDomain: "explyras.firebaseapp.com",
  databaseURL: "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "explyras",
  storageBucket: "explyras.firebasestorage.app",
  messagingSenderId: "411853553644",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9",
  measurementId: "G-TFBZ5GZ22C"
};

// Initialize Firebase using a named app exclusively to prevent conflicts
let csApp, csAuth, csDb;

try {
  // Always use a specific named app for the simulator
  if (firebase.apps && firebase.apps.length > 0) {
    const existing = firebase.apps.find(a => a.name === 'companySimApp');
    csApp = existing || firebase.initializeApp(CS_FIREBASE_CONFIG, 'companySimApp');
  } else {
    csApp = firebase.initializeApp(CS_FIREBASE_CONFIG, 'companySimApp');
  }
} catch (e) {
  csApp = firebase.app('companySimApp');
}

csAuth = firebase.auth(csApp);
csDb = firebase.firestore(csApp);

// Enable verbose logging to see precisely which database and rules are targeted
firebase.firestore.setLogLevel('debug');
console.log("Firebase initialized. Project:", csApp.options.projectId);
console.log("Firestore configured for database (if visible):", csDb.databaseId || "(default assumed)");

// Temporarily disable persistence to avoid cross-project IndexedDB pollution on localhost
// csDb.enablePersistence().catch(...)

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyCA36DOoQGv51JCrEkIbVxXtaw6WkN_4GY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Export
window.csAuth = csAuth;
window.csDb = csDb;
window.csApp = csApp;
window.GEMINI_API_KEY = GEMINI_API_KEY;
window.GEMINI_API_URL = GEMINI_API_URL;
