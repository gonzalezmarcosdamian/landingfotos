"use client";

import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import { useLang } from "@/i18n/LanguageProvider";

export function Services() {
  const { t } = useLang();
  const whatsappCta = `${site.contact.whatsappUrl}?text=${encodeURIComponent(
    t.services.whatsappMessage,
  )}`;

  return (
    <section id="servicios" className="bg-sf-black py-[clamp(4rem,10vw,8rem)] text-sf-white">
      <Container>
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
            {t.services.overline}
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
            {t.services.headingL1}
            <br />
            {t.services.headingL2}
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-[2px] bg-sf-white/10 md:grid-cols-3">
          {t.services.items.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col bg-sf-black p-8 transition-colors duration-300 hover:bg-sf-gray-900">
                <span className="mb-6 font-display text-5xl font-extrabold text-sf-red/30">
                  0{i + 1}
                </span>
                <h3 className="mb-3 font-display text-xl font-bold leading-tight">{service.title}</h3>
                <p className="text-base leading-relaxed text-sf-gray-300">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center md:mt-16">
          <ButtonLink
            href={whatsappCta}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
            {t.services.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
