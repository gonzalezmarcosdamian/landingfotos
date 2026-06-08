import { chromium } from "@playwright/test";

const out = process.env.SHOT_DIR || ".";
const browser = await chromium.launch();

async function capture(width, height, label) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3500); // dejar pasar la intro
  await page.screenshot({ path: `${out}/shot-${label}-hero.png` });

  for (const id of ["portfolio", "sobre-mi", "servicios", "contacto"]) {
    await page.evaluate((i) => {
      document.getElementById(i)?.scrollIntoView({ block: "start" });
    }, id);
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${out}/shot-${label}-${id}.png` });
  }
  await ctx.close();
}

await capture(1440, 900, "desktop");
await capture(390, 844, "mobile");

await browser.close();
console.log("screenshots done");
