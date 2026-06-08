# Salt Frame Visuals — Design System

> Lenguaje visual de la marca: tokens, tipografía, grilla, movimiento, componentes y
> especificación sección por sección. Es la fuente de verdad de UI.
> Complementa a [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md).

- **Estado:** Diseño (Fase 0 → guía de implementación Fase 1)
- **Última actualización:** 2026-06-08
- **Referencias:** brief del cliente + **web de referencia [`facunruiz.com`](https://www.facunruiz.com)**
  + sitio actual `saltframevisuals.com` (portfolio de Caetano Papirblat).

---

## 0. Referencia de diseño — `facunruiz.com`

Web de referencia elegida por el cliente. Es el norte estético.

**Qué tomamos (ADN a replicar):**
- **Ultra-minimalismo *photography-first*:** la imagen ocupa la pantalla (full-bleed), UI casi invisible.
- **Galería full-width** en secuencia vertical / carrusel; ritmo visual limpio, una pieza protagonista a la vez.
- **Carga blur-up:** placeholder borroso de baja calidad → imagen nítida (coincide con nuestro `blurDataURL`).
- **Fondo blanco, texto negro, paleta neutra.** Sin ruido visual.
- **Navegación en MAYÚSCULAS:** `PORTFOLIO · ABOUT · CONTACT`, nav superior fijo + menú móvil (toggle).
- **Header de identidad sobrio:** "nombre | rol + ubicación" (ej. *Photographer based in Barcelona*).
- **Transiciones suaves** (fades), sin estridencias.

**Cómo Salt Frame se diferencia (sumado al ADN):**
- **Acento rojo `#D91A2A`** — facunruiz es 100% neutro; nuestro rojo quirúrgico da actitud de marca (CTAs, detalles).
- **Wordmark grande y bold** ("SALT FRAME VISUALS") y taglines del brief — más voz tipográfica que facunruiz.
- **Video en loop** (deporte/surf) en el hero — facunruiz es solo foto; el video es nuestra ventaja audiovisual.
- **Secciones de marca** (Sobre mí, Servicios con CTA HABLEMOS) que un portfolio puro no tiene.

> Regla de oro: cuando dudes, **resta**. La referencia gana por lo que omite. El rojo y el video son
> las dos únicas licencias de "más" que nos permitimos, y se usan con moderación.

---

## 1. Principios visuales

1. **El contenido visual es el rey.** La UI es el marco; foto y video mandan.
2. **Cero exceso, máxima actitud.** Tipografía grande y bold; texto mínimo e impactante.
3. **Que respire.** Espacio blanco generoso, sobre todo en "Sobre mí".
4. **Acento quirúrgico.** El rojo `#D91A2A` aparece poco y con intención (CTAs, enlaces, detalles).
5. **Impacto sin peso.** Carga progresiva; nada bloquea el render.

---

## 2. Color

### 2.1 Tokens base
| Token | Hex | Uso |
|-------|-----|-----|
| `--sf-black` | `#0A0A0A` | Texto principal en claro / fondo en oscuro |
| `--sf-white` | `#FFFFFF` | Fondo en claro / texto en oscuro |
| `--sf-red` | `#D91A2A` | Acento de marca (CTAs, enlaces, detalles) |
| `--sf-red-hover` | `#B3141F` | Estado hover/active del acento |
| `--sf-gray-900` | `#171717` | Superficies oscuras (footer, overlays) |
| `--sf-gray-500` | `#737373` | Texto secundario / metadatos |
| `--sf-gray-200` | `#E5E5E5` | Bordes, divisores, fondos sutiles |
| `--sf-overlay` | `rgba(10,10,10,0.45)` | Velo sobre video/imagen del hero para legibilidad |

### 2.2 Accesibilidad del acento (WCAG 2.1 AA)
- `#D91A2A` sobre blanco → contraste ≈ **4.6:1** ✅ válido para texto grande y elementos UI;
  para **texto pequeño** preferir el rojo sobre fondo oscuro o usar negro y reservar el rojo para fondos de botón.
- Botón rojo con texto **blanco**: contraste suficiente ✅.
- Nunca usar rojo sobre negro para texto fino (contraste insuficiente) → usar blanco.
- Validar toda combinación nueva con un checker antes de mergear.

### 2.3 Modo
- Base **claro** (blanco) para "Sobre mí" y "Servicios" (que respiren).
- Hero y footer pueden ir **oscuros** para dar dramatismo al contenido visual.

---

## 3. Tipografía

- **Familia:** sans-serif moderna — **Montserrat** (titulares) / **Poppins** o Inter (texto).
  Self-host con `next/font` (`display: swap`, subset latin) para performance y cero FOUT.
- **Tono:** titulares en **mayúsculas, bold/extra-bold**, con tracking ajustado (estilo editorial deportivo).

### 3.1 Escala tipográfica (fluida, `clamp`)
| Rol | Tamaño (clamp) | Peso | Uso |
|-----|----------------|------|-----|
| Display | `clamp(2.75rem, 8vw, 6rem)` | 800 | "SALT FRAME VISUALS" en hero |
| H1 | `clamp(2rem, 5vw, 3.5rem)` | 700 | Títulos de sección |
| H2 | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | Subtítulos |
| Lead | `clamp(1.125rem, 2vw, 1.5rem)` | 500 | Taglines / intro |
| Body | `1rem`–`1.125rem` | 400 | Texto general |
| Caption | `0.875rem` | 500 | Metadatos, categorías |
| Button | `0.9375rem` | 600, uppercase, tracking `0.05em` | CTAs |

### 3.2 Reglas
- Interlineado: titulares `1.05–1.1`; cuerpo `1.6`.
- Ancho de lectura del cuerpo: máx. `65ch`.
- Jerarquía clara: un solo Display por vista (el hero).

---

## 4. Grilla, espaciado y layout

- **Mobile-first.** Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
- **Contenedor:** ancho máx `1280px` (`xl`), padding lateral `clamp(1rem, 5vw, 4rem)`.
- **Escala de espaciado (8px base):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- **Secciones:** padding vertical generoso `clamp(4rem, 10vw, 8rem)`.
- **Grilla de portfolio:** 1 col (mobile) → 2 (md) → 3 (lg); `gap` 16–24px; masonry opcional.

---

## 5. Movimiento (Motion / Framer Motion)

| Patrón | Especificación |
|--------|----------------|
| Scroll reveal | Fade + translateY 16–24px al entrar en viewport (`once`, threshold ~0.2) |
| Transición base | `duration 0.5s`, `ease [0.22, 1, 0.36, 1]` (easeOutExpo suave) |
| Stagger | Hijos con delay incremental `0.06–0.1s` (listas, grilla) |
| Hover de tarjeta | Escala `1.02` + zoom sutil de imagen + overlay con título |
| Hover de botón | Fondo a `--sf-red-hover`, micro `scale 0.98` en active |
| Hero | Ken Burns sutil del video/imagen; texto entra con fade |
| **Reduced motion** | `prefers-reduced-motion: reduce` → sin parallax/autoplay/animación; aparición instantánea |

Principio: **sutil siempre**. La animación guía, no distrae del contenido.

---

## 6. Componentes

### 6.1 Botón (CTA)
| Variante | Aspecto |
|----------|---------|
| `primary` | Fondo `--sf-red`, texto blanco, uppercase, padding `16px 32px`, radio 0–4px (filoso/editorial) |
| `outline` | Borde blanco/negro, transparente, hover invierte |
| `ghost` | Solo texto con subrayado animado |
- Estados: hover (`--sf-red-hover`), focus (anillo visible para teclado), active (`scale 0.98`), disabled.
- CTAs clave: **PORTFOLIO** (hero) y **HABLEMOS** (servicios) → `primary`.

### 6.2 Navegación (estilo `facunruiz.com`)
- Header minimalista, sticky, fondo translúcido con blur al hacer scroll.
- Wordmark a la izquierda con identidad sobria: **SALT FRAME VISUALS** · *Audiovisual based in Australia*.
- Links a la derecha en **MAYÚSCULAS**: `PORTFOLIO · ABOUT · CONTACT` (+ Instagram visible).
- Mobile: toggle **MENU** → menú a pantalla completa.
- Indicador "top of page" / scroll-to-top en páginas largas.

### 6.3 Tarjeta de proyecto
- Imagen/poster a full bleed con relación de aspecto fija (evita CLS).
- Overlay al hover: título + categoría + ícono de tipo (📷 foto / ▶ video).
- Click → abre lightbox / `/work/[slug]` (Fase 3).
- Badge de categoría (Caption, uppercase).

### 6.4 Lightbox / visor
- Fondo `--sf-gray-900` translúcido; cierre con `Esc` y botón; navegación con flechas/teclado.
- Soporta imagen y video; foco atrapado dentro (a11y); `aria-modal`.

### 6.5 Media components
- `SmartImage`: wrapper de `next/image` con `blurDataURL`, `sizes` responsive, `alt` obligatorio.
- `BackgroundVideo`: autoplay muted loop, `poster`, `preload="none"`, fallback a imagen en mobile/data-saver y con reduced-motion.

---

## 7. Especificación por sección

### 7.1 Hero (Home)
- **Fondo:** video/imágenes en loop mostrando acción y estilo (deporte, surf). Velo `--sf-overlay` para legibilidad.
- **Texto superpuesto (centrado o bottom-left):**
  - Display: **SALT FRAME VISUALS**
  - Lead: *Imágenes vibrantes. Videos que transmiten.*
  - Body: *Contenido audiovisual con actitud para marcas.*
- **CTA:** botón `primary` grande → **PORTFOLIO**.
- Indicador de scroll sutil. Hero a `100svh` (mobile-safe).

### 7.2 Portfolio (estilo `facunruiz.com`)
- **Protagonismo full-bleed:** piezas grandes a todo el ancho, ritmo limpio (la imagen domina, como la referencia).
- Opción A (referencia pura): secuencia vertical full-width con blur-up entre piezas.
- Opción B (más navegable): grilla 1→2→3 columnas con hover que revela título/categoría.
  *Recomendado:* grilla en el home (escaneo rápido) + vista full-bleed al abrir cada proyecto.
- (Opcional) filtro por categoría: deporte · surf · real estate · gastronomía · estudio.
- **Proyectos del brief:**
  | Proyecto | Tipo | Categoría |
  |----------|------|-----------|
  | Coolangatta Gold | Foto | Triatlón/deporte |
  | World Surf League | Foto | Surf |
  | Get Motivated | Video | Deporte |
  | BSA Boat Syndication Australia | Video | Real estate |
  | Country Club | Video | Gastronómico |
  | Fu Ma Chi Asian Food | Foto | Gastronómico |
  | Squires Ink | Video | Estudio de tatuajes |
  | Private House Cinematic | Video | Real estate |

### 7.3 Sobre mí / Nosotros
- Fondo **limpio**, mucho espacio blanco. Texto ancho de lectura cómodo.
- Copy (brief): *"Soy Cae, creativo detrás de Salt Frame Visuals. Trabajo con marcas y proyectos
  jóvenes, disruptivos... Creo en lo simple como ventaja, en un mundo saturado de información y contenidos.
  Simple, pero adaptado estratégicamente a las necesidades de tu proyecto."*
- Posible retrato/foto de Cae a un lado.

### 7.4 Servicios
- Tres ejes (tarjetas o filas con espacio):
  1. **Fotografía deportiva** — *Capturo el movimiento, la intensidad y la pasión.*
  2. **Videos comerciales que venden sin idioma** — restaurantes, inmobiliarias, gimnasios… más alcance y mejores clientes.
  3. **Contenido personalizado para marcas que quieren distinguir** — sesiones amenas, dinámicas y productivas.
- **CTA:** botón `primary` → **HABLEMOS** (mailto / WhatsApp; formulario en Fase 2).

### 7.5 Footer + Contacto
- Minimalista, fondo oscuro `--sf-gray-900`.
- Redes: **@saltframevisuals** (Instagram).
- Email directo: **info@saltframevisuals.com**.
- Copyright + año.

---

## 8. Iconografía e imágenes
- Íconos: set lineal minimalista (Lucide), trazo fino, color heredado.
- Imágenes: alto contraste, look editorial deportivo; tratamiento consistente.
- Todo medio con `alt` significativo y dimensiones explícitas (anti-CLS).

---

## 9. Tokens en código (referencia de implementación)
```css
:root {
  --sf-black: #0A0A0A;  --sf-white: #FFFFFF;
  --sf-red: #D91A2A;    --sf-red-hover: #B3141F;
  --sf-gray-900: #171717; --sf-gray-500: #737373; --sf-gray-200: #E5E5E5;
  --sf-overlay: rgba(10,10,10,0.45);
  --sf-font-display: "Montserrat", system-ui, sans-serif;
  --sf-font-body: "Poppins", system-ui, sans-serif;
  --sf-radius: 2px;
  --sf-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```
> Se materializan como tema de Tailwind v4 (`@theme`) — única fuente de verdad de los tokens.

---

## 10. Checklist de UI (por sección implementada)
- [ ] Responsive 320px → 4K sin roturas
- [ ] Contraste AA verificado (especialmente el rojo)
- [ ] Foco de teclado visible; navegable sin mouse
- [ ] `prefers-reduced-motion` respetado
- [ ] Medios con `alt` y dimensiones (CLS = 0)
- [ ] Acento rojo usado con moderación e intención

---

> **Pendiente de confirmar con el cliente:** si existe una *web de ejemplo / referencia* específica
> distinta del sitio actual, alinear layout e interacciones a ella (ver nota en el chat).
