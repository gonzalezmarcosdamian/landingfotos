/**
 * Datos de contacto del sitio (no localizados) y su armado desde el CMS.
 * Módulo puro (sin IO/React) para poder testearlo.
 */

export interface SiteContact {
  email: string;
  instagram: string;
  instagramUrl: string;
  whatsapp: string;
  whatsappUrl: string;
}

/** Campos de contacto tal como vienen del global SiteSettings del CMS. */
export interface CmsContactInput {
  contactEmail?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  instagramUrl?: string | null;
}

/** Arma el link wa.me a partir del número; si no hay dígitos, usa el fallback. */
export function deriveWhatsappUrl(num: string | null | undefined, fallbackUrl: string): string {
  const digits = (num ?? "").replace(/[^0-9]/g, "");
  return digits ? `https://wa.me/${digits}` : fallbackUrl;
}

/** Fusiona el contacto del CMS con el fallback estático (campo por campo). */
export function buildContact(cms: CmsContactInput, fallback: SiteContact): SiteContact {
  return {
    email: cms.contactEmail?.trim() || fallback.email,
    instagram: cms.instagram?.trim() || fallback.instagram,
    instagramUrl: cms.instagramUrl?.trim() || fallback.instagramUrl,
    whatsapp: cms.whatsapp?.trim() || fallback.whatsapp,
    whatsappUrl: deriveWhatsappUrl(cms.whatsapp, fallback.whatsappUrl),
  };
}
