"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ClipReveal } from "@/components/ClipReveal";
import { Marquee } from "@/components/fx/Marquee";
import { Lightbox } from "@/components/Lightbox";
import { getFeaturedProjects } from "@/content/projects";
import type { Category, Project } from "@/types/content";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";

const CATEGORY_ORDER: Category[] = [
  "deporte",
  "surf",
  "real-estate",
  "gastronomia",
  "estetica",
  "estudio",
  "marca",
];

type Filter = Category | "all";

export function Portfolio() {
  const { t } = useLang();
  const projects = getFeaturedProjects();
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  // Solo categorías que tienen proyectos, en orden.
  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [projects]);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  const tabClass = (selected: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
      selected ? "bg-sf-red text-sf-white" : "bg-sf-gray-200 text-sf-gray-700 hover:bg-sf-gray-300"
    );

  return (
    <section id="portfolio" className="bg-sf-white pt-[clamp(4rem,10vw,8rem)]">
      <Container>
        <Reveal className="mb-8 max-w-2xl md:mb-10">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
            {t.portfolio.overline}
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
            {t.portfolio.heading}
          </h2>
          <p className="mt-4 text-lg text-sf-gray-700">{t.portfolio.intro}</p>
        </Reveal>

        {/* Filtro por categoría */}
        <Reveal className="mb-8 flex flex-wrap gap-2 md:mb-12">
          <button type="button" onClick={() => setFilter("all")} className={tabClass(filter === "all")}>
            {t.portfolio.all}
          </button>
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setFilter(c)} className={tabClass(filter === c)}>
              {t.categories[c]}
            </button>
          ))}
        </Reveal>

        {/* Grilla (key por filtro: re-monta y vuelve a revelar) */}
        <div
          key={filter}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {visible.map((project, i) => (
            <ClipReveal key={project.slug} delay={Math.min(i * 0.05, 0.4)}>
              <ProjectCard project={project} index={i + 1} onOpen={() => setActive(project)} />
            </ClipReveal>
          ))}
        </div>
      </Container>

      {/* Marquee de categorías */}
      <div className="mt-[clamp(4rem,10vw,8rem)]">
        <Marquee items={categories.map((c) => t.categories[c])} />
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
