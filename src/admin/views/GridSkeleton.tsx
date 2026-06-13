import React from "react";

/**
 * Placeholder animado mientras carga una grilla (publicaciones o biblioteca).
 * Mejora la sensación de velocidad del panel.
 */
export function GridSkeleton({ count = 8, media = false }: { count?: number; media?: boolean }) {
  return (
    <div className={`sfv-grid${media ? " sfv-grid--media" : ""}`} aria-busy="true" aria-label="Cargando…">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="sfv-pub sfv-skel" aria-hidden>
          <div className="sfv-pub__img" />
        </div>
      ))}
    </div>
  );
}

export default GridSkeleton;
