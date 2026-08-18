export const PROJECT_STATUSES = ["draft", "development", "published", "archived"] as const;
export const PROJECT_CATEGORIES = [
  "website",
  "landing",
  "application",
  "ai",
  "automation",
  "other",
] as const;
export const CREATIVE_TYPES = [
  "PROJECT",
  "SERVICE",
  "EDUCATIONAL",
  "BRAND",
  "ANNOUNCEMENT",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type CreativeType = (typeof CREATIVE_TYPES)[number];

export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: ProjectCategory;
  status: ProjectStatus;
  url: string | null;
  image: string | null;
  screenshot_desktop: string | null;
  screenshot_mobile: string | null;
  thumbnail: string | null;
  technologies: string[];
  client_id: string | null;
  briefing_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Client = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  website: string | null;
  instagram: string | null;
  segment: string;
  created_at: string;
  updated_at: string;
};

export type Briefing = {
  id: string;
  client_id: string;
  project_type: string;
  status: string;
  answers: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  client?: Client;
};

export const PROJECT_DOCUMENT_SLUGS = [
  "PROJECT",
  "REQUIREMENTS",
  "DESIGN",
  "CONTENT",
  "INTEGRATIONS",
  "USER-FLOWS",
  "DECISIONS",
  "TODO",
] as const;

export type ProjectDocumentSlug = (typeof PROJECT_DOCUMENT_SLUGS)[number];

export type ProjectDocument = {
  id: string;
  project_id: string;
  slug: ProjectDocumentSlug;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ProjectDocumentInput = {
  slug: ProjectDocumentSlug;
  title: string;
  content: string;
};

export type Creative = {
  id: string;
  type: CreativeType;
  template_id: string;
  project_id: string | null;
  title: string | null;
  description: string | null;
  category_label: string | null;
  cta: string | null;
  format: string;
  screenshot_url: string | null;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type Template = {
  id: string;
  name: string;
  description: string | null;
  status: "ready" | "coming_soon";
  format: string;
  created_at: string;
};

export type ProjectInput = {
  name: string;
  slug?: string;
  description?: string | null;
  category: ProjectCategory;
  status: ProjectStatus;
  url?: string | null;
  image?: string | null;
  screenshot_desktop?: string | null;
  screenshot_mobile?: string | null;
  thumbnail?: string | null;
  technologies?: string[];
  client_id?: string | null;
  briefing_id?: string | null;
};

export type CreativeInput = {
  type: CreativeType;
  template_id: string;
  project_id?: string | null;
  title?: string | null;
  description?: string | null;
  category_label?: string | null;
  cta?: string | null;
  format?: string;
  screenshot_url?: string | null;
  payload?: Record<string, unknown>;
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Rascunho",
  development: "Em desenvolvimento",
  published: "Publicado",
  archived: "Arquivado",
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  website: "Website",
  landing: "Landing",
  application: "Application",
  ai: "AI",
  automation: "Automation",
  other: "Other",
};

export const CREATIVE_TYPE_LABELS: Record<CreativeType, string> = {
  PROJECT: "Project Case",
  SERVICE: "Service",
  EDUCATIONAL: "Educational",
  BRAND: "Brand",
  ANNOUNCEMENT: "Announcement",
};

export const DEFAULT_PROJECT_CASE_CATEGORY = "Website · Design · Development";
export const DEFAULT_PROJECT_CASE_CTA = "Ver projeto";
export const DEFAULT_SERVICE_TITLE = "Landing\npages";
export const DEFAULT_SERVICE_DESCRIPTION =
  "Páginas criadas para transformar visitantes em oportunidades.";
export const DEFAULT_SERVICE_CATEGORY = "AI · Design · Development";
export const STUDIO_SITE_URL = "bensilabs.dev";
export const INSTAGRAM_FORMAT = {
  id: "instagram-4-5",
  label: "Instagram 1080 × 1350",
  width: 1080,
  height: 1350,
} as const;

export const READY_CREATIVE_TYPES: CreativeType[] = ["PROJECT", "SERVICE"];

export function templateIdForType(type: CreativeType) {
  if (type === "SERVICE") return "service";
  if (type === "EDUCATIONAL") return "educational";
  if (type === "BRAND" || type === "ANNOUNCEMENT") return "brand";
  return "project-case";
}

export function isTemplateReady(id: string) {
  return id === "project-case" || id === "service";
}
