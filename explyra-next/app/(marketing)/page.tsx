import { HeroSection } from "@/components/sections/HeroSection";
import { AIStrip } from "@/components/sections/AIStrip";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { HelpDesk } from "@/components/sections/HelpDesk";
import { FounderStrip } from "@/components/sections/FounderStrip";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Social Proof Section - Could be its own component later */}
      <section className="bg-[var(--bg2)] border-b border-[var(--bdr)] py-10 px-[5vw] text-center">
        <p className="text-[0.8rem] text-[var(--ink4)] font-medium uppercase tracking-[0.05em] mb-5">
          Trusted by innovative teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-[1.5rem_3rem] max-w-[1000px] mx-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
             {/* Fake logos for now to match structure. In a real app these would be SVGs. */}
             <div className="text-[1rem] font-bold text-[var(--ink4)] flex items-center gap-2">⭐ TechLogix</div>
             <div className="text-[1rem] font-bold text-[var(--ink4)] flex items-center gap-2">⚡ Acme Corp</div>
             <div className="text-[1rem] font-bold text-[var(--ink4)] flex items-center gap-2">🌐 GlobalNet</div>
             <div className="text-[1rem] font-bold text-[var(--ink4)] flex items-center gap-2">🚀 StartupInc</div>
        </div>
      </section>

      <AIStrip />
      <FeaturesGrid />
      <Testimonials />
      <HelpDesk />
      <FounderStrip />
      <CTA />
    </div>
  );
}
