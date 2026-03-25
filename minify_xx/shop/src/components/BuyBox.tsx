"use client";

import React, { useState, useMemo } from "react";
import { ShoppingCart, Zap, Info, Truck, RefreshCw } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
  imageUrl: string;
}

interface BuyBoxProps {
  product: Product;
}

export default function BuyBox({ product }: BuyBoxProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [height, setHeight] = useState<string>("");
  const [width, setWidth] = useState<string>("");

  const isSqFt = product.unit?.toLowerCase() === "sq ft";

  const { totalSqFt, totalPrice } = useMemo(() => {
    let sqFt = 0;
    let price = product.price * quantity;

    if (isSqFt && height && width) {
      const h = parseFloat(height);
      const w = parseFloat(width);
      if (!isNaN(h) && !isNaN(w)) {
        sqFt = parseFloat(((h * w) / 144).toFixed(2));
        price = sqFt * product.price * quantity;
      }
    }
    return { totalSqFt: sqFt, totalPrice: price };
  }, [isSqFt, height, width, product.price, quantity]);

  const handleAddToCart = () => {
    if (isSqFt && (!height || !width)) {
      alert("Please enter dimensions for your glass.");
      return;
    }

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
      unit: product.unit,
      totalPrice: totalPrice,
      dimensions: isSqFt ? {
        height: parseFloat(height),
        width: parseFloat(width),
        totalSqFt: totalSqFt
      } : undefined
    };

    addToCart(item);
  };

  return (
    <div className="bg-white border border-brand-bdr rounded-2xl p-6 shadow-sm sticky top-28">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-brand-ink mb-1 font-serif">
          ₹{totalPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </h3>
        <p className="text-brand-ink-light text-xs font-bold uppercase tracking-widest">
          {isSqFt ? `₹${product.price}/sq ft` : `₹${product.price} per unit`}
        </p>
      </div>

      <div className="space-y-6">
        {isSqFt && (
          <div className="space-y-4 p-4 bg-brand-bg rounded-xl border border-brand-bdr/50">
            <h4 className="text-[10px] font-bold text-brand-ink uppercase tracking-[0.2em] flex items-center gap-2">
              <Info size={14} className="text-brand-blue" />
              Custom Dimensions (Inches)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-brand-ink-light uppercase tracking-wider">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="H (in)"
                  className="w-full bg-white border border-brand-bdr rounded-lg px-3 py-2 text-sm focus:border-brand-blue outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-brand-ink-light uppercase tracking-wider">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="W (in)"
                  className="w-full bg-white border border-brand-bdr rounded-lg px-3 py-2 text-sm focus:border-brand-blue outline-none transition-all font-medium"
                />
              </div>
            </div>
            {totalSqFt > 0 && (
              <p className="text-[11px] font-bold text-brand-blue uppercase tracking-widest">
                Total Area: {totalSqFt} sq ft
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-brand-ink-light uppercase tracking-[0.2em]">Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full bg-brand-bg border border-brand-bdr rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:border-brand-blue transition-all cursor-pointer appearance-none"
          >
            {[1, 2, 3, 4, 5, 10, 20].map((q) => (
              <option key={q} value={q}>
                {q} {isSqFt ? "Pieces" : "Units"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#0E3596] transition-all shadow-[0_8px_20px_rgba(21,70,192,0.15)]"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            onClick={() => {
              handleAddToCart();
              window.location.href = `/shop/checkout?id=${product.id}&qty=${quantity}${isSqFt ? `&h=${height}&w=${width}` : ''}`;
            }}
            className="w-full bg-brand-ink text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_8px_20px_rgba(13,17,23,0.1)]"
          >
            <Zap size={16} fill="white" />
            Buy Now
          </button>
        </div>

        <div className="pt-8 border-t border-brand-bdr mt-2 space-y-4">
          <div className="flex items-start gap-3">
            <Truck size={16} className="text-brand-ink-light shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-ink">Regional Delivery</p>
              <p className="text-[9px] text-brand-ink-light font-bold mt-0.5">Dispatched within 3-5 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw size={16} className="text-brand-ink-light shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-ink">Secure Purchase</p>
              <p className="text-[9px] text-brand-ink-light font-bold mt-0.5">Authored for Explyra-grade materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
