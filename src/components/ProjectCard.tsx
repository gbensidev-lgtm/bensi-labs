"use client";

import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/Badge";
import { ProjectCover } from "@/components/ProjectCover";
import { TechTag } from "@/components/TechTag";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//.test(url));
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const interactivePreview = project.preview === "dashboard";
  const external = isExternalUrl(project.url);
  const frameLabel =
    project.url && external
      ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : project.slug.replace(/-/g, " / ");

  const className = cn(
    "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border/80 bg-surface/70",
    "transition-[border-color,box-shadow,transform] duration-300 ease-out",
    "hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_60px_rgba(37,99,235,0.12)]",
  );

  const cover = (
    <div
      className="overflow-hidden border-b border-border/70"
      aria-hidden={interactivePreview ? undefined : true}
    >
      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
        <ProjectCover
          slug={project.slug}
          index={index}
          title={project.title}
          image={project.image}
          preview={project.preview}
          frameLabel={frameLabel}
        />
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge status={project.status} />
        {external && (
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <ExternalLink className="size-3.5" aria-hidden="true" />
            Live
          </span>
        )}
      </div>

      <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>
    </div>
  );

  if (project.url && !interactivePreview) {
    return (
      <a
        href={project.url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={`Explorar projeto ${project.title}`}
        className={cn(className, "cursor-pointer")}
      >
        {cover}
        {body}
      </a>
    );
  }

  return (
    <article className={className}>
      {cover}
      <div className="flex flex-1 flex-col">
        {project.url ? (
          <a
            href={project.url}
            aria-label={`Explorar projeto ${project.title}`}
            className="flex flex-1 flex-col"
          >
            {body}
          </a>
        ) : (
          body
        )}
      </div>
    </article>
  );
}
