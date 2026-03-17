"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl">
      <section className="spotlight-card hero-glow space-y-5">
        <p className="section-kicker">Proyectos</p>
        <h1 className="section-title hero-title">
          No se pudieron cargar los proyectos.
        </h1>
        <p className="section-copy">
          Puede ser un problema temporal de la API. Podes reintentar o volver al
          inicio.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => reset()}>
            Reintentar
          </button>
          <Link className="btn" href="/">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
