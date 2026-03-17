export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8085";

export type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string | null;
  tags: string[];
  stack: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  coverImageUrl: string | null;
};

export type PageResponse<T> = {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  publishedAt: string | null;
  tags: string[];
  stack: string[];
  imageUrls: string[];
  demoUrl: string | null;
  repoUrl: string | null;
};

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function getJson<T>(url: string): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, { cache: "no-store" });
  } catch {
    throw new ApiError("No se pudo conectar con la API.");
  }

  if (!res.ok) {
    throw new ApiError("La API respondio con error.", res.status);
  }

  return (await res.json()) as T;
}

export function fetchProjects(options?: { tag?: string }) {
  const params = new URLSearchParams();
  if (options?.tag) {
    params.set("tag", options.tag);
  }

  const query = params.toString();
  const suffix = query ? `?${query}` : "";

  return getJson<PageResponse<ProjectSummary>>(`${API_BASE_URL}/api/projects${suffix}`);
}

export function fetchProject(slug: string) {
  return getJson<ProjectDetail>(`${API_BASE_URL}/api/projects/${encodeURIComponent(slug)}`);
}
