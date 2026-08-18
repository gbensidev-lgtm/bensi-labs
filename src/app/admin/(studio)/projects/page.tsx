import type { Metadata } from "next";
import Link from "next/link";
import { requireStudioSession } from "@/lib/studio/session";
import { listProjects } from "@/lib/studio/queries";
import { CATEGORY_LABELS, STATUS_LABELS, type Project } from "@/lib/studio/types";
import { StudioButton, StudioPageHeader } from "@/components/studio/ui";

export const metadata: Metadata = { title: "Projetos" };

export default async function ProjectsPage() {
  const { supabase } = await requireStudioSession();
  let projects: Project[] = [];

  try {
    projects = await listProjects(supabase);
  } catch {
    projects = [];
  }

  return (
    <div>
      <StudioPageHeader
        title="Projetos"
        description="Projetos reais da Bensi Labs."
        action={<StudioButton href="/admin/projects/new">Novo projeto</StudioButton>}
      />

      {projects.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Nenhum projeto cadastrado ainda.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-surface font-mono text-xs tracking-[0.14em] text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">URL</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">
                    <Link href={`/admin/projects/${project.id}`} className="font-medium text-foreground hover:text-primary">
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{CATEGORY_LABELS[project.category]}</td>
                  <td className="px-4 py-3 text-muted">{STATUS_LABELS[project.status]}</td>
                  <td className="px-4 py-3">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-foreground"
                      >
                        {project.url.replace(/^https?:\/\//, "")}
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
