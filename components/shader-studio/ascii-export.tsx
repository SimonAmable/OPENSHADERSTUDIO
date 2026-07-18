import { renderAsciiFrame, loadAsciiSource } from "./ascii-engine";
import { waitForAsciiCanvas, queryAsciiCanvas } from "./ascii-canvas";
import { resolveMediaSource } from "./samples";
import type { Recipe } from "./types";

export async function exportAsciiPng(recipe: Recipe, width: number, height: number) {
  const resolved = resolveMediaSource(recipe.mediaSource);
  if (!resolved) throw new Error("Add media before exporting");

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create export canvas");

  const source = await loadAsciiSource(resolved.url, resolved.mediaType);
  if (source instanceof HTMLVideoElement) {
    source.currentTime = 0;
    await new Promise<void>((resolve) => {
      source.addEventListener("seeked", () => resolve(), { once: true });
    });
  }
  renderAsciiFrame(ctx, source, recipe, width, height, 0);
  return canvas;
}

export async function renderAsciiFrameToCanvas(
  target: HTMLCanvasElement | CanvasRenderingContext2D,
  recipe: Recipe,
  width: number,
  height: number,
  timeSec: number,
) {
  const ctx = target instanceof HTMLCanvasElement ? target.getContext("2d") : target;
  if (!ctx) throw new Error("Could not create export canvas");

  const resolved = resolveMediaSource(recipe.mediaSource);
  if (!resolved) throw new Error("Add media before exporting");

  const source = await loadAsciiSource(resolved.url, resolved.mediaType);
  if (source instanceof HTMLVideoElement) {
    source.currentTime = timeSec % (source.duration || 1);
    await new Promise<void>((resolve) => {
      const onSeeked = () => {
        source.removeEventListener("seeked", onSeeked);
        resolve();
      };
      source.addEventListener("seeked", onSeeked);
    });
  }

  ctx.clearRect(0, 0, width, height);
  renderAsciiFrame(ctx, source, recipe, width, height, timeSec);
}

export async function captureLiveAsciiFrame(recipe: Recipe, width: number, height: number) {
  const live = queryAsciiCanvas() ?? await waitForAsciiCanvas();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create export canvas");
  ctx.drawImage(live, 0, 0, width, height);
  return canvas;
}
