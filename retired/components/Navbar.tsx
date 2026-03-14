"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { Briefcase, Menu, X, User, LogOut, LayoutDashboard, Search, MessageSquare, PenSquare, Settings } from "lucide-react";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navLinks = [
    { href: "/search", label: "Find Experts", icon: Search },
    { href: "/post", label: "Knowledge Hub", icon: PenSquare },
  ];

  const authLinks = user
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/profile", label: "My Profile", icon: User },
        { href: "/messages", label: "Messages", icon: MessageSquare },
        ...(user.email === "explras@gmail.com" ? [{ href: "/admin", label: "Admin Panel", icon: Settings }] : []),
      ]
    : [];

  return (
    <header style={{ background: "var(--color-primary-dark)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <nav className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#fff", fontWeight: 800, fontSize: "1.3rem", textDecoration: "none" }}>
          <div style={{ background: "var(--color-accent)", borderRadius: "10px", padding: "6px 8px", display: "flex" }}>
            <Briefcase size={22} color="#fff" />
          </div>
          <span>RetiredPro</span>
          <span style={{ fontSize: "0.7rem", background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: "99px", fontWeight: 500 }}>by Explyra</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? "var(--color-accent-light)" : "rgba(255,255,255,0.8)",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "0.95rem",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
              }}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
          {user && authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? "var(--color-accent-light)" : "rgba(255,255,255,0.8)",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "0.95rem",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
              }}
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden-mobile">
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontWeight: 500 }}
              >
                <User size={18} />
                {user.displayName?.split(" ")[0] || "Account"}
              </button>
              {dropdownOpen && (
                <div
                  style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", minWidth: "180px", overflow: "hidden", zIndex: 50 }}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={handleLogout}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", padding: "0.9rem 1.25rem", background: "none", border: "none", cursor: "pointer", color: "var(--color-danger)", fontWeight: 600, fontSize: "0.95rem" }}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)", padding: "0.6rem 1.25rem", minHeight: "44px" }}>
                Sign In
              </Link>
              <Link href="/signup" className="btn btn-accent" style={{ padding: "0.6rem 1.25rem", minHeight: "44px" }}>
                Join Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-only"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "0.5rem" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "var(--color-primary)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1rem" }}>
          {[...navLinks, ...(user ? authLinks : [])].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#fff", padding: "0.9rem 1rem", borderRadius: "8px", fontWeight: 500, fontSize: "1rem", textDecoration: "none" }}
            >
              <link.icon size={20} />
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1rem", display: "flex", gap: "0.75rem" }}>
            {user ? (
              <button onClick={handleLogout} className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)", flex: 1 }}>
                <LogOut size={18} /> Sign Out
              </button>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)", flex: 1 }} onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link href="/signup" className="btn btn-accent" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}>
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex; }
        .mobile-only { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
