"use client";

import { Float, Image as DreiImage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";
import * as THREE from "three";

type SceneElementsProps = {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  animate: boolean;
};

function DustField() {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => {
    const count = 90;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.1 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      data[i * 3 + 2] = radius * Math.cos(phi);
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#EDEDED"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalRings({ animate }: { animate: boolean }) {
  const outerRef = useRef<Mesh>(null);
  const midRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!animate) return;
    if (outerRef.current) outerRef.current.rotation.z += delta * 0.18;
    if (midRef.current) midRef.current.rotation.x += delta * 0.12;
    if (innerRef.current) innerRef.current.rotation.y -= delta * 0.22;
  });

  return (
    <group>
      <mesh ref={outerRef} rotation={[Math.PI / 2.15, 0.18, 0]}>
        <torusGeometry args={[1.72, 0.008, 16, 160]} />
        <meshStandardMaterial
          color="#2563EB"
          emissive="#2563EB"
          emissiveIntensity={0.35}
          metalness={0.85}
          roughness={0.22}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={midRef} rotation={[0.55, 0.9, 0.2]}>
        <torusGeometry args={[1.42, 0.006, 16, 140]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={0.28}
          metalness={0.85}
          roughness={0.22}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh ref={innerRef} rotation={[1.2, 0.15, 0.7]}>
        <torusGeometry args={[1.12, 0.004, 12, 120]} />
        <meshStandardMaterial
          color="#EDEDED"
          metalness={0.9}
          roughness={0.18}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}

export function SceneElements({ mouse, animate }: SceneElementsProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetY = mouse.current.x * 0.45;
    const targetX = mouse.current.y * 0.28;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      2.4,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      2.4,
      delta,
    );
  });

  return (
    <group ref={groupRef}>
      <OrbitalRings animate={animate} />
      <DustField />

      <Float
        speed={animate ? 1.1 : 0}
        rotationIntensity={animate ? 0.12 : 0}
        floatIntensity={animate ? 0.35 : 0}
      >
        <DreiImage
          url="/brand/logo-icon.webp"
          transparent
          toneMapped={false}
          scale={1.55}
          position={[0, 0, 0.55]}
        />
      </Float>
    </group>
  );
}
