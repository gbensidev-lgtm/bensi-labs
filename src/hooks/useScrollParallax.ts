"use client";

import { useRef } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";

type ScrollParallaxOptions = {
  offset?: number;
};

export function useScrollParallax({ offset = 18 }: ScrollParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [offset, -offset],
  );

  return { ref, y };
}
