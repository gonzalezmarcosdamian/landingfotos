import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Dashboard a medida para el fotógrafo. Reemplaza el panel por defecto de Payload:
 * muestra las publicaciones como tarjetas con su portada (clic = editar), un botón
 * grande para crear, y accesos secundarios. Visual, claro y mobile-first.
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

export async function Dashboard() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 100,
    sort: "order",
  });
  const projects = docs as ProjectDoc[];

  return (
    <div className="sfv-dash">
      <div className="sfv-dash__top">
        <div>
          <h1 className="sfv-dash__title">Mis publicaciones</h1>
          <p className="sfv-dash__sub">Tocá una publicación para editarla, cambiar la portada o agregar fotos.</p>
        </div>
        <Link className="sfv-btn sfv-btn--primary" href="/admin/collections/projects/create">
          + Nueva publicación
        </Link>
      </div>

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
              </div>
              <div className="sfv-pub__body">
                <span className="sfv-pub__title">{p.title}</span>
                <span className="sfv-pub__cat">{categoryName(p)}</span>
              </div>
            </Link>
          );
        })}

        <Link className="sfv-pub sfv-pub--new" href="/admin/collections/projects/create">
          <span className="sfv-pub__plus">+</span>
          <span>Nueva publicación</span>
        </Link>
      </div>

      <div className="sfv-dash__secondary">
        <Link className="sfv-tile" href="/admin/collections/media">
          <span>🖼️</span> Biblioteca de fotos y videos
        </Link>
        <Link className="sfv-tile" href="/admin/globals/site-settings">
          <span>✍️</span> Textos del sitio
        </Link>
        <Link className="sfv-tile" href="/admin/collections/categories">
          <span>🏷️</span> Categorías
        </Link>
      </div>

      <details className="sfv-help">
        <summary>¿Necesitás ayuda? Tareas comunes</summary>
        <ul>
          <li><strong>Cambiar la portada:</strong> abrí la publicación → pestaña <em>Portada y medios</em> → elegí la foto en <em>Portada</em> → Guardar.</li>
          <li><strong>Agregar fotos:</strong> misma pestaña → <em>Galería</em> → Agregar (podés arrastrarlas para ordenar) → Guardar.</li>
          <li><strong>Sumar un video:</strong> <em>Portada y medios</em> → <em>Video</em> → subí el .mp4 → Guardar.</li>
          <li><strong>Editar textos del sitio:</strong> <em>Textos del sitio</em> → elegí la pestaña → usá <em>ES/EN</em> arriba a la derecha → Guardar.</li>
        </ul>
        <p>Los cambios se ven en saltframevisuals.com en ~1 minuto.</p>
      </details>
    </div>
  );
}

export default Dashboard;
