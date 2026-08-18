import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStudioSession } from "@/lib/studio/session";
import { getProject, listProjectDocuments } from "@/lib/studio/queries";
import { ProjectForm } from "@/components/studio/ProjectForm";
import { ProjectContext } from "@/components/studio/ProjectContext";
import { StudioPageHeader } from "@/components/studio/ui";

export const metadata: Metadata = { title: "Editar projeto" };

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const { supabase } = await requireStudioSession();
  try {
    const project = await getProject(supabase, id);
    if (!project) notFound();
    const documents = await listProjectDocuments(supabase, project.id);

    return (
      <div>
        <StudioPageHeader
          title={project.name}
          description="Editar projeto."
          action={
            project.briefing_id ? (
              <Link href={`/admin/briefings/${project.briefing_id}`} className="text-sm text-muted hover:text-foreground">
                Ver briefing original
              </Link>
            ) : null
          }
        />
        <ProjectForm project={project} />
        <ProjectContext documents={documents} />
      </div>
    );
  } catch {
    notFound();
  }
}
