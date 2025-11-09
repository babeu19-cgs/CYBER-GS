// components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} CYBER-GS. Toate drepturile rezervate.
        </p>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/privacy" className="text-white/70 hover:text-white">
            Politica de confidențialitate
          </Link>
          <Link href="/terms" className="text-white/70 hover:text-white">
            Termeni & Condiții
          </Link>
          {/* Next.js servește automat /sitemap.xml din app/sitemap.ts */}
          <Link href="/sitemap.xml" className="text-white/70 hover:text-white">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  );
}
