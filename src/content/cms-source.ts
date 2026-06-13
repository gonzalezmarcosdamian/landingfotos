import "server-only";
import { dictionaries, type Dict, type Lang, LANGS } from "@/i18n/dictionaries";
import type { Category, MediaType, Project } from "@/types/content";
import { site } from "@/content/site";
import type { SiteContact, SiteContent } from "@/content/source";

/**
 * Fuente de contenido por HTTP contra el backoffice Payload (Railway).
 * La landing (Vercel) la consulta cuando `CMS_URL` está definida; ante cualquier
 * fallo o timeout, `getSiteContent` cae al contenido estático (la web nunca rompe).
 *
 * Revalidación ISR: el contenido se cachea y se refresca cada `REVALIDATE_SECONDS`,
 * así las ediciones de Cae aparecen sin redeploy.
 */

const REVALIDATE_SECONDS = 60;

interface CmsMedia {
  url?: string;
  alt?: string;
}

interface CmsSettings {
  heroSubheadline?: string;
  heroTagline?: string;
  heroCta?: string;
  aboutHeadingL1?: string;
  aboutHeadingL2?: string;
  aboutBody?: { text?: string }[];
  servicesHeadingL1?: string;
  servicesHeadingL2?: string;
  servicesCta?: string;
  services?: { title?: string; description?: string }[];
  footerHeading?: string;
  footerBlurb?: string;
  footerTagline?: string;
  contactEmail?: string;
  whatsapp?: string;
  instagram?: string;
  instagramUrl?: string;
}

interface CmsCategory {
  slug?: string;
  name?: string;
}

interface CmsProject {
  slug?: string;
  title?: string;
  client?: string;
  category?: CmsCategory | null;
  type?: MediaType;
  cover?: CmsMedia | null;
  video?: CmsMedia | null;
  gallery?: (CmsMedia | null)[] | null;
  summary?: string;
  featured?: boolean;
  order?: number;
}

function cmsBase(): string | null {
  const base = process.env.CMS_URL;
  return base ? base.replace(/\/$/, "") : null;
}

async function cmsFetch<T>(base: string, pathAndQuery: string): Promise<T> {
  const res = await fetch(`${base}${pathAndQuery}`, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`CMS ${pathAndQuery} -> ${res.status}`);
  return (await res.json()) as T;
}

/** Construye el Dict de un idioma fusionando el estático (UI) con lo editable en el CMS. */
function buildDict(
  lang: Lang,
  settings: CmsSettings,
  categories: CmsCategory[],
  projects: CmsProject[]
): Dict {
  const base = dictionaries[lang];

  const categoryOverrides = categories.reduce<Partial<Record<Category, string>>>((acc, c) => {
    if (c.slug && c.name) acc[c.slug as Category] = c.name;
    return acc;
  }, {});

  const projectSummaries = projects.reduce<Record<string, { summary: string }>>((acc, p) => {
    if (p.slug) acc[p.slug] = { summary: p.summary ?? base.projects[p.slug]?.summary ?? "" };
    return acc;
  }, {});

  const aboutBody = (settings.aboutBody ?? [])
    .map((b) => b.text)
    .filter((t): t is string => Boolean(t));

  const services = (settings.services ?? [])
    .map((s) => ({ title: s.title ?? "", description: s.description ?? "" }))
    .filter((s) => s.title || s.description);

  return {
    ...base,
    hero: {
      subheadline: settings.heroSubheadline ?? base.hero.subheadline,
      tagline: settings.heroTagline ?? base.hero.tagline,
      cta: settings.heroCta ?? base.hero.cta,
    },
    categories: { ...base.categories, ...categoryOverrides },
    about: {
      ...base.about,
      headingL1: settings.aboutHeadingL1 ?? base.about.headingL1,
      headingL2: settings.aboutHeadingL2 ?? base.about.headingL2,
      body: aboutBody.length ? aboutBody : base.about.body,
    },
    services: {
      ...base.services,
      headingL1: settings.servicesHeadingL1 ?? base.services.headingL1,
      headingL2: settings.servicesHeadingL2 ?? base.services.headingL2,
      cta: settings.servicesCta ?? base.services.cta,
      items: services.length ? services : base.services.items,
    },
    footer: {
      ...base.footer,
      heading: settings.footerHeading ?? base.footer.heading,
      blurb: settings.footerBlurb ?? base.footer.blurb,
      tagline: settings.footerTagline ?? base.footer.tagline,
    },
    projects: { ...base.projects, ...projectSummaries },
  };
}

/** Mapea un proyecto del CMS al tipo Project de la landing (medios -> URLs de Cloudinary). */
function toProject(p: CmsProject): Project | null {
  if (!p.slug || !p.title || !p.category?.slug || !p.type) return null;
  const gallery = (p.gallery ?? [])
    .map((g) => g?.url)
    .filter((u): u is string => Boolean(u));
  return {
    slug: p.slug,
    title: p.title,
    client: p.client,
    category: p.category.slug as Category,
    type: p.type,
    cover: p.cover?.url,
    coverAlt: p.cover?.alt,
    summary: p.summary,
    gallery: gallery.length ? gallery : undefined,
    video: p.video?.url ?? undefined,
    featured: p.featured ?? true,
    order: p.order ?? 999,
  };
}

/** Arma los datos de contacto desde el CMS; cae al estático en lo que falte. */
function buildContact(s: CmsSettings): SiteContact {
  const digits = (s.whatsapp ?? "").replace(/[^0-9]/g, "");
  return {
    email: s.contactEmail?.trim() || site.contact.email,
    instagram: s.instagram?.trim() || site.contact.instagram,
    instagramUrl: s.instagramUrl?.trim() || site.contact.instagramUrl,
    whatsapp: s.whatsapp?.trim() || site.contact.whatsapp,
    whatsappUrl: digits ? `https://wa.me/${digits}` : site.contact.whatsappUrl,
  };
}

/**
 * Devuelve el contenido del sitio desde el CMS, o `null` si no hay CMS configurado
 * o la consulta falla (para que la capa superior caiga al estático).
 */
export async function getCmsContent(): Promise<SiteContent | null> {
  const base = cmsBase();
  if (!base) return null;

  try {
    const settings: Record<Lang, CmsSettings> = { es: {}, en: {} };
    const cats: Record<Lang, CmsCategory[]> = { es: [], en: [] };
    const projsByLang: Record<Lang, CmsProject[]> = { es: [], en: [] };

    await Promise.all(
      LANGS.flatMap((lang) => [
        cmsFetch<CmsSettings>(base, `/api/globals/site-settings?locale=${lang}&depth=0`).then(
          (s) => {
            settings[lang] = s;
          }
        ),
        cmsFetch<{ docs: CmsCategory[] }>(base, `/api/categories?locale=${lang}&limit=50&depth=0`).then(
          (r) => {
            cats[lang] = r.docs ?? [];
          }
        ),
        cmsFetch<{ docs: CmsProject[] }>(
          base,
          `/api/projects?locale=${lang}&where[featured][equals]=true&limit=100&depth=1`
        ).then((r) => {
          projsByLang[lang] = r.docs ?? [];
        }),
      ])
    );

    const dicts: Record<Lang, Dict> = {
      es: buildDict("es", settings.es, cats.es, projsByLang.es),
      en: buildDict("en", settings.en, cats.en, projsByLang.en),
    };

    const projects = projsByLang.es
      .map(toProject)
      .filter((p): p is Project => p !== null)
      .sort((a, b) => a.order - b.order);

    if (projects.length === 0) return null; // sin contenido útil -> fallback

    return { dictionaries: dicts, projects, contact: buildContact(settings.es) };
  } catch {
    return null;
  }
}
