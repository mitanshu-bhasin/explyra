import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import config from "../config.js";

const app = initializeApp(config.firebase);
const db = getFirestore(app);

const ARTICLES_COLLECTION = "tech_articles";

export const saveArticle = async (articleData) => {
    try {
        const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
            ...articleData,
            createdAt: new Date().toISOString()
        });
        console.log("Article saved with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const getArticles = async (count = 10) => {
    try {
        const q = query(collection(db, ARTICLES_COLLECTION), orderBy("createdAt", "desc"), limit(count));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw e;
    }
};

export default db;
