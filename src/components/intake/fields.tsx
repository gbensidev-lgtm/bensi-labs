import { cn } from "@/lib/utils";

export function IntakeField({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-primary" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-2 font-normal text-muted">opcional</span>
        )}
      </label>
      {children}
      {hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

const controlClass =
  "min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm text-foreground outline-none transition-colors duration-150 placeholder:text-muted/70 focus:border-primary";

export function IntakeInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function IntakeTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClass, "min-h-32 py-3", className)} {...props} />;
}

export function IntakeChoice({
  selected,
  title,
  description,
  onSelect,
}: {
  selected: boolean;
  title: string;
  description?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex min-h-16 w-full cursor-pointer flex-col items-start rounded-[var(--radius-card)] border px-4 py-4 text-left transition-colors duration-150",
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-surface text-foreground hover:border-primary/40",
      )}
    >
      <span className="text-sm font-medium">{title}</span>
      {description ? <span className="mt-1 text-sm leading-relaxed text-muted">{description}</span> : null}
    </button>
  );
}

export function IntakeToggle({
  selected,
  label,
  onToggle,
}: {
  selected: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors duration-150",
        selected
          ? "border-primary bg-primary/12 text-foreground"
          : "border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

export function IntakeError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-[#f3b4b4]">
      {message}
    </p>
  );
}
