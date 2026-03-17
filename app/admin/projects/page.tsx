import {
  AdminApiError,
  type AdminProjectSummary,
  fetchAdminProjects,
} from "@/lib/admin-api";
import { requireAdminSession } from "@/lib/admin-session";
import Link from "next/link";

type SearchParams = Promise<{
  success?: string | string[];
  error?: string | string[];
}>;

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatTimestamp(value: string | null) {
  if (!value) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusBadgeClass(status: AdminProjectSummary["status"]) {
  switch (status) {
    case "PUBLISHED":
      return "status-badge status-badge-published";
    case "ARCHIVED":
      return "status-badge status-badge-archived";
    default:
      return "status-badge status-badge-draft";
  }
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdminSession();
  const params = await searchParams;
  const success = getFirstParam(params.success);
  const error = getFirstParam(params.error);

  let projects: AdminProjectSummary[] = [];
  let fetchError: string | null = null;

  try {
    const data = await fetchAdminProjects();
    projects = data.items;
  } catch (caughtError) {
    fetchError =
      caughtError instanceof AdminApiError
        ? caughtError.message
        : "No se pudo cargar el panel admin.";
  }

  return (
    <main className="space-y-6">
      <section className="card hero-glow flex flex-col gap-4 p-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="subtle text-sm">Admin</p>
          <h1 className="hero-title mt-3 text-3xl font-semibold tracking-tight">
            Panel de proyectos
          </h1>
          <p className="mt-3 max-w-2xl text-sm muted">
            Crear, editar y borrar proyectos desde el panel.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/admin/projects/new">
            Nuevo proyecto
          </Link>
          <form action="/admin/logout" method="post">
            <button className="btn" type="submit">
              Cerrar sesion
            </button>
          </form>
        </div>
      </section>

      {success && <div className="callout callout-success">{success}</div>}
      {error && <div className="callout callout-error">{error}</div>}
      {fetchError && <div className="callout callout-error">{fetchError}</div>}

      {!fetchError && projects.length === 0 && (
        <section className="card">
          <h2 className="text-lg font-semibold text-white">
            Todavia no hay proyectos
          </h2>
          <p className="mt-2 text-sm muted">
            Crea uno desde el boton de arriba y aparecera aca.
          </p>
        </section>
      )}

      {!fetchError && projects.length > 0 && (
        <section className="grid gap-4">
          {projects.map((project) => (
            <article key={project.slug} className="card card-hover">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={statusBadgeClass(project.status)}>
                      {project.status}
                    </span>
                    <span className="text-xs subtle">{project.slug}</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {project.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm muted">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <Link className="btn btn-primary" href={`/admin/projects/${project.slug}`}>
                    Editar
                  </Link>
                  {project.status === "PUBLISHED" && (
                    <Link className="btn" href={`/projects/${project.slug}`}>
                      Ver publico
                    </Link>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-xs subtle md:grid-cols-2">
                <div>Publicado: {formatTimestamp(project.publishedAt)}</div>
                <div>Actualizado: {formatTimestamp(project.updatedAt)}</div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
