"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  StudioButton,
  StudioField,
  StudioInput,
  StudioSelect,
  StudioTextarea,
} from "@/components/studio/ui";
import { slugify, parseTechnologies } from "@/lib/studio/slug";
import {
  CATEGORY_LABELS,
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  STATUS_LABELS,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from "@/lib/studio/types";

type ProjectFormProps = {
  project?: Project;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? "website");
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? "draft");
  const [url, setUrl] = useState(project?.url ?? "");
  const [image, setImage] = useState(project?.image ?? "");
  const [screenshotDesktop, setScreenshotDesktop] = useState(project?.screenshot_desktop ?? "");
  const [screenshotMobile, setScreenshotMobile] = useState(project?.screenshot_mobile ?? "");
  const [thumbnail, setThumbnail] = useState(project?.thumbnail ?? "");
  const [technologies, setTechnologies] = useState((project?.technologies ?? []).join(", "));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function onNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const payload = {
      name,
      slug,
      description,
      category,
      status,
      url,
      image,
      screenshot_desktop: screenshotDesktop || image,
      screenshot_mobile: screenshotMobile,
      thumbnail: thumbnail || image,
      technologies: parseTechnologies(technologies),
    };

    const endpoint = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
    const method = project ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setError("Não foi possível salvar o projeto. Tente novamente.");
        setPending(false);
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Não foi possível salvar o projeto. Tente novamente.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-2xl space-y-5">
      <StudioField label="Nome" htmlFor="name">
        <StudioInput
          id="name"
          required
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </StudioField>

      <StudioField label="Slug" htmlFor="slug">
        <StudioInput
          id="slug"
          required
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(event.target.value);
          }}
        />
      </StudioField>

      <StudioField label="Descrição" htmlFor="description">
        <StudioTextarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </StudioField>

      <div className="grid gap-5 md:grid-cols-2">
        <StudioField label="Categoria" htmlFor="category">
          <StudioSelect
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as ProjectCategory)}
          >
            {PROJECT_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {CATEGORY_LABELS[item]}
              </option>
            ))}
          </StudioSelect>
        </StudioField>

        <StudioField label="Status" htmlFor="status">
          <StudioSelect
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus)}
          >
            {PROJECT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {STATUS_LABELS[item]}
              </option>
            ))}
          </StudioSelect>
        </StudioField>
      </div>

      <StudioField label="URL" htmlFor="url">
        <StudioInput
          id="url"
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </StudioField>

      <StudioField label="Imagem principal" htmlFor="image">
        <StudioInput
          id="image"
          value={image}
          placeholder="/projects/exemplo.webp"
          onChange={(event) => setImage(event.target.value)}
        />
      </StudioField>

      <StudioField label="Screenshot desktop" htmlFor="screenshot_desktop">
        <StudioInput
          id="screenshot_desktop"
          value={screenshotDesktop}
          placeholder="/projects/exemplo.webp"
          onChange={(event) => setScreenshotDesktop(event.target.value)}
        />
      </StudioField>

      <StudioField label="Screenshot mobile" htmlFor="screenshot_mobile">
        <StudioInput
          id="screenshot_mobile"
          value={screenshotMobile}
          onChange={(event) => setScreenshotMobile(event.target.value)}
        />
      </StudioField>

      <StudioField label="Thumbnail" htmlFor="thumbnail">
        <StudioInput
          id="thumbnail"
          value={thumbnail}
          onChange={(event) => setThumbnail(event.target.value)}
        />
      </StudioField>

      <StudioField label="Tecnologias" htmlFor="technologies">
        <StudioInput
          id="technologies"
          value={technologies}
          placeholder="Next.js, React, Tailwind CSS"
          onChange={(event) => setTechnologies(event.target.value)}
        />
      </StudioField>

      {error ? (
        <p className="text-sm text-[#f87171]" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex gap-3">
        <StudioButton type="submit" disabled={pending}>
          {pending ? "Salvando…" : project ? "Salvar" : "Criar projeto"}
        </StudioButton>
        <StudioButton variant="ghost" onClick={() => router.push("/admin/projects")}>
          Cancelar
        </StudioButton>
      </div>
    </form>
  );
}
