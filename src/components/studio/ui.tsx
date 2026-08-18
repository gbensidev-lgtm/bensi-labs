import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonClass = {
  primary: "bg-primary text-white hover:bg-[#1d4ed8]",
  secondary: "border border-border bg-surface text-foreground hover:border-primary/40",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
  danger: "border border-border bg-transparent text-muted hover:text-foreground",
} as const;

function studioButtonClass(
  variant: keyof typeof buttonClass,
  className?: string,
) {
  return cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-button)] px-4 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
    buttonClass[variant],
    className,
  );
}

export function StudioButton({
  children,
  className,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof buttonClass;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const classes = studioButtonClass(variant, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function StudioField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={htmlFor}>
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}

const controlClass =
  "min-h-11 w-full rounded-[var(--radius-button)] border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-primary";

export function StudioInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function StudioSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClass, className)} {...props}>
      {children}
    </select>
  );
}

export function StudioTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-28 py-2.5", className)} {...props} />;
}

export function StudioPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
