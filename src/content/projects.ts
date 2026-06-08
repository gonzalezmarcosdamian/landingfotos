import type { Project } from "@/types/content";

/**
 * Proyectos del portfolio (brief).
 * `cover` se completa cuando llega el material real a public/media/raw/<slug>/.
 * Mientras tanto, sin cover, ProjectCard renderiza un placeholder de marca.
 */
export const projects: Project[] = [
  {
    slug: "coolangatta-gold",
    title: "Coolangatta Gold",
    client: "Coolangatta Gold",
    category: "deporte",
    type: "photo",
    summary: "Fotografía de triatlón: resistencia y adrenalina en estado puro.",
    featured: true,
    order: 1,
  },
  {
    slug: "world-surf-league",
    title: "World Surf League",
    client: "WSL",
    category: "surf",
    type: "photo",
    cover: "/hero/hero-poster-desktop.jpg",
    coverAlt: "Surfista en pleno aéreo con explosión de spray sobre la ola",
    summary: "Surf de élite congelado en el instante decisivo.",
    featured: true,
    order: 2,
  },
  {
    slug: "get-motivated",
    title: "Get Motivated",
    category: "deporte",
    type: "video",
    summary: "Video deportivo que enciende la motivación.",
    featured: true,
    order: 3,
  },
  {
    slug: "bsa-boat-syndication",
    title: "BSA Boat Syndication Australia",
    client: "BSA",
    category: "real-estate",
    type: "video",
    summary: "Video inmobiliario náutico: aspiracional y cinematográfico.",
    featured: true,
    order: 4,
  },
  {
    slug: "country-club",
    title: "Country Club",
    category: "gastronomia",
    type: "video",
    summary: "Gastronomía que se saborea con los ojos.",
    featured: true,
    order: 5,
  },
  {
    slug: "fu-ma-chi",
    title: "Fu Ma Chi Asian Food",
    client: "Fu Ma Chi",
    category: "gastronomia",
    type: "photo",
    summary: "Comida asiática: textura, color y apetito.",
    featured: true,
    order: 6,
  },
  {
    slug: "squires-ink",
    title: "Squires Ink",
    client: "Squires Ink",
    category: "estudio",
    type: "video",
    summary: "El arte del tatuaje, documentado con actitud.",
    featured: true,
    order: 7,
  },
  {
    slug: "private-house-cinematic",
    title: "Private House Cinematic",
    category: "real-estate",
    type: "video",
    summary: "Real estate cinematográfico: espacios que enamoran.",
    featured: true,
    order: 8,
  },
];

/** Proyectos destacados, ordenados para el home. */
export function getFeaturedProjects(all: Project[] = projects): Project[] {
  return all
    .filter((p) => p.featured)
    .slice()
    .sort((a, b) => a.order - b.order);
}
