import type { Metadata } from "next";
import Link from "next/link";
import { Search, Star, Users, Briefcase, CheckCircle, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "RetiredPro – Hire Retired Professionals for Mentoring & Consulting",
  description: "Connect with experienced retired professionals aged 50–70 for mentoring, consulting, and advisory services. Find industry veterans in technology, finance, healthcare, and more.",
};

const stats = [
  { value: "500+", label: "Expert Mentors" },
  { value: "50+", label: "Industries" },
  { value: "4.9★", label: "Average Rating" },
  { value: "10K+", label: "Sessions Completed" },
];

const features = [
  {
    icon: Shield,
    title: "Verified & Trusted",
    desc: "Every expert is manually reviewed and verified before going live on the platform.",
    color: "var(--color-accent)",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Book 30-minute or 1-hour sessions at times that work for both you and your expert.",
    color: "#8b5cf6",
  },
  {
    icon: TrendingUp,
    title: "Real-World Expertise",
    desc: "Get advice from professionals with decades of hands-on industry experience.",
    color: "#16a34a",
  },
  {
    icon: Users,
    title: "For Every Need",
    desc: "Whether you're a startup, SME, student, or individual, we have the right mentor for you.",
    color: "#d97706",
  },
];

const industries = [
  "Technology", "Finance", "Healthcare", "Legal", "Marketing",
  "Engineering", "Manufacturing", "Education", "Government", "Consulting",
];

const howItWorks = [
  { step: "01", title: "Create Your Account", desc: "Sign up as an expert or a client in under 2 minutes." },
  { step: "02", title: "Browse or Build Profile", desc: "Experts set availability & rates. Clients search by skill, industry, and price." },
  { step: "03", title: "Book a Session", desc: "Pick a time, book and pay online. Meet virtually at your convenience." },
  { step: "04", title: "Get Results", desc: "Gain valuable insights and leave a review to help the community." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero" style={{ 
        position: "relative",
        padding: "8rem 0 6rem",
        backgroundImage: 'url("/hero-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden"
      }}>
        {/* Overlay */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(to bottom, rgba(15, 35, 64, 0.85), rgba(15, 35, 64, 0.95))",
          zIndex: 1 
        }} />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: "99px", padding: "0.4rem 1rem", marginBottom: "2rem" }}>
            <Star size={14} color="#06b6d4" fill="#06b6d4" />
            <span style={{ color: "#67e8f9", fontSize: "0.9rem", fontWeight: 500 }}>India's Premier Retired Expert Marketplace</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.25rem, 5vw, 3.5rem)", marginBottom: "1.5rem", lineHeight: 1.15 }}>
            Decades of Experience,<br />
            <span style={{ color: "var(--color-accent-light)" }}>Ready to Help You Succeed</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.2rem", maxWidth: "620px", margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
            Connect with retired professionals aged 50–70 who have decades of real-world expertise in technology, finance, healthcare, and 40+ other industries.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/search" className="btn btn-accent btn-lg">
              <Search size={20} />
              Find an Expert
            </Link>
            <Link href="/signup" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>
              Become an Expert
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "5rem", background: "rgba(255,255,255,0.06)", borderRadius: "20px", padding: "2rem", border: "1px solid rgba(255,255,255,0.1)" }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--color-accent-light)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", marginTop: "0.4rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ background: "#f1f5f9", padding: "3rem 0" }}>
        <div className="container">
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", marginBottom: "1.25rem", fontWeight: 500 }}>
            Experts across 50+ industries
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {industries.map(ind => (
              <Link key={ind} href={`/search?industry=${encodeURIComponent(ind)}`} className="btn btn-outline" style={{ fontSize: "0.9rem", padding: "0.5rem 1.1rem", minHeight: "42px", color: "var(--color-primary)", borderColor: "var(--color-primary)" }}>
                {ind}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2>Why Choose RetiredPro?</h2>
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.75rem", fontSize: "1.1rem", maxWidth: "560px", margin: "0.75rem auto 0" }}>
              We believe wisdom should not retire. Our platform puts decades of expertise at your fingertips.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
            {features.map(f => (
              <div key={f.title} className="card card-body" style={{ textAlign: "center" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "16px", background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                  <f.icon size={28} color={f.color} />
                </div>
                <h3 style={{ marginBottom: "0.75rem" }}>{f.title}</h3>
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2>How It Works</h2>
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.75rem", fontSize: "1.1rem" }}>
              From signup to your first session in minutes.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {howItWorks.map((step, i) => (
              <div key={step.step} style={{ position: "relative" }}>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "var(--color-accent)", opacity: 0.15, lineHeight: 1, marginBottom: "0.5rem" }}>{step.step}</div>
                <h3 style={{ marginBottom: "0.625rem" }}>{step.title}</h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.97rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div style={{ background: "var(--color-primary)", borderRadius: "24px", padding: "4rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(6,182,212,0.1)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, background: "rgba(6,182,212,0.06)", borderRadius: "50%" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Ready to Tap Into Decades of Expertise?</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
                Join thousands of clients who have transformed their businesses and careers with RetiredPro mentorship.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/signup" className="btn btn-accent btn-lg">
                  Get Started Today
                  <ArrowRight size={20} />
                </Link>
                <Link href="/search" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "2px solid rgba(255,255,255,0.25)" }}>
                  Browse Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "RetiredPro by Explyra",
            "url": "https://x.explyra.me",
            "description": "Marketplace connecting retired professionals with clients for mentoring and consulting",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://x.explyra.me/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <style>{`
        @media (max-width: 640px) {
          section:first-of-type > div > div:last-child {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
