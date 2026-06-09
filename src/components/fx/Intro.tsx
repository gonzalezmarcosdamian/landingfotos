"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Intro reveal: cortina negra con el wordmark que se retira al cargar.
 * Con prefers-reduced-motion sale al instante (sin bloquear ni animar).
 */
export function Intro() {
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <Image
              src="/logo-white.png"
              alt="Salt Frame Visuals"
              width={280}
              height={117}
              priority
              className="w-48 md:w-64"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
