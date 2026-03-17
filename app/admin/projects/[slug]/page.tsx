import { AdminApiError, fetchAdminProject } from "@/lib/admin-api";
import { requireAdminSession } from "@/lib/admin-session";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectEditorForm } from "../../components/ProjectEditorForm";

type PageParams = Promise<{
  slug: string;
}>;

type SearchParams = Promise<{
  error?: string | string[];
  success?: string | string[];
}>;

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditAdminProjectPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: SearchParams;
}) {
  await requireAdminSession();
  const { slug } = await params;
  const query = await searchParams;
  const error = getFirstParam(query.error);
  const success = getFirstParam(query.success);
  let project;

  try {
    project = await fetchAdminProject(slug);
  } catch (caughtError) {
    if (caughtError instanceof AdminApiError && caughtError.status === 404) {
      notFound();
    }

    throw caughtError;
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="subtle text-sm">Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Editar proyecto
          </h1>
          <p className="mt-2 text-sm muted">{project.slug}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.status === "PUBLISHED" && (
            <Link className="btn" href={`/projects/${project.slug}`}>
              Ver publico
            </Link>
          )}
          <Link className="btn" href="/admin/projects">
            Volver al panel
          </Link>
        </div>
      </div>

      <ProjectEditorForm
        mode="update"
        project={project}
        error={error}
        success={success}
      />

      <section className="card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Eliminar Proyecto</h2>
            <p className="mt-2 text-sm muted">
              Esto borra el proyecto definitivamente del portfolio.
            </p>
          </div>

          <form action="/admin/projects/delete" method="post">
            <input type="hidden" name="slug" value={project.slug} />
            <button
              className="btn border-red-400/30 text-red-100 hover:border-red-300/60 hover:bg-red-500/10"
              type="submit"
            >
              Borrar proyecto
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
