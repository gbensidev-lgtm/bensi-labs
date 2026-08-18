import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { listBriefings } from "@/lib/studio/queries";
import { isBriefingStatus } from "@/lib/intake/types";

export async function GET(request: Request) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const briefings = await listBriefings(
      session.supabase,
      status && isBriefingStatus(status) ? status : undefined,
    );
    return NextResponse.json({ briefings });
  } catch {
    return NextResponse.json({ error: "Unable to load briefings" }, { status: 500 });
  }
}
