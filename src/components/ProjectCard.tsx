"use client";

import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/Badge";
import { ProjectCover } from "@/components/ProjectCover";
import { TechTag } from "@/components/TechTag";
import { easeOut, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
  reversed?: boolean;
};

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//.test(url));
}

function ProjectCardContent({
  project,
  index,
  reversed = false,
}: ProjectCardProps) {
  const number = String(index).padStart(2, "0");
  const url = project.url;
  const frameLabel =
    url && isExternalUrl(url)
      ? url.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : project.slug.replace(/-/g, " / ");

  return (
    <div
      className={cn(
        "grid items-center gap-7 md:grid-cols-2 md:gap-10 lg:gap-16",
        reversed && "md:[&>*:first-child]:order-2",
      )}
    >
      <div className="overflow-hidden" aria-hidden="true">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
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

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.05, ease: easeOut }}
            className="font-mono text-xs tracking-[0.22em] text-primary uppercase md:text-sm"
          >
            Projeto / {number}
          </motion.span>
          <Badge status={project.status} />
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-[2.15rem]">
          {project.title}
        </h3>

        <p className="mt-2 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          {project.category}
        </p>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          {project.description}
        </p>

        {project.tags.length > 0 &&
          project.tags.join(" · ") !== project.category && (
            <p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-foreground/70">
              {project.tags.join(" · ")}
            </p>
          )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-primary uppercase transition-[gap,transform] duration-200 ease-out group-hover:gap-3">
          Explorar projeto
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index, reversed = false }: ProjectCardProps) {
  const className = cn(
    "group block rounded-[calc(var(--radius-card)+8px)] border border-border/70 p-3 transition-[border-color,box-shadow,transform] duration-300 ease-out md:p-4",
    "hover:border-primary/30 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.10),0_24px_80px_rgba(37,99,235,0.08)]",
  );

  if (project.url) {
    const external = isExternalUrl(project.url);

    return (
      <a
        href={project.url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={`Explorar projeto ${project.title}`}
        className={cn(className, "cursor-pointer")}
      >
        <ProjectCardContent project={project} index={index} reversed={reversed} />
      </a>
    );
  }

  return (
    <article className={className}>
      <ProjectCardContent project={project} index={index} reversed={reversed} />
    </article>
  );
}
