import { test, expect } from "@playwright/test";

test("la landing carga con el hero y el CTA de portfolio", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "SALT FRAME VISUALS" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Portfolio" }).first()).toBeVisible();
});

test("la navegación lleva a las secciones", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#portfolio")).toBeAttached();
  await expect(page.locator("#sobre-mi")).toBeAttached();
  await expect(page.locator("#servicios")).toBeAttached();
  await expect(page.locator("#contacto")).toBeAttached();
});

/**
 * Estos tests usan reduced-motion: ejercitan el camino sin animación, donde las
 * tarjetas se muestran de inmediato (fallback crítico de accesibilidad). Garantiza
 * que el contenido nunca queda oculto, también en mobile.
 */
test.describe("portfolio visible (reduced-motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("las tarjetas se ven y abren el lightbox", async ({ page }) => {
    await page.goto("/");
    // esperar a que el splash (intro) se retire para no interceptar clicks
    await page.locator('[class*="z-[9000]"]').waitFor({ state: "detached" }).catch(() => {});
    const firstCard = page.locator("#portfolio article").first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();
    // dispatchEvent evita la flakiness de hit-testing del reveal en headless;
    // verifica el comportamiento real (el handler de la tarjeta abre el lightbox).
    await firstCard.dispatchEvent("click");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("el portfolio muestra los 10 proyectos también en mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const cards = page.locator("#portfolio article");
    await expect(cards).toHaveCount(10);
    await cards.first().scrollIntoViewIfNeeded();
    await expect(cards.first()).toBeVisible();
    await cards.last().scrollIntoViewIfNeeded();
    await expect(cards.last()).toBeVisible();
  });

  test("el filtro por categoría segmenta los proyectos", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator("#portfolio article");
    await expect(cards).toHaveCount(10);
    await page.getByRole("button", { name: /^Surf$/ }).first().click();
    await expect(cards).toHaveCount(1);
    await page.getByRole("button", { name: /^Todos$/ }).first().click();
    await expect(cards).toHaveCount(10);
  });

  test("el selector de idioma (banderas) cambia ES/EN", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Servicios" })).toBeVisible();
    await page.getByRole("button", { name: "English" }).first().click();
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
    await page.getByRole("button", { name: "Español" }).first().click();
    await expect(page.getByRole("link", { name: "Servicios" })).toBeVisible();
  });
});
