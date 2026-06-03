import * as THREE from "three";
import type { HeroStateValue } from "@/lib/hero/scrollStore";

/**
 * The Digital Orb — a math-generated instanced vertex particle system with a
 * custom GLSL shader. No 3D assets. The vertex shader morphs continuously
 * across the four scroll states (DeepCore -> Reveal -> Ledger -> Detachment)
 * driven by a single `u_progress` uniform; the fragment shader runs the
 * cyan -> blue -> violet -> green gradient. A light LineSegments constellation
 * rides the same group for the "node links" look.
 *
 * Pure THREE — no React, no DOM, no business logic. The owner (Scene.tsx)
 * feeds it progress each frame and disposes it on unmount.
 */

export interface OrbHandle {
  object3D: THREE.Object3D;
  update(progress: number, state: HeroStateValue, elapsed: number): void;
  dispose(): void;
}

export interface CreateOrbOptions {
  particleCount: number;
  pixelRatio: number;
}

const vertexShader = /* glsl */ `
uniform float u_progress;
uniform float u_time;
uniform float u_size;
uniform float u_pixelRatio;

attribute vec3 aSphere;
attribute vec3 aScatter;
attribute float aSeed;

varying float vColorT;
varying float vAlpha;

void main() {
  float pReveal = smoothstep(0.0, 0.35, u_progress);
  float pDetach = smoothstep(0.70, 1.0, u_progress);

  // 1. Condense from the deep-core scatter cloud onto the bounded sphere.
  vec3 pos = mix(aScatter, aSphere, pReveal);

  // 2. Detachment: stretch vertices horizontally into a wide, flat band.
  vec3 stretched = vec3(
    aSphere.x * 4.0 + (aSeed - 0.5) * 1.5,
    aSphere.y * 0.22,
    aSphere.z * 0.22 - 0.4
  );
  pos = mix(pos, stretched, pDetach);

  // Subtle per-particle breathing while on the sphere.
  float breathe = sin(u_time * 0.8 + aSeed * 6.2831) * 0.03 * pReveal * (1.0 - pDetach);
  pos += normalize(aSphere + 0.0001) * breathe;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Perspective-correct point size, clamped so particles near the lens in the
  // Deep Core state streak past instead of ballooning into giant blobs.
  gl_PointSize = clamp(u_size * u_pixelRatio * (1.0 / max(-mvPosition.z, 0.4)), 1.0, 36.0);

  // Color travels across the gradient with progress, jittered per particle.
  vColorT = clamp(u_progress * 0.7 + aSeed * 0.5, 0.0, 1.0);
  // Fade the cloud out at the very end as the SVG topology takes over.
  vAlpha = 1.0 - smoothstep(0.9, 1.0, u_progress);
}
`;

const fragmentShader = /* glsl */ `
precision mediump float;

varying float vColorT;
varying float vAlpha;

void main() {
  // Soft round point.
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = dot(c, c);
  if (d > 0.25) discard;
  float soft = smoothstep(0.25, 0.0, d);

  vec3 cyan   = vec3(0.133, 0.827, 0.933);
  vec3 blue   = vec3(0.231, 0.510, 0.965);
  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 green  = vec3(0.204, 0.827, 0.600);

  float g = vColorT;
  vec3 col;
  if (g < 0.3333) {
    col = mix(cyan, blue, g / 0.3333);
  } else if (g < 0.6666) {
    col = mix(blue, violet, (g - 0.3333) / 0.3333);
  } else {
    col = mix(violet, green, (g - 0.6666) / 0.3334);
  }

  gl_FragColor = vec4(col, soft * vAlpha);
}
`;

function fibonacciSphere(i: number, n: number, radius: number): THREE.Vector3 {
  // Golden-angle distribution on a sphere shell.
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / Math.max(n - 1, 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i;
  return new THREE.Vector3(
    Math.cos(theta) * r * radius,
    y * radius,
    Math.sin(theta) * r * radius,
  );
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function createDigitalOrb({
  particleCount,
  pixelRatio,
}: CreateOrbOptions): OrbHandle {
  const group = new THREE.Group();
  const radius = 1.4;

  const spherePositions = new Float32Array(particleCount * 3);
  const scatterPositions = new Float32Array(particleCount * 3);
  const seeds = new Float32Array(particleCount);
  // gl_Position requires a `position` attribute; reuse the sphere shape.
  const basePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const s = fibonacciSphere(i, particleCount, radius);
    spherePositions[i * 3] = s.x;
    spherePositions[i * 3 + 1] = s.y;
    spherePositions[i * 3 + 2] = s.z;
    basePositions[i * 3] = s.x;
    basePositions[i * 3 + 1] = s.y;
    basePositions[i * 3 + 2] = s.z;

    // Deep-core scatter: a long tube along Z (some toward the camera at +Z)
    // so particles streak past the lens before condensing.
    scatterPositions[i * 3] = (Math.random() - 0.5) * 6;
    scatterPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    scatterPositions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;

    seeds[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(basePositions, 3),
  );
  geometry.setAttribute("aSphere", new THREE.BufferAttribute(spherePositions, 3));
  geometry.setAttribute(
    "aScatter",
    new THREE.BufferAttribute(scatterPositions, 3),
  );
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

  const uniforms = {
    u_progress: { value: 0 },
    u_time: { value: 0 },
    u_size: { value: 14 },
    u_pixelRatio: { value: pixelRatio },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as { [key: string]: THREE.IUniform },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  group.add(points);

  // Node-link constellation: connect a subset of sphere nodes to nearest
  // neighbours. Static on the sphere; faded in only while the orb is bounded.
  const nodeCount = Math.min(28, Math.floor(particleCount / 120) + 12);
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(fibonacciSphere(i, nodeCount, radius));
  }
  const linePoints: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    // connect to the 2 nearest neighbours
    const dists = nodes
      .map((n, j) => ({ j, d: nodes[i].distanceToSquared(n) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of dists) {
      linePoints.push(nodes[i].x, nodes[i].y, nodes[i].z);
      linePoints.push(nodes[j].x, nodes[j].y, nodes[j].z);
    }
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(linePoints), 3),
  );
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  lines.frustumCulled = false;
  group.add(lines);

  return {
    object3D: group,
    update(progress: number, _state: HeroStateValue, elapsed: number) {
      uniforms.u_progress.value = progress;
      uniforms.u_time.value = elapsed;

      const pReveal = smoothstep(0, 0.35, progress);
      const pLedger = smoothstep(0.35, 0.7, progress);
      const pDetach = smoothstep(0.7, 1, progress);

      // Horizontal dock at the group level so points + lines move together:
      // condense on the right, dock left, then recenter for the topology band.
      const dock = (1.6 * (1 - pLedger) + -1.7 * pLedger) * pReveal;
      group.position.x = dock * (1 - pDetach);

      // Gentle continuous spin while bounded; settle during detachment.
      group.rotation.y = elapsed * 0.12 * (1 - pDetach);
      group.rotation.x = Math.sin(elapsed * 0.2) * 0.08 * (1 - pDetach);

      // Constellation visible only while the orb holds its bounded form.
      lineMaterial.opacity = 0.5 * pReveal * (1 - pDetach);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    },
  };
}
