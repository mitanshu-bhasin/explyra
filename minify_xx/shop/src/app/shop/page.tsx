"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Search, Filter, ArrowRight, PackageOpen, LayoutGrid, List } from "lucide-react";
import Header from "@/components/Header";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  unit: string;
  thickness: string;
}

export default function ShopFront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "shop_products"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", "Glass", "Aluminium", "PVC", "Hardware", "Service"];
  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans selection:bg-brand-blue selection:text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-10">
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink-light">Category</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "hover:bg-white text-brand-ink-light"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-ink-light">Thickness</h3>
              <div className="flex flex-wrap gap-2">
                {["All", "8mm", "12mm", "1.2mm", "30mm"].map(t => (
                  <button key={t} className="px-4 py-2 border border-brand-bdr rounded-xl text-[10px] font-bold uppercase transition-all hover:border-brand-blue">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Catalog */}
          <div className="flex-1 space-y-8">
            <div className="bg-white p-4 rounded-2xl border border-brand-bdr flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink-light" />
                <input 
                  type="text" 
                  placeholder="Search materials..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-bdr rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">
                Showing {filteredProducts.length} Results
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 bg-white animate-pulse rounded-3xl border border-brand-bdr"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-32 space-y-4">
                <PackageOpen className="w-16 h-16 text-brand-bg mx-auto" />
                <h3 className="text-xl font-bold font-serif">No materials found</h3>
                <p className="text-brand-ink-light text-sm max-w-xs mx-auto">Try adjusting your filters or search terms for Explyra Shop.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <Link key={p.id} href={`/shop/product/${p.id}`} className="group bg-white rounded-3xl border border-brand-bdr overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image 
                        src={p.imageUrl || "/placeholder.jpg"} 
                        alt={p.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-blue shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg font-serif group-hover:text-brand-blue transition-colors line-clamp-1">{p.name}</h3>
                        <p className="text-brand-ink-light text-[11px] line-clamp-2 leading-relaxed">{p.description}</p>
                      </div>
                      <div className="pt-4 border-t border-brand-bg flex items-end justify-between">
                        <div>
                          <p className="text-[9px] font-bold text-brand-ink-light uppercase tracking-widest mb-1">Pricing</p>
                          <p className="text-xl font-bold text-brand-ink font-serif tracking-tight">
                            ₹{p.price.toLocaleString('en-IN')} <span className="text-[10px] text-brand-ink-light font-sans">/ {p.unit}</span>
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
