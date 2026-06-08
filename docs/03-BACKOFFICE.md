# Salt Frame Visuals — Arquitectura del Backoffice (Panel de Administración)

> Define el panel de administración para que **Cae** gestione el contenido de la landing
> (proyectos, medios, servicios, textos, contacto) sin tocar código.
> Complementa a [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md) y [`02-DEVELOPMENT-WORKFLOW.md`](./02-DEVELOPMENT-WORKFLOW.md).

- **Estado:** Diseño (se implementa en Fase 2–3)
- **Última actualización:** 2026-06-08

---

## 1. Objetivo

Que el dueño del negocio administre de forma autónoma:
- **Portfolio:** crear/editar/ordenar proyectos, subir fotos y videos, marcar destacados.
- **Servicios:** editar los 3 ejes de servicio y sus textos.
- **Contenido del sitio:** copy del Hero, "Sobre mí", datos de contacto y redes.
- **Leads:** ver los mensajes de contacto recibidos (Fase 2+).

Sin necesidad de desarrollador para el día a día de contenido. **Desacopla contenido de código.**

---

## 2. Decisión de stack: **Payload CMS 3**

**Decisión:** usar **Payload CMS 3**, integrado nativamente dentro de la misma app Next.js (App Router).

**Por qué:**
- Corre **dentro del mismo proyecto Next.js** (panel en `/admin`) → un solo codebase, un solo deploy.
- **TypeScript-first:** las colecciones generan tipos que consume el frontend → fin a fin tipado.
- Trae **listo:** panel de administración, autenticación de usuarios, control de acceso por roles,
  gestión y subida de medios, versionado/borradores, REST + GraphQL + API local.
- **Self-hosted y open source:** sin costo de licencia; los datos son del cliente.
- Encaja con el modelo de contenido ya definido en `01-ARCHITECTURE.md` (`Project`, `MediaAsset`).

**Alternativas evaluadas:**
| Opción | Por qué se descarta |
|--------|---------------------|
| **Sanity** (SaaS) | Excelente, pero datos en infra de terceros y costo por uso al escalar medios |
| **Contentful** | Caro a escala; menos control |
| **Backoffice 100% a medida** (Next + Supabase + auth propia) | Reinventa auth, media, RBAC y panel → más superficie de bugs y mantenimiento (viola YAGNI/DRY) |
| **WordPress** | Stack distinto, peor rendimiento, mayor mantenimiento |

> Esta decisión **actualiza** la "capa de contenido" de `01-ARCHITECTURE.md`: en lugar de migrar a un
> CMS externo en Fase 3, el backoffice es Payload embebido. El modelo tipado de Fase 1 se mapea
> directamente a colecciones de Payload.

---

## 3. Infraestructura asociada

| Componente | Elección | Notas |
|------------|----------|-------|
| **Base de datos** | PostgreSQL (Neon / Supabase / Vercel Postgres) | Adaptador `@payloadcms/db-postgres`; serverless-friendly |
| **Almacenamiento de medios** | Vercel Blob **o** Cloudflare R2 / S3 | Adaptador de storage de Payload; CDN delante |
| **Procesamiento de imágenes** | Sharp (Payload) + `next/image` | Genera tamaños responsive en upload |
| **Video** | R2/S3 + (Fase 4) Mux para HLS adaptativo | Posters generados en upload |
| **Auth** | Auth integrada de Payload (cookies httpOnly + JWT) | Solo usuarios admin; sin registro público |
| **Email (leads/reset)** | Resend | Notificación de nuevos contactos y reset de password |

---

## 4. Modelo de datos (Colecciones y Globals de Payload)

### 4.1 Colecciones
```ts
// Users (admin) — autenticación del backoffice
Users {
  email, password,            // auth de Payload
  name,
  role: 'admin' | 'editor'    // RBAC
}

// Media — biblioteca de fotos/videos con derivados responsive
Media {
  file,                       // upload (sharp genera tamaños)
  alt: string (requerido),    // a11y + SEO
  type: 'photo' | 'video',
  poster?,                    // solo video
  width, height, blurDataURL
}

// Projects — el portfolio
Projects {
  title,                      // "Coolangatta Gold"
  slug (único, auto),
  client?,
  category: 'deporte' | 'surf' | 'real-estate' | 'gastronomia' | 'estudio' | 'marca',
  mediaType: 'photo' | 'video',
  cover -> Media,
  gallery -> Media[],
  summary?,                   // copy corto
  featured: boolean,          // aparece en home
  order: number,              // orden manual (drag & drop)
  status: 'draft' | 'published',
  publishedAt
}

// Services — los 3 ejes de servicio
Services {
  title, description, icon?, order
}

// Leads — mensajes de contacto recibidos (Fase 2+)
Leads {
  name, email, message,
  source,                     // formulario / whatsapp
  createdAt,
  status: 'new' | 'contacted' | 'closed'   // gestión simple de pipeline
}
```

### 4.2 Globals (contenido singular del sitio)
```ts
SiteSettings (global) {
  hero: { headline, subheadline, tagline, ctaLabel },
  about: { heading, body },           // "Soy Cae, creativo detrás de..."
  contact: { email, instagram, whatsapp },
  seo: { defaultTitle, defaultDescription, ogImage -> Media }
}
```

---

## 5. Arquitectura (cómo se integra con la landing)

```
                ┌─────────────────────────── Next.js App (un solo deploy) ──────────────────────────┐
   Visitante ─► │  app/(site)/...        Landing pública (SSG/ISR)                                   │
                │       └── lee contenido vía  Payload Local API  (sin HTTP, en build/render)        │
                │                                                                                     │
   Cae (admin) ►│  app/(payload)/admin   Backoffice (panel Payload)  ── auth requerida               │
                │  app/(payload)/api      REST + GraphQL de Payload                                   │
                └───────────────┬──────────────────────────────────────────────┬─────────────────────┘
                                │                                              │
                       ┌────────▼─────────┐                          ┌─────────▼─────────┐
                       │  PostgreSQL       │                          │  Media storage     │
                       │  (Neon/Supabase)  │                          │  (Vercel Blob/R2)  │
                       └───────────────────┘                          └────────────────────┘
```

### 5.1 Flujo de actualización de contenido (con revalidación)
```
Cae edita un proyecto en /admin  ──► guarda en PostgreSQL
        │
        └─► hook afterChange de Payload dispara revalidación ISR de Next
                │
                └─► la landing se regenera con el nuevo contenido (sin redeploy)
```
- La landing usa **ISR** (`revalidate` + `revalidateTag`) para reflejar cambios sin redeploy.
- En build, la landing lee con la **Local API** de Payload (máximo rendimiento, sin HTTP).

---

## 6. Seguridad del backoffice (crítico)

> Toda esta superficie dispara `/security-review` obligatorio antes de mergear (ver `02-DEVELOPMENT-WORKFLOW.md`).

| Vector | Mitigación |
|--------|------------|
| **Autenticación** | Auth de Payload, cookies `httpOnly`+`Secure`+`SameSite`, sesiones con expiración |
| **Autorización (RBAC)** | Access control por colección/campo; `editor` no puede gestionar usuarios |
| **Sin registro público** | Alta de usuarios solo por admin existente (seed inicial controlado) |
| **Fuerza bruta** | Rate limiting y bloqueo de cuenta tras N intentos (Payload `maxLoginAttempts`) |
| **Subida de archivos** | Validar MIME/tamaño, lista blanca de tipos, sin ejecución; almacenamiento fuera del root |
| **Inyección** | Queries parametrizadas (ORM de Payload), validación con esquemas |
| **CSRF** | Protección de Payload + `SameSite` |
| **Secretos** | `PAYLOAD_SECRET`, `DATABASE_URI`, claves de storage solo en variables de entorno |
| **Headers** | CSP, HSTS, X-Content-Type-Options en `next.config` |
| **Transporte** | HTTPS forzado |
| **Datos sensibles en errores** | Mensajes genéricos al cliente; detalle solo en logs server |

---

## 7. Variables de entorno (documentadas en `.env.example`)
```
PAYLOAD_SECRET=            # clave de cifrado de sesiones (alta entropía)
DATABASE_URI=             # cadena de conexión PostgreSQL
BLOB_READ_WRITE_TOKEN=    # o credenciales S3/R2 según storage
RESEND_API_KEY=           # email (notificación de leads / reset)
NEXT_PUBLIC_SITE_URL=     # https://saltframevisuals.com
PREVIEW_SECRET=           # para draft preview desde el panel
```
> Nunca se commitean valores reales. `.env.example` contiene solo las claves.

---

## 8. Funcionalidades del panel (UX para Cae)

- **Dashboard:** acceso rápido a proyectos, leads nuevos, settings.
- **Proyectos:** lista con drag & drop para ordenar; toggle "destacado"; estados borrador/publicado.
- **Editor de proyecto:** subir múltiples medios, elegir portada, escribir copy, asignar categoría.
- **Biblioteca de medios:** reutilizar fotos/videos entre proyectos; `alt` obligatorio.
- **Borradores y vista previa:** previsualizar cambios en la landing antes de publicar (draft preview).
- **Servicios y textos del sitio:** edición de Hero, "Sobre mí", contacto y redes (Globals).
- **Leads:** bandeja de contactos con estados (nuevo/contactado/cerrado) — Fase 2+.
- **i18n (Fase 3):** campos localizados ES/EN sobre la misma estructura.

---

## 9. Testing del backoffice

| Nivel | Qué se prueba |
|-------|---------------|
| Unit | Hooks de Payload (slug, revalidación), access control (RBAC) |
| Integración | CRUD de colecciones contra DB de test |
| E2E (Playwright) | Login admin · crear proyecto · subir medio · publicar · ver reflejado en landing · logout |
| Seguridad | Acceso no autenticado bloqueado · `editor` sin permiso de Users · validación de uploads |

---

## 10. Roadmap de implementación del backoffice
| Paso | Alcance |
|------|---------|
| B1 | Integrar Payload en la app Next; DB Postgres; colección Media + Users + auth |
| B2 | Colección Projects + Globals SiteSettings/Services; migrar contenido inicial del brief |
| B3 | Conectar landing a la Local API + ISR/revalidación; draft preview |
| B4 | Colección Leads + formulario público → notificación por email |
| B5 | RBAC fino, rate limiting, hardening de seguridad, tests E2E completos |
| B6 (Fase 3) | i18n ES/EN; optimización de video (Mux) |

---

> **Documentos relacionados:** [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md) · [`02-DEVELOPMENT-WORKFLOW.md`](./02-DEVELOPMENT-WORKFLOW.md)
