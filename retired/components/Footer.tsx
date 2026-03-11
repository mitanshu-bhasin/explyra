import Link from "next/link";
import { Briefcase, Linkedin, Twitter, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-primary-dark)", color: "rgba(255,255,255,0.75)", paddingTop: "4rem", paddingBottom: "2rem", marginTop: "auto" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ background: "var(--color-accent)", borderRadius: "10px", padding: "6px 8px", display: "flex" }}>
                <Briefcase size={20} color="#fff" />
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>RetiredPro</span>
            </div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "320px", marginBottom: "1.5rem" }}>
              Connecting experienced retired professionals with the startups, companies, and individuals who need their wisdom most.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", display: "flex" }} aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", display: "flex" }} aria-label="Twitter">
                <Twitter size={22} />
              </a>
              <a href="https://explyra.me" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", display: "flex" }} aria-label="Website">
                <Globe size={22} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1rem", marginBottom: "1rem" }}>Platform</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { href: "/search", label: "Find Experts" },
                { href: "/post", label: "Knowledge Hub" },
                { href: "/signup", label: "Become an Expert" },
                { href: "/signup", label: "Hire an Expert" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1rem", marginBottom: "1rem" }}>Company</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { href: "https://explyra.me", label: "About Explyra" },
                { href: "https://explyra.me/privacy.html", label: "Privacy Policy" },
                { href: "https://explyra.me/terms.html", label: "Terms of Service" },
                { href: "https://explyra.me/contact.html", label: "Contact" },
              ].map((l) => (
                <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", textDecoration: "none" }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1rem", marginBottom: "1rem" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a href="mailto:support@explyra.me" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                <Mail size={16} />
                support@explyra.me
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} RetiredPro by <a href="https://explyra.me" style={{ color: "var(--color-accent-light)" }}>Explyra</a>. All rights reserved.
          </p>
          <p style={{ fontSize: "0.875rem" }}>
            Hosted at <a href="https://x.explyra.me" style={{ color: "var(--color-accent-light)" }}>x.explyra.me</a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr;
          }
          footer > div > div:first-child > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
