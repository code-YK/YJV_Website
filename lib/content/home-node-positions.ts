/**
 * 3D positions for each home chapter node in the WebGL scene.
 * Order matches the visual chapter sequence (Innovation → Collaboration →
 * Excellence → Purpose → Legacy). The camera flies from one node to the next
 * as the user scrolls. (The former "Future" hero node was replaced by the
 * pinned Digital Engine Room hero, which owns its own camera.)
 *
 * Coordinate system: +X right, +Y up, -Z forward.
 * Camera starts at [0, 0, 5] looking toward -Z.
 */

export interface HomeNode3D {
  id: string;
  /** Position in world space, used by HomeScene3D. */
  position: [number, number, number];
}

export const homeNode3DPositions: HomeNode3D[] = [
  { id: "innovation",    position: [ 3.2,  1.2, -4.5] },
  { id: "collaboration", position: [-3.0,  2.0, -9.0] },
  { id: "excellence",    position: [ 3.8, -0.5, -13.5] },
  { id: "purpose",       position: [-2.4, -1.4, -18.0] },
  { id: "legacy",        position: [ 2.8,  1.0, -22.5] },
];
