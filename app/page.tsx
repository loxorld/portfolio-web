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

const highlights = [
  { title: "Backend", desc: "Spring Boot · JPA · PostgreSQL · Swagger" },
  { title: "Frontend", desc: "Next.js · TypeScript · Tailwind" },
  { title: "Calidad", desc: "Validación, errores consistentes, commits claros" },
];

export default function HomePage() {
  return (
    <main className="space-y-10">
      {/* HERO */}
      <section className="card hero-glow p-8">
        <p className="subtle text-sm">
          Analista Programador Universitario · UNLP
        </p>

        <h1 className="hero-title mt-3 text-3xl font-semibold tracking-tight">
          Brian La Delfa — portfolio profesional
        </h1>

        <p className="mt-4 max-w-2xl text-sm muted">
          Backend con <span className="text-white">Java/Spring Boot</span> y{" "}
          <span className="text-white">PostgreSQL</span>. Frontend con{" "}
          <span className="text-white">Next.js</span>. Este sitio consume mi propia
          API para listar proyectos publicados.
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

          <a
            href="https://www.linkedin.com/in/brian-la-delfa-349a8a230/"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            LinkedIn
          </a>
        </div>

        {/* mini stats / badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="pill">API REST</span>
          <span className="pill">JPA</span>
          <span className="pill">Swagger</span>
          <span className="pill">Railway + Vercel</span>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((c) => (
          <div key={c.title} className="card card-hover">
            <h2 className="text-sm font-semibold text-white">{c.title}</h2>
            <p className="mt-2 text-sm muted">{c.desc}</p>
          </div>
        ))}
      </section>

      {/* STACK */}
      <section className="card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-sm font-semibold text-white">Stack</h2>
            <p className="mt-2 text-sm muted">
              Tecnologías que uso en proyectos reales. (Sí, las que después hay
              que mantener.)
            </p>
          </div>

          <Link href="/projects" className="btn">
            Ver todo →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tech.map((t) => (
            <div key={t.name} className="tech-tile">
              <img src={t.src} alt={t.name} width={18} height={18} />
              <span className="text-xs text-neutral-200">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="card card-hover">
        <h2 className="text-sm font-semibold text-white">
          ¿Querés ver código y decisiones técnicas?
        </h2>
        <p className="mt-2 text-sm muted">
          En cada proyecto vas a encontrar stack, descripción y links a repo/demo.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            Ir a Projects
          </Link>
          <a
            className="btn"
            href="https://github.com/loxorld"
            target="_blank"
            rel="noreferrer"
          >
            Ver GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
