const projectMediaBySlug: Record<
  string,
  {
    cover?: string;
    gallery?: string[];
  }
> = {
  "portfolio-profesional": {
    cover: "/projects/portfolio-profesional/home.png",
    gallery: ["/projects/portfolio-profesional/home.png"],
  },
  "stock-manager": {
    cover: "/projects/stock-manager/dashboard.png",
    gallery: [
      "/projects/stock-manager/dashboard.png",
      "/projects/stock-manager/main.png",
      "/projects/stock-manager/register-movement.png",
    ],
  },
};

export function getPreferredProjectCover(slug: string, fallback: string | null) {
  return projectMediaBySlug[slug]?.cover ?? fallback;
}

export function getPreferredProjectGallery(slug: string, fallback: string[]) {
  const preferred = projectMediaBySlug[slug]?.gallery;
  return preferred && preferred.length > 0 ? preferred : fallback;
}
