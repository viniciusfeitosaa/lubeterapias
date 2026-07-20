import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacyPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl text-lube-ink">
          Política de Privacidade
        </h1>
        <p className="mt-6 leading-relaxed text-lube-ink/75">
          A Casa LuBe respeita a privacidade dos visitantes e está comprometida
          com a Lei Geral de Proteção de Dados (LGPD). Coletamos apenas dados
          necessários para atendimento e melhoria da experiência no site.
        </p>
        <p className="mt-4 leading-relaxed text-lube-ink/75">
          Cookies de análise são utilizados somente com consentimento. Para
          exercer direitos de acesso, correção ou exclusão de dados, entre em
          contato pelos canais oficiais da clínica.
        </p>
        <p className="mt-4 leading-relaxed text-lube-ink/75">
          Esta página será expandida com o texto jurídico completo antes do
          go-live.
        </p>
      </div>
    </main>
  );
}
