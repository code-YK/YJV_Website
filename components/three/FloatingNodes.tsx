"use client";

import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NodeSpec {
  position: [number, number, number];
  scale: number;
  color: string;
  rotationSpeed: [number, number, number];
  pulseSpeed: number;
  pulseAmp: number;
}

const COLORS = ["#3b82f6", "#8b5cf6", "#60a5fa"];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function buildNodes(count: number): NodeSpec[] {
  return Array.from({ length: count }, () => ({
    position: [rand(-4, 4), rand(-2.5, 2.5), rand(-3, 1)],
    scale: rand(0.18, 0.45),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotationSpeed: [rand(0.05, 0.25), rand(0.05, 0.25), rand(0.05, 0.25)],
    pulseSpeed: rand(0.6, 1.4),
    pulseAmp: rand(0.06, 0.14),
  }));
}

export function FloatingNodes({ count = 10 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Lazy useState initializer runs once per mount — pure during render.
  const [nodes] = useState(() => buildNodes(count));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < nodes.length; i++) {
      const mesh = meshRefs.current[i];
      const spec = nodes[i];
      if (!mesh) continue;
      mesh.rotation.x += spec.rotationSpeed[0] * delta;
      mesh.rotation.y += spec.rotationSpeed[1] * delta;
      mesh.rotation.z += spec.rotationSpeed[2] * delta;
      const s = spec.scale * (1 + Math.sin(t * spec.pulseSpeed + i) * spec.pulseAmp);
      mesh.scale.setScalar(s);
    }
  });

  useEffect(() => {
    const meshes = meshRefs.current;
    return () => {
      meshes.forEach((mesh) => {
        if (!mesh) return;
        mesh.geometry.dispose();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      });
    };
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={node.position}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            wireframe
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}
