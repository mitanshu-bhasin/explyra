import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Key, Globe, Users, Clock, Lock, ChevronRight, Check, Fingerprint, HeartPulse, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const steps = [
  { icon: Lock, title: "Deposit", desc: "Securely store your crypto keys, domain credentials, passwords & legal docs in encrypted capsules." },
  { icon: HeartPulse, title: "Heartbeat", desc: "Periodically confirm you're active. A simple 'I'm alive' click resets the inactivity timer." },
  { icon: Send, title: "Release", desc: "If you go inactive, your encrypted capsules are securely released to your designated nominees." },
];

const features = [
  { icon: Key, title: "Crypto Vaults", desc: "Store private keys, seed phrases, and wallet credentials with military-grade encryption." },
  { icon: Globe, title: "Domain Manager", desc: "Track domain registrars, DNS credentials, and renewal details in one secure place." },
  { icon: Shield, title: "Password Locker", desc: "Keep all your critical passwords organized and encrypted, never lose access again." },
  { icon: Users, title: "Nominee System", desc: "Assign trusted people to receive specific capsules — full control over who gets what." },
  { icon: Clock, title: "Dead-Man Switch", desc: "Configurable inactivity periods: 30, 60, or 90 days. You decide when the vault opens." },
  { icon: Fingerprint, title: "Zero-Knowledge", desc: "We can't see your data. End-to-end encryption means only you and your nominees can." },
];

const plans = [
  { name: "Free", price: "₹0", period: "/forever", features: ["5 capsules", "1 nominee", "90-day heartbeat", "Basic encryption"], cta: "Get Started" },
  { name: "Pro", price: "₹499", period: "/month", features: ["Unlimited capsules", "5 nominees", "Custom heartbeat", "Priority support", "Advanced encryption", "Security logs"], cta: "Start Pro", popular: true },
  { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited everything", "Team management", "API access", "Dedicated support", "Compliance reports", "Custom SLA"], cta: "Contact Us" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold">Explyra Will</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button size="sm">Get Started <ChevronRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container relative text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" /> Digital Sarcophagus
            </span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
            Your Digital Legacy,{" "}
            <span className="text-primary">Secured.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Store your crypto keys, domains, passwords & digital assets in an ultra-secure vault. 
            If you go inactive, Explyra Will automatically releases them to your nominees.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?tab=signup">
              <Button size="lg" className="text-base px-8">
                Secure Your Legacy <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base px-8">
                See How It Works
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">How It Works</h2>
            <p className="mt-4 text-muted-foreground text-lg">Three simple steps to protect your digital legacy</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="glass-card rounded-2xl p-8 text-center relative group hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <step.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Built for the Digital Generation</h2>
            <p className="mt-4 text-muted-foreground text-lg">Everything you need to secure your digital assets</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className="glass-card rounded-xl p-6 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Fingerprint className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Your Secrets Stay Yours</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Explyra Will uses end-to-end encryption with a zero-knowledge architecture. 
              We never see your data — only you and your nominees can decrypt it. 
              Your digital legacy is sealed until you decide otherwise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-muted-foreground text-lg">Start free. Upgrade when you need more.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                className={`glass-card rounded-2xl p-8 relative ${plan.popular ? "ring-2 ring-primary shadow-xl" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth?tab=signup">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>{plan.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">Explyra Will</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Explyra. Your digital legacy, secured.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
