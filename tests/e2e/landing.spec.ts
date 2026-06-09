import { test, expect, type Page } from "@playwright/test";

async function dismissIntro(page: Page) {
  await page.locator('[class*="z-[9000]"]').waitFor({ state: "detached" }).catch(() => {});
}

/** clipPath del wrapper de reveal de la primera tarjeta (oculto = contiene "100%"). */
async function firstCardClip(page: Page): Promise<string> {
  return page.evaluate(() => {
    const card = document.querySelector("#portfolio article");
    if (!card || !card.parentElement) return "no-card";
    return getComputedStyle(card.parentElement).clipPath;
  });
}

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
 * Visualización de proyectos en el camino ANIMADO real (sin reduced-motion),
 * en web y mobile web. Verifica que las tarjetas se REVELAN (no quedan ocultas por
 * clip-path) — también al filtrar, que re-monta la grilla estando ya en viewport
 * (el caso que fallaba y dejaba el portfolio en blanco).
 */
const VIEWPORTS = [
  { name: "web", width: 1280, height: 900 },
  { name: "mobile web", width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
  test.describe(`visualización de proyectos — ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("los 10 proyectos se ven (revelados)", async ({ page }) => {
      await page.goto("/");
      await dismissIntro(page);
      await page.locator("#portfolio").scrollIntoViewIfNeeded();
      await expect(page.locator("#portfolio article")).toHaveCount(10);
      await expect.poll(() => firstCardClip(page), { timeout: 6000 }).not.toContain("100%");
    });

    test("al filtrar (Gastronomía) las tarjetas se revelan", async ({ page }) => {
      await page.goto("/");
      await dismissIntro(page);
      await page.locator("#portfolio").scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: /Gastronom|Food/ }).first().click();
      await expect(page.locator("#portfolio article")).toHaveCount(2);
      await expect.poll(() => firstCardClip(page), { timeout: 6000 }).not.toContain("100%");
    });
  });
}

/**
 * Funcionalidad (lightbox, filtro, idioma) con reduced-motion: evita la flakiness
 * de hit-testing de la animación en headless.
 */
test.describe("funcionalidad (reduced-motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("las tarjetas abren el lightbox", async ({ page }) => {
    await page.goto("/");
    await dismissIntro(page);
    const firstCard = page.locator("#portfolio article").first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();
    await firstCard.dispatchEvent("click");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
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
