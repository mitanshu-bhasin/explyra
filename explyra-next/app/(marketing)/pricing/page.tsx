"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    desc: "For small teams taking their first steps.",
    monthly: 999,
    yearly: 9990,
    popular: false,
    color: "var(--teal)",
    features: ["Up to 10 Users", "Basic Expense Tracking", "10GB Storage", "Standard Support"],
    missing: ["Advanced CRM Insights", "Custom Integrations", "Dedicated Account Manager"],
  },
  {
    name: "Growth",
    desc: "For scaling businesses that need more power.",
    monthly: 2499,
    yearly: 24990,
    popular: true,
    color: "var(--blue)",
    features: ["Up to 50 Users", "Advanced Expense & CRM", "100GB Storage", "Priority 24/7 Support", "AI Learning Paths"],
    missing: ["Custom Integrations", "Dedicated Account Manager"],
  },
  {
    name: "Enterprise",
    desc: "Limitless potential for large organizations.",
    monthly: 7999,
    yearly: 79990,
    popular: false,
    color: "var(--amber)",
    features: ["Unlimited Users", "Full Ecosystem Access", "Unlimited Storage", "Dedicated Account Manager", "Custom Integrations", "White-glove Onboarding"],
    missing: [],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pt-32 pb-24 px-[5vw] min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mkt-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow"><Zap className="w-4 h-4" /> Transparent Pricing</span>
          <h1 className="hero-h my-4 text-4xl md:text-5xl md:leading-tight max-w-[800px] mx-auto">
            Plans built to scale with your ambition.
          </h1>
          <p className="section-sub mx-auto mb-12">
            Choose the perfect plan for your team. Switch plans or cancel anytime. Get 2 months free with annual billing.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 mb-16 relative"
        >
          {/* Animated background pill */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-700 rounded-full shadow-sm"
            animate={{ left: annual ? "calc(50% + 3px)" : "3px" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          
          <button
            onClick={() => setAnnual(false)}
            className={`relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-colors ${!annual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`relative z-10 px-6 py-2 text-sm font-bold rounded-full transition-colors flex items-center gap-2 ${annual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}
          >
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-[10px] uppercase tracking-widest leading-none">
              Save 20%
            </span>
          </button>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto text-left">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`relative bg-white dark:bg-slate-900 rounded-[24px] p-8 border ${plan.popular ? "border-indigo-500 shadow-2xl scale-105 z-10" : "border-slate-200 dark:border-slate-800 shadow-xl"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2 font-playfair">{plan.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 min-h-[40px]">{plan.desc}</p>
              
              <div className="my-8">
                <span className="text-4xl font-black">₹{annual ? plan.yearly.toLocaleString() : plan.monthly.toLocaleString()}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">/{annual ? "year" : "month"}</span>
              </div>

              <Link 
                href="/login" 
                className={`w-full py-3.5 rounded-xl font-bold flex justify-center transition-colors mb-8 ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"}`}
              >
                Get Started
              </Link>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">What&apos;s included</p>
                <ul className="space-y-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm font-medium">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm font-medium text-slate-400 dark:text-slate-600 line-through">
                      <X className="w-5 h-5 text-slate-300 dark:text-slate-700 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 max-w-[800px] mx-auto bg-slate-900 text-white rounded-[24px] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-3 justify-center md:justify-start">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Enterprise Security</span>
            </div>
            <h4 className="text-2xl font-bold mb-2">Need a custom deployment?</h4>
            <p className="text-slate-400 text-sm max-w-[400px]">Talk to our sales team about on-premise hosting, dedicated VPCs, and volume discounts.</p>
          </div>
          <Link href="/contact" className="px-6 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-colors shrink-0">
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
