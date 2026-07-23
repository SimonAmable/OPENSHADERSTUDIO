import {
  BoxGeometry,
  CapsuleGeometry,
  ExtrudeGeometry,
  IcosahedronGeometry,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  type BufferGeometry,
} from "three";
import type { ThreeObjectId } from "./types";

const EXTRUDE_OPTIONS = {
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 2,
} as const;

function buildStarShape(points: number, outerRadius: number, innerRadius: number, rotation = -Math.PI / 2) {
  const shape = new Shape();
  const step = Math.PI / points;
  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const angle = rotation + index * step;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createStarGeometry() {
  return new ExtrudeGeometry(buildStarShape(5, 1, 0.42), {
    depth: 0.34,
    ...EXTRUDE_OPTIONS,
  });
}

/** Four-point sparkle — the fancy ✦ / asterisk silhouette. */
function createSparkleGeometry() {
  return new ExtrudeGeometry(buildStarShape(4, 1, 0.12, -Math.PI / 2), {
    depth: 0.28,
    ...EXTRUDE_OPTIONS,
  });
}

export function createPresetObjectGeometry(objectId: ThreeObjectId): BufferGeometry {
  switch (objectId) {
    case "sphere":
      return new SphereGeometry(1, 64, 64);
    case "torus":
      return new TorusGeometry(0.72, 0.28, 48, 96);
    case "icosahedron":
      return new IcosahedronGeometry(1, 1);
    case "box":
      return new BoxGeometry(1.35, 1.35, 1.35);
    case "torus-knot":
      return new TorusKnotGeometry(0.62, 0.22, 180, 24);
    case "capsule":
      return new CapsuleGeometry(0.42, 0.95, 16, 32);
    case "star":
      return createStarGeometry();
    case "sparkle":
      return createSparkleGeometry();
    default: {
      const _exhaustive: never = objectId;
      return _exhaustive;
    }
  }
}
