// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react"; // <-- adăugat

export const metadata = {
  title: "CYBER-GS",
  description: "Tech | PC Builds | Film",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode; // <-- folosește ReactNode importat mai sus
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
