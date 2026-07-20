import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getEspecialidade, getEspecialidades, getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getEspecialidades().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getEspecialidade(slug);
  if (!item) return { title: "Especialidade" };
  return { title: item.title, description: item.summary };
}

export default async function EspecialidadePage({ params }: Props) {
  const { slug } = await params;
  const item = getEspecialidade(slug);
  if (!item) notFound();

  const site = getSite();
  const wa = whatsappHref(
    site.units[0].whatsapp,
    `Olá! Vim do site e gostaria de saber mais sobre ${item.title} na Casa LuBe.`,
  );

  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Link
          href="/especialidades"
          className="text-sm font-semibold text-lube-teal hover:underline"
        >
          ← Todas as especialidades
        </Link>
        <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-4xl text-lube-ink md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-lube-ink/80">
          {item.summary}
        </p>
        <p className="mt-4 leading-relaxed text-lube-ink/70">
          Na Casa LuBe, cada atendimento é personalizado pela nossa equipe
          multidisciplinar, em ambientes lúdicos e seguros. Fale conosco para
          entender o melhor caminho para sua família.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={wa} external>
            Falar no WhatsApp
          </Button>
          <Button href="/contato" variant="ghost">
            Ir para contato
          </Button>
        </div>
      </div>
    </main>
  );
}
