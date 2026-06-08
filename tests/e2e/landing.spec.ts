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
