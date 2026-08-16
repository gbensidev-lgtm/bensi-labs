# Bensi Labs — Contexto do Projeto

> Registro de contexto para retomar o desenvolvimento deste portfólio em outra sessão, janela ou agente.
>
> **Última atualização:** 16 de agosto de 2026

---

## 1. Visão geral

Portfólio pessoal oficial de **Gustavo Bensi / Bensi Labs** — single page em Next.js, dark, premium e técnico.

**Quem está por trás:** Gustavo Bensi. A Bensi Labs é o laboratório que ele constrói.

**Posicionamento:** AI Product Engineer · Software · Data  
**Mensagem principal:** Construindo soluções inteligentes com IA e dados.  
**Headline do Hero:** Construindo soluções inteligentes com IA e dados.  
**Eyebrow:** AI Product Engineer · Software · Data

**Não usar automação no posicionamento.** Gustavo ainda está estudando automações — não é prática consolidada.

**Idioma do site:** Português (Brasil).

**Domínio previsto:** `https://bensilabs.dev`

**Repositório GitHub:** https://github.com/gbensidev-lgtm/bensi-labs (público, branch `main`)

---

## 2. Stack técnica

| Tecnologia | Uso |
|---|---|
| Next.js 15 (App Router) | Framework |
| React 19 | UI |
| TypeScript | Tipagem |
| Tailwind CSS v4 | Estilos |
| Framer Motion | Animações e parallax sutil |
| Three.js + React Three Fiber + Drei | Hero 3D (desktop) |
| next/font | Space Grotesk + JetBrains Mono |
| Sharp (já vem com o Next) | Otimização de imagens |

**Comandos:**
```bash
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir build
npm run lint     # ESLint
node scripts/optimize-images.mjs              # reotimizar assets
```

**Se o dev server travar:**
1. Matar processos Node antigos
2. Apagar pasta `.next`
3. Rodar `npm run dev` novamente

---

## 3. Estrutura do repositório

```
portifolio/
├── CONTEXT.md
├── bensi_labs_brand_kit_v2/            ← fonte local (não vai para o git)
├── foto site.png                       ← retrato atual (não vai para o git)
├── public/
│   ├── about/gustavo-bensi.webp
│   ├── brand/                          ← assets oficiais otimizados
│   │   ├── logo-icon.webp              monograma B (navbar, hero, 3D)
│   │   ├── logo.webp
│   │   ├── favicon.png / favicon.svg
│   │   └── apple-touch-icon.png
│   ├── favicon.ico
│   └── projects/                       screenshots WebP
├── scripts/
│   ├── optimize-images.mjs
│   └── capture-project-screenshots.mjs
└── src/
    ├── app/                            icon.png, apple-icon.png, favicon.ico
    ├── components/hero-scene/
    ├── sections/
    ├── data/
    ├── hooks/                          useScrollParallax.ts
    ├── lib/
    └── styles/design-tokens.css
```

**Fora do git** (`.gitignore`): kits de marca, `*.zip`, `foto.png`, `foto site.png`, `node_modules`, `.next`.

---

## 4. Seções da página (ordem atual)

| Ordem | Seção | ID | Arquivo |
|---|---|---|---|
| — | Navbar | — | `components/Navbar.tsx` |
| 1 | Hero | `#hero` | `sections/Hero.tsx` |
| 2 | Projetos em desenvolvimento | `#projects` | `sections/SelectedWork.tsx` |
| 3 | Sobre | `#about` | `sections/About.tsx` |
| 4 | Construindo com IA | `#ai-development` | `sections/BuildingWithAI.tsx` |
| 5 | Tecnologias | `#stack` | `sections/Stack.tsx` |
| 6 | Explorando agora | `#exploring` | `sections/Exploring.tsx` |
| 7 | Contato | `#contact` | `sections/Contact.tsx` |
| 8 | Footer | — | `sections/Footer.tsx` |

`CurrentlyBuilding.tsx` existe, mas **não está na página**. O Dashboard Comercial foi absorvido pela seção de projetos.

**Navbar:** Sobre · Projetos · IA & Desenvolvimento · Contato · CTA “Vamos conversar”

---

## 5. Identidade visual (Brand Kit v2)

Fonte local: `bensi_labs_brand_kit_v2/` · Guia: `BRAND_GUIDE.txt`

| Token | Cor | Uso |
|---|---|---|
| primary | `#2563EB` | Electric Blue |
| secondary / accent | `#7C3AED` | Indigo — palavra LABS |
| background | `#0F1115` | Near black |
| surface | `#1C1F26` | Graphite |
| border | `#2A2F38` | Separação |
| text | `#EDEDED` | Texto |
| muted | `#9CA3AF` | Secundário |

**Gradiente:** `#2563EB → #7C3AED`

### Logo
- Navbar/footer: `logo-icon.webp` + wordmark HTML (**BENSI** branco + **LABS** em gradiente)
- Hero: monograma B na cena 3D
- Favicon: monograma oficial B (arquivos em `src/app/icon.png`, `src/app/favicon.ico`, `src/app/apple-icon.png`)
- **Não usar** `public/brand/favicon.svg` — é o ícone antigo do kit v1

### Tipografia
- **Space Grotesk** — UI, títulos, corpo
- **JetBrains Mono** — labels, badges, detalhes técnicos

---

## 6. Hero 3D (estado aprovado)

Arquivos: `HeroScene3D.tsx` + `SceneElements.tsx`

Gustavo pediu para **manter o modelo original** (não a versão simplificada):

- Monograma B no centro
- Três anéis (azul, índigo, branco metálico)
- Poeira (~90 pontos)
- Parallax no mouse
- Grid técnico CSS atrás da cena
- Sem esfera/cristal no centro
- Câmera `z: 6.2`, fov 32

**Fallback:** mobile e `prefers-reduced-motion` → logo 2D + grid.

**Copy do hero:**
- CTA primário → `#projects` (“Ver projetos”)
- CTA secundário → `#contact` (“Entrar em contato”)
- Indicador: “Explore os projetos ↓” (com animação leve)

---

## 7. Projetos

Arquivo: `src/data/projects.ts`  
Seção editorial (não grade genérica). Título: **Projetos em desenvolvimento**.

| # | Projeto | Status | Preview | URL |
|---|---|---|---|---|
| 01 | Dashboard Comercial | Em desenvolvimento | `DashboardPreview` (mock CSS) | `#contact` |
| 02 | Raquel Frizo | No ar | `/projects/raquel-frizo.webp` | https://www.raquelfrizo.com.br |
| 03 | Sello Docs | No ar | `/projects/sello-docs.webp` | https://sellodocs.com.br |

Linguagem de produto, não de portfólio de desenvolvedor.

Recapturar screenshots:
```bash
npm install --no-save playwright@1.55.0
npx playwright install chromium
node scripts/capture-project-screenshots.mjs
```

---

## 8. Sobre

Arquivo: `sections/About.tsx`

- Foto: `/about/gustavo-bensi.webp` (gerada de `foto site.png`, ~39 KB)
- Título: **Gustavo Bensi**
- Linha: Por trás da **Bensi Labs**
- Texto deixa claro que Gustavo é quem constrói o laboratório
- Parallax leve na foto

---

## 9. Formação e conteúdo prático

Gustavo está na pós **Estratégia e Desenvolvimento de Soluções de IA** (Doutores do Excel / Anhanguera).

O site reflete só o que ele já pratica (mão na massa):

**Construindo com IA** (`src/data/ai-concepts.ts`):
- Vibe Coding
- Engenharia de prompt
- Dados e persistência
- Planejamento de soluções
- Software na prática
- Projeto até o deploy

**Explorando agora** (`src/data/exploring.ts`) — estudo, não expertise:
- Automações com IA
- Agentes de IA
- Integrações com APIs e MCP
- Fundamentos de machine learning

**Stack** (`src/data/stack.ts`):
- Desenvolvimento: HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS
- IA: LLMs, Engenharia de prompt, Cursor, APIs de IA
- Ferramentas: Git, GitHub, Cursor, VS Code, Supabase, Vercel

**Não listar Claude.** Gustavo usa Cursor, não Claude.

---

## 10. Contato

Arquivo: `src/data/contact.ts`

| Canal | Valor |
|---|---|
| WhatsApp | https://wa.me/5519992381776 (CTA principal) |
| E-mail | mailto:gbensi.dev@gmail.com |

GitHub e LinkedIn foram removidos da seção de contato por enquanto.

O kit v2 cita `contato@bensilabs.dev` e `github.com/bensilabs` — **não aplicar** até existirem de fato.

---

## 11. Performance, motion e SEO

- Imagens do site em WebP (public ~241 KB no total, antes ~11 MB)
- `next/image` com AVIF/WebP, lazy load fora do hero, `sizes` corretos
- Parallax sutil (hero, foto, screenshots) via `useScrollParallax` — só `transform`
- Respeitar `prefers-reduced-motion`
- Title: `Bensi Labs — AI Product Engineer · Software · Data`
- Open Graph em `src/app/opengraph-image.tsx`

---

## 12. Git e publicação

- Repositório inicializado em 16/08/2026
- Commit: `Publicar o site da Bensi Labs.`
- Remote: `https://github.com/gbensidev-lgtm/bensi-labs`
- **Vercel ainda não publicado.** CLI local estava deslogada. Próximo passo: importar o repo em https://vercel.com/new ou `npx vercel login` + `npx vercel --prod`
- Depois apontar o domínio `bensilabs.dev`

---

## 13. Histórico recente

### 15 ago 2026
- Brand Kit v2 aplicado (cores, Space Grotesk, monograma B)
- Hero 3D com anéis + B — aprovado (esfera/cristal removidos)
- URL Sello Docs → `https://sellodocs.com.br`

### 16 ago 2026
- Refinamento da landing (editorial de projetos, CTAs, indicador de scroll)
- Hero 3D simplificado **revertido** a pedido — voltou o modelo original + grid atrás
- Automação removida do posicionamento; substituída por **Data**
- Contexto alinhado às matérias práticas da pós
- Claude → Cursor na stack de IA
- Foto no Sobre (trocada depois para `foto site.png`)
- Otimização de imagens (WebP)
- Favicon oficial do monograma B (o SVG antigo não deve ser usado)
- Parallax discreto no hero, sobre e projetos
- Correção de keys duplicadas no `DashboardPreview` (S/Q da semana)
- Commit + push para GitHub

---

## 14. Pendências

- [ ] **Deploy na Vercel** e domínio `bensilabs.dev`
- [ ] Trocar e-mail/GitHub da marca quando existirem
- [ ] Revisar tecnologias listadas nos projetos (foram inferidas)
- [ ] Recapturar screenshot da Sello Docs se o visual mudou
- [ ] README.md do repositório (ainda não criado)

---

## 15. Regras de conteúdo

- Não apresentar automação, agentes, MCP ou automações avançadas como experiência consolidada
- Não listar Claude
- Não alterar o desenho do logo
- Não reconstruir a página do zero — refinar o que já existe
- Hero 3D: manter anéis + poeira + grid (versão aprovada)
- Evitar clichês de landing de IA, neon exagerado, partículas em excesso
- Sem backend/CMS nesta v1
- Performance e acessibilidade são prioridade

---

## 16. Como retomar

1. Ler este `CONTEXT.md`
2. `npm install && npm run dev`
3. Conteúdo: `src/data/`
4. Layout: `src/sections/` e `src/components/`
5. Identidade: `public/brand/` + `src/styles/design-tokens.css`
6. Hero 3D: `src/components/hero-scene/`
7. Deploy: importar https://github.com/gbensidev-lgtm/bensi-labs na Vercel

**Prompt sugerido:**
> Estou retomando o portfólio da Bensi Labs. Leia o CONTEXT.md na raiz do projeto e continue a partir do que está documentado em "Pendências".
