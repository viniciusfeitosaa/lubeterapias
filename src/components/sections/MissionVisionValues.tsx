import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSite } from "@/lib/content";

export function MissionVisionValues() {
  const site = getSite();
  const items = [
    { title: "Missão", body: site.mission },
    { title: "Visão", body: site.vision },
    { title: "Valores", body: site.values },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#2a9d8f_0%,#245c66_45%,#1e3a4c_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(143,191,106,0.35),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            light
            title="O que nos move"
            description="Princípios que guiam cada atendimento na Casa LuBe."
          />
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="h-full border-t border-white/25 pt-6">
                <h3 className="font-[family-name:var(--font-baloo)] text-2xl text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
