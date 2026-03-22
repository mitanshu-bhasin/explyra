"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { addAdminUser } from "@/lib/firestore";

export default function AdminsTab() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await addAdminUser(email.trim());
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto"
    >
      <div className="glass-card p-10 text-center border-dashed border-2 border-indigo-200 dark:border-indigo-900/40">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <UserPlus className="w-9 h-9 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-black mb-2">Expand Your Team</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          Grant Explyra Core access to other team members. Safeguard the platform by only adding verified corporate accounts.
        </p>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-sm font-bold"
          >
            ✓ Admin access granted successfully
          </motion.div>
        )}

        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            className="input-primary flex-1"
            placeholder="colleague@explyra.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-100 dark:shadow-none whitespace-nowrap disabled:opacity-60 flex items-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Invoke Access
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
