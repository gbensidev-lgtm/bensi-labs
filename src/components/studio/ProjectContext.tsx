import type { ProjectDocument } from "@/lib/studio/types";
import { DownloadContextButton } from "@/components/studio/DownloadContextButton";

export function ProjectContext({
  projectId,
  documents,
}: {
  projectId: string;
  documents: ProjectDocument[];
}) {
  if (!documents.length) {
    return (
      <section className="mt-12">
        <h2 className="text-lg font-medium text-foreground">Project Context</h2>
        <p className="mt-3 text-sm text-muted">
          Este projeto ainda não possui documentação interna. O contexto é gerado ao converter um briefing.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">Project Context</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Fonte de verdade para o desenvolvimento. Baixe o zip, extraia e abra a pasta no Cursor.
          </p>
        </div>
        <DownloadContextButton projectId={projectId} />
      </div>
      <div className="mt-6 space-y-3">
        {documents.map((document) => (
          <details key={document.id} className="border border-border bg-surface/40 px-4 py-3">
            <summary className="cursor-pointer font-mono text-sm tracking-[0.08em] text-foreground">
              {document.title}
            </summary>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted">
              {document.content}
            </pre>
          </details>
        ))}
      </div>
    </section>
  );
}
