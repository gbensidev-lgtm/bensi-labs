import { Logo } from "@/components/Logo";
import { contactLinks } from "@/data/contact";
import { navLinks } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 md:py-12">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo variant="horizontal" size="footer" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                Navegação
              </p>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                Contato
              </p>
              <ul className="mt-4 space-y-2">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/40 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">Construído com código, curiosidade e IA.</p>
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted/80">
            © 2026 Bensi Labs
          </p>
        </div>
      </div>
    </footer>
  );
}
