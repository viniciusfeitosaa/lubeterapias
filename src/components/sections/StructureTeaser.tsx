import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function StructureTeaser() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/hero-home.png"
              alt="Espaços lúdicos da Casa LuBe"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-[family-name:var(--font-baloo)] text-sm font-semibold tracking-wide text-lube-teal uppercase">
            Estrutura
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl text-lube-ink md:text-4xl">
            Ambientes pensados para brincar, cuidar e crescer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-lube-ink/75 md:text-lg">
            Salas nomeadas e espaços sensoriais preparados para cada terapia —
            da recepção ao Espaço Flutuar.
          </p>
          <div className="mt-8">
            <Button href="/estrutura">Fazer o tour</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
