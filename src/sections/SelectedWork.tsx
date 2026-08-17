"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredProjects } from "@/data/projects";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function SelectedWork() {
  return (
    <section id="projects" className="section-padding border-t border-border/50">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionHeading
            label="Projetos"
            title="Projetos que já saíram do papel."
            subtitle="Produtos digitais e soluções desenvolvidas pela Bensi Labs — da primeira ideia ao produto publicado."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-28"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <ProjectCard
                project={project}
                index={index + 1}
                reversed={index % 2 === 1}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
