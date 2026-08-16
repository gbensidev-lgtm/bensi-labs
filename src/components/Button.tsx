import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "border border-primary/20 bg-primary/10 text-foreground hover:border-primary/40 hover:bg-primary/15",
  secondary:
    "border border-border bg-surface text-foreground hover:border-primary/30 hover:bg-surface/80",
  ghost: "border border-transparent text-muted hover:text-foreground hover:border-border/60",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium transition-colors duration-200",
    variants[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
