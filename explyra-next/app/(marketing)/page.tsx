"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, Star, Sparkles, Workflow, ShieldCheck, Zap, X } from "lucide-react";
import { useState } from "react";

const HERO_STATS = [
  { value: "4.9/5", label: "Enterprise Rating", icon: Star },
  { value: "99.9%", label: "Platform Uptime", icon: ShieldCheck },
  { value: "10+", label: "Integrated Tools", icon: Workflow },
];

export default function MarketingHome() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-[5vw] min-h-[90vh]" style={{ background: "var(--bg)" }}>
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square rounded-full blur-[120px] opacity-[0.15] pointer-events-none" style={{ background: "radial-gradient(circle, var(--blue), var(--teal), var(--amber))" }} />
        
        <div className="relative z-10 mkt-container max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "var(--bg3)", border: "1px solid var(--bdr)" }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "var(--amber)" }} />
            <span className="text-[.75rem] font-bold tracking-widest uppercase" style={{ color: "var(--ink2)" }}>Explyra Core 2.0 is Live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hero-h"
          >
            The unified SaaS ecosystem for <em>modern enterprises.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="section-sub mx-auto mb-10 text-[1.1rem] md:text-[1.25rem]"
          >
            One platform. Ten products. Unlimited potential. Experience the ultimate productivity suite with integrated expense management, CRM, AI learning, and developer utilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login" className="btn-primary w-full sm:w-auto justify-center md:text-[1rem] px-8 py-3.5">
              Start Building Free <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="btn-secondary w-full sm:w-auto justify-center md:text-[1rem] px-8 py-3.5"
            >
              <Play className="w-4 h-4" /> Watch Demo
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 border-t"
            style={{ borderColor: "var(--bdr)" }}
          >
            {HERO_STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--bg3)", color: "var(--ink3)" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold font-playfair leading-none" style={{ color: "var(--ink)" }}>{value}</p>
                  <p className="text-[.65rem] font-bold uppercase tracking-widest mt-1" style={{ color: "var(--ink4)" }}>{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section className="mkt-section relative" style={{ background: "var(--bg2)", borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)" }}>
        <div className="mkt-container text-center">
          <div className="mb-12">
            <h2 className="section-h mb-4">See the platform in action</h2>
            <p className="section-sub mx-auto">Explore how Explyra can transform your entire workflow from a single unified dashboard.</p>
          </div>
          
          <div 
            className="relative mx-auto w-full max-w-[900px] aspect-video rounded-2xl md:rounded-[32px] overflow-hidden cursor-pointer group shadow-2xl"
            style={{ border: "4px solid var(--bg3)" }}
            onClick={() => setIsVideoOpen(true)}
          >
            <div className="relative w-full h-full">
              <Image 
                src="https://img.youtube.com/vi/7Ti-C171jyw/maxresdefault.jpg" 
                alt="Platform Demo" 
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
              />
            </div>
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/10">
              <div className="w-20 h-20 rounded-full bg-white/90 shadow-[0_0_30px_rgba(21,70,192,0.3)] flex items-center justify-center text-[#1546C0] group-hover:scale-110 group-hover:bg-[#1546C0] group-hover:text-white transition-all duration-300 pl-1.5">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="mkt-section" style={{ background: "var(--bg)" }}>
        <div className="mkt-container">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <span className="section-eyebrow"><Zap className="w-4 h-4" /> The Unified Advantage</span>
            <h2 className="section-h my-4">Everything your enterprise needs. Nothing it doesn&apos;t.</h2>
            <p className="section-sub mx-auto">Stop paying for dozens of disjointed tools. Explyra brings your expenses, sales pipelines, learning paths, and developer utilities into context.</p>
          </div>

          <div className="feature-grid cursor-default">
            {[
              { title: "Intelligent Expense Management", desc: "AI categorized tracking with multi-level approval workflows and immediate receipt reading.", tag: "Finance", color: "var(--teal)" },
              { title: "Enterprise-grade CRM", desc: "Drag-and-drop kanban boards, revenue forecasting, and automated lead scoring algorithms.", tag: "Sales", color: "var(--blue)" },
              { title: "Adaptive AI Learning", desc: "Expert-led courses that adapt to your pace using real-time AI knowledge checks.", tag: "Education", color: "var(--purp)" },
              { title: "Developer Toolchain", desc: "A suite of free formatting, encoding, and testing utilities built right into the platform.", tag: "Engineering", color: "var(--amber)" },
              { title: "Health & Wellness", desc: "Weather-aware workout generators and dietary tips to keep your team energized.", tag: "HR", color: "var(--rose)" },
              { title: "Centralized Analytics", desc: "Cross-platform analytics that show you the true ROI of your enterprise technology stack.", tag: "Business", color: "var(--ink2)" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-8 group flex flex-col items-start"
              >
                <div className="tag mb-6" style={{ background: `color-mix(in srgb, ${f.color} 10%, transparent)`, color: f.color, borderColor: `color-mix(in srgb, ${f.color} 25%, transparent)` }}>
                  {f.tag}
                </div>
                <h3 className="text-xl font-bold mb-3 font-playfair" style={{ color: "var(--ink)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--ink3)" }}>{f.desc}</p>
                <div className="mt-auto w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:translate-x-2" style={{ background: "var(--bg3)", color: "var(--ink2)" }}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="mkt-section relative overflow-hidden" style={{ background: "var(--ink2)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 2px, transparent 2px)", backgroundSize: "40px 40px" }} />
        <div className="mkt-container text-center relative z-10">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-6">Ready to unify your workflow?</h2>
          <p className="text-white/70 max-w-[600px] mx-auto mb-10 md:text-lg">Join forward-thinking teams using Explyra to eliminate tool-sprawl and boost organizational velocity.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="px-8 py-3.5 rounded-lg font-bold text-[#1546C0] bg-white transition-transform hover:scale-105">
              Create Free Account
            </Link>
            <Link href="/contact" className="px-8 py-3.5 rounded-lg font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-3000 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          style={{ background: "rgba(8,11,20,.85)", backdropFilter: "blur(10px)" }}
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-[1100px] aspect-video bg-black rounded-2xl md:rounded-[24px] overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-400"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors border border-white/20 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe 
              src="https://www.youtube.com/embed/7Ti-C171jyw?autoplay=1" 
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
