"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { getFeaturedProjects } from "@/content/projects";
import { fadeUp, revealOnce, staggerContainer } from "@/lib/motion";

export function Portfolio() {
  const projects = getFeaturedProjects();

  return (
    <section id="portfolio" className="bg-sf-white py-[clamp(4rem,10vw,8rem)]">
      <Container>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
            Portfolio
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
            Proyectos destacados
          </h2>
          <p className="mt-4 text-lg text-sf-gray-700">
            Deporte, surf, real estate y gastronomía. Que las imágenes griten por sí solas.
          </p>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial={revealOnce.initial}
          whileInView={revealOnce.whileInView}
          viewport={revealOnce.viewport}
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
