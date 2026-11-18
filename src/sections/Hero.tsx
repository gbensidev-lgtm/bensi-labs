"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroPortrait } from "@/components/HeroPortrait";
import { MagneticButton } from "@/components/MagneticButton";
import { contactLinks } from "@/data/contact";

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

const contactIcons = {
  WhatsApp: MessageCircle,
  "E-mail": Mail,
} as const;

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
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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
              className="text-sm font-semibold tracking-[0.08em] text-primary uppercase md:text-base"
            >
              Bensi Labs
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-sm tracking-wide text-muted md:text-base"
            >
              AI Product Engineer · Software · Automation
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Transformamos{" "}
              <span className="text-primary">ideias</span> em{" "}
              <span className="text-primary">produtos digitais</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              Sites, landing pages, aplicações, redes sociais e soluções
              inteligentes desenvolvidas para resolver problemas reais de negócio.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton href="#projects" variant="primary">
                Ver projetos
              </MagneticButton>
              <MagneticButton href="/briefing" variant="secondary">
                Começar um projeto
              </MagneticButton>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center gap-3"
            >
              {contactLinks.map((link) => {
                const Icon = contactIcons[link.label as keyof typeof contactIcons];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className="inline-flex size-11 items-center justify-center rounded-[var(--radius-button)] border border-border bg-surface/70 text-muted transition-[border-color,color,background-color] duration-200 hover:border-primary/35 hover:bg-primary/10 hover:text-primary"
                    >
                      {Icon ? <Icon className="size-5" strokeWidth={1.6} /> : link.label}
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ y: visualY }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative will-change-transform"
          >
            <HeroPortrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
