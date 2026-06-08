"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-sf-black"
    >
      {/* Video de fondo (showreel). Poster inmediato, sin audio, en loop. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/hero/hero-poster-desktop.jpg"
        aria-hidden="true"
      >
        <source src="/hero/hero-desktop.mp4" type="video/mp4" />
      </video>

      {/* Velo con gradiente para legibilidad del texto (abajo-izquierda) */}
      <div className="absolute inset-0 bg-gradient-to-t from-sf-black/85 via-sf-black/30 to-sf-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-sf-black/60 to-transparent" />

      <Container className="relative z-10 pb-20 pt-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="mb-5 h-1 w-16 bg-sf-red" />
          <h1 className="text-display font-display text-sf-white">
            {site.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium text-sf-white md:text-2xl">
            {site.hero.subheadline}
          </p>
          <p className="mt-2 max-w-xl text-base text-sf-gray-300 md:text-lg">
            {site.hero.tagline}
          </p>
          <div className="mt-9">
            <ButtonLink href="#portfolio" variant="primary">
              {site.hero.ctaLabel}
            </ButtonLink>
          </div>
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
