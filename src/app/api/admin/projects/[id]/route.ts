import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { getProject, updateProject } from "@/lib/studio/queries";
import { PROJECT_CATEGORIES, PROJECT_STATUSES, type ProjectCategory, type ProjectStatus } from "@/lib/studio/types";

function isCategory(value: unknown): value is ProjectCategory {
  return typeof value === "string" && PROJECT_CATEGORIES.includes(value as ProjectCategory);
}

function isStatus(value: unknown): value is ProjectStatus {
  return typeof value === "string" && PROJECT_STATUSES.includes(value as ProjectStatus);
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
    const project = await getProject(session.supabase, id);
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Unable to load project" }, { status: 500 });
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
    if (!body?.name || !isCategory(body.category) || !isStatus(body.status)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const project = await updateProject(session.supabase, id, {
      name: body.name,
      slug: body.slug,
      description: body.description,
      category: body.category,
      status: body.status,
      url: body.url,
      image: body.image,
      screenshot_desktop: body.screenshot_desktop,
      screenshot_mobile: body.screenshot_mobile,
      thumbnail: body.thumbnail,
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
    });

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Unable to save project" }, { status: 500 });
  }
}
