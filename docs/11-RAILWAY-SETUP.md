# Railway — pasos manuales para desplegar el backoffice

> Solo lo que hacés vos. Con eso, yo creo el proyecto, la base de datos, despliego
> el panel de Payload, lo conecto a la landing y siembro el contenido.

---

## Lo que voy a montar en Railway (para que sepas qué es)
- Un **servicio PostgreSQL** (la base del CMS).
- Un **servicio web** con el panel de Payload (la rama `feat/backoffice-payload`).
- El **login de Cae** ya queda creado: `caetanopapirblat@gmail.com` / `Gulli123#`.

---

## 1. Token de Railway (lo más importante — me deja hacerlo solo)
1. Entrá a [railway.app](https://railway.app) y logueate.
2. Arriba a la derecha, clic en tu **avatar** → **Account Settings**.
3. Pestaña **Tokens** → **Create New Token**.
4. Nombre: `salt-frame-deploy` → **Create** → **copiá el token** (se muestra una sola vez).

> Con ese token yo creo el proyecto, la DB y el deploy. No necesito tu contraseña.

## 2. Cloudinary (para las fotos/videos del panel) — 3 valores
1. [cloudinary.com](https://cloudinary.com) → **Dashboard**.
2. En **"Product Environment Credentials"** copiá: **Cloud name**, **API Key**, **API Secret**.

## 3. Resend (email / leads) — 1 valor
1. [resend.com](https://resend.com) → **API Keys** → **Create API Key** → copiá la que empieza con `re_`.

## 4. Pegar todo en `.env.local`
En la carpeta `landingfotos/`, agregá al archivo **`.env.local`**:
```env
RAILWAY_TOKEN=...           # el token del paso 1
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
```
(No se sube a git. El `PAYLOAD_SECRET` y el `DATABASE_URI` los genero/obtengo yo.)

## 5. Avisame "listo"
Y yo, solo:
- creo el proyecto en Railway + la base PostgreSQL,
- despliego el panel de Payload (rama `feat/backoffice-payload`),
- cableo Cloudinary (medios) y Resend (email),
- **siembro el contenido** (10 proyectos + textos ES/EN + usuario de Cae),
- conecto la landing de Vercel al CMS y te paso la URL del `/admin`.

---

## Alternativa (si preferís hacerlo a mano en el dashboard)
1. railway.app → **New Project** → **Deploy from GitHub repo** → `gonzalezmarcosdamian/landingfotos`.
2. En el servicio, **Settings → Branch** = `feat/backoffice-payload`.
3. **+ New → Database → PostgreSQL**.
4. En **Variables** del servicio web, agregá: `DATABASE_URI=${{Postgres.DATABASE_URL}}`, `PAYLOAD_SECRET=` (yo te lo genero), `USE_CMS=true` y las de Cloudinary/Resend.
5. **Settings → Networking → Generate Domain** y pasame esa URL.
6. Pasame el `DATABASE_URL` público (pestaña Postgres → Variables) y yo siembro el contenido.

> Recomiendo la opción del **token** (paso 1): es 1 paso para vos y el resto lo automatizo.
