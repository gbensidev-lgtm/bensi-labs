import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { canAccessStudio, type StudioRole } from "@/lib/studio/roles";

export async function getStudioSession() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile?.role as StudioRole | undefined) ?? "ADMIN";

  if (!canAccessStudio(role)) return null;

  return { supabase, user, role };
}

export async function requireStudioSession() {
  const session = await getStudioSession();
  if (!session) redirect("/admin/login");
  return session;
}
