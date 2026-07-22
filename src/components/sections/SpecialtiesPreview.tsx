import Image from "next/image";
import Link from "next/link";
import { SectionToys } from "@/components/toys/SectionToys";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEspecialidades } from "@/lib/content";
import { getServiceImage } from "@/lib/images";

export function SpecialtiesPreview() {
  const items = getEspecialidades()
    .filter((item) => item.category === "especialidades")
    .slice(0, 6);

  return (
    <section className="relative -mt-1.5 overflow-hidden bg-lube-foam py-20 pb-24 md:py-28 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-foam"
      />
      <SectionToys section="especialidades-preview" />
      <div className="lube-shell pointer-events-none relative z-10">
        <div className="pointer-events-auto">
        <Reveal>
          <SectionHeading
            eyebrow="Especialidades"
            title="Cuidado multidisciplinar em um só lugar"
            description="Conheça os caminhos terapêuticos que acolhem cada fase do desenvolvimento."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const img = getServiceImage(item.slug);
            return (
              <Reveal key={item.slug} delay={index * 0.04}>
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
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lube-foam via-transparent to-white/20"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-lube-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-lube-ink-soft">
                      {item.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/especialidades"
            className="font-bold text-lube-teal underline-offset-4 hover:underline"
          >
            Ver todos os serviços →
          </Link>
        </div>
        </div>
      </div>
      <SectionEdge flip fillClassName="text-lube-mist" />
    </section>
  );
}
