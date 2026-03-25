import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { Package, LayoutDashboard, Store } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-white text-brand-ink flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-brand-bg border-r border-brand-bdr p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-4 text-brand-blue">
            <Store className="w-6 h-6" />
            <h1 className="text-xl font-bold font-serif">Explyra Admin</h1>
          </div>
          <nav className="flex flex-col gap-2 flex-1 font-bold text-xs uppercase tracking-widest">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white text-brand-blue rounded-xl border border-brand-bdr shadow-sm transition-all hover:shadow-md">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-white text-brand-ink-light rounded-xl transition-all hover:text-brand-blue">
              <Package className="w-4 h-4" />
              Orders
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-white text-brand-ink-light rounded-xl transition-all hover:text-brand-blue">
              <Store className="w-4 h-4" />
              Products
            </Link>
            
            <Link href="/shop" className="mt-auto flex items-center justify-center gap-2 px-4 py-3 border border-brand-bdr hover:bg-white text-brand-ink-light rounded-xl transition-all text-[10px] font-bold">
              View Storefront
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 md:p-10 overflow-auto bg-brand-bg">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
