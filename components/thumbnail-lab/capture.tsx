"use client";

import { createRoot } from "react-dom/client";
import type { Recipe } from "../shader-studio/types";
import {
  createPaperExportSurface,
  drawPaperShaderToCanvas,
  isPaperStyle,
} from "../shader-studio/canvas";
import { renderNativeRecipeToCanvas, canvasToPngBlob } from "../shader-studio/render-png";
import { exportAsciiPng } from "../shader-studio/ascii-export";
import { exportThreePng } from "../shader-studio/three-canvas";
import { isPaperMediaFilter } from "../shader-studio/media-catalog";
import { exportMediaPng, resolveMediaImageForExport } from "../shader-studio/media-export";
import { MediaCanvas } from "../shader-studio/media-canvas";
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../shader-studio/preview-recipes";

let vfxCaptureChain: Promise<void> = Promise.resolve();

function withVfxCaptureLock<T>(fn: () => Promise<T>): Promise<T> {
  const result = vfxCaptureChain.then(fn);
  vfxCaptureChain = result.then(() => undefined, () => undefined);
  return result;
}

function snapshotVfxCanvases() {
  return new Set(document.querySelectorAll("[data-media-vfx-canvas]"));
}

function snapshotBodyVfxCanvases() {
  const canvases = new Set<HTMLCanvasElement>();
  for (const canvas of document.body.querySelectorAll("canvas")) {
    const style = canvas.style;
    if ((style.position === "fixed" || style.position === "absolute") && style.pointerEvents === "none") {
      canvases.add(canvas);
    }
  }
  return canvases;
}

async function settleFrames(frames: number) {
  for (let attempt = 0; attempt < frames; attempt += 1) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
}

async function paintPixelatePreview(recipe: Recipe, target: HTMLCanvasElement) {
  const dataUrl = await resolveMediaImageForExport(recipe);
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error("Could not load media preview"));
    element.src = dataUrl;
  });
  const width = THUMBNAIL_WIDTH;
  const height = THUMBNAIL_HEIGHT;
  const block = Math.max(4, Math.round(4 + recipe.intensity * 28 + recipe.warp * 16));
  const smallWidth = Math.max(2, Math.ceil(width / block));
  const smallHeight = Math.max(2, Math.ceil(height / block));
  const scratch = document.createElement("canvas");
  scratch.width = smallWidth;
  scratch.height = smallHeight;
  const scratchCtx = scratch.getContext("2d");
  const targetCtx = target.getContext("2d");
  if (!scratchCtx || !targetCtx) return false;
  const scale = Math.max(smallWidth / image.width, smallHeight / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  scratchCtx.drawImage(image, (smallWidth - drawWidth) / 2, (smallHeight - drawHeight) / 2, drawWidth, drawHeight);
  target.width = width;
  target.height = height;
  targetCtx.imageSmoothingEnabled = false;
  targetCtx.drawImage(scratch, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
  return true;
}

async function captureShaderCanvas(recipe: Recipe): Promise<HTMLCanvasElement> {
  if (isPaperStyle(recipe.style)) {
    const surface = await createPaperExportSurface(recipe, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    try {
      surface.mount.setFrame(recipe.seed);
      const canvas = document.createElement("canvas");
      canvas.width = THUMBNAIL_WIDTH;
      canvas.height = THUMBNAIL_HEIGHT;
      drawPaperShaderToCanvas(canvas, surface.canvas, recipe, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
      return canvas;
    } finally {
      surface.dispose();
    }
  }
  return renderNativeRecipeToCanvas(recipe, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
}

async function waitForFreshVfxCanvas(
  taggedBefore: Set<Element>,
  bodyBefore: Set<HTMLCanvasElement>,
  attempts = 240,
) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const tagged = document.querySelectorAll<HTMLCanvasElement>("[data-media-vfx-canvas]");
    for (const canvas of tagged) {
      if (!taggedBefore.has(canvas) && canvas.width > 0 && canvas.height > 0) {
        await settleFrames(90);
        return canvas;
      }
    }
    for (const canvas of document.body.querySelectorAll("canvas")) {
      const style = canvas.style;
      if (!bodyBefore.has(canvas)
        && (style.position === "fixed" || style.position === "absolute")
        && style.pointerEvents === "none"
        && canvas.width > 0
        && canvas.height > 0) {
        await settleFrames(90);
        return canvas;
      }
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  throw new Error("VFX preview canvas was not ready");
}

async function captureVfxMediaCanvas(recipe: Recipe): Promise<HTMLCanvasElement> {
  return withVfxCaptureLock(async () => {
    const taggedBefore = snapshotVfxCanvases();
    const bodyBefore = snapshotBodyVfxCanvases();
    const host = document.createElement("div");
    host.setAttribute("data-thumbnail-capture", "");
    host.style.cssText = `position:fixed;left:-10000px;top:0;width:${THUMBNAIL_WIDTH}px;height:${THUMBNAIL_HEIGHT}px;overflow:hidden;pointer-events:none;opacity:0;z-index:-1;`;
    document.body.appendChild(host);
    const root = createRoot(host);
    root.render(<MediaCanvas recipe={recipe} frozen={false} />);

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1800));
      const source = await waitForFreshVfxCanvas(taggedBefore, bodyBefore);
      const canvas = document.createElement("canvas");
      canvas.width = THUMBNAIL_WIDTH;
      canvas.height = THUMBNAIL_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create export canvas");
      ctx.drawImage(source, 0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
      return canvas;
    } finally {
      root.unmount();
      host.remove();
      await new Promise<void>((resolve) => setTimeout(resolve, 80));
    }
  });
}

async function captureMediaCanvas(recipe: Recipe): Promise<HTMLCanvasElement> {
  if (recipe.mediaFilter === "vfx-pixelate") {
    const canvas = document.createElement("canvas");
    const painted = await paintPixelatePreview(recipe, canvas);
    if (!painted) throw new Error("Could not render pixelate preview");
    return canvas;
  }
  if (isPaperMediaFilter(recipe.mediaFilter)) {
    return exportMediaPng(recipe, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
  }
  return captureVfxMediaCanvas(recipe);
}

async function captureAsciiCanvas(recipe: Recipe): Promise<HTMLCanvasElement> {
  return exportAsciiPng(recipe, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
}

async function captureSceneCanvas(recipe: Recipe): Promise<HTMLCanvasElement> {
  return exportThreePng(recipe, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
}

export async function captureThumbnailCanvas(recipe: Recipe): Promise<HTMLCanvasElement> {
  switch (recipe.kind) {
    case "shader":
      return captureShaderCanvas(recipe);
    case "media":
      return captureMediaCanvas(recipe);
    case "ascii":
      return captureAsciiCanvas(recipe);
    case "3d":
      return captureSceneCanvas(recipe);
    default: {
      const _exhaustive: never = recipe.kind;
      throw new Error(`Unhandled visual kind: ${_exhaustive}`);
    }
  }
}

export async function captureThumbnailBlob(recipe: Recipe): Promise<Blob> {
  const canvas = await captureThumbnailCanvas(recipe);
  return canvasToPngBlob(canvas);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
