import type { CollectionConfig } from "payload";

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

/**
 * Biblioteca de medios (fotos y videos).
 * El storage lo maneja Cloudinary (plugin payload-storage-cloudinary):
 * los archivos se suben al CDN y Payload guarda la URL. `disableLocalStorage`
 * evita escribir al disco efímero de Railway. Las variantes (calidad/formato)
 * las resuelve Cloudinary on-the-fly vía transformaciones en la URL.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Foto o video", plural: "Biblioteca" },
  admin: {
    group: "Biblioteca",
    description: "Todas tus fotos y videos. Subí material acá para usarlo en las publicaciones.",
    // Nota: NO usar vista de lista custom acá. La Biblioteca se usa también en el
    // selector “Elegir existente” de la galería; la lista nativa de Payload trae
    // los checkboxes para seleccionar VARIAS a la vez (multi-select).
    defaultColumns: ["filename", "alt", "mimeType"],
    hideAPIURL: true,
  },
  access: {
    read: () => true, // medios públicos (se muestran en la web)
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ["image/*", "video/*"],
    bulkUpload: true, // permite subir y crear varias a la vez
  },
  fields: [
    {
      name: "alt",
      type: "text",
      // Opcional: así se pueden subir VARIAS de una sin frenar en cada archivo.
      // Si queda vacío, la web usa el título de la publicación como alt.
      localized: true,
      label: "Descripción (opcional)",
      admin: { description: "Qué se ve en la imagen (ayuda al SEO). Podés dejarlo vacío." },
    },
  ],
};
