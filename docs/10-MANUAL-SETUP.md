# Pasos manuales para poner el backoffice en producción

> Lo único que tenés que hacer vos. Después, el resto lo hago yo (deploy, seed, dominio).

---

## 1. Railway → conseguir el `DATABASE_URI`

1. Entrá a [railway.app](https://railway.app) → tu proyecto con **PostgreSQL**.
2. Clic en el servicio **Postgres** → pestaña **"Variables"** (o **"Connect"**).
3. Copiá el valor de **`DATABASE_PUBLIC_URL`** (el que tiene un host tipo
   `xxxx.proxy.rlwy.net` — **NO** el `.railway.internal`, ese solo funciona dentro de Railway).
   - Se ve así: `postgresql://postgres:CLAVE@xxxx.proxy.rlwy.net:5432/railway`

> Tranquilo: las tablas de Salt Frame van en un **schema aparte (`salt_frame`)**, no tocan lo de lexcore.

---

## 2. Cloudinary → 3 valores

1. Entrá a [cloudinary.com](https://cloudinary.com) → **Dashboard** (Programmable Media).
2. Arriba, en **"Product Environment Credentials"**, copiá:
   - **Cloud name**
   - **API Key**
   - **API Secret** (clic en el ojito para verlo)

---

## 3. Resend → API key

1. Entrá a [resend.com](https://resend.com) → **API Keys**.
2. **Create API Key** (permiso *Full access* o *Sending*) → copiá la clave (empieza con `re_`).

---

## 4. Pegar todo en un archivo `.env.local`

En la carpeta del proyecto (`landingfotos/`), creá/editá el archivo **`.env.local`** y pegá esto
con tus valores (reemplazá los `...`):

```env
DATABASE_URI=postgresql://postgres:...@xxxx.proxy.rlwy.net:5432/railway
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
```

> Ese archivo **no se sube a git** (está protegido). De ahí yo cargo todo en Vercel.

---

## 5. Dominio `saltframevisuals.com` (Hostinger) — elegí UNA opción

### Opción A (recomendada, la hago yo): pasame un token de la API de Hostinger
1. hPanel de Hostinger → buscá **"API"** (en tu cuenta / parte de desarrollador).
2. **Generar token** → copialo y pasámelo.
3. Con eso yo configuro el DNS y apunto el dominio a Vercel.

### Opción B (lo hacés vos, 2 registros): editar DNS en Hostinger
1. hPanel → **Dominios** → `saltframevisuals.com` → **DNS / Zona DNS**.
2. Creá/editá estos registros:
   - Tipo **A** · Nombre **@** · Apunta a **`76.76.21.21`**
   - Tipo **CNAME** · Nombre **www** · Apunta a **`cname.vercel-dns.com`**
3. (La propagación tarda de minutos a unas horas.)

---

## 6. Avisame "listo"

Cuando tengas el `.env.local` cargado (pasos 1–4) y elijas opción de dominio (paso 5),
me decís **"listo"** y yo:
- conecto Cloudinary al backoffice,
- cargo las variables en Vercel,
- creo el schema y **siembro el contenido en prod**,
- activo el CMS y **despliego el admin en vivo**,
- apunto el dominio (si me pasaste el token).

Login del admin de Cae: **caetanopapirblat@gmail.com / Gulli123#**
