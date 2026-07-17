import type { VideoExportSettings } from "./types";

export function exportPreviewAspect(aspect: VideoExportSettings["aspect"]) { return aspect === "16:9" ? "16 / 9" : aspect === "1:1" ? "1" : "9 / 16"; }
export function shaderOutputSize(aspect: VideoExportSettings["aspect"], height: number) { const [ratioWidth, ratioHeight] = aspect.split(":").map(Number); return { width: Math.round(height * ratioWidth / ratioHeight / 2) * 2, height }; }
export function loopFrameIndexes(forwardFrames: number, loop: boolean) { const indexes = Array.from({ length: forwardFrames }, (_, index) => index); return loop ? [...indexes, ...indexes.slice(0, -1).reverse()] : indexes; }
export function loopExportFrameCount(settings: VideoExportSettings) { const forwardFrames = settings.duration * settings.fps; return settings.loop ? forwardFrames * 2 - 1 : forwardFrames; }
export function loopExportDuration(settings: VideoExportSettings) { return loopExportFrameCount(settings) / settings.fps; }
