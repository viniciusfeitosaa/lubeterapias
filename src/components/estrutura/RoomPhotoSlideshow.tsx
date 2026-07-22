"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { SiteImage } from "@/lib/images";

const INTERVAL_MS = 4000;

type RoomPhotoSlideshowProps = {
  images: SiteImage[];
  title: string;
};

export function RoomPhotoSlideshow({ images, title }: RoomPhotoSlideshowProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const multi = images.length > 1;

  useEffect(() => {
    if (!multi || reduce || paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [multi, reduce, paused, images.length]);

  const current = images[index] ?? images[0];

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-lube-mist"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {multi ? (
        <>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-t from-lube-deep/55 to-transparent px-2 pb-2 pt-8">
            <button
              type="button"
              aria-label={`Foto anterior — ${title}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lube-ink shadow-sm transition hover:bg-white"
              onClick={() =>
                setIndex((prev) => (prev - 1 + images.length) % images.length)
              }
            >
              <span aria-hidden>‹</span>
            </button>
            <div className="flex items-center gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`Ir para foto ${i + 1} de ${images.length}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition ${
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/55"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label={`Próxima foto — ${title}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lube-ink shadow-sm transition hover:bg-white"
              onClick={() => setIndex((prev) => (prev + 1) % images.length)}
            >
              <span aria-hidden>›</span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
