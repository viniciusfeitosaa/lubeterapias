"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionToys } from "@/components/toys/SectionToys";
import { Button } from "@/components/ui/Button";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { getSite } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/images";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export function Hero() {
  const site = getSite();
  const reduce = useReducedMotion();
  const wa = whatsappHref(site.units[0].whatsapp, DEFAULT_WA_TEXT);

  return (
    <section className="relative min-h-[88svh] overflow-hidden md:min-h-[92svh]">
      <Image
        src={SITE_IMAGES.hero.src}
        alt={SITE_IMAGES.hero.alt}
        fill
        priority
        className="object-cover object-[center_55%]"
        sizes="100vw"
      />
      {/* Blur L→R: forte atrás do texto, some na direita */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, #000 0%, #000 28%, transparent 72%)",
          maskImage:
            "linear-gradient(90deg, #000 0%, #000 28%, transparent 72%)",
        }}
      >
        <Image
          src={SITE_IMAGES.hero.src}
          alt=""
          fill
          priority
          className="scale-110 object-cover object-[center_55%] blur-2xl md:blur-3xl"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,42,54,0.72)_0%,rgba(31,143,130,0.38)_42%,rgba(110,191,220,0.14)_78%,transparent_100%)]" />

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-[16%] right-[10%] h-24 w-24 rounded-full bg-lube-sky/35 blur-2xl"
          animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <SectionToys section="hero" />

      <div className="lube-shell pointer-events-none relative z-10 flex min-h-[88svh] flex-col justify-end pb-14 pt-28 md:min-h-[92svh] md:pb-20">
        <motion.p
          className="pointer-events-auto font-brand text-5xl leading-none text-white drop-shadow md:text-7xl lg:text-8xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Casa LuBe
        </motion.p>

        <motion.h1
          className="mt-5 max-w-2xl font-display text-2xl text-white md:text-4xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Espaço lúdico e de bem-estar para o desenvolvimento infantil
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-base text-white/90 md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Ambiente amoroso e equipe multidisciplinar para crianças com
          transtornos do neurodesenvolvimento. Venha conhecer nossa casa.
        </motion.p>

        <motion.div
          className="pointer-events-auto mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href={wa} external variant="wa">
            Falar no WhatsApp
          </Button>
          <Button href="/estrutura" variant="secondary">
            Conhecer a estrutura
          </Button>
        </motion.div>
      </div>
      <SectionEdge fillClassName="text-lube-mist" />
    </section>
  );
}
