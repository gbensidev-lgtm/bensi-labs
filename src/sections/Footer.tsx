import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { contactLinks } from "@/data/contact";
import { services } from "@/data/services";
import { navLinks } from "@/lib/utils";

const contactIcons = {
  WhatsApp: MessageCircle,
  "E-mail": Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div className="relative z-10 container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="horizontal" size="footer" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Transformamos ideias em produtos digitais.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Navegação</p>
            <nav aria-label="Rodapé" className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/briefing"
                className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
              >
                Começar um projeto
              </a>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Serviços</p>
            <ul className="mt-4 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Contato</p>
            <ul className="mt-4 flex flex-col gap-3">
              {contactLinks.map((link) => {
                const Icon = contactIcons[link.label as keyof typeof contactIcons];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
                    >
                      {Icon ? <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" /> : null}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">Construído com código, curiosidade e IA.</p>
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted">
            © {year} Bensi Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
