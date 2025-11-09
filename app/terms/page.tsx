export const metadata = {
  title: "Termeni și condiții | CYBER-GS",
  description:
    "Condițiile de utilizare ale site-ului CYBER-GS și regulile privind conținutul.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 prose prose-invert">
      <h1>Termeni și condiții</h1>
      <p>Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

      <h2>1. Acceptarea termenilor</h2>
      <p>
        Accesând acest site, accepți prezentele condiții. Dacă nu ești de acord,
        te rugăm să părăsești site-ul.
      </p>

      <h2>2. Conținut și proprietate intelectuală</h2>
      <p>
        Conținutul (texte, imagini, clipuri) aparține CYBER-GS sau partenerilor
        și nu poate fi preluat fără acord.
      </p>

      <h2>3. Limitări de răspundere</h2>
      <p>
        Site-ul este oferit „ca atare”. Nu garantăm lipsa erorilor ori
        compatibilitatea cu toate dispozitivele.
      </p>

      <h2>4. Modificări</h2>
      <p>
        Putem actualiza termenii. Continuarea utilizării după modificări înseamnă
        acceptarea lor.
      </p>

      <h2>5. Contact</h2>
      <p>
        Întrebări la:{" "}
        <a href="mailto:postmaster@cybergs.ro">postmaster@cybergs.ro</a>
      </p>
    </main>
  );
}
