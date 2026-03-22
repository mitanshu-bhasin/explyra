"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getExpert, createExpert, updateExpert } from "@/lib/firestore";
import type { Expert } from "@/lib/types";
import { INDUSTRIES } from "@/lib/types";
import { Save, ImageIcon, Linkedin, Globe } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    age: 55,
    pastProfession: "",
    yearsOfExperience: 20,
    industry: "",
    skills: "",
    bio: "",
    languages: "",
    consultationPrice: 50,
    availability: "",
    linkedinUrl: "",
    profileImageUrl: "",
    documentUrls: "",
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    const load = async () => {
      const existing = await getExpert(user.uid);
      if (existing) {
        setForm({
          fullName: existing.fullName || "",
          age: existing.age || 55,
          pastProfession: existing.pastProfession || "",
          yearsOfExperience: existing.yearsOfExperience || 20,
          industry: existing.industry || "",
          skills: existing.skills?.join(", ") || "",
          bio: existing.bio || "",
          languages: existing.languages?.join(", ") || "",
          consultationPrice: existing.consultationPrice || 50,
          availability: existing.availability || "",
          linkedinUrl: existing.linkedinUrl || "",
          profileImageUrl: existing.profileImageUrl || "",
          documentUrls: existing.documentUrls?.join("\n") || "",
        });
      } else {
        setForm(prev => ({ ...prev, fullName: user.displayName || "" }));
      }
      setLoading(false);
    };
    load();
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const data: Partial<Expert> = {
        fullName: form.fullName,
        age: Number(form.age),
        pastProfession: form.pastProfession,
        yearsOfExperience: Number(form.yearsOfExperience),
        industry: form.industry,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        bio: form.bio,
        languages: form.languages.split(",").map(s => s.trim()).filter(Boolean),
        consultationPrice: Number(form.consultationPrice),
        availability: form.availability,
        linkedinUrl: form.linkedinUrl,
        profileImageUrl: form.profileImageUrl,
        documentUrls: form.documentUrls.split("\n").map(s => s.trim()).filter(Boolean),
      };
      const existing = await getExpert(user.uid);
      if (existing) {
        await updateExpert(user.uid, data);
      } else {
        await createExpert(user.uid, data);
      }
      toast.success("Profile saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner" />
      </div>
    );
  }

  const updateField = (key: string, val: string | number) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ padding: "2.5rem 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>
          {role === "expert" ? "Expert Profile Setup" : "My Profile"}
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
          {role === "expert" ? "Complete your profile to appear in search results and receive booking requests." : "Manage your account information."}
        </p>

        <form onSubmit={handleSubmit} className="card card-body">
          {/* Profile photo preview */}
          {form.profileImageUrl && (
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <img src={form.profileImageUrl} alt="Profile" style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", margin: "0 auto", border: "3px solid var(--color-border)" }} />
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" value={form.fullName} onChange={e => updateField("fullName", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Age *</label>
              <input className="form-input" type="number" min={40} max={90} value={form.age} onChange={e => updateField("age", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Past Profession *</label>
              <input className="form-input" placeholder="e.g. Chief Technology Officer" value={form.pastProfession} onChange={e => updateField("pastProfession", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Years of Experience *</label>
              <input className="form-input" type="number" min={1} max={60} value={form.yearsOfExperience} onChange={e => updateField("yearsOfExperience", e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Industry *</label>
              <select className="form-input form-select" value={form.industry} onChange={e => updateField("industry", e.target.value)} required>
                <option value="">Select industry</option>
                {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Consultation Price ($/hr) *</label>
              <input className="form-input" type="number" min={0} value={form.consultationPrice} onChange={e => updateField("consultationPrice", e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Skills * (comma separated)</label>
            <input className="form-input" placeholder="e.g. Strategic Planning, Mentoring, Business Development" value={form.skills} onChange={e => updateField("skills", e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Languages (comma separated)</label>
            <input className="form-input" placeholder="e.g. English, Hindi, Tamil" value={form.languages} onChange={e => updateField("languages", e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Bio *</label>
            <textarea className="form-input" rows={4} placeholder="Tell clients about your experience, expertise, and what you can help with..." value={form.bio} onChange={e => updateField("bio", e.target.value)} required style={{ resize: "vertical", minHeight: "120px" }} />
          </div>

          <div className="form-group">
            <label className="form-label">Availability *</label>
            <input className="form-input" placeholder="e.g. Weekdays 10am-4pm IST" value={form.availability} onChange={e => updateField("availability", e.target.value)} required />
          </div>

          <div className="divider" />

          <div className="form-group">
            <label className="form-label"><ImageIcon size={16} style={{ display: "inline", verticalAlign: "-2px" }} /> Profile Image URL</label>
            <input className="form-input" placeholder="https://i.postimg.cc/xxxx/profile.jpg" value={form.profileImageUrl} onChange={e => updateField("profileImageUrl", e.target.value)} />
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.82rem", marginTop: "0.3rem" }}>
              Upload your photo to <a href="https://postimg.cc" target="_blank" rel="noopener noreferrer">postimg.cc</a> or <a href="https://imgur.com" target="_blank" rel="noopener noreferrer">imgur.com</a> and paste the URL here.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label"><Linkedin size={16} style={{ display: "inline", verticalAlign: "-2px" }} /> LinkedIn Profile URL</label>
            <input className="form-input" placeholder="https://linkedin.com/in/yourprofile" value={form.linkedinUrl} onChange={e => updateField("linkedinUrl", e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Document URLs (one per line, optional)</label>
            <textarea className="form-input" rows={3} placeholder="https://example.com/resume.pdf&#10;https://example.com/certificate.jpg" value={form.documentUrls} onChange={e => updateField("documentUrls", e.target.value)} style={{ resize: "vertical" }} />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "1rem" }} disabled={saving}>
            <Save size={20} />
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 640px) {
          form > div:first-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
