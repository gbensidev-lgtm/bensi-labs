import { NextResponse } from "next/server";
import { getStudioSession } from "@/lib/studio/session";

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const session = await getStudioSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type) || file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `screenshots/${crypto.randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await session.supabase.storage.from("studio").upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ error: "Unable to upload" }, { status: 500 });
    }

    const { data } = session.supabase.storage.from("studio").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch {
    return NextResponse.json({ error: "Unable to upload" }, { status: 500 });
  }
}
