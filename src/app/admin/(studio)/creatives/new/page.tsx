import type { Metadata } from "next";
import { requireStudioSession } from "@/lib/studio/session";
import { listProjects } from "@/lib/studio/queries";
import { CreativeComposer } from "@/components/studio/CreativeComposer";
import { StudioPageHeader } from "@/components/studio/ui";
import { CREATIVE_TYPES, type CreativeType, type Project } from "@/lib/studio/types";

export const metadata: Metadata = { title: "Novo criativo" };

type NewCreativePageProps = {
  searchParams: Promise<{ type?: string }>;
};

function isCreativeType(value: string | undefined): value is CreativeType {
  return Boolean(value && CREATIVE_TYPES.includes(value as CreativeType));
}

export default async function NewCreativePage({ searchParams }: NewCreativePageProps) {
  const { type } = await searchParams;
  const initialType = isCreativeType(type) ? type : "PROJECT";
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
        title="Novo criativo"
        description="Escolha o template, preencha os dados e exporte em 1080 × 1350."
      />
      <CreativeComposer projects={projects} initialType={initialType} />
    </div>
  );
}
