"use client";

import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  Box3,
  Color,
  Group,
  Matrix4,
  Vector3,
  type DirectionalLight,
  type Mesh,
  type Object3D,
} from "three";
import type { Recipe, ThreeEnvironmentId, ThreeObjectId } from "./types";
import { isRoomEnvironment } from "./three-catalog";
import {
  createSceneShaderMaterial,
  getThreeShaderMaterial,
  updateSceneShaderMaterial,
} from "./three-materials";

const PEDESTAL_HEIGHT = 0.1;
const PEDESTAL_RADIUS = 0.95;
const FLOOR_Y = 0;
/** Keep pedestal sitting clearly on top of the floor plane. */
const PEDESTAL_BOTTOM = FLOOR_Y + 0.004;
const PEDESTAL_TOP = PEDESTAL_BOTTOM + PEDESTAL_HEIGHT;
/** Nudge into contact surfaces so objects do not hover or z-fight. */
const CONTACT_EPSILON = 0.0008;

function clampObjectScale(zoom: number) {
  return Math.max(0.45, Math.min(2.2, zoom));
}

function objectPivotY(pedestal: boolean) {
  return pedestal ? PEDESTAL_TOP : FLOOR_Y + 0.001;
}

function objectOrbitTargetY(usePedestal: boolean, zoom: number) {
  return objectPivotY(usePedestal) + 0.5 * clampObjectScale(zoom);
}

export function sceneBackgroundColor(recipe: Recipe, theme: RoomTheme) {
  if (recipe.threeEnvironment === "open") {
    return recipe.palette[0] ?? theme.bg;
  }
  return theme.bg;
}

function scenePlacement(recipe: Recipe) {
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

type RoomTheme = {
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

function paletteColors(recipe: Recipe) {
  const a = recipe.palette[1] ?? recipe.palette[0] ?? "#273dff";
  const b = recipe.palette[2] ?? a;
  const c = recipe.palette.at(-1) ?? "#e8fbff";
  return { a, b, c, bg: recipe.palette[0] ?? "#060914" };
}

function lightDirection(az: number, el: number) {
  const elev = el * (Math.PI * 0.42);
  const cosEl = Math.cos(elev);
  return new Vector3(Math.sin(az * Math.PI) * cosEl, Math.sin(elev) + 0.45, Math.cos(az * Math.PI) * cosEl).normalize();
}

function PresetMesh({ objectId, children, ...props }: { objectId: ThreeObjectId } & ComponentProps<"mesh">) {
  const geometry = (() => {
    switch (objectId) {
      case "sphere":
        return <sphereGeometry args={[1, 64, 64]} />;
      case "torus":
        return <torusGeometry args={[0.72, 0.28, 48, 96]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "box":
        return <boxGeometry args={[1.35, 1.35, 1.35]} />;
      case "torus-knot":
        return <torusKnotGeometry args={[0.62, 0.22, 180, 24]} />;
      case "capsule":
        return <capsuleGeometry args={[0.42, 0.95, 16, 32]} />;
      default: {
        const _exhaustive: never = objectId;
        return _exhaustive;
      }
    }
  })();
  return (
    <mesh {...props}>
      {geometry}
      {children}
    </mesh>
  );
}

function UploadedModel({ url }: { url: string }) {
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

function SceneMaterial({ recipe, frozen }: { recipe: Recipe; frozen: boolean }) {
  const colors = paletteColors(recipe);
  const materialId = recipe.threeMaterial;
  const shaderDef = getThreeShaderMaterial(materialId);

  const shaderMat = useMemo(() => {
    if (!shaderDef) return null;
    return createSceneShaderMaterial(shaderDef, recipe, colors);
  }, [
    shaderDef,
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
    updateSceneShaderMaterial(shaderMat, shaderDef, recipe, colors, delta, frozen);
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

function RoomShell({ theme }: { theme: RoomTheme }) {
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

function Pedestal({ color }: { color: string }) {
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

/** Scale from the contact point so the object stays seated on the pedestal/floor. */
function ScaledSubjectContent({
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

function SceneClearAlpha({ enabled }: { enabled: boolean }) {
  useFrame(({ gl, scene }) => {
    if (!enabled) return;
    scene.background = null;
    gl.setClearColor(0x000000, 0);
  });
  return null;
}

function SceneSubject({
  recipe,
  frozen,
  lightAz,
  lightEl,
  transparentBackground,
}: {
  recipe: Recipe;
  frozen: boolean;
  lightAz: number;
  lightEl: number;
  transparentBackground?: boolean;
}) {
  const group = useRef<Group>(null);
  const lightRef = useRef<DirectionalLight>(null);
  const spinRef = useRef(0);
  const scale = clampObjectScale(recipe.zoom);
  const theme = roomTheme(recipe.threeEnvironment);
  const { showRoom, usePedestal, pivotY } = scenePlacement(recipe);
  const bgColor = sceneBackgroundColor(recipe, theme);
  const subjectKey = `${recipe.threeObject}:${recipe.threeModelUpload ?? ""}`;

  useFrame((_, delta) => {
    const dir = lightDirection(lightAz, lightEl);
    if (lightRef.current) {
      lightRef.current.position.copy(dir.clone().multiplyScalar(5.2));
      lightRef.current.intensity = 0.7 + recipe.intensity * 2.4;
      lightRef.current.color.set(theme.lightTint);
      lightRef.current.target.position.set(0, pivotY + 0.45 * scale, 0);
      lightRef.current.target.updateMatrixWorld();
    }
    if (!group.current) return;
    if (!frozen && recipe.animate) {
      spinRef.current += (recipe.reverse ? -1 : 1) * delta * (0.15 + recipe.speed * 0.55);
    }
    group.current.rotation.y = recipe.rotate + spinRef.current;
    group.current.rotation.x = (!frozen && recipe.animate && recipe.drift > 0.01)
      ? Math.sin(performance.now() * 0.00035 * recipe.speed) * recipe.drift * 0.35
      : 0;
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <ambientLight intensity={theme.ambient + recipe.intensity * 0.12} />
      <hemisphereLight args={[theme.hemiSky, theme.hemiGround, 0.35]} />
      <directionalLight
        ref={lightRef}
        castShadow={theme.showRoom}
        intensity={1.6}
        position={[2.5, 3.2, 2.2]}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      {showRoom && <RoomShell theme={theme} />}
      {usePedestal && <Pedestal color={theme.pedestal} />}
      <group ref={group} position={[0, pivotY, 0]}>
        <ScaledSubjectContent scale={scale} contentKey={subjectKey}>
          {recipe.threeModelUpload ? (
            <Suspense fallback={null}>
              <UploadedModel url={recipe.threeModelUpload} />
            </Suspense>
          ) : (
            <PresetMesh objectId={recipe.threeObject} castShadow receiveShadow>
              <SceneMaterial recipe={recipe} frozen={frozen} />
            </PresetMesh>
          )}
        </ScaledSubjectContent>
      </group>
      <Suspense fallback={null}>
        <Environment preset={theme.envPreset} background={false} />
      </Suspense>
    </>
  );
}

function LightDragHandle({
  az,
  el,
  disabled,
  onDrag,
  onCommit,
}: {
  az: number;
  el: number;
  disabled?: boolean;
  onDrag: (az: number, el: number) => void;
  onCommit: (az: number, el: number) => void;
}) {
  const dragging = useRef(false);
  const hostRef = useRef<HTMLButtonElement>(null);

  const left = 12 + ((az + 1) / 2) * 56;
  const top = 12 + ((1 - el) / 2) * 48;

  const readPoint = (event: ReactPointerEvent | PointerEvent, target: HTMLElement) => {
    const root = target.closest(".three-scene-host") as HTMLElement | null;
    if (!root) return null;
    const rect = root.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    return {
      az: Math.max(-1, Math.min(1, x * 2 - 1)),
      el: Math.max(-1, Math.min(1, 1 - y * 2)),
    };
  };

  useEffect(() => {
    if (disabled) return;
    const onMove = (event: PointerEvent) => {
      if (!dragging.current || !hostRef.current) return;
      const next = readPoint(event, hostRef.current);
      if (next) onDrag(next.az, next.el);
    };
    const onUp = (event: PointerEvent) => {
      if (!dragging.current || !hostRef.current) return;
      dragging.current = false;
      hostRef.current.releasePointerCapture?.(event.pointerId);
      const next = readPoint(event, hostRef.current);
      if (next) onCommit(next.az, next.el);
      else onCommit(az, el);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [az, el, disabled, onCommit, onDrag]);

  if (disabled) return null;

  return (
    <button
      ref={hostRef}
      type="button"
      className="scene-light-handle"
      style={{ left: `${left}%`, top: `${top}%` }}
      aria-label="Drag light"
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        const next = readPoint(event, event.currentTarget);
        if (next) onDrag(next.az, next.el);
      }}
    >
      <span className="scene-light-crosshair" aria-hidden>
        <i />
        <b />
      </span>
      <small>DRAG LIGHT</small>
    </button>
  );
}

export function ThreeCanvas({
  recipe,
  frozen,
  onChange,
  transparentBackground = false,
}: {
  recipe: Recipe;
  frozen: boolean;
  onChange?: (update: Partial<Recipe>) => void;
  transparentBackground?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [lightAz, setLightAz] = useState(recipe.offsetX);
  const [lightEl, setLightEl] = useState(recipe.offsetY);
  const [orbitEnabled, setOrbitEnabled] = useState(true);
  const theme = roomTheme(recipe.threeEnvironment);
  const bgColor = sceneBackgroundColor(recipe, theme);
  const { usePedestal } = scenePlacement(recipe);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setLightAz(recipe.offsetX);
    setLightEl(recipe.offsetY);
  }, [recipe.offsetX, recipe.offsetY]);

  if (!mounted) {
    return (
      <div
        className="three-scene-host"
        data-three-scene=""
        data-transparent={transparentBackground ? "true" : undefined}
        style={{ background: transparentBackground ? "transparent" : bgColor }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className="three-scene-host"
      data-three-scene=""
      data-transparent={transparentBackground ? "true" : undefined}
      style={{
        width: "100%",
        height: "100%",
        background: transparentBackground ? "transparent" : bgColor,
        filter: recipe.blur ? `blur(${recipe.blur}px)` : undefined,
        transform: recipe.blur ? "scale(1.025)" : undefined,
      }}
    >
      <Canvas
        className="three-scene-canvas"
        shadows={theme.showRoom}
        dpr={[1, 1.75]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: transparentBackground,
          premultipliedAlpha: false,
        }}
        camera={{ position: [0, 1.15, 4.1], fov: 38, near: 0.1, far: 60 }}
        onCreated={({ gl, scene }) => {
          gl.domElement.setAttribute("data-three-canvas", "");
          if (transparentBackground) {
            scene.background = null;
            gl.setClearColor(0x000000, 0);
            gl.setClearAlpha(0);
          }
        }}
      >
        {transparentBackground && <SceneClearAlpha enabled />}
        <SceneSubject
          recipe={recipe}
          frozen={frozen}
          lightAz={lightAz}
          lightEl={lightEl}
          transparentBackground={transparentBackground}
        />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom
          minDistance={2}
          maxDistance={7.5}
          maxPolarAngle={Math.PI * 0.78}
          target={[0, objectOrbitTargetY(usePedestal, recipe.zoom), 0]}
          enabled={!frozen && orbitEnabled}
        />
      </Canvas>
      <LightDragHandle
        az={lightAz}
        el={lightEl}
        disabled={frozen || !onChange}
        onDrag={(az, el) => {
          setOrbitEnabled(false);
          setLightAz(az);
          setLightEl(el);
        }}
        onCommit={(az, el) => {
          setOrbitEnabled(true);
          setLightAz(az);
          setLightEl(el);
          onChange?.({ offsetX: az, offsetY: el });
        }}
      />
    </div>
  );
}

export function queryThreeCanvas(root: ParentNode = document): HTMLCanvasElement | null {
  return (
    root.querySelector<HTMLCanvasElement>("[data-three-scene] canvas")
    ?? root.querySelector<HTMLCanvasElement>("[data-three-canvas]")
    ?? document.querySelector<HTMLCanvasElement>("[data-three-canvas]")
    ?? root.querySelector<HTMLCanvasElement>(".canvas-area [data-three-scene] canvas")
  );
}

export async function waitForThreeCanvas(attempts = 90) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const canvas = queryThreeCanvas();
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      return canvas;
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  throw new Error("Live scene preview is unavailable");
}

export function querySceneBackgroundCanvas(root: ParentNode = document): HTMLCanvasElement | null {
  return (
    root.querySelector<HTMLCanvasElement>(".three-scene-background canvas")
    ?? document.querySelector<HTMLCanvasElement>(".three-scene-background canvas")
  );
}

export async function exportThreePng(recipe: Recipe, width: number, height: number) {
  const { renderExportShaderCanvas } = await import("./export-render");
  return renderExportShaderCanvas(recipe, width, height);
}

export async function renderThreeFrameToCanvas(
  context: CanvasRenderingContext2D,
  recipe: Recipe,
  width: number,
  height: number,
  threeSurface: import("./export-render").ThreeExportSurface | null = null,
) {
  if (threeSurface) {
    const { drawThreeExportFrame } = await import("./export-render");
    drawThreeExportFrame(context, threeSurface, recipe, width, height);
    return;
  }

  const { renderExportShaderCanvas } = await import("./export-render");
  const frame = await renderExportShaderCanvas(recipe, width, height);
  context.clearRect(0, 0, width, height);
  context.drawImage(frame, 0, 0, width, height);
}
