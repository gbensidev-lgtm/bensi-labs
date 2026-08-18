-- Bensi Labs Studio — schema v0.1
-- Run this in the Supabase SQL editor after creating the project.
-- Then: Authentication → Providers → Email → disable sign-ups.
-- Create the founder user in Authentication → Users.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'ADMIN' check (role in ('ADMIN', 'EDITOR', 'CLIENT')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category text not null default 'website'
    check (category in ('website', 'landing', 'application', 'ai', 'automation', 'other')),
  status text not null default 'draft'
    check (status in ('draft', 'development', 'published', 'archived')),
  url text,
  image text,
  screenshot_desktop text,
  screenshot_mobile text,
  thumbnail text,
  technologies text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creatives (
  id uuid primary key default gen_random_uuid(),
  type text not null
    check (type in ('PROJECT', 'SERVICE', 'EDUCATIONAL', 'BRAND', 'ANNOUNCEMENT')),
  template_id text not null,
  project_id uuid references public.projects (id) on delete set null,
  title text,
  description text,
  category_label text,
  cta text,
  format text not null default 'instagram-4-5',
  screenshot_url text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.templates (
  id text primary key,
  name text not null,
  description text,
  status text not null default 'coming_soon' check (status in ('ready', 'coming_soon')),
  format text not null default '1080x1350',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

drop trigger if exists set_creatives_updated_at on public.creatives;
create trigger set_creatives_updated_at
before update on public.creatives
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'ADMIN')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.creatives enable row level security;
alter table public.templates enable row level security;

drop policy if exists "studio profiles read" on public.profiles;
create policy "studio profiles read"
on public.profiles for select
to authenticated
using (id = auth.uid());

drop policy if exists "studio projects read" on public.projects;
create policy "studio projects read"
on public.projects for select to authenticated using (true);

drop policy if exists "studio projects write" on public.projects;
create policy "studio projects write"
on public.projects for all to authenticated
using (true)
with check (true);

drop policy if exists "studio creatives read" on public.creatives;
create policy "studio creatives read"
on public.creatives for select to authenticated using (true);

drop policy if exists "studio creatives write" on public.creatives;
create policy "studio creatives write"
on public.creatives for all to authenticated
using (true)
with check (true);

drop policy if exists "studio templates read" on public.templates;
create policy "studio templates read"
on public.templates for select to authenticated using (true);

insert into public.templates (id, name, description, status, format)
values
  ('project-case', 'Project Case', 'Post 4:5 para divulgar um projeto publicado.', 'ready', '1080x1350'),
  ('service', 'Service', 'Post para apresentar um serviço da Bensi Labs.', 'coming_soon', '1080x1350'),
  ('educational', 'Educational', 'Post de insight ou conteúdo educativo.', 'coming_soon', '1080x1350'),
  ('brand', 'Brand / Announcement', 'Post de marca ou anúncio.', 'coming_soon', '1080x1350')
on conflict (id) do nothing;

insert into public.projects (
  name,
  slug,
  category,
  status,
  url,
  image,
  screenshot_desktop,
  thumbnail
)
values
  (
    'Raquel Frizo',
    'raquel-frizo',
    'website',
    'published',
    'https://www.raquelfrizo.com.br/',
    '/projects/raquel-frizo.webp',
    '/projects/raquel-frizo.webp',
    '/projects/raquel-frizo.webp'
  ),
  (
    'Sello Docs',
    'sello-docs',
    'website',
    'published',
    'https://sellodocs.com.br/',
    '/projects/sello-docs.webp',
    '/projects/sello-docs.webp',
    '/projects/sello-docs.webp'
  )
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'studio',
  'studio',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "studio assets read" on storage.objects;
create policy "studio assets read"
on storage.objects for select
to public
using (bucket_id = 'studio');

drop policy if exists "studio assets write" on storage.objects;
create policy "studio assets write"
on storage.objects for insert
to authenticated
with check (bucket_id = 'studio');

-- ============================================================
-- Intake / Studio operations
-- Public site collects intake. Submitted data belongs to Studio.
-- Anon has no read/write on these tables. Intake POST uses service role.
-- ============================================================

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
