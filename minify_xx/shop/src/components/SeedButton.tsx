"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Database, Loader2, CheckCircle } from "lucide-react";

const SEED_DATA = [
  {
    name: "12mm Toughened Safety Glass",
    description: "Architectural grade 12mm toughened glass with polished edges. Superior strength for frameless partitions, glass doors, and structural glazing.",
    category: "Glass",
    thickness: "12mm",
    price: 110,
    stock: 500,
    unit: "sq ft",
    imageUrl: "/products/toughened-glass.png",
  },
  {
    name: "8mm Satin Etched Frosted Glass",
    description: "Premium acid-etched frosted glass providing elegant privacy without compromising light. Ideal for bathroom and office partitions.",
    category: "Glass",
    thickness: "8mm",
    price: 85,
    stock: 300,
    unit: "sq ft",
    imageUrl: "/products/frosted-glass.png",
  },
  {
    name: "Dorma BTS-75V Floor Spring",
    description: "Genuine Dorma hydraulic floor spring for heavy-duty doors. Adjustable closing speed for single or double action doors.",
    category: "Hardware",
    thickness: "-",
    price: 4500,
    stock: 25,
    unit: "piece",
    imageUrl: "/products/dorma-floor-spring.png",
  },
  {
    name: "Aluminium Partition Section (Silver)",
    description: "Premium 1.2mm architectural aluminium sections. Anodized silver finish for modern office and commercial joinery.",
    category: "Aluminium",
    thickness: "1.2mm",
    price: 220,
    stock: 1000,
    unit: "kg",
    imageUrl: "/products/aluminium-section.png",
  },
  {
    name: "Modern Stainless Steel Door Handle",
    description: "High-grade stainless steel H-type door handle. Minimalist design for premium glass doors and main entrances.",
    category: "Hardware",
    thickness: "30mm",
    price: 3200,
    stock: 40,
    unit: "piece",
    imageUrl: "/products/door-handle.png",
  }
];

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "shop_products");
      for (const item of SEED_DATA) {
        // Check if exists to avoid duplicates
        const q = query(colRef, where("name", "==", item.name));
        const snap = await getDocs(q);
        if (snap.empty) {
          await addDoc(colRef, {
            ...item,
            createdAt: new Date().toISOString()
          });
        }
      }
      setDone(true);
    } catch (err) {
      console.error("Seed failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={loading || done}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
        done 
        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
        : "bg-white text-brand-blue border-brand-bdr hover:bg-brand-bg shadow-sm"
      }`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : done ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Database className="w-4 h-4" />
      )}
      {loading ? "Seeding..." : done ? "Products Seeded" : "Seed Initial Data"}
    </button>
  );
}
