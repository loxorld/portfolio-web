import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brian — Portfolio",
  description: "Portfolio profesional: proyectos, stack y contacto.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-white text-neutral-900">
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-sm font-semibold">
              Brian
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link className="text-neutral-700 hover:text-neutral-900" href="/projects">
                Projects
              </Link>
              <a
                className="text-neutral-700 hover:text-neutral-900"
                href="https://github.com/TU_USUARIO"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="text-neutral-700 hover:text-neutral-900"
                href="https://www.linkedin.com/in/TU_PERFIL"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>

        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-neutral-600">
            © {new Date().getFullYear()} Brian. Built with Next.js + Spring Boot.
          </div>
        </footer>
      </body>
    </html>
  );
}
