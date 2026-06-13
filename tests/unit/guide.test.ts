import { describe, expect, test } from "vitest";
import { GUIDE_INTRO, GUIDE_SECTIONS } from "@/admin/guide";

describe("guía del backoffice", () => {
  test("hay intro y al menos 4 secciones", () => {
    expect(GUIDE_INTRO.length).toBeGreaterThan(20);
    expect(GUIDE_SECTIONS.length).toBeGreaterThanOrEqual(4);
  });

  test("cada sección está completa y enlaza al admin", () => {
    for (const s of GUIDE_SECTIONS) {
      expect(s.emoji).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.href.startsWith("/admin/")).toBe(true);
      expect(s.objetivo.length).toBeGreaterThan(10);
      expect(s.pasos.length).toBeGreaterThan(0);
      expect(s.pasos.every((p) => p.trim().length > 0)).toBe(true);
    }
  });

  test("cubre las secciones clave del panel", () => {
    const hrefs = GUIDE_SECTIONS.map((s) => s.href);
    expect(hrefs).toContain("/admin/collections/projects");
    expect(hrefs).toContain("/admin/collections/media");
    expect(hrefs).toContain("/admin/globals/site-settings");
    expect(hrefs).toContain("/admin/collections/categories");
  });
});
