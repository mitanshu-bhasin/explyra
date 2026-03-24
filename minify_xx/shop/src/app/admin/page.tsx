"use client";

import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import SeedButton from "@/components/SeedButton";
import { Plus, LayoutGrid } from "lucide-react";

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

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveTab('form');
  };

  const handleSuccess = () => {
    setActiveTab('list');
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-brand-ink mb-2 font-serif">
            Dashboard
          </h1>
          <p className="text-brand-ink-light font-medium tracking-tight">Manage your product catalog and services for Explyra Shop.</p>
        </div>
        <div className="flex items-center gap-3">
          <SeedButton />
          <button 
            onClick={() => {
              setEditingProduct(null);
              setActiveTab(activeTab === 'list' ? 'form' : 'list');
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-sm shadow-lg shadow-brand-blue/20 hover:brightness-110 transition-all"
          >
            {activeTab === 'list' ? (
              <>
                <Plus className="w-4 h-4" />
                Add Product
              </>
            ) : (
              <>
                <LayoutGrid className="w-4 h-4" />
                View Catalog
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'form' ? (
          <div className="flex justify-center">
            <ProductForm 
              initialData={editingProduct} 
              onSuccess={handleSuccess}
            />
          </div>
        ) : (
          <ProductList onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
}
