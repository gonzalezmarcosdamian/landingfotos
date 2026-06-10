import "server-only";
import type { SiteContent } from "@/content/source";

/**
 * Lectura de contenido desde Payload (backoffice). Se completa cuando el CMS
 * está conectado (ver docs/03-BACKOFFICE.md). Hasta entonces lanza, y `source.ts`
 * cae al fallback estático — el sitio nunca se rompe por falta de DB.
 */
export async function getPayloadContent(): Promise<SiteContent> {
  throw new Error("Payload CMS aún no está conectado (USE_CMS=true sin backoffice configurado).");
}
