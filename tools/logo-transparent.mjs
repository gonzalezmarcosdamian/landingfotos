// Genera un logo blanco con fondo transparente a partir del logo (blanco sobre caja oscura).
// Usa la luminancia como canal alfa: blanco -> opaco, oscuro -> transparente.
import sharp from "sharp";

const IN = "C:/Users/gonza/OneDrive/Documentos/landingfotos/public/logo.png";
const OUT = "C:/Users/gonza/OneDrive/Documentos/landingfotos/public/logo-white.png";

const meta = await sharp(IN).metadata();
const { width, height } = meta;

// Alfa = luminancia del original, con los tonos oscuros aplastados a 0
// (fondo 100% transparente) conservando el anti-aliasing del texto.
const alpha = await sharp(IN)
  .removeAlpha()
  .greyscale()
  .linear(2.0, -60) // alpha = 2*lum - 60 (clamp 0..255): lum<30 -> 0
  .raw()
  .toBuffer();

// Imagen blanca + alfa de luminancia
await sharp({
  create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .joinChannel(alpha, { raw: { width, height, channels: 1 } })
  .png()
  .toFile(OUT);

console.log(`OK ${width}x${height} -> ${OUT}`);
