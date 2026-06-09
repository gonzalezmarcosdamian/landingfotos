# Salt Frame Visuals — Estrategia de Backoffice / CMS (decisión)

> Documento de decisión: ¿cómo carga Cae el contenido (proyectos, fotos, videos) sin depender
> del desarrollador? Evalúa reutilizar **lexcore** vs. un CMS dedicado, y propone un plan integral.
> Reemplaza el enfoque preliminar de [`03-BACKOFFICE.md`](./03-BACKOFFICE.md) (que asumía Payload).

- **Estado:** Decisión pendiente (esperando definición estratégica del owner)
- **Última actualización:** 2026-06-09

---

## 1. El problema a resolver

Hoy el contenido vive en archivos tipados del repo (`src/content/*`). Para cada cambio hay que
editar código y redeployar. **Objetivo:** que Cae administre proyectos, suba fotos/videos, edite
textos y vea leads desde un panel, sin tocar código y sin que vos intermedies.

→ **Sí, hace falta un CMS / backoffice.** La pregunta no es "si", es "cuál y cómo".

---

## 2. Qué es lexcore y qué se puede reutilizar

`lexcore` (producto "Luthor") es una **plataforma multi-tenant SaaS para estudios de abogados**.
Aunque el *dominio* no aplica, su **núcleo de infraestructura es oro reutilizable**:

| Activo de lexcore | ¿Reutilizable para Salt Frame? |
|-------------------|-------------------------------|
| **Storage de archivos** (`services/storage.py`, S3/MinIO dev → **Cloudflare R2** prod) | ✅✅ Justo lo que necesitan fotos/videos |
| **Auth** (JWT dev → Supabase prod, Google OAuth) | ✅ Login del panel |
| **Multi-tenant** (`tenant_id`, aislamiento, `BaseQuery`) | ⚠️ Solo si es plataforma multi-cliente |
| **Suscripciones** (MercadoPago, trial 30 días) | ⚠️ Solo si se monetiza como producto |
| **Invitaciones + superadmin + RBAC** | ⚠️ Útil en plataforma; overkill para 1 usuario |
| **Panel admin** (Next 14 + Shadcn/ui, flujos auth, CRUD) | ✅ Shell de admin adaptable |
| **Infra** (Docker, Alembic, Railway + Vercel) | ✅ Pipeline de deploy probado |
| **Arquitectura limpia** (models/schemas/routers/services) | ✅ Patrón sólido para nuevos dominios |

**Mismatch a cubrir:**
- Dominio legal (expedientes, honorarios, audiencias) → reemplazar por **Proyectos, Media, Servicios, Leads, SiteSettings**.
- lexcore sube **documentos adjuntos**, no **medios web optimizados** → falta pipeline de
  derivados responsive (AVIF/WebP, posters, blur, video web). Hay que agregarlo (Sharp/ffmpeg o Cloudinary/Mux).
- Multi-tenant y suscripciones son **overkill para un solo fotógrafo**.

---

## 3. La decisión que define todo: ¿sitio de un cliente o plataforma?

Todo el plan depende de esto:

### Escenario A — "Solo Cae" (un sitio, un cliente)
La web es de Salt Frame y punto. No hay más clientes en el horizonte cercano.

### Escenario B — "Plataforma / agencia" (muchos clientes)
Querés ofrecer **landing + backoffice como servicio** a varios clientes (fotógrafos, restaurantes,
gimnasios…). Cada cliente es un tenant. Salt Frame es el **cliente #1**. Lo monetizás (suscripción).

> Esto encaja con tener `buildfuture` y varios proyectos: si la visión es **producto**, lexcore es la base correcta.

---

## 4. Las tres opciones (con recomendación)

### 🅰️ Opción A — **Payload CMS embebido** (mejor para Escenario A)
CMS dedicado dentro del **mismo repo Next.js** de la landing. Admin en `/admin`.
- **Colecciones:** Projects, Media, Services, Leads + Global SiteSettings.
- **DB:** Postgres (Neon/Supabase). **Storage:** R2/Vercel Blob. **Media:** Sharp genera derivados al subir.
- **Landing:** lee con Local API + ISR (revalida sin redeploy).
- ✅ 1 repo, 1 deploy, gestión de medios y panel **gratis**, listo en días, costo casi nulo.
- ❌ No multi-tenant. Acoplado a Payload.
- **Esfuerzo:** Bajo (≈ 1 semana).

### 🅱️ Opción B — **Reutilizar lexcore como plataforma multi-tenant** (mejor para Escenario B)
Forkear/extender el core de lexcore como **"plataforma de sitios de clientes"**.
- **Tenant = Cliente/Marca.** Nuevos modelos (heredan `TenantModel`): `Project`, `MediaAsset`,
  `Service`, `Lead`, `SiteSettings`.
- **Reutiliza tal cual:** auth, **storage R2**, multi-tenant, suscripciones, invitaciones, superadmin, shell Shadcn, Docker, Railway/Vercel.
- **Agrega:** pipeline de optimización de medios (Sharp/ffmpeg o Cloudinary/Mux) + endpoints
  públicos read-only para que las landings consuman contenido (con ISR).
- **Salt Frame = tenant #1.** Nuevos clientes = nuevo tenant + su landing.
- ✅ Escalable, monetizable (cobro ya resuelto), reutiliza muchísima infra probada.
- ❌ Más trabajo ahora, 2 repos/deploys, hay que **templatizar** la landing por tenant eventualmente.
- **Esfuerzo:** Medio-alto (≈ 3–5 semanas para MVP de plataforma).

### 🅲 Opción C — **Admin liviano propio reusando piezas de lexcore** (punto medio, Escenario A+)
Un servicio FastAPI chico (o mini-extensión) **single-tenant** con solo Projects/Media/Services/Leads,
reusando `storage.py` (R2) y el patrón de auth de lexcore, sin multi-tenant ni suscripciones.
- ✅ Reusa storage/auth probados; control total.
- ❌ Reinventás el panel de edición que Payload regala; más mantenimiento que A.
- **Esfuerzo:** Medio (≈ 2 semanas).

### Recomendación honesta
- **Si es solo Cae ahora** (aunque quizá más clientes después): **Opción A (Payload)**. Sacás a Cae
  cargando contenido en días, costo mínimo, sin construir infra multi-tenant para un solo usuario (YAGNI).
  Cuando aparezcan clientes reales y pagantes, evolucionás a la Opción B.
- **Si ya vas a construir la plataforma/agencia ahora** (varios clientes inminentes): **Opción B sobre lexcore**.
  Ahí el trabajo extra se justifica y reutilizás el 70% de lexcore.

> Regla: no construir multi-tenant para un usuario. Construirlo cuando el negocio lo pida.

---

## 5. Plan integral — Opción A (Payload) [recomendado si Escenario A]

| Paso | Entregable |
|------|-----------|
| A1 | Integrar Payload 3 en el repo de la landing; Postgres (Neon); auth admin |
| A2 | Colección **Media** (upload + Sharp → AVIF/WebP + blur); storage R2 |
| A3 | Colección **Projects** (cover, galería, categoría, tipo, featured, order, draft/publish) |
| A4 | **Services** + Global **SiteSettings** (hero, sobre mí, contacto) |
| A5 | Migrar contenido actual de `src/content/*` a Payload |
| A6 | Conectar landing a Local API + ISR/`revalidateTag`; draft preview |
| A7 | Colección **Leads** + formulario público → email (Resend) |
| A8 | Hardening: RBAC, rate-limit login, validación de uploads, headers; tests E2E |
| A9 | Deploy (landing + admin en Vercel) + dominio `saltframevisuals.com` |

## 6. Plan integral — Opción B (lexcore plataforma) [si Escenario B]

| Fase | Entregable |
|------|-----------|
| B0 | Fork de lexcore → `clientsites` (o reusar repo). Quitar dominio legal o desactivarlo |
| B1 | Modelos nuevos `TenantModel`: Project, MediaAsset, Service, Lead, SiteSettings + migraciones Alembic |
| B2 | Routers CRUD + services + tests de aislamiento por tenant (regla de oro lexcore) |
| B3 | **Pipeline de medios**: subir a R2 + derivados (Sharp/ffmpeg) o integrar Cloudinary/Mux |
| B4 | Endpoints **públicos read-only** del contenido por tenant (para las landings) |
| B5 | Admin (Shadcn): páginas Proyectos/Media/Servicios/Leads/Ajustes; reusar auth/layout |
| B6 | Conectar la landing actual al API de la plataforma (tenant=salt-frame) con ISR |
| B7 | Onboarding de tenant + suscripción (reusar MercadoPago/trial) + superadmin |
| B8 | Deploy: backend Railway + landings Vercel; dominios por cliente |

---

## 7. Decisión de medios (común a A y B)
- **Imágenes:** subir original → derivados AVIF/WebP responsive + `blurDataURL` (Sharp).
- **Video:** para producción real conviene **Mux** (HLS adaptativo, posters) o R2 + transcodificación;
  el hero showreel actual (13–16 MB) funciona, pero a escala el video pide un servicio dedicado.
- **Storage:** **Cloudflare R2** (ya resuelto en lexcore) — barato, S3-compatible, sin egress.

---

## 8. Recomendación final (resumen)
1. **Definir Escenario A vs B** (pregunta al owner).
2. **A →** Payload embebido (rápido, barato, ideal para Cae).
3. **B →** lexcore como plataforma (reutiliza auth/storage/subs/admin; Salt Frame = tenant #1).
4. En ambos: **R2 para storage** (reusar la pieza de lexcore) y pipeline de derivados de medios.

---

> **Relacionado:** [`03-BACKOFFICE.md`](./03-BACKOFFICE.md) (diseño Payload detallado) ·
> [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md) · [`05-MEDIA-GUIDE.md`](./05-MEDIA-GUIDE.md)
