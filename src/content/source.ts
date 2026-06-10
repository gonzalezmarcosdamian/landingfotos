import "server-only";
import { cache } from "react";
import { dictionaries, type Dict, type Lang } from "@/i18n/dictionaries";
import { getFeaturedProjects } from "@/content/projects";
import type { Project } from "@/types/content";

/**
 * Capa de abstracción de contenido (CMS-ready).
 *
 * La landing lee SIEMPRE por acá. Hoy devuelve el contenido estático tipado;
 * cuando se conecta el backoffice (Payload), `getSiteContent` consulta la base
 * de datos. Los componentes no saben de dónde viene el dato → migración sin tocar UI.
 *
 * Ver docs/03-BACKOFFICE.md y docs/07-BACKOFFICE-STRATEGY.md.
 */
export interface SiteContent {
  dictionaries: Record<Lang, Dict>;
  /** proyectos destacados, ya ordenados */
  projects: Project[];
}

function getStaticContent(): SiteContent {
  return { dictionaries, projects: getFeaturedProjects() };
}

/**
 * Fuente única de contenido del sitio. Cacheada por request (React cache).
 * Cuando `USE_CMS=true` y hay DB, lee de Payload; si no, fallback estático.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (process.env.USE_CMS === "true") {
    try {
      const { getPayloadContent } = await import("@/content/payload-source");
      return await getPayloadContent();
    } catch {
      // Si el CMS no está disponible, no romper el sitio: fallback estático.
      return getStaticContent();
    }
  }
  return getStaticContent();
});
