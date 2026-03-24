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
  { icon: Lock, title: "Deposit", desc: "Securely store your crypto keys, domain credentials, passwords & legal docs in encrypted capsules.", image: "/assets/images/secure_vault_visual.png" },
  { icon: HeartPulse, title: "Heartbeat", desc: "Periodically confirm you're active. A simple 'I'm alive' click resets the inactivity timer.", image: "/assets/images/digital_legacy_bg.png" },
  { icon: Send, title: "Release", desc: "If you go inactive, your encrypted capsules are securely released to your designated nominees.", image: "/assets/images/nominee_handover_visual.png" },
];

const features = [
  { icon: Key, title: "Crypto Vaults", desc: "Store private keys, seed phrases, and wallet credentials with military-grade encryption.", image: "/assets/images/cryptocurrency_security_visual.png" },
  { icon: Globe, title: "Domain Manager", desc: "Track domain registrars, DNS credentials, and renewal details in one secure place.", image: "/assets/images/domain_manager_visual.png" },
  { icon: Shield, title: "Password Locker", desc: "Keep all your critical passwords organized and encrypted, never lose access again.", image: "/assets/images/password_locker_visual.png" },
  { icon: Users, title: "Nominee System", desc: "Assign trusted people to receive specific capsules — full control over who gets what.", image: "/assets/images/nominee_handover_visual.png" },
  { icon: Clock, title: "Dead-Man Switch", desc: "Configurable inactivity periods: 30, 60, or 90 days. You decide when the vault opens.", image: "/assets/images/dead_man_switch_visual.png" },
  { icon: Fingerprint, title: "Zero-Knowledge", desc: "We can't see your data. End-to-end encryption means only you and your nominees can.", image: "/assets/images/zero_knowledge_visual.png" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Shield className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <span className="font-display text-lg md:text-xl font-bold">Explyra Will</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-bold text-primary">Free</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <Link to="/auth" className="hidden sm:block">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth?tab=signup">
              <Button size="sm" className="text-xs md:text-sm px-3 md:px-4">
                <span className="hidden xs:inline">Get Started</span>
                <span className="xs:hidden">Join</span>
                <ChevronRight className="h-3.3 w-3.5 md:h-4 md:w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-44 md:pb-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="/assets/images/digital_legacy_bg.png" 
            className="w-full h-full object-cover opacity-[0.35] scale-110 blur-[2px]" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.15),transparent_60%)]" />
        </div>
        <div className="absolute top-0 right-0 -z-10 opacity-40 blur-[150px] w-full h-full transform translate-x-1/2 -translate-y-1/2 bg-blue-500/30 rounded-full" />
        <div className="container relative text-center max-w-4xl mx-auto px-4 z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-6">
              <Shield className="h-3.5 w-3.5 md:h-4 md:w-4" /> Digital Sarcophagus
            </span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1] md:leading-tight px-2">
            Your Digital Legacy,{" "}
            <span className="text-primary">Secured.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Store your crypto keys, domains, passwords & digital assets in an ultra-secure vault. 
            Automatically released to your nominees if you go inactive.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth?tab=signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 md:h-14">
                Secure Your Legacy <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12 md:h-14">
                See How It Works
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase - NEW */}
      <section className="py-10 relative overflow-hidden">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 group"
          >
            <img 
              src="/assets/images/digital_legacy_bg.png" 
              alt="Digital Legacy Dashboard Preview" 
              className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
              <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border/50">
                <span className="text-sm font-medium">Enterprise Grade Encryption</span>
              </div>
              <div className="bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl text-sm font-bold shadow-lg">
                FREE FOREVER
              </div>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto px-4">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                custom={i + 1} 
                className="group relative flex flex-col h-full"
              >
                <div className="glass-card rounded-3xl p-6 lg:p-8 text-center relative z-10 flex-1 flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-full bg-primary/20 group-hover:bg-primary/50 transition-colors" />
                  
                  <div className="mb-6 relative inline-block mx-auto">
                    <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <step.icon className="h-12 w-12 lg:h-14 lg:w-14 text-primary relative z-10 transition-transform group-hover:scale-110 duration-500" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8 flex-1">{step.desc}</p>
                  
                  {step.image && (
                    <div className="mt-auto rounded-2xl overflow-hidden border border-border/50 aspect-[16/10] bg-muted/50 shadow-inner group-hover:border-primary/30 transition-colors">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                    </div>
                  )}
                </div>
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
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.2} className="glass-card rounded-xl p-6 hover:shadow-lg transition-all group overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                {f.image && (
                  <div className="mt-6 rounded-lg overflow-hidden border border-border/30 h-32">
                    <img src={f.image} alt={f.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10 blur-3xl w-full max-w-4xl aspect-square bg-blue-600 rounded-full" />
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse rounded-full" />
              <Fingerprint className="h-20 w-20 text-primary mx-auto relative z-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Your Secrets Stay Yours</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Explyra Will uses end-to-end encryption with a zero-knowledge architecture. 
              We never see your data — only you and your nominees can decrypt it. 
              Your digital legacy is sealed until you decide otherwise.
            </p>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-8 w-8 text-primary/60" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">E2E Encrypted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Lock className="h-8 w-8 text-primary/60" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Zero Knowledge</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Users className="h-8 w-8 text-primary/60" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Multi-Nominee</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe className="h-8 w-8 text-primary/60" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Global Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing - NOW FREE */}
      <section id="pricing" className="py-20 md:py-28 bg-muted/40 relative">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Digital Protection for Everyone</h2>
            <p className="mt-4 text-muted-foreground text-lg text-primary font-semibold italic">Privacy is a human right. Explyra Will is now free for all.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeUp} 
              custom={1}
              className="glass-card rounded-3xl p-10 md:p-16 relative ring-4 ring-primary shadow-2xl overflow-hidden text-center"
            >
              <div className="absolute top-0 right-0 py-2 px-10 bg-primary text-primary-foreground font-bold text-sm transform rotate-45 translate-x-8 translate-y-4 shadow-xl">
                OPEN BETA
              </div>
              
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold text-primary mb-2">Explyra Alpha</h3>
                <div className="mt-2 mb-8 flex flex-col items-center">
                  <span className="text-sm font-medium line-through text-muted-foreground">₹999 / month</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-8xl font-black text-foreground">FREE</span>
                    <span className="text-xl font-medium text-muted-foreground">forever</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-left max-w-2xl mx-auto mb-10">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">Unlimited Capsules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">Up to 5 Trusted Nominees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">Custom Inactivity Thresholds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">Zero-Knowledge Architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">Crypto Seed Phrase Security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">Domain & DNS Credential Vault</span>
                  </div>
                </div>

                <Link to="/auth?tab=signup">
                  <Button size="lg" className="w-full md:w-auto px-12 py-8 text-xl h-auto font-bold shadow-xl shadow-primary/30">
                    Get Free Access Now
                  </Button>
                </Link>
                <p className="mt-6 text-xs text-muted-foreground font-medium">No credit card required. Experience the ultimate peace of mind.</p>
              </div>
            </motion.div>
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
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Explyra. Built for the future of digital asset inheritance.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Digital Legacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Encryption</a>
            <a href="#" className="hover:text-foreground transition-colors">Nominees</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
