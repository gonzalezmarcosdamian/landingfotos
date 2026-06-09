import type { Project } from "@/types/content";

/** Genera rutas de galería: /projects/<slug>/01.jpg … NN.jpg */
function gallery(slug: string, count: number, ext = "jpg"): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/projects/${slug}/${String(i + 1).padStart(2, "0")}.${ext}`
  );
}

/**
 * Proyectos del portfolio con el material real de Cae.
 * Galerías y videos optimizados en /public/projects/.
 */
export const projects: Project[] = [
  {
    slug: "coolangatta-gold",
    title: "Coolangatta Gold",
    client: "Coolangatta Gold",
    category: "deporte",
    type: "photo",
    cover: "/projects/coolangatta-gold/01.jpg",
    coverAlt: "Atleta de surf lifesaving en plena competencia del Coolangatta Gold",
    summary: "Fotografía de triatlón y surf lifesaving: resistencia y adrenalina en estado puro.",
    gallery: gallery("coolangatta-gold", 32),
    featured: true,
    order: 1,
  },
  {
    slug: "world-surf-league",
    title: "World Surf League",
    client: "WSL",
    category: "surf",
    type: "photo",
    cover: "/projects/world-surf-league/02.jpg",
    coverAlt: "Surfista en plena maniobra sobre la ola",
    summary: "Surf de élite congelado en el instante decisivo.",
    gallery: gallery("world-surf-league", 19),
    featured: true,
    order: 2,
  },
  {
    slug: "get-motivated",
    title: "Get Motivated",
    client: "Get Motivated Gym",
    category: "deporte",
    type: "video",
    cover: "/projects/get-motivated-poster.jpg",
    coverAlt: "Interior del gimnasio Get Motivated",
    summary: "Video para gimnasio: energía, equipamiento y actitud.",
    video: "/projects/get-motivated.mp4",
    featured: true,
    order: 3,
  },
  {
    slug: "bsa-boat-syndication",
    title: "BSA Boat Syndication Australia",
    client: "BSA",
    category: "real-estate",
    type: "video",
    cover: "/projects/bsa-boat-syndication-poster.jpg",
    coverAlt: "Frame del video náutico de BSA Boat Syndication",
    summary: "Video inmobiliario náutico: aspiracional y cinematográfico.",
    video: "/projects/bsa-boat-syndication.mp4",
    featured: true,
    order: 4,
  },
  {
    slug: "country-club",
    title: "Country Club",
    category: "gastronomia",
    type: "video",
    cover: "/projects/country-club-poster.jpg",
    coverAlt: "Frame del video gastronómico de Country Club",
    summary: "Gastronomía que se saborea con los ojos.",
    video: "/projects/country-club.mp4",
    featured: true,
    order: 5,
  },
  {
    slug: "fu-ma-chi",
    title: "Fu Ma Chi Asian Food",
    client: "Fu Ma Chi",
    category: "gastronomia",
    type: "photo",
    cover: "/projects/fu-ma-chi/03.jpg",
    coverAlt: "Plato de ramen asiático con camarones y bok choy de Fu Ma Chi",
    summary: "Comida asiática y coctelería: textura, color y apetito.",
    gallery: gallery("fu-ma-chi", 10),
    featured: true,
    order: 6,
  },
  {
    slug: "squires-ink",
    title: "Squires Ink",
    client: "Squires Ink",
    category: "estudio",
    type: "video",
    cover: "/projects/squires-ink-poster.jpg",
    coverAlt: "Frame del video del estudio de tatuajes Squires Ink",
    summary: "El arte del tatuaje, documentado con actitud.",
    video: "/projects/squires-ink.mp4",
    featured: true,
    order: 7,
  },
  {
    slug: "private-house-cinematic",
    title: "Private House Cinematic",
    category: "real-estate",
    type: "video",
    cover: "/projects/private-house-cinematic-poster.jpg",
    coverAlt: "Frame del video cinematográfico de una casa privada",
    summary: "Real estate cinematográfico: espacios que enamoran.",
    video: "/projects/private-house-cinematic.mp4",
    featured: true,
    order: 8,
  },
  {
    slug: "beauty-by-laser",
    title: "Beauty by Laser",
    client: "Beauty by Laser",
    category: "estetica",
    type: "video",
    cover: "/projects/beauty-by-laser/03.jpg",
    coverAlt: "Equipo de depilación láser en la clínica Beauty by Laser",
    summary: "Estética premium: contenido que transmite calidad y confianza.",
    video: "/projects/beauty-by-laser.mp4",
    gallery: gallery("beauty-by-laser", 12),
    featured: true,
    order: 9,
  },
  {
    slug: "beach-volley",
    title: "Beach Volley",
    category: "deporte",
    type: "photo",
    cover: "/projects/beach-volley/01.jpg",
    coverAlt: "Jugadoras de beach volley en acción",
    summary: "Deporte de playa: energía, salto y competencia.",
    gallery: gallery("beach-volley", 17),
    featured: true,
    order: 10,
  },
];

/** Proyectos destacados, ordenados para el home. */
export function getFeaturedProjects(all: Project[] = projects): Project[] {
  return all
    .filter((p) => p.featured)
    .slice()
    .sort((a, b) => a.order - b.order);
}
