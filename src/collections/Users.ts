import type { CollectionConfig } from "payload";

/** Usuarios del backoffice (auth). Solo admins gestionan usuarios. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 min
  },
  labels: { singular: "Usuario", plural: "Usuarios" },
  admin: { useAsTitle: "email", group: "Cuenta" },
  access: {
    // Solo admins crean/borran usuarios; cualquiera autenticado se lee a sí mismo.
    create: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // Un editor no puede auto-promoverse a admin.
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};
