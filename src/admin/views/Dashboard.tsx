import React from "react";
import Link from "next/link";
import { PublicationsGrid } from "./PublicationsGrid";

/**
 * Dashboard a medida para el fotógrafo. Reemplaza el panel por defecto de Payload:
 * saludo + grilla visual de publicaciones + accesos secundarios + ayuda.
 */
export async function Dashboard() {
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

      <PublicationsGrid />

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
