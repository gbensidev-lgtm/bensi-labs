"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { TechTag } from "@/components/TechTag";
import { stackCategories } from "@/data/stack";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Stack() {
  return (
    <section id="stack" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading label="Tecnologias" title="Ferramentas que utilizo." />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {stackCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="rounded-[var(--radius-card)] border border-border bg-surface/60 p-6"
            >
              <h3 className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
                {category.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <TechTag key={item} label={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
