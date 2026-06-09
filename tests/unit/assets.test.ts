import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/content/projects";

/** Resuelve una ruta pública (/x) a su archivo en /public. */
const pub = (p: string) => join(process.cwd(), "public", p.replace(/^\//, ""));
const isVideo = (p: string) => /\.(mp4|webm|mov)$/i.test(p);

/**
 * Garantiza que todo asset de IMAGEN referenciado exista en /public.
 * Los videos (.mp4) se omiten: se despliegan vía Vercel y están en .gitignore,
 * por lo que no están presentes en un checkout limpio de CI.
 */
describe("assets de imagen de proyectos existen en /public", () => {
  for (const project of projects) {
    test(`${project.slug}: cover definido y presente`, () => {
      expect(project.cover, `${project.slug} no tiene cover`).toBeTruthy();
      if (project.cover && !isVideo(project.cover)) {
        expect(existsSync(pub(project.cover)), `falta ${project.cover}`).toBe(true);
      }
    });

    for (const [i, g] of (project.gallery ?? []).entries()) {
      test(`${project.slug}: galería[${i}] (${g}) presente`, () => {
        expect(existsSync(pub(g)), `falta ${g}`).toBe(true);
      });
    }
  }
});

describe("assets de marca / hero / about existen", () => {
  const assets = [
    "/logo.png",
    "/logo-white.png",
    "/about/cae.jpg",
    "/hero/hero-poster-desktop.jpg",
    "/hero/hero-poster-mobile.jpg",
  ];
  for (const a of assets) {
    test(`${a} presente`, () => {
      expect(existsSync(pub(a)), `falta ${a}`).toBe(true);
    });
  }
});
