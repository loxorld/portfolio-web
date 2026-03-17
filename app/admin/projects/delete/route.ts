import { AdminApiError, deleteAdminProject } from "@/lib/admin-api";
import { getAdminSession } from "@/lib/admin-session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const slug = String(formData.get("slug") ?? "").trim();

  if (!slug) {
    const url = new URL("/admin/projects", request.url);
    url.searchParams.set("error", "Falta indicar que proyecto borrar.");
    return NextResponse.redirect(url, 303);
  }

  try {
    await deleteAdminProject(slug);

    const url = new URL("/admin/projects", request.url);
    url.searchParams.set("success", "Proyecto borrado.");
    return NextResponse.redirect(url, 303);
  } catch (caughtError) {
    const message =
      caughtError instanceof AdminApiError || caughtError instanceof Error
        ? caughtError.message
        : "No se pudo borrar el proyecto.";

    const url = new URL(`/admin/projects/${encodeURIComponent(slug)}`, request.url);
    url.searchParams.set("error", message);
    return NextResponse.redirect(url, 303);
  }
}
