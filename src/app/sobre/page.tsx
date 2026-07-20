import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "História da Casa LuBe — clínica de terapias para transtornos do neurodesenvolvimento.",
};

export default function SobrePage() {
  const site = getSite();

  return (
    <main>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#dff3f8,#f0f7fa_40%,#e7f6ea)]" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-6">
          <Reveal>
            <p className="font-[family-name:var(--font-baloo)] text-sm font-semibold tracking-wide text-lube-teal uppercase">
              Quem somos
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-lube-ink md:text-5xl">
              Conheça nossa história
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-lube-ink/80">
              {site.about}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 md:grid-cols-2 md:px-6 md:pb-28">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image
              src="/images/sobre-casa.jpg"
              alt="Equipe e ambiente da Casa LuBe"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-lube-ink">
            Casa LuBe: lúdico e bem-estar
          </h2>
          <p className="mt-4 leading-relaxed text-lube-ink/75">
            Nascemos da necessidade de um espaço especializado e acolhedor para
            crianças e adolescentes com atrasos no desenvolvimento infantil. Com
            infraestrutura moderna e equipe multidisciplinar, transformamos
            cuidado em presença cotidiana.
          </p>
          <p className="mt-4 leading-relaxed text-lube-ink/75">
            Empresa do grupo {site.brand.group}, com direção clínica liderada
            por profissionais dedicados às famílias atípicas.
          </p>
          <div className="mt-8">
            <Button href="/especialidades">Conhecer nossos serviços</Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
