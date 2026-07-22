# Casa LuBe — Sistema de props 3D lúdicos (Toy Props)

**Data:** 2026-07-20  
**Status:** implementado (v1)  
**Escopo:** sistema reutilizável de elementos infantis em estilo render 3D (PNG/WebP), posicionados por página/seção, com interação no hover/toque.

---

## Contexto

A Casa LuBe usa direção **lúdico premium / toy-gloss** (sem mascotes cartoon). O site já tem Framer Motion, tokens de cor (sky/teal/leaf/sun/coral) e tipografia Baloo 2 / Fraunces / Nunito Sans.

Objetivo: espalhar **brinquedos e objetos terapêuticos estilizados em 3D** pela interface, como sistema reutilizável — não como decorações one-off no hero.

---

## Decisões fechadas

| Tema | Escolha |
|------|---------|
| Escopo | Sistema reutilizável em várias páginas |
| Comportamento | Interativo no hover/toque (tilt + scale); idle float suave |
| Assets | Renders gerados (estilo toy-gloss / 3D limpo), aprovados visualmente |
| Mobile | Menos props (1–2 por página) + motion mais leve |
| Stack 3D | **Não** usar Spline/Three.js no v1 |

---

## Abordagem técnica

**Kit de WebP + componente `ToyProp` + catálogo JSON.**

Descartado no v1:

- Canvas global único na `layout` (conflita com seções/scroll)
- Spline / React Three Fiber (peso e manutenção)

---

## Catálogo inicial (8 props)

| ID | Objeto | Papel semântico |
|----|--------|-----------------|
| `blocos` | Cubos soft empilhados | Brincar / construção |
| `bolinha` | Bolinha sensorial | Sensorial / TO |
| `encaixe` | Peça geométrica de encaixe | Coordenação / forma |
| `giz` | Giz ou pincel curto | Expressão / psicopedagogia |
| `livro` | Livrinho aberto | Linguagem / leitura |
| `chocalho` | Chocalho / instrumento mini | Ritmo / estímulo |
| `nuvem` | Nuvem soft (prop, não personagem) | Leveza / atmosfera |
| `casinha` | Casinha mini | Marca “Casa” LuBe |

**Estilo visual dos assets**

- Render 3D limpo, sombra suave, leve gloss (toy-gloss)
- Paleta alinhada aos tokens LuBe (sem arco-íris infantil genérico)
- Fundo transparente (WebP)
- Sem olhos/rosto/mascote
- Tamanho alvo: ~512–1024px no maior lado; export otimizado

Arquivos: `public/images/toys/{id}.webp` (+ opcional `@2x` depois, se necessário).

---

## API de componentes

### `ToyProp`

```tsx
<ToyProp
  id="blocos"
  placement="hero-left"
  className?={string}
  // overrides opcionais
  size?="sm" | "md" | "lg"
  interactive?={boolean} // default true no desktop
/>
```

Responsabilidades:

- Carregar asset do catálogo
- Aplicar posição via `placement` (classes CSS mapeadas)
- Idle float + rotação leve (Framer Motion)
- Hover/toque: tilt `rotateX`/`rotateY` + leve `scale`
- `prefers-reduced-motion`: sem animação idle; sem tilt (ou estático total)
- `aria-hidden` + `alt=""` (decorativo)
- `pointer-events` só no elemento do prop (não bloquear links/CTAs vizinhos)

### `SectionToys`

Atalho declarativo por seção:

```tsx
<SectionToys section="hero" />
<SectionToys section="especialidades" />
```

Lê `content/toys.json` → quais props/placements entram naquela seção, já filtrando mobile vs desktop.

---

## Posicionamento (slots)

Slots nomeados (não coordenadas mágicas espalhadas no JSX):

| Slot | Uso típico |
|------|------------|
| `hero-left` | Lateral/baixo do hero, atrás ou ao lado do texto |
| `hero-right` | Lateral direita do hero (prédio nítido — prop menor) |
| `section-tr` | Canto superior direito de uma seção |
| `section-bl` | Canto inferior esquerdo |
| `section-edge` | Saindo levemente da borda (overflow controlado) |

Regras:

- Nunca cobrir headline, CTAs ou formulários (z-index abaixo do conteúdo textual quando overlap; ou offset seguro)
- Seção com `overflow` adequado para não “vazar” de forma feia no mobile
- Densidade desktop: tipicamente 2–4 props na home; 1–2 em páginas internas
- Densidade mobile: máx. 1–2 por página; preferir slots que não empurram layout

---

## Catálogo de dados — `content/toys.json`

Estrutura sugerida:

```json
{
  "props": [
    {
      "id": "blocos",
      "src": "/images/toys/blocos.webp",
      "width": 640,
      "height": 640,
      "defaultSize": "md"
    }
  ],
  "placements": {
    "hero-left": { "className": "..." },
    "hero-right": { "className": "..." }
  },
  "sections": {
    "hero": {
      "desktop": [
        { "id": "blocos", "placement": "hero-left", "size": "lg" },
        { "id": "nuvem", "placement": "hero-right", "size": "sm" }
      ],
      "mobile": [
        { "id": "blocos", "placement": "hero-left", "size": "sm" }
      ]
    },
    "especialidades": { "desktop": [...], "mobile": [...] },
    "blog": { "desktop": [...], "mobile": [] },
    "contato": { "desktop": [...], "mobile": [...] }
  }
}
```

Páginas-alvo do v1: **home (hero + 1–2 seções)**, **especialidades**, **blog** (teaser ou página), **contato** — sem saturar admin.

---

## Motion

| Estado | Desktop | Mobile | Reduced motion |
|--------|---------|--------|----------------|
| Idle | float Y + rotate Z leve, loop lento | amplitude menor / mais curto | off |
| Hover | tilt 3D + scale ~1.04 | — | off |
| Touch | tilt curto no tap (sem sticky) | tilt curto | off |

Implementação: Framer Motion (`useMotionValue` / `useSpring` no ponteiro, ou `whileHover` + `onPan` leve). Evitar listeners globais pesados.

---

## Arquivos a criar/alterar

| Caminho | Função |
|---------|--------|
| `public/images/toys/*.webp` | Assets |
| `content/toys.json` | Catálogo + seções |
| `src/lib/toys.ts` | Tipagem + helpers (`getSectionToys`) |
| `src/components/toys/ToyProp.tsx` | Prop individual |
| `src/components/toys/SectionToys.tsx` | Composição por seção |
| `src/components/toys/placements.ts` ou CSS em `globals.css` | Mapa de slots |
| Seções/páginas (Hero, Specialties, Blog, Contato…) | Montar `<SectionToys />` |

---

## Fora de escopo (v1)

- 3D WebGL / Spline
- Parallax profundo ligado ao scroll-world (já descartado no produto)
- Props no painel `/admin`
- Download de assets pelo usuário
- Sons ao interagir

---

## Critérios de sucesso

1. Home e pelo menos 2 páginas internas mostram props sem atrapalhar leitura/CTA  
2. Hover/toque responde de forma perceptível e suave  
3. Mobile com ≤2 props e sem jank óbvio  
4. `prefers-reduced-motion` respeitado  
5. Trocar/adicionar um prop = editar JSON + soltar WebP (sem refatorar seções)

---

## Plano de entrega (alto nível)

1. Gerar e otimizar kit de 8 WebPs  
2. Scaffold `toys.json` + `ToyProp` + `SectionToys`  
3. Integrar hero + 1 seção home  
4. Integrar páginas internas (especialidades, blog, contato)  
5. Passar de densidade mobile e reduced-motion  
6. Ajuste fino de slots após review visual

---

## Revisão da spec (self-review)

- Sem placeholders TBD críticos  
- Consistente com decisões A/B/C da conversa  
- Escopo v1 limitado (sem WebGL)  
- Ambiguidade restante: lista exata de quais 1–2 seções da home além do hero — default: **especialidades** + **blog teaser**
