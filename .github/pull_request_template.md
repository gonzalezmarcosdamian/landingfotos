<!-- PR enfocado: un objetivo por PR. Mantenelo chico y fácil de revisar. -->

## Qué
<!-- Resumen de los cambios -->

## Por qué
<!-- Requisito (RF/RNF) o problema que resuelve. Enlazar issue si aplica. -->

## Cómo
<!-- Decisiones de implementación relevantes -->

## Plan de prueba
<!-- Pasos para verificar. Marcar lo que aplique. -->
- [ ] Tests unitarios (Vitest)
- [ ] Test E2E (Playwright)
- [ ] Verificado en Vercel Preview
- [ ] Accesibilidad (teclado, axe, `prefers-reduced-motion`)

## Definition of Done
- [ ] Lint, typecheck, unit, build y E2E en verde
- [ ] Cobertura ≥ 80% del módulo afectado
- [ ] `/code-review` ejecutado sin issues CRITICAL/HIGH
- [ ] `/security-review` ejecutado (si toca auth / inputs / uploads / DB)
- [ ] Sin secretos commiteados; sin `console.log`
- [ ] Funciones < 50 líneas · archivos < 800 · sin mutaciones
- [ ] Documentación actualizada (si cambió arquitectura o contrato)

## Capturas / video
<!-- Si hay cambios visuales -->
