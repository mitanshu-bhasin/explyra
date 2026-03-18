"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, User, UserPlus, Briefcase, Users } from "lucide-react";
import toast from "react-hot-toast";
import type { UserRole } from "@/lib/types";

export default function SignupPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<UserRole>("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await signUp(email, password, name, role);
      toast.success("Account created! Welcome to RetiredPro.");
      router.push(role === "expert" ? "/profile" : "/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle(role);
      toast.success("Welcome to RetiredPro!");
      router.push(role === "expert" ? "/profile" : "/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Google sign-in failed");
    }
  };

  if (step === "role") {
    return (
      <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "600px", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Join RetiredPro</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "2.5rem" }}>Choose how you&apos;d like to use the platform</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <button
              onClick={() => { setRole("expert"); setStep("form"); }}
              className="card card-body"
              style={{ cursor: "pointer", textAlign: "center", padding: "2.5rem 1.5rem", border: "2px solid transparent", transition: "all 0.2s" }}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(6,182,212,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <Briefcase size={30} color="var(--color-accent)" />
              </div>
              <h3 style={{ marginBottom: "0.5rem" }}>I&apos;m a Retired Professional</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>Share your expertise, mentor others, and earn consulting fees</p>
            </button>

            <button
              onClick={() => { setRole("client"); setStep("form"); }}
              className="card card-body"
              style={{ cursor: "pointer", textAlign: "center", padding: "2.5rem 1.5rem", border: "2px solid transparent", transition: "all 0.2s" }}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <Users size={30} color="var(--color-primary-light)" />
              </div>
              <h3 style={{ marginBottom: "0.5rem" }}>I Need an Expert</h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>Find mentors, consultants, and advisors for your needs</p>
            </button>
          </div>

          <p style={{ marginTop: "1.75rem", color: "var(--color-text-muted)" }}>
            Already have an account? <Link href="/login" style={{ fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
      <div className="card" style={{ width: "100%", maxWidth: "460px" }}>
        <div className="card-body" style={{ padding: "2.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className={role === "expert" ? "badge badge-cyan" : "badge badge-blue"} style={{ marginBottom: "0.75rem", display: "inline-block" }}>
              {role === "expert" ? "Expert Account" : "Client Account"}
            </span>
            <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Create Your Account</h1>
            <p style={{ color: "var(--color-text-muted)" }}>
              <button onClick={() => setStep("role")} style={{ background: "none", border: "none", color: "var(--color-primary-light)", cursor: "pointer", fontWeight: 600, padding: 0, fontSize: "inherit" }}>
                ← Change role
              </button>
            </p>
          </div>

          <button onClick={handleGoogle} className="btn btn-outline" style={{ width: "100%", marginBottom: "1.5rem", gap: "0.75rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-secondary)" }} />
                <input type="text" className="form-input" style={{ paddingLeft: "2.75rem" }} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-secondary)" }} />
                <input type="email" className="form-input" style={{ paddingLeft: "2.75rem" }} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-secondary)" }} />
                <input type={showPw ? "text" : "password"} className="form-input" style={{ paddingLeft: "2.75rem", paddingRight: "2.75rem" }} placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)", padding: 0 }} aria-label="Toggle password visibility">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} disabled={loading}>
              <UserPlus size={18} />
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--color-text-muted)" }}>
            Already have an account? <Link href="/login" style={{ fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
