"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroPortraitProps = {
  className?: string;
};

export function HeroPortrait({ className }: HeroPortraitProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[22rem] lg:max-w-none", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35)_0%,rgba(124,58,237,0.18)_42%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[4%] rounded-full border border-primary/35 shadow-[0_0_60px_rgba(37,99,235,0.22)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-secondary/25"
      />

      <div className="relative mx-auto aspect-square w-[88%] overflow-hidden rounded-full border border-border/70 bg-surface shadow-[0_28px_80px_rgba(15,17,21,0.55)]">
        <Image
          src="/about/gustavo-bensi.webp"
          alt="Gustavo Bensi, fundador da Bensi Labs"
          fill
          priority
          quality={78}
          sizes="(max-width: 1024px) 70vw, 28rem"
          className="object-cover object-[center_18%]"
        />
      </div>
    </div>
  );
}
