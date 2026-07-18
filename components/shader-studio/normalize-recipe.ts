import type { MediaFilterId, MediaSource, Recipe, VisualKind } from "./types";
import {
  DEFAULT_ASCII_ANIMATION,
  DEFAULT_ASCII_BLEND,
  DEFAULT_ASCII_CHARSET,
  DEFAULT_ASCII_STYLE,
  isAsciiAnimationStyle,
  isAsciiBlendMode,
  isAsciiCharsetId,
  isAsciiStyleId,
} from "./ascii-catalog";
import { isMediaFilterId } from "./media-catalog";
import { defaultMediaSource } from "./samples";

export const DEFAULT_MEDIA_FILTER: MediaFilterId = "paper-water";

export function normalizeRecipe(input: Partial<Recipe> & { id?: string; name?: string; style?: number; palette?: string[]; glsl?: string }, fallbackGlsl: string): Recipe {
  const kind: VisualKind = input.kind === "media" || input.kind === "ascii" ? input.kind : "shader";
  const mediaFilter = isMediaFilterId(input.mediaFilter) ? input.mediaFilter : DEFAULT_MEDIA_FILTER;
  const asciiStyle = isAsciiStyleId(input.asciiStyle) ? input.asciiStyle : DEFAULT_ASCII_STYLE;
  const asciiBlendMode = isAsciiBlendMode(input.asciiBlendMode) ? input.asciiBlendMode : DEFAULT_ASCII_BLEND;
  const asciiCharset = isAsciiCharsetId(input.asciiCharset) ? input.asciiCharset : DEFAULT_ASCII_CHARSET;
  const asciiAnimationStyle = isAsciiAnimationStyle(input.asciiAnimationStyle) ? input.asciiAnimationStyle : DEFAULT_ASCII_ANIMATION;
  let mediaSource: MediaSource | null = null;
  if (input.mediaSource && typeof input.mediaSource === "object") {
    if (input.mediaSource.type === "sample" && typeof input.mediaSource.sampleId === "string") {
      mediaSource = { type: "sample", sampleId: input.mediaSource.sampleId };
    } else if (input.mediaSource.type === "upload" && typeof input.mediaSource.dataUrl === "string") {
      mediaSource = {
        type: "upload",
        dataUrl: input.mediaSource.dataUrl,
        mime: input.mediaSource.mime === "video" ? "video" : "image",
      };
    }
  }
  if ((kind === "media" || kind === "ascii") && !mediaSource) {
    mediaSource = defaultMediaSource(kind === "ascii" ? "ascii" : "media");
  }

  return {
    id: input.id ?? crypto.randomUUID(),
    name: input.name ?? (kind === "ascii" ? "ASCII look" : kind === "media" ? "Media look" : "Shader"),
    kind,
    style: typeof input.style === "number" ? input.style : 0,
    mediaFilter,
    asciiStyle,
    asciiBlendMode,
    asciiCharset,
    asciiAnimationStyle,
    mediaSource,
    palette: Array.isArray(input.palette) && input.palette.length >= 2 ? input.palette : ["#060914", "#273dff", "#00ddff", "#e8fbff"],
    intensity: typeof input.intensity === "number" ? input.intensity : .76,
    zoom: typeof input.zoom === "number" ? input.zoom : 1.02,
    warp: typeof input.warp === "number" ? input.warp : .2,
    contrast: typeof input.contrast === "number" ? input.contrast : .56,
    speed: typeof input.speed === "number" ? input.speed : 1,
    drift: typeof input.drift === "number" ? input.drift : .5,
    blur: typeof input.blur === "number" ? input.blur : 0,
    animate: typeof input.animate === "boolean" ? input.animate : true,
    reverse: typeof input.reverse === "boolean" ? input.reverse : false,
    grain: typeof input.grain === "number" ? input.grain : .045,
    rotate: typeof input.rotate === "number" ? input.rotate : 0,
    offsetX: typeof input.offsetX === "number" ? input.offsetX : 0,
    offsetY: typeof input.offsetY === "number" ? input.offsetY : 0,
    seed: typeof input.seed === "number" ? input.seed : 1,
    smoothBlend: typeof input.smoothBlend === "boolean" ? input.smoothBlend : false,
    cursorEnabled: typeof input.cursorEnabled === "boolean" ? input.cursorEnabled : true,
    cursorEffect: input.cursorEffect ?? "spotlight",
    cursorStrength: typeof input.cursorStrength === "number" ? input.cursorStrength : .5,
    cursorRadius: typeof input.cursorRadius === "number" ? input.cursorRadius : .5,
    glsl: typeof input.glsl === "string" ? input.glsl : fallbackGlsl,
  };
}
