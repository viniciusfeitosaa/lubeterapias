# Toy Props System — Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema reutilizável de props 3D (WebP) com hover/toque, catálogo JSON e integração home + páginas internas.

**Architecture:** Assets em `public/images/toys/`; catálogo `content/toys.json`; `ToyProp` (motion) + `SectionToys` (composição por seção); slots CSS nomeados.

**Tech Stack:** Next.js Image, Framer Motion, Tailwind v4, JSON content.

## Global Constraints

- Sem Spline/Three.js no v1
- Sem mascotes/rosto
- Paleta LuBe (sky/teal/leaf/sun/coral)
- Mobile: máx. 1–2 props por página; motion mais leve
- `prefers-reduced-motion` = estático
- Props decorativos: `aria-hidden`, `alt=""`
- Não cobrir CTAs/headline
- Não commitar a menos que o usuário peça

---

### Task 1: Gerar kit de 8 assets

**Files:**
- Create: `public/images/toys/blocos.webp` (ou `.png` se WebP indisponível no gerador)
- Create: `public/images/toys/bolinha.webp`
- Create: `public/images/toys/encaixe.webp`
- Create: `public/images/toys/giz.webp`
- Create: `public/images/toys/livro.webp`
- Create: `public/images/toys/chocalho.webp`
- Create: `public/images/toys/nuvem.webp`
- Create: `public/images/toys/casinha.webp`

- [ ] **Step 1:** Gerar cada render (toy-gloss, fundo transparente ou mist `#eef6f9`, sem personagem)
- [ ] **Step 2:** Confirmar arquivos em `public/images/toys/`
- [ ] **Step 3:** Converter para WebP se necessário (`npx sharp-cli` ou script local)

---

### Task 2: Catálogo + helpers

**Files:**
- Create: `content/toys.json`
- Create: `src/lib/toys.ts`

**Interfaces:**
- Produces: `ToyId`, `ToySize`, `ToyPlacement`, `getToy(id)`, `getSectionToys(section, viewport)`

- [ ] **Step 1:** Criar `content/toys.json` com `props`, `placements` (classNames), `sections` (hero, especialidades-preview, blog-teaser, especialidades, blog, contato) com `desktop`/`mobile`
- [ ] **Step 2:** Criar `src/lib/toys.ts` tipado importando o JSON
- [ ] **Step 3:** Verificar TypeScript: `npx tsc --noEmit` (ou build parcial)

---

### Task 3: `ToyProp` + placements CSS

**Files:**
- Create: `src/components/toys/ToyProp.tsx`
- Create: `src/components/toys/SectionToys.tsx`
- Modify: `src/app/globals.css` (classes `.toy-slot-*`)

**Interfaces:**
- Consumes: `getToy`, placements do JSON
- Produces: `<ToyProp id placement size? interactive? />`, `<SectionToys section />`

- [ ] **Step 1:** CSS dos slots (`hero-left`, `hero-right`, `section-tr`, `section-bl`, `section-edge`)
- [ ] **Step 2:** `ToyProp` com Image + motion idle + tilt hover/touch + reduced motion
- [ ] **Step 3:** `SectionToys` com media query client-side (`matchMedia('(min-width: 768px)')`) escolhendo desktop vs mobile do JSON
- [ ] **Step 4:** Smoke visual no browser

---

### Task 4: Integrar home

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/sections/SpecialtiesPreview.tsx`
- Modify: `src/components/sections/BlogTeaser.tsx`

- [ ] **Step 1:** Hero: `relative` + `<SectionToys section="hero" />`
- [ ] **Step 2:** SpecialtiesPreview + BlogTeaser: wrapper `relative overflow-hidden` + SectionToys
- [ ] **Step 3:** Conferir que CTAs do hero não ficam cobertos

---

### Task 5: Integrar páginas internas

**Files:**
- Modify: `src/app/especialidades/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/contato/page.tsx`

- [ ] **Step 1:** Inserir SectionToys nas seções hero/conteúdo de cada página
- [ ] **Step 2:** Mobile ≤2 props totais por página (via JSON)
- [ ] **Step 3:** Verificar `/especialidades`, `/blog`, `/contato`

---

### Task 6: Polimento

- [ ] **Step 1:** Ajustar tamanhos/offsets se overlap
- [ ] **Step 2:** Confirmar reduced-motion (DevTools)
- [ ] **Step 3:** Atualizar status da spec para implementado

---

## Spec coverage

| Spec | Task |
|------|------|
| 8 props WebP | 1 |
| toys.json + API | 2–3 |
| Hover/touch + idle + reduced motion | 3 |
| Mobile 1–2 | 2, 5 |
| Home + internas | 4–5 |
| Sem WebGL | global |
