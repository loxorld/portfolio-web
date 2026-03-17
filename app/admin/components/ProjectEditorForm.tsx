import Link from "next/link";
import type { AdminProjectDetail } from "@/lib/admin-api";

type ProjectEditorFormProps = {
  mode: "create" | "update";
  project?: AdminProjectDetail;
  error?: string;
  success?: string;
};

function toTextareaValue(values: string[]) {
  return values.join("\n");
}

function toDateTimeLocal(value: string | null) {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const local = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function ProjectEditorForm({
  mode,
  project,
  error,
  success,
}: ProjectEditorFormProps) {
  const currentStatus = project?.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

  return (
    <section className="card space-y-6">
      {(error || success) && (
        <div className={error ? "callout callout-error" : "callout callout-success"}>
          {error ?? success}
        </div>
      )}

      {project && (
        <div className="grid gap-3 text-xs subtle md:grid-cols-3">
          <div>
            <div className="field-label">Estado actual</div>
            <div className="mt-1">
              <span
                className={`status-badge ${
                  project.status === "PUBLISHED"
                    ? "status-badge-published"
                    : "status-badge-draft"
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>
          <div>
            <div className="field-label">Creado</div>
            <div className="mt-1 text-sm text-neutral-200">
              {formatTimestamp(project.createdAt)}
            </div>
          </div>
          <div>
            <div className="field-label">Ultima edicion</div>
            <div className="mt-1 text-sm text-neutral-200">
              {formatTimestamp(project.updatedAt)}
            </div>
          </div>
        </div>
      )}

      <form action="/admin/projects/save" method="post" className="space-y-6">
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="previousSlug" value={project?.slug ?? ""} />
        <input
          type="hidden"
          name="currentPublishedAt"
          value={project?.publishedAt ?? ""}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span className="field-label">Slug</span>
            <input
              className="field-input"
              name="slug"
              type="text"
              defaultValue={project?.slug ?? ""}
              placeholder="sistema-de-stock"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Titulo</span>
            <input
              className="field-input"
              name="title"
              type="text"
              defaultValue={project?.title ?? ""}
              placeholder="Sistema de stock"
              required
            />
          </label>
        </div>

        <label className="field">
          <span className="field-label">Resumen</span>
          <textarea
            className="field-textarea"
            name="summary"
            defaultValue={project?.summary ?? ""}
            placeholder="Resumen corto para la tarjeta del proyecto."
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Descripcion</span>
          <textarea
            className="field-textarea min-h-40"
            name="description"
            defaultValue={project?.description ?? ""}
            placeholder="Explicacion mas completa del proyecto."
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span className="field-label">Tags</span>
            <textarea
              className="field-textarea"
              name="tags"
              defaultValue={toTextareaValue(project?.tags ?? [])}
              placeholder={"backend\nportfolio"}
            />
          </label>

          <label className="field">
            <span className="field-label">Stack</span>
            <textarea
              className="field-textarea"
              name="stack"
              defaultValue={toTextareaValue(project?.stack ?? [])}
              placeholder={"Java\nSpring Boot\nPostgreSQL"}
              required
            />
          </label>
        </div>

        <label className="field">
          <span className="field-label">Imagenes</span>
          <textarea
            className="field-textarea"
            name="imageUrls"
            defaultValue={toTextareaValue(project?.imageUrls ?? [])}
            placeholder={
              "https://example.com/captura-1.png\nhttps://example.com/captura-2.png"
            }
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span className="field-label">Repo URL</span>
            <input
              className="field-input"
              name="repoUrl"
              type="url"
              defaultValue={project?.repoUrl ?? ""}
              placeholder="https://github.com/..."
            />
          </label>

          <label className="field">
            <span className="field-label">Demo URL</span>
            <input
              className="field-input"
              name="demoUrl"
              type="url"
              defaultValue={project?.demoUrl ?? ""}
              placeholder="https://example.com"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span className="field-label">Estado</span>
            <select
              className="field-input"
              name="status"
              defaultValue={currentStatus}
            >
              <option value="DRAFT">Borrador</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </label>

          <label className="field">
            <span className="field-label">Publicado en</span>
            <input
              className="field-input"
              name="publishedAt"
              type="datetime-local"
              defaultValue={toDateTimeLocal(project?.publishedAt ?? null)}
            />
            <span className="text-xs subtle">
              Si queda vacio y el estado es Published, se usa la fecha actual.
            </span>
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" type="submit">
            {mode === "create" ? "Crear proyecto" : "Guardar cambios"}
          </button>
          <Link className="btn" href="/admin/projects">
            Volver al panel
          </Link>
        </div>
      </form>
    </section>
  );
}
