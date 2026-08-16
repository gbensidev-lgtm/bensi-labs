"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/Badge";
import { SectionHeading } from "@/components/SectionHeading";
import { exploringItems } from "@/data/exploring";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Exploring() {
  return (
    <section id="exploring" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading
            label="Aprendizado"
            title="Explorando agora"
            subtitle="Áreas em estudo — ainda não são prática consolidada."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-10 flex flex-wrap gap-3"
        >
          {exploringItems.map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              transition={{ duration: 0.4, ease: easeOut }}
              className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2.5"
            >
              <span className="text-sm text-foreground">{item}</span>
              <Badge status="exploring" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
