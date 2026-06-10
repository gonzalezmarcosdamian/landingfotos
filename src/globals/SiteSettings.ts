import type { GlobalConfig } from "payload";

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

/**
 * Textos editables del sitio (hero, sobre mí, servicios, footer, contacto).
 * Campos localizados ES/EN — el cliente cambia el copy sin tocar código.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Textos del sitio",
  admin: { group: "Contenido" },
  access: { read: () => true, update: authenticated },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroSubheadline", type: "text", localized: true, label: "Subtítulo" },
            { name: "heroTagline", type: "text", localized: true, label: "Tagline" },
            { name: "heroCta", type: "text", localized: true, label: "Botón (CTA)" },
          ],
        },
        {
          label: "Sobre mí",
          fields: [
            { name: "aboutHeadingL1", type: "text", localized: true, label: "Título línea 1" },
            { name: "aboutHeadingL2", type: "text", localized: true, label: "Título línea 2" },
            {
              name: "aboutBody",
              type: "array",
              localized: true,
              label: "Párrafos",
              fields: [{ name: "text", type: "textarea", required: true }],
            },
          ],
        },
        {
          label: "Servicios",
          fields: [
            { name: "servicesHeadingL1", type: "text", localized: true, label: "Título línea 1" },
            { name: "servicesHeadingL2", type: "text", localized: true, label: "Título línea 2" },
            { name: "servicesCta", type: "text", localized: true, label: "Botón (CTA)" },
            {
              name: "services",
              type: "array",
              localized: true,
              label: "Ejes de servicio",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Footer / Contacto",
          fields: [
            { name: "footerHeading", type: "text", localized: true, label: "Título" },
            { name: "footerBlurb", type: "textarea", localized: true, label: "Texto" },
            { name: "footerTagline", type: "text", localized: true, label: "Tagline" },
            { name: "contactEmail", type: "email", label: "Email de contacto" },
            { name: "instagram", type: "text", label: "Instagram (@usuario)" },
            { name: "instagramUrl", type: "text", label: "URL de Instagram" },
          ],
        },
      ],
    },
  ],
};
