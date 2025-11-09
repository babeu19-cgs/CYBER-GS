export const metadata = {
  title: "Impressum | CYBER-GS",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-white">
      <h1 className="mb-6 text-3xl font-bold">Impressum</h1>

      <p className="mb-2">
        <strong>Verantwortlich für den Inhalt:</strong>
      </p>
      <p className="mb-6">
        Nico Gailer (CYBER-GS)
        <br />
        Straßename 00, 00000 Stadt, Deutschland
        <br />
        E-Mail: <a className="underline" href="mailto:contact@cybergs.ro">contact@cybergs.ro</a>
      </p>

      <h2 className="mt-8 text-2xl font-semibold">Haftungsausschluss</h2>
      <p className="mt-2 opacity-90">
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt...
      </p>

      <h2 className="mt-8 text-2xl font-semibold">Urheberrecht</h2>
      <p className="mt-2 opacity-90">
        Die durch den Seitenbetreiber erstellten Inhalte und Werke...
      </p>
    </main>
  );
}
