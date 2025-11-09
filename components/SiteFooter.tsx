// components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-white/70 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} CYBER-GS</p>
        <nav className="flex gap-6">
          <Link href="/privacy" className="hover:text-white">
            Politica de confidențialitate
          </Link>
          <Link href="/terms" className="hover:text-white">
            Termeni &amp; Condiții
          </Link>
          <Link href="/sitemap.xml" className="hover:text-white">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  );
}
