import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";

export function AboutTeaser() {
  const site = getSite();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f0f7fa_0%,#dff1f7_50%,#f0f7fa_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lube-sky/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image
              src="/images/sobre-casa.jpg"
              alt="Ambiente acolhedor da Casa LuBe"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Sobre nós"
            title="Uma casa pensada para acolher e desenvolver"
            description={site.about}
          />
          <div className="mt-8 flex justify-center md:justify-start">
            <Button href="/sobre" variant="ghost">
              Leia mais sobre a Casa LuBe
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
