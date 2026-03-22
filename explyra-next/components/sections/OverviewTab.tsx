"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Building2, Users, Receipt, ShieldCheck, Ban, Microchip, Search } from "lucide-react";
import { fetchCompanies, Company, updateCompanyPlan, deleteCompany } from "@/lib/firestore";
import PlanModal from "@/components/ui/PlanModal";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  accent?: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className={`glass-card p-6 flex items-center gap-5 ${accent ? `border-l-4 ${accent}` : ""}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </motion.div>
  );
}

const planColor: Record<string, string> = {
  trial: "bg-slate-100 text-slate-600",
  starter: "bg-blue-100 text-blue-700",
  growth: "bg-violet-100 text-violet-700",
  business: "bg-amber-100 text-amber-700",
  enterprise: "bg-emerald-100 text-emerald-700",
};

export default function OverviewTab() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies().then((data) => {
      setCompanies(data);
      setLoading(false);
    });
  }, []);

  // Derive filtered list without a separate useEffect
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return companies;
    return companies.filter(
      (c) =>
        c.companyName?.toLowerCase().includes(q) ||
        c.ownerEmail?.toLowerCase().includes(q) ||
        c.plan?.toLowerCase().includes(q)
    );
  }, [companies, search]);

  const stats = {
    companies: companies.length,
    users: companies.reduce((s, c) => s + (c.employeeCount ?? 0), 0),
    expenses: companies.reduce((s, c) => s + (c.expenseCount ?? 0), 0),
    active: companies.filter((c) => c.status === "active").length,
    suspended: companies.filter((c) => c.status === "suspended").length,
  };

  async function handleDelete(id: string) {
    if (!confirm("Delete this company? This cannot be undone.")) return;
    await deleteCompany(id);
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleSavePlan(
    id: string,
    data: { plan: string; planCost: number; planDuration: number; planEndDate: string }
  ) {
    await updateCompanyPlan(id, data);
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    setEditTarget(null);
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          <StatCard label="Companies" value={loading ? "—" : stats.companies} icon={Building2} color="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" />
          <StatCard label="Total Users" value={loading ? "—" : stats.users} icon={Users} color="bg-blue-50 dark:bg-blue-900/30 text-blue-600" />
          <StatCard label="Expenses" value={loading ? "—" : stats.expenses} icon={Receipt} color="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" />
          <StatCard label="Active Plans" value={loading ? "—" : stats.active} icon={ShieldCheck} color="bg-amber-50 dark:bg-amber-900/30 text-amber-600" accent="border-l-emerald-500" />
          <StatCard label="Suspended" value={loading ? "—" : stats.suspended} icon={Ban} color="bg-red-50 dark:bg-red-900/30 text-red-600" accent="border-l-red-500" />
        </motion.div>

        {/* Platform Health */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Microchip className="w-5 h-5 text-indigo-600" /> Platform Health
              </h3>
              <div className="flex gap-3">
                {["API: 99.9%", "DB: Stable"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Global Compute", value: "0.8s avg", pct: 28 },
                { label: "Object Storage", value: "1.2 TB / 10 TB", pct: 12 },
              ].map(({ label, value, pct }) => (
                <div key={label} className="space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">{label}</span>
                    <span className="text-slate-600 dark:text-slate-300">{value}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="bg-linear-to-r from-indigo-500 to-indigo-400 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security card */}
          <div className="glass-card p-8 bg-indigo-600 text-white relative overflow-hidden group cursor-pointer">
            <div className="relative z-10 transition-transform group-hover:translate-x-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Core Update v2.4</p>
              <h4 className="text-xl font-bold mb-4">Security Hardening</h4>
              <p className="text-sm opacity-90 leading-relaxed mb-6">
                MFA protocols and automated audit logging are now active for all root accounts.
              </p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/10 w-fit px-3 py-1.5 rounded-lg border border-white/20">
                ✓ Deployed
              </div>
            </div>
            <ShieldCheck className="absolute -bottom-4 -right-4 w-28 h-28 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </motion.div>

        {/* Recent Activity + Guardian */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
              <h3 className="font-bold tracking-tight">Recent Platform Activity</h3>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {[
                {
                  label: "Nexus Corp Initialized",
                  sub: "Corporate Onboarding • Just now",
                  badge: "SUCCESS",
                  badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                },
                {
                  label: "Security Policy Override",
                  sub: "Admin Action • 12m ago",
                  badge: "WARNING",
                  badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                },
              ].map(({ label, sub, badge, badgeColor }) => (
                <div
                  key={label}
                  className="p-6 flex items-center gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{label}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{sub}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${badgeColor}`}>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="glass-card p-8 flex flex-col">
            <h3 className="font-bold tracking-tight mb-6">Platform Guardian</h3>
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-slate-300" />
                </div>
                <svg className="absolute inset-0 w-24 h-24 -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-indigo-600"
                    strokeDasharray="276"
                    strokeDashoffset="69"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-black">75%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance Score</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                &quot;Your platform security posture is strong, but rotate root credentials soon.&quot;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Companies table */}
        <motion.div variants={itemVariants} className="glass-card overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Registered Entities</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage all registered companies and their plans</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Filter by name, email, or plan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-primary pl-11 py-2.5 text-sm w-full"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100 dark:border-slate-800/50">
                  {["Company Identity", "Ownership", "Metrics", "Subscription", "Status", "Operations"].map(
                    (h, i) => (
                      <th key={h} className={`px-8 py-5 ${i === 5 ? "text-right" : ""}`}>
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
                        <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                          Synchronizing Data...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center text-slate-400 text-sm">
                      No companies found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <p className="font-bold">{c.companyName}</p>
                        <p className="text-xs text-slate-400">{c.id.slice(0, 8)}...</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-medium">{c.ownerName ?? "—"}</p>
                        <p className="text-xs text-slate-400">{c.ownerEmail ?? "—"}</p>
                      </td>
                      <td className="px-8 py-5 text-xs font-medium text-slate-500">
                        {c.employeeCount ?? 0} users · {c.expenseCount ?? 0} expenses
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black capitalize ${planColor[c.plan ?? "trial"] ?? planColor.trial}`}
                        >
                          {c.plan ?? "trial"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                            c.status === "active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : c.status === "suspended"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {c.status ?? "trial"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditTarget(c)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          >
                            Edit Plan
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {editTarget && (
        <PlanModal
          company={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(data) => handleSavePlan(editTarget.id, data)}
        />
      )}
    </>
  );
}
