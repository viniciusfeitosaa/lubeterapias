import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getSite } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/images";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Endereço, horário e formulário da Casa LuBe em Fortaleza. Fale conosco pelo WhatsApp.",
};

export default function ContatoPage() {
  const site = getSite();
  const unit = site.units[0];

  return (
    <main>
      <PageHero
        eyebrow="Contato"
        title="Fale com a Casa LuBe"
        description="Conheça nossa unidade em Fortaleza e escolha o caminho mais confortável para falar conosco."
        toys="contato"
      />

      <section className="lube-shell py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-lube-ink/8 shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[21/9] min-h-[140px]">
                <Image
                  src={SITE_IMAGES.heroFachada.src}
                  alt={SITE_IMAGES.heroFachada.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="lube-card overflow-hidden">
              <div className="h-[200px] bg-lube-sky-soft md:h-[240px]">
                <iframe
                  title={`Mapa ${unit.city}`}
                  src={unit.mapsEmbed}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-5 md:p-6">
                <h2 className="font-display text-xl text-lube-ink md:text-2xl">
                  Unidade {unit.city}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-lube-ink-soft">
                  {unit.address}
                </p>

                <p className="mt-5 text-xs font-bold tracking-wide text-lube-teal uppercase">
                  Horário de funcionamento
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-lube-ink-soft">
                  {unit.hoursSchedule.map((row) => (
                    <li
                      key={row.day}
                      className="flex justify-between gap-4 border-b border-lube-ink/8 pb-1.5 last:border-0"
                    >
                      <span className="font-semibold text-lube-ink">
                        {row.day}
                      </span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                    external
                    variant="wa"
                  >
                    WhatsApp {unit.phoneDisplay}
                  </Button>
                  <Button href={unit.mapsUrl} external variant="ghost">
                    Abrir no Google Maps
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-lube-ink/5 py-14 md:py-20">
        <div className="lube-shell mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-center text-3xl text-lube-ink md:text-4xl">
              Envie uma mensagem
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-lube-ink-soft md:text-base">
              Prefere escrever? Preencha o formulário e retornamos pelo WhatsApp
              ou e-mail.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
