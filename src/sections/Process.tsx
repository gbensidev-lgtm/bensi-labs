"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/process";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Process() {
  return (
    <section id="process" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading
            label="Processo"
            title="Como transformamos uma ideia em produto."
            subtitle="Um processo simples, transparente e orientado ao resultado."
          />
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid list-none gap-6 pl-0 md:grid-cols-2 lg:grid-cols-5"
        >
          {processSteps.map((step) => (
            <motion.li
              key={step.number}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <p className="font-mono text-xs tracking-[0.22em] text-primary">
                {step.number}
              </p>
              <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
