"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";
import type { Project } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";
import { cn } from "@/lib/cn";

/** Patrón de placeholder de marca cuando un proyecto aún no tiene foto real. */
function Placeholder({ project }: { project: Project }) {
  // Variación de tono según el orden para que la grilla no sea monótona.
  const dark = project.order % 2 === 0;
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden",
        dark ? "bg-sf-black" : "bg-sf-gray-900"
      )}
      aria-hidden="true"
    >
      {/* Acento diagonal de marca */}
      <div className="absolute -right-1/4 top-0 h-full w-1/2 rotate-12 bg-sf-red/10" />
      <div className="absolute left-6 top-6 h-px w-12 bg-sf-red" />
      <span className="font-display text-7xl font-extrabold text-sf-white/5 select-none">
        SF
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  featured = false,
  onOpen,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
  onOpen?: () => void;
}) {
  const TypeIcon = project.type === "video" ? Play : Camera;

  return (
    <motion.article
      data-cursor-label="Ver"
      role="button"
      tabIndex={0}
      aria-label={`Ver proyecto ${project.title}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.();
        }
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[2px] bg-sf-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sf-red",
        featured ? "h-full" : "aspect-[4/5]"
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt ?? project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-sf group-hover:scale-105"
        />
      ) : (
        <Placeholder project={project} />
      )}

      {/* Velo para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-sf-black/80 via-sf-black/10 to-transparent" />

      {/* Badge de tipo */}
      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-sf-black/50 px-3 py-1.5 backdrop-blur-sm">
        <TypeIcon className="h-3.5 w-3.5 text-sf-white" strokeWidth={2} />
        <span className="text-[0.7rem] font-medium uppercase tracking-wider text-sf-white">
          {project.type === "video" ? "Video" : "Foto"}
        </span>
      </div>

      {/* Número editorial */}
      {index != null && (
        <span className="absolute left-5 top-4 font-display text-sm font-bold tracking-widest text-sf-white/70">
          {String(index).padStart(2, "0")}
        </span>
      )}

      {/* Info inferior */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-sf-red">
          {CATEGORY_LABELS[project.category]}
        </span>
        <h3 className="font-display text-xl font-bold leading-tight text-sf-white">
          {project.title}
        </h3>
        {project.summary && (
          <p className="mt-1 max-h-0 overflow-hidden text-sm text-sf-gray-300 opacity-0 transition-all duration-500 ease-sf group-hover:max-h-20 group-hover:opacity-100">
            {project.summary}
          </p>
        )}
      </div>
    </motion.article>
  );
}
