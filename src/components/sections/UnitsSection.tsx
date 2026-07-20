import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export function UnitsSection() {
  const site = getSite();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#e8f6fb_0%,#f0f7fa_100%)]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Unidades"
            title="Onde estamos"
            description="Duas casas para acolher famílias em Fortaleza e Eusébio."
          />
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {site.units.map((unit, index) => (
            <Reveal key={unit.id} delay={index * 0.08}>
              <article className="rounded-[1.5rem] bg-lube-foam p-6 ring-1 ring-lube-ink/8 md:p-8">
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl text-lube-ink">
                  {unit.city}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-lube-ink/75">
                  {unit.address}
                </p>
                <p className="mt-2 text-sm text-lube-ink/75">{unit.hours}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                    external
                  >
                    WhatsApp {unit.phoneDisplay}
                  </Button>
                  <Button href={unit.mapsUrl} external variant="ghost">
                    Ver no mapa
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
