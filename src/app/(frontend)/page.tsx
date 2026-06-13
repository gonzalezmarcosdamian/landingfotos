import { Nav } from "@/sections/Nav";
import { Hero } from "@/sections/Hero";
import { Portfolio } from "@/sections/Portfolio";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Footer } from "@/sections/Footer";
import { site } from "@/content/site";
import { getSiteContent, type SiteContact } from "@/content/source";

/** Datos estructurados JSON-LD para SEO local (ProfessionalService). */
function StructuredData({ contact }: { contact: SiteContact }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.brand,
    description: "Contenido audiovisual con actitud para marcas.",
    email: contact.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saltframevisuals.com",
    sameAs: [contact.instagramUrl],
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
  const { projects, contact } = await getSiteContent();
  return (
    <>
      <StructuredData contact={contact} />
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
