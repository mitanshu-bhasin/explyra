"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Building2,
  Settings,
  ShieldCheck,
  Trash2,
  Zap,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, group: "Main" },
  { id: "companies", label: "Companies", icon: Building2, group: "Main" },
  { id: "management", label: "System Mgmt", icon: Settings, group: "Systems" },
  { id: "admins", label: "Admin Access", icon: ShieldCheck, group: "Systems" },
  { id: "deletion-requests", label: "Deletion Req.", icon: Trash2, group: "Systems" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const activeTab = params.get("tab") ?? "overview";

  function switchTab(id: string) {
    router.push(`/admin?tab=${id}`);
  }

  const groups = Array.from(new Set(NAV_ITEMS.map((n) => n.group)));

  return (
    <aside className="w-72 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shrink-0 relative z-30">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <Zap className="text-white w-4 h-4" />
          </div>
          <div>
            <h2 className="font-black text-sm tracking-tighter uppercase">
              Explyra <span className="text-indigo-600">Core</span>
            </h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Platform Admin
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-6 space-y-6">
        {groups.map((group) => (
          <div key={group}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3 mb-3">
              {group}
            </p>
            <div className="space-y-1">
              {NAV_ITEMS.filter((n) => n.group === group).map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => switchTab(item.id)}
                    whileTap={{ scale: 0.98 }}
                    className={`sidebar-item ${isActive ? "active" : ""}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
            {user?.email?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{user?.email ?? "Loading..."}</p>
            <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
              Staff Admin
            </span>
          </div>
        </div>
        <motion.button
          onClick={logout}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/50 flex items-center justify-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout System
        </motion.button>
      </div>
    </aside>
  );
}
