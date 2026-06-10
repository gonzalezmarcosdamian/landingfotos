import type { CollectionConfig } from "payload";
import { slugify } from "../payload/slug";

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

/**
 * Proyectos del portfolio. El cliente crea/edita un proyecto con portada,
 * galería de fotos y/o video, categoría, orden y estado. Soporta borradores.
 */
export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    group: "Contenido",
    defaultColumns: ["title", "category", "type", "featured", "order"],
    description: "Cada proyecto del portfolio: portada, fotos y/o video.",
  },
  versions: { drafts: true }, // borrador + publicado
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "70%" } },
        { name: "client", type: "text", admin: { width: "30%", description: "Cliente (opcional)" } },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Identificador en URL (automático)." },
      hooks: {
        beforeValidate: [({ value, data }) => value || slugify(String(data?.title ?? ""))],
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "photo",
          options: [
            { label: "Foto", value: "photo" },
            { label: "Video", value: "video" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "Imagen de portada (vertical 4:5 recomendado)." },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      admin: { description: "Video cinematic del proyecto (opcional, se reproduce en el lightbox)." },
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: { description: "Galería de fotos del proyecto (opcional)." },
    },
    {
      name: "summary",
      type: "text",
      localized: true,
      admin: { description: "Resumen corto (se traduce por idioma)." },
    },
    {
      type: "row",
      fields: [
        {
          name: "featured",
          type: "checkbox",
          defaultValue: true,
          admin: { width: "50%", description: "Aparece en el home." },
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
          admin: { width: "50%", description: "Orden (menor primero)." },
        },
      ],
    },
  ],
};
