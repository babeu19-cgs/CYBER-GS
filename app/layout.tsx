// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// folosește import relativ (nu "@/")
import CookieBanner from "../components/CookieBanner";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "CYBER-GS",
  description: "Tech | PC Builds | Film",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-[#0A0F1A] text-white">
        {children}
        <CookieBanner />
        <SiteFooter />
      </body>
    </html>
  );
}
