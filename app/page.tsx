import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="rounded-2xl border p-8">
        <p className="text-sm text-neutral-600">Analista Programador Universitario · UNLP</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Construyo productos web con criterio, buenas prácticas y foco en calidad.
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-neutral-700">
          Backend con Java/Spring Boot y PostgreSQL. Frontend con Next.js. Este sitio consume mi propia API
          para mostrar proyectos reales.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            Ver proyectos
          </Link>

          <a
            href="https://github.com/TU_USUARIO"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: "Backend", desc: "Spring Boot · JPA · PostgreSQL · Swagger" },
          { title: "Frontend", desc: "Next.js · TypeScript · Tailwind" },
          { title: "Calidad", desc: "Validación, errores consistentes, commits claros" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border p-6">
            <h2 className="text-sm font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
