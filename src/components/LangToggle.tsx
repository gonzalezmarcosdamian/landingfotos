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

/** Bandera del Reino Unido (Union Jack simplificado). */
function FlagEn() {
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
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
