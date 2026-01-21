import Link from "next/link";
import { fetchProjects } from "@/lib/api";


export const dynamic = "force-dynamic";
export const revalidate = 0;


export default async function ProjectsPage() {
  const data = await fetchProjects();

  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="hero-title text-3xl font-semibold tracking-tight">
        Projects
      </h1>
      <p className="mt-2 text-sm subtle">
        Proyectos publicados desde la API.
      </p>

      <ul className="mt-8 space-y-6">
        {data.items.map((p) => (
          <li
            key={p.slug}
            className="card transition hover:border-neutral-700"
          >
            {/* Imagen de portada */}
            {p.coverImageUrl && (() => {
              const lightboxId = `cover-${p.slug}`;
              return (
                <>
                  <a
                    className="mb-4 block overflow-hidden rounded-xl border border-neutral-800"
                    href={`#${lightboxId}`}
                    aria-label={`Abrir imagen completa de ${p.title}`}
                  >
                    <img
                      src={p.coverImageUrl}
                      alt={`Cover de ${p.title}`}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                    />
                  </a>
                  <div id={lightboxId} className="lightbox">
                    <a
                      href="#"
                      className="lightbox-backdrop"
                      aria-label={`Cerrar imagen de ${p.title}`}
                    />
                    <div className="lightbox-content">
                      <a href="#" className="lightbox-close">
                        Cerrar
                      </a>
                      <img
                        src={p.coverImageUrl}
                        alt={`Cover de ${p.title}`}
                        className="lightbox-image"
                      />
                    </div>
                  </div>
                </>
              );
            })()}

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium leading-snug">
                  <Link
                    className="text-white hover:underline"
                    href={`/projects/${p.slug}`}
                  >
                    {p.title}
                  </Link>
                </h2>

                <p className="mt-1 text-sm muted">
                  {p.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.slice(0, 6).map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-right text-xs subtle">
                {p.publishedAt ? p.publishedAt.slice(0, 10) : "—"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
