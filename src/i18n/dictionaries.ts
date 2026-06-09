import type { Category } from "@/types/content";

export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

export interface Dict {
  nav: {
    portfolio: string;
    about: string;
    services: string;
    contact: string;
    menu: string;
  };
  hero: { subheadline: string; tagline: string; cta: string };
  portfolio: { overline: string; heading: string; intro: string; all: string };
  categories: Record<Category, string>;
  media: { photo: string; video: string };
  about: { overline: string; headingL1: string; headingL2: string; body: string[] };
  services: {
    overline: string;
    headingL1: string;
    headingL2: string;
    cta: string;
    items: { title: string; description: string }[];
  };
  footer: { heading: string; blurb: string; rights: string; tagline: string };
  projects: Record<string, { summary: string }>;
}

const es: Dict = {
  nav: { portfolio: "Portfolio", about: "Sobre mí", services: "Servicios", contact: "Contacto", menu: "Menú" },
  hero: {
    subheadline: "Imágenes vibrantes. Videos que transmiten.",
    tagline: "Contenido audiovisual con actitud para marcas.",
    cta: "Portfolio",
  },
  portfolio: {
    overline: "Portfolio",
    heading: "Proyectos destacados",
    intro: "Deporte, surf, real estate y gastronomía. Que las imágenes hablen por sí solas.",
    all: "Todos",
  },
  categories: {
    deporte: "Deporte",
    surf: "Surf",
    "real-estate": "Real Estate",
    gastronomia: "Gastronomía",
    estudio: "Estudio",
    estetica: "Estética",
    marca: "Marca",
  },
  media: { photo: "Foto", video: "Video" },
  about: {
    overline: "Sobre mí",
    headingL1: "Lo simple,",
    headingL2: "como ventaja.",
    body: [
      "Soy Cae, el creativo detrás de Salt Frame Visuals. Trabajo con marcas y proyectos jóvenes, disruptivos, con ganas de crecer y ofrecer un producto o servicio de calidad.",
      "Todo comienza en el momento en que te mostrás o publicitás en redes, y ahí es donde puedo ayudarte.",
      "Creo en lo simple como ventaja, en un mundo saturado de información y contenidos. Simple, pero adaptado estratégicamente a las necesidades de tu proyecto.",
    ],
  },
  services: {
    overline: "Servicios",
    headingL1: "Contenido con actitud,",
    headingL2: "pensado para vender.",
    cta: "Hablemos",
    items: [
      { title: "Fotografía deportiva", description: "Capturo el movimiento, la intensidad y la pasión." },
      {
        title: "Videos comerciales que venden sin idioma",
        description:
          "Para restaurantes, inmobiliarias, gimnasios y todo negocio que quiera darse a conocer o elevar la calidad de su contenido en redes. Más alcance y mejores clientes.",
      },
      {
        title: "Contenido personalizado para marcas que quieren distinguir",
        description: "Me adapto y busco que las sesiones sean amenas, dinámicas y productivas.",
      },
    ],
  },
  footer: {
    heading: "Hablemos",
    blurb: "Contame tu proyecto. Hagamos que tus fotos y videos hablen por sí solos.",
    rights: "Todos los derechos reservados.",
    tagline: "Cero exceso, máxima actitud.",
  },
  projects: {
    "coolangatta-gold": { summary: "Fotografía de triatlón y surf lifesaving: resistencia y adrenalina en estado puro." },
    "world-surf-league": { summary: "Surf de élite congelado en el instante decisivo." },
    "get-motivated": { summary: "Video para gimnasio: energía, equipamiento y actitud." },
    "bsa-boat-syndication": { summary: "Video inmobiliario náutico: aspiracional y cinematográfico." },
    "country-club": { summary: "Gastronomía que se saborea con los ojos." },
    "fu-ma-chi": { summary: "Comida asiática y coctelería: textura, color y apetito." },
    "squires-ink": { summary: "El arte del tatuaje, documentado con actitud." },
    "private-house-cinematic": { summary: "Real estate cinematográfico: espacios que enamoran." },
    "beauty-by-laser": { summary: "Estética premium: contenido que transmite calidad y confianza." },
    "beach-volley": { summary: "Deporte de playa: energía, salto y competencia." },
  },
};

const en: Dict = {
  nav: { portfolio: "Portfolio", about: "About", services: "Services", contact: "Contact", menu: "Menu" },
  hero: {
    subheadline: "Vibrant images. Videos that move.",
    tagline: "Audiovisual content with attitude, for brands.",
    cta: "Portfolio",
  },
  portfolio: {
    overline: "Portfolio",
    heading: "Featured work",
    intro: "Sport, surf, real estate and food. Let the images speak for themselves.",
    all: "All",
  },
  categories: {
    deporte: "Sport",
    surf: "Surf",
    "real-estate": "Real Estate",
    gastronomia: "Food",
    estudio: "Studio",
    estetica: "Beauty",
    marca: "Brand",
  },
  media: { photo: "Photo", video: "Video" },
  about: {
    overline: "About",
    headingL1: "Simplicity",
    headingL2: "as an edge.",
    body: [
      "I'm Cae, the creative behind Salt Frame Visuals. I work with young, disruptive brands and projects that want to grow and deliver quality.",
      "It all starts the moment you show up or advertise on social media — and that's where I can help.",
      "I believe in simplicity as an edge, in a world saturated with information and content. Simple, but strategically tailored to your project's needs.",
    ],
  },
  services: {
    overline: "Services",
    headingL1: "Content with attitude,",
    headingL2: "built to sell.",
    cta: "Let's talk",
    items: [
      { title: "Sports photography", description: "I capture movement, intensity and passion." },
      {
        title: "Commercial videos that sell without words",
        description:
          "For restaurants, real estate, gyms and any business that wants to grow or elevate its social content. More reach, better clients.",
      },
      {
        title: "Custom content for brands that want to stand out",
        description: "I adapt and make every session enjoyable, dynamic and productive.",
      },
    ],
  },
  footer: {
    heading: "Let's talk",
    blurb: "Tell me about your project. Let's make your photos and videos speak for themselves.",
    rights: "All rights reserved.",
    tagline: "Zero excess, maximum attitude.",
  },
  projects: {
    "coolangatta-gold": { summary: "Triathlon & surf lifesaving photography: pure endurance and adrenaline." },
    "world-surf-league": { summary: "Elite surf frozen at the decisive moment." },
    "get-motivated": { summary: "Gym video: energy, equipment and attitude." },
    "bsa-boat-syndication": { summary: "Nautical real estate video: aspirational and cinematic." },
    "country-club": { summary: "Food you can taste with your eyes." },
    "fu-ma-chi": { summary: "Asian food and cocktails: texture, color and appetite." },
    "squires-ink": { summary: "The art of tattooing, documented with attitude." },
    "private-house-cinematic": { summary: "Cinematic real estate: spaces that make you fall in love." },
    "beauty-by-laser": { summary: "Premium beauty: content that conveys quality and trust." },
    "beach-volley": { summary: "Beach sport: energy, jumps and competition." },
  },
};

export const dictionaries: Record<Lang, Dict> = { es, en };
