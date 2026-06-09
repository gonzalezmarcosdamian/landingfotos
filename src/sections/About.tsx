import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="sobre-mi" className="bg-sf-white py-[clamp(4rem,12vw,9rem)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-sf-red">
              {site.about.heading}
            </span>
            <h2 className="mb-8 font-display text-4xl font-bold leading-[1.05] md:text-5xl">
              Lo simple,
              <br />
              como ventaja.
            </h2>
            <ParallaxImage
              src="/about/cae.jpg"
              alt="Cae, creativo detrás de Salt Frame Visuals"
              className="aspect-[4/5] w-full max-w-sm rounded-[2px]"
              sizes="(max-width: 768px) 100vw, 30vw"
              intensity={6}
            />
          </Reveal>

          <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-2">
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
