"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { contactLinks, whatsappLink } from "@/data/contact";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

export function Contact() {
  const email = contactLinks.find((link) => link.label === "E-mail");

  return (
    <section id="contact" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
          className="overflow-hidden rounded-[calc(var(--radius-card)+10px)] border border-border/80 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.07))]"
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="border-b border-border/60 p-8 md:p-10 lg:border-r lg:border-b-0 lg:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Tem um projeto em mente?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/75">
                Conte um pouco sobre o que você precisa. Vamos entender o problema e
                descobrir juntos qual é a melhor solução.
              </p>

              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-button)] border border-primary/25 bg-primary/10 text-primary">
                      <MessageCircle className="size-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    (19) 99238-1776
                  </a>
                </li>
                {email && (
                  <li>
                    <a
                      href={email.href}
                      className="inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-[var(--radius-button)] border border-primary/25 bg-primary/10 text-primary">
                        <Mail className="size-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      gbensi.dev@gmail.com
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 md:p-10 lg:p-12">
              <p className="text-sm leading-relaxed text-muted">
                O caminho mais rápido é começar pelo briefing ou chamar no WhatsApp.
                Sem formulário genérico — conversa direta sobre o projeto.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="/briefing" variant="primary">
                  Começar um projeto
                </MagneticButton>
                <MagneticButton href={whatsappLink} variant="secondary">
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
