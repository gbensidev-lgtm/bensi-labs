"use client";

import { AppWindow, CalendarClock, Globe, LayoutTemplate, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/data/services";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const serviceIcons = {
  Sites: Globe,
  "Landing Pages": LayoutTemplate,
  Aplicações: AppWindow,
  "Redes Sociais": CalendarClock,
  "IA & Automação": Sparkles,
} as const;

export function Services() {
  return (
    <section id="services" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading
            title="O que podemos construir."
            subtitle="Soluções digitais pensadas para diferentes objetivos, negócios e desafios."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.title as keyof typeof serviceIcons];

            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: easeOut }}
                className={cn(
                  "rounded-[var(--radius-card)] border border-border/80 bg-surface/70 p-6",
                  "transition-[border-color,box-shadow,transform] duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_18px_50px_rgba(37,99,235,0.10)]",
                )}
              >
                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-[var(--radius-button)] border border-primary/25 bg-primary/10 text-primary">
                  {Icon ? <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" /> : null}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
