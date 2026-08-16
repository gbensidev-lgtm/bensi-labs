"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { aiConcepts } from "@/data/ai-concepts";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function BuildingWithAI() {
  return (
    <section id="ai-development" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading
            label="Fluxo de trabalho"
            title="Construindo com IA."
            subtitle="Aplicando na prática o que estou aprendendo."
          />
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
          className="mt-8 max-w-3xl text-base leading-relaxed text-muted md:text-lg"
        >
          Inteligência artificial faz parte de como eu construo — da ideação ao deploy.
          Não como substituto do pensamento, mas como ferramenta para planejar melhor,
          modelar dados, escrever código e publicar soluções reais.
        </motion.p>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.12, ease: easeOut }}
          className="mt-4 font-mono text-xs tracking-[0.16em] text-primary uppercase"
        >
          O que estou praticando agora.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {aiConcepts.map((concept) => (
            <motion.article
              key={concept.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="rounded-[var(--radius-card)] border border-border bg-surface/70 p-6 transition-colors duration-300 hover:border-primary/20"
            >
              <h3 className="text-base font-semibold text-foreground">{concept.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{concept.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
