import Link from "next/link";
import { ResumeDownloadLink } from "../components/ResumeDownloadLink";
import { SectionHeading } from "../components/SectionHeading";

const pillars = [
  {
    title: "Backend",
    desc: "Me siento mas comodo resolviendo modelado, seguridad, validaciones y errores en una API.",
  },
  {
    title: "Persistencia",
    desc: "Trabajo con JPA e Hibernate sobre PostgreSQL pensando consistencia, indices y consultas utiles.",
  },
  {
    title: "Frontend",
    desc: "Lo uso para presentar mejor el trabajo tecnico y para cerrar el recorrido del producto.",
  },
];

const focus = [
  "Java / Spring Boot",
  "Spring Security",
  "PostgreSQL / JPA 7 LteSQL",
  "Arquitectura por capas",
  "Manejo de errores",
  "Deploy en Railway / Vercel",
  "C#",
  "Python",
  "Unity",
];

const values = [
  "Codigo claro antes que soluciones rebuscadas.",
  "Base simple para poder iterar sin romper todo.",
  "Respuestas consistentes entre backend y frontend.",
];

export default function AboutPage() {
  return (
    <main className="space-y-10 md:space-y-12">
      <section className="spotlight-card hero-glow reveal-up">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-5">
            <SectionHeading
              kicker="Sobre mi"
              title="Estoy orientado sobre todo al backend con Java y Spring."
              copy="Soy Analista Programador Universitario en la UNLP y estudiante de Ingenieria en Computacion. Me interesa construir APIs prolijas, con validaciones claras y una base que se pueda mantener. El frontend lo uso para mostrar el trabajo de forma ordenada."
            />

            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-primary">
                Ver proyectos
              </Link>
              <ResumeDownloadLink className="btn">
                Descargar CV
              </ResumeDownloadLink>
              <Link href="/contact" className="btn">
                Contacto
              </Link>
            </div>
          </div>

          <div className="metric-card space-y-4">
            <div className="section-kicker">Lo que mas cuido</div>
            <ul className="space-y-3 text-sm leading-7 text-neutral-300">
              {values.map((item) => (
                <li
                  key={item}
                  className="border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {pillars.map((item) => (
          <article key={item.title} className="card card-hover reveal-up space-y-3">
            <p className="section-kicker">Area</p>
            <h2 className="font-display text-2xl text-white">{item.title}</h2>
            <p className="text-sm leading-7 text-neutral-300">{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="card reveal-up space-y-5">
          <SectionHeading
            kicker="Enfoque"
            title="Prefiero decisiones simples que se puedan justificar."
            copy="Cuando armo un proyecto trato de que cada capa tenga un motivo claro: dominio, persistencia, servicio y presentacion."
          />
        </article>

        <article className="card reveal-up delay-1 space-y-5">
          <SectionHeading
            kicker="Tecnologias"
            title="Practicas y herramientas que vengo usando."
          />
          <div className="flex flex-wrap gap-2">
            {focus.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="card hero-glow reveal-up flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="section-kicker">Siguiente paso</p>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            La mejor forma de ver todo eso aplicado es entrando a proyectos.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary">
            Ir a proyectos
          </Link>
          <ResumeDownloadLink className="btn">
            Descargar CV
          </ResumeDownloadLink>
          <Link href="/contact" className="btn">
            Contactarme
          </Link>
        </div>
      </section>
    </main>
  );
}
