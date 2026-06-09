"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ClipReveal } from "@/components/ClipReveal";
import { Marquee } from "@/components/fx/Marquee";
import { Lightbox } from "@/components/Lightbox";
import { getFeaturedProjects } from "@/content/projects";
import type { Project } from "@/types/content";

const MARQUEE_ITEMS = [
  "Deporte",
  "Surf",
  "Real Estate",
  "Gastronomía",
  "Estética",
  "Estudio",
  "Marcas",
];

export function Portfolio() {
  const projects = getFeaturedProjects();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="bg-sf-white pt-[clamp(4rem,10vw,8rem)]">
      <Container>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
            Portfolio
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
            Proyectos destacados
          </h2>
          <p className="mt-4 text-lg text-sf-gray-700">
            Deporte, surf, real estate y gastronomía. Que las imágenes hablen por sí solas.
          </p>
        </Reveal>

        {/* Grilla uniforme de tarjetas verticales (reveal POR tarjeta:
            confiable en mobile, donde el contenedor es más alto que el viewport) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ClipReveal key={project.slug}>
              <ProjectCard
                project={project}
                index={i + 1}
                onOpen={() => setActive(project)}
              />
            </ClipReveal>
          ))}
        </div>
      </Container>

      {/* Marquee de categorías */}
      <div className="mt-[clamp(4rem,10vw,8rem)]">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
