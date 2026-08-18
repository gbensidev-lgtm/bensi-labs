import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { listTemplates } from "@/lib/studio/queries";

export async function GET() {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const templates = await listTemplates(session.supabase);
    return NextResponse.json({ templates });
  } catch {
    return NextResponse.json({ error: "Unable to load templates" }, { status: 500 });
  }
}
