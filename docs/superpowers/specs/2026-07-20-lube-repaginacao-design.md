# Spec de Design — Repaginação Casa LuBe

**Data:** 2026-07-20  
**Marca:** Casa LuBe (Lúdico e Bem-estar) — lubeterapia.com.br  
**Escopo:** Reestruturação completa do site institucional com design inovador, itens 3D e animações

---

## 1. Contexto atual (diagnóstico)

### Stack atual
- WordPress 7 + tema Hello Elementor + Elementor Pro
- Plugins: WP Rocket, Complianz GDPR, Joinchat (WhatsApp), Inavii (feed Instagram), Google Site Kit / GTM
- Fontes carregadas: Montserrat, Josefin Sans, Prompt, Poppins, DM Sans, Baloo 2, Nunito Sans

### Arquitetura de páginas atual
| Rota | Conteúdo |
|------|----------|
| `/` | Hero, Sobre, Missão/Visão/Valores, Instagram, Mapa |
| `/sobre-nos/` | História, equipe (Cinthya Viana), profissionais |
| `/estrutura/` | Tour em vídeo + salas nomeadas (Crescer, Flutuar, Acolher…) |
| `/especialidades/` | Grid de 13 especialidades + páginas internas |
| `/contato/` | **ALERTA: página comprometida / conteúdo spam externo** |
| `/blog/` | Conteúdo editorial |
| `/politica-de-privacidade/` | LGPD |

### Pontos fortes a preservar
- Identidade **Casa LuBe** (lúdico + bem-estar)
- CTA WhatsApp como conversão principal (`5585991536550` / `5585992519181`)
- Duas unidades: Fortaleza e Eusébio
- Conteúdo rico de especialidades e salas
- Feed Instagram `@lubeterapias`
- Grupo Coaph como contexto institucional

### Problemas a resolver
1. Layout Elementor genérico, hero com imagem inset, pouca hierarquia de marca
2. Hero e seções sobrecarregados / pouca respiração visual
3. Missão/Visão/Valores com ícones SVG pesados e pouco memoráveis
4. Página Contato comprometida (prioridade de segurança)
5. Performance prejudicada por dezenas de CSS/JS Elementor + plugins
6. Experiência pouco “viva” para uma clínica infantil lúdica
7. Tipografia inconsistente (muitas famílias sem sistema)

---

## 2. Objetivos de sucesso

1. **Primeira dobra memorável:** marca Casa LuBe como herói visual + 1 headline + 1 frase + 1 grupo de CTA + 1 plano visual dominante (foto ou 3D full-bleed).
2. **Sensação lúdica premium:** acolhedor, confiável e moderno — nunca “clínica fria” nem “infantil demais”.
3. **3D com propósito:** elementos 3D reforçam conceito (casa, bolhas, blocos sensoriais, ondas), não decoração vazia.
4. **Conversão:** WhatsApp e agendamento/visita sempre a 1 clique.
5. **Performance:** LCP < 2.5s no mobile; 3D com lazy-load e fallback estático.
6. **Acessibilidade:** contraste AA, `prefers-reduced-motion`, foco de teclado, textos claros.
7. **SEO:** manter URLs canônicas; meta e schema Organization + LocalBusiness (2 unidades).
8. **Segurança:** Contato reconstruído do zero, sem resquícios da página atual.

---

## 3. Abordagens avaliadas

### A — Redesign no Elementor + CSS/JS custom
- **Prós:** time atual já conhece WP; conteúdo no lugar.
- **Contras:** 3D/animações avançadas lutam contra o builder; performance continua frágil; design inovador limitado.
- **Veredito:** inadequado para o nível visual pedido.

### B — WordPress headless + Next.js
- **Prós:** CMS familiar para conteúdo (blog, especialidades); frontend livre.
- **Contras:** complexidade de sync, hosting dual, custo de manutenção.
- **Veredito:** bom se a equipe precisar editar blog com frequência no WP.

### C — Rebuild Next.js App Router + CMS leve (recomendado)
- **Prós:** controle total de design, 3D (React Three Fiber), animações (GSAP/Framer Motion), performance, tipografia e motion system; Contato limpo.
- **Contras:** migração de conteúdo; curva para editores (mitigada com Sanity/Decap ou MDX).
- **Veredito:** **recomendado** — melhor equilíbrio entre inovação visual e manutenção.

**Decisão desta spec:** Abordagem **C**.

---

## 4. Direção visual (brand system)

### Conceito
**“Uma casa viva de brincar e cuidar”** — atmosfera de luz natural, água, blocos e formas orgânicas suaves. O visitante sente o espaço físico da clínica antes de ler o texto.

### Paleta (CSS variables)
Evitar roxo genérico, glow neon e cream+terracota “AI default”.

```css
:root {
  --lube-sky: #7EC8E3;        /* azul claro brincalhão */
  --lube-teal: #2A9D8F;       /* teal clínico acolhedor */
  --lube-leaf: #8FBF6A;       /* verde crescimento */
  --lube-sun: #F4C95D;        /* amarelo suave (acento CTA secundário) */
  --lube-coral: #F28482;      /* calor humano (acentos pontuais) */
  --lube-ink: #1E3A4C;        /* texto principal */
  --lube-mist: #F0F7FA;       /* fundo atmosférico base */
  --lube-foam: #FFFFFF;
}
```

Fundos: gradientes suaves sky→mist, texturas leves de papel/água, fotos reais da clínica full-bleed.  
Não usar fundo flat único.

### Tipografia
- **Display / marca:** `Baloo 2` (já usada — lúdica, amigável) para wordmark e títulos de seção curtos.
- **Headlines:** `Fraunces` ou `Literata` (serif expressiva, humana — não Inter/Roboto).
- **Corpo:** `Nunito Sans` (já no ecossistema Lube — legível, calorosa).

### Motion (mínimo 3 intenções na home)
1. **Entrada do hero:** marca escala/opacidade suave; headline revela em cascade; 3D flutua com parallax leve.
2. **Scroll reveal** das seções (fade + translateY 24px, stagger).
3. **Hover 3D** nos cards de especialidade (tilt sutil no ícone 3D / mesh).
4. Extra: cursor/scroll que move levemente bolhas/blocos no fundo (desktop only).

`prefers-reduced-motion: reduce` → desliga 3D animado e parallax; mantém layout estático.

### 3D — onde e o quê
| Local | Asset 3D | Comportamento |
|-------|----------|---------------|
| Hero home | Casa abstrata / blocos empilhados + bolhas | Rotação idle suave; parallax mouse |
| Especialidades | Ícone 3D por especialidade (12–13 meshes leves) | Tilt on hover; load sob demanda |
| Estrutura | “Portal” ou peça sensorial por sala | Troca de scene ao selecionar sala |
| Contato | Pin 3D / casa miniatura | Idle; sem WebGL em mobile low-end |

**Stack 3D:** React Three Fiber + Drei + glTF otimizados (&lt;150KB cada). Fallback: PNG/WebP ilustrado.  
**Mobile:** reduzir qualidade / pausar fora do viewport / fallback 2D abaixo de `prefers-reduced-motion` ou GPU fraca.

### Regras de layout (obrigatórias)
- Uma composição por viewport; brand hero-level.
- Hero full-bleed (sem imagem inset em card).
- Sem cards no hero; cards só quando forem UI interativa (ex.: especialidades clicáveis).
- Uma job por seção: 1 headline + 1 frase de apoio.
- Sem overlays flutuantes (badges, chips) sobre mídia do hero.
- Sem dashboard de stats no first viewport.

---

## 5. Arquitetura de informação (site novo)

```
/                     Home
/sobre                Quem somos + história + direção clínica
/estrutura            Tour + salas (interativo)
/especialidades       Índice
/especialidades/[slug] Página de especialidade
/unidades             Fortaleza + Eusébio (endereços, mapas, WhatsApp)
/contato              Formulário + WhatsApp + mapa (página limpa)
/blog                 Lista
/blog/[slug]          Post
/politica-de-privacidade
```

Redirects 301 do WordPress:
- `/sobre-nos/` → `/sobre`
- `/contato/` → `/contato` (conteúdo novo)
- demais slugs de especialidades preservados

### Home — seções (ordem)
1. **Hero** — marca + headline + apoio + CTAs (WhatsApp / Conhecer estrutura)
2. **Sobre em 1 bloco** — foto real + parágrafo + link
3. **Especialidades em destaque** — carrossel/horizontal scroll com ícones 3D (não grid denso no first fold)
4. **Missão · Visão · Valores** — 3 colunas leves com motion, sem ícones SVG gigantes
5. **Estrutura teaser** — 1 frame do tour + CTA “Fazer o tour”
6. **Instagram** — grid enxuto (6–9 posts) via API ou embed estático
7. **Unidades** — dois blocos Fortaleza / Eusébio + mapa
8. **Footer** — links, redes, LGPD, WhatsApp

---

## 6. Arquitetura técnica

```
apps/web (Next.js 15 App Router + TypeScript)
├── app/                  rotas
├── components/
│   ├── brand/            Logo, Wordmark
│   ├── layout/           Header, Footer, Nav
│   ├── sections/         Hero, About, Specs, MVV, TourTeaser, Units
│   ├── three/            Canvas wrappers, models, fallbacks
│   └── ui/               Button, Reveal, SectionHeading
├── content/              MDX ou JSON das especialidades/salas
├── lib/                  WhatsApp links, SEO, Instagram fetch
└── public/               imagens, glTF, fontes locais
```

### Stack
| Camada | Escolha |
|--------|---------|
| Framework | Next.js (App Router) + TypeScript |
| Estilo | Tailwind CSS v4 + CSS variables da marca |
| Motion | Framer Motion (UI) + GSAP ScrollTrigger (seções longas) |
| 3D | `@react-three/fiber` + `@react-three/drei` |
| Conteúdo | MDX/JSON na fase 1; Sanity opcional fase 2 |
| Forms | Server Action + email/WhatsApp redirect |
| Analytics | GTM + Consent mode (LGPD) |
| Hosting | Vercel (ou similar) + domínio atual |

### Integrações a migrar
- WhatsApp Joinchat → botão nativo sticky + CTAs
- Instagram → Graph API ou bloco estático curado
- Google Maps → embed limpo nas unidades
- Complianz → banner de cookies próprio ou Cookiebot
- Blog WP → export Markdown/MDX

---

## 7. Conteúdo e copy (diretrizes)

- Tom: acolhedor, claro, sem jargão excessivo; respeito às famílias atípicas.
- Headline home sugerida: **“Casa LuBe”** como marca dominante; sub: “Espaço lúdico e de bem-estar para o desenvolvimento infantil”.
- CTA primário: “Falar no WhatsApp”
- CTA secundário: “Conhecer a estrutura”
- Evitar “Venha fazer parte da nossa família” como único claim — reforçar acolhimento + evidência clínica.

---

## 8. Acessibilidade, SEO e LGPD

- Landmarks semânticos, skip link, alt em todas as imagens reais
- Schema `MedicalClinic` / `LocalBusiness` para as 2 unidades
- Sitemap, robots, Open Graph com foto da clínica
- Consentimento de cookies antes de analytics
- Formulário Contato com honeypot + rate limit

---

## 9. Fases de entrega

### Fase 0 — Segurança e inventário
- Remover/despublicar página Contato comprometida no WP imediatamente
- Exportar textos, imagens e lista de especialidades/salas
- Inventário de assets de marca (logo, cores oficiais se houver brandbook)

### Fase 1 — Fundação
- Scaffold Next.js + design tokens + tipografia + Header/Footer
- Home estática com hero full-bleed (foto) e motion 2D

### Fase 2 — 3D e páginas core
- Hero 3D + fallbacks
- Especialidades (índice + templates)
- Sobre + Estrutura interativa
- Unidades + Contato limpo

### Fase 3 — Conteúdo vivo e go-live
- Blog migrado
- Instagram
- Redirects 301 + GTM + cookies
- Lighthouse / a11y / QA mobile
- Cutover DNS

---

## 10. Fora de escopo (por enquanto)
- App mobile nativo
- Portal do paciente / agendamento interno complexo
- E-commerce
- Multilíngue
- Redesign de identidade visual completa (logo novo) — reusar logo atual

---

## 11. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| 3D pesado no mobile | LOD, pause offscreen, fallback 2D |
| Famílias com sensibilidade sensorial | reduced-motion, contraste controlado, sem flashes |
| Contato hackeado | página nova + limpeza WP + scan malware |
| Conteúdo desatualizado no Judô (copy errada no site atual) | revisão editorial na migração |
| Dependência de editores WP | CMS leve na fase 2 se necessário |

---

## 12. Critérios de aceite

- [ ] Home passa no “brand test” (sem nav ainda se reconhece Casa LuBe)
- [ ] Hero = marca + 1 headline + 1 frase + CTAs + visual full-bleed
- [ ] Pelo menos 3 motions intencionais; reduced-motion ok
- [ ] 3D presente em hero e especialidades com fallback
- [ ] Contato limpo, funcional, sem spam
- [ ] 2 unidades com WhatsApp e mapa corretos
- [ ] Lighthouse Performance ≥ 85 mobile (com 3D lazy)
- [ ] Redirects das URLs antigas funcionando
- [ ] LGPD / consentimento operante
