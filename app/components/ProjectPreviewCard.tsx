import Link from "next/link";
import type { ProjectSummary } from "@/lib/api";
import { getPreferredProjectCover } from "@/lib/project-media";
import {
  getProjectStageBadgeClass,
  getProjectStageLabel,
} from "@/lib/project-stage";
import { ProjectVisual } from "./ProjectVisual";

type ProjectPreviewCardProps = {
  project: ProjectSummary;
  variant?: "feature" | "grid";
};

function formatDate(value: string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function ProjectPreviewCard({
  project,
  variant = "grid",
}: ProjectPreviewCardProps) {
  const projectHref = `/projects/${project.slug}`;
  const preferredCover = getPreferredProjectCover(
    project.slug,
    project.coverImageUrl,
  );
  const imageHeightClassName = variant === "feature" ? "h-64" : "h-56";
  const titleClassName =
    variant === "feature"
      ? "font-display text-3xl text-white"
      : "font-display text-2xl text-white";

  return (
    <article className="project-card reveal-up flex h-full cursor-pointer flex-col gap-5">
      <Link
        href={projectHref}
        aria-label={`Abrir detalles de ${project.title}`}
        className="absolute inset-0 z-10 rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      />

      <ProjectVisual
        title={project.title}
        slug={project.slug}
        imageUrl={preferredCover}
        heightClassName={imageHeightClassName}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={getProjectStageBadgeClass(project.stage)}>
                {getProjectStageLabel(project.stage)}
              </span>
              <span className="text-xs text-neutral-500">
                {project.stack.length} tecnologias
              </span>
            </div>

            <div className="section-kicker text-cyan-100/70">
              {formatDate(project.publishedAt)}
            </div>

            <h3 className={titleClassName}>{project.title}</h3>
            <p className="text-sm leading-7 text-neutral-300">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, variant === "feature" ? 4 : 6).map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-20 mt-auto flex flex-wrap gap-3">
        <span aria-hidden="true" className="btn btn-primary">
          Ver detalle
        </span>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn pointer-events-auto"
          >
            Repo
          </a>
        ) : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn pointer-events-auto"
          >
            Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
