import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
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
    meta: { titleSuffix: " · Salt Frame Visuals" },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Projects],
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
  sharp,
  typescript: { outputFile: path.resolve(dirname, "src/payload-types.ts") },
});
