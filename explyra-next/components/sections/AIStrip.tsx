"use client";

import { motion } from "framer-motion";
import { FaRobot, FaChartLine, FaMagic, FaShieldAlt } from "react-icons/fa";

export function AIStrip() {
  const features = [
    { icon: <FaRobot />, text: "Automated Workflows" },
    { icon: <FaChartLine />, text: "Predictive Analytics" },
    { icon: <FaMagic />, text: "Smart Data Entry" },
    { icon: <FaShieldAlt />, text: "Anomaly Detection" },
  ];

  return (
    <section className="relative px-[5vw] py-12 bg-gradient-to-br from-[var(--bg2)] to-[var(--bg)] border-b border-[var(--bdr)] text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-50%] left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_60%)] -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--purp-g)] text-[var(--purp)] border border-[var(--purp-b)] rounded-full text-[0.65rem] font-bold uppercase tracking-[0.1em] mb-3">
            ✨ Explyra AI
          </div>
          <h2 className="font-playfair text-3xl font-bold text-[var(--ink)] mb-8">
            Intelligence built into every module.
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 bg-[var(--bg)] border border-[var(--bdr)] rounded-[var(--r)] shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(167,139,250,0.1)] hover:border-[var(--purp-b)] text-[0.95rem] font-semibold text-[var(--ink2)]"
            >
              <div className="text-[1.2rem] text-[var(--purp)]">
                {feature.icon}
              </div>
              {feature.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
