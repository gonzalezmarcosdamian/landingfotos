import { NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";
import { getPayload } from "payload";
import config from "@payload-config";
import { getFeaturedProjects } from "@/content/projects";

/**
 * Sube los videos (no versionados en git por tamaño) a Cloudinary y actualiza
 * el campo `video` de los proyectos ya sembrados. Se corre LOCAL (dev) porque
 * los .mp4 sólo viven en disco. Protegido por ?secret=PAYLOAD_SECRET.
 *
 *   GET /seed-videos?secret=<PAYLOAD_SECRET>
 */
export const dynamic = "force-dynamic";
export const maxDuration = 800;

function abs(publicPath: string): string {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("secret") !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const log: string[] = [];
  const payload = await getPayload({ config });

  for (const p of getFeaturedProjects()) {
    if (!p.video) continue;
    const filePath = abs(p.video);
    if (!existsSync(filePath)) {
      log.push(`(falta) ${p.video}`);
      continue;
    }
    const found = await payload.find({
      collection: "projects",
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
    });
    const project = found.docs[0] as { id: string | number; video?: unknown } | undefined;
    if (!project) {
      log.push(`(sin proyecto) ${p.slug}`);
      continue;
    }
    const media = await payload.create({
      collection: "media",
      locale: "es",
      data: { alt: p.title },
      filePath,
    });
    const mediaId = (media as { id: string | number }).id;
    await payload.update({
      collection: "projects",
      id: project.id,
      data: { video: mediaId },
    });
    log.push(`video ${p.slug} -> media ${mediaId}`);
  }

  return NextResponse.json({ ok: true, log });
}
