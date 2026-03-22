import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RetiredPro – Hire Retired Professionals | Explyra",
    template: "%s | RetiredPro",
  },
  description:
    "Connect with experienced retired professionals (50–70) for mentoring, consulting, and advisory services. Find industry veterans in technology, finance, healthcare, and more.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://x.explyra.me"),
  keywords: ["retired professionals", "mentoring", "consulting", "advisory", "expert marketplace", "startup mentors", "business advice"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://x.explyra.me",
    siteName: "RetiredPro by Explyra",
    title: "RetiredPro – Hire Retired Professionals for Mentoring & Consulting",
    description: "Connect with experienced retired professionals for mentoring, consulting, and advisory services.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "RetiredPro – Expert Marketplace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RetiredPro – Hire Retired Professionals",
    description: "Connect with industry veterans for mentoring, consulting, and advice.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0f2340" />
      </head>
      <body>
        <AuthProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontSize: "1rem", borderRadius: "12px", padding: "1rem 1.25rem" },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
