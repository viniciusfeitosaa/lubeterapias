import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import {
  getEspecialidadesByCategory,
  SPECIALTY_CATEGORY_LABELS,
  SPECIALTY_CATEGORY_ORDER,
} from "@/lib/content";
import { getServiceImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Especialidades, grupos e esportes da Casa LuBe para o desenvolvimento infantil.",
};

export default function EspecialidadesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Serviços"
        title="Conheça nossos serviços"
        description="Especialidades clínicas, grupos e esportes em um cuidado multidisciplinar."
        toys="especialidades"
      />

      <section className="relative -mt-1.5 overflow-hidden bg-lube-mist py-14 pb-20 md:py-20 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-mist"
        />
        <div className="lube-shell space-y-16">
          {SPECIALTY_CATEGORY_ORDER.map((category) => {
            const items = getEspecialidadesByCategory(category);
            if (items.length === 0) return null;

            return (
              <div key={category} aria-labelledby={`cat-${category}`}>
                <Reveal>
                  <h2
                    id={`cat-${category}`}
                    className="font-display text-2xl text-lube-ink md:text-3xl"
                  >
                    {SPECIALTY_CATEGORY_LABELS[category]}
                  </h2>
                </Reveal>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, index) => {
                    const img = getServiceImage(item.slug);
                    return (
                      <Reveal key={item.slug} delay={index * 0.03}>
                        <Link
                          href={`/especialidades/${item.slug}`}
                          className="lube-card lube-card-interactive group block h-full overflow-hidden"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover transition duration-500 group-hover:scale-[1.03]"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lube-foam via-transparent to-white/25"
                            />
                          </div>
                          <div className="relative p-5">
                            <h3 className="font-display text-xl text-lube-ink">
                              {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-lube-ink-soft">
                              {item.summary}
                            </p>
                            <p className="mt-4 text-sm font-bold text-lube-teal">
                              Saiba mais →
                            </p>
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <SectionEdge fillClassName="text-lube-footer" />
      </section>
    </main>
  );
}
