import type { Metadata, Viewport } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saltframevisuals.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Salt Frame Visuals — Contenido audiovisual con actitud para marcas",
    template: "%s — Salt Frame Visuals",
  },
  description:
    "Fotografía deportiva y video comercial para marcas. Imágenes vibrantes, videos que transmiten. Surf, deporte, real estate y gastronomía.",
  keywords: [
    "fotografía deportiva",
    "video comercial",
    "surf",
    "real estate",
    "gastronomía",
    "contenido para marcas",
    "Salt Frame Visuals",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Salt Frame Visuals",
    title: "Salt Frame Visuals — Contenido audiovisual con actitud para marcas",
    description:
      "Fotografía deportiva y video comercial para marcas. Imágenes vibrantes, videos que transmiten.",
    images: [{ url: "/hero/hero-poster-desktop.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salt Frame Visuals",
    description: "Contenido audiovisual con actitud para marcas.",
    images: ["/hero/hero-poster-desktop.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
