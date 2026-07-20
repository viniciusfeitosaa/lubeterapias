# Casa LuBe — Plano de Implementação da Repaginação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir o site da Casa LuBe (lubeterapia.com.br) em Next.js com design inovador, itens 3D, animações e conversão via WhatsApp — **sem WordPress**. Conteúdo útil do site antigo é exportado uma vez para MDX/JSON.

**Architecture:** Next.js App Router + TypeScript + Tailwind (tokens de marca) + Framer Motion/GSAP + React Three Fiber. Conteúdo 100% no repo (MDX/JSON) ou CMS moderno opcional depois. Contato e Unidades do zero. Redirects 301 preservam SEO das URLs antigas. Após go-live, WordPress é descomissionado.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, `@react-three/fiber`, `@react-three/drei`, MDX, Vercel. **Não usar:** WordPress, Elementor, plugins WP.

**Spec de referência:** `docs/superpowers/specs/2026-07-20-lube-repaginacao-design.md`

## Global Constraints

- Idioma da UI e copy: **pt-BR**
- Marca dominante: **Casa LuBe** (nunca subordinar a headline à marca no hero)
- Paleta oficial: `--lube-sky #7EC8E3`, `--lube-teal #2A9D8F`, `--lube-leaf #8FBF6A`, `--lube-sun #F4C95D`, `--lube-coral #F28482`, `--lube-ink #1E3A4C`, `--lube-mist #F0F7FA`
- Tipografia: display/marca **Baloo 2**, headlines **Fraunces**, corpo **Nunito Sans** — nunca Inter/Roboto/Arial como stack principal
- Hero: full-bleed; sem cards; sem overlays flutuantes; sem stats no first viewport
- CTA primário: WhatsApp (`5585991536550` Fortaleza, `5585992519181` Eusébio)
- Respeitar `prefers-reduced-motion`
- Página Contato antiga está **comprometida** — não migrar HTML; reconstruir no Next.js
- **Stack sem WordPress:** nenhum plugin, tema, REST WP ou headless WP
- Não redesenhar o logo nesta fase — reutilizar assets oficiais exportados do site antigo

---

## File Structure (alvo)

```
/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts          # ou @theme no CSS v4
├── tsconfig.json
├── public/
│   ├── brand/                  # logo, favicon
│   ├── images/                 # fotos clínica, hero
│   └── models/                 # *.glb otimizados
├── content/
│   ├── especialidades/*.mdx
│   ├── salas/*.mdx
│   └── site.json               # contatos, unidades, redes
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── sobre/page.tsx
│   │   ├── estrutura/page.tsx
│   │   ├── especialidades/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── unidades/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── blog/
│   │   ├── politica-de-privacidade/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── brand/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── three/
│   │   └── ui/
│   └── lib/
│       ├── whatsapp.ts
│       ├── seo.ts
│       └── content.ts
└── docs/superpowers/...
```

---

### Task 0: Exportação única do site antigo + prep de descomissionamento

**Files:**
- Create: `docs/ops/migracao-conteudo.md`
- Create: `public/brand/` (logo, favicon baixados)
- Create: `content/_raw/` (textos brutos exportados; depois limpos em MDX)

**Interfaces:**
- Consumes: site antigo apenas como leitura/download
- Produces: inventário de copy + assets no repo; checklist para desligar WP no go-live

- [ ] **Step 1: Exportar assets de marca**

Baixar do site antigo (ou pasta da clínica) e salvar em `public/brand/`:
- Logo colorido e versão com borda branca
- Favicon / apple-touch-icon
- Fotos do hero, sobre e salas (WebP quando possível)

- [ ] **Step 2: Extrair copy útil (sem Contato)**

Registrar em `docs/ops/migracao-conteudo.md` e/ou `content/_raw/`:
- Textos da home, sobre, missão/visão/valores
- 13 especialidades (corrigir copy do Judô na hora da limpeza)
- Salas da estrutura + link do vídeo de tour
- Dados das 2 unidades (endereços, WhatsApp, horários)
- Posts do blog que valem a pena migrar (lista + Markdown)

**Não** copiar HTML/JS/CSS do Contato comprometido.

- [ ] **Step 3: Checklist de desligamento do WP (executar só no go-live)**

Incluir em `docs/ops/migracao-conteudo.md`:

```markdown
## Cutover (após Next.js estável)
- [ ] DNS A/CNAME → Vercel
- [ ] Redirects 301 ativos (sobre-nos → /sobre, etc.)
- [ ] GTM/GA4 no Next.js (sem Site Kit WP)
- [ ] Validar Contato, WhatsApp, mapas
- [ ] Cancelar hosting WordPress / Elementor / plugins
- [ ] Revogar acessos admin do WP antigo
```

- [ ] **Step 4: Commit do inventário**

```bash
git add docs/ops/migracao-conteudo.md public/brand content/_raw
git commit -m "docs: inventário de migração sem dependência de WordPress"
```

---

### Task 1: Scaffold Next.js + design tokens

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `content/site.json`
- Modify: `README.md`

**Interfaces:**
- Consumes: spec de paleta/tipografia
- Produces: app rodando em `localhost:3000` com tokens CSS

- [ ] **Step 1: Criar projeto**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

Se o diretório não estiver vazio, scaffold em subpasta `web/` e ajustar paths do plano para `web/src/...`.

- [ ] **Step 2: Definir tokens em `src/app/globals.css`**

```css
@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Nunito+Sans:wght@400;600;700&display=swap");

:root {
  --lube-sky: #7EC8E3;
  --lube-teal: #2A9D8F;
  --lube-leaf: #8FBF6A;
  --lube-sun: #F4C95D;
  --lube-coral: #F28482;
  --lube-ink: #1E3A4C;
  --lube-mist: #F0F7FA;
  --lube-foam: #FFFFFF;
  --font-brand: "Baloo 2", system-ui, sans-serif;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Nunito Sans", system-ui, sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--lube-ink);
  background: var(--lube-mist);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Criar `content/site.json`**

```json
{
  "brand": {
    "name": "Casa LuBe",
    "tagline": "Espaço lúdico e de bem-estar",
    "legalName": "Lube Terapia",
    "group": "Coaph",
    "instagram": "https://www.instagram.com/lubeterapias/",
    "facebook": "https://www.facebook.com/profile.php?id=61554156766468"
  },
  "units": [
    {
      "id": "fortaleza",
      "city": "Fortaleza",
      "phoneDisplay": "(85) 99153-6550",
      "whatsapp": "5585991536550",
      "address": "Rua Marcondes Pereira, 931 — Joaquim Távora, Fortaleza-CE",
      "hours": "Seg–Sex 8h–18h",
      "mapsUrl": "https://maps.app.goo.gl/zv32Cqo7BbiTHdpV6"
    },
    {
      "id": "eusebio",
      "city": "Eusébio",
      "phoneDisplay": "(85) 99251-9181",
      "whatsapp": "5585992519181",
      "address": "Av. Eusébio de Queiroz, 1890 — Tamatanduba, Eusébio-CE",
      "hours": "Seg–Sex 8h–18h",
      "mapsUrl": "https://maps.app.goo.gl/zv32Cqo7BbiTHdpV6"
    }
  ]
}
```

- [ ] **Step 4: Helper WhatsApp `src/lib/whatsapp.ts`**

```ts
export function whatsappHref(phone: string, text?: string) {
  const base = `https://api.whatsapp.com/send?phone=${phone}`;
  if (!text) return base;
  return `${base}&text=${encodeURIComponent(text)}`;
}

export const DEFAULT_WA_TEXT =
  "Olá! Vim do site e gostaria de tirar dúvidas sobre a Casa LuBe.";
```

- [ ] **Step 5: Placeholder home e commit**

```tsx
// src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1 style={{ fontFamily: "var(--font-brand)" }}>Casa LuBe</h1>
      <p>Espaço lúdico e de bem-estar</p>
    </main>
  );
}
```

```bash
npm run dev
# Esperado: página com Casa LuBe em Baloo 2
git add -A && git commit -m "feat: scaffold Next.js com tokens da marca Casa LuBe"
```

---

### Task 2: Layout shell — Header, Footer, navegação

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `MobileNav.tsx`
- Create: `src/components/brand/Logo.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `content/site.json`, `whatsappHref`
- Produces: navegação Início | Sobre | Estrutura | Especialidades | Unidades | Contato | Blog

- [ ] **Step 1: Implementar `Logo.tsx`** reusando PNG oficial (`LOGO-BORDA-BRANCA` / versão colorida para fundos claros) com `next/image` e `alt="Casa LuBe"`.

- [ ] **Step 2: Header sticky translúcido** — logo à esquerda, nav desktop, CTA WhatsApp à direita; burger no mobile. Sem search no header (mover para blog se necessário).

- [ ] **Step 3: Footer** — logo, links rápidos, blocos Fortaleza/Eusébio, redes, link política de privacidade.

- [ ] **Step 4: Wire no `layout.tsx` + smoke test mobile/desktop**

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: header e footer institucionais Casa LuBe"
```

---

### Task 3: Home — Hero full-bleed (ainda sem 3D)

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Reveal.tsx`
- Modify: `src/app/page.tsx`
- Add: `public/images/hero-casa-lube.webp` (exportar de HOME.png / foto real)

**Interfaces:**
- Consumes: tokens, `whatsappHref`
- Produces: first viewport válido segundo regras de brand

- [ ] **Step 1: Composição do hero**

Estrutura obrigatória:

```tsx
<section className="relative min-h-[100svh] overflow-hidden">
  {/* fundo full-bleed: imagem ou vídeo curto */}
  <div className="absolute inset-0 -z-10">{/* Image fill */}</div>
  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--lube-ink)]/50 to-transparent" />
  <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32">
    <p className="font-[family-name:var(--font-brand)] text-5xl text-white md:text-7xl">
      Casa LuBe
    </p>
    <h1 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-2xl text-white md:text-4xl">
      Espaço lúdico e de bem-estar para o desenvolvimento infantil
    </h1>
    <p className="mt-4 max-w-lg text-white/90">
      Ambiente amoroso e equipe multidisciplinar para crianças com transtornos do neurodesenvolvimento.
    </p>
    <div className="mt-8 flex flex-wrap gap-4">
      {/* CTA WhatsApp + Conhecer estrutura */}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Motion de entrada** (Framer Motion) — marca, headline, CTAs em cascade; respeitar reduced-motion.

- [ ] **Step 3: QA visual** — brand test (sem nav, ainda é Lube); mobile 375px; sem cards/overlays.

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: hero full-bleed da home Casa LuBe"
```

---

### Task 4: Home — demais seções 2D

**Files:**
- Create: `AboutTeaser.tsx`, `SpecialtiesPreview.tsx`, `MissionVisionValues.tsx`, `StructureTeaser.tsx`, `UnitsSection.tsx`, `InstagramTeaser.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: content MDX/JSON (stubs ok)
- Produces: home completa navegável sem 3D

- [ ] **Step 1: Sobre** — uma foto real + 1 parágrafo + link `/sobre`
- [ ] **Step 2: Especialidades preview** — horizontal scroll de 6 itens com link para índice
- [ ] **Step 3: MVV** — 3 colunas leves (sem SVG gigante)
- [ ] **Step 4: Teaser estrutura** — frame + CTA `/estrutura`
- [ ] **Step 5: Unidades** — dois blocos com WhatsApp/mapa
- [ ] **Step 6: Instagram** — grid estático de 6 imagens curadas (API depois)
- [ ] **Step 7: Scroll reveals + commit**

```bash
git commit -m "feat: seções da home Casa LuBe (2D)"
```

---

### Task 5: Conteúdo — especialidades e salas

**Files:**
- Create: `content/especialidades/*.mdx` (13), `content/salas/*.mdx`, `src/lib/content.ts`
- Create: páginas `especialidades/page.tsx`, `especialidades/[slug]/page.tsx`, `estrutura/page.tsx`, `sobre/page.tsx`

**Interfaces:**
- Consumes: content MDX/JSON (stubs ok) exportado na Task 0
- Produces: `getEspecialidades()`, `getEspecialidade(slug)`, `getSalas()`

Lista de slugs a migrar:

```
psicomotricidade, neuropediatria, pediatra, psicoterapia-para-pais,
natacao, funcional-kids, fonoaudiologia, estimulacao-precoce,
musicoterapia, terapia-aba, terapia-ocupacional-infantil, nutricao, judo
```

- [ ] **Step 1: Limpar copy de `content/_raw/`** e corrigir o texto errado de Judô (no site antigo copia nutrição).
- [ ] **Step 2: Schema frontmatter MDX**

```md
---
title: Terapia ABA
slug: terapia-aba
summary: Técnicas comportamentais para habilidades sociais, comunicação e aprendizado.
icon: aba
---
```

- [ ] **Step 3: Páginas índice + detalhe + Sobre + Estrutura (lista de salas)**
- [ ] **Step 4: Commit**

```bash
git commit -m "feat: migrar conteúdo de especialidades, sobre e estrutura"
```

---

### Task 6: Camada 3D — infraestrutura + Hero

**Files:**
- Create: `src/components/three/LubeCanvas.tsx`, `HeroScene.tsx`, `Safe3D.tsx`
- Add: `public/models/casa-blocos.glb` (otimizado)
- Modify: `Hero.tsx`

**Interfaces:**
- Consumes: glTF, `Safe3D` decide WebGL vs fallback
- Produces: hero com 3D idle + fallback WebP

- [ ] **Step 1: Instalar deps**

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

- [ ] **Step 2: `Safe3D`** — só monta Canvas se: `!prefers-reduced-motion`, WebGL disponível, e (mobile → IntersectionObserver + pause fora da tela).

```tsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Canvas = dynamic(() => import("./LubeCanvas"), { ssr: false });

export function Safe3D({ fallback, children }: { fallback: React.ReactNode; children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setOk(!reduce && !!gl);
  }, []);
  if (!ok) return <>{fallback}</>;
  return <Canvas>{children}</Canvas>;
}
```

- [ ] **Step 3: Cena hero** — mesh leve, rotação Y lenta, parallax mouse desktop only.
- [ ] **Step 4: Medir LCP mobile** — se > 2.5s, adiar 3D até idle (`requestIdleCallback`) ou mostrar só fallback no mobile.
- [ ] **Step 5: Commit**

```bash
git commit -m "feat: hero 3D com fallback acessível"
```

---

### Task 7: 3D nas especialidades + estrutura

**Files:**
- Create: `SpecialtyIcon3D.tsx`, `RoomPortal.tsx`
- Add: models leves por especialidade (ou atlas de um único GLB com nodes)
- Modify: preview e páginas de especialidade/estrutura

- [ ] **Step 1: Ícones 3D lazy** — carregar modelo só quando card entra no viewport.
- [ ] **Step 2: Hover tilt** (desktop) via `useMotionValue` / R3F.
- [ ] **Step 3: Estrutura** — seletor de salas troca cena ou imagem com crossfade.
- [ ] **Step 4: Commit**

```bash
git commit -m "feat: ícones 3D em especialidades e tour de estrutura"
```

---

### Task 8: Contato + Unidades limpos

**Files:**
- Create: `src/app/contato/page.tsx`, `src/app/unidades/page.tsx`, `src/app/contato/actions.ts`
- Create: `src/components/sections/ContactForm.tsx`

**Interfaces:**
- Consumes: `site.json`, Server Action
- Produces: formulário funcional + links WhatsApp + mapas

- [ ] **Step 1: Página Contato** — escrita do zero no Next.js (não reutilizar HTML do site antigo).
- [ ] **Step 2: Form** — nome, telefone, unidade de interesse, mensagem; honeypot; Server Action envia email ou abre WhatsApp com texto pré-preenchido.
- [ ] **Step 3: Unidades** — duas LocalBusiness cards + embeds de mapa.
- [ ] **Step 4: Commit**

```bash
git commit -m "feat: páginas Contato e Unidades reconstruídas"
```

---

### Task 9: Blog, SEO, redirects, LGPD, go-live

**Files:**
- Create: `src/app/blog/...`, `src/app/robots.ts`, `src/app/sitemap.ts`, `next.config.ts` redirects
- Create: `src/components/ConsentBanner.tsx`
- Create: `src/app/politica-de-privacidade/page.tsx`

- [ ] **Step 1: Migrar posts do blog** de `content/_raw/` → MDX em `content/blog/` (não manter link para blog WordPress).
- [ ] **Step 2: Redirects em `next.config.ts`**

```ts
async redirects() {
  return [
    { source: "/sobre-nos", destination: "/sobre", permanent: true },
    { source: "/sobre-nos/", destination: "/sobre", permanent: true },
    { source: "/home", destination: "/", permanent: true },
    { source: "/home/", destination: "/", permanent: true },
  ];
}
```

- [ ] **Step 3: Metadata + JSON-LD** Organization/LocalBusiness nas duas unidades.
- [ ] **Step 4: Consent banner** antes de GTM/analytics.
- [ ] **Step 5: QA** — Lighthouse, axe, iPhone Safari, Android Chrome, reduced-motion.
- [ ] **Step 6: Deploy Vercel + DNS cutover + monitorar 404s**
- [ ] **Step 7: Commit final**

```bash
git commit -m "feat: SEO, redirects, LGPD e preparo de go-live"
```

---

## Ordem de execução sugerida

```
Task 0 (exportação única)  →  em paralelo com Task 1–2
Task 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 (cutover + desligar WP)
```

Não iniciar Task 6 (3D) antes do hero 2D estar aprovado visualmente.

---

## Self-review do plano

| Requisito da spec | Task |
|-------------------|------|
| Brand-first hero full-bleed | Task 3 |
| Tokens / tipografia | Task 1 |
| Motion + reduced-motion | Tasks 3–4, 6 |
| 3D hero / especialidades / estrutura | Tasks 6–7 |
| Contato limpo | Task 0 + 8 |
| Duas unidades + WhatsApp | Tasks 2, 4, 8 |
| Especialidades + Sobre + Estrutura | Task 5 |
| SEO / redirects / LGPD | Task 9 |
| Performance mobile com 3D | Task 6 Steps 2–4 |
| Zero WordPress em produção | Task 0 checklist + Task 9 cutover |

Sem placeholders TBD nas tasks; decisões de stack e slugs estão explícitas. **WP fora do stack.**
