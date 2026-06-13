import React from "react";
import Link from "next/link";
import { PublicationsGrid } from "./PublicationsGrid";

const SITE_URL = "https://saltframevisuals.com";

/**
 * Vista de lista de la colección Publicaciones: reemplaza la tabla genérica de
 * Payload (nombres de archivo, columnas densas) por la grilla visual de portadas.
 */
export function ProjectsList() {
  return (
    <div className="sfv-dash" style={{ padding: "1.25rem" }}>
      <div className="sfv-dash__top">
        <div>
          <h1 className="sfv-dash__title">Publicaciones</h1>
          <p className="sfv-dash__sub">Tocá una publicación para editarla, cambiar la portada o agregar fotos.</p>
        </div>
        <div className="sfv-dash__actions">
          <a className="sfv-btn sfv-btn--ghost" href={SITE_URL} target="_blank" rel="noreferrer">
            👁️ Ver mi sitio
          </a>
          <Link className="sfv-btn sfv-btn--primary" href="/admin/collections/projects/create">
            + Nueva publicación
          </Link>
        </div>
      </div>

      <PublicationsGrid />
    </div>
  );
}

export default ProjectsList;
