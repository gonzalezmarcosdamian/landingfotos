"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor personalizado (solo puntero fino). Sigue al mouse con un spring suave,
 * crece sobre elementos interactivos y muestra una etiqueta (p. ej. "VER")
 * sobre elementos con [data-cursor-label].
 */
export function Cursor() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], [data-cursor-label]"
      );
      setActive(Boolean(el));
      setLabel(el?.getAttribute("data-cursor-label") ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full mix-blend-difference [@media(pointer:fine)]:flex"
      style={{ x: sx, y: sy }}
      animate={{
        width: label ? 80 : active ? 48 : 12,
        height: label ? 80 : active ? 48 : 12,
        opacity: visible ? 1 : 0,
        backgroundColor: label ? "#D91A2A" : "#FFFFFF",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {label && (
        <span className="font-display text-[0.7rem] font-bold uppercase tracking-wider text-sf-white">
          {label}
        </span>
      )}
    </motion.div>
  );
}
