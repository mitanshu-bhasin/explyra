"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyBox from "@/components/BuyBox";

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

export default function ProductDetailClient({ product }: { product: Product }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-brand-ink-light hover:text-brand-blue transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-brand-bdr bg-white shadow-sm group">
                <Image 
                  src={product.imageUrl || "/placeholder.jpg"} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </div>
            </div>

            {/* Product Info & BuyBox */}
            <div className="space-y-8">
              <div>
                <span className="inline-block bg-brand-blue/5 text-brand-blue border border-brand-blue/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-ink font-serif leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-brand-ink-light text-sm font-medium tracking-tight">
                  Premium Architectural Solution • {product.thickness || "Standard Specs"}
                </p>
              </div>

              <div className="prose prose-slate prose-sm max-w-none text-brand-ink/80 leading-relaxed font-medium">
                <p>{product.description}</p>
              </div>

              <BuyBox product={product} />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-brand-bdr shadow-sm">
                  <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest mb-1">Availability</p>
                  <p className="text-sm font-bold text-emerald-600">In Stock Ready to Ship</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-brand-bdr shadow-sm">
                  <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest mb-1">Shipping</p>
                  <p className="text-sm font-bold text-brand-ink">Pan-India Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
