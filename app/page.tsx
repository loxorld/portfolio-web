import Link from "next/link";
import { fetchProjects, type ProjectSummary } from "@/lib/api";
import { getPreferredProjectCover } from "@/lib/project-media";
import { ProjectPreviewCard } from "./components/ProjectPreviewCard";
import { ProjectVisual } from "./components/ProjectVisual";
import { RemoteImage } from "./components/RemoteImage";
import { SectionHeading } from "./components/SectionHeading";

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

const strengths = [
  {
    title: "Backend",
    desc: "APIs REST, validaciones, seguridad y modelos simples de mantener.",
  },
  {
    title: "Persistencia",
    desc: "Trabajo con JPA y PostgreSQL cuidando consistencia, indices y consultas.",
  },
  {
    title: "Presentacion",
    desc: "Uso Next.js para mostrar el trabajo con una interfaz clara y conectada a datos reales.",
  },
];

const process = [
  "Defino entidades y flujos pensando primero en el backend.",
  "Valido entradas y dejo respuestas consistentes para el cliente.",
  "Cierro el recorrido con un frontend que consume la API real.",
];

function formatMonthYear(value: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-AR", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function HomePage() {
  let publishedCount: number | null = null;
  let featuredProjects: ProjectSummary[] = [];
  let latestProject: ProjectSummary | null = null;

  try {
    const data = await fetchProjects();
    publishedCount = data.totalItems;
    featuredProjects = data.items.slice(0, 3);
    latestProject = data.items[0] ?? null;
  } catch {
    publishedCount = null;
    featuredProjects = [];
    latestProject = null;
  }

  const latestProjectCover = latestProject
    ? getPreferredProjectCover(latestProject.slug, latestProject.coverImageUrl)
    : null;

  return (
    <main className="space-y-12 md:space-y-16">
      <section className="spotlight-card hero-glow reveal-up">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 space-y-7 reveal-up">
            <div className="space-y-4">
              <p className="section-kicker">Portfolio backend / full stack</p>
              <h1 className="section-title hero-title max-w-4xl md:text-6xl">
                Portfolio de Brian La Delfa con foco en Java, Spring Boot y una API propia.
              </h1>
              <p className="section-copy">
                Este sitio muestra proyectos publicados desde mi backend. El
                foco esta en APIs, persistencia, seguridad y una interfaz sobria
                para presentarlos.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-primary">
                Ver proyectos
              </Link>
              <Link href="/about" className="btn">
                Sobre mi
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

            <div className="flex flex-wrap gap-2">
              <span className="pill">Java</span>
              <span className="pill">Spring Security</span>
              <span className="pill">PostgreSQL</span>
              <span className="pill">Next.js</span>
              <span className="pill">Railway / Vercel</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-1 reveal-up delay-1">
            {latestProject ? (
              <article className="card space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="section-kicker">Proyecto reciente</p>
                  <span className="text-xs text-neutral-500">
                    {formatMonthYear(latestProject.publishedAt)}
                  </span>
                </div>

                <ProjectVisual
                  title={latestProject.title}
                  slug={latestProject.slug}
                  imageUrl={latestProjectCover}
                  heightClassName="h-64"
                />

                <div className="space-y-3">
                  <h2 className="font-display text-2xl text-white">
                    {latestProject.title}
                  </h2>
                  <p className="text-sm leading-7 text-neutral-300">
                    {latestProject.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {latestProject.stack.slice(0, 4).map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${latestProject.slug}`}
                    className="btn btn-primary"
                  >
                    Abrir proyecto
                  </Link>
                  <Link href="/projects" className="btn">
                    Ver todos
                  </Link>
                </div>
              </article>
            ) : (
              <div className="metric-card">
                <div className="metric-value">{publishedCount ?? "--"}</div>
                <div className="metric-label">Proyectos publicados</div>
                <p className="mt-4 text-sm leading-7 text-neutral-300">
                  Si la API no responde, este bloque queda vacio y el resto del
                  sitio mantiene la estructura.
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              <div className="metric-card">
                <div className="metric-value">{publishedCount ?? "--"}</div>
                <div className="metric-label">Publicados</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">API</div>
                <div className="metric-label">Datos reales</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">Admin</div>
                <div className="metric-label">Panel propio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {strengths.map((item) => (
          <article key={item.title} className="card card-hover reveal-up space-y-3">
            <p className="section-kicker">Enfoque</p>
            <h2 className="font-display text-2xl text-white">{item.title}</h2>
            <p className="text-sm leading-7 text-neutral-300">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <SectionHeading
          kicker="Proyectos"
          title="Algunos trabajos publicados"
          copy="Cada tarjeta se alimenta desde la API y muestra stack, resumen y accesos directos."
          align="between"
          action={
            <Link href="/projects" className="btn">
              Ver todos
            </Link>
          }
        />

        {featuredProjects.length > 0 ? (
          <div className="grid gap-6 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectPreviewCard
                key={project.slug}
                project={project}
                variant="feature"
              />
            ))}
          </div>
        ) : (
          <div className="card">
            <p className="text-sm leading-7 text-neutral-300">
              Si la API no responde, esta seccion no puede listar proyectos.
            </p>
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="card reveal-up space-y-5">
          <SectionHeading
            kicker="Forma de trabajo"
            title="Priorizo claridad tecnica y una base mantenible."
            copy="Me interesa que el proyecto se pueda leer, explicar y seguir creciendo sin rehacer todo."
          />

          <div className="space-y-4">
            {process.map((item, index) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/8 bg-black/20 p-5"
              >
                <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                  Paso {index + 1}
                </div>
                <p className="mt-3 text-sm leading-7 text-neutral-300">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card reveal-up delay-1 space-y-5">
          <SectionHeading
            kicker="Stack"
            title="Herramientas que uso seguido"
            copy="No busco cubrir todo: uso lo que necesito para resolver bien backend, persistencia y despliegue."
            align="between"
            action={
              <Link href="/contact" className="btn">
                Contacto
              </Link>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {tech.map((item) => (
              <div key={item.name} className="tech-tile">
                <RemoteImage src={item.src} alt={item.name} width={18} height={18} />
                <span className="text-sm text-neutral-200">{item.name}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="card hero-glow reveal-up flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="section-kicker">Recorrido</p>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Si queres ver el trabajo completo, lo mejor es pasar por proyectos.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-neutral-300">
            Ahi estan las descripciones, el stack y los enlaces disponibles.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            Ir a proyectos
          </Link>
          <Link href="/contact" className="btn">
            Contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
