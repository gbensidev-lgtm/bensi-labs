import type { Metadata } from "next";
import { ProjectForm } from "@/components/studio/ProjectForm";
import { StudioPageHeader } from "@/components/studio/ui";

export const metadata: Metadata = { title: "Novo projeto" };

export default function NewProjectPage() {
  return (
    <div>
      <StudioPageHeader title="Novo projeto" />
      <ProjectForm />
    </div>
  );
}
