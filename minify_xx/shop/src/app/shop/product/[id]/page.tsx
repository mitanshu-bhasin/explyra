import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";
import Script from "next/script";

type Props = {
  params: Promise<{ id: string }>;
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, "shop_products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = (await params).id;
  const product = await getProduct(id);
  
  if (product) {
    return {
      title: `${product.name} | Explyra Shop`,
      description: product.description.substring(0, 160),
      openGraph: {
        title: product.name,
        description: product.description,
        images: [product.imageUrl],
      },
    };
  }

  return {
    title: "Product Detail | Explyra Shop",
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const id = (await params).id;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg">
        <h1 className="text-2xl font-bold text-brand-ink mb-4">Product Not Found</h1>
        <a href="/shop" className="text-brand-blue hover:underline">Return to Shop</a>
      </div>
    );
  }

  return (
    <>
      <ProductDetailClient product={product} />
      
      {/* JSON-LD for SEO */}
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.imageUrl,
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": "Explyra"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": product.price,
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />
    </>
  );
}
