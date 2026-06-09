# Salt Frame Visuals — Auditoría UI/UX (skill ui-ux-pro-max)

> Auditoría y mejoras de UI/UX usando la skill **UI/UX Pro Max** (instalada en `.claude/skills/`),
> con foco en que el portfolio sea **atractivo para clientes potenciales** (es la web de venta de Cae).

- **Estado:** En aplicación
- **Última actualización:** 2026-06-09
- **Base:** `ui-ux-pro-max` design-system generator + checklist de calidad

---

## 1. Recomendación del generador (para "photography portfolio agency")

| Eje | Recomendación de la skill | Estado en Salt Frame |
|-----|---------------------------|----------------------|
| **Pattern** | **Portfolio Grid** — *Visuals first, **Filter by category**, fast loading* | ✅ grilla; ➕ se agrega **filtro por categoría** |
| **Style** | **Motion-Driven** (microinteracciones, scroll, parallax) | ✅ ya implementado |
| **Colores** | Monocromo + 1 acento | ✅ B&N + rojo `#D91A2A` (marca) |
| **Tipografía** | Inter (mood cinematic/premium) | ✅ Montserrat/Poppins (equivalente premium) |
| **Efectos** | Scroll anim (IO), hover 300–400ms, parallax | ✅ |
| **Evitar** | *Heavy text + poor image showcase* | ✅ texto mínimo, imagen protagonista |

---

## 2. Pedidos del cliente (esta iteración)

1. **Cursores default** — el cursor custom no gustó → se elimina, vuelven los cursores nativos
   (con `cursor-pointer` en clickables, como pide el checklist).
2. **Inicio arriba en mobile** — la web debe arrancar en el tope en mobile (reset de scroll al cargar).
3. **ES / EN con selector** — internacionalización con toggle de idioma.
4. **Segmentar por categorías** — filtros de portfolio (Deporte, Surf, Real Estate, Gastronomía,
   Estética, Estudio) → coincide con el pattern recomendado.

---

## 3. Checklist de calidad (pre-entrega) y estado

| Check (skill) | Estado |
|---------------|--------|
| Sin emojis como íconos (usar SVG: Lucide) | ✅ Lucide |
| `cursor-pointer` en todo clickable | ✅ (al quitar cursor custom) |
| Hover states con transición 150–300ms | ✅ |
| Contraste de texto ≥ 4.5:1 | ✅ (validado; rojo solo en grande/acento) |
| Focus states visibles para teclado | ✅ |
| `prefers-reduced-motion` respetado | ✅ (Reveal/ClipReveal/Intro/Lenis) |
| Responsive: 375 / 768 / 1024 / 1440 | ✅ mobile-first |
| Touch targets ≥ 44px, spacing ≥ 8px | ✅ (CTAs, filtros, nav) |
| Lazy loading + WebP/AVIF, CLS < 0.1 | ✅ next/image (AVIF/WebP) |

---

## 4. Mejoras aplicadas en esta iteración
- Filtro de portfolio por categoría (mejora descubrimiento y percepción de especialización).
- i18n ES/EN con selector en la nav (amplía alcance: mercado AU + hispano).
- Cursores nativos (mejor familiaridad y accesibilidad).
- Reset de scroll al tope en carga (mobile arranca arriba).
- Repaso de touch targets, focus y contraste según el checklist.

---

> **Relacionado:** [`04-DESIGN-SYSTEM.md`](./04-DESIGN-SYSTEM.md) · [`06-BENCHMARK.md`](./06-BENCHMARK.md) ·
> skill en `.claude/skills/ui-ux-pro-max/`
