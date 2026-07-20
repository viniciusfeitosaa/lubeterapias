import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Unidades",
  description: "Unidades Casa LuBe em Fortaleza e Eusébio.",
};

export default function UnidadesPage() {
  const site = getSite();

  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Unidades"
            title="Fortaleza e Eusébio"
            description="Escolha a casa mais próxima e fale conosco pelo WhatsApp."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {site.units.map((unit, index) => (
            <Reveal key={unit.id} delay={index * 0.08}>
              <article className="overflow-hidden rounded-[1.5rem] bg-lube-foam ring-1 ring-lube-ink/8">
                <div className="aspect-[16/10] bg-lube-mist">
                  <iframe
                    title={`Mapa ${unit.city}`}
                    src={unit.mapsEmbed}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-lube-ink">
                    {unit.city}
                  </h2>
                  <p className="mt-3 text-sm text-lube-ink/75">{unit.address}</p>
                  <p className="mt-2 text-sm text-lube-ink/75">{unit.hours}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                      external
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
          ))}
        </div>
      </div>
    </main>
  );
}
