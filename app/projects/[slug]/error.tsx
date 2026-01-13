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
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Project
      </h1>

      <div className="mt-6 card">
        <p className="text-sm text-neutral-200">
          No se pudo cargar el proyecto.
        </p>

        <p className="mt-2 text-sm muted">
          Esto suele pasar si la API está caída, lenta o bloqueó la request por
          un tema temporal. Probá reintentar.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={() => reset()}>
            Reintentar
          </button>

          <Link className="btn" href="/projects">
            Volver a Projects
          </Link>
        </div>

        <p className="mt-6 text-xs subtle">
          (Si esto pasa en producción, mirar los logs de Vercel para ver el error real.)
        </p>
      </div>
    </main>
  );
}
