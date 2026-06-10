import { NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";
import { getPayload } from "payload";
import config from "@payload-config";
import { getFeaturedProjects } from "@/content/projects";
import { dictionaries, LANGS, type Lang } from "@/i18n/dictionaries";
import type { Category } from "@/types/content";

/**
 * Seed del backoffice (one-time). Protegido por ?secret=PAYLOAD_SECRET.
 * Crea: usuario admin (Cae) + categorías + textos ES/EN + proyectos con media.
 * Idempotente: no duplica si ya hay proyectos.
 *
 *   GET /seed?secret=<PAYLOAD_SECRET>[&full=1]
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const CATEGORY_ORDER: Category[] = [
  "deporte",
  "surf",
  "real-estate",
  "gastronomia",
  "estetica",
  "estudio",
  "marca",
];

const ADMIN = { email: "caetanopapirblat@gmail.com", password: "Gulli123#", name: "Cae" };

function abs(publicPath: string): string {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("secret") !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const full = url.searchParams.get("full") === "1";
  const log: string[] = [];
  const payload = await getPayload({ config });

  // 1) Usuario admin
  const users = await payload.count({ collection: "users" });
  if (users.totalDocs === 0) {
    await payload.create({ collection: "users", data: { ...ADMIN, role: "admin" } });
    log.push(`usuario admin creado: ${ADMIN.email}`);
  } else {
    log.push("usuarios ya existen — no se crea");
  }

  // 2) Categorías (ES/EN)
  const catId: Record<string, string | number> = {};
  for (let i = 0; i < CATEGORY_ORDER.length; i++) {
    const slug = CATEGORY_ORDER[i];
    const existing = await payload.find({ collection: "categories", where: { slug: { equals: slug } }, limit: 1 });
    let id: string | number;
    if (existing.docs[0]) {
      id = (existing.docs[0] as { id: string | number }).id;
    } else {
      const created = await payload.create({
        collection: "categories",
        locale: "es",
        data: { slug, name: dictionaries.es.categories[slug], order: i },
      });
      id = (created as { id: string | number }).id;
      await payload.update({ collection: "categories", id, locale: "en", data: { name: dictionaries.en.categories[slug] } });
    }
    catId[slug] = id;
  }
  log.push(`categorías: ${Object.keys(catId).length}`);

  // 3) Textos del sitio (global, ES/EN)
  for (const lang of LANGS) {
    const t = dictionaries[lang];
    await payload.updateGlobal({
      slug: "site-settings",
      locale: lang as Lang,
      data: {
        heroSubheadline: t.hero.subheadline,
        heroTagline: t.hero.tagline,
        heroCta: t.hero.cta,
        aboutHeadingL1: t.about.headingL1,
        aboutHeadingL2: t.about.headingL2,
        aboutBody: t.about.body.map((text) => ({ text })),
        servicesHeadingL1: t.services.headingL1,
        servicesHeadingL2: t.services.headingL2,
        servicesCta: t.services.cta,
        services: t.services.items,
        footerHeading: t.footer.heading,
        footerBlurb: t.footer.blurb,
        footerTagline: t.footer.tagline,
        contactEmail: "info@saltframevisuals.com",
        instagram: "@saltframevisuals",
        instagramUrl: "https://instagram.com/saltframevisuals",
      },
    });
  }
  log.push("textos del sitio cargados (ES/EN)");

  // 4) Proyectos + media
  const projects = getFeaturedProjects();
  const existingProjects = await payload.count({ collection: "projects" });
  if (existingProjects.totalDocs > 0) {
    log.push("ya hay proyectos — se omite la carga de proyectos");
    return NextResponse.json({ ok: true, skipped: "projects", log });
  }

  const mediaCache = new Map<string, string | number>();
  async function upload(publicPath: string | undefined, alt: string): Promise<string | number | undefined> {
    if (!publicPath) return undefined;
    if (mediaCache.has(publicPath)) return mediaCache.get(publicPath);
    const filePath = abs(publicPath);
    if (!existsSync(filePath)) {
      log.push(`(falta archivo) ${publicPath}`);
      return undefined;
    }
    const doc = await payload.create({
      collection: "media",
      locale: "es",
      data: { alt },
      filePath,
    });
    const id = (doc as { id: string | number }).id;
    mediaCache.set(publicPath, id);
    return id;
  }

  let count = 0;
  for (const p of projects) {
    const cover = await upload(p.cover, p.coverAlt ?? p.title);
    const video = await upload(p.video, p.title);
    const gallery: Array<string | number> = [];
    if (full && p.gallery) {
      for (const g of p.gallery) {
        const id = await upload(g, p.title);
        if (id) gallery.push(id);
      }
    }
    await payload.create({
      collection: "projects",
      locale: "es",
      data: {
        title: p.title,
        slug: p.slug,
        client: p.client,
        category: catId[p.category],
        type: p.type,
        cover,
        video,
        gallery: gallery.length ? gallery : undefined,
        summary: dictionaries.es.projects[p.slug]?.summary,
        featured: p.featured,
        order: p.order,
        _status: "published",
      },
    });
    // summary EN
    const created = await payload.find({ collection: "projects", where: { slug: { equals: p.slug } }, limit: 1 });
    if (created.docs[0]) {
      await payload.update({
        collection: "projects",
        id: (created.docs[0] as { id: string | number }).id,
        locale: "en",
        data: { summary: dictionaries.en.projects[p.slug]?.summary },
      });
    }
    count++;
  }
  log.push(`proyectos creados: ${count}${full ? " (con galerías)" : " (solo portadas)"}`);

  return NextResponse.json({ ok: true, log });
}
