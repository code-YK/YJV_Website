import * as THREE from "three";

/**
 * Cubic Bézier interpolation for the hero camera path.
 *
 * P(t) = (1-t)^3 P0 + 3(1-t)^2 t P1 + 3(1-t) t^2 P2 + t^3 P3
 *
 * Sampled directly from scroll progress (no per-frame lerp toward a moving
 * target) so motion stays kinematically continuous across the state
 * boundaries at 35% and 70%.
 */
export function cubicBezier(
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
  t: number,
  out: THREE.Vector3,
): THREE.Vector3 {
  const u = 1 - t;
  const uu = u * u;
  const uuu = uu * u;
  const tt = t * t;
  const ttt = tt * t;

  const b0 = uuu;
  const b1 = 3 * uu * t;
  const b2 = 3 * u * tt;
  const b3 = ttt;

  out.set(
    b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x,
    b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y,
    b0 * p0.z + b1 * p1.z + b2 * p2.z + b3 * p3.z,
  );
  return out;
}

/**
 * Control points for the engine-room camera flight, sampled by `progress`.
 *
 * Coordinate system: +X right, +Y up, -Z forward (matches HomeScene3D).
 * - P0 DeepCore: camera buried at the orb's geometric center, looking forward.
 * - P1 Reveal: reverse-zoom out and pan right so the orb sits on the right 40%.
 * - P2 Ledger: hold right-ish while the orb docks left.
 * - P3 Detachment: pull back and recenter to frame the full-width topology.
 */
export const CAMERA_POSITION_PATH = {
  p0: new THREE.Vector3(0, 0, 0.2),
  p1: new THREE.Vector3(-1.6, 0.4, 5.5),
  p2: new THREE.Vector3(-0.4, 0.2, 6.5),
  p3: new THREE.Vector3(0, 0, 9.5),
} as const;

/** Where the camera looks, also a Bézier so the gaze sweeps smoothly. */
export const CAMERA_TARGET_PATH = {
  p0: new THREE.Vector3(0, 0, -3),
  p1: new THREE.Vector3(1.8, 0, -1),
  p2: new THREE.Vector3(-1.8, 0, -1),
  p3: new THREE.Vector3(0, 0, -1),
} as const;
