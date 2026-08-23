# Bensi Labs — Contexto do Projeto

> Registro de contexto para retomar o desenvolvimento em outra sessão, janela ou agente.
>
> **Última atualização:** 23 de agosto de 2026
>
> **Ponto de parada:** Intake, Studio e zip do Project Context validados em produção. Em 22/08 consultamos [public-apis](https://github.com/public-apis/public-apis): **não integrar API só para ter integração**. Se for usar alguma, priorizar BrasilAPI (CNPJ/CEP no briefing) e depois Microlink (preview das referências). Nada disso foi implementado ainda. Próximo passo útil continua sendo abrir o zip no Cursor num projeto real.

---

## 1. Visão geral

**Gustavo Bensi** é o fundador. **Bensi Labs** é o laboratório / AI Product Studio.

**Posicionamento atual (home):** AI Product Engineer · Software · Automation  
**Headline:** Transformamos ideias em produtos digitais.

O produto agora tem **duas camadas que não se misturam**:

| Camada | Função | Onde |
|---|---|---|
| **Site público** | Marketing, portfólio, aquisição | `src/app/(site)/` |
| **Studio** | Operação privada: clientes, briefings, projetos, criativos | `src/app/admin/` |

Arquitetura escrita em `docs/ARCHITECTURE.md`.

**Idioma:** Português (Brasil).  
**Domínio previsto:** `https://bensilabs.dev` (ainda não apontado)  
**Produção atual:** https://portifolio-tau-liard.vercel.app  
**Repositório:** https://github.com/gbensidev-lgtm/bensi-labs (público, branch `main`)

---

## 2. Stack técnica

| Tecnologia | Uso |
|---|---|
| Next.js 15 (App Router) | Framework |
| React 19 | UI |
| TypeScript | Tipagem |
| Tailwind CSS v4 | Estilos |
| Framer Motion | Animações |
| Three.js + R3F + Drei | Hero 3D (desktop) |
| next/font | Space Grotesk + JetBrains Mono |
| Supabase | Auth, Postgres, RLS, storage do Studio |
| Service role (servidor) | Grava o intake público; nunca no client |

**Comandos:**
```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

**Se o dev server travar:** matar Node antigo → apagar `.next` → `npm run dev`.

**Env (`.env.local`, nunca versionar):**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   # obrigatória para POST /api/intake
```

---

## 3. Regra mais importante

Não misturar **marketing** com **operação**.

```text
SITE vende
  → /briefing coleta
      → Studio organiza
          → Project Context documenta
              → Cursor desenvolve
```

O site público **não** contém: briefings, dados de cliente, requisitos internos, TODOs, decisões técnicas.

O Studio **não** é o site. `/admin` é privado, `noindex`.

---

## 4. Intake v1 — estado validado

Fluxo em produção:

```text
Cliente no site
  → CTA "Começar um projeto"
  → /briefing (formulário progressivo 7 etapas)
  → POST /api/intake (write-only, não devolve o briefing)
  → clients + briefings no Supabase
  → Gustavo em /admin/briefings
  → Converter em projeto
  → project.briefing_id + project_documents (markdown interno)
```

### Público
- `/briefing` — wizard (tipo → empresa → problema → específico → referências/materiais → extras → revisão)
- `/briefing/enviado` — confirmação (noindex, sem prazo de resposta)
- Tipos: Site, Landing, Aplicação, IA/Automação, Ainda não tenho certeza
- CTAs atualizados:
  - Navbar → `/briefing` (“Começar um projeto”)
  - Hero secundário → `/briefing`
  - Contato: primário `/briefing`, secundário WhatsApp

### Studio
- Menu: Dashboard, Clientes, Briefings, Projetos, Criativos, Templates, Configurações
- `/admin/clients` e `/admin/clients/[id]`
- `/admin/briefings` (filtros) e `/admin/briefings/[id]`
- Ações: em análise, converter em projeto, arquivar
- Projeto convertido mostra **Project Context** (markdown no Studio)
- **Baixar contexto** gera zip autenticado: `GET /api/admin/projects/[id]/context`
- Campos novos em `projects`: `client_id`, `briefing_id`

### Segurança (v1)
- `/api/intake` só POST; GET devolve 404
- Anon **sem** policy de leitura/escrita em `clients`, `briefings`, `project_documents`
- Insert público via service role no servidor (`src/lib/supabase/admin.ts`)
- `/admin/*` e `/api/admin/*` exigem sessão

### Zip do Project Context (mão para o Cursor)

```text
README.md
context/PROJECT.md
context/REQUIREMENTS.md
context/DESIGN.md
context/CONTENT.md
context/INTEGRATIONS.md
context/USER-FLOWS.md
context/DECISIONS.md
context/TODO.md
```

Uso: Studio → Baixar contexto → extrair → Open Folder no Cursor → `context/` é a fonte de verdade.  
`PENDING` / `NOT DEFINED` = não inventar.

Arquivos: `src/lib/studio/zip.ts`, `src/lib/studio/context-pack.ts`, `src/app/api/admin/projects/[id]/context/route.ts`.

### Arquivos-chave
```
docs/ARCHITECTURE.md
supabase/patch-intake.sql          ← já aplicado no projeto Bensi Labs
supabase/schema.sql

src/lib/intake/*
src/lib/supabase/admin.ts
src/app/(site)/briefing/
src/app/api/intake/route.ts
src/app/admin/(studio)/briefings/
src/app/admin/(studio)/clients/
src/app/api/admin/briefings/
src/components/intake/
```

### Status dos documentos gerados na conversão
Informação ausente vira `PENDING` ou `NOT DEFINED`. Não inventar conteúdo.

---

## 5. Site público (home)

Ordem atual em `src/app/(site)/page.tsx`:

| Ordem | Seção | ID | Arquivo |
|---|---|---|---|
| — | Navbar | — | `components/Navbar.tsx` |
| 1 | Hero | `#hero` | `sections/Hero.tsx` |
| 2 | Projetos | `#projects` | `sections/SelectedWork.tsx` |
| 3 | Serviços | `#services` | `sections/Services.tsx` |
| 4 | Sobre | `#about` | `sections/About.tsx` |
| 5 | Processo | `#process` | `sections/Process.tsx` |
| 6 | Construindo com IA | `#ai-development` | `sections/BuildingWithAI.tsx` |
| 7 | Tecnologias | `#stack` | `sections/Stack.tsx` |
| 8 | Contato | `#contact` | `sections/Contact.tsx` |
| 9 | Footer | — | `sections/Footer.tsx` |

`CurrentlyBuilding.tsx` existe, mas **não está na página**.

Navbar: Projetos · Serviços · Sobre · Contato · CTA “Começar um projeto”.

Fora da home, os hashes da navbar apontam para `/#secao`.

---

## 6. Identidade visual (Brand Kit v2)

Incumbente. Não redesenhar.

| Token | Cor |
|---|---|
| primary | `#2563EB` |
| secondary / accent | `#7C3AED` |
| background | `#0F1115` |
| surface | `#1C1F26` |
| border | `#2A2F38` |
| text | `#EDEDED` |
| muted | `#9CA3AF` |

Tipografia: Space Grotesk + JetBrains Mono.  
Logo: `public/brand/logo-icon.webp`. Não usar `public/brand/favicon.svg` (kit v1).  
Hero 3D aprovado: anéis + B + poeira + grid; sem esfera/cristal. Câmera `z: 6.2`, fov 32.

---

## 7. Projetos no site (marketing)

Arquivo editorial: `src/data/projects.ts` (isso é vitrine, **não** é o banco do Studio).

| # | Projeto | Status | URL |
|---|---|---|---|
| 01 | Central de Dashboards | Em desenvolvimento | preview mock |
| 02 | Raquel Frizo | No ar | https://www.raquelfrizo.com.br |
| 03 | Sello Docs | No ar | https://sellodocs.com.br |

---

## 8. Studio (já existia antes do Intake)

Login: `/admin/login`  
Auth: Supabase email/senha, profiles com role ADMIN/EDITOR/CLIENT. Só ADMIN/EDITOR entram.  
Criativos Instagram 4:5, templates Project Case e Service.  
Storage bucket `studio` para imagens de criativo.

O Intake **reutiliza** esse Studio. Não foi reconstruído.

---

## 9. Regras de conteúdo

- Não inventar clientes, métricas, depoimentos, cases ou certificações
- Não vender IA como mágica
- Não listar Claude; ferramenta em uso é Cursor
- Não usar linguagem de estudante na home
- Não alterar o desenho do logo
- Não misturar dados do Studio no frontend público
- Estudo (agentes, MCP, ML) fora da home; futuro `/lab`

WhatsApp: https://wa.me/5519992381776  
E-mail: mailto:gbensi.dev@gmail.com  
Não usar `contato@bensilabs.dev` / `github.com/bensilabs` até existirem de fato.

---

## 10. Git e publicação

- Remote: `https://github.com/gbensidev-lgtm/bensi-labs`
- Vercel: projeto `gbensidev/portifolio`, alias https://portifolio-tau-liard.vercel.app
- GitHub conectado à Vercel; deploys em `--prod` via CLI
- Env na Vercel (Production + Preview): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Service role também está no `.env.local` local (nunca versionar)
- Commits relevantes:
  - `0c7b4e8` Studio + intake
  - `95847c6` schema aplicado / gitignore
  - `2234864` zip do Project Context

Supabase: projeto **Bensi Labs**, ref `kpwqezyyacshrubamskp`, CLI já linkado (`supabase/.temp/`, gitignored).

---

## 11. Histórico recente

### 15–16 ago 2026
- Brand Kit v2, Hero 3D aprovado, landing editorial, foto, WebP, favicon oficial
- Commit inicial do site + push GitHub

### 16–17 ago 2026 (sessões anteriores)
- Home reposicionada para vender o estúdio (serviços, processo, CTA comercial)
- Bensi Labs Studio criado: login, dashboard, projetos, criativos, templates
- Schema inicial: `profiles`, `projects`, `creatives`, `templates`

### 17 ago 2026
- Intake / Briefing / Clientes / Project Context implementados no código
- `docs/ARCHITECTURE.md` criado

### 19 ago 2026
- `patch-intake.sql` aplicado no Supabase Bensi Labs
- Commit + push; primeiro deploy na Vercel
- Envio do briefing falhou (503) por service role vazia; chave preenchida local + Vercel; redeploy
- Gustavo confirmou: intake público funcionou e chegou no Studio
- Combinado: o contexto vira pasta para o Cursor, não só preview no admin
- Zip **Baixar contexto** implementado, commit `2234864`, deploy em produção

### 22–23 ago 2026
- Consulta à lista [public-apis/public-apis](https://github.com/public-apis/public-apis)
- Decisão: a maior parte da lista não serve à Bensi Labs (site de marketing + Studio operacional)
- Se integrar no futuro, nesta ordem:
  1. **[BrasilAPI](https://brasilapi.com.br/)** — CEP, CNPJ, bancos, feriados; enriquecer briefing (empresa/endereço) e reutilizar em projetos de cliente
  2. **[Microlink](https://microlink.io)** — título/descrição/preview das URLs de referência do intake
  3. Screenshot API — só se quiser print automático das referências; hoje o repo já usa Playwright
- Não puxar: Hunter/e-mail (automação de e-mail ficou de fora), CPFHub (LGPD), clima/cotação (não são o produto), logo/Clearbit (opcional e instável)
- ViaCEP e ReceitaWS existem na lista; BrasilAPI cobre os dois sem espalhar provedor

---

## 12. Pendências

### Intake / Context (feito nesta fase)

1. [x] Commit + push do Intake
2. [x] SQL no Supabase Bensi Labs
3. [x] Service role no `.env.local` e na Vercel
4. [x] Teste público: `/briefing` envia e grava
5. [x] Studio: briefing visível, conversão em projeto
6. [x] Zip do Project Context em produção
7. [ ] Gustavo baixar o zip, abrir no Cursor e começar um projeto real com esse contexto
8. [ ] Testar outros tipos de intake (Site / App / IA) se ainda não cobertos
9. [ ] Se o login do Studio falhar no domínio da Vercel: incluir `https://portifolio-tau-liard.vercel.app` em Supabase Auth → URL Configuration

### Integrações (avaliado, não implementado)
- [ ] BrasilAPI no CNPJ/CEP do briefing (primeiro candidato, se Gustavo pedir)
- [ ] Microlink nos cards de referência do Studio
- Não implementar API “de vitrine” no site público

### Não implementar ainda (combinado no briefing)
CRM completo, cobrança, contratos, e-mail automático, WhatsApp automático, IA conversacional, orçamento automático, upload real de arquivos, geração de código, geração completa de docs por LLM.

Upload: a v1 só **declara** material (nome, tipo, status). Storage de arquivos fica para depois.

### Outras pendências antigas
- [ ] Apontar domínio `bensilabs.dev` (site já está na Vercel)
- [ ] Trocar e-mail/GitHub da marca quando existirem
- [ ] Revisar tecnologias listadas nos projetos do site (foram inferidas)
- [ ] Recapturar screenshot da Sello Docs se o visual mudou
- [ ] README.md do repositório
- [ ] `PRODUCT.md` ainda descreve o CTA principal como WhatsApp; a home prioriza `/briefing`. Atualizar.

---

## 13. Como retomar

1. Ler este `CONTEXT.md` e `docs/ARCHITECTURE.md`
2. **Não reimplementar Intake, Studio nem o zip** — já estão no ar
3. Produção: https://portifolio-tau-liard.vercel.app
4. Próximo trabalho útil: abrir um zip de contexto no Cursor e desenvolver a partir dele; só depois evoluir o pacote (AGENTS.md, sync de decisões, etc.)

**Prompt sugerido:**
> Estou retomando a Bensi Labs. Leia o CONTEXT.md. Intake, Studio e o zip do Project Context já funcionam em produção. Não reconstrua. Continue a partir de "Pendências".
