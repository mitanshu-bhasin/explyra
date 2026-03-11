"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Explyra Expense completely transformed how we handle corporate spending. It saved us countless hours of manual work.",
    authorRef: "S",
    authorName: "Sarah Jenkins",
    authorRole: "Finance Director, TechLogix",
    colorClass: "bg-[var(--blue-g)] text-[var(--blue)]",
  },
  {
    quote: "The Health companion gives insanely accurate recommendations based on live weather data. Nothing else compares.",
    authorRef: "M",
    authorName: "Marcus Reed",
    authorRole: "Pro Athlete",
    colorClass: "bg-[var(--teal-g)] text-[var(--teal)]",
  },
  {
    quote: "As a developer, having the Explyra Dev Tools all in one place without ads is a lifesaver. Extremely fast and well-designed.",
    authorRef: "E",
    authorName: "Elena Rostova",
    authorRole: "Senior Engineer",
    colorClass: "bg-[var(--purp-g)] text-[var(--purp)]",
  },
];

export function Testimonials() {
  return (
    <section className="px-[5vw] py-24 bg-[var(--bg)] text-center">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-[0.7rem] font-bold tracking-[0.3em] uppercase text-[var(--rose)] mb-3">
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
            Customer Stories
            <div className="w-[20px] h-[2px] bg-current rounded-full" />
          </div>
          <h2 className="font-playfair text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-12">
            Don't just take our word for it.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-12">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--bg2)] dark:bg-[var(--bg3)] p-10 rounded-[var(--r)] border border-[var(--bdr)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="text-[#F59E0B] text-[1.2rem] tracking-[2px] mb-4">
                ★★★★★
              </div>
              <p className="text-[1.05rem] text-[var(--ink2)] leading-[1.6] mb-6 italic font-light">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[1.1rem] ${test.colorClass}`}>
                  {test.authorRef}
                </div>
                <div>
                  <div className="font-semibold text-[var(--ink)] text-[0.95rem]">
                    {test.authorName}
                  </div>
                  <div className="text-[0.8rem] text-[var(--ink3)]">
                    {test.authorRole}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
