import Link from "next/link";
import { fetchProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const data = await fetchProjects();

  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-white">Projects</h1>
      <p className="mt-2 text-sm subtle">Proyectos publicados desde la API.</p>

      <ul className="mt-8 space-y-4">
        {data.items.map((p) => (
          <li key={p.slug} className="card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">
                  <Link className="text-white hover:underline" href={`/projects/${p.slug}`}>
                    {p.title}
                  </Link>
                </h2>

                <p className="mt-1 text-sm muted">{p.summary}</p>

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
