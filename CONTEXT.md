# Bensi Labs — Contexto do Projeto

> Registro de contexto para retomar o desenvolvimento deste portfólio em outra sessão, janela ou agente.
>
> **Última atualização:** 15 de agosto de 2026

---

## 1. Visão geral

Portfólio pessoal oficial de **Luiz Gustavo Bensi / Bensi Labs** — single page em Next.js, dark, premium e técnico.

**Posicionamento:** AI Product Engineer · Software · Data  
**Mensagem principal:** Construindo soluções inteligentes com IA e dados.  
**Headline do Hero:** Construindo soluções inteligentes com IA e dados.

**Idioma do site:** Português (Brasil). Todo o conteúdo visível foi traduzido; termos como "Vibe Coding" foram mantidos quando fazem sentido como conceito.

**Domínio previsto (SEO/metadata):** `https://bensilabs.dev`

---

## 2. Stack técnica

| Tecnologia | Uso |
|---|---|
| Next.js 15 (App Router) | Framework |
| React 19 | UI |
| TypeScript | Tipagem |
| Tailwind CSS v4 | Estilos |
| Framer Motion | Animações |
| Three.js + React Three Fiber + Drei | Hero 3D (desktop) |
| next/font | Space Grotesk + JetBrains Mono |

**Comandos:**
```bash
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir build
npm run lint     # ESLint
```

**Se o dev server travar:**
1. Matar processos Node antigos
2. Apagar pasta `.next`
3. Rodar `npm run dev` novamente

---

## 3. Estrutura do repositório

```
portifolio/
├── CONTEXT.md                          ← este arquivo
├── bensi_labs_brand_kit_v2/            ← brand kit atual (fonte)
├── bensi_labs_brand_kit_v2.zip
├── gustavo_bensi_brand_kit_v1/         ← brand kit anterior (arquivado)
├── public/
│   ├── brand/                          ← assets oficiais em uso
│   │   ├── logo-icon.webp              monograma B (otimizado)
│   │   ├── logo.webp                   lockup completo
│   │   ├── favicon.svg / favicon.png
│   │   └── apple-touch-icon.png
│   ├── about/gustavo-bensi.webp
│   └── projects/                       screenshots WebP
├── scripts/
│   └── capture-project-screenshots.mjs
└── src/
    ├── app/
    ├── components/
    │   └── hero-scene/                 Three.js (HeroScene3D + SceneElements)
    ├── sections/
    ├── data/
    ├── hooks/
    ├── lib/
    └── styles/                         design-tokens.css
```

---

## 4. Seções da página (ordem)

| Ordem | Seção | ID | Arquivo |
|---|---|---|---|
| — | Navbar | — | `components/Navbar.tsx` |
| 1 | Hero | `#hero` | `sections/Hero.tsx` |
| 2 | Sobre | `#about` | `sections/About.tsx` |
| 3 | Projetos selecionados | `#projects` | `sections/SelectedWork.tsx` |
| 4 | Construindo agora | `#currently-building` | `sections/CurrentlyBuilding.tsx` |
| 5 | Construindo com IA | `#ai-development` | `sections/BuildingWithAI.tsx` |
| 6 | Tecnologias | `#stack` | `sections/Stack.tsx` |
| 7 | Explorando agora | `#exploring` | `sections/Exploring.tsx` |
| 8 | Contato | `#contact` | `sections/Contact.tsx` |
| 9 | Footer | — | `sections/Footer.tsx` |

**Links da navbar** (`src/lib/utils.ts`):
- Sobre → `#about`
- Projetos → `#projects`
- IA & Desenvolvimento → `#ai-development`
- Contato → `#contact`
- CTA: **Vamos conversar** → `#contact`

---

## 5. Identidade visual (Brand Kit v2)

Fonte: `bensi_labs_brand_kit_v2/` · Guia: `BRAND_GUIDE.txt`

| Token | Cor | Uso |
|---|---|---|
| primary | `#2563EB` | Electric Blue — ações, links, destaque |
| secondary / accent | `#7C3AED` | Indigo — gradientes, palavra LABS |
| background | `#0F1115` | Near black |
| surface | `#1C1F26` | Graphite — cards |
| border | `#2A2F38` | Separação sutil |
| text | `#EDEDED` | Texto principal |
| muted | `#9CA3AF` | Texto secundário |

**Gradiente da marca:** `#2563EB → #7C3AED`

### Logo
- Navbar/footer: ícone PNG + wordmark HTML (**BENSI** branco + **LABS** em gradiente)
- Hero: monograma B **dentro** da cena 3D
- Sem slogan no lockup da navbar

### Tipografia
- **Space Grotesk** — UI, títulos, corpo
- **JetBrains Mono** — labels, badges, detalhes técnicos

---

## 6. Hero 3D (estado aprovado)

Arquivos: `src/components/hero-scene/HeroScene3D.tsx` e `SceneElements.tsx`

**O que ficou (aprovado pelo Gustavo):**
- Monograma B flutuando no centro da cena
- Três anéis giroscópios (azul, índigo, branco metálico)
- Poeira discreta (~90 pontos)
- Parallax no mouse
- Sem esfera/octaedro de vidro no centro (removido a pedido)
- Sem recorte circular — canvas expandido para os anéis não cortarem nos cantos
- Câmera recuada (`z: 6.2`, fov 32)

**Fallback:** mobile e `prefers-reduced-motion` usam logo 2D + grid CSS.

---

## 7. Projetos (Selected Work)

Arquivo: `src/data/projects.ts`

| # | Projeto | URL | Imagem |
|---|---|---|---|
| 01 | Raquel Frizo | https://www.raquelfrizo.com.br | `/projects/raquel-frizo.webp` |
| 02 | Sello Docs | https://sellodocs.com.br | `/projects/sello-docs.webp` |

**Removidos** (deixados para depois): Dashboard Comercial, Iris Lab, AI Projects.

Para recapturar screenshots:
```bash
npm install --no-save playwright@1.55.0
npx playwright install chromium
node scripts/capture-project-screenshots.mjs
```

---

## 8. Construindo agora

Arquivo: `src/data/building.ts`

| Projeto | Status | Tecnologia |
|---|---|---|
| Dashboards e análise de dados | Em construção | React · TypeScript · Data Visualization |

Descrição: trabalhando em dashboards e análises de dados para empresas.

**Removido:** o item do próprio portfólio.

A seção **Sobre** também menciona esse trabalho em empresas.

---

## 9. Contato

Arquivo: `src/data/contact.ts`

| Canal | Valor |
|---|---|
| E-mail | mailto:gbensi.dev@gmail.com |
| GitHub | https://github.com/gustavobensi |
| LinkedIn | https://www.linkedin.com/in/luiz-gustavo-bensi-b25911287/ |

O kit v2 cita `contato@bensilabs.dev` e `github.com/bensilabs` — **não foram aplicados** porque os links atuais já funcionam. Trocar só quando existirem de fato.

---

## 10. Stack exibida no site

Arquivo: `src/data/stack.ts`

- **Desenvolvimento:** HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS
- **IA:** LLMs, Engenharia de prompt, Cursor, APIs de IA
- **Ferramentas:** Git, GitHub, Cursor, VS Code, Supabase, Vercel

Formação em andamento: pós **Estratégia e Desenvolvimento de Soluções de IA**.
O site reflete as matérias práticas (vibe coding, prompt, dados, software, deploy).
Automações, agentes, MCP e fundamentos de ML ficam em "Explorando agora".

---

## 11. SEO e metadata

- Title: `Bensi Labs — AI Product Engineer · Software · Data`
- `src/app/layout.tsx` — metadata + Open Graph
- `src/app/opengraph-image.tsx`
- `src/app/sitemap.ts` → `https://bensilabs.dev`
- `public/robots.txt`

---

## 12. Histórico recente (15 ago 2026)

- Brand Kit v2 (Bensi Labs) aplicado por completo: cores, Space Grotesk, monograma B, copy e metadata
- Hero 3D evoluído: anéis orbitais + B no espaço 3D (em vez de grid genérico)
- Esfera/cristal do centro removida
- Anéis deixaram de ser cortados (sem máscara circular, canvas maior, câmera recuada) — **aprovado**
- URL Sello Docs atualizada para `https://sellodocs.com.br`
- Vercel e Supabase adicionados em Ferramentas
- “Construindo agora” passou a dashboards/análises em empresas; portfólio removido dessa seção

---

## 13. Pendências / próximos passos

- [ ] **Deploy** (Vercel) — domínio `bensilabs.dev`
- [ ] Trocar e-mail/GitHub para os da marca quando existirem (`contato@bensilabs.dev`, `github.com/bensilabs`)
- [ ] Revisar tecnologias listadas nos projetos (foram inferidas)
- [ ] Adicionar novos projetos em `src/data/projects.ts`
- [ ] Recapturar screenshot da Sello Docs no domínio novo, se o visual mudou
- [ ] README.md do repositório (ainda não criado)

---

## 14. Regras de conteúdo

- Não apresentar automação, AI Agents, MCP ou automações avançadas como experiência consolidada — isso fica em "Explorando agora"
- O contexto prático do site vem das matérias mão na massa da pós (vibe coding, engenharia de prompt, dados/banco, planejamento de soluções, software e deploy)
- Seção "Explorando agora" mostra evolução, não expertise
- Evitar clichês de landing page de IA
- Sem backend, CMS, banco de dados nesta v1
- Performance e acessibilidade são prioridade (`prefers-reduced-motion` respeitado)
- Não exagerar glow, neon, partículas ou efeitos “demo de Three.js”

---

## 15. Como retomar em nova sessão

1. Ler este `CONTEXT.md`
2. Rodar `npm install && npm run dev`
3. Conteúdo: `src/data/`
4. Layout/visual: `src/sections/` e `src/components/`
5. Identidade: `public/brand/` + `src/styles/design-tokens.css`
6. Logo: `src/components/Logo.tsx` + PNGs em `public/brand/`
7. Hero 3D: `src/components/hero-scene/`

**Prompt sugerido:**
> Estou retomando o portfólio da Bensi Labs. Leia o CONTEXT.md na raiz do projeto e continue a partir do que está documentado em "Pendências".
