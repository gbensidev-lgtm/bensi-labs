"use client";

import { useState } from "react";
import { StudioButton } from "@/components/studio/ui";

export function DownloadContextButton({ projectId }: { projectId: string }) {
  const [error, setError] = useState("");

  async function download() {
    setError("");
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/context`);
      if (!response.ok) {
        setError("Não foi possível baixar o contexto.");
        return;
      }

      const blob = await response.blob();
      const header = response.headers.get("Content-Disposition");
      const match = header?.match(/filename="([^"]+)"/);
      const filename = match?.[1] || "project-context.zip";
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Não foi possível baixar o contexto.");
    }
  }

  return (
    <div>
      <StudioButton variant="secondary" onClick={() => void download()}>
        Baixar contexto
      </StudioButton>
      {error ? <p className="mt-2 text-sm text-[#f3b4b4]">{error}</p> : null}
    </div>
  );
}
