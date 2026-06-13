/**
 * Helpers de Cloudinary compartidos por los componentes del admin.
 * Mantener puro (sin React/IO) para poder testearlo.
 */

export interface ThumbOptions {
  /** ancho del recorte (px) */
  w?: number;
  /** alto del recorte (px) */
  h?: number;
}

/**
 * Devuelve una miniatura optimizada de Cloudinary (recorte vertical, formato y
 * calidad automáticos). Si la URL no es de Cloudinary, la devuelve tal cual.
 * Si no hay URL, devuelve null.
 */
export function cloudinaryThumb(
  url: string | null | undefined,
  opts: ThumbOptions = {},
): string | null {
  if (!url) return null;
  const { w = 500, h = 640 } = opts;
  if (url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/c_fill,g_auto,w_${w},h_${h},q_auto,f_auto/`);
  }
  return url;
}

/**
 * Genera un fotograma (póster) JPG de un video de Cloudinary para usar como
 * miniatura. Devuelve null si la URL no es un video de Cloudinary.
 */
export function cloudinaryVideoPoster(
  url: string | null | undefined,
  opts: ThumbOptions = {},
): string | null {
  if (!url || !url.includes("/video/upload/")) return null;
  const { w = 500, h = 640 } = opts;
  return url
    .replace("/video/upload/", `/video/upload/c_fill,g_auto,w_${w},h_${h},so_0/`)
    .replace(/\.(mp4|mov|webm|m4v)$/i, ".jpg");
}
