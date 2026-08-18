import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireStudioSession } from "@/lib/studio/session";
import { getCreative, listProjects } from "@/lib/studio/queries";
import { CreativeComposer } from "@/components/studio/CreativeComposer";
import { DeleteCreativeButton } from "@/components/studio/DeleteCreativeButton";
import { StudioPageHeader } from "@/components/studio/ui";
import type { Project } from "@/lib/studio/types";

export const metadata: Metadata = { title: "Editar criativo" };

type EditCreativePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCreativePage({ params }: EditCreativePageProps) {
  const { id } = await params;
  const { supabase } = await requireStudioSession();
  let projects: Project[] = [];

  try {
    projects = await listProjects(supabase);
  } catch {
    projects = [];
  }

  const creative = await getCreative(supabase, id).catch(() => null);
  if (!creative) notFound();

  return (
    <div>
      <StudioPageHeader
        title="Editar criativo"
        description="Ajuste o conteúdo, gere de novo a prévia e exporte o PNG."
        action={<DeleteCreativeButton id={creative.id} />}
      />
      <CreativeComposer projects={projects} creative={creative} />
    </div>
  );
}
