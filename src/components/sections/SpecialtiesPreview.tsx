import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEspecialidades } from "@/lib/content";

export function SpecialtiesPreview() {
  const items = getEspecialidades().slice(0, 8);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Especialidades"
            title="Cuidado multidisciplinar em um só lugar"
            description="Conheça os caminhos terapêuticos que acolhem cada fase do desenvolvimento."
          />
        </Reveal>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05} className="snap-start">
              <Link
                href={`/especialidades/${item.slug}`}
                className="block w-[260px] shrink-0 rounded-2xl bg-lube-foam p-5 ring-1 ring-lube-ink/8 transition hover:-translate-y-1 hover:shadow-lg hover:ring-lube-teal/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--lube-sky),var(--lube-teal))] text-lg font-bold text-white">
                  {item.title.slice(0, 1)}
                </div>
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-lube-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-lube-ink/70">
                  {item.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/especialidades"
            className="font-semibold text-lube-teal underline-offset-4 hover:underline"
          >
            Ver todas as especialidades
          </Link>
        </div>
      </div>
    </section>
  );
}
