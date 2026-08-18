import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { getBriefing, updateBriefingStatus } from "@/lib/studio/queries";
import { isBriefingStatus } from "@/lib/intake/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const briefing = await getBriefing(session.supabase, id);
    if (!briefing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ briefing });
  } catch {
    return NextResponse.json({ error: "Unable to load briefing" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    if (!isBriefingStatus(body?.status)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const briefing = await updateBriefingStatus(session.supabase, id, body.status);
    return NextResponse.json({ briefing });
  } catch {
    return NextResponse.json({ error: "Unable to update briefing" }, { status: 500 });
  }
}
