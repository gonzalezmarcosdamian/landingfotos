"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/fx/Magnetic";
import { site } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal con máscara: el texto sube desde abajo dentro de un contenedor recortado. */
function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={className}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        style={{ display: "block" }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax + scale del video al hacer scroll
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const videoSrc = isMobile ? "/hero/hero-mobile.mp4" : "/hero/hero-desktop.mp4";
  const poster = isMobile
    ? "/hero/hero-poster-mobile.jpg"
    : "/hero/hero-poster-desktop.jpg";

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-sf-black"
    >
      {/* Video de fondo (showreel) con parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY, scale: videoScale }}>
        <video
          key={videoSrc}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>

      {/* Velo con gradiente para legibilidad (abajo-izquierda) */}
      <div className="absolute inset-0 bg-gradient-to-t from-sf-black/85 via-sf-black/30 to-sf-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-sf-black/60 to-transparent" />

      <Container className="relative z-10 pb-20 pt-32 md:pb-28">
        <motion.div className="max-w-3xl" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            className="mb-5 h-1 w-16 origin-left bg-sf-red"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          />
          <h1 className="text-display font-display text-sf-white">
            <MaskReveal delay={0.15}>SALT FRAME</MaskReveal>
            <MaskReveal delay={0.28}>VISUALS</MaskReveal>
          </h1>
          <MaskReveal delay={0.5} className="mt-5 max-w-xl text-lg font-medium text-sf-white md:text-2xl">
            {site.hero.subheadline}
          </MaskReveal>
          <MaskReveal delay={0.6} className="mt-2 max-w-xl text-base text-sf-gray-300 md:text-lg">
            {site.hero.tagline}
          </MaskReveal>
          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
          >
            <Magnetic>
              <ButtonLink href="#portfolio" variant="primary">
                {site.hero.ctaLabel}
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </motion.div>
      </Container>

      {/* Indicador de scroll */}
      <motion.a
        href="#portfolio"
        aria-label="Ir al portfolio"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-sf-white/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
