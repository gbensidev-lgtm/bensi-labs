"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StudioButton } from "@/components/studio/ui";

export function BriefingActions({
  id,
  status,
  projectId,
}: {
  id: string;
  status: string;
  projectId?: string | null;
}) {
  const router = useRouter();
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");

  const converted = status === "CONVERTED" || Boolean(projectId);
  const archived = status === "ARCHIVED";

  async function patchStatus(next: string) {
    setError("");
    setPending(next);
    try {
      const response = await fetch(`/api/admin/briefings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!response.ok) {
        setError("Não foi possível atualizar o status.");
        return;
      }
      router.refresh();
    } catch {
      setError("Não foi possível atualizar o status.");
    } finally {
      setPending("");
    }
  }

  async function convert() {
    if (!window.confirm("Converter este briefing em projeto?")) return;
    setError("");
    setPending("convert");
    try {
      const response = await fetch(`/api/admin/briefings/${id}/convert`, { method: "POST" });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.project?.id) {
        setError("Não foi possível converter o briefing.");
        return;
      }
      router.push(`/admin/projects/${body.project.id}`);
      router.refresh();
    } catch {
      setError("Não foi possível converter o briefing.");
    } finally {
      setPending("");
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {status === "NEW" ? (
        <StudioButton
          variant="secondary"
          disabled={Boolean(pending)}
          onClick={() => void patchStatus("REVIEWING")}
        >
          {pending === "REVIEWING" ? "Atualizando…" : "Marcar como em análise"}
        </StudioButton>
      ) : null}

      {!converted && !archived && status !== "REJECTED" ? (
        <StudioButton disabled={Boolean(pending)} onClick={() => void convert()}>
          {pending === "convert" ? "Convertendo…" : "Converter em projeto"}
        </StudioButton>
      ) : null}

      {projectId ? (
        <StudioButton href={`/admin/projects/${projectId}`} variant="secondary">
          Ver projeto
        </StudioButton>
      ) : null}

      {!archived ? (
        <StudioButton
          variant="ghost"
          disabled={Boolean(pending)}
          onClick={() => void patchStatus("ARCHIVED")}
        >
          {pending === "ARCHIVED" ? "Arquivando…" : "Arquivar"}
        </StudioButton>
      ) : null}

      {error ? <p className="w-full text-sm text-[#f3b4b4]">{error}</p> : null}
    </div>
  );
}
