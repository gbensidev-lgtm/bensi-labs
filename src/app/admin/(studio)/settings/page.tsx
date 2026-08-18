import type { Metadata } from "next";
import { requireStudioSession } from "@/lib/studio/session";
import { StudioPageHeader } from "@/components/studio/ui";

export const metadata: Metadata = { title: "Configurações" };

export default async function SettingsPage() {
  const { user, role } = await requireStudioSession();

  return (
    <div>
      <StudioPageHeader title="Configurações" />

      <dl className="mt-8 max-w-xl divide-y divide-border border border-border">
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <dt className="text-sm text-muted">Conta</dt>
          <dd className="text-sm text-foreground">{user.email}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <dt className="text-sm text-muted">Papel</dt>
          <dd className="font-mono text-sm tracking-[0.12em] text-foreground uppercase">{role}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <dt className="text-sm text-muted">Versão</dt>
          <dd className="font-mono text-sm text-foreground">v0.1</dd>
        </div>
      </dl>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
        Nesta versão o Studio é de uso interno, com um único papel ativo. EDITOR e CLIENT ficam
        reservados para evoluções futuras.
      </p>
    </div>
  );
}
