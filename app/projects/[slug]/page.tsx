import Link from "next/link";
import { fetchProject, ApiError } from "@/lib/api";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    const project = await fetchProject(slug);

    return (
      <main className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          className="text-sm text-neutral-300 hover:text-white hover:underline"
          href="/projects"
        >
          ← Volver
        </Link>

        {/* Header */}
        <header className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="mt-2 text-sm muted">{project.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.publishedAt && (
              <span className="text-xs subtle">
                {project.publishedAt.slice(0, 10)}
              </span>
            )}

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Cover / gallery */}
        {project.imageUrls?.length > 0 && (
          <section className="mt-8">
            <img
              src={project.imageUrls[0]}
              alt={`Imagen principal de ${project.title}`}
              className="h-64 w-full rounded-2xl border border-neutral-800 object-cover"
              loading="lazy"
            />

            {project.imageUrls.length > 1 && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {project.imageUrls.slice(1).map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Screenshot del proyecto"
                    className="h-48 w-full rounded-xl border border-neutral-800 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Stack */}
        <section className="mt-8 card">
          <h2 className="text-sm font-semibold text-white">Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="mt-6 card">
          <h2 className="text-sm font-semibold text-white">Descripción</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm muted">
            {project.description}
          </p>
        </section>

        {/* Links */}
        <section className="mt-6 flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              className="btn"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
          )}
          {project.demoUrl && (
            <a
              className="btn btn-primary"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
          )}
        </section>
      </main>
    );
  } catch (e) {
    // ✅ Si realmente es 404 (no existe / no publicado), muestro la 404 de Next
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }

    // Para cualquier otro error (network, 500, 403, etc.)
    // no lo disfrazamos de 404: dejamos que lo maneje error.tsx de [slug]
    throw e;
  }
}
