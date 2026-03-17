import type { AnchorHTMLAttributes, ReactNode } from "react";
import { profile } from "@/lib/profile";

type ResumeDownloadLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "download"
> & {
  children?: ReactNode;
};

export function ResumeDownloadLink({
  children = "Descargar CV",
  ...props
}: ResumeDownloadLinkProps) {
  return (
    <a href={profile.resumeHref} download={profile.resumeFileName} {...props}>
      {children}
    </a>
  );
}
