import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/services";
import { site } from "@/content/site";

export function Services() {
  const ordered = services.slice().sort((a, b) => a.order - b.order);

  return (
    <section id="servicios" className="bg-sf-black py-[clamp(4rem,10vw,8rem)] text-sf-white">
      <Container>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
            {site.servicesIntro.heading}
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
            Contenido con actitud,
            <br />
            pensado para vender.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-[2px] bg-sf-white/10 md:grid-cols-3">
          {ordered.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col bg-sf-black p-8 transition-colors duration-300 hover:bg-sf-gray-900">
                <span className="mb-6 font-display text-5xl font-extrabold text-sf-red/30">
                  0{service.order}
                </span>
                <h3 className="mb-3 font-display text-xl font-bold leading-tight">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-sf-gray-300">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center md:mt-16">
          <ButtonLink href="#contacto" variant="primary">
            {site.servicesIntro.ctaLabel}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
