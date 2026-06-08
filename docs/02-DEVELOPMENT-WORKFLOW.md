# Salt Frame Visuals — Flujo de Desarrollo, CI/CD y Buenas Prácticas

> Define cómo se trabaja en este proyecto: pipeline de integración continua, metodología TDD,
> estándares de código, revisión, definición de "hecho" y convenciones de git.
> Es de cumplimiento obligatorio. Complementa a [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md).

- **Estado:** Vigente desde Fase 0
- **Última actualización:** 2026-06-08

---

## 1. Filosofía de trabajo

1. **Calidad verificable, no prometida.** Todo lo que se afirma "hecho" está cubierto por tests y checks automáticos.
2. **Pequeños pasos, integración frecuente.** Ramas cortas, PRs chicos, merge continuo.
3. **TDD para lógica no trivial.** El test define el comportamiento antes de la implementación.
4. **Automatizar el control.** Lo que puede verificar una máquina, no lo verifica un humano.
5. **Inmutabilidad y simplicidad** (ver coding-style): KISS, DRY, YAGNI; funciones < 50 líneas, archivos < 800.

---

## 2. Metodología TDD (obligatoria para lógica de dominio)

Ciclo **RED → GREEN → REFACTOR**:

```
1. RED      Escribir un test que describa el comportamiento esperado. Debe FALLAR.
2. GREEN    Escribir la implementación mínima para que el test pase.
3. REFACTOR Mejorar el diseño manteniendo los tests en verde.
4. COVERAGE  Verificar cobertura ≥ 80% del módulo.
```

### 2.1 ¿Qué se testea con TDD?
| Aplica TDD | No requiere TDD estricto |
|------------|--------------------------|
| Lógica de contenido (filtros de portfolio, ordenamiento) | Estilos puramente visuales |
| Validación de formularios (esquemas Zod) | Markup estático sin lógica |
| Utilidades (SEO, slug, formato) | Configuración |
| Transformaciones de datos del CMS | — |
| Hooks personalizados con lógica | — |

### 2.2 Estructura de tests (patrón AAA)
```ts
test('devuelve solo proyectos destacados ordenados por `order`', () => {
  // Arrange
  const projects = [/* ... */];
  // Act
  const featured = getFeaturedProjects(projects);
  // Assert
  expect(featured.map(p => p.slug)).toEqual(['coolangatta-gold', 'wsl']);
});
```
- **Nombres descriptivos** del comportamiento, no de la implementación.
- Un test = una razón para fallar.
- Sin dependencias entre tests (aislamiento).

### 2.3 Pirámide de testing
```
        ╱╲        E2E (Playwright) — flujos críticos, pocos y valiosos
       ╱──╲       Integración/Componente (Testing Library)
      ╱────╲      Unit (Vitest) — la base, rápidos y numerosos
     ╱──────╲
```

| Nivel | Herramienta | Cobertura objetivo |
|-------|-------------|--------------------|
| Unit | Vitest | ≥ 80% de utilidades y lógica |
| Componente | Vitest + Testing Library | Secciones con interacción |
| E2E | Playwright | Cargar landing · navegar secciones · abrir lightbox · click CTA · login backoffice |
| A11y | axe-core (en E2E) | 0 violaciones críticas |
| Performance | Lighthouse CI | Presupuesto de Web Vitals |

---

## 3. Pipeline de Integración Continua (CI)

Definido en [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). Se ejecuta en cada **push** y **pull request**.

```
┌──────────────────────────────────────────────────────────────┐
│  CI (paralelo donde es posible)                                │
│                                                                │
│  ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌─────────────┐   │
│  │  Lint   │   │ Typecheck│   │  Unit     │   │  Build      │   │
│  │ ESLint+ │   │   tsc     │   │  Vitest   │   │  next build │   │
│  │Prettier │   │ --noEmit  │   │ +coverage │   │             │   │
│  └────┬────┘   └────┬─────┘   └────┬──────┘   └──────┬──────┘   │
│       └─────────────┴──────────────┴─────────────────┘          │
│                          │                                       │
│                  ┌───────▼────────┐    ┌──────────────────┐      │
│                  │  E2E (Playwright)│   │ Lighthouse CI    │      │
│                  │  + axe a11y      │   │ (Web Vitals)     │      │
│                  └────────┬─────────┘   └─────────┬────────┘      │
│                           └───────────┬───────────┘              │
│                              ✅ Todos los checks verdes           │
└──────────────────────────────────────────────────────────────┘
                              │
                    Merge habilitado a `main`
```

### 3.1 Jobs y gates
| Job | Qué valida | Bloquea merge |
|-----|-----------|---------------|
| `lint` | ESLint + Prettier (formato y reglas) | ✅ |
| `typecheck` | `tsc --noEmit` (sin errores de tipos) | ✅ |
| `test` | Vitest + cobertura mínima 80% | ✅ |
| `build` | `next build` exitoso | ✅ |
| `e2e` | Playwright (flujos críticos) + axe | ✅ |
| `lighthouse` | Presupuesto de Web Vitals | ⚠️ (warn, no bloquea inicialmente) |

### 3.2 Presupuesto de performance (Lighthouse CI)
- LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 · Performance ≥ 90 · SEO ≥ 95 · A11y ≥ 95.

---

## 4. Despliegue continuo (CD)

```
PR abierto ──► Vercel Preview Deploy (URL temporal)  ──► revisión visual + checks CI
                                                              │
Merge a main ─────────────────► Vercel Production Deploy ──► saltframevisuals.com
```
- **Preview por PR:** cada rama obtiene una URL para validar visualmente antes de mergear.
- **Production:** solo desde `main`, con todos los checks en verde.
- **Rollback:** redeploy instantáneo de una versión previa desde el dashboard de Vercel.
- **Migraciones de DB (backoffice):** se aplican en deploy con un paso de `migrate` controlado (ver [`03-BACKOFFICE.md`](./03-BACKOFFICE.md)).

---

## 5. Convenciones de Git

### 5.1 Ramas
| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Feature | `feat/<scope>-<desc>` | `feat/hero-video-loop` |
| Fix | `fix/<scope>-<desc>` | `fix/portfolio-cls` |
| Docs | `docs/<desc>` | `docs/backoffice-design` |
| Chore | `chore/<desc>` | `chore/deps-bump` |

- Ramas **cortas** (vida < 2 días idealmente). `main` siempre desplegable.
- Prohibido push directo a `main`: todo entra por PR.

### 5.2 Commits (Conventional Commits)
```
<type>: <descripción en imperativo>

<cuerpo opcional explicando el porqué>
```
Tipos: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `style`.

### 5.3 Pull Requests
1. PR pequeño y enfocado (un objetivo por PR).
2. Descripción con **qué**, **por qué** y **plan de prueba** (ver plantilla [`pull_request_template.md`](../.github/pull_request_template.md)).
3. Todos los checks de CI en verde.
4. Sin conflictos; rama actualizada con `main`.
5. Revisión aprobada (ver §6).

---

## 6. Revisión de código

Se apoya en checks automáticos **y** en revisión asistida por agentes/skills antes del merge.

### 6.1 Skills/agentes de revisión (se ejecutan sobre el diff antes de mergear)
| Skill / Agente | Cuándo |
|----------------|--------|
| `/code-review` | Tras escribir o modificar código (calidad, bugs, simplificación) |
| `/security-review` | Antes de commit en código sensible (auth del backoffice, formularios, subida de medios) |
| `/verify` | Para confirmar que un cambio funciona corriendo la app |
| `/simplify` | Limpieza de reuso/eficiencia del diff |

> Estos checks son parte del flujo: al implementar cada feature, se corre `/code-review` y, si toca
> auth/inputs/uploads, `/security-review`, **antes** de abrir/mergear el PR.

### 6.2 Niveles de severidad
| Nivel | Significado | Acción |
|-------|-------------|--------|
| CRITICAL | Vulnerabilidad o pérdida de datos | **BLOQUEA** merge |
| HIGH | Bug o problema de calidad importante | Corregir antes de merge |
| MEDIUM | Mantenibilidad | Corregir si es posible |
| LOW | Estilo / sugerencia | Opcional |

### 6.3 Disparadores de revisión de seguridad (obligatoria)
Auth del backoffice · manejo de input de usuario · queries a DB · subida/manejo de archivos ·
llamadas a APIs externas · operaciones criptográficas · cualquier dato sensible.

---

## 7. Definición de Hecho (Definition of Done)

Una tarea/PR está "hecha" solo si:

- [ ] Cumple el requisito (RF/RNF) que la originó.
- [ ] Código legible, bien nombrado; funciones < 50 líneas, archivos < 800, anidación < 4 niveles.
- [ ] Sin mutaciones (patrones inmutables), sin valores hardcodeados (constantes/config).
- [ ] Errores manejados explícitamente; inputs validados en los límites del sistema.
- [ ] Tests escritos (TDD donde aplica) y cobertura ≥ 80% del módulo.
- [ ] Lint, typecheck, unit, build y E2E en verde.
- [ ] Sin `console.log` ni código de depuración.
- [ ] Sin secretos en el repo; variables en entorno.
- [ ] Accesibilidad verificada (axe sin críticos; teclado; `prefers-reduced-motion`).
- [ ] Presupuesto de performance respetado.
- [ ] `/code-review` (y `/security-review` si aplica) sin issues CRITICAL/HIGH abiertos.
- [ ] Documentación actualizada si cambió arquitectura o contrato.

---

## 8. Estándares de código (resumen operativo)

- **TypeScript strict**, sin `any` salvo justificación documentada.
- **Inmutabilidad:** crear objetos nuevos, no mutar.
- **Naming:** `camelCase` (vars/fns), `PascalCase` (tipos/componentes), `UPPER_SNAKE_CASE` (constantes), `use*` (hooks).
- **Organización:** muchos archivos chicos, por dominio/feature.
- **Errores:** manejar explícitamente, mensajes claros, nunca tragar errores en silencio.
- **Validación:** esquemas (Zod) en todo límite (formularios, API, datos del CMS).

---

## 9. Gestión de dependencias y seguridad

- `npm audit` en CI; revisión de vulnerabilidades.
- **Renovate/Dependabot** para parches automáticos.
- Sin secretos commiteados: `.env.example` documenta variables sin valores.
- Headers de seguridad (CSP, HSTS) configurados en `next.config`.

---

## 10. Resumen del ciclo de vida de un cambio

```
1. Investigar/reutilizar (libs probadas antes que código nuevo)
2. Crear rama corta  (feat/...)
3. TDD: test (RED) → implementación (GREEN) → refactor
4. /code-review  (+ /security-review si toca auth/inputs/uploads)
5. Push → PR → Vercel Preview + CI
6. Checks verdes + revisión aprobada
7. Merge a main → Production deploy
8. Verificar en producción (Web Vitals, smoke test)
```

---

> **Documentos relacionados:** [`01-ARCHITECTURE.md`](./01-ARCHITECTURE.md) · [`03-BACKOFFICE.md`](./03-BACKOFFICE.md)
