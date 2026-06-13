import { describe, expect, test } from "vitest";
import { slugify } from "@/payload/slug";

describe("slugify", () => {
  test("pasa a minúsculas y reemplaza espacios por guiones", () => {
    expect(slugify("World Surf League")).toBe("world-surf-league");
  });

  test("saca tildes y diacríticos", () => {
    expect(slugify("Gastronomía Atlética")).toBe("gastronomia-atletica");
  });

  test("colapsa separadores y recorta guiones de los extremos", () => {
    expect(slugify("  Hola --- Mundo!! ")).toBe("hola-mundo");
  });

  test("cadena sin caracteres válidos devuelve vacío", () => {
    expect(slugify("¿!¡?")).toBe("");
  });
});
