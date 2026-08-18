"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ProjectCaseTemplate } from "@/components/studio/templates/ProjectCaseTemplate";
import { ServiceTemplate } from "@/components/studio/templates/ServiceTemplate";
import { StudioButton, StudioField, StudioInput, StudioSelect, StudioTextarea } from "@/components/studio/ui";
import { exportNodeToPng } from "@/lib/studio/export";
import { projectCaseNumber, screenshotForProject } from "@/lib/studio/helpers";
import {
  DEFAULT_PROJECT_CASE_CATEGORY,
  DEFAULT_PROJECT_CASE_CTA,
  DEFAULT_SERVICE_CATEGORY,
  DEFAULT_SERVICE_DESCRIPTION,
  DEFAULT_SERVICE_TITLE,
  INSTAGRAM_FORMAT,
  READY_CREATIVE_TYPES,
  STUDIO_SITE_URL,
  templateIdForType,
  type Creative,
  type CreativeType,
  type Project,
} from "@/lib/studio/types";
import { slugify } from "@/lib/studio/slug";

type CreativeComposerProps = {
  projects: Project[];
  creative?: Creative;
  initialType?: CreativeType;
};

export function CreativeComposer({ projects, creative, initialType }: CreativeComposerProps) {
  const router = useRouter();
  const exportRef = useRef<HTMLDivElement>(null);
  const [savedId, setSavedId] = useState(creative?.id ?? "");
  const [type, setType] = useState<CreativeType>(creative?.type ?? initialType ?? "PROJECT");
  const [projectId, setProjectId] = useState(creative?.project_id ?? projects[0]?.id ?? "");
  const [title, setTitle] = useState(
    creative?.title ?? (type === "SERVICE" ? DEFAULT_SERVICE_TITLE : ""),
  );
  const [description, setDescription] = useState(
    creative?.description ?? (type === "SERVICE" ? DEFAULT_SERVICE_DESCRIPTION : ""),
  );
  const [categoryLabel, setCategoryLabel] = useState(
    creative?.category_label ??
      (type === "SERVICE" ? DEFAULT_SERVICE_CATEGORY : DEFAULT_PROJECT_CASE_CATEGORY),
  );
  const [cta, setCta] = useState(
    creative?.cta ?? (type === "SERVICE" ? "Vamos conversar" : DEFAULT_PROJECT_CASE_CTA),
  );
  const [screenshotUrl, setScreenshotUrl] = useState(
    creative?.screenshot_url ?? screenshotForProject(projects[0]) ?? "",
  );
  const [generated, setGenerated] = useState(Boolean(creative));
  const [pending, setPending] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const project = useMemo(
    () => projects.find((item) => item.id === projectId) ?? null,
    [projectId, projects],
  );

  const ready = READY_CREATIVE_TYPES.includes(type);
  const previewScale = 0.42;
  const isService = type === "SERVICE";

  const projectData = {
    caseNumber: project ? projectCaseNumber(projects, project.id) : "01",
    projectName: project?.name ?? "Nome do projeto",
    categoryLabel,
    title,
    description,
    cta,
    screenshotUrl: screenshotUrl || null,
    siteUrl: STUDIO_SITE_URL,
  };

  const serviceData = {
    headline: title || DEFAULT_SERVICE_TITLE,
    description: description || DEFAULT_SERVICE_DESCRIPTION,
    categoryLabel: categoryLabel || DEFAULT_SERVICE_CATEGORY,
    cta,
    siteUrl: STUDIO_SITE_URL,
  };

  function applyTypeDefaults(nextType: CreativeType) {
    setType(nextType);
    setGenerated(false);
    setSaved(false);
    if (nextType === "SERVICE") {
      setTitle((current) => current || DEFAULT_SERVICE_TITLE);
      setDescription((current) => current || DEFAULT_SERVICE_DESCRIPTION);
      setCategoryLabel(DEFAULT_SERVICE_CATEGORY);
      setCta("Vamos conversar");
      return;
    }
    if (nextType === "PROJECT") {
      setCategoryLabel(DEFAULT_PROJECT_CASE_CATEGORY);
      setCta(DEFAULT_PROJECT_CASE_CTA);
    }
  }

  function onProjectChange(id: string) {
    setProjectId(id);
    const next = projects.find((item) => item.id === id);
    setScreenshotUrl(next ? screenshotForProject(next) ?? "" : "");
    setGenerated(false);
    setSaved(false);
  }

  async function onUpload(file: File | undefined) {
    if (!file) return;
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/uploads", { method: "POST", body: formData });
    if (!response.ok) {
      setError("Não foi possível enviar a imagem. Tente novamente.");
      return;
    }

    const payload = (await response.json()) as { url: string };
    setScreenshotUrl(payload.url);
    setGenerated(false);
  }

  function payload() {
    return {
      type,
      template_id: templateIdForType(type),
      project_id: isService ? null : project?.id,
      title,
      description,
      category_label: categoryLabel,
      cta,
      format: INSTAGRAM_FORMAT.id,
      screenshot_url: isService ? null : screenshotUrl,
    };
  }

  async function onGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!ready) {
      setError("Este tipo de criativo estará disponível em breve.");
      return;
    }

    if (type === "PROJECT" && !project) {
      setError("Selecione um projeto.");
      return;
    }

    setGenerated(true);
    setPending(true);

    try {
      const endpoint = savedId ? `/api/admin/creatives/${savedId}` : "/api/admin/creatives";
      const response = await fetch(endpoint, {
        method: savedId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });

      if (!response.ok) {
        setError("O criativo foi gerado, mas não foi possível salvar.");
        return;
      }

      const body = (await response.json()) as { creative: Creative };
      setSavedId(body.creative.id);
      setSaved(true);

      if (!savedId) {
        router.replace(`/admin/creatives/${body.creative.id}`);
        router.refresh();
      }
    } catch {
      setError("O criativo foi gerado, mas não foi possível salvar.");
    } finally {
      setPending(false);
    }
  }

  async function onExport() {
    if (!exportRef.current) return;
    if (type === "PROJECT" && !project) return;
    setExporting(true);
    setError("");
    try {
      const name = isService ? slugify(title || "service") : slugify(project?.name || "project");
      await exportNodeToPng(exportRef.current, `bensi-labs-${name}-${templateIdForType(type)}.png`);
    } catch {
      setError("Não foi possível exportar o PNG. Tente novamente.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <form onSubmit={onGenerate} className="space-y-5">
        <StudioField label="Tipo" htmlFor="type">
          <StudioSelect
            id="type"
            value={type}
            onChange={(event) => applyTypeDefaults(event.target.value as CreativeType)}
          >
            <option value="PROJECT">Project Case</option>
            <option value="SERVICE">Service</option>
            <option value="EDUCATIONAL">Educational</option>
            <option value="BRAND">Brand</option>
            <option value="ANNOUNCEMENT">Announcement</option>
          </StudioSelect>
        </StudioField>

        {type === "PROJECT" ? (
          <StudioField label="Projeto" htmlFor="project">
            <StudioSelect
              id="project"
              value={projectId}
              onChange={(event) => onProjectChange(event.target.value)}
            >
              {projects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </StudioSelect>
          </StudioField>
        ) : null}

        <StudioField label="Formato" htmlFor="format">
          <StudioSelect id="format" value={INSTAGRAM_FORMAT.id} disabled>
            <option value={INSTAGRAM_FORMAT.id}>{INSTAGRAM_FORMAT.label}</option>
          </StudioSelect>
        </StudioField>

        <StudioField label={isService ? "Serviço" : "Título"} htmlFor="title">
          {isService ? (
            <StudioTextarea
              id="title"
              value={title}
              placeholder={"Landing\npages"}
              onChange={(event) => setTitle(event.target.value)}
            />
          ) : (
            <StudioInput
              id="title"
              value={title}
              placeholder="Uma presença digital pensada para a marca"
              onChange={(event) => setTitle(event.target.value)}
            />
          )}
        </StudioField>

        <StudioField label="Descrição" htmlFor="description">
          <StudioTextarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </StudioField>

        <StudioField label="Categoria" htmlFor="category_label">
          <StudioInput
            id="category_label"
            value={categoryLabel}
            onChange={(event) => setCategoryLabel(event.target.value)}
          />
        </StudioField>

        <StudioField label="CTA" htmlFor="cta">
          <StudioInput id="cta" value={cta} onChange={(event) => setCta(event.target.value)} />
        </StudioField>

        {type === "PROJECT" ? (
          <>
            <StudioField label="Screenshot" htmlFor="screenshot">
              <StudioInput
                id="screenshot"
                value={screenshotUrl}
                placeholder="/projects/raquel-frizo.webp"
                onChange={(event) => setScreenshotUrl(event.target.value)}
              />
            </StudioField>

            <StudioField label="Enviar screenshot real" htmlFor="screenshot_file">
              <StudioInput
                id="screenshot_file"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => onUpload(event.target.files?.[0])}
              />
            </StudioField>
          </>
        ) : null}

        {error ? (
          <p className="text-sm text-[#f87171]" role="alert">
            {error}
          </p>
        ) : null}

        {saved ? (
          <p className="text-sm text-primary" role="status">
            Criativo salvo.
          </p>
        ) : null}

        <StudioButton type="submit" disabled={pending} className="w-full">
          {pending ? "Salvando…" : savedId ? "Salvar criativo" : "Gerar criativo"}
        </StudioButton>
      </form>

      <div>
        {!generated ? (
          <div className="flex min-h-[420px] items-center justify-center border border-dashed border-border bg-surface/40 px-6 text-center">
            <p className="max-w-sm text-sm text-muted">
              Preencha os campos e gere o criativo para ver a prévia no formato 1080 × 1350.
            </p>
          </div>
        ) : (
          <div>
            <div className="overflow-hidden border border-border bg-[#0a0c10]">
              <div
                style={{
                  width: 1080 * previewScale,
                  height: 1350 * previewScale,
                }}
              >
                <div
                  style={{
                    width: 1080,
                    height: 1350,
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {isService ? (
                    <ServiceTemplate data={serviceData} />
                  ) : (
                    <ProjectCaseTemplate data={projectData} />
                  )}
                </div>
              </div>
            </div>
            <div className="pointer-events-none fixed -left-[10000px] top-0" aria-hidden="true">
              <div ref={exportRef}>
                {isService ? (
                  <ServiceTemplate data={serviceData} />
                ) : (
                  <ProjectCaseTemplate data={projectData} />
                )}
              </div>
            </div>
            <StudioButton className="mt-4" onClick={onExport} disabled={exporting}>
              {exporting ? "Exportando…" : "Exportar PNG 1080 × 1350"}
            </StudioButton>
          </div>
        )}
      </div>
    </div>
  );
}
