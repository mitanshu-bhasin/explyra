"use client";

import Link from "next/link";
import { 
  ShoppingBag, 
  User, 
  History, 
  Settings, 
  ShieldCheck, 
  FileText, 
  RotateCcw,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-bdr pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Address */}
          <div className="space-y-6">
            <Link href="/shop" className="text-2xl font-bold font-serif text-brand-blue tracking-tight">
              Explyra <span className="text-brand-ink">Shop</span>
            </Link>
            <p className="text-sm text-brand-ink-light leading-relaxed max-w-xs font-medium">
              Premium architectural solutions for modern spaces. Glass, Hardware, and PVC specialists.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-brand-ink-light">
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-bold">New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-brand-ink-light">
                <Mail className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-bold font-sans">explyras@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-ink">Inventory</h4>
            <ul className="space-y-4">
              {['Glass', 'Hardware', 'Aluminium', 'PVC'].map(item => (
                <li key={item}>
                  <Link href={`/shop?cat=${item}`} className="text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                    {item} Catalog
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-ink">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="flex items-center gap-2 text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                  <ShieldCheck className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="flex items-center gap-2 text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                  <RotateCcw className="w-4 h-4" /> Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/toc" className="flex items-center gap-2 text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                  <FileText className="w-4 h-4" /> Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & Account */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-ink">Members</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/admin" className="flex items-center gap-2 text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                  <Settings className="w-4 h-4" /> Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/orders" className="flex items-center gap-2 text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                  <History className="w-4 h-4" /> Order History
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex items-center gap-2 text-sm text-brand-ink-light hover:text-brand-blue transition-colors font-bold">
                  <User className="w-4 h-4" /> My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-brand-bg flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest">
            © {new Date().getFullYear()} Explyra Solutions Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors">Instagram</span>
            <span className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors">LinkedIn</span>
            <span className="text-[10px] font-bold text-brand-ink-light uppercase tracking-widest cursor-pointer hover:text-brand-blue transition-colors">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
