"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getPosts, createPost, getPostsByAuthor } from "@/lib/firestore";
import type { Post } from "@/lib/types";
import { PenSquare, Clock, Tag, Plus, X, Send, Eye } from "lucide-react";
import toast from "react-hot-toast";

function PostCard({ post }: { post: Post }) {
  const dateStr = post.createdAt
    ? typeof post.createdAt === "string"
      ? new Date(post.createdAt).toLocaleDateString()
      : ""
    : "";

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      )}
      <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span className="badge badge-cyan">{post.category?.replace("-", " ")}</span>
          {post.tags?.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.15rem" }}>{post.title}</h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.6, flex: 1, marginBottom: "1rem" }}>
          {post.content?.substring(0, 160)}{post.content?.length > 160 ? "..." : ""}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src={post.authorImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&size=32&background=1e3a5f&color=fff&rounded=true`}
              alt={post.authorName}
              className="avatar"
              style={{ width: "28px", height: "28px" }}
            />
            <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{post.authorName}</span>
          </div>
          {dateStr && (
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Clock size={13} /> {dateStr}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PostPage() {
  const { user, role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"all" | "mine">("all");

  const [form, setForm] = useState({
    title: "", content: "", imageUrl: "", tags: "",
    category: "general" as Post["category"],
  });

  const loadPosts = async () => {
    setLoading(true);
    try {
      if (tab === "mine" && user) {
        const p = await getPostsByAuthor(user.uid);
        setPosts(p);
      } else {
        const p = await getPosts(50);
        setPosts(p);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, [tab, user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await createPost({
        authorId: user.uid,
        authorName: user.displayName || "Expert",
        authorImageUrl: user.photoURL || undefined,
        title: form.title,
        content: form.content,
        imageUrl: form.imageUrl || undefined,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        category: form.category,
      });
      toast.success("Post published!");
      setShowCreate(false);
      setForm({ title: "", content: "", imageUrl: "", tags: "", category: "general" });
      loadPosts();
    } catch (err: any) {
      toast.error(err.message || "Failed to publish");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 style={{ marginBottom: "0.5rem" }}>Knowledge Hub</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem" }}>
            Career advice, industry insights, and mentoring wisdom from our experts.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={() => setTab("all")} className={`btn ${tab === "all" ? "btn-primary" : "btn-outline"} btn-sm`}>
              <Eye size={16} /> All Posts
            </button>
            {user && role === "expert" && (
              <button onClick={() => setTab("mine")} className={`btn ${tab === "mine" ? "btn-primary" : "btn-outline"} btn-sm`}>
                My Posts
              </button>
            )}
          </div>
          {user && role === "expert" && (
            <button onClick={() => setShowCreate(true)} className="btn btn-accent">
              <Plus size={18} /> Write a Post
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}><div className="spinner" /></div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <PenSquare size={48} style={{ color: "var(--color-border)", margin: "0 auto 1rem" }} />
            <h3>No posts yet</h3>
            <p style={{ color: "var(--color-text-muted)" }}>
              {role === "expert" ? "Be the first to share your expertise!" : "Check back soon for expert insights."}
            </p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </div>

      {/* Create modal */}
      {showCreate && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1.5rem" }}>
          <div className="card card-body" style={{ maxWidth: "620px", width: "100%", padding: "2rem", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
            <button onClick={() => setShowCreate(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer" }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: "1.5rem" }}>Write a Post</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input className="form-input" placeholder="Post title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as Post["category"] }))}>
                  <option value="general">General</option>
                  <option value="career-advice">Career Advice</option>
                  <option value="industry-insights">Industry Insights</option>
                  <option value="mentoring">Mentoring</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea className="form-input" rows={8} placeholder="Share your knowledge..." value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} required style={{ resize: "vertical" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Image URL (optional)</label>
                <input className="form-input" placeholder="https://i.postimg.cc/..." value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input className="form-input" placeholder="e.g. leadership, strategy" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={saving}>
                <Send size={18} /> {saving ? "Publishing..." : "Publish Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
