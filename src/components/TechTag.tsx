import { cn } from "@/lib/utils";

type TechTagProps = {
  label: string;
  className?: string;
};

export function TechTag({ label, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
