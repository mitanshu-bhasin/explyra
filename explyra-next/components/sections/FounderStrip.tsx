"use client";

import { motion } from "framer-motion";

export function FounderStrip() {
  return (
    <article className="px-[5vw] py-20 bg-[var(--bg2)] border-t border-[var(--bdr)]">
      <div className="max-w-[700px] mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.5 }}
           className="w-[70px] h-[70px] rounded-full mx-auto mb-6 flex items-center justify-center font-playfair font-bold text-[1.4rem] bg-gradient-to-br from-[var(--blue)] to-[var(--purp)] text-white shadow-[var(--s3)]"
        >
          MB
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="font-playfair font-bold text-[1.2rem] text-[var(--ink)] mb-1">
            Mitanshu Bhasin
          </div>
          <div className="text-[0.8rem] font-semibold text-[var(--ink4)] uppercase tracking-[0.05em] mb-6">
            Founder & Lead Developer · Explyra
          </div>
          <p className="text-[1.05rem] text-[var(--ink2)] leading-[1.8] font-light mb-8 italic">
            "One developer. One vision. An entire digital suite built from scratch — Firebase backend, cross-platform mobile apps, AI integrations, developer tooling, and P2P infrastructure. Explyra is not just a product, it's a statement: the right combination of AI, design, and engineering can give teams everything they need in a single platform."
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
             <a href="https://github.com/mitanshu-bhasin" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-[var(--bdr)] rounded-[var(--r)] text-[0.85rem] font-semibold text-[var(--ink2)] hover:-translate-y-0.5 hover:border-[var(--slate)] hover:shadow-[var(--s2)] transition-all">
               🐙 GitHub
             </a>
             <a href="mailto:mfskufgu@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-[var(--bdr)] rounded-[var(--r)] text-[0.85rem] font-semibold text-[var(--ink2)] hover:-translate-y-0.5 hover:border-[var(--slate)] hover:shadow-[var(--s2)] transition-all">
               ✉️ Email
             </a>
             <a href="tel:+918076108584" className="flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-[var(--bdr)] rounded-[var(--r)] text-[0.85rem] font-semibold text-[var(--ink2)] hover:-translate-y-0.5 hover:border-[var(--slate)] hover:shadow-[var(--s2)] transition-all">
               📞 +91 8076108584
             </a>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
