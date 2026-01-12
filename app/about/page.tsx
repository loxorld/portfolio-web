import Link from "next/link";

const pillars = [
  {
    title: "Backend (mi fuerte)",
    desc: "APIs REST con Spring Boot, validación, paginación, manejo de errores consistente y documentación con Swagger.",
  },
  {
    title: "Persistencia",
    desc: "JPA/Hibernate + PostgreSQL. Modelado prolijo y consultas pensadas para crecer sin volverse in-mantenibles.",
  },
  {
    title: "Frontend (para mostrar bien)",
    desc: "Next.js + TypeScript. UI simple, consistente, consumiendo mi API en producción.",
  },
];

const focus = [
  "Java · Spring Boot",
  "PostgreSQL · JPA",
  "Arquitectura por capas",
  "Validaciones y errores",
  "Deploy Railway/Vercel",
  "Git y commits claros",
];

export default function AboutPage() {
  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="card hero-glow p-8">
        <p className="subtle text-sm">Sobre mí</p>

        <h1 className="hero-title mt-3 text-3xl font-semibold tracking-tight">
          Brian La Delfa
        </h1>

        <p className="mt-4 max-w-2xl text-sm muted">
          Soy <span className="text-white">Analista Programador Universitario</span> en
          la Universidad Nacional De La Plata. Me gusta el backend con Java, y me importa que los proyectos
          estén <span className="text-white">bien hechos</span>: código prolijo,
          capas claras y validaciones.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            Ver proyectos
          </Link>
          <a
            href="https://github.com/loxorld"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Pillars */}
      <section className="grid gap-4 md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="card card-hover">
            <h2 className="text-sm font-semibold text-white">{p.title}</h2>
            <p className="mt-2 text-sm muted">{p.desc}</p>
          </div>
        ))}
      </section>

      {/* Focus */}
      <section className="card">
        <h2 className="text-sm font-semibold text-white">En qué me enfoco</h2>
        <p className="mt-2 text-sm muted">
          Tecnologías y prácticas que aplico en proyectos reales.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {focus.map((x) => (
            <span key={x} className="pill">
              {x}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="card card-hover">
        <h2 className="text-sm font-semibold text-white">
          ¿Querés contactarme?
        </h2>
        <p className="mt-2 text-sm muted">
          Te dejo las opciones directas para hablar o ver más código.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Ir a Contact
          </Link>
          <Link href="/projects" className="btn">
            Ver Projects →
          </Link>
        </div>
      </section>
    </main>
  );
}
