import { NextResponse } from "next/server";
import { buildProjectDocuments } from "@/lib/intake/context";
import { parseAnswers } from "@/lib/intake/parse";
import { isProjectType } from "@/lib/intake/types";
import { getStudioSession } from "@/lib/studio/session";
import {
  createProject,
  createProjectDocuments,
  getBriefing,
  getProjectByBriefing,
  listProjectDocuments,
  uniqueProjectSlug,
  updateBriefingStatus,
} from "@/lib/studio/queries";
import type { ProjectCategory } from "@/lib/studio/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function categoryFromType(type: string): ProjectCategory {
  if (type === "website") return "website";
  if (type === "landing") return "landing";
  if (type === "application") return "application";
  if (type === "ai") return "ai";
  return "other";
}

export async function POST(_request: Request, context: RouteContext) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const briefing = await getBriefing(session.supabase, id);
    if (!briefing || !briefing.client) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (briefing.status === "ARCHIVED" || briefing.status === "REJECTED") {
      return NextResponse.json({ error: "Briefing cannot be converted" }, { status: 409 });
    }

    if (!isProjectType(briefing.project_type)) {
      return NextResponse.json({ error: "Invalid briefing" }, { status: 400 });
    }

    const answers = parseAnswers(briefing.answers);
    const existing = await getProjectByBriefing(session.supabase, briefing.id);
    if (existing) {
      const documents = await listProjectDocuments(session.supabase, existing.id);
      if (!documents.length) {
        await createProjectDocuments(
          session.supabase,
          existing.id,
          buildProjectDocuments({
            client: briefing.client,
            projectType: briefing.project_type,
            status: briefing.status,
            answers,
          }),
        );
      }
      const updated =
        briefing.status === "CONVERTED"
          ? briefing
          : await updateBriefingStatus(session.supabase, briefing.id, "CONVERTED");
      return NextResponse.json({ project: existing, briefing: updated }, { status: 200 });
    }
    const slug = await uniqueProjectSlug(session.supabase, briefing.client.company_name);
    const description =
      answers.problem.desiredResult.trim() || answers.problem.problem.trim() || null;

    const project = await createProject(session.supabase, {
      name: briefing.client.company_name,
      slug,
      description,
      category: categoryFromType(briefing.project_type),
      status: "draft",
      client_id: briefing.client_id,
      briefing_id: briefing.id,
    });

    await createProjectDocuments(
      session.supabase,
      project.id,
      buildProjectDocuments({
        client: briefing.client,
        projectType: briefing.project_type,
        status: briefing.status,
        answers,
      }),
    );

    const updated = await updateBriefingStatus(session.supabase, briefing.id, "CONVERTED");
    return NextResponse.json({ project, briefing: updated }, { status: 201 });
  } catch (error) {
    console.error("[briefing.convert]", error);
    return NextResponse.json({ error: "Unable to convert briefing" }, { status: 500 });
  }
}
