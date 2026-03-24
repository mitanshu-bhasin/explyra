"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Calendar, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Globe,
  Star,
  Clock,
  Lock
} from "lucide-react";
import Booking3D from "@/components/Booking3D";

export default function LoginPage() {
  const { user, signIn, signUp, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('tab') !== 'register');
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/dashboard.html");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        if (username.length < 3) throw new Error("Username must be at least 3 characters");
        await signUp(email, password, displayName, username);
      }
      // Redirect handled by useEffect
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080B14] text-white flex flex-col lg:flex-row overflow-hidden relative">
      {/* 3D Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Booking3D isDark={true} />
      </div>

      {/* Left Side: App Discovery & Features */}
      <section className="hidden lg:flex flex-col justify-between w-1/2 p-16 z-10 relative overflow-hidden bg-linear-to-br from-blue-600/10 to-transparent backdrop-blur-[2px]">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center gap-3 mb-16 group transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight block leading-tight font-serif uppercase">Explyra Booking</span>
              <span className="text-[10px] font-bold opacity-60 tracking-[0.3em] uppercase">Unified Suite Engine</span>
            </div>
          </Link>

          <h2 className="text-5xl font-serif font-bold leading-[1.2] mb-8 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            One Link. <br /> Infinite <span className="text-blue-500 italic underline decoration-blue-500/30">Possibilities</span>.
          </h2>

          <div className="space-y-8">
            <FeatureItem 
              icon={<Zap className="text-blue-400" size={20} />}
              title="Lightning Fast Setup"
              desc="Create your professional booking page in under 60 seconds."
            />
            <FeatureItem 
              icon={<ShieldCheck className="text-blue-400" size={20} />}
              title="Enterprise Reliability"
              desc="Bank-grade encryption for every meeting and client detail."
            />
            <FeatureItem 
              icon={<Globe className="text-blue-400" size={20} />}
              title="Global Availability"
              desc="Sync across time zones automatically with smart conflict resolution."
            />
          </div>
        </div>

        <div className="relative group cursor-default">
          <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-xl transition group-hover:bg-blue-600/20" />
          <div className="relative flex items-center gap-6 p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#080B14] bg-blue-900/50 flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(64 + i)}
                    </div>
                ))}
             </div>
             <div className="flex flex-col">
                <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-blue-500 text-blue-500" />)}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-60">Trusted by 500+ Architecture Teams</span>
             </div>
          </div>
        </div>
      </section>

      {/* Right Side: Auth Form */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 z-10 relative">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex flex-col items-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 mb-4">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold uppercase tracking-widest">Explyra Booking</h1>
          </div>

          <div className="bg-white/3 border border-white/5 backdrop-blur-3xl rounded-[40px] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Header Tabs */}
            <div className="flex p-1 bg-white/5 rounded-2xl mb-10 overflow-hidden">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${isLogin ? 'bg-blue-600 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl ${!isLogin ? 'bg-blue-600 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              >
                Register
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 tracking-tight">
                {isLogin ? 'Welcome back' : 'Join the elite'}
              </h2>
              <p className="text-sm opacity-50 font-medium">
                {isLogin ? 'Secure access to your booking dashboard.' : 'Start your journey with Explyra Suite.'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-3">
                <Lock size={14} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
                      placeholder="Mitanshu Bhasin"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Username (URL)</label>
                    <input 
                      type="text" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
                      placeholder="mitanshu-pro"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
                  placeholder="admin@explyra.me"
                />
              </div>

              <div className="space-y-2 text-right">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1 block text-left">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
                {isLogin && (
                  <button type="button" className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors mt-2">
                    Forgot Password?
                  </button>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 mt-4"
              >
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-3 opacity-60">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">No credit card required</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                    <Clock size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Free for individuals</span>
                </div>
            </div>
          </div>

          <p className="mt-12 text-center text-[10px] font-bold uppercase tracking-widest opacity-30 leading-loose">
            By continuing, you agree to Explyra&apos;s <br />
            <Link href="/terms.html" className="underline hover:text-white transition-colors">Terms of Service</Link> & <Link href="/privacy.html" className="underline hover:text-white transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-5 group">
      <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-600/30 transition-all shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-bold mb-1 tracking-tight text-white/90 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-sm opacity-50 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
