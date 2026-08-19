import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";
import { getProject, listProjectDocuments } from "@/lib/studio/queries";
import { buildContextPack } from "@/lib/studio/context-pack";
import { zipStore } from "@/lib/studio/zip";

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

    const documents = await listProjectDocuments(session.supabase, project.id);
    if (!documents.length) {
      return NextResponse.json({ error: "No project context" }, { status: 404 });
    }

    const zip = zipStore(buildContextPack(project, documents));
    const filename = `${project.slug || "projeto"}-context.zip`;

    return new NextResponse(new Uint8Array(zip), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to export context" }, { status: 500 });
  }
}
