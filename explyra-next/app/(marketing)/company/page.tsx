"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, Heart, Target } from "lucide-react";
import Image from "next/image";

const VALUES = [
  { icon: Heart, title: "People First", desc: "Build tools that respect users' time and attention." },
  { icon: Target, title: "Radical Focus", desc: "Eliminate bloat. Keep only what directly impacts velocity." },
  { icon: Globe2, title: "Global Impact", desc: "Empower teams from local startups to global enterprises." },
];

export default function CompanyPage() {
  return (
    <div className="pt-32 pb-24 px-[5vw] min-h-screen relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 bg-[url('https://explyra.me/assets/images/grid.svg')] opacity-5" />

      <div className="mkt-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[800px] mx-auto mb-20"
        >
          <span className="section-eyebrow"><Building2 className="w-4 h-4" /> About Explyra</span>
          <h1 className="hero-h my-4 text-4xl md:text-5xl">Our mission is to untangle the modern enterprise.</h1>
          <p className="section-sub mx-auto text-lg">
            We started Explyra because we were tired of buying twenty different specialized tools and spending all our time integrating them. We built the unified ecosystem we always wanted.
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl mb-32 flex flex-col md:flex-row"
        >
          <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-playfair font-bold mb-6">Built by developers, for ambitious teams.</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Explyra was founded by Mitanshu Bhasin, a software architect obsessed with platform convergence. The vision was simple: instead of building one tool that does one thing well, build a unified data layer that allows multiple tools—Expense, CRM, Learning, Health—to communicate natively without complex integrations.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              {/* Note: In a real app, this would be a real image of the founder */}
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                MB
              </div>
              <div>
                <p className="font-bold">Mitanshu Bhasin</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Founder & CEO</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/5 min-h-[300px] bg-slate-100 dark:bg-slate-800 relative hidden md:block border-l border-slate-200 dark:border-slate-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
              <Image src="https://explyra.me/assets/images/explyra_logo.png" alt="Explyra Logo" width={120} height={120} unoptimized />
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="mb-20">
          <h2 className="text-center font-playfair text-3xl font-bold mb-12">What drives us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[24px] border border-slate-200/50 dark:border-slate-800/50 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-6">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-playfair mb-3">{val.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
