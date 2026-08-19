# Bensi Labs Architecture

The public site and the Studio are separate systems that share a brand, not a data model.

```text
SITE (marketing)
  → Intake (/briefing)
      → Studio (private)
          → Project Context
              → Cursor / development
```

## Public Site

Marketing, portfolio, SEO and acquisition.

Route group: `src/app/(site)/`

The site presents Bensi Labs, services, projects and a path to start a conversation. It does **not** contain client records, private briefings, project requirements, internal decisions, TODOs or admin data.

Public routes may collect information. They must not read Studio records back to the browser.

## Studio

Private operational platform.

Route group: `src/app/admin/(studio)/`

Protected by middleware and server session checks. Studio is the source of truth for:

- Clients
- Briefings
- Projects
- Project Context
- Creatives
- Templates

## Briefing

Public intake interface whose submitted data belongs to the Studio.

- Public UI: `/briefing`
- Public write-only API: `POST /api/intake`
- That API never returns briefing contents
- Studio UI: `/admin/briefings`
- Studio APIs: `/api/admin/briefings*`

Anon has no RLS policies on `clients`, `briefings` or `project_documents`. Intake inserts through the server service role.

## Project Context

Internal source of truth used during project development.

When a briefing is converted, the Studio creates a project with `briefing_id` and seeds markdown documents:

- PROJECT.md
- REQUIREMENTS.md
- DESIGN.md
- CONTENT.md
- INTEGRATIONS.md
- USER-FLOWS.md
- DECISIONS.md
- TODO.md

Missing facts are stored as `PENDING` or `NOT DEFINED`. Nothing is invented.

These documents are Studio data. They are not part of the public site.

## Cursor

Development agent that consumes Project Context.

When working on a client project:

```text
Studio → Project Context zip → Cursor → code
```

The Studio exports an authenticated zip from `/api/admin/projects/[id]/context`:

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

Open the extracted folder in Cursor. Treat `context/` as the source of truth. Do not invent `PENDING` or `NOT DEFINED` fields.

Do not treat the public marketing site as the source of requirements.

## Data model

```text
Client
  └── Briefings
        └── Project (projects.briefing_id)
              └── Project documents
```

## Security

- `/admin/*` and `/api/admin/*` require an authenticated Studio session
- Briefings are never exposed on public GET endpoints
- Service role key stays on the server
- Client answers are not hardcoded in the public frontend
