"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ProjectDetailError({
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
        <p className="section-kicker">Proyecto</p>
        <h1 className="section-title hero-title">
          No se pudo cargar este proyecto.
        </h1>
        <p className="section-copy">
          Puede ser un problema temporal de la API o una respuesta incompleta.
          Podes reintentar o volver al listado.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => reset()}>
            Reintentar
          </button>
          <Link className="btn" href="/projects">
            Volver a proyectos
          </Link>
        </div>
      </section>
    </main>
  );
}
