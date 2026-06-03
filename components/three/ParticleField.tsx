"use client";

import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
}

function buildPositions(count: number, radius: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.cbrt(Math.random()) * radius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function buildSeeds(count: number) {
  const arr = new Float32Array(count);
  for (let i = 0; i < count; i++) arr[i] = Math.random() * Math.PI * 2;
  return arr;
}

export function ParticleField({ count = 3000, radius = 6 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Lazy useState initializers run exactly once per mount — keeps render pure
  // and stable across re-renders without violating React 19's purity rule.
  const [positions] = useState(() => buildPositions(count, radius));
  const [seeds] = useState(() => buildSeeds(count));

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const baseY = positions[i * 3 + 1];
      attr.array[i * 3 + 1] = baseY + Math.sin(t * 0.4 + seeds[i]) * 0.05;
    }
    attr.needsUpdate = true;
  });

  useEffect(() => {
    const points = pointsRef.current;
    const material = materialRef.current;
    return () => {
      points?.geometry.dispose();
      material?.dispose();
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.025}
        color="#e6efff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
