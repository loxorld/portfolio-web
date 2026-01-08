import Link from "next/link";

const tech = [
  { name: "Java", src: "https://cdn.simpleicons.org/java/ffffff" },
  { name: "Spring Boot", src: "https://cdn.simpleicons.org/springboot/ffffff" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql/ffffff" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker/ffffff" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/ffffff" },
  { name: "Tailwind", src: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
  { name: "Git", src: "https://cdn.simpleicons.org/git/ffffff" },
];

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="card p-8">
        <p className="subtle text-sm">Analista Programador Universitario · UNLP</p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          Portfolio: proyectos reales, buenas prácticas.
        </h1>

        <p className="mt-4 max-w-2xl text-sm muted">
          Backend con Java/Spring Boot y PostgreSQL. Frontend con Next.js.
          Este sitio consume mi propia API para mostrar proyectos publicados.
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

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Backend", desc: "Spring Boot · JPA · PostgreSQL · Swagger" },
          { title: "Frontend", desc: "Next.js · TypeScript · Tailwind" },
          { title: "Calidad", desc: "Validación, errores consistentes, commits claros" },
        ].map((c) => (
          <div key={c.title} className="card">
            <h2 className="text-sm font-semibold text-white">{c.title}</h2>
            <p className="mt-2 text-sm muted">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="card">
        <h2 className="text-sm font-semibold text-white">Stack</h2>
        <p className="mt-2 text-sm muted">
          Tecnologías que uso en proyectos reales.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tech.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3"
            >
              <img src={t.src} alt={t.name} width={18} height={18} />
              <span className="text-xs text-neutral-200">{t.name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
