import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { deleteCreative, getCreative, updateCreative } from "@/lib/studio/queries";
import { CREATIVE_TYPES, type CreativeType } from "@/lib/studio/types";
import { recordActivity } from "@/lib/studio/activity";

function isCreativeType(value: unknown): value is CreativeType {
  return typeof value === "string" && CREATIVE_TYPES.includes(value as CreativeType);
}

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
    const creative = await getCreative(session.supabase, id);
    if (!creative) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ creative });
  } catch {
    return NextResponse.json({ error: "Unable to load creative" }, { status: 500 });
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
    if (!isCreativeType(body?.type) || !body?.template_id) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const creative = await updateCreative(session.supabase, id, {
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

    await recordActivity({ action: "creative.update", entityType: "creative", entityId: id });
    return NextResponse.json({ creative });
  } catch {
    return NextResponse.json({ error: "Unable to save creative" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deleteCreative(session.supabase, id);
    await recordActivity({ action: "creative.delete", entityType: "creative", entityId: id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete creative" }, { status: 500 });
  }
}
