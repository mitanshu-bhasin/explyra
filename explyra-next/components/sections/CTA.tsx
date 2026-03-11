"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export function CTA() {
  return (
    <section className="px-[5vw] py-28 bg-[var(--bg2)] text-center relative overflow-hidden" id="contact">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(21,70,192,0.05)_0%,transparent_60%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[800px] mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-[0.7rem] font-bold tracking-[0.3em] uppercase text-[var(--blue)] mb-4">
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
            Get Started
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
          </div>
          
          <h2 className="font-playfair text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-6">
            Ready to experience the full <br/><em>Explyra ERP Suite?</em>
          </h2>
          
          <p className="text-[1.1rem] text-[var(--ink3)] max-w-[600px] mx-auto leading-[1.8] font-light mb-10">
            Join the waitlist for early access to all nine Explyra products. Be the first to shape what we build next.
          </p>
          
          <Link
            href="/company"
            className="inline-flex items-center gap-2 bg-[var(--blue)] text-white px-[2.5rem] py-[1.1rem] rounded-[var(--r)] text-[1rem] font-semibold transition-all hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_12px_36px_color-mix(in_srgb,var(--blue)_35%,transparent)] mb-16"
          >
            Request Early Access <HiArrowRight />
          </Link>

          {/* Contact Methods */}
          <div className="flex justify-center flex-wrap gap-4 mt-8">
            <a href="tel:+918076108584" className="flex items-center gap-4 bg-[var(--bg)] px-6 py-4 rounded-[var(--r)] border border-[var(--bdr)] transition-all hover:shadow-[var(--s3)] hover:-translate-y-1 hover:border-[var(--blue)]">
              <span className="text-[1.8rem]">📞</span>
              <div className="text-left">
                <div className="text-[0.68rem] text-[var(--ink4)] font-bold uppercase tracking-[0.05em] mb-1">Phone</div>
                <div className="font-semibold text-[var(--ink)] text-[0.95rem]">+91 8076108584</div>
              </div>
            </a>
            <a href="mailto:explyra@gmail.com" className="flex items-center gap-4 bg-[var(--bg)] px-6 py-4 rounded-[var(--r)] border border-[var(--bdr)] transition-all hover:shadow-[var(--s3)] hover:-translate-y-1 hover:border-[var(--blue)]">
              <span className="text-[1.8rem]">✉️</span>
              <div className="text-left">
                <div className="text-[0.68rem] text-[var(--ink4)] font-bold uppercase tracking-[0.05em] mb-1">Email</div>
                <div className="font-semibold text-[var(--ink)] text-[0.95rem]">explyra@gmail.com</div>
              </div>
            </a>
            <a href="https://github.com/mitanshu-bhasin" target="_blank" className="flex items-center gap-4 bg-[var(--bg)] px-6 py-4 rounded-[var(--r)] border border-[var(--bdr)] transition-all hover:shadow-[var(--s3)] hover:-translate-y-1 hover:border-[var(--blue)]">
              <span className="text-[1.8rem]">🐙</span>
              <div className="text-left">
                <div className="text-[0.68rem] text-[var(--ink4)] font-bold uppercase tracking-[0.05em] mb-1">GitHub</div>
                <div className="font-semibold text-[var(--ink)] text-[0.95rem]">@mitanshu-bhasin</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
