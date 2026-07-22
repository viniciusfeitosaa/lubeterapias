import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";

export function InstagramTeaser() {
  const site = getSite();
  const handle =
    site.brand.instagram.split("/").filter(Boolean).pop() ?? "lubeterapias";

  return (
    <section className="relative -mt-1.5 overflow-hidden bg-lube-foam py-20 pb-24 md:py-24 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-foam"
      />
      <div className="lube-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Instagram"
            title="Acompanhe o dia a dia da Casa LuBe"
            description="Bastidores, acolhimento e momentos da nossa comunidade."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Button href={site.brand.instagram} external className="px-8 py-5">
              Seguir @{handle}
            </Button>
          </div>
        </Reveal>
      </div>
      <SectionEdge fillClassName="text-lube-footer" />
    </section>
  );
}
