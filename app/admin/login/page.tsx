import { getAdminSession, getAdminSetupErrors } from "@/lib/admin-session";
import { redirect } from "next/navigation";

type SearchParams = Promise<{
  error?: string | string[];
  loggedOut?: string | string[];
}>;

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin/projects");
  }

  const params = await searchParams;
  const error = getFirstParam(params.error);
  const loggedOut = getFirstParam(params.loggedOut);
  const setupErrors = getAdminSetupErrors();

  return (
    <main className="mx-auto max-w-xl">
      <section className="card hero-glow space-y-6 p-8">
        <div>
          <p className="subtle text-sm">Admin</p>
          <h1 className="hero-title mt-3 text-3xl font-semibold tracking-tight">
            Acceso al panel
          </h1>
          <p className="mt-3 text-sm muted">
            Panel privado para cargar y editar proyectos.
          </p>
        </div>

        {setupErrors.length > 0 && (
          <div className="callout callout-error">
            {setupErrors.join(" ")}
          </div>
        )}

        {error && <div className="callout callout-error">{error}</div>}
        {loggedOut && !error && (
          <div className="callout callout-success">Sesion cerrada.</div>
        )}

        <form action="/admin/auth/login" method="post" className="space-y-4">
          <label className="field">
            <span className="field-label">Usuario</span>
            <input
              className="field-input"
              name="username"
              type="text"
              placeholder="admin"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Contrasena</span>
            <input
              className="field-input"
              name="password"
              type="password"
              placeholder="********"
              required
            />
          </label>

          <button
            className="btn btn-primary w-full justify-center"
            type="submit"
            disabled={setupErrors.length > 0}
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  );
}
