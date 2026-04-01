// Firebase Configuration
const firebaseConfig = window.EXPLYRA_CONFIG?.firebase || {
    apiKey: "AIzaSyAoDQhHlUbiUl57azSrst5M2eGDeQ8EydA",
    authDomain: "explyras.firebaseapp.com",
    databaseURL: "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
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

// Export for use in other files
window.auth = auth;
window.db = db;
window.firebaseApp = app;
