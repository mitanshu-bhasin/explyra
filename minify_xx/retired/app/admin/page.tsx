"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getAllExperts, approveExpert, featureExpert, deleteExpert } from "@/lib/firestore";
import { Expert } from "@/lib/types";
import { Check, X, Star, Trash2, ExternalLink, ShieldCheck, Clock, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const ADMIN_EMAIL = "explras@gmail.com";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.email !== ADMIN_EMAIL) {
      router.push("/");
      return;
    }

    const load = async () => {
      try {
        const data = await getAllExperts();
        setExperts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load experts");
      }
      setLoading(false);
    };
    load();
  }, [user, authLoading, router]);

  const handleApprove = async (id: string, current: boolean) => {
    try {
      await approveExpert(id, !current);
      setExperts(experts.map(e => e.id === id ? { ...e, isApproved: !current } : e));
      toast.success(!current ? "Expert approved" : "Approval revoked");
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleFeature = async (id: string, current: boolean) => {
    try {
      await featureExpert(id, !current);
      setExperts(experts.map(e => e.id === id ? { ...e, isFeatured: !current } : e));
      toast.success(!current ? "Expert featured" : "Feature removed");
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    try {
      await deleteExpert(id);
      setExperts(experts.filter(e => e.id !== id));
      toast.success("Expert deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem 0" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <div>
            <h1 style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <ShieldCheck size={32} color="var(--color-primary)" /> Admin Console
            </h1>
            <p style={{ color: "var(--color-text-muted)" }}>Manage experts and marketplace quality.</p>
          </div>
          <div className="badge badge-blue" style={{ padding: "0.5rem 1rem" }}>
            Admin: {user?.email}
          </div>
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--color-bg-light)", borderBottom: "1px solid var(--color-border)" }}>
              <tr>
                <th style={{ padding: "1rem", textAlign: "left" }}>Expert</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Visibility</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Rating</th>
                <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-muted)" }}>
                    No experts found.
                  </td>
                </tr>
              ) : (
                experts.map((e) => (
                  <tr key={e.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: 600 }}>{e.fullName}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{e.industry} · {e.pastProfession}</div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {e.isApproved ? (
                        <span className="badge badge-green" style={{ display: "flex", alignItems: "center", gap: "0.25rem", width: "fit-content" }}>
                          <UserCheck size={14} /> Approved
                        </span>
                      ) : (
                        <span className="badge badge-amber" style={{ display: "flex", alignItems: "center", gap: "0.25rem", width: "fit-content" }}>
                          <Clock size={14} /> Pending
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {e.isVisible !== false ? (
                        <span style={{ fontSize: "0.9rem", color: "var(--color-success)" }}>Public</span>
                      ) : (
                        <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>Hidden</span>
                      )}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Star size={14} fill="currentColor" color="#fbbf24" /> {e.rating || 0}
                      </div>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <Link href={`/expert/${e.id}`} className="btn btn-outline btn-xs" title="View Profile">
                          <ExternalLink size={14} />
                        </Link>
                        <button 
                          onClick={() => handleApprove(e.id, !!e.isApproved)}
                          className={e.isApproved ? "btn btn-outline btn-xs" : "btn btn-primary btn-xs"}
                          title={e.isApproved ? "Revoke Approval" : "Approve Expert"}
                        >
                          {e.isApproved ? <X size={14} /> : <Check size={14} />}
                        </button>
                        <button 
                          onClick={() => handleFeature(e.id, !!e.isFeatured)}
                          className={e.isFeatured ? "btn btn-amber btn-xs" : "btn btn-outline btn-xs"}
                          title={e.isFeatured ? "Remove Featured" : "Feature Expert"}
                        >
                          <Star size={14} fill={e.isFeatured ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={() => handleDelete(e.id)}
                          className="btn btn-outline btn-xs text-red"
                          title="Delete Expert"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <style>{`
        .text-red { color: #ef4444; }
        .btn-xs { padding: 0.25rem 0.5rem; font-size: 0.75rem; border-radius: 6px; }
        .btn-amber { background: #fbbf24; border-color: #fbbf24; color: #fff; }
        .btn-amber:hover { background: #f59e0b; }
      `}</style>
    </div>
  );
}
