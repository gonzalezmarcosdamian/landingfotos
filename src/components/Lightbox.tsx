"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/types/content";
import { useLang } from "@/i18n/LanguageProvider";

type MediaItem = { type: "video"; src: string } | { type: "image"; src: string };

function buildMedia(project: Project): MediaItem[] {
  const items: MediaItem[] = [];
  if (project.video) items.push({ type: "video", src: project.video });
  (project.gallery ?? []).forEach((src) => items.push({ type: "image", src }));
  return items;
}

export function Lightbox({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t } = useLang();
  const media = useMemo(() => (project ? buildMedia(project) : []), [project]);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [project]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % media.length),
    [media.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + media.length) % media.length),
    [media.length]
  );

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, next, prev]);

  const current = media[index];
  const hasMany = media.length > 1;

  return (
    <AnimatePresence>
      {project && current && (
        <motion.div
          className="fixed inset-0 z-[8000] flex flex-col bg-sf-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Proyecto ${project.title}`}
          onClick={onClose}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <div>
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sf-red">
                {t.categories[project.category]}
              </span>
              <h3 className="font-display text-lg font-bold text-sf-white md:text-xl">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="rounded-full p-2 text-sf-white/80 transition-colors hover:text-sf-white"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Media */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="relative flex h-full w-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {current.type === "video" ? (
                  <video
                    className="max-h-full max-w-full rounded-[2px] object-contain"
                    src={current.src}
                    controls
                    autoPlay
                    playsInline
                    poster={project.cover}
                  />
                ) : (
                  <Image
                    src={current.src}
                    alt={`${project.title} — ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {hasMany && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-sf-black/50 p-2 text-sf-white/80 transition-colors hover:text-sf-white md:left-4"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-sf-black/50 p-2 text-sf-white/80 transition-colors hover:text-sf-white md:right-4"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
          </div>

          {/* Footer: contador */}
          {hasMany && (
            <div className="pb-5 text-center text-sm text-sf-gray-500">
              {index + 1} / {media.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
