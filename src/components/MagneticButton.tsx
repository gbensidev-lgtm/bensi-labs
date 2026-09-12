"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type GlowButtonBase = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

type GlowButtonAsLink = GlowButtonBase & {
  href: string;
  type?: never;
};

type GlowButtonAsButton = GlowButtonBase & {
  href?: undefined;
  type?: "button" | "submit";
};

type MagneticButtonProps = GlowButtonAsLink | GlowButtonAsButton;

const variants = {
  primary:
    "border border-primary/70 bg-primary text-white shadow-[0_8px_28px_rgba(37,99,235,0.32)] hover:border-primary hover:shadow-[0_12px_36px_rgba(37,99,235,0.42),0_8px_28px_rgba(124,58,237,0.18)]",
  secondary:
    "border border-border bg-surface text-foreground shadow-[0_8px_24px_rgba(15,17,21,0.35)] hover:border-primary/40 hover:shadow-[0_10px_28px_rgba(37,99,235,0.16)]",
};

export function MagneticButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  ...props
}: MagneticButtonProps) {
  const href = "href" in props ? props.href : undefined;
  const type = "type" in props ? props.type : undefined;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 motion-safe:group-hover:animate-[button-shine_0.85s_ease] motion-safe:group-hover:opacity-100"
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  const classes = cn(
    "group relative inline-flex min-h-11 cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium",
    "transition-[color,background-color,border-color,box-shadow] duration-200 ease-out",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
