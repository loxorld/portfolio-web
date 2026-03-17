export type PageResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type AdminProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type AdminProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  status: AdminProjectStatus;
  publishedAt: string | null;
  updatedAt: string;
};

export type AdminProjectDetail = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: AdminProjectStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  stack: string[];
  imageUrls: string[];
  demoUrl: string | null;
  repoUrl: string | null;
};

export type AdminProjectPayload = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  stack: string[];
  imageUrls: string[];
  repoUrl: string | null;
  demoUrl: string | null;
  publishedAt: string | null;
};

type SavedProjectResponse = {
  slug: string;
};

type ProblemDetail = {
  title?: string;
  detail?: string;
};

export class AdminApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8085"
  );
}

function getAdminToken() {
  const token = process.env.ADMIN_TOKEN?.trim();
  if (!token) {
    throw new Error("Falta ADMIN_TOKEN en el frontend.");
  }

  return token;
}

async function adminFetch<T>(path: string, init?: RequestInit) {
  let response: Response;

  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      cache: "no-store",
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Admin-Token": getAdminToken(),
        ...init?.headers,
      },
    });
  } catch {
    throw new AdminApiError("No se pudo conectar con la API admin.");
  }

  if (!response.ok) {
    let message = `La API devolvio ${response.status}.`;

    try {
      const problem = (await response.json()) as ProblemDetail;
      message = problem.detail ?? problem.title ?? message;
    } catch {}

    throw new AdminApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function fetchAdminProjects() {
  return adminFetch<PageResponse<AdminProjectSummary>>(
    "/api/admin/projects?size=100&sort=updatedAt,desc",
    { headers: { Accept: "application/json" } },
  );
}

export function fetchAdminProject(slug: string) {
  return adminFetch<AdminProjectDetail>(
    `/api/admin/projects/${encodeURIComponent(slug)}`,
    { headers: { Accept: "application/json" } },
  );
}

export function createAdminProject(payload: AdminProjectPayload) {
  return adminFetch<SavedProjectResponse>("/api/admin/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAdminProject(previousSlug: string, payload: AdminProjectPayload) {
  return adminFetch<SavedProjectResponse>(
    `/api/admin/projects/${encodeURIComponent(previousSlug)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
}

export function deleteAdminProject(slug: string) {
  return adminFetch<void>(`/api/admin/projects/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });
}
