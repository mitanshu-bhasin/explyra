"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Loader2, Package, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag, User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";

interface Order {
  id: string;
  createdAt: Timestamp | { seconds: number };
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
}

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "shop_orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (authLoading || (loading && !orders.length)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (!user) return null;

  const getStatusIcon = (status: string) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "pending": return <Clock size={16} className="text-amber-500" />;
      case "processing": return <Settings size={16} className="text-blue-500 animate-spin-slow" />;
      case "shipped": return <Truck size={16} className="text-indigo-500" />;
      case "delivered": return <CheckCircle2 size={16} className="text-emerald-500" />;
      case "cancelled": return <AlertCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar: User Info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-brand-bdr rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-brand-bg border-4 border-white shadow-xl overflow-hidden relative group">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-blue/10 text-brand-blue">
                      <User size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-serif text-brand-ink">{user.displayName || "Explyra Member"}</h2>
                  <p className="text-brand-ink-light text-sm font-medium">{user.email}</p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                  Verified Account
                </div>
              </div>

              <div className="mt-10 space-y-2">
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 text-brand-ink-light hover:text-red-500 transition-all group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
                  <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="bg-brand-ink text-white rounded-3xl p-8 space-y-6 shadow-xl shadow-brand-ink/10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Account Summary</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-2xl font-bold font-serif">{orders.length}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Total Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif">A+</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Member Status</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content: Order History */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold font-serif text-brand-ink flex items-center gap-4">
                Order History
                <span className="text-sm font-sans font-bold text-brand-ink-light bg-brand-bg px-3 py-1 rounded-full border border-brand-bdr">
                  {orders.length} orders
                </span>
              </h1>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white border border-dashed border-brand-bdr rounded-3xl py-32 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center text-brand-bdr">
                  <ShoppingBag size={24} />
                </div>
                <div className="space-y-2">
                  <p className="text-brand-ink font-bold text-lg">No orders yet</p>
                  <p className="text-brand-ink-light text-xs font-bold uppercase tracking-widest">Your premium materials will appear here once ordered</p>
                </div>
                <Link 
                  href="/shop" 
                  className="px-8 py-3 rounded-xl border border-brand-ink text-brand-ink font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-white transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white border border-brand-bdr rounded-3xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="px-8 py-6 border-b border-brand-bg bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-ink shadow-sm">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-[0.2em] mb-1">Order ID: #{order.id.slice(-6).toUpperCase()}</p>
                          <h4 className="text-sm font-bold text-brand-ink">
                            {order.createdAt?.seconds 
                              ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })
                              : "Recently Placed"
                            }
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-[0.2em] mb-1">Total Amount</p>
                          <p className="text-lg font-bold text-brand-ink">₹{(order.totalAmount || 0).toLocaleString('en-IN')}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                          order.status?.toLowerCase() === 'delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                          order.status?.toLowerCase() === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                          'bg-blue-50 border-blue-100 text-blue-600'
                        }`}>
                          {getStatusIcon(order.status)}
                          {order.status || "Pending"}
                        </div>
                      </div>
                    </div>
                    {/* Items Preview (Simple list) */}
                    <div className="px-8 py-4 bg-brand-bg/30">
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white pr-4 rounded-xl border border-brand-bdr shrink-0">
                            <div className="w-12 h-12 bg-brand-bg relative overflow-hidden rounded-l-xl">
                              {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-brand-ink truncate max-w-[120px]">{item.name}</p>
                              <p className="text-[9px] font-bold text-brand-ink-light uppercase">{item.quantity} units</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
