"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Recipe } from "./types";
import {
  objectOrbitTargetY,
  roomTheme,
  sceneBackgroundColor,
  scenePlacement,
  SceneClearAlpha,
} from "./three-scene-shared";
import { SceneRouter } from "./three-scenes/scene-router";

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

export { roomTheme, sceneBackgroundColor } from "./three-scene-shared";

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
  const isPreset = recipe.threeSceneMode === "preset";

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
        shadows={theme.showRoom && !isPreset}
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
        <SceneRouter
          recipe={recipe}
          frozen={frozen}
          lightAz={lightAz}
          lightEl={lightEl}
          transparentBackground={transparentBackground}
        />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={!frozen && orbitEnabled}
          enableRotate={!frozen && orbitEnabled}
          minDistance={isPreset ? 2.5 : 2}
          maxDistance={isPreset ? 9 : 7.5}
          maxPolarAngle={Math.PI * 0.78}
          target={[0, isPreset ? 0.35 : objectOrbitTargetY(usePedestal, recipe.zoom), 0]}
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

export function isReasonableThreeExportCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  const maxDpr = 2.5;
  return canvas.width >= width * 0.45
    && canvas.height >= height * 0.45
    && canvas.width <= width * maxDpr * 1.5
    && canvas.height <= height * maxDpr * 1.5;
}

export function sampleCanvasLuminance(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (context) {
    const sample = context.getImageData(
      Math.floor(canvas.width / 2),
      Math.floor(canvas.height / 2),
      1,
      1,
    ).data;
    return sample[0] + sample[1] + sample[2] + sample[3];
  }

  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!gl) return 0;
  const pixels = new Uint8Array(4);
  gl.readPixels(
    Math.max(0, Math.floor(canvas.width / 2)),
    Math.max(0, Math.floor(canvas.height / 2)),
    1,
    1,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels,
  );
  return pixels[0] + pixels[1] + pixels[2] + pixels[3];
}

export async function waitForThreeExportReady(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  attempts = 240,
) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    if (!isReasonableThreeExportCanvas(canvas, width, height)) continue;
    if (!canvas.hasAttribute("data-three-rendered")) continue;
    if (sampleCanvasLuminance(canvas) > 12) return;
  }
  throw new Error("Scene preview is unavailable");
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
