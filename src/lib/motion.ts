import type { Variants } from "framer-motion";

/** Presets de animación reutilizables. Sutil siempre (ver docs/04-DESIGN-SYSTEM.md §5). */

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Revelado con máscara (clip-path) — efecto editorial de "cortina". */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 28 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Props comunes para revelar al entrar en viewport (una sola vez). */
export const revealOnce = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.2 },
};
