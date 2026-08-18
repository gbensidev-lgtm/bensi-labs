"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn, navLinks } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border/60 bg-background/75 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Logo priority size="nav" />

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = onHome && activeSection === sectionId;
              const href = onHome ? link.href : `/${link.href}`;

              return (
                <li key={link.href}>
                  <a
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-200 after:ease-out",
                      isActive
                        ? "text-foreground after:scale-x-100"
                        : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <MagneticButton href="/briefing" variant="primary">
              Começar um projeto
            </MagneticButton>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[var(--radius-button)] border border-border/70 bg-surface/60 text-foreground transition-[border-color,background-color] duration-200 hover:border-primary/30 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-full bg-current transition-transform duration-200",
                  mobileOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-0.5 w-full bg-current transition-opacity duration-200",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-full bg-current transition-transform duration-200",
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 border-b border-border/60 bg-background/96 backdrop-blur-md md:hidden"
          >
            <div className="container flex h-full flex-col gap-2 py-8">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = onHome && activeSection === sectionId;
                const href = onHome ? link.href : `/${link.href}`;

                return (
                  <a
                    key={link.href}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center text-lg transition-colors duration-200",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <MagneticButton
                href="/briefing"
                variant="primary"
                className="mt-4 w-fit"
                onClick={() => setMobileOpen(false)}
              >
                Começar um projeto
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
