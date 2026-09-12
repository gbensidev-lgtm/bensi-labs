"use client";

import { motion } from "framer-motion";
import { Code, Sparkles, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { TechTag } from "@/components/TechTag";
import { ShaderCard, ShaderCardIcon } from "@/components/ui/feature-shader-cards";
import { stackCategories } from "@/data/stack";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

const stackIcons = {
  Desenvolvimento: Code,
  IA: Sparkles,
  Ferramentas: Terminal,
} as const;

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
            label="Tecnologias"
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
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {stackCategories.map((category, index) => (
            <ShaderCard key={category.title} index={index}>
              <ShaderCardIcon
                icon={stackIcons[category.title as keyof typeof stackIcons]}
              />
              <h3 className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
                {category.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <TechTag
                    key={item}
                    label={item}
                    className="border-border/80 bg-background/45 text-foreground/80"
                  />
                ))}
              </div>
            </ShaderCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
