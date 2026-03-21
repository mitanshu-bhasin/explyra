// booking.js - Independent booking system logic

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: (window.EXPLYRA_CONFIG?.firebase?.apiKey || ""),
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Utilities ---

export const generateBookingId = () => {
    return 'BOOK-' + Math.floor(10000 + Math.random() * 90000);
};

export const formatBookingDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(date));
};

// --- Auth Utilities ---

export const checkAuth = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (!user && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('booking-page.html') && !window.location.pathname.includes('track.html')) {
            window.location.href = 'login.html';
        } else if (callback) {
            callback(user);
        }
    });
};

export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error("Logout error:", error);
    }
};

// --- Firestore Helpers ---

export const getBookingProfile = async (uid) => {
    const docRef = doc(db, "booking_profiles", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

export const getProfileByUsername = async (username) => {
    const q = query(collection(db, "booking_profiles"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    }
    return null;
};

export const saveBooking = async (bookingData) => {
    const bookingCode = generateBookingId();
    const finalData = {
        ...bookingData,
        code: bookingCode,
        status: 'upcoming',
        createdAt: serverTimestamp()
    };
    await addDoc(collection(db, "bookings"), finalData);
    return bookingCode;
};

export const getBookingByCode = async (code, email) => {
    const q = query(collection(db, "bookings"), where("code", "==", code), where("customerEmail", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
    }
    return null;
};

export { auth, db };
