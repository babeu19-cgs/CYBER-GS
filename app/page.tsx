"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CYBER-GS — Single-file React page (Next.js App Router)
 * - Embed 3 latest YouTube videos (from /api/youtube, fallback to uploads playlist)
 * - Subscribe link
 * - Scroll reveal
 * - About (studio photo), Partners, Contact (Formspree placeholder)
 */

export default function CyberGsSiteStarter() {
  // tema / cookie
  const [dark, setDark] = useState(true);
  const [cookie, setCookie] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("cgscookie") === "ok";
    } catch {
      return false;
    }
  });

  // IDs pentru ultimele clipuri (din RSS) — punctul 2
  const [videoIds, setVideoIds] = useState<string[]>([]);

  // paleta brand
  const brand = {
    c1: "#10D5FF",
    c2: "#2563EB",
    c3: "#0EA5E9",
    text: "#E6F6FF",
  } as const;

  // refs secțiuni (IMPORTANT: funcția ref NU trebuie să returneze nimic)
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("cgs-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cgs-theme");
      if (saved) setDark(saved === "dark");
    } catch {}
  }, []);

  // scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("opacity-100", "translate-y-0");
          }
        }
      },
      { threshold: 0.2 }
    );
    sectionsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // mini self-tests doar în dev
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    setTimeout(() => {
      const subscribe = document.querySelector<HTMLAnchorElement>('a[data-testid="subscribe-link"]');
      console.assert(
        !!subscribe && subscribe.href.includes("sub_confirmation=1"),
        "[TEST] Subscribe link should include sub_confirmation=1"
      );
    }, 400);
  }, []);

  // navigare smooth către secțiuni (din navbar)
  const navTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const acceptCookie = () => {
    setCookie(true);
    try {
      localStorage.setItem("cgscookie", "ok");
    } catch {}
  };

  // 👉 aducem ultimele 3 ID-uri video (din /api/youtube); fallback = 3 clipuri din playlist
  useEffect(() => {
    fetch("/api/youtube")
      .then((r) => r.json())
      .then((d) => setVideoIds(Array.isArray(d?.ids) ? d.ids.slice(0, 3) : []))
      .catch(() => setVideoIds([]));
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1A] text-slate-100 dark:text-slate-100">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(40% 40% at 50% 50%, ${brand.c1}, transparent)` }}
        />
        <div
          className="absolute bottom-[-200px] right-[-200px] h-[600px] w-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(35% 35% at 50% 50%, ${brand.c2}, transparent)` }}
        />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/cyber-logo.png" alt="CYBER-GS logo" className="h-9 w-9 rounded-lg ring-1 ring-white/10" />
            <span className="font-semibold tracking-wide">CYBER-GS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => navTo("home")} className="hover:text-cyan-300/90">
              Acasa
            </button>
            <button onClick={() => navTo("videos")} className="hover:text-cyan-300/90">
              Clipuri
            </button>
            <button onClick={() => navTo("about")} className="hover:text-cyan-300/90">
              Despre
            </button>
            <button onClick={() => navTo("partners")} className="hover:text-cyan-300/90">
              Parteneri
            </button>
            <button onClick={() => navTo("contact")} className="hover:text-cyan-300/90">
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <a
              data-testid="subscribe-link"
              href="https://www.youtube.com/@CYBER-GS?sub_confirmation=1"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl px-3 py-1.5 text-sm font-medium bg-red-600/90 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/50"
            >
              Subscribe
            </a>
            <button
              onClick={() => setDark((d) => !d)}
              className="rounded-xl p-2 ring-1 ring-white/10 hover:ring-white/20"
              aria-label="Comuta tema"
            >
              {dark ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M21 12a9 9 0 0 1-9 9a9 9 0 0 1 0-18a9 9 0 0 0 9 9Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M6.76 4.84l-1.8-1.79l-1.41 1.41l1.79 1.8M1 13h3v-2H1m10-9h-2v3h2M4.95 19.07l1.41 1.41l1.79-1.8l-1.41-1.41M20 11v2h3v-2m-2.64-6.95l-1.41-1.41l-1.79 1.8l1.41 1.41M11 20h2v3h-2m7.05-2.93l1.79 1.8l1.41-1.41l-1.8-1.79"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        ref={(el: HTMLElement | null) => {
          sectionsRef.current[0] = el;
        }}
        className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/10 px-3 py-1 text-xs text-slate-300/80 bg-white/5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.c1 }} />
              New video every week
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
              CYBER-GS
              <span
                className="block text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(90deg, ${brand.c1}, ${brand.c2})` }}
              >
                Tech | PC Builds | Film
              </span>
            </h1>
            <p className="mt-6 text-slate-300/90 max-w-xl">
              Build-uri tematice, review-uri sincere si un stil vizual cu ADN cinematic. Newsletter curand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#videos"
                className="rounded-2xl px-5 py-3 ring-1 ring-white/10 hover:bg-white/10 transition font-medium"
              >
                Vezi ultimele clipuri
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-5 py-3"
                style={{ background: `${brand.c1}20`, boxShadow: `0 0 0 1px ${brand.c1}40 inset` }}
              >
                Colaboreaza
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-2 rounded-[28px] opacity-50 blur-xl"
              style={{ background: `linear-gradient(120deg, ${brand.c1}40, ${brand.c2}30)` }}
            />
            <div className="relative rounded-[24px] ring-1 ring-white/10 bg-white/5 p-2">
              <img src="/assets/nico-portrait.jpg" alt="Nico" className="rounded-2xl object-cover aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section
        id="videos"
        ref={(el: HTMLElement | null) => {
          sectionsRef.current[1] = el;
        }}
        className="opacity-0 translate-y-6 transition-all duration-700 ease-out border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Ultimele clipuri</h2>
            <a
              href="https://www.youtube.com/@CYBER-GS/videos"
              target="_blank"
              rel="noreferrer"
              className="text-sm"
              style={{ color: brand.c1 }}
            >
              Vezi toate
            </a>
          </div>

          {/* ✅ 3 videouri: din RSS (videoIds) sau fallback din playlist (index 0..2) */}
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoIds.length > 0
              ? videoIds.map((vid) => (
                  <div key={vid} className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0`}
                        title="YouTube video"
                        frameBorder={0}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                ))
              : [0, 1, 2].map((i) => (
                  <div key={i} className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed?listType=playlist&list=UUvH_nLLK5EnZCoc51IdlFGA&index=${i}`}
                        title={`YouTube uploads ${i}`}
                        frameBorder={0}
                        loading="lazy"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={(el: HTMLElement | null) => {
          sectionsRef.current[2] = el;
        }}
        className="opacity-0 translate-y-6 transition-all duration-700 ease-out border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Despre canal</h2>
            <p className="mt-4 text-slate-300/90">
              Sunt Nico - construiesc PC-uri cu personalitate, testez hardware fara BS si fac storytelling vizual.
              Pe CYBER-GS gasesti build-uri tematice, review-uri detaliate si ghiduri practice.
            </p>
            <ul className="mt-6 space-y-2 text-slate-300/90">
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: brand.c1 }} />
                PC building & modding
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: brand.c1 }} />
                Cinematic lighting & sound
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: brand.c1 }} />
                Colaborari cu branduri tech
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-white/5 to-transparent blur-2xl" />
            <div className="relative rounded-3xl ring-1 ring-white/10 bg-white/5 p-4">
              <img src="/assets/cyber-hero.jpg" alt="Studio" className="rounded-2xl object-cover aspect-video" />
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section
        id="partners"
        ref={(el: HTMLElement | null) => {
          sectionsRef.current[3] = el;
        }}
        className="opacity-0 translate-y-6 transition-all duration-700 ease-out border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Parteneri & Sponsori</h2>
          <p className="mt-4 text-slate-300/90 max-w-2xl">Branduri cu care am lucrat sau cu care vreau sa lucrez.</p>
          <div className="mt-8 overflow-hidden">
            <div className="flex gap-8 animate-[scroll_30s_linear_infinite]" style={{ whiteSpace: "nowrap" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 w-36 rounded-xl bg-white/5 ring-1 ring-white/10 grid place-items-center text-slate-300/70"
                >
                  LOGO {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5">
              <h3 className="text-lg font-semibold">Integrare 60-90s</h3>
              <p className="mt-2 text-sm text-slate-300/90">Mentiune in intro, CTA, link tracking, 1 revizie.</p>
              <div className="mt-4 text-2xl font-bold" style={{ color: brand.c1 }}>
                EUR 200-300
              </div>
            </div>
            <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5">
              <h3 className="text-lg font-semibold">Review dedicat</h3>
              <p className="mt-2 text-sm text-slate-300/90">Script, testare, B-roll cinematic, 2 revizii.</p>
              <div className="mt-4 text-2xl font-bold" style={{ color: brand.c1 }}>
                EUR 500+
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        ref={(el: HTMLElement | null) => {
          sectionsRef.current[4] = el;
        }}
        className="opacity-0 translate-y-6 transition-all duration-700 ease-out border-t border-white/10"
      >
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
          <p className="mt-4 text-slate-300/90">Scrie-mi pentru colaborari sau proiecte custom.</p>
          <form className="mt-6 grid gap-4" action="https://formspree.io/f/yourcode" method="POST">
            <input
              name="name"
              placeholder="Nume"
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 outline-none focus:ring-cyan-400/40"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 outline-none focus:ring-cyan-400/40"
              required
            />
            <textarea
              name="message"
              placeholder="Mesaj"
              rows={5}
              className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 outline-none focus:ring-cyan-400/40"
              required
            />
            <button
              type="submit"
              className="rounded-2xl px-5 py-3 font-medium w-fit"
              style={{ background: `${brand.c1}20`, boxShadow: `0 0 0 1px ${brand.c1}40 inset` }}
            >
              Trimite
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER minim (ai deja SiteFooter global din layout) */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <p>(c) {new Date().getFullYear()} CYBER-GS. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-200">
              Politica de confidențialitate
            </a>
            <a href="/terms" className="hover:text-slate-200">
              Termeni & Condiții
            </a>
          </div>
        </div>
      </footer>

      {/* Cookie banner */}
      {!cookie && (
        <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 z-50 max-w-md rounded-2xl bg-slate-900/95 ring-1 ring-white/10 p-4">
          <p className="text-sm text-slate-200">Folosim cookie-uri pentru functionalitate si analitice de baza.</p>
          <div className="mt-3 flex gap-3 justify-end">
            <button onClick={acceptCookie} className="rounded-xl px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20">
              Accept
            </button>
            <a href="/privacy" className="rounded-xl px-3 py-1.5 text-sm bg-white/0 hover:bg-white/10 ring-1 ring-white/10">
              Afla mai mult
            </a>
          </div>
        </div>
      )}

      {/* Keyframes locale */}
      <style>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </main>
  );
}
