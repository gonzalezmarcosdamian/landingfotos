"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal } from "@/lib/motion";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reveal con máscara (clip-path) que anima AL MONTAR el elemento.
 *
 * Importante: usar `animate` (no `whileInView`) garantiza que el contenido SIEMPRE
 * se muestre — también cuando la grilla se re-monta al filtrar por categoría estando
 * ya dentro del viewport (donde `whileInView` no vuelve a disparar y dejaba todo en blanco).
 * Con prefers-reduced-motion se muestra de inmediato, sin animación.
 */
export function ClipReveal({ children, className, delay = 0 }: ClipRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={clipReveal}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
