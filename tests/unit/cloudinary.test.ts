import { describe, expect, test } from "vitest";
import { cloudinaryThumb, cloudinaryVideoPoster } from "@/lib/cloudinary";

describe("cloudinaryThumb", () => {
  test("devuelve null si no hay url", () => {
    expect(cloudinaryThumb(undefined)).toBeNull();
    expect(cloudinaryThumb(null)).toBeNull();
    expect(cloudinaryThumb("")).toBeNull();
  });

  test("inserta la transformación en una url de Cloudinary", () => {
    const url = "https://res.cloudinary.com/di2ul6nhk/image/upload/v123/salt-frame/abc.jpg";
    expect(cloudinaryThumb(url)).toBe(
      "https://res.cloudinary.com/di2ul6nhk/image/upload/c_fill,g_auto,w_500,h_640,q_auto,f_auto/v123/salt-frame/abc.jpg",
    );
  });

  test("respeta ancho y alto personalizados", () => {
    const url = "https://res.cloudinary.com/x/image/upload/v1/a.jpg";
    expect(cloudinaryThumb(url, { w: 200, h: 250 })).toContain("w_200,h_250");
  });

  test("devuelve la url tal cual si no es de Cloudinary", () => {
    const url = "https://example.com/foto.jpg";
    expect(cloudinaryThumb(url)).toBe(url);
  });
});

describe("cloudinaryVideoPoster", () => {
  test("genera un póster jpg desde un video de Cloudinary", () => {
    const url = "https://res.cloudinary.com/x/video/upload/v1/salt-frame/clip.mp4";
    const poster = cloudinaryVideoPoster(url, { w: 320, h: 400 });
    expect(poster).toBe(
      "https://res.cloudinary.com/x/video/upload/c_fill,g_auto,w_320,h_400,so_0/v1/salt-frame/clip.jpg",
    );
  });

  test("devuelve null si no es un video de Cloudinary", () => {
    expect(cloudinaryVideoPoster("https://res.cloudinary.com/x/image/upload/v1/a.jpg")).toBeNull();
    expect(cloudinaryVideoPoster(undefined)).toBeNull();
  });
});
