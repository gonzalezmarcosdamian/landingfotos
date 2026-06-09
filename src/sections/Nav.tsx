"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/fx/Magnetic";
import { LangToggle } from "@/components/LangToggle";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

export function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.about, href: "#sobre-mi" },
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-sf",
        scrolled || open ? "bg-sf-black/85 backdrop-blur-md" : "bg-gradient-to-b from-sf-black/40 to-transparent"
      )}
    >
      <Container className="flex items-center justify-between py-4">
        <Magnetic strength={0.3}>
          <a
            href="#home"
            className="font-display text-base font-extrabold uppercase tracking-tight text-sf-white"
          >
            Salt Frame<span className="text-sf-red">.</span>
          </a>
        </Magnetic>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[0.8rem] font-medium uppercase tracking-[0.12em] text-sf-white/80 transition-colors hover:text-sf-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-sf-red transition-transform duration-300 ease-sf group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
          <LangToggle className="ml-2" />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : t.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-sf-white md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-sf-white/10 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-[0.12em] text-sf-white/90"
              >
                {l.label}
              </a>
            ))}
            <LangToggle className="mt-2 py-3" />
          </Container>
        </nav>
      )}
    </header>
  );
}
