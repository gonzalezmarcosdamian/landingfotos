// Optimiza fotos de Cae a web en alta calidad (sharp): auto-orienta (EXIF),
// redimensiona a 2000px lado mayor, JPEG q86 mozjpeg. Salida numerada por proyecto.
import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, extname } from "node:path";

const SRC = "C:/sfsrc";
const OUT = "C:/Users/gonza/OneDrive/Documentos/landingfotos/public/projects";

const JOBS = [
  { slug: "coolangatta-gold", src: "deporte/fotos deporte/fotos tria" },
  { slug: "world-surf-league", src: "deporte/fotos deporte/fotos surf" },
  { slug: "get-motivated", src: "deporte/fotos deporte/fotos voley" },
  { slug: "fu-ma-chi", src: "gastro/fotos gastro" },
  { slug: "beauty-by-laser", src: "estética/fotos beautybylaser" },
  { slug: "_about", src: "foto mia-logo ig" },
];

const isImg = (f) => /\.(jpe?g|png)$/i.test(f);

for (const job of JOBS) {
  const srcDir = join(SRC, job.src);
  if (!existsSync(srcDir)) {
    console.log("SKIP (no existe):", job.src);
    continue;
  }
  const files = readdirSync(srcDir).filter(isImg).sort();
  const outDir = join(OUT, job.slug);
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  let i = 0;
  for (const f of files) {
    i++;
    const n = String(i).padStart(2, "0");
    const isPng = extname(f).toLowerCase() === ".png";
    const out = join(outDir, `${n}.${isPng ? "png" : "jpg"}`);
    try {
      const pipe = sharp(join(srcDir, f)).rotate().resize({
        width: 2000,
        height: 2000,
        fit: "inside",
        withoutEnlargement: true,
      });
      if (isPng) await pipe.png({ quality: 90 }).toFile(out);
      else await pipe.jpeg({ quality: 86, mozjpeg: true }).toFile(out);
    } catch (e) {
      console.log("ERR", f, e.message);
    }
  }
  console.log(`${job.slug}: ${i} imágenes -> ${outDir}`);
}
console.log("DONE");
