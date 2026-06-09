"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** clases del contenedor (define tamaño/aspect y bordes) */
  className?: string;
  sizes?: string;
  /** intensidad del desplazamiento en % (default 8) */
  intensity?: number;
  priority?: boolean;
}

/** Imagen con parallax sutil al hacer scroll. Respeta prefers-reduced-motion. */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  intensity = 8,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${intensity}%`, `${intensity}%`]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="scale-110 object-cover"
        />
      </motion.div>
    </div>
  );
}
