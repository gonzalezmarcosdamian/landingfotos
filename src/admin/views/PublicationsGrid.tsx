import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Grilla visual de publicaciones (tarjetas estilo portfolio: título sobre la
 * portada). Compartida por el dashboard y la vista de lista de Publicaciones.
 */

interface MediaLike {
  url?: string | null;
}
interface CategoryLike {
  name?: string | null;
}
interface ProjectDoc {
  id: string | number;
  title?: string | null;
  type?: "photo" | "video" | null;
  featured?: boolean | null;
  cover?: MediaLike | string | null;
  category?: CategoryLike | string | null;
}

/** Miniatura optimizada de Cloudinary (recorte vertical). */
function thumb(url?: string | null): string | null {
  if (!url) return null;
  if (url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/c_fill,g_auto,w_500,h_640,q_auto,f_auto/");
  }
  return url;
}
function coverUrl(p: ProjectDoc): string | null {
  if (p.cover && typeof p.cover === "object") return thumb(p.cover.url);
  return null;
}
function categoryName(p: ProjectDoc): string {
  if (p.category && typeof p.category === "object") return p.category.name ?? "";
  return "";
}

export async function PublicationsGrid() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 100,
    sort: "order",
  });
  const projects = docs as ProjectDoc[];

  if (projects.length === 0) {
    return (
      <div className="sfv-empty">
        <span className="sfv-empty__emoji">📷</span>
        <h2>Todavía no tenés publicaciones</h2>
        <p>Creá la primera: subí una portada, ponele título y categoría, y guardá.</p>
        <Link className="sfv-btn sfv-btn--primary" href="/admin/collections/projects/create">
          + Crear mi primera publicación
        </Link>
      </div>
    );
  }

  return (
    <div className="sfv-grid">
      {projects.map((p) => {
        const url = coverUrl(p);
        return (
          <Link key={String(p.id)} className="sfv-pub" href={`/admin/collections/projects/${p.id}`}>
            <div className="sfv-pub__img">
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt={p.title ?? ""} loading="lazy" />
              ) : (
                <span className="sfv-pub__noimg">Sin portada</span>
              )}
              <span className="sfv-pub__type">{p.type === "video" ? "🎬 Video" : "📷 Foto"}</span>
              {p.featured ? <span className="sfv-pub__star" title="Se muestra en el inicio">★</span> : null}
              <div className="sfv-pub__overlay">
                <span className="sfv-pub__title">{p.title}</span>
                {categoryName(p) ? <span className="sfv-pub__cat">{categoryName(p)}</span> : null}
              </div>
            </div>
          </Link>
        );
      })}

      <Link className="sfv-pub sfv-pub--new" href="/admin/collections/projects/create">
        <span className="sfv-pub__plus">+</span>
        <span>Nueva publicación</span>
      </Link>
    </div>
  );
}

export default PublicationsGrid;
