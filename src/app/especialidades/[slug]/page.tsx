import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import {
  getEspecialidade,
  getEspecialidades,
  getSite,
  SPECIALTY_CATEGORY_LABELS,
} from "@/lib/content";
import { getServiceImage } from "@/lib/images";
import { whatsappHref } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getEspecialidades().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getEspecialidade(slug);
  if (!item) return { title: "Serviço" };
  return { title: item.title, description: item.summary };
}

export default async function EspecialidadePage({ params }: Props) {
  const { slug } = await params;
  const item = getEspecialidade(slug);
  if (!item) notFound();

  const site = getSite();
  const img = getServiceImage(item.slug);
  const wa = whatsappHref(
    site.units[0].whatsapp,
    `Olá! Vim do site e gostaria de saber mais sobre ${item.title} na Casa LuBe.`,
  );

  return (
    <main>
      <PageHero
        eyebrow={SPECIALTY_CATEGORY_LABELS[item.category]}
        title={item.title}
        description={item.summary}
        backHref="/especialidades"
        backLabel="Todos os serviços"
        toys="especialidades"
      />

      <section className="lube-shell max-w-3xl space-y-6 py-14 md:py-20">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-lube-ink/8 shadow-[var(--shadow-soft)]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <div className="lube-card p-6 md:p-8">
          <p className="leading-relaxed text-lube-ink-soft">
            Na Casa LuBe, cada atendimento é personalizado pela nossa equipe
            multidisciplinar, em ambientes lúdicos e seguros. Fale conosco para
            entender o melhor caminho para sua família.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={wa} external variant="wa">
              Falar no WhatsApp
            </Button>
            <Button href="/contato" variant="secondary">
              Ir para contato
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
