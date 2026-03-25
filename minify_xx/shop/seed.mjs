
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAKXkuH1zbUwOD1gA35gG4vQXKTX60xwe0",
    authDomain: "explyras.firebaseapp.com",
    projectId: "explyras",
    storageBucket: "explyras.firebasestorage.app",
    messagingSenderId: "411853553644",
    appId: "1:411853553644:web:eca79eab846b6a5149cac9",
};

// I will attempt to read the real API key from the env or config file if possible
// But I'll use the one from firebase-config.js if I can find it.
// Wait, firebase-config.js only had `apiKey: (window.EXPLYRA_CONFIG?.firebase?.apiKey || "")`.
// This means the API key is likely in `js/env.js`.

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SEED_DATA = [
  {
    name: "12mm Crystal Clear Toughened Glass",
    description: "Architectural grade 12mm toughened glass with diamond-polished edges. Superior strength and clarity for frameless partitions, glass doors, and structural glazing. Certified for safety and durability.",
    category: "Glass",
    thickness: "12mm",
    price: 110,
    stock: 500,
    unit: "sq ft",
    imageUrl: "/products/toughened_glass_12mm_1774213764674.png",
    createdAt: Timestamp.now()
  },
  {
    name: "Dorma BTS-75V Floor Spring",
    description: "Genuine Dorma hydraulic floor spring machine for heavy-duty glass doors. Features adjustable closing speed and backcheck. Universal design for single or double action doors. 5-year mechanical warranty.",
    category: "Hardware",
    thickness: "-",
    price: 4500,
    stock: 25,
    unit: "piece",
    imageUrl: "/products/dorma_floor_spring_1774213796182.png",
    createdAt: Timestamp.now()
  },
  {
    name: "Frosted Privacy Glass 8mm",
    description: "Elegant acid-etched frosted glass for privacy without sacrificing light. Perfect for office partitions, bathroom doors, and decorative panels.",
    category: "Glass",
    thickness: "8mm",
    price: 85,
    stock: 300,
    unit: "sq ft",
    imageUrl: "/products/frosted_glass_8mm_1774213778140.png",
    createdAt: Timestamp.now()
  },
  {
    name: "Premium PVC Bathroom Door",
    description: "Waterproof and durable PVC door set with high-quality finish. Includes frame and hardware. Ideal for humid environments.",
    category: "PVC",
    thickness: "30mm",
    price: 5500,
    stock: 15,
    unit: "set",
    imageUrl: "/products/pvc_bathroom_door_1774213827971.png",
    createdAt: Timestamp.now()
  }
];

async function seed() {
  console.log("Seeding started...");
  const colRef = collection(db, "shop_products");
  for (const item of SEED_DATA) {
    await addDoc(colRef, item);
    console.log(`Added: ${item.name}`);
  }
  console.log("Seeding finished.");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
