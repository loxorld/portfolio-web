import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  copy?: string;
  action?: ReactNode;
  align?: "start" | "between";
};

export function SectionHeading({
  kicker,
  title,
  copy,
  action,
  align = "start",
}: SectionHeadingProps) {
  const wrapperClassName =
    align === "between"
      ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      : "space-y-3";

  return (
    <div className={wrapperClassName}>
      <div className="space-y-3">
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title text-3xl md:text-4xl">{title}</h2>
        {copy ? <p className="section-copy">{copy}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
