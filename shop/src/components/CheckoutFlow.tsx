"use client";

import { useState } from "react";
import { Check, CreditCard, ChevronRight, QrCode, Wallet, Loader2, ArrowLeft } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function CheckoutFlow({ product }: { product: Product }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<"UPI" | "Crypto" | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [refId, setRefId] = useState("");

  const handleNext = () => setStep(2);
  const handleBack = () => {
    if (step === 2 && !method) setStep(1);
    else if (method) setMethod(null);
  };

  const handleConfirm = async () => {
    if (!auth.currentUser) {
      alert("Please sign in to complete your order.");
      window.location.href = "/auth";
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "shop_orders"), {
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        customerName: name,
        phone: phone,
        address: address,
        items: [{
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl || ""
        }],
        totalAmount: product.price,
        paymentMethod: method,
        transactionId: refId || "WEB3_PENDING",
        status: "Pending",
        createdAt: serverTimestamp()
      });
      setConfirmed(true);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
          <Check className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif">Order Requested!</h3>
          <p className="text-brand-ink-light text-sm mt-2">Our team will verify your transaction and contact you shortly.</p>
        </div>
        <button 
          onClick={() => window.location.href = "/"}
          className="text-brand-blue font-bold text-sm uppercase tracking-widest pt-4"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Steps indicator */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= 1 ? "bg-brand-ink text-white" : "bg-brand-bg text-brand-ink-light"}`}>1</div>
        <div className="h-[2px] flex-1 bg-brand-bg relative">
          <div className={`absolute inset-0 bg-brand-ink transition-all duration-500 ${step === 2 ? "w-full" : "w-0"}`} />
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === 2 ? "bg-brand-ink text-white" : "bg-brand-bg text-brand-ink-light"}`}>2</div>
      </div>

      {step === 1 ? (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">Shipping & Project Info</h4>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue" />
              <input type="tel" placeholder="Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue" />
            </div>
            <textarea placeholder="Site Address / Delivery Location" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue resize-none h-24" />
          </div>
          <button 
            onClick={handleNext}
            disabled={!name || !phone || !address}
            className="w-full py-4 rounded-xl bg-brand-blue text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-brand-blue/20 transition-all uppercase tracking-[0.2em] text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Choose Payment Method
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          {!method ? (
            <>
              <h4 className="font-bold text-sm uppercase tracking-widest">Select Payment Path</h4>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => setMethod("UPI")}
                  className="flex items-center justify-between p-4 rounded-xl border border-brand-bdr hover:border-brand-blue hover:bg-brand-blue/2 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <QrCode className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-sm">UPI / Bank Transfer</span>
                      <span className="text-[10px] text-brand-ink-light font-bold uppercase tracking-wider">Zero Fees • Instant Verify</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-ink-light" />
                </button>

                <button 
                  onClick={() => setMethod("Crypto")}
                  className="flex items-center justify-between p-4 rounded-xl border border-brand-bdr hover:border-brand-blue hover:bg-brand-blue/2 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                      <Wallet className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-sm">Web3 / Crypto</span>
                      <span className="text-[10px] text-brand-ink-light font-bold uppercase tracking-wider">ETH / SOL / USDC</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-ink-light" />
                </button>
              </div>
              <button onClick={handleBack} className="text-xs font-bold text-brand-ink-light flex items-center gap-2 uppercase tracking-widest">
                <ArrowLeft className="w-3 h-3" /> Back to Shipping
              </button>
            </>
          ) : method === "UPI" ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#F1EFE9] rounded-2xl p-6 text-center space-y-4">
                <h5 className="font-bold text-sm uppercase tracking-widest">Scan & Pay ₹{product.price.toLocaleString('en-IN')}</h5>
                <div className="w-40 h-40 bg-white border border-brand-bdr rounded-xl mx-auto flex items-center justify-center shadow-inner">
                  <span className="text-[10px] font-bold text-brand-ink-light">UPI QR LOGIC HERE</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold uppercase tracking-widest text-brand-ink">Krishna Glass & Hardware</p>
                  <p className="text-brand-ink-light">HDFC Bank: 502000XXXXXXX</p>
                  <p className="text-brand-ink-light">IFSC: HDFC000XXXX</p>
                </div>
              </div>
              <input type="text" placeholder="Transaction Reference ID (after payment)" value={refId} onChange={(e) => setRefId(e.target.value)} className="w-full bg-brand-bg border border-brand-bdr rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-blue font-mono uppercase" />
              <button 
                onClick={handleConfirm}
                disabled={loading || !refId}
                className="w-full py-4 rounded-xl bg-brand-ink text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg transition-all uppercase tracking-[0.2em] text-xs"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "I have completed payment"}
              </button>
              <button onClick={() => setMethod(null)} className="w-full text-xs font-bold text-brand-ink-light flex items-center justify-center gap-2 uppercase tracking-widest">
                <ArrowLeft className="w-3 h-3" /> Other Payment Methods
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col items-center text-center space-y-4">
                <Wallet className="w-12 h-12 text-indigo-600 mb-2" />
                <h4 className="font-bold text-lg font-serif">Web3 Checkout</h4>
                <p className="text-sm text-indigo-900/60 font-medium">Connect your wallet to pay with <strong>{product.price > 1000 ? "ETH" : "USDC"}</strong></p>
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                  Connect Wallet
                </button>
              </div>
              <button onClick={() => setMethod(null)} className="w-full text-xs font-bold text-brand-ink-light flex items-center justify-center gap-2 uppercase tracking-widest">
                <ArrowLeft className="w-3 h-3" /> Other Payment Methods
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
