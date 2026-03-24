"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-[5vw] min-h-screen relative" style={{ background: "var(--bg)" }}>
      <div className="mkt-container">
        
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="section-eyebrow"><MessageSquare className="w-4 h-4" /> Get in touch</span>
          <h1 className="hero-h my-4 text-4xl md:text-5xl">We&apos;re here to help.</h1>
          <p className="section-sub mx-auto">
            Whether you have a question about pricing, need a custom demonstration, or need technical support, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-[1000px] mx-auto">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-playfair mb-6">Direct Connect</h3>
              <div className="space-y-6">
                <a href="mailto:explyra@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">Email Us</p>
                    <p className="text-sm text-slate-500">explyra@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">Office Location</p>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">
                      New Delhi, IN<br/>
                      Explyra Headquarters
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1">Phone</p>
                    <p className="text-sm text-slate-500">+91-8076108584</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-slate-900 text-white shadow-xl mt-8">
              <h4 className="font-bold mb-2">Technical Support</h4>
              <p className="text-sm text-slate-400 mb-4">Current customers can access expedited 24/7 technical support via the Admin Console.</p>
              <a href="/login" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                Go to Support Portal &rarr;
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-[24px] shadow-2xl"
          >
            <h3 className="text-2xl font-bold font-playfair mb-6">Send a message</h3>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="Jane" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Work Email</label>
                <input type="email" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="jane@company.com" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                <textarea rows={5} className="w-full resize-none bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-shadow" placeholder="How can we help your team?" />
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_4px_14px_rgba(79,70,229,0.3)]">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
