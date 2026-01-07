import Link from "next/link";
import { fetchProject } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const project = await fetchProject(slug);

    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link className="text-sm text-neutral-600 hover:underline" href="/projects">
          ← Volver
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">{project.title}</h1>
        <p className="mt-2 text-sm text-neutral-700">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
            >
              {t}
            </span>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-medium">Descripción</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-800">
            {project.description}
          </p>
        </section>

        <div className="mt-10 flex gap-3">
          {project.repoUrl && (
            <a
              className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
          )}
          {project.demoUrl && (
            <a
              className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </a>
          )}
        </div>
      </main>
    );
  } catch (e) {
    // Si tu API devuelve 404, mostramos página 404 de Next
    notFound();
  }
}
