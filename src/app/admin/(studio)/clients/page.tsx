import type { Metadata } from "next";
import Link from "next/link";
import { requireStudioSession } from "@/lib/studio/session";
import { listClients } from "@/lib/studio/queries";
import { StudioPageHeader } from "@/components/studio/ui";
import type { Client } from "@/lib/studio/types";

export const metadata: Metadata = { title: "Clientes" };

export default async function ClientsPage() {
  const { supabase } = await requireStudioSession();
  let clients: Client[] = [];

  try {
    clients = await listClients(supabase);
  } catch {
    clients = [];
  }

  return (
    <div>
      <StudioPageHeader
        title="Clientes"
        description="Empresas e responsáveis originados do intake. Um cliente pode ter vários briefings e projetos."
      />

      {clients.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Nenhum cliente cadastrado ainda.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-surface font-mono text-xs tracking-[0.14em] text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium">Responsável</th>
                <th className="px-4 py-3 font-medium">E-mail</th>
                <th className="px-4 py-3 font-medium">Segmento</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">
                    <Link href={`/admin/clients/${client.id}`} className="font-medium text-foreground hover:text-primary">
                      {client.company_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{client.contact_name}</td>
                  <td className="px-4 py-3 text-muted">{client.email}</td>
                  <td className="px-4 py-3 text-muted">{client.segment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
