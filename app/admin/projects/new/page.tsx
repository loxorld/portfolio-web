import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-session";
import { ProjectEditorForm } from "../../components/ProjectEditorForm";

type SearchParams = Promise<{
  error?: string | string[];
}>;

function getFirstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewAdminProjectPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdminSession();
  const params = await searchParams;
  const error = getFirstParam(params.error);

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="subtle text-sm">Admin</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Nuevo proyecto
          </h1>
        </div>
        <Link className="btn" href="/admin/projects">
          Volver al panel
        </Link>
      </div>

      <ProjectEditorForm mode="create" error={error} />
    </main>
  );
}
