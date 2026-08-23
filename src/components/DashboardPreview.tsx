"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const days = ["S", "T", "Q", "Q", "S", "S", "D"];

const dashboards = [
  {
    name: "Comercial",
    source: "Planilha",
    bars: [42, 58, 49, 76, 64, 88, 71],
  },
  {
    name: "Operações",
    source: "Power BI",
    bars: [68, 52, 74, 61, 83, 55, 70],
  },
  {
    name: "Financeiro",
    source: "Planilha",
    bars: [35, 48, 44, 62, 58, 51, 67],
  },
] as const;

type DashboardName = (typeof dashboards)[number]["name"];

export function DashboardPreview() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<DashboardName>("Comercial");
  const current = dashboards.find((dashboard) => dashboard.name === selected) ?? dashboards[0];

  return (
    <div
      className="relative flex h-full min-h-[16rem] flex-col bg-[#12151b] p-3 sm:min-h-[18rem] sm:p-4 md:p-5"
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
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
            Central de dashboards
          </p>
          <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">
            Acesso da empresa
          </p>
        </div>
        <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-primary uppercase sm:inline-flex">
          Equipe
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Dashboards da empresa"
        className="relative mt-3 grid grid-cols-3 gap-2"
      >
        {dashboards.map((dashboard) => {
          const isSelected = dashboard.name === selected;

          return (
            <button
              key={dashboard.name}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelected(dashboard.name)}
              className={cn(
                "cursor-pointer rounded-lg border px-2.5 py-2 text-left transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#12151b]",
                isSelected
                  ? "border-primary/35 bg-primary/10"
                  : "border-border/80 bg-surface/80 hover:border-primary/25 hover:bg-primary/5",
              )}
            >
              <p className="text-xs font-semibold text-foreground">{dashboard.name}</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-muted uppercase">
                {dashboard.source}
              </p>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-label={`${current.name} · ${current.source}`}
        className="relative mt-3 flex min-h-0 flex-1 flex-col rounded-lg border border-border/80 bg-surface/70 p-3"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
            {current.name}
          </p>
          <p className="font-mono text-[10px] text-muted">{current.source}</p>
        </div>

        <div className="mt-3 flex min-h-[5.5rem] flex-1 items-end gap-1.5 sm:gap-2">
          {current.bars.map((height, index) => (
            <div key={`${current.name}-day-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <motion.div
                className="w-full origin-bottom rounded-sm bg-gradient-to-t from-primary/80 to-secondary/70"
                initial={reduceMotion ? false : { height: "18%", opacity: 0.45 }}
                animate={{ height: `${height}%`, opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : index * 0.03,
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
