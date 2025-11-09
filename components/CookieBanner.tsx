"use client";
import React from "react";

export default function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const ok = localStorage.getItem("cgs_cookie_ok");
      if (!ok) setVisible(true);
    } catch {}
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem("cgs_cookie_ok", "1");
    } catch {}
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-white backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="leading-snug">
          Folosim cookie-uri pentru funcționalități de bază și embed-uri (de ex. YouTube).
          Citește detalii în{" "}
          <a href="/legal/datenschutz" className="underline hover:text-cyan-300">
            Politica de confidențialitate
          </a>.
        </p>
        <div className="flex gap-2">
          <a
            href="/legal/datenschutz"
            className="rounded-lg border border-white/20 px-3 py-2 hover:bg-white/10"
          >
            Află mai mult
          </a>
          <button
            onClick={accept}
            className="rounded-lg bg-white/15 px-3 py-2 hover:bg-white/25"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
