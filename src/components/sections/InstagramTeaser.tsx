import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";

export function InstagramTeaser() {
  const site = getSite();
  const handle =
    site.brand.instagram.split("/").filter(Boolean).pop() ?? "lubeterapias";

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
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
    </section>
  );
}
