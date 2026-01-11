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
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Projects
      </h1>

      <div className="mt-6 card">
        <p className="text-sm text-neutral-200">
          No se pudieron cargar los proyectos.
        </p>

        <p className="mt-2 text-sm muted">
          Si la API está en mantenimiento o caída, esta sección no va a poder
          traer datos. Probá reintentar.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => reset()}>
            Reintentar
          </button>

          <Link className="btn" href="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
