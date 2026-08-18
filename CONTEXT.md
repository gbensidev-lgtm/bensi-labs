# Bensi Labs — Contexto do Projeto

> Registro de contexto para retomar o desenvolvimento em outra sessão, janela ou agente.
>
> **Última atualização:** 17 de agosto de 2026 (noite)
>
> **Ponto de parada:** Intake / Briefing / Project Context implementado no código. **Ainda não testado em runtime.** SQL do Intake **ainda não foi aplicado** no Supabase. Alterações **ainda não foram commitadas**.

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
**Domínio previsto:** `https://bensilabs.dev`  
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

## 4. O que foi feito em 17/08/2026 — Intake v1

Código da primeira versão está no repositório local. Fluxo implementado:

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
- Projeto convertido mostra **Project Context** (documentos markdown)
- Campos novos em `projects`: `client_id`, `briefing_id`

### Segurança (v1)
- `/api/intake` só POST; GET devolve 404
- Anon **sem** policy de leitura/escrita em `clients`, `briefings`, `project_documents`
- Insert público via service role no servidor (`src/lib/supabase/admin.ts`)
- `/admin/*` e `/api/admin/*` exigem sessão

### Arquivos-chave
```
docs/ARCHITECTURE.md
supabase/patch-intake.sql          ← RODAR NO SUPABASE AMANHÃ
supabase/schema.sql                ← já inclui o intake (installs novos)

src/lib/intake/*                   tipos, opções, validação, parse, contexto MD
src/lib/supabase/admin.ts          service role (server-only)
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
| 01 | Dashboard Comercial | Em desenvolvimento | preview mock |
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
- **Vercel ainda não publicado**
- **Intake v1 ainda não commitado** — só continuar/commitar quando Gustavo pedir

---

## 11. Histórico recente

### 15–16 ago 2026
- Brand Kit v2, Hero 3D aprovado, landing editorial, foto, WebP, favicon oficial
- Commit inicial do site + push GitHub

### 16–17 ago 2026 (sessões anteriores)
- Home reposicionada para vender o estúdio (serviços, processo, CTA comercial)
- Bensi Labs Studio criado: login, dashboard, projetos, criativos, templates
- Schema inicial: `profiles`, `projects`, `creatives`, `templates`

### 17 ago 2026 (esta sessão)
- Intake / Briefing / Clientes / Project Context implementados no código
- `docs/ARCHITECTURE.md` criado
- Sessão interrompida uma vez por `resource_exhausted`; trabalho retomado e fechado no código
- **Parou aqui:** falta aplicar SQL, testar o fluxo ponta a ponta e só então iterar

---

## 12. Pendências

### Amanhã — Intake (prioridade)

1. **Rodar** `supabase/patch-intake.sql` no SQL Editor do Supabase (projeto já existente)
2. Confirmar `SUPABASE_SERVICE_ROLE_KEY` no `.env.local`
3. Testar fluxo público: `/briefing` → preencher Landing (e se possível Site / App / IA) → enviar
4. Testar Studio: login → `/admin/briefings` → em análise → converter → ver projeto + contexto
5. Segurança: deslogado não acessa `/admin/briefings`; `GET /api/admin/briefings` sem sessão = 401; `/api/intake` GET = 404 e não vaza dados
6. Só depois: commit (se Gustavo pedir) e ajustes de UX que o teste revelar

### Não implementar ainda (combinado no briefing)
CRM completo, cobrança, contratos, e-mail automático, WhatsApp automático, IA conversacional, orçamento automático, upload real de arquivos, geração de código, geração completa de docs por LLM.

Upload: a v1 só **declara** material (nome, tipo, status). Storage de arquivos fica para depois.

### Outras pendências antigas
- [ ] Deploy na Vercel e domínio `bensilabs.dev`
- [ ] Trocar e-mail/GitHub da marca quando existirem
- [ ] Revisar tecnologias listadas nos projetos do site (foram inferidas)
- [ ] Recapturar screenshot da Sello Docs se o visual mudou
- [ ] README.md do repositório
- [ ] `PRODUCT.md` ainda descreve o CTA principal como WhatsApp; a home agora prioriza `/briefing`. Atualizar quando o Intake estiver validado.

---

## 13. Como retomar amanhã

1. Ler este `CONTEXT.md` e `docs/ARCHITECTURE.md`
2. **Não reimplementar o Intake** — o código já está no repo
3. Primeiro: SQL + env + teste do fluxo
4. `npm run dev` → http://localhost:3000/briefing e http://localhost:3000/admin/briefings

**Prompt sugerido:**
> Estou retomando a Bensi Labs. Leia o CONTEXT.md. A v1 do Intake já está no código. Comece aplicando `supabase/patch-intake.sql` se ainda não rodou, confirme a service role, e teste o fluxo briefing → Studio → converter em projeto. Não reconstrua o que já existe.
