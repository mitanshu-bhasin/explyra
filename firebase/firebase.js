// Firebase Configuration relocated for DNS system
const firebaseConfig = window.EXPLYRA_CONFIG?.firebase || {
    apiKey: "ENV_MISSING",
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9",
    measurementId: "G-TFBZ5GZ22C"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Export for global access
window.auth = auth;
window.db = db;
window.firebaseApp = app;
