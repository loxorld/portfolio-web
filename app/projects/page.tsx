import Link from "next/link";
import { fetchProjects } from "@/lib/api";
import { ProjectPreviewCard } from "../components/ProjectPreviewCard";
import { SectionHeading } from "../components/SectionHeading";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function normalizeTag(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const tag = rawValue?.trim();

  return tag ? tag : null;
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeTag = normalizeTag(resolvedSearchParams.tag);
  const allProjects = await fetchProjects();
  const data = activeTag ? await fetchProjects({ tag: activeTag }) : allProjects;
  const featuredTags = Array.from(
    new Set(allProjects.items.flatMap((project) => project.tags)),
  ).slice(0, 10);
  const headingCopy = activeTag
    ? `Filtrado por ${activeTag}. Se muestran solo los proyectos publicados con esa etiqueta.`
    : "Podes filtrar por etiquetas para recorrer el portfolio por tecnologia o tipo de trabajo.";

  return (
    <main className="space-y-8 md:space-y-10">
      <section className="spotlight-card hero-glow reveal-up">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div className="space-y-5">
            <SectionHeading
              kicker="Proyectos"
              title="Listado de proyectos publicados desde mi API."
              copy={headingCopy}
            />

            {featuredTags.length > 0 ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/projects"
                    className={`filter-chip ${activeTag ? "" : "filter-chip-active"}`}
                  >
                    Todos
                  </Link>
                  {featuredTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/projects?tag=${encodeURIComponent(tag)}`}
                      className={`filter-chip ${
                        activeTag === tag ? "filter-chip-active" : ""
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                <p className="text-sm leading-7 text-neutral-400">
                  {activeTag
                    ? `Mostrando ${data.totalItems} proyecto(s) para "${activeTag}".`
                    : "Los filtros se resuelven contra la API para mantener el mismo recorrido que en produccion."}
                </p>
              </div>
            ) : null}
          </div>

          <div className="metric-card min-w-56">
            <div className="metric-value">{data.totalItems}</div>
            <div className="metric-label">
              {activeTag ? "Resultados" : "Publicados"}
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-300">
              {activeTag
                ? "Si cambias la etiqueta, la lista vuelve a consultarse a la API."
                : "Ordenados por fecha y listos para recorrer desde el portfolio."}
            </p>
          </div>
        </div>
      </section>

      {data.items.length > 0 ? (
        <section className="grid gap-6 xl:grid-cols-2">
          {data.items.map((project) => (
            <ProjectPreviewCard key={project.slug} project={project} />
          ))}
        </section>
      ) : (
        <section className="card reveal-up space-y-4">
          <SectionHeading
            kicker="Sin resultados"
            title="No hay proyectos para esta etiqueta."
            copy="Podes volver al listado completo o probar otra."
          />

          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              Ver todos los proyectos
            </Link>
            <Link href="/contact" className="btn">
              Contacto
            </Link>
          </div>
        </section>
      )}

      <section className="card reveal-up flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="section-kicker">Mas informacion</p>
          <h2 className="font-display text-3xl text-white">
            Tambien podes pasar por Sobre mi o Contacto.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/about" className="btn">
            Sobre mi
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
