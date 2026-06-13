import type { CollectionConfig } from "payload";
import { slugify } from "../payload/slug";

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

/**
 * Publicaciones del portfolio. Pensado para que el fotógrafo cargue/edite
 * un proyecto con portada, galería de fotos y/o video — todo en lenguaje simple.
 */
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Publicación", plural: "Publicaciones" },
  admin: {
    useAsTitle: "title",
    group: "Portfolio",
    defaultColumns: ["cover", "title", "category", "type", "featured"],
    listSearchableFields: ["title", "client"],
    pagination: { defaultLimit: 25 },
    description: "Cada publicación del portfolio: portada, fotos y/o video.",
    hideAPIURL: true,
    components: {
      views: {
        list: { Component: "/admin/views/ProjectsList#ProjectsList" },
      },
    },
  },
  // Sin borradores: un solo botón “Guardar” y la publicación queda online.
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    // ── Portada y medios (todo en una sola ficha, sin pestañas) ──────────
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Portada",
      admin: {
        description: "📸 Foto principal — la que se ve en el portfolio. Vertical (4:5) recomendado.",
      },
    },
    {
      // Selector visual: tocá una foto de la galería para usarla de portada.
      name: "coverPicker",
      type: "ui",
      admin: {
        components: { Field: "/admin/components/CoverFromGallery#CoverFromGallery" },
      },
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Galería de fotos",
      admin: {
        description:
          "Arrastrá un archivo a la zona o tocá “Crear nuevo” para subir. Arrastrá las miniaturas para ordenarlas.",
      },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      label: "Video",
      admin: {
        description: "Opcional. Si la publicación es un video, subí el archivo .mp4 acá.",
      },
    },
    // ── Información ──────────────────────────────────────────────────────
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, label: "Título", admin: { width: "70%" } },
        {
          name: "client",
          type: "text",
          label: "Cliente",
          admin: { width: "30%", description: "Opcional." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: true,
          label: "Categoría",
          admin: { width: "50%" },
        },
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "photo",
          label: "Tipo",
          options: [
            { label: "Foto", value: "photo" },
            { label: "Video", value: "video" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "summary",
      type: "text",
      localized: true,
      label: "Resumen",
      admin: { description: "Frase corta que describe la publicación (se traduce por idioma)." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Identificador (URL)",
      admin: { position: "sidebar", description: "Se genera solo a partir del título." },
      hooks: {
        beforeValidate: [({ value, data }) => value || slugify(String(data?.title ?? ""))],
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: true,
      label: "Mostrar en el inicio",
      admin: { position: "sidebar", description: "Si está tildado, aparece en la home." },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Orden",
      admin: { position: "sidebar", description: "Menor número aparece primero." },
    },
  ],
};
