"use client";

import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const TAB_TITLES: Record<string, string> = {
  overview: "Platform Overview",
  companies: "Company Directory",
  management: "System Configuration",
  admins: "Admin Access",
  "deletion-requests": "Deletion Requests",
};

export default function Header() {
  const params = useSearchParams();
  const activeTab = params.get("tab") ?? "overview";
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-20 glass-header sticky top-0 z-20 flex items-center justify-between px-10">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h2 className="text-xl font-bold tracking-tight">
          {TAB_TITLES[activeTab] ?? "Platform Overview"}
        </h2>
      </motion.div>

      <div className="flex items-center gap-4">
        {/* System status */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            System Operational
          </span>
        </div>

        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-white dark:hover:bg-slate-900 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </motion.button>
      </div>
    </header>
  );
}
