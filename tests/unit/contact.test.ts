import { describe, expect, test } from "vitest";
import { buildContact, deriveWhatsappUrl, type SiteContact } from "@/content/contact";

const fallback: SiteContact = {
  email: "info@saltframevisuals.com",
  instagram: "@saltframevisuals",
  instagramUrl: "https://instagram.com/saltframevisuals",
  whatsapp: "+34 662 083 809",
  whatsappUrl: "https://wa.me/34662083809",
};

describe("deriveWhatsappUrl", () => {
  test("arma wa.me solo con los dígitos del número", () => {
    expect(deriveWhatsappUrl("+61 400 123 456", "x")).toBe("https://wa.me/61400123456");
  });

  test("usa el fallback cuando no hay número", () => {
    expect(deriveWhatsappUrl("", fallback.whatsappUrl)).toBe(fallback.whatsappUrl);
    expect(deriveWhatsappUrl(null, fallback.whatsappUrl)).toBe(fallback.whatsappUrl);
    expect(deriveWhatsappUrl(undefined, fallback.whatsappUrl)).toBe(fallback.whatsappUrl);
  });
});

describe("buildContact", () => {
  test("usa los valores del CMS cuando están presentes", () => {
    const c = buildContact(
      {
        contactEmail: "hola@cae.com",
        whatsapp: "+61 400 999 888",
        instagram: "@cae",
        instagramUrl: "https://instagram.com/cae",
      },
      fallback,
    );
    expect(c).toEqual({
      email: "hola@cae.com",
      instagram: "@cae",
      instagramUrl: "https://instagram.com/cae",
      whatsapp: "+61 400 999 888",
      whatsappUrl: "https://wa.me/61400999888",
    });
  });

  test("cae al fallback en los campos vacíos del CMS", () => {
    const c = buildContact({ contactEmail: "  ", whatsapp: undefined }, fallback);
    expect(c).toEqual(fallback);
  });

  test("mezcla: cambia solo el WhatsApp, el resto del fallback", () => {
    const c = buildContact({ whatsapp: "+61 2 1234 5678" }, fallback);
    expect(c.whatsapp).toBe("+61 2 1234 5678");
    expect(c.whatsappUrl).toBe("https://wa.me/61212345678");
    expect(c.email).toBe(fallback.email);
    expect(c.instagram).toBe(fallback.instagram);
  });
});
