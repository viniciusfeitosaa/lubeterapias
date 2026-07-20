# Casa LuBe — Repaginação do site

Repositório do projeto de **reestruturação e redesign** do site [lubeterapia.com.br](https://lubeterapia.com.br/) (Casa LuBe — clínica de terapias para transtornos do neurodesenvolvimento).

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Spec de design](docs/superpowers/specs/2026-07-20-lube-repaginacao-design.md) | Diagnóstico do site atual, direção visual, 3D, IA, stack e fases |
| [Plano de implementação](docs/superpowers/plans/2026-07-20-lube-repaginacao.md) | Tasks executáveis (Task 0–9) com arquivos, código e commits |

## Decisão técnica (confirmada)

**Abordagem C — Next.js puro.** Sem WordPress, Elementor ou plugins WP.

- 3D: React Three Fiber  
- Animações: Framer Motion / GSAP  
- Conteúdo: MDX/JSON no repo (CMS moderno opcional depois)  
- Go-live: Vercel + redirects 301 + descomissionar o WP antigo

## Conteúdo legado

O site WordPress atual é só **fonte de exportação** (textos/imagens). A página `/contato/` antiga está comprometida e **não** será migrada.
