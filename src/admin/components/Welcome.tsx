import React from "react";
import Link from "next/link";

/**
 * Panel de bienvenida del backoffice (beforeDashboard).
 * Pensado para un fotógrafo: accesos directos grandes + guía de tareas comunes.
 */
export function Welcome() {
  return (
    <section className="sfv-welcome">
      <header className="sfv-welcome__head">
        <h1>Hola 👋 Bienvenido a tu panel</h1>
        <p>Desde acá manejás todo tu portfolio: publicaciones, fotos, videos y los textos del sitio.</p>
      </header>

      <div className="sfv-welcome__cards">
        <Link className="sfv-card" href="/admin/collections/projects">
          <span className="sfv-card__emoji">📸</span>
          <span className="sfv-card__title">Mis publicaciones</span>
          <span className="sfv-card__desc">Ver, crear y editar proyectos. Cambiar portadas y orden.</span>
        </Link>
        <Link className="sfv-card" href="/admin/collections/media">
          <span className="sfv-card__emoji">🖼️</span>
          <span className="sfv-card__title">Biblioteca de fotos y videos</span>
          <span className="sfv-card__desc">Subí material nuevo para usar en tus publicaciones.</span>
        </Link>
        <Link className="sfv-card" href="/admin/globals/site-settings">
          <span className="sfv-card__emoji">✍️</span>
          <span className="sfv-card__title">Textos del sitio</span>
          <span className="sfv-card__desc">Editá el inicio, “Sobre mí”, servicios y contacto (ES/EN).</span>
        </Link>
      </div>

      <div className="sfv-guide">
        <h2>¿Cómo hago…?</h2>
        <ol className="sfv-guide__list">
          <li>
            <strong>Cambiar la portada de un proyecto:</strong> entrá a <em>Mis publicaciones</em> → abrí el
            proyecto → pestaña <em>Portada y medios</em> → en <em>Portada</em> elegí o subí la foto → <em>Guardar</em>.
          </li>
          <li>
            <strong>Agregar fotos a un proyecto:</strong> en el mismo proyecto, pestaña <em>Portada y medios</em> →
            <em> Galería</em> → <em>Agregar</em> y subí las fotos (podés arrastrarlas para ordenarlas) → <em>Guardar</em>.
          </li>
          <li>
            <strong>Sumar un video:</strong> en <em>Portada y medios</em> → <em>Video</em> → subí el archivo .mp4 →
            <em> Guardar</em>.
          </li>
          <li>
            <strong>Crear una publicación nueva:</strong> <em>Mis publicaciones</em> → <em>Crear nuevo</em> → cargá
            título, categoría, portada y guardá.
          </li>
          <li>
            <strong>Cambiar un texto del sitio:</strong> <em>Textos del sitio</em> → elegí la pestaña → editá → usá el
            selector <em>ES / EN</em> arriba a la derecha para cada idioma → <em>Guardar</em>.
          </li>
        </ol>
        <p className="sfv-guide__note">
          Los cambios se ven en <a href="https://saltframevisuals.com" target="_blank" rel="noreferrer">saltframevisuals.com</a> en
          alrededor de 1 minuto.
        </p>
      </div>
    </section>
  );
}

export default Welcome;
