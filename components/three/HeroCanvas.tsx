"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";
import { FloatingNodes } from "./FloatingNodes";

function RotatingScene({
  rotate,
  children,
}: {
  rotate: boolean;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!rotate) return;
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.06;
    g.rotation.x += delta * 0.015;
  });
  return <group ref={groupRef}>{children}</group>;
}

export default function HeroCanvas() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const particleCount = reduced ? 500 : isMobile ? 1500 : 3000;
  const nodeCount = reduced ? 4 : isMobile ? 7 : 10;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#000000", 5, 14]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} color="#3b82f6" intensity={1.2} />
      <pointLight position={[-8, -6, -4]} color="#8b5cf6" intensity={0.6} />
      <RotatingScene rotate={!reduced}>
        <ParticleField count={particleCount} radius={6} />
        <FloatingNodes count={nodeCount} />
      </RotatingScene>
    </Canvas>
  );
}
