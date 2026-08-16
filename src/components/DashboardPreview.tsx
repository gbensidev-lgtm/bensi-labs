"use client";

import { motion, useReducedMotion } from "framer-motion";

const kpis = [
  { label: "Receita", value: "R$ 248,4k", delta: "+12,4%" },
  { label: "Pedidos", value: "1.284", delta: "+8,1%" },
  { label: "Conversão", value: "3,8%", delta: "+0,4%" },
  { label: "Ticket", value: "R$ 193", delta: "+2,2%" },
];

const bars = [42, 58, 49, 76, 64, 88, 71];
const days = ["S", "T", "Q", "Q", "S", "S", "D"];

export function DashboardPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-full min-h-[16rem] flex-col bg-[#12151b] p-3 sm:min-h-[18rem] sm:p-4 md:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,47,56,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(42,47,56,0.7) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_45%)]" />

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
            Operação comercial
          </p>
          <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">
            Indicadores ao vivo
          </p>
        </div>
        <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-primary uppercase sm:inline-flex">
          Hoje
        </span>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-border/80 bg-surface/80 px-2.5 py-2"
          >
            <p className="font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
              {kpi.label}
            </p>
            <p className="mt-1 text-xs font-semibold text-foreground sm:text-sm">{kpi.value}</p>
            <p className="mt-0.5 font-mono text-[9px] text-primary">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-3 flex min-h-0 flex-1 flex-col rounded-lg border border-border/80 bg-surface/70 p-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
            Volume semanal
          </p>
          <p className="font-mono text-[10px] text-muted">7d</p>
        </div>

        <div className="mt-3 flex min-h-[5.5rem] flex-1 items-end gap-1.5 sm:gap-2">
          {bars.map((height, index) => (
            <div key={`day-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <motion.div
                className="w-full origin-bottom rounded-sm bg-gradient-to-t from-primary/80 to-secondary/70"
                style={{ height: `${height}%` }}
                initial={reduceMotion ? false : { scaleY: 0.2, opacity: 0.35 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <span className="font-mono text-[9px] text-muted">{days[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
