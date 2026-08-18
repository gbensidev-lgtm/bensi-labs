import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/studio/slug";
import type {
  Briefing,
  Client,
  Creative,
  CreativeInput,
  Project,
  ProjectDocument,
  ProjectDocumentInput,
  ProjectInput,
  Template,
} from "@/lib/studio/types";

export async function listProjects(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function getProject(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Project | null) ?? null;
}

export async function createProject(supabase: SupabaseClient, input: ProjectInput) {
  const slug = slugify(input.slug || input.name);
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: input.name.trim(),
      slug,
      description: input.description?.trim() || null,
      category: input.category,
      status: input.status,
      url: input.url?.trim() || null,
      image: input.image?.trim() || null,
      screenshot_desktop: input.screenshot_desktop?.trim() || input.image?.trim() || null,
      screenshot_mobile: input.screenshot_mobile?.trim() || null,
      thumbnail: input.thumbnail?.trim() || input.image?.trim() || null,
      technologies: input.technologies ?? [],
      client_id: input.client_id || null,
      briefing_id: input.briefing_id || null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Project;
}

export async function updateProject(supabase: SupabaseClient, id: string, input: ProjectInput) {
  const slug = slugify(input.slug || input.name);
  const { data, error } = await supabase
    .from("projects")
    .update({
      name: input.name.trim(),
      slug,
      description: input.description?.trim() || null,
      category: input.category,
      status: input.status,
      url: input.url?.trim() || null,
      image: input.image?.trim() || null,
      screenshot_desktop: input.screenshot_desktop?.trim() || null,
      screenshot_mobile: input.screenshot_mobile?.trim() || null,
      thumbnail: input.thumbnail?.trim() || null,
      technologies: input.technologies ?? [],
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Project;
}

export async function listCreatives(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("creatives")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Creative[];
}

export async function createCreative(supabase: SupabaseClient, input: CreativeInput) {
  const { data, error } = await supabase
    .from("creatives")
    .insert({
      type: input.type,
      template_id: input.template_id,
      project_id: input.project_id || null,
      title: input.title?.trim() || null,
      description: input.description?.trim() || null,
      category_label: input.category_label?.trim() || null,
      cta: input.cta?.trim() || null,
      format: input.format || "instagram-4-5",
      screenshot_url: input.screenshot_url?.trim() || null,
      payload: input.payload ?? {},
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as Creative;
}

export async function getCreative(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("creatives").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Creative | null) ?? null;
}

export async function updateCreative(supabase: SupabaseClient, id: string, input: CreativeInput) {
  const { data, error } = await supabase
    .from("creatives")
    .update({
      type: input.type,
      template_id: input.template_id,
      project_id: input.project_id || null,
      title: input.title?.trim() || null,
      description: input.description?.trim() || null,
      category_label: input.category_label?.trim() || null,
      cta: input.cta?.trim() || null,
      format: input.format || "instagram-4-5",
      screenshot_url: input.screenshot_url?.trim() || null,
      payload: input.payload ?? {},
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Creative;
}

export async function deleteCreative(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from("creatives").delete().eq("id", id);
  if (error) throw error;
}

export async function listTemplates(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("templates").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Template[];
}

export async function listClients(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Client[];
}

export async function getClient(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Client | null) ?? null;
}

export async function findClientByEmail(supabase: SupabaseClient, email: string) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .ilike("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error) throw error;
  return (data as Client | null) ?? null;
}

export async function upsertClient(
  supabase: SupabaseClient,
  input: {
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
    website?: string | null;
    instagram?: string | null;
    segment: string;
  },
) {
  const email = input.email.trim().toLowerCase();
  const existing = await findClientByEmail(supabase, email);
  const payload = {
    company_name: input.company_name.trim(),
    contact_name: input.contact_name.trim(),
    email,
    phone: input.phone.trim(),
    website: input.website?.trim() || null,
    instagram: input.instagram?.trim() || null,
    segment: input.segment.trim(),
  };

  if (existing) {
    const { data, error } = await supabase
      .from("clients")
      .update(payload)
      .eq("id", existing.id)
      .select("*")
      .single();
    if (error) throw error;
    return data as Client;
  }

  const { data, error } = await supabase.from("clients").insert(payload).select("*").single();
  if (error) throw error;
  return data as Client;
}

export async function listBriefings(supabase: SupabaseClient, status?: string) {
  let query = supabase
    .from("briefings")
    .select("*, client:clients(*)")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Briefing[];
}

export async function getBriefing(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from("briefings")
    .select("*, client:clients(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data as Briefing | null) ?? null;
}

export async function listBriefingsByClient(supabase: SupabaseClient, clientId: string) {
  const { data, error } = await supabase
    .from("briefings")
    .select("*, client:clients(*)")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Briefing[];
}

export async function listProjectsByClient(supabase: SupabaseClient, clientId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function createBriefing(
  supabase: SupabaseClient,
  input: {
    client_id: string;
    project_type: string;
    answers: Record<string, unknown>;
  },
) {
  const { data, error } = await supabase
    .from("briefings")
    .insert({
      client_id: input.client_id,
      project_type: input.project_type,
      status: "NEW",
      answers: input.answers,
    })
    .select("*, client:clients(*)")
    .single();

  if (error) throw error;
  return data as Briefing;
}

export async function updateBriefingStatus(
  supabase: SupabaseClient,
  id: string,
  status: string,
) {
  const { data, error } = await supabase
    .from("briefings")
    .update({ status })
    .eq("id", id)
    .select("*, client:clients(*)")
    .single();

  if (error) throw error;
  return data as Briefing;
}

export async function getProjectByBriefing(supabase: SupabaseClient, briefingId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("briefing_id", briefingId)
    .maybeSingle();

  if (error) throw error;
  return (data as Project | null) ?? null;
}

export async function uniqueProjectSlug(supabase: SupabaseClient, name: string) {
  const base = slugify(name) || "projeto";
  let slug = base;

  for (let index = 2; index < 50; index += 1) {
    const { data, error } = await supabase.from("projects").select("id").eq("slug", slug).maybeSingle();
    if (error) throw error;
    if (!data) return slug;
    slug = `${base}-${index}`;
  }

  return `${base}-${Date.now().toString(36)}`;
}

export async function listProjectDocuments(supabase: SupabaseClient, projectId: string) {
  const { data, error } = await supabase
    .from("project_documents")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProjectDocument[];
}

export async function createProjectDocuments(
  supabase: SupabaseClient,
  projectId: string,
  documents: ProjectDocumentInput[],
) {
  const { data, error } = await supabase
    .from("project_documents")
    .insert(
      documents.map((document) => ({
        project_id: projectId,
        slug: document.slug,
        title: document.title,
        content: document.content,
      })),
    )
    .select("*");

  if (error) throw error;
  return (data ?? []) as ProjectDocument[];
}

