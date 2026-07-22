"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { getSalas } from "@/lib/content";
import { getRoomImages, SITE_IMAGES } from "@/lib/images";
import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";
import { SectionEdge } from "@/components/ui/SectionEdge";

const INTERVAL_MS = 4500;

type Slide = {
  id: string;
  name: string;
  subtitle?: string;
  src: string;
  alt: string;
};

function buildSlides(): Slide[] {
  const rooms = getSalas().flatMap((sala) => {
    const images = getRoomImages(sala.slug);
    return images.map((img, i) => ({
      id: images.length > 1 ? `${sala.slug}-${i + 1}` : sala.slug,
      name: sala.title,
      subtitle: sala.specialty,
      src: img.src,
      alt: img.alt,
    }));
  });

  return [
    {
      id: "fachada",
      name: "Nossa casa",
      subtitle: "Fachada",
      src: SITE_IMAGES.fachada.src,
      alt: SITE_IMAGES.fachada.alt,
    },
    ...rooms,
  ];
}

type ImageGalleryProps = {
  title?: string;
  eyebrow?: string;
};

export function ImageGallery({
  eyebrow = "Ambientes",
  title = "Um pedacinho da nossa casa",
}: ImageGalleryProps) {
  const slides = buildSlides();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, slides.length]);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden py-16 pb-20 md:py-20 md:pb-24">
      <div className="lube-shell">
        <ArchedEyebrow>{eyebrow}</ArchedEyebrow>
        <h2 className="-mt-1 text-center font-display text-3xl text-lube-ink md:text-4xl">
          {title}
        </h2>

        <div
          className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-lube-ink/8 shadow-[var(--shadow-soft)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div className="relative aspect-[16/10] min-h-[240px] bg-lube-mist md:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, x: 48 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -48 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(15,42,54,0.72)] via-[rgba(15,42,54,0.15)] to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  {slide.subtitle ? (
                    <p className="text-xs font-bold tracking-[0.16em] text-white/80 uppercase">
                      {slide.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-1 font-display text-3xl text-white md:text-4xl">
                    {slide.name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-lube-ink/8 bg-lube-foam/90 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Salas">
              {slides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={item.name}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-lube-teal"
                      : "w-2.5 bg-lube-ink/20 hover:bg-lube-ink/35"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Sala anterior"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-lube-ink/10 text-lube-ink transition hover:bg-lube-mist"
                onClick={() =>
                  setIndex((prev) => (prev - 1 + slides.length) % slides.length)
                }
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Próxima sala"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-lube-ink/10 text-lube-ink transition hover:bg-lube-mist"
                onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
              >
                →
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-sm text-lube-ink-soft" aria-live="polite">
          {index + 1} / {slides.length} — {slide.name}
        </p>
      </div>
      <SectionEdge flip variant="soft" />
    </section>
  );
}
