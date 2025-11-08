
export const metadata = {
  title: "CYBER-GS",
  description: "Tech | PC Builds | Film",
};

import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
