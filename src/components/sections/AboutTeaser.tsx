import Image from "next/image";
import { SectionToys } from "@/components/toys/SectionToys";
import { ToyProp } from "@/components/toys/ToyProp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/images";

export function AboutTeaser() {
  const site = getSite();

  return (
    <section className="relative -mt-1.5 overflow-hidden bg-lube-mist py-20 pb-24 md:py-28 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-mist"
      />
      <SectionToys section="sobre" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lube-sky/25 blur-3xl" />
      <div className="lube-shell pointer-events-none relative z-10 grid items-center gap-10 md:grid-cols-2">
        <Reveal className="pointer-events-auto">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-lube-ink/8 shadow-[var(--shadow-soft)]">
            <Image
              src={SITE_IMAGES.recepcao.src}
              alt={SITE_IMAGES.recepcao.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="pointer-events-auto">
          <SectionHeading
            align="left"
            arched={false}
            eyebrow="Sobre nós"
            title="Uma casa pensada para acolher e desenvolver"
            description={site.about}
          />
          <div className="mt-8">
            <Button href="/sobre" variant="ghost">
              Leia mais sobre a Casa LuBe
            </Button>
            <div className="mt-6">
              <ToyProp id="nuvem" placement="flow" size="md" />
            </div>
          </div>
        </Reveal>
      </div>
      <SectionEdge flip variant="soft" fillClassName="text-lube-foam" />
    </section>
  );
}
