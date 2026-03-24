"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { Edit2, Trash2, Search, Package, Loader2 } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  thickness: string;
  price: number;
  stock: number;
  imageUrl: string;
  unit: string;
}

export default function ProductList({ onEdit }: { onEdit: (product: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "shop_products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "shop_products", id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
        <p className="text-sm font-bold text-brand-ink-light uppercase tracking-widest">Loading Catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-brand-bdr shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink-light" />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-bg border border-brand-bdr rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-blue transition-all"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">
          {filteredProducts.length} Items Total
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-brand-bdr rounded-3xl p-20 text-center space-y-4">
          <Package className="w-12 h-12 text-brand-bg mx-auto" />
          <h3 className="font-bold text-brand-ink">No products found</h3>
          <p className="text-sm text-brand-ink-light max-w-xs mx-auto">Try a different search or add a new product using the form.</p>
        </div>
      ) : (
        <div className="bg-white border border-brand-bdr rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-bg/50 border-b border-brand-bdr">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Product</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Price/Unit</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Stock</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-bg">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-bg/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl border border-brand-bdr overflow-hidden bg-brand-bg">
                          <Image 
                            src={p.imageUrl || "/placeholder.jpg"} 
                            alt={p.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-brand-ink font-serif">{p.name}</p>
                          <p className="text-[10px] text-brand-ink-light uppercase tracking-tight">{p.thickness || "N/A"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-bg px-3 py-1 rounded-full text-[10px] font-bold text-brand-blue border border-brand-bdr">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm">
                      ₹{p.price.toLocaleString()} <span className="text-[10px] font-normal text-brand-ink-light">/ {p.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] font-bold ${p.stock > 10 ? "text-emerald-600" : "text-orange-600"}`}>
                        {p.stock} {p.unit === 'sq ft' ? 'units' : p.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onEdit(p)}
                          className="p-2 rounded-lg hover:bg-brand-blue/10 text-brand-ink-light hover:text-brand-blue transition-all"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="p-2 rounded-lg hover:bg-red-50 text-brand-ink-light hover:text-red-600 transition-all disabled:opacity-50"
                          title="Delete Product"
                        >
                          {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
