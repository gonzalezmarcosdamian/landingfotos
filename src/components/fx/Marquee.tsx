import { Fragment, type CSSProperties } from "react";

interface MarqueeProps {
  items: string[];
  /** segundos por vuelta; menor = más rápido */
  duration?: number;
}

/**
 * Banda de texto en movimiento (categorías/clientes). CSS puro.
 * Con prefers-reduced-motion la animación se detiene (queda estático y legible).
 */
export function Marquee({ items, duration = 30 }: MarqueeProps) {
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="px-8 font-display text-2xl font-bold uppercase tracking-tight text-sf-white md:text-4xl">
            {item}
          </span>
          <span className="text-sf-red" aria-hidden="true">
            ●
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden border-y border-sf-white/10 bg-sf-black py-6 select-none">
      <div
        className="flex shrink-0 animate-[marquee_var(--marquee-duration)_linear_infinite] motion-reduce:animate-none"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <Row />
        <Row />
      </div>
    </div>
  );
}
