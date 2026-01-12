import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { NavLink } from "./components/NavLink";

export const metadata: Metadata = {
  title: "Brian — Portfolio",
  description: "Portfolio profesional: proyectos, stack y contacto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="page-bg" aria-hidden="true" />
        <header className="relative z-50 border-b border-neutral-800 bg-neutral-950/60 backdrop-blur">
          <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/avatar.jpg"
                alt="Foto de Brian"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-neutral-800 object-cover"
                priority
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-neutral-100">
                  Brian La Delfa 
                </div>
                <div className="text-xs text-neutral-400">
                  Java · Spring Boot · Next.js
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-2 text-sm">
              <div className="hidden items-center gap-2 md:flex">
                <span className="nav-item">
                  <NavLink href="/">Home</NavLink>
                </span>

              <span className="nav-item">
                  <NavLink href="/projects">Projects</NavLink>
                </span>
              
                <span className="nav-item">
                  <NavLink href="/about">About</NavLink>
                </span>

              <span className="nav-item">
                  <NavLink href="/contact">Contact</NavLink>
                </span>

              <a
                  className="nav-item text-neutral-200 hover:text-white"
                  href="https://github.com/loxorld"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

              <a
                  className="nav-item text-neutral-200 hover:text-white"
                  href="https://www.linkedin.com/in/brian-la-delfa-349a8a230/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>

              <details className="relative md:hidden">
                <summary className="nav-item cursor-pointer">Menu</summary>
                <div className="nav-dropdown">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/projects">Projects</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                  <a href="https://github.com/loxorld" target="_blank" rel="noreferrer">
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

        <main className="container py-10">{children}</main>

        <footer className="container pb-10">
          <div className="border-t border-neutral-800 pt-6 text-xs text-neutral-400">
            © {new Date().getFullYear()} Brian La Delfa · Next.js + Spring Boot
          </div>
        </footer>
      </body>
    </html>
  );
}
