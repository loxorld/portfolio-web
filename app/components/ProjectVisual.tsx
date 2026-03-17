import { RemoteImage } from "./RemoteImage";

type ProjectVisualProps = {
  title: string;
  slug: string;
  imageUrl: string | null;
  heightClassName?: string;
};

function getMonogram(title: string) {
  return title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProjectVisual({
  title,
  slug,
  imageUrl,
  heightClassName = "h-56",
}: ProjectVisualProps) {
  return (
    <div className="project-cover">
      <div className="browser-bar">
        <div className="flex items-center gap-2">
          <span className="browser-dot bg-rose-300/90" />
          <span className="browser-dot bg-amber-300/90" />
          <span className="browser-dot bg-emerald-300/90" />
        </div>
        <div className="browser-label">portfolio/{slug}</div>
      </div>

      {imageUrl ? (
        <RemoteImage
          src={imageUrl}
          alt={`Vista de ${title}`}
          className={`project-cover-media ${heightClassName}`}
        />
      ) : (
        <div
          className={`project-placeholder flex items-end justify-between p-6 ${heightClassName}`}
        >
          <span className="project-monogram">{getMonogram(title)}</span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-300/70">
            {slug}
          </span>
        </div>
      )}
    </div>
  );
}
