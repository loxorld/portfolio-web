export default function LoadingProjects() {
  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mt-2 text-sm text-neutral-600">Cargando…</p>

      <ul className="mt-8 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="h-24 rounded-xl border" />
        ))}
      </ul>
    </main>
  );
}
