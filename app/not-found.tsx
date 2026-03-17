import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl">
      <section className="spotlight-card hero-glow space-y-5">
        <p className="section-kicker">404</p>
        <h1 className="section-title hero-title">La pagina que buscas no existe.</h1>
        <p className="section-copy">
          Si era un proyecto, puede que no este publicado o que el slug haya
          cambiado.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/projects">
            Ver proyectos
          </Link>
          <Link className="btn" href="/">
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
