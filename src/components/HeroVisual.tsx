"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HeroScene3D = dynamic(
  () => import("@/components/hero-scene/HeroScene3D").then((mod) => mod.HeroScene3D),
  { ssr: false },
);

export function HeroVisual() {
  const [pointerEnabled, setPointerEnabled] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setPointerEnabled(pointerQuery.matches);
      setShow3D(!motionQuery.matches && !mobileQuery.matches);
    };

    update();
    pointerQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    return () => {
      pointerQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseRef.current = { x, y };
  };

  const handleLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[17rem] items-center justify-center sm:max-w-sm md:max-w-lg lg:max-w-2xl"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-8 rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,47,56,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(42,47,56,0.45) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
        }}
      />

      <div className="absolute -inset-[12%] overflow-visible">
        {show3D ? (
          <HeroScene3D mouse={mouseRef} animate={pointerEnabled} />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14),transparent_65%)]" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <Image
                src="/brand/logo-icon.webp"
                alt=""
                width={220}
                height={220}
                priority
                sizes="(max-width: 768px) 144px, 176px"
                className="h-auto w-28 sm:w-36 md:w-44"
              />
            </div>
          </>
        )}
      </div>

      {show3D && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_62%)]" />
      )}

      <div className="pointer-events-none absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
    </div>
  );
}
