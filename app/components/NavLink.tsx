"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={
        active
          ? "text-white underline decoration-neutral-500 underline-offset-8"
          : "text-neutral-200 hover:text-white"
      }
    >
      {children}
    </Link>
  );
}
