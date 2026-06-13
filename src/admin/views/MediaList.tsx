import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { cloudinaryThumb, cloudinaryVideoPoster } from "@/lib/cloudinary";

/**
 * Vista de lista de la Biblioteca: reemplaza la tabla de nombres de archivo por
 * una grilla de miniaturas (fotos y pósters de video). Tocá una para editarla.
 */

interface MediaDoc {
  id: string | number;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  alt?: string | null;
}

function tile(m: MediaDoc): { src: string | null; isVideo: boolean } {
  const isVideo = (m.mimeType ?? "").startsWith("video");
  const src = isVideo
    ? cloudinaryVideoPoster(m.url, { w: 320, h: 400 })
    : cloudinaryThumb(m.url, { w: 320, h: 400 });
  return { src, isVideo };
}

export async function MediaList() {
  const payload = await getPayload({ config });
  const { docs, totalDocs } = await payload.find({
    collection: "media",
    limit: 300,
    sort: "-createdAt",
    depth: 0,
  });
  const media = docs as MediaDoc[];

  return (
    <div className="sfv-dash" style={{ padding: "1.25rem" }}>
      <div className="sfv-dash__top">
        <div>
          <h1 className="sfv-dash__title">Biblioteca</h1>
          <p className="sfv-dash__sub">
            {totalDocs > 0
              ? `${totalDocs} ${totalDocs === 1 ? "archivo" : "archivos"} (fotos y videos). Tocá uno para editarlo.`
              : "Subí tu primera foto o video."}
          </p>
        </div>
        <Link className="sfv-btn sfv-btn--primary" href="/admin/collections/media/create">
          + Subir foto o video
        </Link>
      </div>

      {media.length === 0 ? (
        <div className="sfv-empty">
          <span className="sfv-empty__emoji">🖼️</span>
          <h2>Tu biblioteca está vacía</h2>
          <p>Subí fotos o videos para usarlos en tus publicaciones.</p>
          <Link className="sfv-btn sfv-btn--primary" href="/admin/collections/media/create">
            + Subir el primero
          </Link>
        </div>
      ) : (
        <div className="sfv-grid sfv-grid--media">
          {media.map((m) => {
            const { src, isVideo } = tile(m);
            return (
              <Link key={String(m.id)} className="sfv-pub" href={`/admin/collections/media/${m.id}`}>
                <div className="sfv-pub__img">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={m.alt ?? m.filename ?? ""} loading="lazy" />
                  ) : (
                    <span className="sfv-pub__noimg">{isVideo ? "🎬" : "🖼️"}</span>
                  )}
                  {isVideo ? <span className="sfv-pub__type">🎬 Video</span> : null}
                </div>
              </Link>
            );
          })}
          <Link className="sfv-pub sfv-pub--new" href="/admin/collections/media/create">
            <span className="sfv-pub__plus">+</span>
            <span>Subir</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MediaList;
