import { NextResponse } from "next/server";
import { emptyAnswers, isProjectType } from "@/lib/intake/types";
import { parseAnswers } from "@/lib/intake/parse";
import { sanitizeAnswers, validateStep } from "@/lib/intake/validate";
import { createBriefing, upsertClient } from "@/lib/studio/queries";
import { createServiceClient } from "@/lib/supabase/admin";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const hits = new Map<string, number[]>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function tooMany(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Intake unavailable" }, { status: 503 });
  }

  if (tooMany(clientKey(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  if (typeof payload.website_confirm === "string" && payload.website_confirm.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (!isProjectType(payload.projectType)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const answers = sanitizeAnswers({
    ...emptyAnswers(),
    ...parseAnswers(payload.answers),
  });

  for (let step = 0; step <= 3; step += 1) {
    const error = validateStep(step, payload.projectType, answers);
    if (error) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
  }

  try {
    const client = await upsertClient(supabase, {
      company_name: answers.company.companyName,
      contact_name: answers.company.contactName,
      email: answers.company.email,
      phone: answers.company.phone,
      website: answers.company.website,
      instagram: answers.company.instagram,
      segment: answers.company.segment,
    });

    await createBriefing(supabase, {
      client_id: client.id,
      project_type: payload.projectType,
      answers,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[intake]", error);
    return NextResponse.json({ error: "Unable to save briefing" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
