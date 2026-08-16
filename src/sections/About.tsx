"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

export function About() {
  const { ref, y } = useScrollParallax({ offset: 22 });

  return (
    <section id="about" className="section-padding border-t border-border/50">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: easeOut }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[calc(var(--radius-card)+16px)] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(124,58,237,0.12),transparent_50%)]" />
            <div
              ref={ref}
              className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border border-border/80 bg-surface shadow-[0_24px_80px_rgba(15,17,21,0.45)]"
            >
              <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0 will-change-transform">
                <Image
                  src="/about/gustavo-bensi.webp"
                  alt="Gustavo Bensi, fundador da Bensi Labs"
                  fill
                  loading="lazy"
                  quality={78}
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover object-[center_18%]"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            className="max-w-xl"
          >
            <p className="font-mono text-xs tracking-[0.24em] text-primary uppercase">
              Sobre
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Gustavo Bensi
            </h2>
            <p className="mt-3 font-mono text-xs tracking-[0.16em] text-muted uppercase md:text-sm">
              Por trás da{" "}
              <span className="text-foreground">Bensi</span>{" "}
              <span className="text-gradient-brand">Labs</span>
            </p>

            <p className="mt-8 text-lg leading-relaxed text-muted md:text-xl">
              Eu sou Gustavo Bensi. A{" "}
              <span className="font-semibold text-foreground">Bensi Labs</span> é o
              laboratório que eu construo — o espaço onde transformo o que estou
              aprendendo em Estratégia e Desenvolvimento de Soluções de IA em
              software, dados e produtos digitais.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted/90">
              Hoje também trabalho com dashboards e análises em empresas, usando
              código, inteligência artificial e contexto de negócio para transformar
              problemas reais em soluções que funcionam.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted/90">
              Cada projeto é parte de um processo contínuo: planejar, construir,
              testar, publicar e evoluir. Não estou tentando parecer especialista em
              tudo; estou compartilhando o que estou realmente construindo na prática.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
