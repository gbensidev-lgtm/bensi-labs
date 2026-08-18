import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { listClients } from "@/lib/studio/queries";

export async function GET() {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const clients = await listClients(session.supabase);
    return NextResponse.json({ clients });
  } catch {
    return NextResponse.json({ error: "Unable to load clients" }, { status: 500 });
  }
}
