"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { homeNode3DPositions } from "@/lib/content/home-node-positions";

const ACCENT = "#a78bfa";
const ACCENT_DIM = "#5b3fa3";

interface HomeScene3DProps {
  /** Continuous scroll progress 0..(nodes.length - 1). */
  progress: number;
}

/**
 * Compute a smooth bezier curve between two node positions.
 * Returns sampled Vector3 points for drei <Line>.
 */
function curvePoints(
  a: [number, number, number],
  b: [number, number, number],
  samples = 32,
): THREE.Vector3[] {
  const p0 = new THREE.Vector3(...a);
  const p3 = new THREE.Vector3(...b);
  // Two control points pulled along Z to make the curve flow forward.
  const mid = p0.clone().lerp(p3, 0.5);
  const dz = (b[2] - a[2]) * 0.4;
  const p1 = new THREE.Vector3(p0.x, p0.y, p0.z + dz);
  const p2 = new THREE.Vector3(p3.x, p3.y, p3.z - dz);
  // Slight outward sag toward midpoint for visual interest.
  p1.add(new THREE.Vector3((mid.x - p0.x) * 0.15, 0.4, 0));
  p2.add(new THREE.Vector3((mid.x - p3.x) * 0.15, -0.4, 0));
  const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
  return curve.getPoints(samples);
}

function Node({
  position,
  active,
  upcoming,
}: {
  position: [number, number, number];
  active: number; // 0..1 how active this node is
  upcoming: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle idle rotation
    meshRef.current.rotation.x = t * 0.18;
    meshRef.current.rotation.y = t * 0.22;
    // Active node breathes
    const breathe = 1 + Math.sin(t * 1.4) * 0.04 * active;
    meshRef.current.scale.setScalar(breathe);
  });

  const intensity = upcoming ? 0.6 : 1.2 + active * 2.4;
  const color = active > 0.1 ? ACCENT : ACCENT_DIM;

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity}
          flatShading
          roughness={0.4}
        />
      </mesh>
      {/* Outer glow ring (a wireframe sphere) */}
      <mesh>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.18 + active * 0.4}
        />
      </mesh>
    </group>
  );
}

function ParticleField({ count = 200 }: { count?: number }) {
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = -Math.random() * 30;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

function SceneCamera({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const i = Math.max(
      0,
      Math.min(progress, homeNode3DPositions.length - 1),
    );
    const idxA = Math.floor(i);
    const idxB = Math.min(idxA + 1, homeNode3DPositions.length - 1);
    const t = i - idxA;

    const a = homeNode3DPositions[idxA].position;
    const b = homeNode3DPositions[idxB].position;

    // Camera focal point lerps between current and next node
    target.set(
      THREE.MathUtils.lerp(a[0], b[0], t),
      THREE.MathUtils.lerp(a[1], b[1], t),
      THREE.MathUtils.lerp(a[2], b[2], t),
    );

    // Position the camera offset back + slightly up from the focal node
    desired.set(target.x * 0.35, target.y + 1.2, target.z + 5.5);

    camera.position.lerp(desired, 0.06);
    camera.lookAt(target);
  });

  return null;
}

function SceneInner({ progress }: { progress: number }) {
  const wires = useMemo(() => {
    const arr: { points: THREE.Vector3[]; from: number }[] = [];
    for (let i = 0; i < homeNode3DPositions.length - 1; i++) {
      arr.push({
        points: curvePoints(
          homeNode3DPositions[i].position,
          homeNode3DPositions[i + 1].position,
        ),
        from: i,
      });
    }
    return arr;
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      <fog attach="fog" args={["#06060a", 8, 28]} />

      <ParticleField />

      {homeNode3DPositions.map((node, i) => {
        const active = Math.max(0, 1 - Math.abs(progress - i));
        const upcoming = i > progress + 0.5;
        return (
          <Node
            key={node.id}
            position={node.position}
            active={active}
            upcoming={upcoming}
          />
        );
      })}

      {wires.map((wire, i) => {
        // Wire is "energized" when progress passes its source node
        const energized = Math.max(0, Math.min(1, progress - wire.from));
        return (
          <Line
            key={`wire-${i}`}
            points={wire.points}
            color={ACCENT}
            lineWidth={1.4}
            transparent
            opacity={0.25 + energized * 0.55}
          />
        );
      })}

      <SceneCamera progress={progress} />
    </>
  );
}

export function HomeScene3D({ progress }: HomeScene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <SceneInner progress={progress} />
    </Canvas>
  );
}
