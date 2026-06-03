/**
 * GPU-side morphing particle field — ported from the `scroll-hero` reference
 * demo (Vite + three) into the YJ site. Thousands of small instanced octahedra,
 * each carrying TWO target positions and a scatter direction:
 *
 *   aPosA    — a point on shape A (a DNA double helix)
 *   aPosB    — a point on shape B (a LIGHTBULB)
 *   aScatter — a random outward direction used to "explode" mid-morph
 *
 * A single `uMorph` uniform (0..1) blends A -> B in the vertex shader; a
 * `sin(uMorph*PI)` bulge pushes every particle out along `aScatter` at the
 * midpoint, so the cloud scatters into confetti and re-forms. `instanceMatrix`
 * holds only each particle's spin + size — its centre comes from the
 * attributes. Doing the morph on the GPU keeps thousands of particles cheap
 * (one uniform write per frame instead of thousands of matrix updates).
 *
 * Pure three.js, no React. The renderer (`DalaScene`) owns `uMorph`/`uTime`.
 */
import * as THREE from "three";

// Teal/cyan palette — matches the site accent (#22d3ee). Cyan/teal dominant
// with a sky-blue and a soft-purple accent plus white sparkle, on black.
const PALETTE = [0x22d3ee, 0x2dd4bf, 0x67e8f9, 0x38bdf8, 0xa78bfa, 0xffffff];

// Each instance morphs A (DNA) -> B (bulb); the sin() bulge along aScatter
// blows the cloud out at the midpoint so it scatters then reforms.
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;     // 0 = DNA, 1 = bulb
  uniform float uScatter;   // amplitude of the mid-morph explosion (0 disables)

  attribute vec3 aPosA;
  attribute vec3 aPosB;
  attribute vec3 aScatter;

  varying vec3 vColor;
  varying vec3 vNormalView;
  varying float vShimmer;

  void main() {
    // Where this particle's centre sits right now.
    vec3 center = mix(aPosA, aPosB, uMorph);
    float bulge = sin(uMorph * 3.14159265);        // 0 at ends, 1 at midpoint
    center += aScatter * bulge * uScatter;

    // Per-instance shimmer phase.
    float phase = dot(aPosA, vec3(1.7, 2.3, 3.1));
    float s = sin(uTime * 2.2 + phase) * 0.5 + 0.5;
    vShimmer = s;
    float pulse = 1.0 + 0.18 * (s - 0.5);

    // Octahedron vertices rotated/scaled around the origin, then translated.
    vec3 local = (instanceMatrix * vec4(position * pulse, 1.0)).xyz;
    vec3 finalPos = local + center;

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vNormalView = normalize(normalMatrix * mat3(instanceMatrix) * normal);
    vColor = instanceColor;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec3 vColor;
  varying vec3 vNormalView;
  varying float vShimmer;

  void main() {
    vec3 lightDir = normalize(vec3(0.4, 0.7, 0.8));
    float diffuse = clamp(dot(normalize(vNormalView), lightDir), 0.0, 1.0);
    float lighting = 0.45 + 0.55 * diffuse;

    float brightness = lighting * (0.65 + 0.5 * vShimmer);
    vec3 color = vColor * brightness;
    color += vec3(pow(vShimmer, 6.0)) * 0.6;  // occasional bright glints
    gl_FragColor = vec4(color, 1.0);
  }
`;

const DNA_SCALE = 1.5;
const DNA_TURNS = 1.2; // full helical rotations over the height
const DNA_RADIUS = 0.48; // strand radius from the central axis (gap = 2·radius)
const DNA_HALF_HEIGHT = 1.4; // helix spans y in [-H, +H] before scaling
const DNA_RUNGS = 13; // base-pair rungs between the strands
const DNA_TUBE = 0.11; // cross-section radius — how thick the strands/rungs are

/**
 * A point on a DNA double helix (axis = Y). Two backbone strands spiral around
 * the central axis 180° out of phase, with horizontal base-pair "rungs"
 * crossing between them. The camera looks down -Z, so the side-on X/Y
 * silhouette reads as the classic double helix; the field's slow Y-spin then
 * makes it rotate like a turning strand.
 */
function dnaPoint(out: THREE.Vector3): void {
  const u = Math.random();
  let x: number;
  let y: number;
  let z: number;

  if (u < 0.74) {
    // Backbone — one of the two strands (180° phase apart).
    const phase = Math.random() < 0.5 ? 0 : Math.PI;
    const t = Math.random(); // 0..1 along the helix
    const ang = t * DNA_TURNS * Math.PI * 2 + phase;
    x = Math.cos(ang) * DNA_RADIUS;
    z = Math.sin(ang) * DNA_RADIUS;
    y = (t * 2 - 1) * DNA_HALF_HEIGHT;
  } else {
    // Base-pair rung — a diameter line between the two strands at a quantized
    // height (strand B sits at ang+π = -strandA, so the rung crosses the axis).
    const ri = Math.floor(Math.random() * DNA_RUNGS);
    const t = ri / (DNA_RUNGS - 1);
    const ang = t * DNA_TURNS * Math.PI * 2;
    const f = Math.random(); // 0..1 across the rung
    const ax = Math.cos(ang) * DNA_RADIUS;
    const az = Math.sin(ang) * DNA_RADIUS;
    x = ax * (1 - 2 * f); // lerp from strand A (+) to strand B (−)
    z = az * (1 - 2 * f);
    y = (t * 2 - 1) * DNA_HALF_HEIGHT + (Math.random() - 0.5) * 0.015;
  }

  // Thicken the centreline into a tube: offset by a random point inside a
  // sphere of radius DNA_TUBE (cbrt keeps the fill even, not centre-heavy).
  const tu = Math.random() * 2 - 1;
  const tt = Math.random() * Math.PI * 2;
  const ts = Math.sqrt(1 - tu * tu);
  const tr = DNA_TUBE * Math.cbrt(Math.random());
  x += ts * Math.cos(tt) * tr;
  y += tu * tr;
  z += ts * Math.sin(tt) * tr;

  out.set(x * DNA_SCALE, y * DNA_SCALE, z * DNA_SCALE);
}

const BULB_SCALE = 1.6;

/** A point on a lightbulb silhouette (surface of revolution about Y). */
function bulbPoint(out: THREE.Vector3): void {
  const u = Math.random();
  let y: number;
  let rAt: number;

  if (u < 0.58) {
    const cy = 0.45;
    const R = 0.92;
    y = Math.random() * 1.3;
    const dy = y - cy;
    rAt = Math.sqrt(Math.max(0, R * R - dy * dy));
  } else if (u < 0.72) {
    y = -0.4 + Math.random() * 0.4;
    const f = (y + 0.4) / 0.4;
    rAt = 0.27 + (0.64 - 0.27) * f;
  } else {
    y = -1.25 + Math.random() * 0.85;
    rAt = 0.32 + 0.06 * Math.sin(y * 24);
    if (y < -1.05) rAt *= 0.25 + 0.75 * ((y + 1.25) / 0.2);
  }

  const ang = Math.random() * Math.PI * 2;
  const shell = 0.9 + Math.random() * 0.18;
  const rr = rAt * shell;
  out.set(
    Math.cos(ang) * rr * BULB_SCALE,
    (y - 0.15) * BULB_SCALE,
    Math.sin(ang) * rr * BULB_SCALE,
  );
}

export interface MorphField {
  mesh: THREE.InstancedMesh;
  material: THREE.ShaderMaterial;
  geometry: THREE.OctahedronGeometry;
  dispose(): void;
}

/**
 * Build the morphing instanced field. Shape A is a DNA double helix, shape B is
 * a bulb; `uMorph` drives A -> scatter -> B. `scatter:false` (reduced motion)
 * disables the mid-morph explosion so the cloud simply blends between the forms.
 */
export function createMorphField({
  count = 7000,
  scatter = true,
}: { count?: number; scatter?: boolean } = {}): MorphField {
  const geometry = new THREE.OctahedronGeometry(0.03);

  const arrA = new Float32Array(count * 3);
  const arrB = new Float32Array(count * 3);
  const arrScatter = new Float32Array(count * 3);

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uScatter: { value: scatter ? 1 : 0 },
    },
  });

  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.frustumCulled = false;
  mesh.instanceColor = new THREE.InstancedBufferAttribute(
    new Float32Array(count * 3),
    3,
  );

  const dummy = new THREE.Object3D();
  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    dnaPoint(vA);
    arrA[i * 3] = vA.x;
    arrA[i * 3 + 1] = vA.y;
    arrA[i * 3 + 2] = vA.z;

    bulbPoint(vB);
    arrB[i * 3] = vB.x;
    arrB[i * 3 + 1] = vB.y;
    arrB[i * 3 + 2] = vB.z;

    // Random outward direction * random magnitude for the scatter burst.
    dir
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize()
      .multiplyScalar(2.5 + Math.random() * 4.0);
    arrScatter[i * 3] = dir.x;
    arrScatter[i * 3 + 1] = dir.y;
    arrScatter[i * 3 + 2] = dir.z;

    // instanceMatrix: rotation + scale only, centred at the origin.
    dummy.position.set(0, 0, 0);
    dummy.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    );
    dummy.scale.setScalar(0.6 + Math.random() * 0.9);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    mesh.setColorAt(i, color);
  }

  geometry.setAttribute("aPosA", new THREE.InstancedBufferAttribute(arrA, 3));
  geometry.setAttribute("aPosB", new THREE.InstancedBufferAttribute(arrB, 3));
  geometry.setAttribute(
    "aScatter",
    new THREE.InstancedBufferAttribute(arrScatter, 3),
  );

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  return {
    mesh,
    material,
    geometry,
    dispose() {
      geometry.dispose();
      material.dispose();
      mesh.dispose();
    },
  };
}
