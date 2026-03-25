import {
  AdminApiError,
  createAdminProject,
  updateAdminProject,
} from "@/lib/admin-api";
import { normalizeProjectStage, type ProjectStage } from "@/lib/project-stage";
import { getAdminSession } from "@/lib/admin-session";
import { NextResponse } from "next/server";

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalText(formData: FormData, key: string) {
  const value = getText(formData, key);
  return value || null;
}

function getList(formData: FormData, key: string) {
  const raw = getText(formData, key);
  if (!raw) {
    return [];
  }

  return Array.from(
    new Set(
      raw
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function normalizePublishedAt(formData: FormData) {
  const status = getText(formData, "status");
  if (status !== "PUBLISHED") {
    return null;
  }

  const rawPublishedAt = getText(formData, "publishedAt");
  if (!rawPublishedAt) {
    return getText(formData, "currentPublishedAt") || new Date().toISOString();
  }

  const parsed = new Date(rawPublishedAt);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("La fecha de publicacion no es valida.");
  }

  return parsed.toISOString();
}

function normalizeStage(formData: FormData): ProjectStage {
  const stage = getText(formData, "stage");
  if (!stage) {
    return "STABLE";
  }

  if (stage !== "STABLE" && stage !== "IN_DEVELOPMENT") {
    throw new Error("El avance del proyecto no es valido.");
  }

  return normalizeProjectStage(stage);
}

function buildEditorRedirect(request: Request, mode: string, slug: string, message: string) {
  const path =
    mode === "create"
      ? "/admin/projects/new"
      : `/admin/projects/${encodeURIComponent(slug)}`;
  const url = new URL(path, request.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, 303);
}

function buildPayload(formData: FormData) {
  const slug = getText(formData, "slug");
  const title = getText(formData, "title");
  const summary = getText(formData, "summary");
  const description = getText(formData, "description");
  const stack = getList(formData, "stack");

  if (!slug || !title || !summary || !description) {
    throw new Error("Slug, titulo, resumen y descripcion son obligatorios.");
  }

  if (stack.length === 0) {
    throw new Error("Carga al menos una tecnologia en Stack.");
  }

  return {
    slug,
    title,
    summary,
    description,
    tags: getList(formData, "tags"),
    stack,
    imageUrls: getList(formData, "imageUrls"),
    repoUrl: getOptionalText(formData, "repoUrl"),
    demoUrl: getOptionalText(formData, "demoUrl"),
    stage: normalizeStage(formData),
    publishedAt: normalizePublishedAt(formData),
  };
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const formData = await request.formData();
  const mode = getText(formData, "mode");
  const previousSlug = getText(formData, "previousSlug");

  try {
    const payload = buildPayload(formData);
    const saved =
      mode === "update"
        ? await updateAdminProject(previousSlug, payload)
        : await createAdminProject(payload);

    const url = new URL(
      `/admin/projects/${encodeURIComponent(saved.slug)}`,
      request.url,
    );
    url.searchParams.set("success", "Proyecto guardado.");
    return NextResponse.redirect(url, 303);
  } catch (caughtError) {
    const message =
      caughtError instanceof AdminApiError || caughtError instanceof Error
        ? caughtError.message
        : "No se pudo guardar el proyecto.";

    return buildEditorRedirect(
      request,
      mode,
      previousSlug || getText(formData, "slug"),
      message,
    );
  }
}
