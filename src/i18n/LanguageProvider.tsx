"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  dictionaries as staticDictionaries,
  type Dict,
  type Lang,
} from "./dictionaries";
import { site } from "@/content/site";
import type { SiteContact } from "@/content/source";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: Dict;
  contact: SiteContact;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "sf-lang";

/**
 * Provee idioma + diccionario. Los diccionarios se inyectan desde el server
 * (contenido del CMS o estático); si no se pasan, usa el estático.
 */
export function LanguageProvider({
  children,
  dictionaries = staticDictionaries,
  contact = site.contact,
}: {
  children: ReactNode;
  dictionaries?: Record<Lang, Dict>;
  contact?: SiteContact;
}) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Restaura el idioma elegido (sin romper la hidratación: corre tras el montaje).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  // Mantiene el atributo lang del documento en sync (a11y + SEO).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "es" ? "en" : "es";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: dictionaries[lang], contact }),
    [lang, setLang, toggle, dictionaries, contact]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
