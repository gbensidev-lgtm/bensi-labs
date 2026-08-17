"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroVisual } from "@/components/HeroVisual";
import { MagneticButton } from "@/components/MagneticButton";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 72]);
  const visualY = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 40]);
  const copyY = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 18]);

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-start overflow-x-clip pt-24 pb-16 md:items-center md:pt-28 md:pb-24"
    >
      <motion.div style={{ y: glowY }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.07),transparent_70%)]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/4 translate-y-1/4 rounded-full bg-secondary/4 blur-3xl" />
      </motion.div>

      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            style={{ y: copyY }}
            className="max-w-2xl will-change-transform"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-sm tracking-[0.28em] text-primary uppercase md:text-base"
            >
              Bensi Labs
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-mono text-sm tracking-[0.18em] text-muted uppercase md:text-base"
            >
              AI Product Engineer · Software · Automation
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Transformamos
              <br />
              ideias em
              <br />
              produtos digitais.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              Sites, landing pages, aplicações e soluções inteligentes
              desenvolvidas para resolver problemas reais de negócio.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton href="#projects" variant="primary">
                Ver projetos
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Vamos conversar
              </MagneticButton>
            </motion.div>

            <motion.a
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              href="#projects"
              className="mt-12 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase transition-colors duration-200 hover:text-foreground"
            >
              Explore os projetos
              <span aria-hidden="true" className="scroll-hint-arrow">
                ↓
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ y: visualY }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative will-change-transform"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
