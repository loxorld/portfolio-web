import Link from "next/link";
import { fetchProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const data = await fetchProjects();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Proyectos publicados desde la API.
      </p>

      <ul className="mt-8 space-y-4">
        {data.items.map((p) => (
          <li key={p.slug} className="rounded-xl border p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">
                  <Link className="hover:underline" href={`/projects/${p.slug}`}>
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-neutral-700">{p.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-right text-xs text-neutral-500">
                {p.publishedAt ? p.publishedAt.slice(0, 10) : "—"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
