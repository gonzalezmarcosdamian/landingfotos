import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { cloudinaryStorage } from "payload-storage-cloudinary";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Categories } from "./src/collections/Categories";
import { Projects } from "./src/collections/Projects";
import { SiteSettings } from "./src/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// SQLite local por defecto; Postgres (Railway) cuando DATABASE_URI es postgres.
const dbUri = process.env.DATABASE_URI || "file:./cms.db";
const usePostgres = dbUri.startsWith("postgres");

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Salt Frame Visuals",
      title: "Salt Frame Visuals",
    },
    // Componentes de marca y guía (resueltos vía import map).
    importMap: { baseDir: path.resolve(dirname, "src") },
    components: {
      graphics: {
        Logo: "/admin/components/Logo#Logo",
        Icon: "/admin/components/Icon#Icon",
      },
      providers: ["/admin/components/BrandProvider#BrandProvider"],
      views: {
        dashboard: {
          Component: "/admin/views/Dashboard#Dashboard",
        },
      },
    },
  },
  editor: lexicalEditor(),
  // Orden de navegación pensado para el fotógrafo: portfolio primero.
  collections: [Projects, Categories, Media, Users],
  globals: [SiteSettings],
  localization: {
    locales: [
      { label: "Español", code: "es" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "es",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: dbUri },
        // Aísla las tablas en un schema propio para poder COMPARTIR la base de
        // datos con otros proyectos (p. ej. lexcore) sin colisiones de tablas.
        schemaName: process.env.DB_SCHEMA || "salt_frame",
        // Crea/sincroniza el esquema al iniciar (DB nueva, sin migraciones).
        push: true,
      })
    : sqliteAdapter({ client: { url: dbUri } }),
  plugins: [
    cloudinaryStorage({
      cloudConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
        api_key: process.env.CLOUDINARY_API_KEY as string,
        api_secret: process.env.CLOUDINARY_API_SECRET as string,
      },
      collections: {
        media: {
          folder: "salt-frame",
          transformations: {
            // No tocamos el original; las optimizaciones van por URL.
            default: { quality: "auto", fetch_format: "auto" },
            preserveOriginal: true,
          },
        },
      },
    }),
  ],
  sharp,
  typescript: { outputFile: path.resolve(dirname, "src/payload-types.ts") },
});
