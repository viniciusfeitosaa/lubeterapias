# Casa LuBe — Site institucional

Rebuild do site [lubeterapia.com.br](https://lubeterapia.com.br/) em **Next.js** (sem WordPress).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Framer Motion
- Conteúdo em JSON (`content/`)
- Deploy alvo: Vercel

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servir build
- `npm run lint` — ESLint

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Spec de design](docs/superpowers/specs/2026-07-20-lube-repaginacao-design.md) | Direção visual, 3D, fases |
| [Plano de implementação](docs/superpowers/plans/2026-07-20-lube-repaginacao.md) | Tasks 0–9 |
| [Migração](docs/ops/migracao-conteudo.md) | Exportação e cutover |

## Rotas

- `/` Home
- `/sobre` Quem somos
- `/estrutura` Salas
- `/especialidades` e `/especialidades/[slug]`
- `/unidades` Fortaleza e Eusébio
- `/contato` (novo, sem legado WP)
- `/politica-de-privacidade`
