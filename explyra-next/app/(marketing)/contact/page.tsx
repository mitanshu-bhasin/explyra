"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(null);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage({ text: "✅ Message sent successfully!", type: "success" });
      (e.target as HTMLFormElement).reset();

      setTimeout(() => setToastMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      <section className="min-h-screen px-[5vw] pt-24 pb-16 relative overflow-hidden bg-[var(--bg)] flex items-center justify-center">
        {/* Background Mesh */}
        <div className="absolute inset-0 pointer-events-none z-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(21,70,192,0.07)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_80%_30%,rgba(52,211,153,0.06)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_60%_80%,rgba(167,139,250,0.06)_0%,transparent_60%)] dark:before:bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(91,138,245,0.15)_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_80%_30%,rgba(52,211,153,0.12)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_60%_80%,rgba(167,139,250,0.12)_0%,transparent_60%)]" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--bdr)_1px,transparent_1px),linear-gradient(90deg,var(--bdr)_1px,transparent_1px)] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_80%)] opacity-50 z-0" />

        <div className="relative z-10 max-w-[1150px] w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Info */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <img 
              src="/assets/contact_us_hero.png" 
              alt="Contact Explyra" 
              className="w-full max-w-[420px] md:max-w-full mx-auto rounded-[20px] shadow-[var(--s3)] [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.1))]" 
            />
            
            <div className="text-center md:text-left">
              <h2 className="font-playfair text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--ink)] mb-2">
                Let's build something <em className="italic">together.</em>
              </h2>
              <p className="text-[0.92rem] text-[var(--ink3)] leading-[1.7] font-light max-w-[400px] mx-auto md:mx-0">
                Whether you have a question, a partnership idea, or just want to say hi — we'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-4 mx-auto md:mx-0">
              <div className="flex items-center gap-3 text-[0.88rem] text-[var(--ink2)] font-normal">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[1.1rem] bg-[var(--blue-g)] border border-[var(--blue-b)] flex-shrink-0">
                  📧
                </div>
                <div>
                  <div className="font-semibold text-[0.82rem]">Email Us</div>
                  <div className="text-[0.78rem] text-[var(--ink3)]">explyra@gmail.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] rounded-[20px] p-8 md:p-10 shadow-[var(--s2)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--blue)] to-[var(--teal)] rounded-t-[20px]" />
            
            <h3 className="font-playfair text-[1.5rem] font-bold text-[var(--ink)] mb-1">Send us a message</h3>
            <p className="text-[0.85rem] text-[var(--ink3)] mb-8 font-light">Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[0.78rem] font-semibold text-[var(--ink2)] tracking-[0.04em] uppercase">Full Name *</label>
                  <input type="text" id="name" required placeholder="Mitanshu Bhasin" className="w-full px-4 py-3 text-[0.9rem] border-[1.5px] border-[var(--bdr2)] rounded-[var(--r)] bg-[var(--bg)] text-[var(--ink)] transition-all outline-none focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_var(--blue-g)]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[0.78rem] font-semibold text-[var(--ink2)] tracking-[0.04em] uppercase">Email *</label>
                  <input type="email" id="email" required placeholder="you@example.com" className="w-full px-4 py-3 text-[0.9rem] border-[1.5px] border-[var(--bdr2)] rounded-[var(--r)] bg-[var(--bg)] text-[var(--ink)] transition-all outline-none focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_var(--blue-g)]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[0.78rem] font-semibold text-[var(--ink2)] tracking-[0.04em] uppercase">Phone (optional)</label>
                  <input type="tel" id="phone" placeholder="+91 80761 08584" className="w-full px-4 py-3 text-[0.9rem] border-[1.5px] border-[var(--bdr2)] rounded-[var(--r)] bg-[var(--bg)] text-[var(--ink)] transition-all outline-none focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_var(--blue-g)]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-[0.78rem] font-semibold text-[var(--ink2)] tracking-[0.04em] uppercase">Subject *</label>
                  <select id="subject" required defaultValue="" className="w-full px-4 py-3 text-[0.9rem] border-[1.5px] border-[var(--bdr2)] rounded-[var(--r)] bg-[var(--bg)] text-[var(--ink)] transition-all outline-none focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_var(--blue-g)] appearance-none">
                    <option value="" disabled>Select a topic</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[0.78rem] font-semibold text-[var(--ink2)] tracking-[0.04em] uppercase">Message *</label>
                <textarea id="message" required placeholder="Tell us how we can help..." rows={4} className="w-full px-4 py-3 text-[0.9rem] border-[1.5px] border-[var(--bdr2)] rounded-[var(--r)] bg-[var(--bg)] text-[var(--ink)] transition-all outline-none resize-y min-h-[110px] focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_var(--blue-g)]" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-2 px-8 py-3.5 rounded-[var(--r)] bg-[var(--blue)] text-white text-[0.95rem] font-semibold flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_color-mix(in_srgb,var(--blue)_35%,transparent)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Toast */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: toastMessage ? 0 : 100, opacity: toastMessage ? 1 : 0 }}
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-[var(--s3)] text-[0.88rem] font-semibold z-[999] text-white ${toastMessage?.type === 'success' ? 'bg-[var(--teal)]' : 'bg-[#DC2626]'}`}
        >
          {toastMessage?.text}
        </motion.div>
      </section>
    </div>
  );
}
