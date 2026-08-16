import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

type BadgeProps = {
  status: ProjectStatus | "exploring";
  className?: string;
};

const labels: Record<BadgeProps["status"], string> = {
  live: "No ar",
  building: "Em desenvolvimento",
  experiment: "Experimento",
  exploring: "Explorando",
};

const styles: Record<BadgeProps["status"], string> = {
  live: "border-primary/25 bg-primary/10 text-primary",
  building: "border-secondary/25 bg-secondary/10 text-secondary",
  experiment: "border-accent/25 bg-accent/10 text-accent",
  exploring: "border-border bg-surface text-muted",
};

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] uppercase",
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}
