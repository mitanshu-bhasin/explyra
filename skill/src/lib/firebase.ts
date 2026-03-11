import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  projectId: "explyras",
  appId: "1:411853553644:web:eca79eab846b6a5149cac9",
  databaseURL: "https://explyras-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "explyras.firebasestorage.app",
  apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
  authDomain: "explyras.firebaseapp.com",
  messagingSenderId: "411853553644",
  measurementId: "G-TFBZ5GZ22C"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);

export default app;
