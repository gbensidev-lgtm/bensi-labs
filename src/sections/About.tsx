"use client";

import { Mail, MapPin, MessageCircle, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { contactLinks, whatsappLink } from "@/data/contact";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

const facts = [
  {
    icon: UserRound,
    label: "Nome",
    value: "Gustavo Bensi",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "gbensi.dev@gmail.com",
    href: "mailto:gbensi.dev@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "(19) 99238-1776",
    href: whatsappLink,
    external: true,
  },
  {
    icon: MapPin,
    label: "Atuação",
    value: "Brasil · remoto",
  },
] as const;

export function About() {
  return (
    <section id="about" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
          className="overflow-hidden rounded-[calc(var(--radius-card)+10px)] border border-border/80 bg-surface/70"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="border-b border-border/70 p-6 md:p-8 lg:border-r lg:border-b-0">
              <p className="text-sm font-semibold tracking-[0.08em] text-primary uppercase">
                Sobre
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Quem está por trás da Bensi Labs.
              </h2>

              <ul className="mt-8 space-y-4">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  const content = (
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-primary/25 bg-primary/10 text-primary">
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs tracking-[0.14em] text-muted uppercase">
                          {fact.label}
                        </span>
                        <span className="mt-1 block text-sm font-medium text-foreground md:text-base">
                          {fact.value}
                        </span>
                      </span>
                    </span>
                  );

                  return (
                    <li key={fact.label}>
                      {"href" in fact && fact.href ? (
                        <a
                          href={fact.href}
                          target={"external" in fact && fact.external ? "_blank" : undefined}
                          rel={
                            "external" in fact && fact.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="block rounded-[var(--radius-button)] transition-colors hover:text-primary"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Eu sou Gustavo Bensi, fundador da Bensi Labs.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Crio produtos digitais combinando desenvolvimento de software,
                inteligência artificial e compreensão do negócio.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Meu trabalho começa antes do código: entender o problema, organizar os
                requisitos, definir a solução e transformar a ideia em um produto que
                possa ser utilizado, medido e evoluído.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                A Bensi Labs atua no desenvolvimento de sites, landing pages,
                aplicações, automação de conteúdo para redes sociais e soluções
                digitais personalizadas, buscando sempre uma combinação entre
                experiência, tecnologia e resultado.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href="/briefing" variant="primary">
                  Começar um projeto
                </MagneticButton>
                <MagneticButton href={contactLinks[0].href} variant="secondary">
                  WhatsApp
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
