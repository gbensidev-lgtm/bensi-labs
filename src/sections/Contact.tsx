"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionHeading } from "@/components/SectionHeading";
import { contactLinks, whatsappLink } from "@/data/contact";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Contact() {
  const secondaryLinks = contactLinks.filter((link) => link.label !== "WhatsApp");

  return (
    <section id="contact" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
          className="rounded-[calc(var(--radius-card)+8px)] border border-border bg-[linear-gradient(135deg,rgba(37,99,235,0.10),rgba(124,58,237,0.06))] p-8 md:p-12 lg:p-16"
        >
          <SectionHeading
            align="center"
            title="Tem um projeto em mente?"
            subtitle="Conte um pouco sobre o que você precisa. Vamos entender o problema e descobrir juntos qual é a melhor solução."
            subtitleClassName="text-foreground/70"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <MagneticButton href="/briefing" variant="primary">
              Começar um projeto
            </MagneticButton>
            <MagneticButton href={whatsappLink} variant="secondary">
              WhatsApp
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {secondaryLinks.map((link) => (
              <motion.li key={link.label} variants={fadeUp}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-mono text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
