"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out">
          {/* Header */}
          <div className="px-6 py-6 border-b border-brand-bdr flex items-center justify-between bg-brand-bg">
            <h2 className="text-xl font-bold font-serif text-brand-ink flex items-center gap-3">
              <ShoppingBag className="text-brand-blue" />
              Your Cart
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white transition-colors text-brand-ink-light"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-brand-bg flex items-center justify-center text-brand-bdr">
                  <ShoppingBag size={40} />
                </div>
                <div className="space-y-2">
                  <p className="text-brand-ink font-bold text-lg">Your cart is empty</p>
                  <p className="text-brand-ink-light text-xs font-bold uppercase tracking-widest">Start adding premium materials to your project</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3 rounded-xl bg-brand-blue text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand-blue/20"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId || item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-brand-bg rounded-xl overflow-hidden border border-brand-bdr shrink-0 relative">
                    <Image 
                      src={item.imageUrl || "https://via.placeholder.com/200"} 
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-brand-ink leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.cartId || item.id)}
                        className="text-brand-ink-light hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {item.dimensions && (
                      <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">
                        {item.dimensions.height}&quot; x {item.dimensions.width}&quot; &bull; {item.dimensions.totalSqFt} sq ft
                      </p>
                    )}
                    <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-wider">
                      {item.quantity} x ₹{item.price.toLocaleString('en-IN')} {item.unit}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-sm font-bold text-brand-ink">
                        ₹{item.totalPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-6 py-8 border-t border-brand-bdr bg-brand-bg space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-brand-ink-light uppercase tracking-widest">Subtotal</p>
                  <p className="text-[10px] text-brand-ink-light font-bold uppercase mt-1">Shipping calculated at checkout</p>
                </div>
                <p className="text-2xl font-bold font-serif text-brand-ink">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </p>
              </div>
              <Link 
                href="/shop/checkout" // Assuming existing checkout flow or I will implement
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#0E3596] transition-all shadow-xl shadow-brand-blue/20"
              >
                Continue to Checkout
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
