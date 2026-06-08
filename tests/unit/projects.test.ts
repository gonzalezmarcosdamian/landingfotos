import { describe, expect, test } from "vitest";
import { getFeaturedProjects } from "@/content/projects";
import type { Project } from "@/types/content";

const make = (over: Partial<Project>): Project => ({
  slug: "p",
  title: "P",
  category: "deporte",
  type: "photo",
  featured: true,
  order: 1,
  ...over,
});

describe("getFeaturedProjects", () => {
  test("devuelve solo los destacados ordenados por `order`", () => {
    const input: Project[] = [
      make({ slug: "b", order: 2, featured: true }),
      make({ slug: "c", order: 3, featured: false }),
      make({ slug: "a", order: 1, featured: true }),
    ];

    const result = getFeaturedProjects(input);

    expect(result.map((p) => p.slug)).toEqual(["a", "b"]);
  });

  test("no muta el array original", () => {
    const input: Project[] = [
      make({ slug: "b", order: 2 }),
      make({ slug: "a", order: 1 }),
    ];
    const snapshot = input.map((p) => p.slug);

    getFeaturedProjects(input);

    expect(input.map((p) => p.slug)).toEqual(snapshot);
  });

  test("devuelve vacío cuando no hay destacados", () => {
    expect(getFeaturedProjects([make({ featured: false })])).toEqual([]);
  });
});
