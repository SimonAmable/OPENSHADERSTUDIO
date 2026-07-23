"use client";

import { createRoot, type Root } from "react-dom/client";
import type { Recipe } from "./types";
import {
  ShaderCanvas,
  createPaperExportSurface,
  drawPaperShaderToCanvas,
  isPaperStyle,
} from "./canvas";
import { renderNativeRecipeToCanvas } from "./render-png";
import { exportAsciiPng } from "./ascii-export";
import { captureVfxMediaExportCanvas, exportMediaPng } from "./media-export";
import { isPaperMediaFilter } from "./media-catalog";
import {
  isReasonableThreeExportCanvas,
  roomTheme,
  sampleCanvasLuminance,
  sceneBackgroundColor,
  waitForThreeExportReady,
} from "./three-canvas";

async function settleFrames(frames: number) {
  for (let index = 0; index < frames; index += 1) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
}

async function mountShaderExportHost(recipe: Recipe, width: number, height: number, frozen = true) {
  const host = document.createElement("div");
  host.setAttribute("data-shader-export-host", "");
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;overflow:hidden;pointer-events:none;opacity:0;z-index:-1;`;
  document.body.appendChild(host);

  const shell = document.createElement("div");
  shell.setAttribute("data-shader-export-shell", "");
  shell.style.cssText = "position:absolute;inset:0;width:100%;height:100%;overflow:hidden;";
  host.appendChild(shell);

  let root: Root | null = createRoot(shell);
  root.render(<ShaderCanvas recipe={recipe} frozen={frozen} onError={() => undefined} />);

  const dispose = () => {
    try { root?.unmount(); } catch { /* ignore */ }
    root = null;
    host.remove();
  };

  const queryCanvas = () => {
    if (recipe.kind === "ascii") return host.querySelector<HTMLCanvasElement>("canvas");
    if (recipe.kind === "media") {
      return host.querySelector<HTMLCanvasElement>("[data-media-vfx-canvas]")
        ?? host.querySelector<HTMLCanvasElement>("[data-media-paper] canvas")
        ?? host.querySelector<HTMLCanvasElement>("canvas");
    }
    if (recipe.kind === "3d") {
      return host.querySelector<HTMLCanvasElement>("[data-three-canvas]")
        ?? host.querySelector<HTMLCanvasElement>("[data-three-scene] canvas");
    }
    return host.querySelector<HTMLCanvasElement>(".shader-canvas")
      ?? host.querySelector<HTMLCanvasElement>(".paper-shader-host canvas");
  };

  const waitAttempts = recipe.kind === "media" || recipe.kind === "3d" ? 240 : 180;
  for (let attempt = 0; attempt < waitAttempts; attempt += 1) {
    const canvas = queryCanvas();
    if (recipe.kind === "3d") {
      if (canvas && isReasonableThreeExportCanvas(canvas, width, height) && canvas.hasAttribute("data-three-rendered")) {
        try {
          await waitForThreeExportReady(canvas, width, height);
          await settleFrames(6);
          return { host, canvas, dispose };
        } catch {
          // Keep polling until the scene finishes its first real draw.
        }
      }
    } else if (canvas && canvas.width > 0 && canvas.height > 0) {
      await settleFrames(recipe.kind === "media" ? 45 : 2);
      return { host, canvas, dispose };
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  dispose();
  throw new Error("Could not prepare a full-resolution visual for export");
}

async function waitForSceneBackgroundReady(host: ParentNode, recipe: Recipe) {
  const shaderBg = recipe.threeEnvironment === "open" && recipe.threeOpenBackground === "shader";
  if (!shaderBg) return;

  for (let attempt = 0; attempt < 180; attempt += 1) {
    const backgroundCanvas = host.querySelector<HTMLCanvasElement>(".three-scene-background canvas");
    if (backgroundCanvas && backgroundCanvas.width > 0 && sampleCanvasLuminance(backgroundCanvas) > 12) {
      await settleFrames(4);
      return;
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
}

async function renderThreeSceneExportCanvas(recipe: Recipe, width: number, height: number) {
  const mount = await mountShaderExportHost(recipe, width, height);
  try {
    await waitForSceneBackgroundReady(mount.host, recipe);
    await settleFrames(4);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create export canvas");
    drawThreeExportFrame(context, mount, recipe, width, height);
    return canvas;
  } finally {
    mount.dispose();
  }
}

export type ThreeExportSurface = Awaited<ReturnType<typeof mountShaderExportHost>>;

export async function createThreeExportSurface(recipe: Recipe, width: number, height: number, frozen = true) {
  return mountShaderExportHost(recipe, width, height, frozen);
}

export function drawThreeExportFrame(
  context: CanvasRenderingContext2D,
  surface: ThreeExportSurface,
  recipe: Recipe,
  width: number,
  height: number,
) {
  const theme = roomTheme(recipe.threeEnvironment);
  const shaderBg = recipe.threeEnvironment === "open" && recipe.threeOpenBackground === "shader";
  const backgroundCanvas = shaderBg
    ? surface.host.querySelector<HTMLCanvasElement>(".three-scene-background canvas")
    : null;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.clearRect(0, 0, width, height);

  if (backgroundCanvas && backgroundCanvas.width > 0) {
    context.drawImage(backgroundCanvas, 0, 0, width, height);
  } else {
    context.fillStyle = sceneBackgroundColor(recipe, theme);
    context.fillRect(0, 0, width, height);
  }

  context.drawImage(surface.canvas, 0, 0, width, height);
}

/** Render the active visual at the requested export dimensions (no preview upscaling). */
export async function renderExportShaderCanvas(recipe: Recipe, width: number, height: number) {
  if (recipe.kind === "ascii") {
    return exportAsciiPng(recipe, width, height);
  }

  if (recipe.kind === "media") {
    if (isPaperMediaFilter(recipe.mediaFilter)) {
      return exportMediaPng(recipe, width, height);
    }
    return captureVfxMediaExportCanvas(recipe, width, height);
  }

  if (recipe.kind === "3d") {
    return renderThreeSceneExportCanvas(recipe, width, height);
  }

  if (isPaperStyle(recipe.style)) {
    const surface = await createPaperExportSurface(recipe, width, height);
    try {
      surface.mount.setFrame(recipe.seed);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      drawPaperShaderToCanvas(canvas, surface.canvas, recipe, width, height);
      return canvas;
    } finally {
      surface.dispose();
    }
  }

  return renderNativeRecipeToCanvas(recipe, width, height);
}
