# Salt Frame Visuals

Landing page para **Salt Frame Visuals** — contenido audiovisual (fotografía deportiva y video
comercial) para marcas. Dominio: [saltframevisuals.com](https://saltframevisuals.com).

> Imágenes vibrantes. Videos que transmiten. Contenido audiovisual con actitud para marcas.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens de marca
- **Motion** (Framer Motion) — animaciones al scroll
- **Vercel** — hosting en edge + CI/CD
- **Vitest** + **Playwright** — testing unit y E2E

## Documentación

La definición del proyecto vive en [`docs/`](./docs):

- [`01-ARCHITECTURE.md`](./docs/01-ARCHITECTURE.md) — arquitectura, escalabilidad, rendimiento, SEO, despliegue.

## Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # entorno local (http://localhost:3000)
npm run build    # build de producción
npm run lint     # linter
npm test         # tests
```

## Estructura

```
docs/        Documentación de arquitectura y diseño
public/      Assets estáticos (medios optimizados, og, favicon)
src/         Código de la aplicación (app, components, sections, content)
tests/       Unit (Vitest) + E2E (Playwright)
```

## Marca

| Token | Valor |
|-------|-------|
| Acento | `#D91A2A` (rojo intenso) |
| Base | Blanco / Negro |
| Tipografía | Montserrat / Poppins |

---

Roadmap y decisiones técnicas: ver [`docs/01-ARCHITECTURE.md`](./docs/01-ARCHITECTURE.md).
