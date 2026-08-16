"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SceneElements } from "./SceneElements";

type HeroScene3DProps = {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  animate: boolean;
};

export function HeroScene3D({ mouse, animate }: HeroScene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      className="absolute inset-0 h-full w-full"
    >
      <Suspense fallback={null}>
        <fogExp2 attach="fog" args={["#0F1115", 0.035]} />
        <ambientLight intensity={0.35} />
        <spotLight
          position={[4, 5, 6]}
          angle={0.45}
          penumbra={0.8}
          intensity={18}
          color="#2563EB"
        />
        <spotLight
          position={[-5, -2, 4]}
          angle={0.5}
          penumbra={1}
          intensity={10}
          color="#7C3AED"
        />
        <pointLight position={[0, 0, 3]} intensity={4} color="#EDEDED" />
        <Environment preset="city" environmentIntensity={0.45} />
        <SceneElements mouse={mouse} animate={animate} />
      </Suspense>
    </Canvas>
  );
}
