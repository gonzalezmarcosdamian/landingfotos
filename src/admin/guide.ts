/**
 * Guía de uso del backoffice (se muestra en el inicio del panel).
 *
 * ⚠️ IMPORTANTE: cada vez que se cambia algo del backoffice (una sección, un
 * campo, un flujo), ACTUALIZAR esta guía para que siga reflejando cómo se usa.
 */

export interface GuideSection {
  emoji: string;
  title: string;
  /** A dónde lleva el botón "Ir a…" */
  href: string;
  /** Para qué sirve la sección (objetivo). */
  objetivo: string;
  /** Cómo se usa, paso a paso. */
  pasos: string[];
}

export const GUIDE_INTRO =
  "Desde acá manejás todo tu portfolio: tus publicaciones, tus fotos y videos, y los textos de tu web. Lo que cambies se ve en saltframevisuals.com en aproximadamente 1 minuto. Abajo tenés qué hace cada sección y cómo usarla.";

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    emoji: "📸",
    title: "Publicaciones",
    href: "/admin/collections/projects",
    objetivo:
      "Cada trabajo de tu portfolio (una sesión, un cliente, una temporada). Es lo que se ve en tu web.",
    pasos: [
      "Tocá una publicación para abrirla, o “+ Nueva publicación” para crear una.",
      "En la galería tocá “Crear nuevo” y seleccioná o soltá VARIAS fotos de una vez.",
      "Arrastrá las miniaturas con el mouse para ordenarlas.",
      "Elegí la portada: tocá una foto de la galería para usarla de portada.",
      "Completá título, categoría y un resumen corto, y tocá Guardar (~1 min en tu web).",
    ],
  },
  {
    emoji: "🖼️",
    title: "Biblioteca",
    href: "/admin/collections/media",
    objetivo:
      "Todas tus fotos y videos en un solo lugar. Lo que subís acá lo podés reutilizar en cualquier publicación.",
    pasos: [
      "Tocá “+ Subir foto o video”: podés seleccionar o soltar VARIAS a la vez.",
      "La descripción es opcional (ayuda al SEO si la completás).",
      "Guardá. Después usás esos archivos como portada o en la galería de una publicación.",
    ],
  },
  {
    emoji: "✍️",
    title: "Textos del sitio",
    href: "/admin/globals/site-settings",
    objetivo:
      "Los textos de tu web: el inicio, “Sobre mí”, los servicios y tus datos de contacto (email, WhatsApp, Instagram).",
    pasos: [
      "Elegí la pestaña que querés editar (Hero, Sobre mí, Servicios, Footer / Contacto).",
      "Cambiá el texto. Usá el selector ES / EN (arriba a la derecha) para cada idioma.",
      "Tocá Guardar.",
    ],
  },
  {
    emoji: "🏷️",
    title: "Categorías",
    href: "/admin/collections/categories",
    objetivo:
      "Las secciones de tu portfolio (Deporte, Surf, Gastronomía…). Sirven para agrupar tus publicaciones.",
    pasos: [
      "Normalmente ya están armadas: entrá solo si querés sumar o renombrar una.",
      "Cada publicación elige una de estas categorías.",
    ],
  },
];
