import { Instagram, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  const year = 2026;

  return (
    <footer
      id="contacto"
      className="border-t border-sf-white/10 bg-sf-gray-900 py-16 text-sf-white"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="mb-4 h-1 w-12 bg-sf-red" />
            <h2 className="font-display text-3xl font-extrabold uppercase md:text-4xl">
              Hablemos
            </h2>
            <p className="mt-3 max-w-md text-sf-gray-300">
              Contame tu proyecto. Hagamos que tus fotos y videos griten por sí solos.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${site.contact.email}`}
              className="group flex items-center gap-3 text-lg text-sf-white transition-colors hover:text-sf-red"
            >
              <Mail className="h-5 w-5" strokeWidth={2} />
              {site.contact.email}
            </a>
            <a
              href={site.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-lg text-sf-white transition-colors hover:text-sf-red"
            >
              <Instagram className="h-5 w-5" strokeWidth={2} />
              {site.contact.instagram}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-sf-white/10 pt-6 text-sm text-sf-gray-500 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {site.brand}. Todos los derechos reservados.
          </span>
          <span className="uppercase tracking-[0.15em]">
            Cero exceso, máxima actitud.
          </span>
        </div>
      </Container>
    </footer>
  );
}
