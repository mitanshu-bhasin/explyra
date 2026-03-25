"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import CheckoutFlow from "@/components/CheckoutFlow";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const qty = parseInt(searchParams.get("qty") || "1");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "shop_products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (err) {
        console.error("Error fetching checkout product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
        <p className="text-sm font-bold text-brand-ink-light uppercase tracking-widest">Preparing Checkout...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-brand-ink font-serif">Checkout is Empty</h2>
        <p className="text-brand-ink-light text-sm max-w-xs mx-auto">Please select a product from the catalog to continue.</p>
        <a href="/shop" className="inline-block text-brand-blue font-bold text-xs uppercase tracking-widest border-b-2 border-brand-blue/20 hover:border-brand-blue transition-all pb-1">Return to Catalog</a>
      </div>
    );
  }

  return <CheckoutFlow product={{...product, price: product.price * qty}} />;
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col pt-24">
      <Header />
      <main className="grow container mx-auto px-4 py-8 max-w-2xl">
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
