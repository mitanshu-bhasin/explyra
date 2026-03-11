import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Explyra — The All-in-One SaaS Ecosystem for Companies & Teams",
    template: "%s | Explyra",
  },
  description:
    "Explyra is the ultimate productivity suite for developers, enterprises, and teams. Intelligent expense management, CRM, Health tracking, AI-learning, and professional invoicing — all in one unified ecosystem.",
  keywords: [
    "Explyra",
    "SaaS ecosystem",
    "developer utilities",
    "expense tracker",
    "CRM software",
    "health manager",
    "invoicing tool",
    "team productivity",
    "professional development",
    "AI learning",
  ],
  authors: [{ name: "Mitanshu Bhasin" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://explyra.me/",
    siteName: "Explyra",
    title: "Explyra — The All-in-One SaaS Ecosystem",
    description:
      "Intelligent expense management, CRM, Health tracking, AI-learning, and professional invoicing.",
    images: [
      {
        url: "/assets/images/explyra_screenshot_1.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@explyras",
    creator: "@explyras",
    title: "Explyra — The All-in-One SaaS Ecosystem",
    description:
      "Intelligent expense management, CRM, Health tracking, AI-learning, and professional invoicing.",
    images: ["/assets/images/explyra_screenshot_1.png"],
  },
  icons: {
    icon: "/assets/images/explyra_logo.png",
    apple: "/assets/images/explyra_logo.png",
  },
  manifest: "/manifest.json",
  themeColor: "#1546C0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
