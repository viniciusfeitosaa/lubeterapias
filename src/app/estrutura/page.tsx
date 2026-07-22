import type { Metadata } from "next";
import { RoomPhotoSlideshow } from "@/components/estrutura/RoomPhotoSlideshow";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { getSalas } from "@/lib/content";
import { getRoomImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Estrutura",
  description:
    "Conheça os ambientes da Casa LuBe pensados para o desenvolvimento e bem-estar infantil.",
};

export default function EstruturaPage() {
  const salas = getSalas();

  return (
    <main>
      <PageHero
        eyebrow="Nossa estrutura"
        title="Ambientes pensados para o desenvolvimento e bem-estar de cada criança"
        description="Em cada cantinho da Casa LuBe, carinho, segurança e ludicidade se unem em um atendimento acolhedor."
        toys="estrutura"
      />

      <section className="relative -mt-1.5 overflow-hidden bg-lube-mist py-14 pb-20 md:py-20 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-mist"
        />
        <div className="lube-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {salas.map((sala, index) => {
            const images = getRoomImages(sala.slug);
            return (
              <Reveal key={sala.slug} delay={index * 0.04}>
                <article className="lube-card h-full overflow-hidden">
                  <RoomPhotoSlideshow images={images} title={sala.title} />
                  <div className="p-5">
                    <p className="lube-eyebrow text-[0.7rem]">{sala.specialty}</p>
                    <h2 className="mt-2 font-display text-xl text-lube-ink">
                      {sala.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-lube-ink-soft">
                      {sala.summary}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <SectionEdge fillClassName="text-lube-footer" />
      </section>
    </main>
  );
}
