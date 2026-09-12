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
    "border border-primary/70 bg-primary text-white shadow-[0_8px_28px_rgba(37,99,235,0.32)] hover:border-primary hover:shadow-[0_12px_36px_rgba(37,99,235,0.42),0_8px_28px_rgba(124,58,237,0.18)]",
  secondary:
    "border border-border bg-surface text-foreground shadow-[0_8px_24px_rgba(15,17,21,0.35)] hover:border-primary/40 hover:shadow-[0_10px_28px_rgba(37,99,235,0.16)]",
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
    "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-200",
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
