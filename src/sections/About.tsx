import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="sobre-mi" className="bg-sf-white py-[clamp(4rem,12vw,9rem)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
              {site.about.heading}
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
              Lo simple,
              <br />
              como ventaja.
            </h2>
          </Reveal>

          <div className="space-y-6 md:col-span-7 md:col-start-6">
            {site.about.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-[60ch] text-lg leading-relaxed text-sf-gray-700 md:text-xl">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
