import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";

export function InstagramTeaser() {
  const site = getSite();

  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Instagram"
            title="Acompanhe o dia a dia da Casa LuBe"
            description="Bastidores, acolhimento e momentos da nossa comunidade."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <a
              href={site.brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[linear-gradient(135deg,#f28482,#f4c95d_45%,#7ec8e3)] px-8 py-5 font-semibold text-lube-ink shadow-md transition hover:scale-[1.02]"
            >
              Seguir @{site.brand.instagram.split("/").filter(Boolean).pop()}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
