"use client";

import Link from "next/link";
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const ADMIN_EMAIL = "explyras@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-lg border-b border-brand-bdr py-3 shadow-sm" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/shop" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20 rotate-3 group-hover:rotate-0 transition-transform">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold font-serif text-brand-ink tracking-tight">Explyra</span>
            <span className="block text-[8px] font-extrabold uppercase tracking-[0.2em] text-brand-blue -mt-1">Architectural Shop</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-brand-ink hover:text-brand-blue transition-colors">Catalog</Link>
          <div className="relative group cursor-pointer">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-ink flex items-center gap-1 group-hover:text-brand-blue">
              Categories <ChevronDown className="w-3 h-3" />
            </span>
            {/* Simple Dropdown emulation */}
          </div>
          <Link href="/orders" className="text-xs font-bold uppercase tracking-widest text-brand-ink hover:text-brand-blue transition-colors">My Orders</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-brand-bg px-4 py-2 rounded-xl border border-brand-bdr shadow-inner group focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all w-48">
            <Search className="w-4 h-4 text-brand-ink-light" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none text-[10px] font-bold px-2 focus:outline-none w-full placeholder:text-brand-ink-light/50"
            />
          </div>

          <div className="flex items-center gap-1">
            {user?.email === ADMIN_EMAIL && (
              <Link 
                href="/admin" 
                className="p-3 rounded-xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:scale-105 transition-all"
                title="Admin Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </Link>
            )}
            
            <Link 
              href={user ? "/profile" : "/auth"} 
              className={`p-3 rounded-xl border transition-all hover:scale-105 flex items-center gap-2 ${
                user ? "border-brand-bdr text-brand-ink font-bold text-[10px] uppercase tracking-widest bg-white" : "bg-brand-ink text-white border-transparent"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">{user ? "Account" : "Sign In"}</span>
            </Link>

            <button className="md:hidden p-3 rounded-xl border border-brand-bdr text-brand-ink">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
