import type { CollectionConfig } from "payload";
import { slugify } from "../payload/slug";

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

/** Categorías del portfolio (editables por el cliente). */
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Categoría", plural: "Categorías" },
  admin: {
    useAsTitle: "name",
    group: "Portfolio",
    defaultColumns: ["name", "slug", "order"],
    description: "Las secciones del portfolio (Deporte, Surf, Gastronomía, etc.).",
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Nombre visible (se traduce por idioma)." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Identificador estable (no cambiar). Ej: deporte, surf." },
      hooks: {
        beforeValidate: [
          ({ value, data }) => value || slugify(String(data?.name ?? "")),
        ],
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Orden de aparición (menor primero)." },
    },
  ],
};
