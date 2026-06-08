import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outlineLight";

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
}

const base =
  "inline-flex items-center justify-center gap-2 font-display text-[0.9375rem] font-semibold uppercase tracking-[0.08em] px-8 py-4 rounded-[2px] transition-colors duration-300 ease-sf focus-visible:outline-2 focus-visible:outline-offset-3 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-sf-red text-sf-white hover:bg-sf-red-hover",
  outline:
    "border border-sf-black text-sf-black hover:bg-sf-black hover:text-sf-white",
  outlineLight:
    "border border-sf-white text-sf-white hover:bg-sf-white hover:text-sf-black",
};

/** CTA principal del sitio. Renderiza un <a> (navegación / mailto). */
export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
