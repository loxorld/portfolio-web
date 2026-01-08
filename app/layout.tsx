import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brian — Portfolio",
  description: "Portfolio profesional: proyectos, stack y contacto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b border-neutral-800">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/avatar.jpg"
                alt="Foto de Brian"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border border-neutral-800 object-cover"
                priority
              />
              <span className="text-sm font-semibold tracking-tight text-neutral-100">
                Brian
              </span>
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link className="text-neutral-200 hover:text-white" href="/projects">
                Projects
              </Link>
              <a
                className="text-neutral-200 hover:text-white"
                href="https://github.com/TU_USUARIO"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="text-neutral-200 hover:text-white"
                href="https://www.linkedin.com/in/TU_PERFIL"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </header>

        <main className="container py-10">{children}</main>

        {/* Footer angosto y alineado al contenido (no a toda la pantalla) */}
        <footer className="container pb-10">
          <div className="border-t border-neutral-800 pt-6 text-xs text-neutral-400">
            © {new Date().getFullYear()} Brian · Next.js + Spring Boot
          </div>
        </footer>
      </body>
    </html>
  );
}
