import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { createCreative, listCreatives } from "@/lib/studio/queries";
import { CREATIVE_TYPES, type CreativeType } from "@/lib/studio/types";
import { recordActivity } from "@/lib/studio/activity";

function isCreativeType(value: unknown): value is CreativeType {
  return typeof value === "string" && CREATIVE_TYPES.includes(value as CreativeType);
}

export async function GET() {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const creatives = await listCreatives(session.supabase);
    return NextResponse.json({ creatives });
  } catch {
    return NextResponse.json({ error: "Unable to load creatives" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!isCreativeType(body?.type) || !body?.template_id) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const creative = await createCreative(session.supabase, {
      type: body.type,
      template_id: body.template_id,
      project_id: body.project_id,
      title: body.title,
      description: body.description,
      category_label: body.category_label,
      cta: body.cta,
      format: body.format,
      screenshot_url: body.screenshot_url,
      payload: body.payload,
    });

    await recordActivity({ action: "creative.create", entityType: "creative", entityId: creative.id });
    return NextResponse.json({ creative }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save creative" }, { status: 500 });
  }
}
