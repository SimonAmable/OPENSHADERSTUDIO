"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  Box3,
  Group,
  Matrix4,
  Vector3,
  type DirectionalLight,
  type Mesh,
  type Object3D,
} from "three";
import type { Recipe, ThreeEnvironmentId, ThreeMaterialId, ThreeObjectId } from "./types";
import { isRoomEnvironment } from "./three-catalog";
import {
  createSceneShaderMaterial,
  getThreeShaderMaterial,
  updateSceneShaderMaterial,
} from "./three-materials";
import { createPresetObjectGeometry } from "./three-geometries";

export const PEDESTAL_HEIGHT = 0.1;
export const PEDESTAL_RADIUS = 0.95;
export const FLOOR_Y = 0;
export const PEDESTAL_BOTTOM = FLOOR_Y + 0.004;
export const PEDESTAL_TOP = PEDESTAL_BOTTOM + PEDESTAL_HEIGHT;
export const CONTACT_EPSILON = 0.0008;

export function clampObjectScale(zoom: number) {
  return Math.max(0.45, Math.min(2.2, zoom));
}

export function objectPivotY(pedestal: boolean) {
  return pedestal ? PEDESTAL_TOP : FLOOR_Y + 0.001;
}

export function objectOrbitTargetY(usePedestal: boolean, zoom: number) {
  return objectPivotY(usePedestal) + 0.5 * clampObjectScale(zoom);
}

export type RoomTheme = {
  bg: string;
  floor: string;
  wall: string;
  pedestal: string;
  ambient: number;
  hemiSky: string;
  hemiGround: string;
  envPreset: "night" | "warehouse" | "apartment" | "city" | "dawn" | "lobby" | "studio";
  lightTint: string;
  showRoom: boolean;
};

export function sceneBackgroundColor(recipe: Recipe, theme: RoomTheme) {
  if (recipe.threeEnvironment === "open") {
    return recipe.palette[0] ?? theme.bg;
  }
  return theme.bg;
}

export function scenePlacement(recipe: Recipe) {
  const showRoom = isRoomEnvironment(recipe.threeEnvironment);
  const usePedestal = showRoom && recipe.threePedestal;
  return {
    showRoom,
    usePedestal,
    pivotY: objectPivotY(usePedestal),
  };
}

function measureBoundsInRootSpace(root: Object3D): Box3 {
  const bounds = new Box3();
  const scratch = new Box3();
  const inverse = new Matrix4();

  root.updateWorldMatrix(true, true);
  inverse.copy(root.matrixWorld).invert();

  root.traverse((child) => {
    const mesh = child as Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    scratch.copy(mesh.geometry.boundingBox!);
    scratch.applyMatrix4(mesh.matrixWorld);
    scratch.applyMatrix4(inverse);
    bounds.union(scratch);
  });

  return bounds;
}

export function roomTheme(env: ThreeEnvironmentId): RoomTheme {
  switch (env) {
    case "open":
      return {
        bg: "#0a0c12",
        floor: "#0a0c12",
        wall: "#0a0c12",
        pedestal: "#14161c",
        ambient: 0.45,
        hemiSky: "#0a0c12",
        hemiGround: "#0a0c12",
        envPreset: "night",
        lightTint: "#f7f8ff",
        showRoom: false,
      };
    case "nocturne":
      return {
        bg: "#050507",
        floor: "#0c0c10",
        wall: "#111116",
        pedestal: "#050506",
        ambient: 0.12,
        hemiSky: "#2a3140",
        hemiGround: "#050508",
        envPreset: "night",
        lightTint: "#f4f7ff",
        showRoom: true,
      };
    case "gallery":
      return {
        bg: "#cfc9bf",
        floor: "#b7b0a5",
        wall: "#ddd7cd",
        pedestal: "#1a1a1c",
        ambient: 0.42,
        hemiSky: "#f2eee6",
        hemiGround: "#9e968a",
        envPreset: "warehouse",
        lightTint: "#fff8ef",
        showRoom: true,
      };
    case "daylight":
      return {
        bg: "#9fc8e0",
        floor: "#7d8a7c",
        wall: "#b7d3e4",
        pedestal: "#15171a",
        ambient: 0.5,
        hemiSky: "#d7efff",
        hemiGround: "#6f7d6a",
        envPreset: "dawn",
        lightTint: "#fff6e8",
        showRoom: true,
      };
    default: {
      const _exhaustive: never = env;
      return _exhaustive;
    }
  }
}

export function paletteColors(recipe: Recipe) {
  const a = recipe.palette[1] ?? recipe.palette[0] ?? "#273dff";
  const b = recipe.palette[2] ?? a;
  const c = recipe.palette.at(-1) ?? "#e8fbff";
  return { a, b, c, bg: recipe.palette[0] ?? "#060914" };
}

export function lightDirection(az: number, el: number) {
  const elev = el * (Math.PI * 0.42);
  const cosEl = Math.cos(elev);
  return new Vector3(Math.sin(az * Math.PI) * cosEl, Math.sin(elev) + 0.45, Math.cos(az * Math.PI) * cosEl).normalize();
}

export function PresetMesh({ objectId, children, ...props }: { objectId: ThreeObjectId } & ComponentProps<"mesh">) {
  const geometry = useMemo(() => createPresetObjectGeometry(objectId), [objectId]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh key={objectId} geometry={geometry} {...props}>
      {children}
    </mesh>
  );
}

export function UploadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  useEffect(() => () => {
    cloned.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    });
  }, [cloned]);
  return <primitive object={cloned} />;
}

export function SceneMaterial({
  recipe,
  materialId,
  frozen,
}: {
  recipe: Recipe;
  materialId: ThreeMaterialId;
  frozen: boolean;
}) {
  const colors = paletteColors(recipe);
  const shaderDef = getThreeShaderMaterial(materialId);

  const shaderMat = useMemo(() => {
    if (!shaderDef) return null;
    return createSceneShaderMaterial(shaderDef, { ...recipe, threeMaterial: materialId }, colors);
  }, [
    shaderDef,
    materialId,
    colors.a,
    colors.b,
    colors.c,
    recipe.contrast,
    recipe.grain,
    recipe.seed,
    recipe.warp,
    recipe.speed,
    recipe.intensity,
  ]);

  useFrame((_, delta) => {
    if (!shaderMat || !shaderDef) return;
    updateSceneShaderMaterial(shaderMat, shaderDef, { ...recipe, threeMaterial: materialId }, colors, delta, frozen);
  });

  useEffect(() => () => shaderMat?.dispose(), [shaderMat]);

  if (shaderMat) return <primitive object={shaderMat} attach="material" />;

  switch (materialId) {
    case "matte":
      return (
        <meshStandardMaterial
          color={colors.a}
          roughness={0.35 + recipe.contrast * 0.55}
          metalness={0.05}
          envMapIntensity={0.35}
        />
      );
    case "chrome":
      return (
        <meshStandardMaterial
          color={colors.bg}
          roughness={Math.max(0.02, 0.12 - recipe.contrast * 0.08 + recipe.warp * 0.06)}
          metalness={1}
          envMapIntensity={1.35 + recipe.intensity * 0.55}
        />
      );
    case "glass":
      return (
        <meshPhysicalMaterial
          color={colors.b}
          transmission={0.88}
          thickness={0.4 + recipe.contrast * 1.6}
          roughness={0.05 + recipe.grain * 1.4}
          ior={1.2 + recipe.warp * 0.45}
          metalness={0}
          transparent
          opacity={1}
          envMapIntensity={1}
        />
      );
    case "toon":
      return (
        <meshToonMaterial
          color={colors.a}
          emissive={colors.c}
          emissiveIntensity={0.05 + recipe.warp * 0.2}
        />
      );
    case "iridescent":
      return (
        <meshPhysicalMaterial
          color={colors.a}
          metalness={0.7}
          roughness={0.18 + (1 - recipe.contrast) * 0.35}
          iridescence={0.75 + recipe.warp * 0.25}
          iridescenceIOR={1.2 + recipe.warp * 0.6}
          iridescenceThicknessRange={[120 + (recipe.seed % 80), 420 + recipe.contrast * 280]}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={1.1}
        />
      );
    default:
      return null;
  }
}

export function RoomShell({ theme }: { theme: RoomTheme }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color={theme.floor} roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh position={[0, 3.2, -4.6]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[-5.4, 3.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[5.4, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.95} metalness={0} />
      </mesh>
    </group>
  );
}

export function Pedestal({ color }: { color: string }) {
  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, PEDESTAL_BOTTOM + PEDESTAL_HEIGHT / 2, 0]}
    >
      <cylinderGeometry args={[PEDESTAL_RADIUS, PEDESTAL_RADIUS * 1.04, PEDESTAL_HEIGHT, 64]} />
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.15} />
    </mesh>
  );
}

export function ScaledSubjectContent({
  scale,
  contentKey,
  children,
}: {
  scale: number;
  contentKey: string;
  children: ReactNode;
}) {
  const contentRef = useRef<Group>(null);
  const [align, setAlign] = useState<[number, number, number]>([0, 0, 0]);

  useLayoutEffect(() => {
    setAlign([0, 0, 0]);
    const node = contentRef.current;
    if (!node) return;

    let frame = 0;
    let attempts = 0;
    let cancelled = false;

    const measure = () => {
      if (cancelled || !contentRef.current) return;
      const box = measureBoundsInRootSpace(contentRef.current);
      if (box.isEmpty()) {
        if (attempts < 120) {
          attempts += 1;
          frame = requestAnimationFrame(measure);
        }
        return;
      }

      const center = box.getCenter(new Vector3());
      setAlign([
        -center.x,
        -box.min.y - CONTACT_EPSILON,
        -center.z,
      ]);
    };

    measure();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [contentKey]);

  return (
    <group scale={scale}>
      <group position={align}>
        <group ref={contentRef}>{children}</group>
      </group>
    </group>
  );
}

export function SceneClearAlpha({ enabled }: { enabled: boolean }) {
  useFrame(({ gl, scene }) => {
    if (!enabled) return;
    scene.background = null;
    gl.setClearColor(0x000000, 0);
  });
  return null;
}

export function SceneEnvironment({ envPreset }: { envPreset: RoomTheme["envPreset"] }) {
  return (
    <Suspense fallback={null}>
      <Environment preset={envPreset} background={false} />
    </Suspense>
  );
}

export function useSceneRenderedMarker() {
  const renderedRef = useRef(false);
  useFrame(({ gl }) => {
    if (renderedRef.current) return;
    renderedRef.current = true;
    gl.domElement.setAttribute("data-three-rendered", "");
  });
  return renderedRef;
}

export type SceneLightingProps = {
  recipe: Recipe;
  frozen: boolean;
  lightAz: number;
  lightEl: number;
  pivotY: number;
  scale: number;
  theme: RoomTheme;
  lightRef: React.RefObject<DirectionalLight | null>;
  groupRef?: React.RefObject<Group | null>;
  spinGroup?: boolean;
};

export function useSceneLighting({
  recipe,
  frozen,
  lightAz,
  lightEl,
  pivotY,
  scale,
  theme,
  lightRef,
  groupRef,
  spinGroup = true,
}: SceneLightingProps) {
  const spinRef = useRef(0);

  useFrame((_, delta) => {
    const dir = lightDirection(lightAz, lightEl);
    if (lightRef.current) {
      lightRef.current.position.copy(dir.clone().multiplyScalar(5.2));
      lightRef.current.intensity = 0.7 + recipe.intensity * 2.4;
      lightRef.current.color.set(theme.lightTint);
      lightRef.current.target.position.set(0, pivotY + 0.45 * scale, 0);
      lightRef.current.target.updateMatrixWorld();
    }
    if (!groupRef?.current || !spinGroup) return;
    if (!frozen && recipe.animate) {
      spinRef.current += (recipe.reverse ? -1 : 1) * delta * (0.15 + recipe.speed * 0.55);
    }
    groupRef.current.rotation.y = recipe.rotate + spinRef.current;
    groupRef.current.rotation.x = (!frozen && recipe.animate && recipe.drift > 0.01)
      ? Math.sin(performance.now() * 0.00035 * recipe.speed) * recipe.drift * 0.35
      : 0;
  });
}

export function SceneLightingRig({
  theme,
  recipe,
  lightRef,
  castShadow,
}: {
  theme: RoomTheme;
  recipe: Recipe;
  lightRef: React.RefObject<DirectionalLight | null>;
  castShadow?: boolean;
}) {
  return (
    <>
      <ambientLight intensity={theme.ambient + recipe.intensity * 0.12} />
      <hemisphereLight args={[theme.hemiSky, theme.hemiGround, 0.35]} />
      <directionalLight
        ref={lightRef}
        castShadow={castShadow ?? theme.showRoom}
        intensity={1.6}
        position={[2.5, 3.2, 2.2]}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
    </>
  );
}
