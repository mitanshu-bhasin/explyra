"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc, Timestamp, where } from "firebase/firestore";
import { Package, Clock, Truck, CheckCircle2, AlertCircle, Search, Filter, Loader2 } from "lucide-react";

interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  totalAmount: number;
  paymentMethod: string;
  transactionId: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Timestamp;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "shop_orders"), orderBy("createdAt", "desc"));
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

  useEffect(() => {
     fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const orderRef = doc(db, "shop_orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Error pride updating status:", error);
      alert("Failed to update status.");
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === "All" || o.status === filter;
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Shipped": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Cancelled": return "bg-rose-100 text-rose-700 border-rose-200";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-ink">Order Management</h1>
          <p className="text-sm text-brand-ink-light font-bold uppercase tracking-widest mt-1">Manage architectural supply fulfillments</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="px-6 py-2 bg-white border border-brand-bdr rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-bg transition-all"
        >
          Refresh Data
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-brand-bdr shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest">Total Orders</p>
          <p className="text-3xl font-serif font-bold">{orders.length}</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Pending</p>
          <p className="text-3xl font-serif font-bold text-amber-900">{orders.filter(o => o.status === 'Pending').length}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Processing</p>
          <p className="text-3xl font-serif font-bold text-blue-900">{orders.filter(o => o.status === 'Processing').length}</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Completed</p>
          <p className="text-3xl font-serif font-bold text-emerald-900">{orders.filter(o => o.status === 'Delivered').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-brand-bdr shadow-sm overflow-hidden">
        <div className="p-6 border-b border-brand-bg flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink-light" />
            <input 
              type="text" 
              placeholder="Search by name, ID or mobile..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brand-bg border border-brand-bdr rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                  filter === s ? "bg-brand-ink text-white border-brand-ink" : "bg-white text-brand-ink-light border-brand-bdr hover:bg-brand-bg"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg/50">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Order / Date</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Customer</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Items</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Payment</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-ink-light">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-bg">
              {loading ? (
                <tr><td colSpan={6} className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-blue" /></td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="p-20 text-center text-brand-ink-light font-bold uppercase tracking-widest italic">No orders found</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-bg/30 transition-colors">
                    <td className="p-4">
                      <div className="font-mono text-[10px] font-bold text-brand-blue">#{order.id.slice(0, 8).toUpperCase()}</div>
                      <div className="text-[10px] text-brand-ink-light mt-1">
                        {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN') : "Recently Placed"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-sm">{order.customerName}</div>
                      <div className="text-[10px] text-brand-ink-light">{order.phone}</div>
                    </td>
                    <td className="p-4 max-w-[200px]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-[10px] font-bold truncate">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                      <div className="font-serif font-bold text-brand-ink mt-1">₹{order.totalAmount.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="p-4 text-[10px]">
                      <div className="font-bold">{order.paymentMethod}</div>
                      <div className="text-brand-ink-light font-mono truncate max-w-[100px]">{order.transactionId}</div>
                    </td>
                    <td className="p-4">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                        className="bg-white border border-brand-bdr rounded-lg px-2 py-1 text-[10px] font-bold hover:border-brand-blue focus:outline-none transition-colors"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
