import "server-only";
import type { SiteContent } from "@/content/source";
import { dictionaries as staticDict, type Dict, type Lang, LANGS } from "@/i18n/dictionaries";
import type { Category, MediaType, Project } from "@/types/content";

/** URL de un upload de Payload (puede venir poblado o como id). */
function mediaUrl(m: unknown): string | undefined {
  if (m && typeof m === "object" && "url" in m && typeof (m as { url?: string }).url === "string") {
    return (m as { url: string }).url;
  }
  return undefined;
}

function mediaAlt(m: unknown): string | undefined {
  if (m && typeof m === "object" && "alt" in m) return String((m as { alt?: string }).alt ?? "");
  return undefined;
}

/**
 * Lee el contenido desde Payload (Local API) y lo mapea a la estructura del sitio.
 * Parte de los diccionarios estáticos (chrome de UI: nav, filtros, badges) y
 * sobreescribe lo editable (hero, sobre mí, servicios, footer, categorías, summaries).
 */
export async function getPayloadContent(): Promise<SiteContent> {
  const { getPayload } = await import("payload");
  const config = (await import("@payload-config")).default;
  const payload = await getPayload({ config });

  // Categorías (para labels por idioma + orden)
  const catsByLang: Record<Lang, Record<string, string>> = { es: {}, en: {} };
  for (const lang of LANGS) {
    const cats = await payload.find({ collection: "categories", locale: lang, limit: 100, depth: 0 });
    for (const c of cats.docs as unknown as Array<{ slug: string; name: string }>) {
      catsByLang[lang][c.slug] = c.name;
    }
  }

  // Proyectos publicados y destacados, ordenados
  const projRes = await payload.find({
    collection: "projects",
    where: { _status: { equals: "published" } },
    sort: "order",
    limit: 200,
    depth: 1,
  });
  const projects: Project[] = (projRes.docs as Array<Record<string, unknown>>).map((d) => {
    const cat = d.category as { slug?: string } | string | undefined;
    const categorySlug = (typeof cat === "object" ? cat?.slug : cat) ?? "marca";
    return {
      slug: String(d.slug),
      title: String(d.title),
      client: (d.client as string) || undefined,
      category: categorySlug as Category,
      type: (d.type as MediaType) ?? "photo",
      cover: mediaUrl(d.cover),
      coverAlt: mediaAlt(d.cover),
      video: mediaUrl(d.video),
      gallery: Array.isArray(d.gallery)
        ? (d.gallery.map(mediaUrl).filter(Boolean) as string[])
        : undefined,
      featured: Boolean(d.featured),
      order: Number(d.order ?? 0),
    };
  });

  // Diccionarios por idioma: base estática + overrides del CMS
  const dictionaries = {} as Record<Lang, Dict>;
  for (const lang of LANGS) {
    const s = (await payload.findGlobal({ slug: "site-settings", locale: lang })) as Record<
      string,
      unknown
    >;
    const base = staticDict[lang];

    const projectSummaries: Dict["projects"] = {};
    for (const d of projRes.docs as Array<Record<string, unknown>>) {
      // summary localizado: re-fetch por locale sería ideal; aquí usamos el del doc
      projectSummaries[String(d.slug)] = { summary: String(d.summary ?? "") };
    }

    dictionaries[lang] = {
      ...base,
      categories: { ...base.categories, ...catsByLang[lang] } as Dict["categories"],
      hero: {
        subheadline: (s.heroSubheadline as string) || base.hero.subheadline,
        tagline: (s.heroTagline as string) || base.hero.tagline,
        cta: (s.heroCta as string) || base.hero.cta,
      },
      about: {
        ...base.about,
        headingL1: (s.aboutHeadingL1 as string) || base.about.headingL1,
        headingL2: (s.aboutHeadingL2 as string) || base.about.headingL2,
        body: Array.isArray(s.aboutBody) && s.aboutBody.length
          ? (s.aboutBody as Array<{ text: string }>).map((p) => p.text)
          : base.about.body,
      },
      services: {
        ...base.services,
        headingL1: (s.servicesHeadingL1 as string) || base.services.headingL1,
        headingL2: (s.servicesHeadingL2 as string) || base.services.headingL2,
        cta: (s.servicesCta as string) || base.services.cta,
        items: Array.isArray(s.services) && s.services.length
          ? (s.services as Array<{ title: string; description: string }>)
          : base.services.items,
      },
      footer: {
        heading: (s.footerHeading as string) || base.footer.heading,
        blurb: (s.footerBlurb as string) || base.footer.blurb,
        rights: base.footer.rights,
        tagline: (s.footerTagline as string) || base.footer.tagline,
      },
      projects: { ...base.projects, ...projectSummaries },
    };
  }

  return { dictionaries, projects };
}
