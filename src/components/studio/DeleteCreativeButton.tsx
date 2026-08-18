"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { StudioButton } from "@/components/studio/ui";

export function DeleteCreativeButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onDelete() {
    const confirmed = window.confirm("Excluir este criativo? Esta ação não pode ser desfeita.");
    if (!confirmed) return;

    setPending(true);
    const response = await fetch(`/api/admin/creatives/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setPending(false);
      return;
    }

    router.push("/admin/creatives");
    router.refresh();
  }

  return (
    <StudioButton variant="danger" onClick={onDelete} disabled={pending}>
      {pending ? "Excluindo…" : "Excluir"}
    </StudioButton>
  );
}
