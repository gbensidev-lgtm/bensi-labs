import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefingActions } from "@/components/studio/BriefingActions";
import { BriefingView } from "@/components/studio/BriefingView";
import { StudioPageHeader } from "@/components/studio/ui";
import { parseAnswers } from "@/lib/intake/parse";
import { BRIEFING_STATUS_LABELS, PROJECT_TYPE_LABELS, isBriefingStatus, isProjectType } from "@/lib/intake/types";
import { getBriefing, getProjectByBriefing } from "@/lib/studio/queries";
import { requireStudioSession } from "@/lib/studio/session";

export const metadata: Metadata = { title: "Briefing" };

type BriefingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BriefingDetailPage({ params }: BriefingDetailPageProps) {
  const { id } = await params;
  const { supabase } = await requireStudioSession();

  try {
    const briefing = await getBriefing(supabase, id);
    if (!briefing) notFound();

    const project = await getProjectByBriefing(supabase, briefing.id);
    const company = briefing.client?.company_name ?? "Briefing";
    const typeLabel = isProjectType(briefing.project_type)
      ? PROJECT_TYPE_LABELS[briefing.project_type]
      : briefing.project_type;
    const statusLabel = isBriefingStatus(briefing.status)
      ? BRIEFING_STATUS_LABELS[briefing.status]
      : briefing.status;

    return (
      <div>
        <StudioPageHeader
          title={company}
          description={`${typeLabel} · ${statusLabel}`}
          action={
            briefing.client ? (
              <Link href={`/admin/clients/${briefing.client.id}`} className="text-sm text-muted hover:text-foreground">
                Ver cliente
              </Link>
            ) : null
          }
        />

        <p className="mt-6 font-mono text-xs tracking-[0.16em] text-muted uppercase">Status: {statusLabel}</p>

        <div className="mt-6">
          <BriefingActions id={briefing.id} status={briefing.status} projectId={project?.id} />
        </div>

        <BriefingView answers={parseAnswers(briefing.answers)} projectType={briefing.project_type} />
      </div>
    );
  } catch {
    notFound();
  }
}
