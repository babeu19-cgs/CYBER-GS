export const metadata = {
  title: "Politica de confidențialitate | CYBER-GS",
  description:
    "Află cum colectăm, folosim și protejăm datele tale pe site-ul CYBER-GS.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 prose prose-invert">
      <h1>Politica de confidențialitate</h1>
      <p>Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}</p>

      <h2>1. Ce date colectăm</h2>
      <p>
        Colectăm date tehnice (IP, header UA, pagini vizitate) și, dacă alegi,
        date furnizate de tine prin formulare de contact/abonare.
      </p>

      <h2>2. Cookie-uri & analytics</h2>
      <p>
        Folosim cookie-uri esențiale pentru funcționarea site-ului și, cu
        consimțământul tău, cookie-uri de analiză pentru a îmbunătăți
        experiența. Poți gestiona preferințele din bannerul de cookies.
      </p>

      <h2>3. Partajarea datelor</h2>
      <p>
        Nu vindem datele tale. Putem partaja minimul necesar cu furnizori
        implicați în funcționarea site-ului (ex: hosting, e-mail).
      </p>

      <h2>4. Drepturile tale</h2>
      <ul>
        <li>Acces, rectificare, ștergere</li>
        <li>Restricționare/opunere la prelucrare</li>
        <li>Portabilitate</li>
      </ul>

      <h2>5. Contact</h2>
      <p>
        Pentru întrebări privind confidențialitatea:{" "}
        <a href="mailto:postmaster@cybergs.ro">postmaster@cybergs.ro</a>
      </p>
    </main>
  );
}
