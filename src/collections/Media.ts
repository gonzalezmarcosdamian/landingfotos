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
    defaultColumns: ["filename", "alt", "mimeType"],
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
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      label: "Descripción",
      admin: { description: "Qué se ve en la imagen (ayuda al SEO y la accesibilidad)." },
    },
  ],
};
