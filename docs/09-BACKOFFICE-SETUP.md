# Salt Frame Visuals — Backoffice (Payload CMS) — IMPLEMENTADO

> Estado de la implementación del backoffice y cómo ponerlo en producción.
> Complementa el diseño en [`03-BACKOFFICE.md`](./03-BACKOFFICE.md) y la estrategia en
> [`07-BACKOFFICE-STRATEGY.md`](./07-BACKOFFICE-STRATEGY.md).

- **Estado:** ✅ Backoffice funcionando localmente (panel verificado). Falta conectar prod.
- **Última actualización:** 2026-06-10

---

## 1. Qué quedó implementado

**Payload CMS 3** embebido en la app Next.js. El cliente (Cae) edita **todo** el contenido:

| En el panel (`/admin`) | Permite |
|------------------------|---------|
| **Textos del sitio** (global, ES/EN) | Hero, Sobre mí, Servicios, Footer/Contacto |
| **Categories** | Crear/editar/ordenar categorías (ES/EN) |
| **Projects** | Nuevo proyecto con **portada + galería de fotos + video**, categoría, orden, borrador/publicado |
| **Media** | Biblioteca de fotos/videos (subida + tamaños responsive) |
| **Users** | Usuarios admin/editor (RBAC) |
| Switch **Locale ES/EN** | Edita el copy en ambos idiomas |

**Arquitectura (best practices):**
- Route groups: `app/(frontend)` (la landing) y `app/(payload)` (el admin) — aislados, el admin no
  hereda Lenis/Intro/Grain de la landing.
- **Contenido desacoplado:** la landing lee por `src/content/source.ts`. Con `USE_CMS=true` lee de
  Payload (`payload-source.ts`); si no, **fallback estático** → el sitio nunca se rompe por falta de DB.
- DB adaptable por env: **SQLite** (local) / **Postgres** (prod, Railway).
- Localización ES/EN nativa de Payload. Borradores en Projects. Control de acceso por rol.
- Slugs automáticos. Medios con tamaños responsive (sharp).

---

## 2. Correr el backoffice en local (dev)

```bash
# .env.local ya apunta a SQLite (file:./cms.db) con un PAYLOAD_SECRET de dev
npm run dev
# Abrir http://localhost:3000/admin  → crear el primer usuario → editar contenido
```
> En dev los uploads van a `public/media/cms/` (disco). El esquema SQLite se crea solo.

---

## 3. Poner en PRODUCCIÓN (requiere credenciales reales)

Para que Cae use el backoffice en vivo hacen falta 3 servicios (que ya tenés):

| Variable | Servicio | Para qué |
|----------|----------|----------|
| `DATABASE_URI` | **Railway Postgres** | Base de datos del CMS en prod |
| `CLOUDINARY_*` | **Cloudinary** | Storage de fotos/videos (Vercel es efímero) |
| `RESEND_API_KEY` | **Resend** | Email (leads / reset de password) |
| `PAYLOAD_SECRET` | — | `openssl rand -hex 32` |

Pasos:
1. Cargar esas variables en Vercel (Project → Settings → Environment Variables).
2. Conectar el **storage Cloudinary** a la colección Media (plugin de storage — pendiente de
   credenciales para elegir/cablear el adaptador).
3. Migrar el esquema a Postgres (Payload genera las tablas).
4. **Sembrar** el contenido actual (script de seed) para que arranque con todo cargado.
5. Activar `USE_CMS=true` → la landing pasa a leer del CMS (con revalidación/ISR).
6. Deploy.

> Nota Windows: el CLI standalone de Payload (`payload generate:*`) falla por un bug de `tsx`+Windows
> con `?namespace=`. No afecta a `next dev`/`next build` (compilan la config con SWC). El import map se
> autogenera en runtime. Para seed se usa un script vía runtime de Next, no el CLI.

---

## 4. Pendiente (cuando haya credenciales)
- [ ] Cablear storage Cloudinary en `Media`.
- [ ] Script de seed del contenido actual (10 proyectos, categorías, textos ES/EN).
- [ ] Colección **Leads** + formulario público → Resend.
- [ ] Revalidación ISR al publicar (hook afterChange → `revalidateTag`).
- [ ] Deploy del admin a prod con Railway + Cloudinary.

---

> **Relacionado:** [`03-BACKOFFICE.md`](./03-BACKOFFICE.md) · [`07-BACKOFFICE-STRATEGY.md`](./07-BACKOFFICE-STRATEGY.md)
