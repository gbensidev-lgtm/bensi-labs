import type { Metadata } from "next";
import Link from "next/link";
import { requireStudioSession } from "@/lib/studio/session";
import { listBriefings } from "@/lib/studio/queries";
import { BRIEFING_STATUS_LABELS, PROJECT_TYPE_LABELS, isBriefingStatus, isProjectType } from "@/lib/intake/types";
import { StudioPageHeader } from "@/components/studio/ui";
import { cn } from "@/lib/utils";
import type { Briefing } from "@/lib/studio/types";

export const metadata: Metadata = { title: "Briefings" };

const FILTERS = [
  { href: "/admin/briefings", label: "Todos", status: "" },
  { href: "/admin/briefings?status=NEW", label: "Novos", status: "NEW" },
  { href: "/admin/briefings?status=REVIEWING", label: "Em análise", status: "REVIEWING" },
  { href: "/admin/briefings?status=QUALIFIED", label: "Qualificados", status: "QUALIFIED" },
  { href: "/admin/briefings?status=CONVERTED", label: "Convertidos", status: "CONVERTED" },
  { href: "/admin/briefings?status=ARCHIVED", label: "Arquivados", status: "ARCHIVED" },
];

type BriefingsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function BriefingsPage({ searchParams }: BriefingsPageProps) {
  const { status } = await searchParams;
  const filter = status && isBriefingStatus(status) ? status : undefined;
  const { supabase } = await requireStudioSession();
  let briefings: Briefing[] = [];

  try {
    briefings = await listBriefings(supabase, filter);
  } catch {
    briefings = [];
  }

  return (
    <div>
      <StudioPageHeader
        title="Briefings"
        description="Intake recebido pelo site público. Os dados pertencem ao Studio."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const active = (filter ?? "") === item.status;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full border px-3 text-sm",
                active
                  ? "border-primary bg-primary/12 text-foreground"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {briefings.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Nenhum briefing neste filtro.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-surface font-mono text-xs tracking-[0.14em] text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {briefings.map((briefing) => (
                <tr key={briefing.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">
                    <Link href={`/admin/briefings/${briefing.id}`} className="font-medium text-foreground hover:text-primary">
                      {briefing.client?.company_name ?? "Cliente"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {isProjectType(briefing.project_type)
                      ? PROJECT_TYPE_LABELS[briefing.project_type]
                      : briefing.project_type}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {isBriefingStatus(briefing.status)
                      ? BRIEFING_STATUS_LABELS[briefing.status]
                      : briefing.status}
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
