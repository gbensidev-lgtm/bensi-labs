import type { Metadata } from "next";
import Link from "next/link";
import { requireStudioSession } from "@/lib/studio/session";
import { listBriefings, listClients, listCreatives, listProjects } from "@/lib/studio/queries";
import { CATEGORY_LABELS, STATUS_LABELS, type Briefing, type Client, type Creative, type Project } from "@/lib/studio/types";
import { StudioButton, StudioPageHeader } from "@/components/studio/ui";

export const metadata: Metadata = { title: "Dashboard" };

async function loadDashboard() {
  const { supabase } = await requireStudioSession();

  const [projects, creatives, briefings, clients] = await Promise.all([
    listProjects(supabase).catch(() => [] as Project[]),
    listCreatives(supabase).catch(() => [] as Creative[]),
    listBriefings(supabase).catch(() => [] as Briefing[]),
    listClients(supabase).catch(() => [] as Client[]),
  ]);

  return { projects, creatives, briefings, clients };
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border bg-surface px-5 py-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-3 font-mono text-4xl tracking-tight text-foreground">{value}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const { projects, creatives, briefings, clients } = await loadDashboard();
  const recent = projects.slice(-5).reverse();
  const newBriefings = briefings.filter((briefing) => briefing.status === "NEW").length;

  return (
    <div>
      <StudioPageHeader title="Dashboard" />

      <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Projetos" value={projects.length} />
        <Metric label="Briefings novos" value={newBriefings} />
        <Metric label="Clientes" value={clients.length} />
        <Metric label="Criativos" value={creatives.length} />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Projetos recentes</h2>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nenhum projeto cadastrado ainda.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border border-border">
            {recent.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-surface"
                >
                  <span className="font-medium text-foreground">{project.name}</span>
                  <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                    {CATEGORY_LABELS[project.category]} · {STATUS_LABELS[project.status]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Ações rápidas</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <StudioButton href="/admin/briefings">Ver briefings</StudioButton>
          <StudioButton href="/admin/projects/new" variant="secondary">
            Novo projeto
          </StudioButton>
          <StudioButton href="/admin/clients" variant="ghost">
            Ver clientes
          </StudioButton>
          <StudioButton href="/admin/creatives/new" variant="ghost">
            Novo criativo
          </StudioButton>
        </div>
      </section>
    </div>
  );
}
