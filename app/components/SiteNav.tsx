"use client";

import { useEffect, useState } from "react";
import { NavLink } from "./NavLink";

const internalLinks = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Sobre mi" },
  { href: "/contact", label: "Contacto" },
];

const externalLinks = [
  { href: "https://github.com/loxorld", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/brian-la-delfa-349a8a230/",
    label: "LinkedIn",
  },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="header-nav" aria-label="Navegacion principal">
      <div className="hidden items-center gap-2 md:flex">
        {internalLinks.map((item) => (
          <span key={item.href} className="nav-item-shell">
            <NavLink href={item.href}>{item.label}</NavLink>
          </span>
        ))}

        {externalLinks.map((item) => (
          <a
            key={item.href}
            className="nav-item-shell nav-link"
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="relative md:hidden">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-site-nav"
          onClick={() => setOpen((currentValue) => !currentValue)}
        >
          Menu
        </button>

        {open ? (
          <>
            <button
              type="button"
              className="nav-backdrop"
              aria-label="Cerrar menu"
              onClick={closeMenu}
            />

            <div id="mobile-site-nav" className="nav-dropdown nav-dropdown-mobile">
              {internalLinks.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className="nav-dropdown-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}

              {externalLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link nav-dropdown-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}
