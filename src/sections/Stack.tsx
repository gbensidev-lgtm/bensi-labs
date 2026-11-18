"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { StackIcon } from "@/components/StackIcon";
import { stackItems } from "@/data/stack";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

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
          <SectionHeading
            title="Ferramentas que utilizamos."
            subtitle="Utilizamos tecnologias modernas para construir soluções rápidas, confiáveis e fáceis de evoluir."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
          className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-border/80 bg-surface/70 p-5 md:p-7"
        >
          <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
            {stackItems.map((item) => (
              <li
                key={item.label}
                className="inline-flex min-h-[4.75rem] min-w-[5.5rem] flex-col items-center justify-center gap-2 rounded-[var(--radius-button)] border border-border/80 bg-background/60 px-3 py-3 text-center transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/8"
              >
                <StackIcon icon={item.icon} />
                <span className="text-[11px] font-medium leading-tight text-foreground/85 md:text-xs">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
