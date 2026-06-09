"use client";

import { useLang } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

/** Bandera de España (SVG, renderiza igual en todos los OS). */
function FlagEs() {
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full" aria-hidden="true">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  );
}

/** Bandera de Estados Unidos (simplificada para tamaño chico). */
function FlagEn() {
  const h = 20 / 13;
  return (
    <svg viewBox="0 0 38 20" className="h-full w-full" aria-hidden="true">
      <rect width="38" height="20" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * h} width="38" height={h} fill="#B22234" />
      ))}
      <rect width="15.2" height={7 * h} fill="#3C3B6E" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle key={`${r}-${c}`} cx={2 + c * 4} cy={2 + r * 3.2} r="0.7" fill="#FFFFFF" />
        ))
      )}
    </svg>
  );
}

const FLAGS: Record<Lang, { node: React.ReactNode; label: string }> = {
  es: { node: <FlagEs />, label: "Español" },
  en: { node: <FlagEn />, label: "English" },
};

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={cn("flex items-center gap-1.5", className)}
    >
      {(Object.keys(FLAGS) as Lang[]).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-label={FLAGS[l].label}
            aria-pressed={active}
            className={cn(
              "h-[14px] w-[21px] overflow-hidden rounded-[2px] ring-1 transition-all duration-200",
              active
                ? "opacity-100 ring-sf-white/70"
                : "opacity-40 ring-transparent grayscale hover:opacity-80 hover:grayscale-0"
            )}
          >
            {FLAGS[l].node}
          </button>
        );
      })}
    </div>
  );
}
