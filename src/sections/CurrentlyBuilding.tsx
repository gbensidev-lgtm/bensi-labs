"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/Badge";
import { SectionHeading } from "@/components/SectionHeading";
import { buildingItems } from "@/data/building";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading
            label="Em andamento"
            title="Construindo agora"
            subtitle="Projetos e ideias em movimento agora."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-4 md:max-w-xl"
        >
          {buildingItems.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="group rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-colors duration-300 hover:border-primary/25 hover:bg-surface/80"
            >
              <Badge status={item.status} />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              <p className="mt-5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                {item.technology}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
