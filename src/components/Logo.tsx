import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "horizontal" | "icon";
  size?: "nav" | "default" | "footer";
  className?: string;
  priority?: boolean;
};

const iconHeights = {
  nav: "h-7 w-auto md:h-9",
  default: "h-9 w-auto",
  footer: "h-8 w-auto md:h-9",
  iconOnly: "h-8 w-auto md:h-10",
};

export function Logo({
  variant = "horizontal",
  size = "default",
  className,
  priority,
}: LogoProps) {
  if (variant === "icon") {
    return (
      <Link
        href="/"
        className={cn("inline-flex shrink-0 items-center", className)}
        aria-label="Bensi Labs — Início"
      >
        <Image
          src="/brand/logo-icon.webp"
          alt="Bensi Labs"
          width={48}
          height={48}
          priority={priority}
          sizes="40px"
          className={iconHeights.iconOnly}
        />
      </Link>
    );
  }

  const isNav = size === "nav";
  const isFooter = size === "footer";

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center gap-2.5 md:gap-3", className)}
      aria-label="Bensi Labs — Início"
    >
      <Image
        src="/brand/logo-icon.webp"
        alt=""
        aria-hidden="true"
        width={48}
        height={48}
        priority={priority}
        sizes="40px"
        className={iconHeights[size]}
      />

      <span className="flex flex-col justify-center leading-[0.9]">
        <span
          className={cn(
            "font-sans font-bold tracking-[0.18em] text-foreground uppercase",
            isNav && "text-sm md:text-[15px]",
            isFooter && "text-sm md:text-[15px]",
            !isNav && !isFooter && "text-base",
          )}
        >
          Bensi
        </span>
        <span
          className={cn(
            "text-gradient-brand font-sans font-medium tracking-[0.32em] uppercase",
            isNav && "text-[10px] md:text-[11px]",
            isFooter && "text-[10px] md:text-[11px]",
            !isNav && !isFooter && "text-xs",
          )}
        >
          Labs
        </span>
      </span>
    </Link>
  );
}
