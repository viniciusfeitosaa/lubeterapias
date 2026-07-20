"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export function Hero() {
  const site = getSite();
  const reduce = useReducedMotion();
  const wa = whatsappHref(site.units[0].whatsapp, DEFAULT_WA_TEXT);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/images/bg-home.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(30,58,76,0.72)_0%,rgba(42,157,143,0.45)_45%,rgba(126,200,227,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,201,93,0.28),transparent_40%)]" />

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-[18%] right-[8%] h-28 w-28 rounded-full bg-lube-sky/30 blur-2xl"
          animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
        <motion.p
          className="font-[family-name:var(--font-baloo)] text-5xl leading-none text-white drop-shadow md:text-7xl lg:text-8xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Casa LuBe
        </motion.p>

        <motion.h1
          className="mt-5 max-w-2xl font-[family-name:var(--font-fraunces)] text-2xl text-white md:text-4xl"
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
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href={wa} external>
            Falar no WhatsApp
          </Button>
          <Button href="/estrutura" variant="secondary">
            Conhecer a estrutura
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
