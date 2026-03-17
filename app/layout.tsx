import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { NavLink } from "./components/NavLink";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Brian La Delfa | Backend Portfolio",
  description:
    "Portfolio de proyectos backend y full stack con Java, Spring Boot, PostgreSQL y Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <div className="page-bg" aria-hidden="true" />

        <header className="site-header">
          <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/avatar.jpg"
                alt="Foto de Brian"
                width={48}
                height={48}
                className="h-12 w-12 rounded-2xl border border-white/10 object-cover shadow-[0_12px_30px_-18px_rgba(89,197,255,0.7)]"
                priority
              />

              <div className="leading-tight">
                <div className="font-display text-base font-semibold tracking-tight text-neutral-100">
                  Brian La Delfa
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Analista Programador Universitario - UNLP
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-2 text-sm">
              <div className="hidden items-center gap-2 md:flex">
                <span className="nav-item-shell">
                  <NavLink href="/">Inicio</NavLink>
                </span>
                <span className="nav-item-shell">
                  <NavLink href="/projects">Proyectos</NavLink>
                </span>
                <span className="nav-item-shell">
                  <NavLink href="/about">Sobre mi</NavLink>
                </span>
                <span className="nav-item-shell">
                  <NavLink href="/contact">Contacto</NavLink>
                </span>
                <a
                  className="nav-item-shell nav-link"
                  href="https://github.com/loxorld"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="nav-item-shell nav-link"
                  href="https://www.linkedin.com/in/brian-la-delfa-349a8a230/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>

              <details className="relative md:hidden">
                <summary className="nav-item-shell nav-link cursor-pointer list-none">
                  Menu
                </summary>
                <div className="nav-dropdown">
                  <NavLink href="/">Inicio</NavLink>
                  <NavLink href="/projects">Proyectos</NavLink>
                  <NavLink href="/about">Sobre mi</NavLink>
                  <NavLink href="/contact">Contacto</NavLink>
                  <a
                    href="https://github.com/loxorld"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/brian-la-delfa-349a8a230/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </details>
            </nav>
          </div>
        </header>

        <main className="container py-12 md:py-16">{children}</main>

        <footer className="container pb-10">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="font-display text-sm text-neutral-200">
                Brian La Delfa
              </div>
              <div>Portfolio hecho con Next.js y una API propia en Spring Boot.</div>
            </div>

            <Link
              href="/admin"
              className="text-[10px] uppercase tracking-[0.24em] text-neutral-600 transition hover:text-neutral-300"
            >
              Admin
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
