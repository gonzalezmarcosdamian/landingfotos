"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal } from "@/lib/motion";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reveal con máscara (clip-path) al entrar en viewport, POR elemento.
 * Con prefers-reduced-motion muestra el contenido de inmediato (nunca lo oculta).
 */
export function ClipReveal({ children, className }: ClipRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
