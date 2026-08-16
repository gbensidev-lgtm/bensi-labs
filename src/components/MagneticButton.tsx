"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary:
    "border border-primary/25 bg-primary/10 text-foreground hover:-translate-y-px hover:border-primary/50 hover:bg-primary/18 hover:shadow-[0_0_24px_rgba(37,99,235,0.14)]",
  secondary:
    "border border-border bg-surface text-foreground hover:-translate-y-px hover:border-primary/35 hover:bg-surface/90 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)]",
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.2 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: enabled ? springX : 0, y: enabled ? springY : 0 }}>
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-button)] px-5 py-2.5 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform,filter] duration-200 ease-out hover:brightness-110",
          variants[variant],
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
