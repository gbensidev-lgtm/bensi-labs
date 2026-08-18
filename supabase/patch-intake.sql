-- Bensi Labs Studio — Intake / Briefings / Clients / Project Context
-- Run this in the Supabase SQL editor on an existing project.
-- Safe to run more than once.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  website text,
  instagram text,
  segment text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists clients_email_lower_idx
  on public.clients (lower(email));

create table if not exists public.briefings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete restrict,
  project_type text not null
    check (project_type in ('website', 'landing', 'application', 'ai', 'unsure')),
  status text not null default 'NEW'
    check (status in ('NEW', 'REVIEWING', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'REJECTED', 'ARCHIVED')),
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists briefings_client_id_idx on public.briefings (client_id);
create index if not exists briefings_status_idx on public.briefings (status);
create index if not exists briefings_created_at_idx on public.briefings (created_at desc);

alter table public.projects
  add column if not exists client_id uuid references public.clients (id) on delete set null;

alter table public.projects
  add column if not exists briefing_id uuid references public.briefings (id) on delete set null;

create unique index if not exists projects_briefing_id_unique
  on public.projects (briefing_id)
  where briefing_id is not null;

create index if not exists projects_client_id_idx on public.projects (client_id);

create table if not exists public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  slug text not null
    check (slug in (
      'PROJECT',
      'REQUIREMENTS',
      'DESIGN',
      'CONTENT',
      'INTEGRATIONS',
      'USER-FLOWS',
      'DECISIONS',
      'TODO'
    )),
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, slug)
);

drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at
before update on public.clients
for each row execute procedure public.set_updated_at();

drop trigger if exists set_briefings_updated_at on public.briefings;
create trigger set_briefings_updated_at
before update on public.briefings
for each row execute procedure public.set_updated_at();

drop trigger if exists set_project_documents_updated_at on public.project_documents;
create trigger set_project_documents_updated_at
before update on public.project_documents
for each row execute procedure public.set_updated_at();

alter table public.clients enable row level security;
alter table public.briefings enable row level security;
alter table public.project_documents enable row level security;

-- No anon policies. Public intake writes through the service role on the server.
drop policy if exists "studio clients read" on public.clients;
create policy "studio clients read"
on public.clients for select to authenticated using (true);

drop policy if exists "studio clients write" on public.clients;
create policy "studio clients write"
on public.clients for all to authenticated
using (true)
with check (true);

drop policy if exists "studio briefings read" on public.briefings;
create policy "studio briefings read"
on public.briefings for select to authenticated using (true);

drop policy if exists "studio briefings write" on public.briefings;
create policy "studio briefings write"
on public.briefings for all to authenticated
using (true)
with check (true);

drop policy if exists "studio project documents read" on public.project_documents;
create policy "studio project documents read"
on public.project_documents for select to authenticated using (true);

drop policy if exists "studio project documents write" on public.project_documents;
create policy "studio project documents write"
on public.project_documents for all to authenticated
using (true)
with check (true);
