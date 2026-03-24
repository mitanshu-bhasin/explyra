"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import Header from "@/components/Header";
import { Package, Clock, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Timestamp;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "shop_orders"),
          where("userId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchOrders();
      else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Pending": return <Clock className="w-5 h-5 text-amber-500" />;
      case "Processing": return <Package className="w-5 h-5 text-blue-500" />;
      case "Shipped": return <Truck className="w-5 h-5 text-indigo-500" />;
      case "Delivered": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "Cancelled": return <AlertCircle className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-32 space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-serif font-bold tracking-tight">Purchase History</h1>
          <p className="text-brand-ink-light text-sm uppercase tracking-widest font-bold">Trace your architectural material orders</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-brand-ink-light">Retrieving orders...</p>
          </div>
        ) : !auth.currentUser ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-bdr p-12 space-y-6">
            <Package className="w-16 h-16 text-brand-bg mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Please sign in</h3>
              <p className="text-brand-ink-light text-sm">You must be logged in to view your order history.</p>
            </div>
            <Link href="/auth" className="inline-block px-10 py-4 bg-brand-ink text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all">Sign In</Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-bdr p-12 space-y-6">
            <Package className="w-16 h-16 text-brand-bg mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">No orders yet</h3>
              <p className="text-brand-ink-light text-sm">Your order history will appear here once you make a purchase.</p>
            </div>
            <Link href="/shop" className="inline-block px-10 py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl border border-brand-bdr p-8 flex flex-col md:flex-row justify-between gap-8 hover:shadow-xl transition-all group">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-bg px-3 py-1 rounded-full text-brand-ink-light">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-brand-ink-light">
                      {order.createdAt?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-brand-bg/30 p-3 rounded-xl">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-brand-ink-light text-sm">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-between items-end gap-4 min-w-[200px]">
                  <div className="text-right">
                    <p className="text-xs font-bold text-brand-ink-light uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-2xl font-serif font-bold text-brand-ink">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                    order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 
                    order.status === 'Cancelled' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                    'bg-brand-bg border-brand-bdr text-brand-ink/70'
                  }`}>
                    {getStatusIcon(order.status)}
                    <span className="text-xs font-bold uppercase tracking-widest">{order.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
