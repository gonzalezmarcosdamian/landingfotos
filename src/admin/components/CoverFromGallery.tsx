"use client";

import React, { useEffect, useState } from "react";
import { useField, useFormFields } from "@payloadcms/ui";
import { cloudinaryThumb } from "@/lib/cloudinary";

/**
 * Selector de portada: muestra las fotos de la galería como miniaturas y, al
 * tocar una, la marca como portada (setea el campo `cover`). Más simple que
 * arrastrar entre campos y funciona bien en mobile.
 */

type Id = string | number;

const thumb = (url?: string | null) => cloudinaryThumb(url, { w: 200, h: 250 });

export function CoverFromGallery() {
  const { value: cover, setValue: setCover } = useField<Id>({ path: "cover" });
  const galleryValue = useFormFields(([fields]) => fields?.gallery?.value) as Id[] | undefined;
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const ids: Id[] = Array.isArray(galleryValue) ? galleryValue : [];
  const key = ids.join(",");

  useEffect(() => {
    if (!ids.length) {
      setThumbs({});
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/media?where[id][in]=${ids.join(",")}&limit=200&depth=0`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((j: { docs?: { id: Id; url?: string }[] }) => {
        if (cancelled) return;
        const map: Record<string, string> = {};
        for (const d of j.docs ?? []) {
          const t = thumb(d.url);
          if (t) map[String(d.id)] = t;
        }
        setThumbs(map);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!ids.length) {
    return (
      <p className="sfv-coverpick__empty">
        Subí fotos a la <strong>Galería</strong> (abajo) y después tocá una para usarla de portada.
      </p>
    );
  }

  return (
    <div className="sfv-coverpick">
      <p className="sfv-coverpick__label">Tocá una foto de tu galería para usarla de portada:</p>
      <div className="sfv-coverpick__grid">
        {ids.map((id) => {
          const isCover = String(id) === String(cover);
          const url = thumbs[String(id)];
          return (
            <button
              type="button"
              key={String(id)}
              className={`sfv-coverpick__item${isCover ? " is-cover" : ""}${!url && loading ? " is-loading" : ""}`}
              onClick={() => setCover(id)}
              aria-pressed={isCover}
              aria-label={isCover ? "Portada actual" : "Usar esta foto como portada"}
              title={isCover ? "Es la portada" : "Usar como portada"}
            >
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" loading="lazy" />
              ) : (
                <span className="sfv-coverpick__ph" />
              )}
              {isCover ? <span className="sfv-coverpick__badge">★ Portada</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CoverFromGallery;
