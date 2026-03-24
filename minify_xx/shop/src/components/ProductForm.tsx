"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Loader2, Save, Package, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  thickness: string;
  price: number | string;
  stock: number | string;
  imageUrl: string;
  unit: string;
}

export default function ProductForm({ 
  initialData, 
  onSuccess 
}: { 
  initialData?: Product | null;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "Glass",
    thickness: initialData?.thickness || "",
    price: initialData?.price?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    imageUrl: initialData?.imageUrl || "",
    unit: initialData?.unit || "Unit",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        thickness: initialData.thickness,
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        imageUrl: initialData.imageUrl,
        unit: initialData.unit,
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (initialData?.id) {
        // Update existing
        await updateDoc(doc(db, "shop_products", initialData.id), {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Add new
        await addDoc(collection(db, "shop_products"), {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          createdAt: new Date().toISOString(),
        });
      }

      setSuccess(true);
      if (!initialData) {
        setFormData({
          name: "",
          description: "",
          category: "Glass",
          thickness: "",
          price: "",
          stock: "",
          imageUrl: "",
          unit: "Unit",
        });
      }
      
      if (onSuccess) onSuccess();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save product.";
      console.error("Error saving product: ", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-brand-bdr rounded-2xl p-6 md:p-8 max-w-3xl shadow-sm">
      <h2 className="text-2xl font-bold text-brand-ink mb-6 flex items-center gap-2 font-serif">
        <Package className="w-6 h-6 text-brand-blue" />
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-6 text-sm">
          Product successfully added to the catalog!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Product Name</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium"
              placeholder="e.g. Toughened Glass 12mm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Category</label>
            <select
              required
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer appearance-none"
            >
              <option value="Glass">Glass</option>
              <option value="Aluminium">Aluminium</option>
              <option value="PVC">PVC</option>
              <option value="Hardware">Hardware</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Description</label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
            placeholder="Detailed description..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Thickness (mm)</label>
            <input
              type="text"
              name="thickness"
              value={formData.thickness}
              onChange={handleInputChange}
              className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
              placeholder="e.g. 12mm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Price / Rate (₹)</label>
            <input
              required
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
              placeholder="₹0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Unit</label>
            <select
              required
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer appearance-none"
            >
              <option value="Unit">Per Unit (pc)</option>
              <option value="sq ft">Per Sq Ft</option>
              <option value="m">Per Meter</option>
              <option value="kg">Per Kg</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-brand-ink-light uppercase tracking-wider">Image URL</label>
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink-light" />
            <input
              required
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full bg-brand-bg border border-brand-bdr rounded-lg pl-11 pr-4 py-2.5 text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium"
              placeholder="/products/example.png or https://imgur.com/example.jpg"
            />
          </div>
          <p className="text-xs text-brand-ink-light mt-1 italic">Paste an external image link (Imgur, Unsplash, etc.)</p>
        </div>

        {formData.imageUrl && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-brand-bdr shadow-inner bg-slate-100">
            <Image 
              src={formData.imageUrl} 
              alt="Preview" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL'; }}
            />
          </div>
        )}

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg border border-brand-bdr text-brand-ink-light hover:bg-brand-bg transition-colors font-semibold text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-brand-blue hover:brightness-110 text-white font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-brand-blue/20"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : initialData ? "Update Product" : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
