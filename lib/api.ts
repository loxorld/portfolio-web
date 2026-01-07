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

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export function fetchProjects() {
  return getJson<PageResponse<ProjectSummary>>(`${API_BASE_URL}/api/projects`);
}

export function fetchProject(slug: string) {
  return getJson<ProjectDetail>(`${API_BASE_URL}/api/projects/${slug}`);
}
