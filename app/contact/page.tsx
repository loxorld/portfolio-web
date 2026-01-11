import Link from "next/link";

const links = [
  {
    label: "LinkedIn",
    value: "Brian La Delfa",
    href: "https://www.linkedin.com/in/brian-la-delfa-349a8a230/",
  },
  {
    label: "GitHub",
    value: "loxorld",
    href: "https://github.com/loxorld",
  },
];

export default function ContactPage() {
  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="card hero-glow p-8">
        <p className="subtle text-sm">Contacto</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Hablemos
        </h1>

        <p className="mt-4 max-w-2xl text-sm muted">
          Si querés coordinar una charla o ver más detalles técnicos, lo más
          rápido es por LinkedIn. También podés mirar el código en GitHub.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/brian-la-delfa-349a8a230/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/loxorld"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            GitHub
          </a>
          <Link href="/projects" className="btn">
            Ver Projects →
          </Link>
        </div>
      </section>

      {/* Cards */}
      <section className="grid gap-4 md:grid-cols-2">
        {links.map((l) => (
          <div key={l.label} className="card card-hover">
            <h2 className="text-sm font-semibold text-white">{l.label}</h2>
            <p className="mt-2 text-sm muted">{l.value}</p>
            <a
              className="mt-4 inline-flex text-sm text-white hover:underline"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              Abrir →
            </a>
          </div>
        ))}

        <div className="card card-hover">
          <h2 className="text-sm font-semibold text-white">Email</h2>
          <p className="mt-2 text-sm muted">
            brianlautaro@hotmail.com
          </p>
        </div>
      </section>

      {/* Note */}
      <section className="card">
        <h2 className="text-sm font-semibold text-white">Nota</h2>
        <p className="mt-2 text-sm muted">
          Este portfolio está deployado (Front en Vercel, Back en Railway) y
          los proyectos se cargan desde una API propia.
        </p>
      </section>
    </main>
  );
}
