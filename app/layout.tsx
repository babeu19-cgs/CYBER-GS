import "./globals.css";
import type { Metadata, Viewport } from "next";
import React from "react";
import CookieBanner from "../components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://cybergs.ro"),
  title: "CYBER-GS — Tech | PC Builds | Film",
  description:
    "Build-uri tematice, review-uri sincere și un stil vizual cu ADN cinematic. CYBER-GS — Tech | PC Builds | Film.",
  openGraph: {
    type: "website",
    url: "https://cybergs.ro",
    siteName: "CYBER-GS",
    title: "CYBER-GS — Tech | PC Builds | Film",
    description:
      "Build-uri tematice, review-uri sincere și un stil vizual cu ADN cinematic.",
    images: [
      {
        url: "/assets/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "CYBER-GS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CYBER-GS — Tech | PC Builds | Film",
    description:
      "Build-uri tematice, review-uri sincere și un stil vizual cu ADN cinematic.",
    images: ["/assets/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://cybergs.ro",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen">
        {children}
        <CookieBanner />
     // app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "CYBER-GS",
  description: "Tech | PC Builds | Film",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

      </body>
    </html>
  );
}
