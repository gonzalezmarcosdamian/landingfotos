/** Tipos del modelo de contenido — ver docs/01-ARCHITECTURE.md §4.3 */

export type MediaType = "photo" | "video";

export type Category =
  | "deporte"
  | "surf"
  | "real-estate"
  | "gastronomia"
  | "estudio"
  | "estetica"
  | "marca";

export interface Project {
  /** identificador en URL */
  slug: string;
  title: string;
  client?: string;
  category: Category;
  type: MediaType;
  /** ruta de portada; si falta, se renderiza un placeholder de marca */
  cover?: string;
  /** texto alternativo (a11y + SEO) — obligatorio si hay cover */
  coverAlt?: string;
  summary?: string;
  /** galería de fotos del proyecto (para el lightbox) */
  gallery?: string[];
  /** video cinematic del proyecto (para el lightbox de proyectos de video) */
  video?: string;
  featured: boolean;
  order: number;
}

export interface Service {
  title: string;
  description: string;
  order: number;
}

export interface SiteContent {
  brand: string;
  hero: {
    headline: string;
    subheadline: string;
    tagline: string;
    ctaLabel: string;
  };
  about: {
    heading: string;
    body: string[];
  };
  servicesIntro: {
    heading: string;
    ctaLabel: string;
  };
  contact: {
    email: string;
    instagram: string;
    instagramUrl: string;
  };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  deporte: "Deporte",
  surf: "Surf",
  "real-estate": "Real Estate",
  gastronomia: "Gastronomía",
  estudio: "Estudio",
  estetica: "Estética",
  marca: "Marca",
};
