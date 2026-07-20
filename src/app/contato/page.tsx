import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Casa LuBe por WhatsApp ou formulário.",
};

export default function ContatoPage() {
  const site = getSite();

  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Contato"
            title="Fale com a Casa LuBe"
            description="Atendimento humanizado pelo WhatsApp ou pelo formulário abaixo. Página reconstruída do zero — segura e direta."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6 rounded-[1.5rem] bg-lube-foam p-6 ring-1 ring-lube-ink/8 md:p-8">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl">
                WhatsApp direto
              </h2>
              {site.units.map((unit) => (
                <div key={unit.id}>
                  <p className="font-semibold text-lube-ink">{unit.city}</p>
                  <p className="mt-1 text-sm text-lube-ink/70">{unit.address}</p>
                  <div className="mt-3">
                    <Button
                      href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                      external
                    >
                      {unit.phoneDisplay}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
