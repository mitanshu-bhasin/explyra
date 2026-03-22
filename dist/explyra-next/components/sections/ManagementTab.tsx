"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";

export default function ManagementTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-12 text-center"
    >
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Settings className="w-7 h-7 text-slate-400" />
      </div>
      <h2 className="text-xl font-bold mb-2">System Configuration</h2>
      <p className="text-slate-500 max-w-sm mx-auto">
        Global environment variables and system-wide operation toggles.
      </p>
    </motion.div>
  );
}
