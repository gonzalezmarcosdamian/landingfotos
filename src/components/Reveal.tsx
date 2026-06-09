"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, revealOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Envuelve contenido con un fade-up al entrar en viewport (una vez).
 * Con prefers-reduced-motion se muestra de inmediato (sin ocultar nunca el contenido).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={revealOnce.initial}
      whileInView={revealOnce.whileInView}
      viewport={revealOnce.viewport}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
