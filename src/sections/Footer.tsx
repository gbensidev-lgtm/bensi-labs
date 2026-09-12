import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { contactLinks } from "@/data/contact";
import { cn, navLinks } from "@/lib/utils";

const footerNav = [...navLinks, { label: "Começar um projeto", href: "/briefing" }];

const contactIcons = {
  WhatsApp: MessageCircle,
  "E-mail": Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-sans font-bold tracking-tighter text-primary/[0.09]"
        style={{ fontSize: "clamp(4.5rem, 18vw, 11rem)", lineHeight: 0.85 }}
      >
        BENSI
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div className="relative z-10 container flex min-h-[22rem] flex-col justify-between py-14 md:min-h-[26rem] md:py-16">
        <div className="flex flex-col items-center text-center">
          <Logo variant="horizontal" size="footer" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Transformamos ideias em produtos digitais.
          </p>

          <nav aria-label="Rodapé" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {footerNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="mt-8 flex items-center gap-3">
            {contactLinks.map((link) => {
              const Icon = contactIcons[link.label as keyof typeof contactIcons];

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-[var(--radius-button)]",
                      "border border-border bg-surface/70 text-muted",
                      "transition-[border-color,color,background-color] duration-200",
                      "hover:border-primary/35 hover:bg-primary/10 hover:text-primary",
                    )}
                    aria-label={link.label}
                  >
                    {Icon ? <Icon className="size-5" strokeWidth={1.6} /> : link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="h-px w-full max-w-xl bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="mt-8 flex size-[4.5rem] items-center justify-center rounded-[var(--radius-card)] border border-border/80 bg-surface/80 shadow-[0_18px_50px_rgba(15,17,21,0.45)] md:size-20">
            <Image
              src="/brand/logo-icon.webp"
              alt=""
              width={48}
              height={48}
              sizes="40px"
              className="h-10 w-auto md:h-11"
            />
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-2 md:flex-row md:justify-between">
            <p className="text-sm text-muted">Construído com código, curiosidade e IA.</p>
            <p className="font-mono text-[11px] tracking-[0.1em] text-muted">
              © {year} Bensi Labs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
