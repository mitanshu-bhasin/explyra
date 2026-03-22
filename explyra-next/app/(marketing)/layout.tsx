import "./marketing.css";
import React from "react";
import MarketingNav from "@/components/marketing/Navbar";
import MarketingFooter from "@/components/marketing/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-mktg>
      <MarketingNav />
      {/* Scrollbar progress element injected into the layout */}
      <div className="scroll-bar">
        <div className="scroll-bar-fill" id="mkt-scroll-progress" style={{ width: "0%" }} />
      </div>

      <main>{children}</main>

      <MarketingFooter />

      {/* Script to handle scroll progress bar */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const bar = document.getElementById('mkt-scroll-progress');
              if (bar) bar.style.width = scrolled + '%';
            });
          `,
        }}
      />
    </div>
  );
}
