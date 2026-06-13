import React, { Suspense } from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { PublicationsGrid } from "./PublicationsGrid";
import { GridSkeleton } from "./GridSkeleton";
import { GUIDE_INTRO, GUIDE_SECTIONS } from "@/admin/guide";

const SITE_URL = "https://saltframevisuals.com";

/**
 * Inicio del backoffice. Lo primero que ve el fotógrafo: el objetivo del panel
 * y una guía de cómo usar cada sección. Debajo, sus publicaciones.
 */
export async function Dashboard() {
  const payload = await getPayload({ config });
  const { totalDocs } = await payload.count({ collection: "projects" });
  const count = totalDocs ?? 0;

  return (
    <div className="sfv-dash">
      <div className="sfv-intro">
        <div className="sfv-intro__text">
          <h1 className="sfv-intro__title">Hola 👋 Bienvenido a tu panel</h1>
          <p className="sfv-intro__lead">{GUIDE_INTRO}</p>
        </div>
        <a className="sfv-btn sfv-btn--ghost" href={SITE_URL} target="_blank" rel="noreferrer">
          👁️ Ver mi sitio
        </a>
      </div>

      <div className="sfv-guidegrid">
        {GUIDE_SECTIONS.map((s) => (
          <section className="sfv-guidecard" key={s.title}>
            <h2 className="sfv-guidecard__title">
              <span aria-hidden>{s.emoji}</span> {s.title}
            </h2>
            <p className="sfv-guidecard__obj">{s.objetivo}</p>
            <p className="sfv-guidecard__how">Cómo se usa:</p>
            <ol className="sfv-guidecard__steps">
              {s.pasos.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
            <Link className="sfv-btn sfv-btn--primary sfv-guidecard__cta" href={s.href}>
              Ir a {s.title}
            </Link>
          </section>
        ))}
      </div>

      <div className="sfv-dash__top sfv-dash__top--pubs">
        <div>
          <h2 className="sfv-dash__title">Tus publicaciones</h2>
          <p className="sfv-dash__sub">
            {count > 0
              ? `Tenés ${count} ${count === 1 ? "publicación" : "publicaciones"}. Tocá una para editarla.`
              : "Todavía no tenés publicaciones."}
          </p>
        </div>
        <Link className="sfv-btn sfv-btn--primary" href="/admin/collections/projects/create">
          + Nueva publicación
        </Link>
      </div>

      <Suspense fallback={<GridSkeleton />}>
        <PublicationsGrid />
      </Suspense>
    </div>
  );
}

export default Dashboard;
