import Image from "next/image";
import { SectionToys } from "@/components/toys/SectionToys";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/images";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export function UnitsSection() {
  const site = getSite();
  const unit = site.units[0];

  return (
    <section className="relative -mt-1.5 overflow-hidden bg-lube-mist py-20 pb-24 md:py-28 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-mist"
      />
      <SectionToys section="unidades" />
      <div className="lube-shell relative">
        <Reveal>
          <SectionHeading
            eyebrow="Unidade"
            title="Onde estamos"
            description="Nossa casa em Fortaleza, pronta para acolher sua família."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <article className="lube-card mx-auto mt-12 max-w-3xl overflow-hidden">
            <div className="relative aspect-[21/9] min-h-[160px]">
              <Image
                src={SITE_IMAGES.heroFachada.src}
                alt={SITE_IMAGES.heroFachada.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl text-lube-ink">{unit.city}</h3>
              <p className="mt-3 text-sm leading-relaxed text-lube-ink-soft">
                {unit.address}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-lube-ink-soft">
                {unit.hoursSchedule.map((row) => (
                  <li key={row.day} className="flex justify-between gap-3">
                    <span className="font-semibold text-lube-ink">{row.day}</span>
                    <span>{row.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                  external
                  variant="wa"
                >
                  WhatsApp {unit.phoneDisplay}
                </Button>
                <Button href="/contato" variant="ghost">
                  Ver no mapa
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
      <SectionEdge flip fillClassName="text-lube-foam" />
    </section>
  );
}
