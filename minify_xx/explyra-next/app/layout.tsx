import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Explyra Core — Platform Admin Console",
    template: "%s | Explyra Core",
  },
  description:
    "Explyra Core is the internal platform management and governance console for Explyra administrators.",
  openGraph: {
    type: "website",
    siteName: "Explyra",
    title: "Explyra Core — Platform Admin Console",
    description: "Platform Management & Governance",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@explyras",
    creator: "@explyras",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="explyra-theme"
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
