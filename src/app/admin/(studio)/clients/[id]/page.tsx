import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioPageHeader } from "@/components/studio/ui";
import { BRIEFING_STATUS_LABELS, PROJECT_TYPE_LABELS, isBriefingStatus, isProjectType } from "@/lib/intake/types";
import { getClient, listBriefingsByClient, listProjectsByClient } from "@/lib/studio/queries";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/studio/types";
import { requireStudioSession } from "@/lib/studio/session";

export const metadata: Metadata = { title: "Cliente" };

type ClientDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;
  const { supabase } = await requireStudioSession();

  try {
    const client = await getClient(supabase, id);
    if (!client) notFound();

    const [briefings, projects] = await Promise.all([
      listBriefingsByClient(supabase, client.id),
      listProjectsByClient(supabase, client.id),
    ]);

    return (
      <div>
        <StudioPageHeader title={client.company_name} description={client.segment} />

        <dl className="mt-8 max-w-xl divide-y divide-border border border-border">
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <dt className="text-sm text-muted">Responsável</dt>
            <dd className="text-sm text-foreground">{client.contact_name}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <dt className="text-sm text-muted">E-mail</dt>
            <dd className="text-sm text-foreground">{client.email}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <dt className="text-sm text-muted">Telefone</dt>
            <dd className="text-sm text-foreground">{client.phone}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <dt className="text-sm text-muted">Site</dt>
            <dd className="text-sm text-foreground">{client.website || "—"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <dt className="text-sm text-muted">Instagram</dt>
            <dd className="text-sm text-foreground">{client.instagram || "—"}</dd>
          </div>
        </dl>

        <section className="mt-10">
          <h2 className="text-lg font-medium text-foreground">Briefings</h2>
          {briefings.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nenhum briefing.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border border border-border">
              {briefings.map((briefing) => (
                <li key={briefing.id}>
                  <Link
                    href={`/admin/briefings/${briefing.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 hover:bg-surface"
                  >
                    <span className="text-sm text-foreground">
                      {isProjectType(briefing.project_type)
                        ? PROJECT_TYPE_LABELS[briefing.project_type]
                        : briefing.project_type}
                    </span>
                    <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                      {isBriefingStatus(briefing.status)
                        ? BRIEFING_STATUS_LABELS[briefing.status]
                        : briefing.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium text-foreground">Projetos</h2>
          {projects.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nenhum projeto convertido ainda.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border border border-border">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 hover:bg-surface"
                  >
                    <span className="text-sm text-foreground">{project.name}</span>
                    <span className="font-mono text-xs tracking-[0.12em] text-muted uppercase">
                      {CATEGORY_LABELS[project.category]} · {STATUS_LABELS[project.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  } catch {
    notFound();
  }
}
