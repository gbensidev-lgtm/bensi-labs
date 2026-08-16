"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DashboardPreview } from "@/components/DashboardPreview";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  slug: string;
  index: number;
  title: string;
  image?: string;
  preview?: "image" | "dashboard";
  frameLabel?: string;
  className?: string;
};

const coverAccents: Record<string, string> = {
  "raquel-frizo": "from-[#E8B4BC]/15 via-primary/10 to-transparent",
  "sello-docs": "from-primary/25 via-primary/10 to-transparent",
  "dashboard-comercial": "from-primary/20 via-secondary/10 to-transparent",
};

function ProductFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const { ref, y } = useScrollParallax({ offset: 16 });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-8 inset-x-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          quality={72}
          sizes="(max-width: 768px) 100vw, 52vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </motion.div>
    </div>
  );
}

export function ProjectCover({
  slug,
  index,
  title,
  image,
  preview = "image",
  frameLabel,
  className,
}: ProjectCoverProps) {
  const accent = coverAccents[slug] ?? "from-primary/15 via-secondary/10 to-transparent";
  const label = frameLabel ?? title;

  return (
    <ProductFrame label={label}>
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden bg-surface",
          className,
        )}
      >
        {preview === "dashboard" ? (
          <DashboardPreview />
        ) : image ? (
          <>
            <ParallaxImage src={image} alt={`Preview do projeto ${title}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className={cn("absolute inset-0 bg-gradient-to-br", accent)} />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(31,41,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(31,41,55,0.5) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_55%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
              <span className="font-mono text-xs tracking-[0.2em] text-muted">
                {String(index).padStart(2, "0")}
              </span>
              <p className="max-w-[14rem] text-sm font-medium leading-snug text-foreground/90 md:text-base">
                {title}
              </p>
            </div>
          </>
        )}
      </div>
    </ProductFrame>
  );
}
