import type { Metadata } from "next";
import { requireStudioSession } from "@/lib/studio/session";
import { listTemplates } from "@/lib/studio/queries";
import { StudioButton, StudioPageHeader } from "@/components/studio/ui";
import { BrandTemplate, EducationalTemplate } from "@/components/studio/templates/ComingSoonTemplates";
import { ServiceTemplate } from "@/components/studio/templates/ServiceTemplate";
import {
  DEFAULT_SERVICE_CATEGORY,
  DEFAULT_SERVICE_DESCRIPTION,
  DEFAULT_SERVICE_TITLE,
  STUDIO_SITE_URL,
  isTemplateReady,
  type Template,
} from "@/lib/studio/types";

export const metadata: Metadata = { title: "Templates" };

const FALLBACK_TEMPLATES: Template[] = [
  {
    id: "project-case",
    name: "Project Case",
    description: "Post 4:5 para divulgar um projeto publicado.",
    status: "ready",
    format: "1080x1350",
    created_at: "",
  },
  {
    id: "service",
    name: "Service",
    description: "Post para apresentar um serviço da Bensi Labs.",
    status: "ready",
    format: "1080x1350",
    created_at: "",
  },
  {
    id: "educational",
    name: "Educational",
    description: "Post de insight ou conteúdo educativo.",
    status: "coming_soon",
    format: "1080x1350",
    created_at: "",
  },
  {
    id: "brand",
    name: "Brand / Announcement",
    description: "Post de marca ou anúncio.",
    status: "coming_soon",
    format: "1080x1350",
    created_at: "",
  },
];

const TEMPLATE_TYPE: Record<string, string> = {
  "project-case": "PROJECT",
  service: "SERVICE",
};

export default async function TemplatesPage() {
  const { supabase } = await requireStudioSession();
  let templates = FALLBACK_TEMPLATES;

  try {
    const rows = await listTemplates(supabase);
    if (rows.length > 0) templates = rows;
  } catch {
    templates = FALLBACK_TEMPLATES;
  }

  return (
    <div>
      <StudioPageHeader title="Templates" description="Formatos visuais reutilizáveis para o Instagram." />

      <ul className="mt-8 divide-y divide-border border border-border">
        {templates.map((template) => {
          const ready = isTemplateReady(template.id) || template.status === "ready";
          const type = TEMPLATE_TYPE[template.id];

          return (
            <li key={template.id} className="flex flex-wrap items-center justify-between gap-4 px-4 py-5">
              <div>
                <p className="font-medium text-foreground">{template.name}</p>
                <p className="mt-1 text-sm text-muted">{template.description}</p>
              </div>
              {ready && type ? (
                <StudioButton href={`/admin/creatives/new?type=${type}`}>Usar template</StudioButton>
              ) : (
                <span className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Em breve</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden border border-border">
          <p className="border-b border-border px-4 py-3 text-sm text-muted">Service</p>
          <div className="flex justify-center overflow-hidden bg-[#0a0c10] p-4">
            <div style={{ width: 1080 * 0.26, height: 1350 * 0.26 }}>
              <div style={{ transform: "scale(0.26)", transformOrigin: "top left" }}>
                <ServiceTemplate
                  data={{
                    headline: DEFAULT_SERVICE_TITLE,
                    description: DEFAULT_SERVICE_DESCRIPTION,
                    categoryLabel: DEFAULT_SERVICE_CATEGORY,
                    cta: "Vamos conversar",
                    siteUrl: STUDIO_SITE_URL,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden border border-border">
          <p className="border-b border-border px-4 py-3 text-sm text-muted">Educational</p>
          <div className="flex justify-center bg-[#0a0c10] p-4">
            <div className="origin-top scale-[0.72]">
              <EducationalTemplate />
            </div>
          </div>
        </div>
        <div className="overflow-hidden border border-border">
          <p className="border-b border-border px-4 py-3 text-sm text-muted">Brand / Announcement</p>
          <div className="flex justify-center bg-[#0a0c10] p-4">
            <div className="origin-top scale-[0.72]">
              <BrandTemplate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
