import type { Metadata } from "next";
import Image from "next/image";
import { TeamSection } from "@/components/sections/TeamSection";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import {
  MissionIcon,
  ValuesIcon,
  VisionIcon,
} from "@/components/ui/PurposeIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { getSite } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "História da Casa LuBe — clínica de terapias para transtornos do neurodesenvolvimento.",
};

export default function SobrePage() {
  const site = getSite();

  const purpose = [
    {
      title: "Missão",
      body: site.mission,
      icon: MissionIcon,
      tone: "bg-lube-coral/15 text-lube-coral",
    },
    {
      title: "Visão",
      body: site.vision,
      icon: VisionIcon,
      tone: "bg-lube-sky/25 text-lube-teal",
    },
    {
      title: "Valores",
      body: site.values,
      icon: ValuesIcon,
      tone: "bg-lube-sun/25 text-[#c4891f]",
    },
  ] as const;

  return (
    <main>
      <PageHero
        eyebrow="Quem somos"
        title="Conheça nossa história"
        description={site.about}
        toys="quem-somos"
      />

      <section className="relative -mt-1.5 overflow-hidden bg-lube-mist py-16 pb-20 md:py-24 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-1 z-[1] h-3 bg-lube-mist"
        />
        <div className="lube-shell grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-lube-ink/8 shadow-[var(--shadow-soft)]">
                <Image
                  src={SITE_IMAGES.fachada.src}
                  alt={SITE_IMAGES.fachada.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-lube-ink/8">
                  <Image
                    src={SITE_IMAGES.recepcao.src}
                    alt={SITE_IMAGES.recepcao.alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-lube-ink/8">
                  <Image
                    src={SITE_IMAGES.salaLudica.src}
                    alt={SITE_IMAGES.salaLudica.alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl text-lube-ink md:text-4xl">
              Casa LuBe: lúdico e bem-estar
            </h2>
            <p className="mt-4 leading-relaxed text-lube-ink-soft">
              Nascemos da necessidade de um espaço especializado e acolhedor
              para crianças e adolescentes com atrasos no desenvolvimento
              infantil. Com infraestrutura moderna e equipe multidisciplinar,
              transformamos cuidado em presença cotidiana.
            </p>
            <p className="mt-4 leading-relaxed text-lube-ink-soft">
              Empresa do grupo {site.brand.group}, com direção clínica liderada
              por profissionais dedicados às famílias atípicas.
            </p>
            <div id="proposito" className="mt-8 scroll-mt-28 space-y-4">
              {purpose.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="lube-card p-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="lube-eyebrow mt-0!">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-lube-ink-soft">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/especialidades">Conhecer nossos serviços</Button>
              <Button href="/contato" variant="secondary">
                Falar conosco
              </Button>
            </div>
          </Reveal>
        </div>
        <SectionEdge flip variant="soft" fillClassName="text-lube-mist" />
      </section>

      <TeamSection wash edgeToFooter />
    </main>
  );
}
