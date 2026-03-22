"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Company } from "@/lib/firestore";

interface Props {
  company: Company;
  onClose: () => void;
  onSave: (data: { plan: string; planCost: number; planDuration: number; planEndDate: string }) => void;
}

const PLANS = ["trial", "starter", "growth", "business", "enterprise"] as const;
const PLAN_LABELS: Record<string, string> = {
  trial: "Trial (14 Days Tier)",
  starter: "Starter Suite",
  growth: "Growth Accelerator",
  business: "Business Pro",
  enterprise: "Global Enterprise",
};

export default function PlanModal({ company, onClose, onSave }: Props) {
  const [plan, setPlan] = useState(company.plan ?? "trial");
  const [cost, setCost] = useState(String(company.planCost ?? ""));
  const [duration, setDuration] = useState(String(company.planDuration ?? "12"));
  const [endDate, setEndDate] = useState(company.planEndDate ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    await onSave({ plan, planCost: Number(cost), planDuration: Number(duration), planEndDate: endDate });
    setLoading(false);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-100 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card shadow-2xl max-w-md w-full p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black tracking-tight">Subscription Override</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Target */}
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Target Account</p>
              <p className="font-bold">{company.companyName}</p>
            </div>

            {/* Plan */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Architecture</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="input-primary"
              >
                {PLANS.map((p) => (
                  <option key={p} value={p}>{PLAN_LABELS[p]}</option>
                ))}
              </select>
            </div>

            {/* Cost + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Value</label>
                <input type="number" className="input-primary" placeholder="00.00" value={cost} onChange={(e) => setCost(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Term (Months)</label>
                <input type="number" className="input-primary" placeholder="12" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
            </div>

            {/* End date */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lifecycle Expiry</label>
              <input type="date" className="input-primary" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-500"
            >
              Dismiss
            </button>
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 dark:shadow-none transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              Update Registry
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
