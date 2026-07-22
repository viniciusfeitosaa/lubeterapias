import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="LGPD"
        title="Política de Privacidade"
        description="A Casa LuBe respeita a privacidade dos visitantes e está comprometida com a Lei Geral de Proteção de Dados."
        toys="privacidade"
      />
      <section className="lube-shell max-w-3xl space-y-4 py-14 md:py-20">
        <div className="lube-card space-y-4 p-6 md:p-8 text-lube-ink-soft leading-relaxed">
          <p>
            Coletamos apenas dados necessários para atendimento e melhoria da
            experiência no site.
          </p>
          <p>
            Cookies de análise são utilizados somente com consentimento. Para
            exercer direitos de acesso, correção ou exclusão de dados, entre em
            contato pelos canais oficiais da clínica.
          </p>
          <p>
            O texto jurídico completo será publicado nesta página antes do
            go-live.
          </p>
          <div className="pt-2">
            <Button href="/contato" variant="secondary">
              Falar sobre privacidade
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
