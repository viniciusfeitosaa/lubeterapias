# Casa LuBe — Repaginação do site

Repositório do projeto de **reestruturação e redesign** do site [lubeterapia.com.br](https://lubeterapia.com.br/) (Casa LuBe — clínica de terapias para transtornos do neurodesenvolvimento).

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Spec de design](docs/superpowers/specs/2026-07-20-lube-repaginacao-design.md) | Diagnóstico do site atual, direção visual, 3D, IA, stack e fases |
| [Plano de implementação](docs/superpowers/plans/2026-07-20-lube-repaginacao.md) | Tasks executáveis (Task 0–9) com arquivos, código e commits |

## Decisão técnica (resumo)

Rebuild em **Next.js** (não Elementor), com **React Three Fiber** para 3D, **Framer Motion/GSAP** para animações, conteúdo em MDX/JSON e cutover com redirects 301.

## Alerta

A página `/contato/` do WordPress atual aparece **comprometida** (conteúdo spam externo). O plano começa pela remediação urgente (Task 0).
