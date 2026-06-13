import "server-only";
import { cache } from "react";
import { dictionaries, type Dict, type Lang } from "@/i18n/dictionaries";
import { getFeaturedProjects } from "@/content/projects";
import { site } from "@/content/site";
import type { Project } from "@/types/content";

/** Datos de contacto (no localizados) — editables desde el CMS. */
export interface SiteContact {
  email: string;
  instagram: string;
  instagramUrl: string;
  whatsapp: string;
  whatsappUrl: string;
}

/**
 * Capa de abstracción de contenido (CMS-ready).
 *
 * La landing lee SIEMPRE por acá. En `main` devuelve el contenido estático tipado.
 * El backoffice (Payload) vive en la rama `feat/backoffice-payload` y se desplegará
 * en Railway; cuando esté en vivo, esta función consultará su API y los componentes
 * no cambian. Ver docs/03-BACKOFFICE.md y docs/09-BACKOFFICE-SETUP.md.
 */
export interface SiteContent {
  dictionaries: Record<Lang, Dict>;
  /** proyectos destacados, ya ordenados */
  projects: Project[];
  /** datos de contacto (no localizados) */
  contact: SiteContact;
}

/** Fuente única de contenido del sitio. Cacheada por request (React cache). */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  // Intenta el CMS (Payload en Railway); ante cualquier fallo, contenido estático.
  // El import dinámico evita acoplar el bundle estático al módulo del CMS.
  const { getCmsContent } = await import("@/content/cms-source");
  const cms = await getCmsContent();
  if (cms) return cms;
  return { dictionaries, projects: getFeaturedProjects(), contact: site.contact };
});
