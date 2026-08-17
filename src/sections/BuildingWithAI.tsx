"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

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
            label="Inteligência artificial"
            title="Tecnologia a serviço do produto."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
          className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-muted md:text-lg"
        >
          <p>
            Inteligência artificial faz parte da forma como desenvolvemos.
          </p>
          <p>
            Utilizamos ferramentas de IA para acelerar pesquisa, prototipação,
            desenvolvimento, análise de dados e automação — mantendo decisões
            técnicas, validação e estratégia sob controle humano.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
