"use client";

import { motion } from "framer-motion";
import { AppWindow, Globe, LayoutTemplate, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import FeaturesCards from "@/components/ui/feature-shader-cards";
import { services } from "@/data/services";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

const serviceIcons = {
  Sites: Globe,
  "Landing Pages": LayoutTemplate,
  Aplicações: AppWindow,
  "IA & Automação": Sparkles,
} as const;

export function Services() {
  const items = services.map((service) => ({
    ...service,
    icon: serviceIcons[service.title as keyof typeof serviceIcons],
  }));

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
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
          className="mt-12"
        >
          <FeaturesCards items={items} />
        </motion.div>
      </div>
    </section>
  );
}
