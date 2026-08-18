import { requireStudioSession } from "@/lib/studio/session";
import { StudioShell } from "@/components/studio/StudioShell";

export const dynamic = "force-dynamic";

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  await requireStudioSession();
  return <StudioShell>{children}</StudioShell>;
}
