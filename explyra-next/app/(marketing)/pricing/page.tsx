"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheck, HiX } from "react-icons/hi";

// --- Data ---
const pricingPlans = [
  {
    key: "Starter",
    name: "Starter",
    emp: "0-50 employees",
    desc: "Best for startups and small teams beginning their journey.",
    priceMonthly: 999,
    priceYearly: 799,
    features: [
      "Expense management",
      "Dev tools access",
      "Basic AI assistant",
      "Health tracker (basic)",
      "1000 AI requests / month",
      "10 GB storage",
      "Knowledge base access",
      "Community forums",
      "24/7 chat support",
      "Custom @explyra.me Emails",
      "Custom Domain Linking",
    ],
    popular: false,
    btnClass: "bg-[var(--bg3)] text-[var(--ink)] border border-[var(--bdr)] hover:border-[var(--blue)] hover:text-[var(--blue)] hover:bg-[var(--blue-g)] dark:bg-[var(--bg4)] dark:border-[var(--bdr2)]",
    btnText: "Buy Plan"
  },
  {
    key: "Growth",
    name: "Growth",
    emp: "50-100 employees",
    desc: "Ideal for fast-growing companies demanding scale and agility.",
    priceMonthly: 2499,
    priceYearly: 1999,
    features: [
      "Everything in Starter",
      "Learning platform access",
      "AI automation tools",
      "Advanced health insights",
      "5000 AI requests / month",
      "50 GB storage",
      "24/7 chat & phone support",
      "Configuration assistance",
      "Knowledge base access",
      "Community forums",
      "Custom @explyra.me Emails",
      "Custom Domain Linking",
    ],
    popular: true,
    btnClass: "bg-[var(--blue)] text-white hover:brightness-110 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--blue)_35%,transparent)]",
    btnText: "Buy Plan"
  },
  {
    key: "Scale",
    name: "Scale",
    emp: "100-500 employees",
    desc: "Powerful workflows and analytics for established businesses.",
    priceMonthly: 6999,
    priceYearly: 5599,
    features: [
      "Full Explyra suite",
      "Automation workflows",
      "Advanced analytics dashboard",
      "Priority support",
      "20k AI requests / month",
      "200 GB storage",
      "24/7 chat & phone support",
      "Configuration assistance",
      "Knowledge base access",
      "Community forums",
      "Custom @explyra.me Emails",
      "Custom Domain Linking",
    ],
    popular: false,
    btnClass: "bg-[var(--bg3)] text-[var(--ink)] border border-[var(--bdr)] hover:border-[var(--blue)] hover:text-[var(--blue)] hover:bg-[var(--blue-g)] dark:bg-[var(--bg4)] dark:border-[var(--bdr2)]",
    btnText: "Buy Plan"
  },
  {
    key: "Enterprise",
    name: "Enterprise",
    emp: "500+ employees",
    desc: "Uncapped capabilities and bespoke integrations.",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    features: [
      "Unlimited employees",
      "Dedicated support",
      "Custom integrations",
      "SLA uptime guarantee",
      "Advanced AI automation",
      "Custom storage plans",
      "24/7 chat & phone support",
      "Configuration assistance",
      "Knowledge base access",
      "Community forums",
      "Custom @explyra.me Emails",
      "Custom Domain Linking",
    ],
    popular: false,
    btnClass: "bg-[var(--bg3)] text-[var(--ink)] border border-[var(--bdr)] hover:border-[var(--blue)] hover:text-[var(--blue)] hover:bg-[var(--blue-g)] dark:bg-[var(--bg4)] dark:border-[var(--bdr2)]",
    btnText: "Contact Sales"
  }
];

const featuresList = [
  { name: "Employees Limit", starter: "50", growth: "100", scale: "500", enterprise: "Unlimited" },
  { name: "Expense Manager", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Dev Tools", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "AI Assistant", starter: "Limited", growth: "Advanced", scale: "Full", enterprise: "Custom" },
  { name: "Health Manager", starter: "Basic", growth: "Advanced", scale: "Advanced", enterprise: "Advanced" },
  { name: "Learning Platform", starter: "❌", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Storage", starter: "10 GB", growth: "50 GB", scale: "200 GB", enterprise: "Custom" },
  { name: "24/7 Chat Support", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "24/7 Phone Support", starter: "❌", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Configuration Assistance", starter: "❌", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Knowledge Base", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Community Forums", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Custom @explyra.me Emails", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
  { name: "Custom Domain Linking", starter: "✔", growth: "✔", scale: "✔", enterprise: "✔" },
];

const faqs = [
  { q: "Do you offer a free trial?", a: "Yes, all plans include a full-featured 14-day free trial. No credit card is required to sign up." },
  { q: "Can I change plans later?", a: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from the admin dashboard. Prorated charges or refunds are handled automatically." },
  { q: "Is my company data secure?", a: "Yes, Explyra uses secure, hardened cloud infrastructure backed by Google Firebase. All P2P interactions are encrypted end-to-end, and regular backups ensure zero data loss." },
  { q: "What forms of payment do you accept?", a: "We accept all major credit cards, UPI (for Indian residents), and wire transfers for Enterprise scale accounts." },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="px-[5vw] pt-24 pb-16 text-center relative overflow-hidden bg-[var(--bg)]">
        <h1 className="font-playfair text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--ink)] mb-5">
          Simple pricing for<br/><em className="italic text-[var(--blue)]">growing companies</em>
        </h1>
        <p className="text-[1.1rem] text-[var(--ink3)] max-w-[600px] mx-auto mb-4 font-light leading-[1.6]">
          One platform for expenses, productivity, AI tools, and team wellness.
        </p>
        <div className="inline-flex items-center gap-2 bg-[var(--surf)] border border-[var(--bdr)] text-[var(--ink2)] text-[0.75rem] font-semibold px-4 py-1.5 rounded-full mb-10 shadow-[var(--s1)] dark:bg-[var(--bg3)] dark:border-[var(--bdr2)]">
          🎁 14-day free trial • <strong className="text-[var(--teal)]">No credit card required</strong>
        </div>

        {/* Toggle */}
        <div className="inline-flex items-center bg-[var(--bg3)] dark:bg-[var(--bg4)] border border-[var(--bdr)] p-1.5 rounded-full relative mx-auto mb-16 shadow-[inset_0_1px_3px_rgba(0,0,0,0.03)]">
          <div 
            className="absolute top-[0.3rem] bottom-[0.3rem] w-[calc(50%-0.3rem)] bg-[var(--surf)] dark:bg-[var(--bg2)] rounded-full shadow-[var(--s1)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[1]"
            style={{ transform: isYearly ? 'translateX(100%)' : 'translateX(0)', left: '0.3rem' }}
          />
          <button 
            className={`px-5 py-2.5 text-[0.85rem] font-semibold rounded-full relative z-[2] transition-colors ${!isYearly ? 'text-[var(--ink)]' : 'text-[var(--ink3)]'}`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button 
            className={`px-5 py-2.5 text-[0.85rem] font-semibold rounded-full relative z-[2] transition-colors flex items-center gap-1.5 ${isYearly ? 'text-[var(--ink)]' : 'text-[var(--ink3)]'}`}
            onClick={() => setIsYearly(true)}
          >
            Yearly 
            <span className="text-[0.65rem] bg-[var(--teal-g)] text-[var(--teal)] px-2 py-0.5 rounded-full font-bold border border-[var(--teal-b)]">
              Save 20%
            </span>
          </button>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1250px] mx-auto text-left">
          {pricingPlans.map((plan) => (
            <motion.div 
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={`bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] dark:border-[var(--bdr2)] rounded-2xl p-8 flex flex-col relative transition-all duration-300 ${plan.popular ? 'border-2 border-[var(--blue)] shadow-[0_0_0_4px_var(--blue-g)] lg:scale-105 z-10 hover:-translate-y-1' : 'hover:-translate-y-1 hover:shadow-[var(--s3)] hover:border-[var(--blue-b)]'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--blue)] text-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full shadow-[var(--s2)]">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <div className="font-playfair text-[1.3rem] font-bold text-[var(--ink)] mb-1">{plan.name}</div>
                <div className="text-[0.8rem] text-[var(--ink3)] leading-[1.5] min-h-[2.4rem]">{plan.desc}</div>
                <div className="text-[0.7rem] font-semibold text-[var(--blue)] bg-[var(--blue-g)] inline-block px-2 py-1 rounded mt-2.5">
                  {plan.emp}
                </div>
              </div>

              <div className="my-6 min-h-[3rem]">
                {typeof plan.priceMonthly === 'number' ? (
                  <>
                    <span className="text-[1rem] font-semibold text-[var(--ink)] align-top mt-1 inline-block">₹</span>
                    <span className="font-playfair text-[3rem] font-bold text-[var(--ink)] leading-[1] mx-1">
                      {(isYearly ? plan.priceYearly : plan.priceMonthly).toLocaleString()}
                    </span>
                    <span className="text-[0.8rem] text-[var(--ink4)] font-medium">/ month</span>
                  </>
                ) : (
                  <span className="text-[2.2rem] font-playfair font-bold text-[var(--ink)] block pt-2">Custom</span>
                )}
              </div>

              <ul className="flex-1 mb-8 space-y-3">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-[0.85rem] text-[var(--ink2)] leading-[1.4]">
                    <span className="text-[var(--teal)] font-bold text-[0.9rem] flex-shrink-0">✓</span>
                    <span dangerouslySetInnerHTML={{ __html: feat.includes('Everything in Starter') ? `<strong>${feat}</strong>` : feat }} />
                  </li>
                ))}
              </ul>

              <button className={`w-full text-center py-3 rounded-[var(--r)] text-[0.9rem] font-semibold transition-all ${plan.btnClass}`}>
                {plan.btnText}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="px-[5vw] py-24 bg-[var(--bg)]">
        <div className="max-w-[1100px] mx-auto">
          <h3 className="text-center font-playfair text-[2rem] font-bold text-[var(--ink)] mb-12">Compare Plans Feature Highlights</h3>
          <div className="bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] dark:border-[var(--bdr2)] rounded-[14px] overflow-x-auto shadow-[var(--s2)]">
            <table className="w-full border-collapse min-w-[800px] text-left">
              <thead>
                <tr>
                  <th className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] bg-[var(--bg3)] dark:bg-[var(--bg4)] text-[0.85rem] font-semibold text-[var(--ink)] uppercase tracking-[0.05em] w-[28%]">Feature</th>
                  <th className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] bg-[var(--bg3)] dark:bg-[var(--bg4)] text-[0.85rem] font-semibold text-[var(--ink)] uppercase tracking-[0.05em] text-center">Starter</th>
                  <th className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] bg-[var(--bg3)] dark:bg-[var(--bg4)] text-[0.85rem] font-semibold text-[var(--ink)] uppercase tracking-[0.05em] text-center">Growth</th>
                  <th className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] bg-[var(--bg3)] dark:bg-[var(--bg4)] text-[0.85rem] font-semibold text-[var(--ink)] uppercase tracking-[0.05em] text-center">Scale</th>
                  <th className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] bg-[var(--bg3)] dark:bg-[var(--bg4)] text-[0.85rem] font-semibold text-[var(--ink)] uppercase tracking-[0.05em] text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((row, i) => (
                  <tr key={i} className="hover:bg-[var(--bg)] dark:hover:bg-[var(--bg4)] transition-colors">
                    <td className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] text-[0.9rem] text-[var(--ink2)] font-semibold">{row.name}</td>
                    {(['starter', 'growth', 'scale', 'enterprise'] as const).map((key) => (
                      <td key={key} className="p-5 border-b border-[var(--bdr)] dark:border-[var(--bdr2)] text-[0.9rem] text-[var(--ink2)] font-medium text-center">
                        {row[key] === '✔' ? <span className="text-[var(--teal)] text-[1.1rem]">✔</span> : row[key] === '❌' ? <span className="text-[var(--ink4)] text-[1rem]">❌</span> : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-[5vw] py-16 bg-[var(--bg2)] dark:bg-[#0E1220] border-y border-[var(--bdr)] dark:border-[var(--bdr2)] text-center">
        <h4 className="text-[0.8rem] uppercase tracking-[0.15em] text-[var(--ink4)] font-semibold mb-8">Trusted by forward-thinking startups</h4>
        <div className="flex justify-center items-center gap-12 flex-wrap opacity-60 dark:opacity-80 grayscale">
            <div className="font-playfair text-[1.5rem] font-bold text-[var(--ink)]">TechNova</div>
            <div className="font-sans font-black tracking-[-1px] text-[1.5rem] text-[var(--ink)]">AcmeCorp</div>
            <div className="font-normal uppercase tracking-[2px] text-[1.5rem] text-[var(--ink)]">GlobeGrid</div>
            <div className="font-sans text-[1.5rem] text-[var(--ink)]">Nexus Labs</div>
            <div className="italic text-[1.5rem] text-[var(--ink)]">CloudSync</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-[5vw] py-24 bg-[var(--bg)]">
        <div className="max-w-[800px] mx-auto">
          <h3 className="text-center font-playfair text-[2rem] font-bold text-[var(--ink)] mb-12">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[var(--surf)] dark:bg-[var(--bg3)] border border-[var(--bdr)] dark:border-[var(--bdr2)] rounded-xl overflow-hidden transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <span className="font-semibold text-[1rem] text-[var(--ink)]">{question}</span>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           className="w-5 h-5 flex items-center justify-center text-[var(--ink)]"
        >
          {isOpen ? <HiX size={20} /> : <div className="font-bold relative flex items-center justify-center w-full h-full text-xl">+</div>}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-[0.9rem] text-[var(--ink3)] leading-[1.7]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
