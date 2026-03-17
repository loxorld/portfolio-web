import Link from "next/link";
import {
  fetchProject,
  fetchProjects,
  type ProjectSummary,
  ApiError,
} from "@/lib/api";
import {
  getPreferredProjectCover,
  getPreferredProjectGallery,
} from "@/lib/project-media";
import { notFound } from "next/navigation";
import { ProjectVisual } from "../../components/ProjectVisual";
import { RemoteImage } from "../../components/RemoteImage";
import { SectionHeading } from "../../components/SectionHeading";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(value: string | null) {
  if (!value) {
    return "No publicada";
  }

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
  }).format(new Date(value));
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

function RelatedProjectCard({
  label,
  project,
}: {
  label: string;
  project: ProjectSummary;
}) {
  const cover = getPreferredProjectCover(project.slug, project.coverImageUrl);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-nav-card reveal-up flex h-full flex-col gap-5"
    >
      <div className="space-y-2">
        <p className="section-kicker">{label}</p>
        <h2 className="font-display text-2xl text-white">{project.title}</h2>
        <p className="text-sm leading-7 text-neutral-300">{project.summary}</p>
      </div>

      <ProjectVisual
        title={project.title}
        slug={project.slug}
        imageUrl={cover}
        heightClassName="h-44"
      />

      <div className="mt-auto flex flex-wrap gap-2">
        {project.stack.slice(0, 3).map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [projectResult, allProjectsResult] = await Promise.allSettled([
    fetchProject(slug),
    fetchProjects(),
  ]);

  if (projectResult.status === "rejected") {
    const error = projectResult.reason;

    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const project = projectResult.value;
  const preferredGallery = getPreferredProjectGallery(
    project.slug,
    project.imageUrls,
  );
  const primaryVisual =
    preferredGallery[0] ?? getPreferredProjectCover(project.slug, null);
  const gallery = primaryVisual ? preferredGallery.slice(1) : preferredGallery;
  const allProjects =
    allProjectsResult.status === "fulfilled" ? allProjectsResult.value.items : [];
  const currentIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 ? allProjects[currentIndex + 1] : null;
  const signals = [
    project.repoUrl ? "Repo publico" : null,
    project.demoUrl ? "Demo disponible" : null,
    preferredGallery.length > 0 ? "Galeria cargada" : null,
    project.stack.length > 0 ? `${project.stack.length} tecnologias` : null,
  ].filter(Boolean) as string[];

  return (
    <main className="mx-auto max-w-6xl space-y-8 md:space-y-10">
      <Link
        className="inline-flex items-center text-sm text-neutral-300 transition hover:text-white"
        href="/projects"
      >
        Volver a proyectos
      </Link>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="spotlight-card hero-glow reveal-up space-y-6">
          <SectionHeading kicker="Proyecto" title={project.title} copy={project.summary} />

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
            {project.tags.length === 0
              ? project.stack.slice(0, 4).map((item) => <Pill key={item}>{item}</Pill>)
              : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {signals.map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-neutral-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="card reveal-up delay-1 space-y-6 xl:sticky xl:top-28 xl:self-start">
          <div>
            <p className="section-kicker">Resumen</p>
            <h2 className="font-display mt-3 text-2xl text-white">
              Datos rapidos
            </h2>
          </div>

          <div className="info-list">
            <div className="info-row">
              <span className="text-neutral-500">Publicado</span>
              <span className="text-right">{formatDate(project.publishedAt)}</span>
            </div>
            <div className="info-row">
              <span className="text-neutral-500">Slug</span>
              <span className="text-right">{project.slug}</span>
            </div>
            <div className="info-row">
              <span className="text-neutral-500">Stack</span>
              <span className="text-right">{project.stack.length} items</span>
            </div>
            <div className="info-row border-b-0 pb-0">
              <span className="text-neutral-500">Imagenes</span>
              <span className="text-right">{preferredGallery.length}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.repoUrl ? (
              <a
                className="btn"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                className="btn btn-primary"
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver demo
              </a>
            ) : null}
          </div>
        </aside>
      </section>

      {primaryVisual ? (
        <section className="space-y-5">
          <SectionHeading
            kicker="Imagen principal"
            title="Vista principal del proyecto"
          />

          {(() => {
            const lightboxId = `project-main-${project.slug}`;

            return (
              <>
                <a
                  className="block"
                  href={`#${lightboxId}`}
                  aria-label={`Abrir imagen completa de ${project.title}`}
                >
                  <ProjectVisual
                    title={project.title}
                    slug={project.slug}
                    imageUrl={primaryVisual}
                    heightClassName="h-[30rem]"
                  />
                </a>

                <div id={lightboxId} className="lightbox">
                  <a
                    href="#"
                    className="lightbox-backdrop"
                    aria-label={`Cerrar imagen de ${project.title}`}
                  />
                  <div className="lightbox-content">
                    <a href="#" className="lightbox-close">
                      Cerrar
                    </a>
                    <RemoteImage
                      src={primaryVisual}
                      alt={`Imagen principal de ${project.title}`}
                      className="lightbox-image"
                    />
                  </div>
                </div>
              </>
            );
          })()}
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <article className="card reveal-up space-y-4">
          <SectionHeading
            kicker="Descripcion"
            title="Que hace y como esta resuelto"
          />
          <p className="whitespace-pre-wrap text-sm leading-8 text-neutral-300">
            {project.description}
          </p>
        </article>

        <div className="space-y-6">
          <section className="card reveal-up delay-1 space-y-4">
            <SectionHeading kicker="Stack" title="Tecnologias" />
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </section>

          {project.tags.length > 0 ? (
            <section className="card reveal-up delay-2 space-y-4">
              <SectionHeading kicker="Etiquetas" title="Categorias" />
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="space-y-5">
          <SectionHeading kicker="Galeria" title="Capturas adicionales" />

          <div className="grid gap-4 md:grid-cols-2">
            {gallery.map((url, index) => {
              const lightboxId = `project-shot-${index}-${project.slug}`;

              return (
                <div key={url}>
                  <a
                    className="block"
                    href={`#${lightboxId}`}
                    aria-label="Abrir imagen completa del proyecto"
                  >
                    <ProjectVisual
                      title={`${project.title} captura ${index + 2}`}
                      slug={`${project.slug}-${index + 2}`}
                      imageUrl={url}
                      heightClassName="h-80"
                    />
                  </a>

                  <div id={lightboxId} className="lightbox">
                    <a
                      href="#"
                      className="lightbox-backdrop"
                      aria-label="Cerrar imagen del proyecto"
                    />
                    <div className="lightbox-content">
                      <a href="#" className="lightbox-close">
                        Cerrar
                      </a>
                      <RemoteImage
                        src={url}
                        alt="Captura del proyecto"
                        className="lightbox-image"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {previousProject || nextProject ? (
        <section className="space-y-5">
          <SectionHeading
            kicker="Mas proyectos"
            title="Seguir viendo otros proyectos"
            copy="Si queres seguir recorriendo el portfolio, aca tenes el anterior y el siguiente."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {previousProject ? (
              <RelatedProjectCard label="Anterior" project={previousProject} />
            ) : null}
            {nextProject ? (
              <RelatedProjectCard label="Siguiente" project={nextProject} />
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}
