"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { fetchDeletionRequests, deleteDeletionRequest, DeletionRequest } from "@/lib/firestore";

export default function DeletionRequestsTab() {
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeletionRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this request?")) return;
    await deleteDeletionRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  function formatTs(ts?: { seconds: number }) {
    if (!ts) return "—";
    return new Date(ts.seconds * 1000).toLocaleString();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden"
    >
      <div className="px-8 py-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <h3 className="text-lg font-bold tracking-tight">Deletion Requests</h3>
        <p className="text-xs text-slate-400 mt-0.5">Manage requests to delete company accounts</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100 dark:border-slate-800/50">
              {["Email", "Company", "Reason", "Timestamp", "Actions"].map((h, i) => (
                <th key={h} className={`px-8 py-5 ${i === 4 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-8 py-16 text-center text-slate-400">
                  <div className="w-6 h-6 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-16 text-center text-slate-400 text-sm">No deletion requests.</td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-5 font-medium">{r.email}</td>
                  <td className="px-8 py-5 text-slate-500">{r.companyName ?? "—"}</td>
                  <td className="px-8 py-5 text-slate-500 max-w-xs truncate">{r.reason ?? "—"}</td>
                  <td className="px-8 py-5 text-xs text-slate-400">{formatTs(r.timestamp)}</td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
