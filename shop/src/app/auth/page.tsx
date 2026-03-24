"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, User, Chrome } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, googleSignIn } = useAuth();
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      router.push("/shop");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      router.push("/shop");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error with Google Sign In.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 relative overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1546C008] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#1546C008] rounded-full blur-[120px]" />

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(21,70,192,0.05)] rounded-3xl overflow-hidden relative z-10 transition-all duration-500">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center mb-4 text-white shadow-[0_4px_12px_rgba(21,70,192,0.3)]">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-brand-ink mb-2 lowercase tracking-tight">
              {isLogin ? "welcome back" : "create account"}
            </h1>
            <p className="text-slate-500 text-sm font-outfit">
              {isLogin ? "Sign in to continue your shopping" : "Join us for a premium shopping experience"}
            </p>
          </div>

          <div className="flex bg-[#F0F2F5] p-1 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLogin ? "bg-white text-brand-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                !isLogin ? "bg-white text-brand-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-6 border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-brand-bdr rounded-xl py-3 pl-10 pr-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-brand-bdr rounded-xl py-3 pl-10 pr-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-sm"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-brand-bdr rounded-xl py-3 pl-10 pr-4 outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0E3596] transition-all shadow-[0_4px_12px_rgba(21,70,192,0.2)] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs text-brand-ink-light font-medium">or continue with</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium text-slate-700 shadow-sm"
            >
              <Chrome className="text-[#EA4335]" size={20} />
              Google
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            By continuing, you agree to our <span className="text-brand-blue cursor-pointer">Terms of Service</span> and <span className="text-brand-blue cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
