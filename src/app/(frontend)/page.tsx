import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { Portfolio } from "@/sections/Portfolio";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Footer } from "@/sections/Footer";
import { site } from "@/content/site";
import { getSiteContent } from "@/content/source";

/** Datos estructurados JSON-LD para SEO local (ProfessionalService). */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.brand,
    description: "Contenido audiovisual con actitud para marcas.",
    email: site.contact.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saltframevisuals.com",
    sameAs: [site.contact.instagramUrl],
    areaServed: "Australia",
    knowsAbout: ["Fotografía deportiva", "Video comercial", "Surf", "Real estate", "Gastronomía"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function Home() {
  const { projects } = await getSiteContent();
  return (
    <>
      <StructuredData />
      <Nav />
      <main>
        <Hero />
        <Portfolio projects={projects} />
        <About />
        <Services />
      </main>
      <Footer />
    </>
  );
}
