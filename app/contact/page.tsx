export const metadata = {
  title: "Contact & Colaborare | CYBER-GS",
  description:
    "Vrei o colaborare, sponsorizare sau ai întrebări? Scrie-mi aici.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-white">
      <h1 className="mb-6 text-3xl font-bold">Contact & Colaborare</h1>
      <p className="mb-8 opacity-90">
        Pentru colaborări (sponsorizări, produse la review...) folosește formularul:
      </p>

      {/* Înlocuiești SRC cu linkul tău de la Zoho Forms (EU) când îl ai */}
      <div className="aspect-[16/12] w-full overflow-hidden rounded-xl border border-white/10">
        <iframe
          title="CYBER-GS contact form"
          src="https://forms.zoho.eu/___FORM_LINK___"
          className="h-full w-full"
          frameBorder={0}
        />
      </div>

      <p className="mt-6 opacity-70">
        Sau scrie direct la{" "}
        <a className="underline" href="mailto:contact@cybergs.ro">contact@cybergs.ro</a>.
      </p>
    </main>
  );
}
