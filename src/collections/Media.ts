import type { CollectionConfig } from "payload";

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

/**
 * Biblioteca de medios (fotos y videos). Subida con upload de Payload.
 * En dev guarda en disco (./public/media/cms); en prod se conecta un storage
 * adapter (Cloudinary / Vercel Blob) — ver docs/03-BACKOFFICE.md.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Contenido" },
  access: {
    read: () => true, // medios públicos (se muestran en la web)
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: "public/media/cms",
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 1024 },
      { name: "full", width: 2000 },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Texto alternativo (accesibilidad y SEO)." },
    },
  ],
};
