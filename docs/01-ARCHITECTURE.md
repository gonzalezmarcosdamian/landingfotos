# Salt Frame Visuals — Arquitectura y Escalabilidad

> Documento fundacional del proyecto. Define visión, decisiones técnicas, arquitectura del sistema,
> estrategia de rendimiento, escalabilidad, SEO, accesibilidad, seguridad y despliegue.
> Toda decisión de implementación posterior debe ser consistente con este documento.

- **Proyecto:** Landing page para Salt Frame Visuals (fotografía y video audiovisual para marcas)
- **Dominio objetivo:** `saltframevisuals.com`
- **Estado:** Definición de arquitectura (Fase 0)
- **Última actualización:** 2026-06-08
- **Owner técnico:** Equipo de desarrollo
- **Cliente:** Cae (creativo, Salt Frame Visuals)

---

## 1. Visión y objetivos

### 1.1 Propósito del producto
Salt Frame Visuals es una marca de contenido audiovisual (fotografía deportiva y video comercial)
con sede de operación en Australia y proyección internacional. La landing es la **carta de presentación
comercial**: su trabajo es convertir visitantes en conversaciones de negocio.

El contenido visual es el protagonista. La web es el marco (frame) que lo presenta sin estorbarlo.

### 1.2 Objetivos de negocio
| # | Objetivo | Métrica de éxito |
|---|----------|------------------|
| O1 | Generar leads cualificados (marcas/proyectos) | Clicks en CTA "HABLEMOS" / envíos de contacto |
| O2 | Transmitir profesionalismo y actitud de marca | Tiempo en página, scroll depth, retorno |
| O3 | Mostrar el portfolio de forma impactante | Vistas de proyectos, reproducciones de video |
| O4 | Posicionar la marca en búsquedas relevantes | Ranking SEO local (deporte, surf, real estate, gastronomía) |

### 1.3 Principios de diseño (rectores)
1. **El contenido visual es el rey.** La UI cede protagonismo a fotos y videos.
2. **Cero exceso, máxima actitud.** Texto mínimo, impactante, con voz propia.
3. **Lo simple como ventaja.** En un mundo saturado, la claridad convierte.
4. **Impacto sin sacrificar velocidad.** Carga progresiva, nunca un golpe de peso.
5. **Cada sección provoca curiosidad.** Narrativa que invita a descubrir más.

---

## 2. Requisitos

### 2.1 Requisitos funcionales (RF)
| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF1 | Hero con video/imágenes en loop de fondo + texto superpuesto + CTA Portfolio | Must |
| RF2 | Sección Portfolio con proyectos destacados (foto/video, por categoría) | Must |
| RF3 | Sección "Sobre mí" con espacio blanco y copy de marca | Must |
| RF4 | Sección Servicios (3 ejes) + CTA "HABLEMOS" | Must |
| RF5 | Footer minimalista con redes (@saltframevisuals) y email (info@saltframevisuals.com) | Must |
| RF6 | Navegación suave entre secciones (scroll/anchors) | Must |
| RF7 | Animaciones sutiles al desplazarse (scroll reveal) | Must |
| RF8 | Carga progresiva de medios (lazy + placeholders) | Must |
| RF9 | Lightbox/visor de proyecto (galería ampliada) | Should |
| RF10 | Formulario de contacto o integración directa (WhatsApp/email) | Should |
| RF11 | Internacionalización ES/EN (mercado australiano + hispano) | Could |
| RF12 | Filtro de portfolio por categoría (deporte, surf, real estate, gastronomía, etc.) | Could |

### 2.2 Requisitos no funcionales (RNF)
| ID | Requisito | Objetivo medible |
|----|-----------|------------------|
| RNF1 | Rendimiento | LCP < 2.5s, INP < 200ms, CLS < 0.1 (Core Web Vitals "Good") |
| RNF2 | Lighthouse | Performance ≥ 90, SEO ≥ 95, A11y ≥ 95, Best Practices ≥ 95 |
| RNF3 | Peso inicial | JS inicial < 150KB gzip; sin bloqueo de render por medios |
| RNF4 | Responsive | Mobile-first, perfecto de 320px a 4K |
| RNF5 | Accesibilidad | WCAG 2.1 AA (contraste, foco, teclado, motion-reduce) |
| RNF6 | SEO | SSR/SSG, metadatos OG, sitemap, datos estructurados |
| RNF7 | Disponibilidad | 99.9% (CDN/edge) |
| RNF8 | Mantenibilidad | Contenido desacoplado del código (fácil editar proyectos) |
| RNF9 | Compatibilidad | Últimas 2 versiones de Chrome, Safari, Firefox, Edge + iOS/Android |

### 2.3 Restricciones
- El dominio debe seguir siendo `saltframevisuals.com`.
- Paleta de marca fija: blanco / negro / rojo intenso `#D91A2A`.
- Tipografía sans-serif moderna (Montserrat / Poppins o similar).
- Presupuesto operativo bajo: preferir hosting con tier gratuito/escalable.

---

## 3. Decisiones de stack tecnológico (ADR resumido)

> Formato: Decisión → Justificación → Alternativas descartadas.

### 3.1 Framework: **Next.js 15 (App Router) + React 19**
- **Por qué:** SSG/SSR híbrido para SEO y velocidad; `next/image` y optimización de medios
  nativa; streaming de componentes; ecosistema maduro; despliegue de primera clase en Vercel.
- **Alternativas descartadas:**
  - *Astro:* excelente para contenido estático, pero menos fluido para interacciones ricas
    (lightbox, transiciones complejas) y portfolio dinámico futuro.
  - *SPA (Vite + React):* peor SEO y peor LCP en una landing visual.
  - *WordPress/Webflow:* menos control de rendimiento y costo de mantenimiento mayor a escala.

### 3.2 Lenguaje: **TypeScript (estricto)**
- Tipado del modelo de contenido (proyectos, categorías) → menos errores, mejor DX y escalabilidad.

### 3.3 Estilos: **Tailwind CSS v4**
- Utilidad-first, design tokens centralizados, purga automática → CSS mínimo en producción.
- Sistema de tokens de marca (colores, tipografía, espaciados) como única fuente de verdad.

### 3.4 Animación: **Motion (Framer Motion)**
- Scroll reveal, transiciones de sección y micro-interacciones declarativas.
- Respeta `prefers-reduced-motion` de forma sencilla (accesibilidad).

### 3.5 Medios: **next/image + estrategia de video adaptativa**
- Imágenes: AVIF/WebP responsive, `blur` placeholders, lazy loading.
- Video hero: `<video>` con `poster`, `preload="none"` fuera de viewport, formatos `webm`/`mp4`,
  con fallback a imagen en mobile/conexiones lentas.

### 3.6 Contenido: **archivos tipados (Fase 1) → CMS headless (Fase 3)**
- Empezamos con contenido en TypeScript/MDX tipado (rápido, versionado, cero costo).
- Camino de escalabilidad: migrar a **Sanity / Contentful** cuando el cliente necesite editar solo.

### 3.7 Hosting: **Vercel (Edge CDN)**
- CI/CD por git, preview deployments, edge caching, dominio custom + SSL automático.
- Free/Pro tier escalable; analítica de Web Vitals integrada.

### 3.8 Calidad: **ESLint + Prettier + TypeScript strict + Vitest + Playwright**
- Lint y formato consistentes; tests unitarios y E2E de flujos críticos.

---

## 4. Arquitectura del sistema

### 4.1 Vista de alto nivel
```
                         ┌─────────────────────────────┐
        Usuario  ─────►  │   Vercel Edge Network (CDN)  │
        (browser)        └──────────────┬──────────────┘
                                        │ HTML/JS/CSS estático (SSG) + imágenes optimizadas
                         ┌──────────────▼──────────────┐
                         │     Next.js App (App Router) │
                         │  ┌────────────────────────┐  │
                         │  │  Server Components (SSG)│  │  ← render de contenido
                         │  ├────────────────────────┤  │
                         │  │  Client Components      │  │  ← animación / lightbox / form
                         │  └────────────────────────┘  │
                         └──────┬───────────────┬───────┘
                                │               │
                   ┌────────────▼───┐   ┌───────▼────────────┐
                   │  Media storage │   │  Capa de contenido │
                   │ (Vercel/CDN/   │   │  (TS tipado → CMS) │
                   │  imágenes/video)│   │                    │
                   └────────────────┘   └────────────────────┘
                                │
                   ┌────────────▼───────────────┐
                   │  Integraciones (Fase 2+)     │
                   │  - Formulario → email/Resend │
                   │  - WhatsApp / mailto         │
                   │  - Analytics (Vercel/Plausible)│
                   └──────────────────────────────┘
```

### 4.2 Modelo de renderizado
- **Páginas de contenido:** Static Site Generation (SSG) → HTML pre-renderizado, máximo LCP/SEO.
- **Interactividad:** islas de Client Components (lightbox, animaciones, formulario).
- **Revalidación:** ISR opcional cuando se conecte CMS (revalidación por webhook).

### 4.3 Modelo de datos de contenido (núcleo)
```ts
type MediaType = "photo" | "video";
type Category =
  | "deporte" | "surf" | "real-estate" | "gastronomia" | "estudio" | "marca";

interface Project {
  slug: string;            // identificador en URL
  title: string;           // "Coolangatta Gold"
  client?: string;         // marca/cliente
  category: Category;
  type: MediaType;         // foto o video
  cover: MediaAsset;       // portada (con blur placeholder)
  gallery: MediaAsset[];   // medios del proyecto
  featured: boolean;       // aparece en home
  order: number;           // orden de aparición
  summary?: string;        // copy corto opcional
}

interface MediaAsset {
  src: string;
  alt: string;             // obligatorio (a11y + SEO)
  width: number;
  height: number;
  blurDataURL?: string;    // placeholder progresivo
  poster?: string;         // solo video
}
```

Proyectos iniciales (del brief): Coolangatta Gold, World Surf League, Get Motivated,
BSA Boat Syndication Australia, Country Club, Fu Ma Chi Asian Food, Squires Ink, Private House Cinematic.

### 4.4 Estructura de carpetas propuesta
```
saltframevisuals/
├─ docs/                      # arquitectura, diseño, decisiones
├─ public/                    # assets estáticos (favicon, og, fuentes locales)
│  └─ media/                  # imágenes/videos optimizados del portfolio
├─ src/
│  ├─ app/                    # App Router (layout, page, metadata, sitemap, robots)
│  │  ├─ layout.tsx
│  │  ├─ page.tsx             # landing (compone secciones)
│  │  ├─ (sections)/          # secciones como módulos
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/             # UI reutilizable (atoms/molecules)
│  │  ├─ ui/                  # botón, contenedor, tipografía
│  │  └─ media/               # SmartImage, BackgroundVideo, Lightbox
│  ├─ sections/               # Hero, Portfolio, About, Services, Footer
│  ├─ content/                # datos tipados: projects.ts, services.ts, site.ts
│  ├─ lib/                    # utilidades (seo, analytics, motion presets)
│  ├─ styles/                 # tokens, globals
│  └─ types/                  # tipos compartidos
├─ tests/                     # unit (Vitest) + e2e (Playwright)
├─ .env.example
└─ next.config.ts
```

**Regla de organización:** muchos archivos pequeños y cohesivos (200–400 líneas típico, 800 máx),
organizados por dominio/feature, no por tipo. Una sección = un módulo autocontenido.

---

## 5. Estrategia de rendimiento (RNF1–RNF3)

| Técnica | Aplicación |
|---------|------------|
| SSG | Todo el contenido pre-renderizado en build |
| Optimización de imágenes | `next/image` → AVIF/WebP, `sizes` responsive, `priority` solo en hero |
| Placeholders | `blurDataURL` para carga progresiva (impacto sin saltos) |
| Video hero responsable | `poster` inmediato, `preload="none"`, autoplay muted+loop, fallback a imagen en mobile/data-saver |
| Code splitting | Client Components cargados solo donde hacen falta (lightbox, form) |
| Fuentes | `next/font` (self-host Montserrat/Poppins, `display: swap`, subset) |
| Prefetch | Prefetch de rutas en viewport |
| CLS | Dimensiones explícitas en todo medio; reserva de espacio |
| Edge cache | Cabeceras inmutables para assets con hash |

**Presupuesto de performance** (se valida en CI):
- LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 · JS inicial ≤ 150KB gzip.

---

## 6. Estrategia de escalabilidad

El proyecto nace como landing, pero la arquitectura habilita crecer sin reescritura:

| Eje | Hoy (Fase 1) | Evolución |
|-----|--------------|-----------|
| **Contenido** | Archivos TS tipados | CMS headless (Sanity) con ISR → cliente edita solo |
| **Páginas** | Single landing | Rutas por proyecto `/work/[slug]`, blog, servicios detallados |
| **Internacionalización** | ES por defecto | i18n ES/EN con `next-intl` (mercado AU + hispano) |
| **Medios** | Estáticos en CDN | DAM / Mux para streaming de video adaptativo (HLS) |
| **Conversión** | mailto / WhatsApp | Formulario con backend (Resend + validación), CRM, agendamiento |
| **Comercio** | — | Reserva/cotización de sesiones, paquetes de servicio |
| **Analítica** | Web Vitals | Eventos de conversión, A/B testing de CTAs |
| **Infra** | Vercel single region | Edge multi-región, ISR, rate limiting en formularios |

**Principio:** desacoplar contenido, presentación e integraciones desde el día 1, para que cada
eje escale de forma independiente.

---

## 7. SEO y metadatos (RNF6)
- Render SSR/SSG para indexación completa.
- `metadata` por página (title, description, canonical).
- Open Graph + Twitter Cards (imagen de marca para compartir).
- `sitemap.ts` y `robots.ts` generados.
- Datos estructurados JSON-LD: `LocalBusiness` / `ProfessionalService` + `ImageObject`/`VideoObject`.
- URLs limpias y semánticas; `alt` obligatorio en todo medio.
- Optimización para keywords del nicho: fotografía deportiva, surf, real estate, gastronomía, marcas.

---

## 8. Accesibilidad (RNF5 — WCAG 2.1 AA)
- Contraste suficiente del rojo `#D91A2A` sobre fondos (validar combinaciones; usar variantes si hace falta).
- Navegación completa por teclado; foco visible.
- `prefers-reduced-motion`: desactivar/atenuar animaciones y autoplay.
- Texto alternativo en imágenes; subtítulos/transcripción si el video comunica info.
- Estructura semántica (landmarks, headings jerárquicos), HTML válido.
- Targets táctiles ≥ 44px.

---

## 9. Seguridad (defensiva)
- Sin secretos en el repositorio: variables de entorno (`.env.local`, `.env.example` sin valores).
- Headers de seguridad: CSP, HSTS, X-Content-Type-Options, Referrer-Policy.
- Formulario (Fase 2): validación de esquema (Zod), rate limiting, honeypot/anti-spam, sanitización.
- HTTPS forzado (SSL automático de Vercel).
- Dependencias auditadas (`npm audit`), Dependabot/Renovate para parches.

---

## 10. Despliegue e infraestructura (CI/CD)
```
git push → Vercel
   ├─ Preview deploy por PR (URL temporal para revisión)
   ├─ Checks: lint + typecheck + tests + build + Lighthouse CI
   └─ Merge a main → Production deploy (saltframevisuals.com)
```
- **Dominio:** `saltframevisuals.com` apuntado a Vercel (DNS + SSL automático).
- **Entornos:** Preview (por rama) y Production.
- **Observabilidad:** Vercel Analytics (Web Vitals) + monitoreo de errores (Sentry, Fase 2).
- **Rollback:** redeploy instantáneo de versión previa.

---

## 11. Calidad y testing (RNF)
| Nivel | Herramienta | Cobertura objetivo |
|-------|-------------|--------------------|
| Estático | TypeScript strict + ESLint + Prettier | 100% sin errores |
| Unit | Vitest | Utilidades y lógica de contenido (≥ 80%) |
| Componente | Testing Library | Render y comportamiento de secciones críticas |
| E2E | Playwright | Flujos: cargar landing, navegar secciones, abrir lightbox, click CTA |
| Performance | Lighthouse CI | Presupuesto de Web Vitals en cada PR |
| A11y | axe (en E2E) | Sin violaciones críticas |

Flujo TDD para lógica no trivial: test (RED) → implementación (GREEN) → refactor.

---

## 12. Identidad visual (tokens de marca)
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#FFFFFF` (light) / `#0A0A0A` (dark) | Fondo |
| `--color-fg` | `#0A0A0A` / `#FFFFFF` | Texto principal |
| `--color-accent` | `#D91A2A` | Botones, enlaces, acentos |
| `--font-display` | Montserrat / Poppins (bold) | Titulares grandes |
| `--font-body` | Montserrat / Poppins | Texto |
| Espaciado | Escala generosa | "Que respire" — mucho espacio blanco |

Estética: blanco y negro con toques puntuales de rojo intenso. Tipografía grande, bold, moderna.

---

## 13. Roadmap por fases
| Fase | Alcance | Entregable |
|------|---------|-----------|
| **0 — Arquitectura** | Este documento + design system doc | Bases definidas ✅ |
| **1 — MVP landing** | Hero, Portfolio, About, Services, Footer (contenido estático) | Landing en producción |
| **2 — Conversión** | Formulario/integración WhatsApp, analítica, datos estructurados | Captura de leads medible |
| **3 — Escala de contenido** | CMS headless + rutas por proyecto + i18n ES/EN | Cliente edita autónomamente |
| **4 — Avanzado** | Video streaming adaptativo, A/B testing, comercio de sesiones | Optimización de negocio |

---

## 14. Riesgos y mitigaciones
| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Medios pesados degradan LCP | Alto | Optimización agresiva, fallback de video, presupuesto en CI |
| Contraste del rojo sobre fondos | Medio | Validar WCAG; variantes de color para texto |
| Crecimiento de contenido sin CMS | Medio | Modelo desacoplado desde Fase 1; migración planificada Fase 3 |
| Dependencia de un solo proveedor (Vercel) | Bajo | Stack portable (Next standalone) a otros hosts si hiciera falta |

---

## 15. Glosario
- **SSG/SSR/ISR:** estrategias de renderizado (estático / servidor / incremental).
- **LCP/INP/CLS:** Core Web Vitals (carga, interacción, estabilidad).
- **CMS headless:** gestor de contenido desacoplado del front.
- **DAM:** Digital Asset Management (gestión de medios).
- **ADR:** Architecture Decision Record.

---

> **Próximo documento:** `02-DESIGN-SYSTEM.md` — tokens, tipografía, componentes, grilla y guías de UI.
