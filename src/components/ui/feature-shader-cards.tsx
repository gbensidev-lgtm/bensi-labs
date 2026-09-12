"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Warp } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ShaderShape = "checks" | "stripes" | "edge";

type ShaderConfig = {
  proportion: number;
  softness: number;
  distortion: number;
  swirl: number;
  swirlIterations: number;
  shape: ShaderShape;
  shapeScale: number;
  colors: string[];
};

const brandShaders: ShaderConfig[] = [
  {
    proportion: 0.32,
    softness: 1,
    distortion: 0.14,
    swirl: 0.55,
    swirlIterations: 8,
    shape: "checks",
    shapeScale: 0.08,
    colors: ["#0F1115", "#2563EB", "#1C1F26", "#7C3AED"],
  },
  {
    proportion: 0.4,
    softness: 1,
    distortion: 0.18,
    swirl: 0.7,
    swirlIterations: 10,
    shape: "stripes",
    shapeScale: 0.1,
    colors: ["#1C1F26", "#7C3AED", "#0F1115", "#2563EB"],
  },
  {
    proportion: 0.36,
    softness: 0.95,
    distortion: 0.16,
    swirl: 0.62,
    swirlIterations: 9,
    shape: "edge",
    shapeScale: 0.09,
    colors: ["#0F1115", "#2563EB", "#7C3AED", "#1C1F26"],
  },
  {
    proportion: 0.44,
    softness: 1,
    distortion: 0.2,
    swirl: 0.78,
    swirlIterations: 12,
    shape: "checks",
    shapeScale: 0.11,
    colors: ["#1C1F26", "#2563EB", "#0F1115", "#7C3AED"],
  },
];

function getShaderConfig(index: number) {
  return brandShaders[index % brandShaders.length];
}

function useVisibleOnScreen() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

type ShaderCardProps = {
  index: number;
  children: ReactNode;
  className?: string;
};

export function ShaderCard({ index, children, className }: ShaderCardProps) {
  const reduceMotion = useReducedMotion();
  const { ref, visible } = useVisibleOnScreen();
  const shader = getShaderConfig(index);
  const runShader = visible && !reduceMotion;

  return (
    <article
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface/80",
        "transition-[border-color,box-shadow] duration-300 ease-out",
        "hover:border-primary/30 hover:shadow-[0_18px_60px_rgba(37,99,235,0.12)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {runShader ? (
          <Warp
            style={{ width: "100%", height: "100%" }}
            proportion={shader.proportion}
            softness={shader.softness}
            distortion={shader.distortion}
            swirl={shader.swirl}
            swirlIterations={shader.swirlIterations}
            shape={shader.shape}
            shapeScale={shader.shapeScale}
            scale={1}
            rotation={0}
            speed={0.35}
            colors={shader.colors}
            minPixelRatio={1}
            maxPixelCount={480 * 320}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{ backgroundImage: "var(--gradient-subtle)" }}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,21,0.88)_0%,rgba(28,31,38,0.78)_100%)]" />

      <div className="relative z-10 flex h-full flex-col p-6 md:p-7">{children}</div>
    </article>
  );
}

export function ShaderCardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="mb-5 flex size-11 items-center justify-center rounded-[var(--radius-button)] border border-primary/20 bg-primary/10">
      <Icon className="size-5 text-primary" strokeWidth={1.6} aria-hidden="true" />
    </div>
  );
}

type ServiceShaderCardProps = {
  title: string;
  description: string;
  index: number;
  icon: LucideIcon;
  className?: string;
};

export function ServiceShaderCard({
  title,
  description,
  index,
  icon,
  className,
}: ServiceShaderCardProps) {
  return (
    <ShaderCard index={index} className={cn("min-h-[14rem]", className)}>
      <ShaderCardIcon icon={icon} />
      <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-muted">{description}</p>
    </ShaderCard>
  );
}

export default function FeaturesCards({
  items,
}: {
  items: Array<{ title: string; description: string; icon: LucideIcon }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <ServiceShaderCard
          key={item.title}
          title={item.title}
          description={item.description}
          icon={item.icon}
          index={index}
        />
      ))}
    </div>
  );
}
