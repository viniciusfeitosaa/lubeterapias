import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSalas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Estrutura",
  description:
    "Conheça os ambientes da Casa LuBe pensados para o desenvolvimento e bem-estar infantil.",
};

export default function EstruturaPage() {
  const salas = getSalas();

  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Nossa estrutura"
            title="Ambientes pensados para o desenvolvimento e bem-estar de cada criança"
            description="Em cada cantinho da Casa LuBe, carinho, segurança e ludicidade se unem em um atendimento acolhedor."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {salas.map((sala, index) => (
            <Reveal key={sala.slug} delay={index * 0.04}>
              <article className="h-full rounded-2xl bg-lube-foam p-6 ring-1 ring-lube-ink/8">
                <p className="text-xs font-semibold tracking-wide text-lube-teal uppercase">
                  {sala.specialty}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-fraunces)] text-xl text-lube-ink">
                  {sala.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-lube-ink/70">
                  {sala.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
