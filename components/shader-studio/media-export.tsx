import { createRoot, type Root } from "react-dom/client";
import { FlutedGlass, GemSmoke, HalftoneCmyk, HalftoneDots, Heatmap, ImageDithering, LiquidMetal, PaperTexture, Water } from "@paper-design/shaders-react";
import type { ComponentType } from "react";
import { drawPaperShaderToCanvas, type PaperExportSurface } from "./canvas";
import { isPaperMediaFilter, mediaPaperProps } from "./media-catalog";
import { MediaCanvas } from "./media-canvas";
import { resolveMediaSource } from "./samples";
import type { MediaFilterId, Recipe } from "./types";

type PaperMediaComponent = ComponentType<Record<string, unknown>>;
type PaperMount = { setFrame: (frame: number) => void; setSpeed: (speed: number) => void; canvasElement: HTMLCanvasElement };

const paperMediaComponents: Partial<Record<MediaFilterId, PaperMediaComponent>> = {
  "paper-water": Water as unknown as PaperMediaComponent,
  "paper-fluted-glass": FlutedGlass as unknown as PaperMediaComponent,
  "paper-texture": PaperTexture as unknown as PaperMediaComponent,
  "paper-image-dithering": ImageDithering as unknown as PaperMediaComponent,
  "paper-halftone-dots": HalftoneDots as unknown as PaperMediaComponent,
  "paper-halftone-cmyk": HalftoneCmyk as unknown as PaperMediaComponent,
  "paper-liquid-metal": LiquidMetal as unknown as PaperMediaComponent,
  "paper-heatmap": Heatmap as unknown as PaperMediaComponent,
  "paper-gem-smoke": GemSmoke as unknown as PaperMediaComponent,
};

function queryPaperMount(root: ParentNode): PaperMount | null {
  const local = root.querySelector<HTMLElement & { paperShaderMount?: PaperMount }>("[data-paper-shader]");
  return local?.paperShaderMount ?? null;
}

function MediaPaperExportCanvas({ recipe, width, height, image }: { recipe: Recipe; width: number; height: number; image: string }) {
  const Component = paperMediaComponents[recipe.mediaFilter];
  if (!Component) return null;
  const props = mediaPaperProps(recipe, true, image);
  return (
    <div className="paper-shader-host" data-paper-export-host="" style={{ width, height, touchAction: "none" }}>
      <Component
        className="paper-shader-canvas"
        width={width}
        height={height}
        {...props}
        minPixelRatio={1}
        maxPixelCount={width * height}
        style={{ width, height }}
      />
    </div>
  );
}

export async function createMediaPaperExportSurface(recipe: Recipe, width: number, height: number, image: string): Promise<PaperExportSurface> {
  const host = document.createElement("div");
  host.setAttribute("data-paper-export", "");
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;overflow:hidden;pointer-events:none;opacity:0;z-index:-1;`;
  document.body.appendChild(host);

  let root: Root | null = createRoot(host);
  root.render(<MediaPaperExportCanvas recipe={recipe} width={width} height={height} image={image} />);

  const dispose = () => {
    try { root?.unmount(); } catch { /* ignore */ }
    root = null;
    host.remove();
  };

  for (let attempt = 0; attempt < 120; attempt += 1) {
    const mount = queryPaperMount(host);
    const canvas = mount?.canvasElement ?? host.querySelector("canvas");
    if (mount && canvas && canvas.width >= width * 0.95 && canvas.height >= height * 0.95) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      return { mount, canvas, dispose };
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  dispose();
  throw new Error("Could not prepare a full-resolution media filter for export");
}

async function loadImageUrl(url: string) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not read media"));
        return;
      }
      ctx.drawImage(image, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error("Could not load media"));
    image.src = url;
  });
}

async function stillFromVideo(url: string) {
  return new Promise<string>((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.src = url;
    video.onloadeddata = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(2, video.videoWidth || 1280);
        canvas.height = Math.max(2, video.videoHeight || 720);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not read video frame");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      } catch (error) {
        reject(error);
      }
    };
    video.onerror = () => reject(new Error("Could not load video"));
    video.load();
  });
}

export async function resolveMediaImageForExport(recipe: Recipe) {
  const resolved = resolveMediaSource(recipe.mediaSource);
  if (!resolved) throw new Error("Add media before exporting");
  if (resolved.mediaType === "image") return loadImageUrl(resolved.url);
  return stillFromVideo(resolved.url);
}

async function settleFrames(frames: number) {
  for (let index = 0; index < frames; index += 1) {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
}

export type VfxMediaExportSurface = {
  canvas: HTMLCanvasElement;
  dispose: () => void;
};

async function mountVfxMediaExportHost(recipe: Recipe, width: number, height: number) {
  const host = document.createElement("div");
  host.setAttribute("data-media-export", "");
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;overflow:hidden;pointer-events:none;opacity:0;z-index:-1;`;
  document.body.appendChild(host);

  let root: Root | null = createRoot(host);
  root.render(<MediaCanvas recipe={recipe} frozen={false} />);

  const dispose = () => {
    try { root?.unmount(); } catch { /* ignore */ }
    root = null;
    host.remove();
  };

  for (let attempt = 0; attempt < 240; attempt += 1) {
    const canvas = host.querySelector<HTMLCanvasElement>("[data-media-vfx-canvas]")
      ?? host.querySelector<HTMLCanvasElement>("canvas");
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      await settleFrames(45);
      return { canvas, dispose };
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  dispose();
  throw new Error("Could not prepare a full-resolution media filter for export");
}

export async function createVfxMediaExportSurface(recipe: Recipe, width: number, height: number): Promise<VfxMediaExportSurface> {
  return mountVfxMediaExportHost(recipe, width, height);
}

export async function captureVfxMediaExportCanvas(recipe: Recipe, width: number, height: number) {
  const surface = await mountVfxMediaExportHost(recipe, width, height);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create export canvas");
    ctx.drawImage(surface.canvas, 0, 0, width, height);
    return canvas;
  } finally {
    surface.dispose();
  }
}

export async function exportMediaPng(recipe: Recipe, width: number, height: number) {
  if (isPaperMediaFilter(recipe.mediaFilter)) {
    const image = await resolveMediaImageForExport(recipe);
    const surface = await createMediaPaperExportSurface(recipe, width, height, image);
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

  return captureVfxMediaExportCanvas(recipe, width, height);
}

export async function renderMediaFrameToCanvas(
  target: HTMLCanvasElement | CanvasRenderingContext2D,
  recipe: Recipe,
  width: number,
  height: number,
  timeSec: number,
  paperSurface: PaperExportSurface | null,
  vfxSurface: VfxMediaExportSurface | null = null,
) {
  const ctx = target instanceof HTMLCanvasElement ? target.getContext("2d") : target;
  if (!ctx) throw new Error("Could not create export canvas");

  if (paperSurface && isPaperMediaFilter(recipe.mediaFilter)) {
    paperSurface.mount.setFrame(recipe.seed + timeSec * 1000);
    drawPaperShaderToCanvas(ctx, paperSurface.canvas, recipe, width, height);
    return;
  }

  if (vfxSurface) {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(vfxSurface.canvas, 0, 0, width, height);
    return;
  }

  const frame = await captureVfxMediaExportCanvas(recipe, width, height);
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(frame, 0, 0, width, height);
}
