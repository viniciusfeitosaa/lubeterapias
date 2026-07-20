import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEspecialidades } from "@/lib/content";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Conheça os serviços e terapias da Casa LuBe para o desenvolvimento infantil.",
};

export default function EspecialidadesPage() {
  const items = getEspecialidades();

  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title="Conheça nossos serviços"
            description="Uma rede de cuidados multidisciplinares para cada necessidade."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.03}>
              <Link
                href={`/especialidades/${item.slug}`}
                className="block h-full rounded-2xl bg-lube-foam p-6 ring-1 ring-lube-ink/8 transition hover:-translate-y-1 hover:shadow-lg hover:ring-lube-teal/30"
              >
                <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-lube-ink">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-lube-ink/70">
                  {item.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
