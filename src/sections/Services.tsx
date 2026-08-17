"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/data/services";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

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
            label="Serviços"
            title="O que podemos construir."
            subtitle="Soluções digitais pensadas para diferentes objetivos, negócios e desafios."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="rounded-[var(--radius-card)] border border-border bg-surface/70 p-6 transition-colors duration-300 hover:border-primary/20"
            >
              <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
