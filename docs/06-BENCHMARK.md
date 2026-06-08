# Salt Frame Visuals — Benchmark vs. mejores portfolios audiovisuales del mundo

> Comparativa contra sitios premiados (Awwwards / FWA) del estilo "photography/video portfolio"
> y plan de mejoras aplicadas a la landing. Complementa [`04-DESIGN-SYSTEM.md`](./04-DESIGN-SYSTEM.md).

- **Estado:** Iteración de calidad (post-MVP)
- **Última actualización:** 2026-06-08

---

## 1. Referentes analizados (estilo y técnica)

| Sitio / tipo | Qué los hace top |
|--------------|------------------|
| **facunruiz.com** (referencia del cliente) | Minimalismo full-bleed, blur-up, foco absoluto en la imagen |
| **Jens Bosman** (video creator) | Layout photo-centric, cada proyecto se siente cinematográfico e inmersivo |
| **Grit Pictures** (filmmaking) | Texturas audaces, grano/colage, monocromo con identidad fuerte |
| Ganadores **Awwwards** portfolio/fotografía | Smooth scroll, cursor personalizado, reveals con máscara, tipografía oversize, micro-interacciones |

**Fuentes:** Awwwards (portfolio / photography collections), Muzli "Top portfolios", Knapsack "Best photography & videography portfolio websites".

---

## 2. Patrones recurrentes de los mejores (checklist)

| # | Patrón best-in-class | Teníamos (v1) | Aplicado |
|---|----------------------|:---:|:---:|
| 1 | **Smooth scroll** con inercia (Lenis/Locomotive) | ❌ | ✅ |
| 2 | **Grano filmico** sutil (textura premium, look analógico) | ❌ | ✅ |
| 3 | **Cursor personalizado** con estados (crece, "VER" en proyectos) | ❌ | ✅ |
| 4 | **Intro/reveal** de marca al cargar (no un flash blanco) | ❌ | ✅ |
| 5 | **Reveals con máscara/clip-path** de imágenes y titulares | parcial (fade) | ✅ |
| 6 | **Parallax / scale on scroll** en hero y medios | ❌ | ✅ |
| 7 | **Tipografía oversize + numeración editorial** (01 — Proyecto) | parcial | ✅ |
| 8 | **Marquee** de texto en movimiento (clientes/categorías) | ❌ | ✅ |
| 9 | **Micro-interacciones**: subrayado animado, botones magnéticos | ❌ | ✅ |
| 10 | **Layout editorial/asimétrico** (no grilla perfecta uniforme) | ❌ | ✅ (featured destacado) |
| 11 | Monocromo + 1 acento, mucho espacio negativo | ✅ | ✅ |
| 12 | Performance alta pese a la riqueza (lazy, reduced-motion) | ✅ | ✅ |
| 13 | Hover-preview de video en proyectos | ❌ | ⏳ (al llegar el material real) |
| 14 | Página por proyecto con transición | ❌ | ⏳ (Fase 3, rutas /work/[slug]) |

---

## 3. Diagnóstico de la v1

**Fortalezas:** base sólida, marca correcta (B&N + rojo), video real en hero, SEO/a11y/performance ok.

**Brechas vs. top:** se sentía "limpia pero estándar". Faltaba el *craft* interactivo que distingue a un
portfolio premiado: el tacto del scroll, la textura, el cursor, los reveals con máscara y la tipografía
con actitud editorial. Eso es lo que separa "plantilla correcta" de "sitio memorable".

---

## 4. Mejoras aplicadas en esta iteración

1. **Smooth scroll (Lenis):** inercia suave en toda la página; desactivado con `prefers-reduced-motion`.
2. **Grano filmico:** capa global de ruido sutil → look analógico/premium, coherente con foto/video.
3. **Cursor personalizado (desktop):** punto que sigue al mouse, crece sobre interactivos y muestra
   "VER" sobre las piezas del portfolio. Oculto en touch.
4. **Intro reveal:** cortina negra con el wordmark que se retira al cargar (sin flash, entrada con clase).
5. **Hero:** parallax/scale del video al hacer scroll, titular con **mask reveal** línea por línea, y
   **video vertical (9:16) en mobile** (antes recortaba el horizontal).
6. **Nav:** subrayado animado en links + logo con efecto magnético.
7. **Portfolio editorial:** numeración (01–08), **reveal con clip-path** al entrar, primera pieza
   destacada a mayor tamaño (layout asimétrico), overline de categoría.
8. **Marquee band:** banda de texto en movimiento con las categorías/clientes (deporte · surf · real
   estate · gastronomía…), separador con ritmo entre secciones.
9. **Botones magnéticos** en los CTA (Portfolio / Hablemos).

Todo respeta `prefers-reduced-motion` (se degrada a estados estáticos) y mantiene el presupuesto de
performance (Lenis ~3KB; interacciones sin librerías pesadas extra).

---

## 5. Próximas mejoras (cuando llegue el material real)

- **Hover-preview de video** en tarjetas de portfolio (muted, on-hover).
- **Páginas por proyecto** `/work/[slug]` con galería full-bleed y transición de página.
- **Lightbox** cinematográfico para fotos.
- **Color grade/contraste consistente** en todo el material (look de marca).
- **Cierre de audit:** subir vitest a v3 (dev-only) para audit 100% limpio.

---

> **Relacionado:** [`04-DESIGN-SYSTEM.md`](./04-DESIGN-SYSTEM.md) · [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md)
