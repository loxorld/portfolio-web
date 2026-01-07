import Link from "next/link";

export default function NotFound() {
  return (
    <main className="rounded-2xl border p-8">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="mt-2 text-sm text-neutral-700">La página no existe o el proyecto no está publicado.</p>
      <Link className="mt-6 inline-block text-sm underline" href="/projects">
        Volver a proyectos
      </Link>
    </main>
  );
}
