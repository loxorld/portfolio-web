import Link from "next/link";
import { SectionHeading } from "../components/SectionHeading";

const channels = [
  {
    label: "LinkedIn",
    value: "Brian La Delfa",
    href: "https://www.linkedin.com/in/brian-la-delfa-349a8a230/",
    note: "Es el canal mas rapido para coordinar una charla.",
  },
  {
    label: "GitHub",
    value: "loxorld",
    href: "https://github.com/loxorld",
    note: "Aca estan los repos y el codigo con mas contexto tecnico.",
  },
  {
    label: "Email",
    value: "brianlautaro@hotmail.com",
    href: "mailto:brianlautaro@hotmail.com",
    note: "Sirve para mensajes mas largos o propuestas puntuales.",
  },
];

const topics = [
  "Backend con Java y Spring Boot.",
  "APIs y paneles conectados a una base real.",
  "Mejoras tecnicas, despliegue y mantenimiento.",
];

export default function ContactPage() {
  return (
    <main className="space-y-10 md:space-y-12">
      <section className="spotlight-card hero-glow reveal-up">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-5">
            <SectionHeading
              kicker="Contacto"
              title="Si queres hablar de una propuesta o ver mas contexto, escribime."
              copy="LinkedIn suele ser lo mas rapido, pero tambien dejo GitHub y email por si preferis otra via."
            />

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/brian-la-delfa-349a8a230/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                LinkedIn
              </a>
              <a href="mailto:brianlautaro@hotmail.com" className="btn">
                Email
              </a>
              <Link href="/projects" className="btn">
                Ver proyectos
              </Link>
            </div>
          </div>

          <div className="metric-card">
            <div className="section-kicker">Temas</div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-300">
              {topics.map((item) => (
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

      <section className="grid gap-4 lg:grid-cols-3">
        {channels.map((channel) => (
          <article
            key={channel.label}
            className="card card-hover reveal-up flex h-full flex-col gap-4"
          >
            <div>
              <p className="section-kicker">{channel.label}</p>
              <h2 className="font-display mt-3 text-2xl text-white">
                {channel.value}
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-300">{channel.note}</p>

            <a
              className="btn mt-auto w-fit"
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              Abrir
            </a>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="card reveal-up space-y-4">
          <SectionHeading
            kicker="Disponibilidad"
            title="Busco seguir sumando experiencia en proyectos donde el backend tenga peso real."
            copy="Si necesitas alguien para armar o mejorar una API y dejarla bien presentada, ahi es donde mejor encajo."
          />
        </article>

        <article className="card reveal-up delay-1 space-y-4">
          <SectionHeading
            kicker="Antes de escribir"
            title="Si queres revisar antes como trabajo, pasa por proyectos."
            copy="Ahi estan los casos, el stack y los enlaces disponibles."
          />
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              Ir a proyectos
            </Link>
            <a
              href="https://github.com/loxorld"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Ver GitHub
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
