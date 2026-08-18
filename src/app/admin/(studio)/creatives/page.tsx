import type { Metadata } from "next";
import Link from "next/link";
import { requireStudioSession } from "@/lib/studio/session";
import { listCreatives, listProjects } from "@/lib/studio/queries";
import { CREATIVE_TYPE_LABELS, type Creative, type Project } from "@/lib/studio/types";
import { StudioButton, StudioPageHeader } from "@/components/studio/ui";

export const metadata: Metadata = { title: "Criativos" };

export default async function CreativesPage() {
  const { supabase } = await requireStudioSession();
  let creatives: Creative[] = [];
  let projects: Project[] = [];

  try {
    [creatives, projects] = await Promise.all([listCreatives(supabase), listProjects(supabase)]);
  } catch {
    creatives = [];
    projects = [];
  }

  const projectName = (id: string | null) => projects.find((project) => project.id === id)?.name ?? "—";

  return (
    <div>
      <StudioPageHeader
        title="Criativos"
        description="Crie materiais visuais para divulgar os projetos e serviços da Bensi Labs."
        action={<StudioButton href="/admin/creatives/new">Novo criativo</StudioButton>}
      />

      {creatives.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Nenhum criativo gerado ainda.</p>
      ) : (
        <ul className="mt-8 divide-y divide-border border border-border">
          {creatives.map((creative) => (
            <li key={creative.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div>
                <p className="font-medium text-foreground">
                  {creative.title || projectName(creative.project_id)}
                </p>
                <p className="mt-1 font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  {CREATIVE_TYPE_LABELS[creative.type]}
                </p>
              </div>
              <Link href={`/admin/creatives/${creative.id}`} className="text-sm text-muted hover:text-foreground">
                Editar
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
