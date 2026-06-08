# Salt Frame Visuals — Guía de Medios (Assets)

> Cómo se organizan, nombran y optimizan las fotos y videos del portfolio.
> Define el "dropzone" para la **primera carga** de contenido del cliente.
> Complementa a [`04-DESIGN-SYSTEM.md`](./04-DESIGN-SYSTEM.md) y [`03-BACKOFFICE.md`](./03-BACKOFFICE.md).

- **Estado:** Vigente — listo para recibir la primera carga
- **Última actualización:** 2026-06-08

---

## 1. Dónde dejar los archivos (primera carga)

Carpeta raíz del dropzone: **`public/media/raw/`** (organizada por proyecto).

```
public/media/
├─ raw/                         ← AQUÍ van los archivos originales del cliente
│  ├─ coolangatta-gold/         (foto · triatlón/deporte)
│  ├─ world-surf-league/        (foto · surf)
│  ├─ get-motivated/            (video · deporte)
│  ├─ bsa-boat-syndication/     (video · real estate)
│  ├─ country-club/             (video · gastronómico)
│  ├─ fu-ma-chi/                (foto · gastronómico)
│  ├─ squires-ink/              (video · estudio de tatuajes)
│  ├─ private-house-cinematic/  (video · real estate)
│  ├─ hero/                     (video/imágenes de fondo del Hero)
│  └─ about/                    (retrato de Cae, opcional)
└─ optimized/                   ← generado por el pipeline (NO subir a mano)
```

> Los originales **no se versionan en git** (pueden ser pesados): ver `.gitignore` de medios (§6).
> Por eso, la entrega puede ser por carpeta local, ZIP, Google Drive o WeTransfer (ver §7).

---

## 2. Convención de nombres

```
<proyecto>-<secuencia>.<ext>
```
- Todo en **minúsculas, kebab-case**, sin espacios, tildes ni caracteres especiales.
- Secuencia con cero a la izquierda: `01, 02, 03…` (define el orden por defecto).
- La portada del proyecto: sufijo `-cover`.

**Ejemplos**
```
coolangatta-gold-cover.jpg
coolangatta-gold-01.jpg
world-surf-league-03.jpg
get-motivated-01.mp4
get-motivated-poster.jpg        ← poster del video (frame de portada)
hero-loop.mp4
about-cae.jpg
```

---

## 3. Especificaciones técnicas

### 3.1 Fotos
| Parámetro | Recomendado |
|-----------|-------------|
| Formato de origen | JPG/PNG de alta calidad (el pipeline genera AVIF/WebP) |
| Lado mayor | ≥ 2400px (para nitidez en pantallas grandes) |
| Espacio de color | sRGB |
| Peso de origen | sin límite estricto; el pipeline optimiza |
| Salida (auto) | AVIF + WebP responsive, varios tamaños + `blurDataURL` |

### 3.2 Videos
| Parámetro | Recomendado |
|-----------|-------------|
| Formato de origen | MP4 (H.264) o MOV de alta calidad |
| Resolución | 1080p (1920×1080) o 4K; se generan variantes |
| Hero loop | corto (8–15s), **sin audio**, pensado para loop continuo |
| Poster | un frame representativo como `*-poster.jpg` (evita pantalla negra al cargar) |
| Salida (auto) | MP4 + WebM optimizados; fallback a imagen en mobile/data-saver |

### 3.3 Hero
- Idealmente **1 video horizontal** con acción/estilo (deporte, surf) + **1 imagen fallback** (`hero-fallback.jpg`).
- Texto irá superpuesto con velo oscuro → preferir tomas con zonas que admitan texto legible.

---

## 4. Texto alternativo (`alt`) — obligatorio

Cada imagen/video necesita un `alt` descriptivo (accesibilidad + SEO). Para la primera carga, entregar
un texto breve por archivo (ej. en un `.txt`/planilla) o lo redactamos nosotros a partir del contexto:

```
coolangatta-gold-01.jpg → "Atleta corriendo en la playa durante el triatlón Coolangatta Gold"
```

---

## 5. Pipeline de optimización (automático)

```
public/media/raw/**  ──►  script de optimización (sharp/ffmpeg)  ──►  public/media/optimized/**
                                                                         │
                                                          next/image + BackgroundVideo consumen esto
```
- Imágenes: `sharp` → AVIF/WebP en breakpoints + `blurDataURL`.
- Videos: `ffmpeg` → MP4/WebM comprimidos + extracción de poster si falta.
- En **Fase 2–3**, esta gestión la absorbe el backoffice (Payload genera derivados al subir).

---

## 6. Versionado (git) de medios

- Los **originales pesados no se commitean** (regla en `.gitignore`).
- Se versiona: imágenes ya optimizadas y livianas necesarias para el build, o se sirven desde
  almacenamiento externo (Vercel Blob / R2) cuando crezca el volumen.
- Nunca subir material con derechos no aclarados; confirmar que el cliente tiene licencia de uso.

---

## 7. Formas de entrega de la primera carga

| Método | Cuándo conviene |
|--------|-----------------|
| **Carpeta local** en `public/media/raw/<proyecto>/` | Si los archivos ya están en esta máquina |
| **ZIP** | Entrega única ordenada por carpetas de proyecto |
| **Google Drive / WeTransfer** | Si el volumen es grande (videos en alta) |

> Indicá qué método usás y, si es Drive/WeTransfer, pasá el link. Acomodo todo en la estructura de arriba.

---

## 8. Checklist de recepción
- [ ] Archivos nombrados según convención (§2)
- [ ] Una portada (`-cover`) por proyecto
- [ ] Poster por cada video del portfolio
- [ ] Video + imagen fallback para el Hero
- [ ] `alt` provisto o contexto suficiente para redactarlo
- [ ] Licencia/derechos de uso confirmados

---

> **Relacionado:** [`04-DESIGN-SYSTEM.md`](./04-DESIGN-SYSTEM.md) · [`03-BACKOFFICE.md`](./03-BACKOFFICE.md)
