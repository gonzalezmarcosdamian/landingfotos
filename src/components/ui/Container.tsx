import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Contenedor central con ancho máximo y padding lateral fluido. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-[clamp(1rem,5vw,4rem)]",
        className
      )}
    >
      {children}
    </div>
  );
}
