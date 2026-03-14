"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getBookingsByClient, getBookingsByExpert, getExpert, getPostsByAuthor, updateExpert, createPost } from "@/lib/firestore";
import type { Booking, Expert, Post } from "@/lib/types";
import { Calendar, DollarSign, Star, FileText, Users, Clock, ArrowRight, Plus, Briefcase, Eye, EyeOff, Send, X, PenSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user, retiredUser, role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expert, setExpert] = useState<Expert | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // New states for enhancements
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "", content: "", imageUrl: "", tags: "",
    category: "general" as Post["category"],
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }

    const load = async () => {
      try {
        if (role === "expert") {
          const [b, e, p] = await Promise.all([
            getBookingsByExpert(user.uid),
            getExpert(user.uid),
            getPostsByAuthor(user.uid),
          ]);
          setBookings(b); setExpert(e); setPosts(p);
        } else {
          const b = await getBookingsByClient(user.uid);
          setBookings(b);
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    load();
  }, [user, role, authLoading, router]);

  const handleToggleVisibility = async () => {
    if (!expert) return;
    const newStatus = !expert.isVisible;
    try {
      await updateExpert(expert.id, { isVisible: newStatus });
      setExpert({ ...expert, isVisible: newStatus });
      toast.success(newStatus ? "Profile is now visible" : "Profile is now hidden");
    } catch (err) {
      toast.error("Failed to update visibility");
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingPost(true);
    try {
      await createPost({
        authorId: user.uid,
        authorName: user.displayName || "Expert",
        authorImageUrl: user.photoURL || undefined,
        title: postForm.title,
        content: postForm.content,
        imageUrl: postForm.imageUrl || undefined,
        tags: postForm.tags.split(",").map(t => t.trim()).filter(Boolean),
        category: postForm.category,
      });
      toast.success("Post published!");
      setShowCreatePost(false);
      setPostForm({ title: "", content: "", imageUrl: "", tags: "", category: "general" });
      const updatedPosts = await getPostsByAuthor(user.uid);
      setPosts(updatedPosts);
    } catch (err: any) {
      toast.error(err.message || "Failed to publish");
    }
    setSavingPost(false);
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner" />
      </div>
    );
  }

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const completedBookings = bookings.filter(b => b.status === "completed");

  return (
    <div style={{ padding: "2.5rem 0" }}>
      <div className="container">
        {/* Welcome header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h1 style={{ fontSize: "1.85rem", marginBottom: "0.4rem" }}>
              Welcome back, {user?.displayName?.split(" ")[0] || "there"}! 👋
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem" }}>
              {role === "expert" ? "Here's an overview of your consulting activity." : "Here's what's happening with your sessions."}
            </p>
          </div>

          {role === "expert" && expert && (
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--color-bg-light)", padding: "0.75rem 1.25rem", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>Account Status</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: expert.isApproved ? "var(--color-success)" : "var(--color-warning)" }}>
                    {expert.isApproved ? "Approved" : "Pending Approval"}
                  </span>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--color-bg-light)", padding: "0.75rem 1.25rem", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>Visibility</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: expert.isVisible ? "var(--color-success)" : "var(--color-text-muted)" }}>
                    {expert.isVisible ? "Live" : "Hidden"}
                  </span>
                </div>
                <button 
                  onClick={handleToggleVisibility}
                  style={{ 
                    background: expert.isVisible ? "var(--color-success)" : "var(--color-border)",
                    border: "none",
                    width: "48px",
                    height: "24px",
                    borderRadius: "12px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ 
                    position: "absolute",
                    top: "2px",
                    left: expert.isVisible ? "26px" : "2px",
                    width: "20px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {expert.isVisible ? <Eye size={10} color="var(--color-success)" /> : <EyeOff size={10} color="var(--color-text-muted)" />}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <div className="card card-body" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Calendar size={22} color="var(--color-primary-light)" />
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>{bookings.length}</div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Total Sessions</div>
            </div>
          </div>

          <div className="card card-body" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(6,182,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={22} color="var(--color-accent)" />
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>{pendingBookings.length}</div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Pending</div>
            </div>
          </div>

          <div className="card card-body" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(22,163,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Star size={22} color="var(--color-success)" />
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>{completedBookings.length}</div>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Completed</div>
            </div>
          </div>

          {role === "expert" && (
            <div className="card card-body" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(217,119,6,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DollarSign size={22} color="var(--color-warning)" />
              </div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>${completedBookings.reduce((s, b) => s + b.price, 0)}</div>
                <div style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Earned</div>
              </div>
            </div>
          )}
        </div>

        {/* Expert-specific alerts */}
        {role === "expert" && expert && !expert.isApproved && (
          <div className="alert alert-info" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <Briefcase size={20} />
            <span>Your profile is pending admin approval. You'll appear in search results once approved.</span>
          </div>
        )}

        {role === "expert" && !expert && (
          <div className="alert alert-info" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <span>Complete your expert profile to start receiving consultation requests.</span>
            <Link href="/profile" className="btn btn-primary btn-sm">Setup Profile</Link>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.75rem" }}>
          {/* Recent bookings */}
          <div className="card">
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3>Recent Sessions</h3>
              </div>
              {bookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-muted)" }}>
                  <Calendar size={40} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
                  <p>No sessions yet</p>
                  {role === "client" && (
                    <Link href="/search" className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>Find an Expert</Link>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem", background: "#f8fafc", borderRadius: "10px" }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{role === "expert" ? b.clientName : b.expertName}</div>
                        <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>{b.duration} min · ${b.price}</div>
                      </div>
                      <span className={`badge ${b.status === "completed" ? "badge-green" : b.status === "pending" ? "badge-amber" : b.status === "confirmed" ? "badge-blue" : "badge-red"}`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <div className="card-body">
              <h3 style={{ marginBottom: "1.5rem" }}>Quick Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {role === "expert" ? (
                  <>
                    <Link href="/profile" className="btn btn-outline" style={{ justifyContent: "space-between" }}>
                      Edit My Profile <ArrowRight size={18} />
                    </Link>
                    <button onClick={() => setShowCreatePost(true)} className="btn btn-primary" style={{ justifyContent: "space-between" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><PenSquare size={18} /> Write a Post</span>
                      <Plus size={18} />
                    </button>
                    <Link href="/messages" className="btn btn-outline" style={{ justifyContent: "space-between" }}>
                      View Messages <ArrowRight size={18} />
                    </Link>
                    <Link href="/post" className="btn btn-outline" style={{ justifyContent: "space-between" }}>
                      View Knowledge Hub <ArrowRight size={18} />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/search" className="btn btn-primary" style={{ justifyContent: "space-between" }}>
                      Find an Expert <ArrowRight size={18} />
                    </Link>
                    <Link href="/messages" className="btn btn-outline" style={{ justifyContent: "space-between" }}>
                      My Messages <ArrowRight size={18} />
                    </Link>
                    <Link href="/post" className="btn btn-outline" style={{ justifyContent: "space-between" }}>
                      Browse Knowledge Hub <ArrowRight size={18} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreatePost && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1.5rem" }}>
          <div className="card card-body" style={{ maxWidth: "620px", width: "100%", padding: "2rem", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setShowCreatePost(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: "1.5rem" }}>Write a Post</h2>
            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="Post title" value={postForm.title} onChange={e => setPostForm(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input form-select" value={postForm.category} onChange={e => setPostForm(p => ({ ...p, category: e.target.value as Post["category"] }))}>
                  <option value="general">General</option>
                  <option value="career-advice">Career Advice</option>
                  <option value="industry-insights">Industry Insights</option>
                  <option value="mentoring">Mentoring</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-input" rows={8} placeholder="Share your knowledge..." value={postForm.content} onChange={e => setPostForm(p => ({ ...p, content: e.target.value }))} required style={{ resize: "vertical" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Image URL (optional)</label>
                <input className="form-input" placeholder="https://i.postimg.cc/..." value={postForm.imageUrl} onChange={e => setPostForm(p => ({ ...p, imageUrl: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input className="form-input" placeholder="e.g. leadership, strategy" value={postForm.tags} onChange={e => setPostForm(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={savingPost}>
                <Send size={18} /> {savingPost ? "Publishing..." : "Publish Post"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
