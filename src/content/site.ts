import type { SiteContent } from "@/types/content";

/** Contenido editorial del sitio. En Fase 2–3 migra al backoffice (ver docs/03-BACKOFFICE.md). */
export const site: SiteContent = {
  brand: "Salt Frame Visuals",
  hero: {
    headline: "SALT FRAME VISUALS",
    subheadline: "Imágenes vibrantes. Videos que transmiten.",
    tagline: "Contenido audiovisual con actitud para marcas.",
    ctaLabel: "Portfolio",
  },
  about: {
    heading: "Sobre mí",
    body: [
      "Soy Cae, el creativo detrás de Salt Frame Visuals. Trabajo con marcas y proyectos jóvenes, disruptivos, con ganas de crecer y ofrecer un producto o servicio de calidad.",
      "Todo comienza en el momento en que te mostrás o publicitás en redes, y ahí es donde puedo ayudarte.",
      "Creo en lo simple como ventaja, en un mundo saturado de información y contenidos. Simple, pero adaptado estratégicamente a las necesidades de tu proyecto.",
    ],
  },
  servicesIntro: {
    heading: "Servicios",
    ctaLabel: "Hablemos",
  },
  contact: {
    email: "info@saltframevisuals.com",
    instagram: "@saltframevisuals",
    instagramUrl: "https://instagram.com/saltframevisuals",
  },
};
