"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/fx/Marquee";
import { getFeaturedProjects } from "@/content/projects";
import { clipReveal, revealOnce, staggerContainer } from "@/lib/motion";

const MARQUEE_ITEMS = [
  "Deporte",
  "Surf",
  "Real Estate",
  "Gastronomía",
  "Estudio",
  "Marcas",
];

export function Portfolio() {
  const projects = getFeaturedProjects();
  const [feature, ...rest] = projects;

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

        {/* Pieza destacada (asimétrica) */}
        {feature && (
          <Reveal className="mb-5 h-[60vh] min-h-[380px]">
            <ProjectCard project={feature} index={1} featured />
          </Reveal>
        )}

        {/* Grilla del resto */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={revealOnce.initial}
          whileInView={revealOnce.whileInView}
          viewport={revealOnce.viewport}
        >
          {rest.map((project, i) => (
            <motion.div key={project.slug} variants={clipReveal}>
              <ProjectCard project={project} index={i + 2} />
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Marquee de categorías */}
      <div className="mt-[clamp(4rem,10vw,8rem)]">
        <Marquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
}
