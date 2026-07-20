# Migração de conteúdo — Casa LuBe

**Data:** 2026-07-20  
**Origem:** lubeterapia.com.br (WordPress legado — apenas leitura)  
**Destino:** Next.js neste repositório (MDX/JSON)

## Assets exportados

- `public/brand/logo.png`
- `public/brand/logo-borda-branca.png`
- `public/images/hero-home.png`
- `public/images/bg-home.png`
- `public/images/sobre-casa.jpg`

## Conteúdo estruturado

- `content/site.json` — marca, missão/visão/valores, unidades
- `content/especialidades.json` — 13 especialidades (Judô com copy corrigida)
- `content/salas.json` — salas da estrutura

## Contato

A página Contato do site antigo estava comprometida (spam). **Não migrada.** Reconstruída em `/contato`.

## Cutover (após Next.js estável)

- [ ] DNS A/CNAME → Vercel
- [ ] Redirects 301 ativos (`/sobre-nos` → `/sobre`, etc.)
- [ ] GTM/GA4 no Next.js (sem Site Kit WP)
- [ ] Validar Contato, WhatsApp, mapas
- [ ] Cancelar hosting WordPress / Elementor / plugins
- [ ] Revogar acessos admin do WP antigo
