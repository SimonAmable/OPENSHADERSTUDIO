import type { MediaFilterId, MediaSource, Recipe, ThreeMaterialId, ThreeObjectId, VisualKind } from "./types";
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
import { DEFAULT_THREE_ENVIRONMENT, DEFAULT_THREE_MATERIAL, DEFAULT_THREE_OBJECT, DEFAULT_THREE_OPEN_BACKGROUND, DEFAULT_THREE_PEDESTAL, isRoomEnvironment, isThreeEnvironmentId, isThreeMaterialId, isThreeObjectId } from "./three-catalog";
import { DEFAULT_THREE_SCENE_MODE, DEFAULT_THREE_SCENE_PRESET, migrateThreeScenePreset } from "./three-scene-catalog";
import { resolveThreeObjects, syncPrimaryThreeFields } from "./three-scene-objects";
import { defaultMediaSource } from "./samples";

export const DEFAULT_MEDIA_FILTER: MediaFilterId = "paper-water";

function normalizeKind(input: Partial<Recipe>): VisualKind {
  if (input.kind === "media" || input.kind === "ascii" || input.kind === "3d" || input.kind === "shader") {
    return input.kind;
  }
  return "shader";
}

export function normalizeRecipe(input: Partial<Recipe> & { id?: string; name?: string; style?: number; palette?: string[]; glsl?: string }, fallbackGlsl: string): Recipe {
  const kind = normalizeKind(input);
  const mediaFilter = isMediaFilterId(input.mediaFilter) ? input.mediaFilter : DEFAULT_MEDIA_FILTER;
  const asciiStyle = isAsciiStyleId(input.asciiStyle) ? input.asciiStyle : DEFAULT_ASCII_STYLE;
  const asciiBlendMode = isAsciiBlendMode(input.asciiBlendMode) ? input.asciiBlendMode : DEFAULT_ASCII_BLEND;
  const asciiCharset = isAsciiCharsetId(input.asciiCharset) ? input.asciiCharset : DEFAULT_ASCII_CHARSET;
  const asciiAnimationStyle = isAsciiAnimationStyle(input.asciiAnimationStyle) ? input.asciiAnimationStyle : DEFAULT_ASCII_ANIMATION;
  const threeObject: ThreeObjectId = isThreeObjectId(input.threeObject) ? input.threeObject : DEFAULT_THREE_OBJECT;
  const threeMaterial: ThreeMaterialId = isThreeMaterialId(input.threeMaterial) ? input.threeMaterial : DEFAULT_THREE_MATERIAL;
  const threeEnvironment = isThreeEnvironmentId(input.threeEnvironment) ? input.threeEnvironment : DEFAULT_THREE_ENVIRONMENT;
  const threeOpenBackground = input.threeOpenBackground === "shader" ? "shader" : DEFAULT_THREE_OPEN_BACKGROUND;
  let threePedestal = typeof input.threePedestal === "boolean" ? input.threePedestal : DEFAULT_THREE_PEDESTAL;
  if (!isRoomEnvironment(threeEnvironment)) {
    threePedestal = false;
  }
  const threeModelUpload = typeof input.threeModelUpload === "string" && input.threeModelUpload.startsWith("data:")
    ? input.threeModelUpload
    : null;
  const threeSceneMode = input.threeSceneMode === "preset" ? "preset" : DEFAULT_THREE_SCENE_MODE;
  const threeScenePreset = migrateThreeScenePreset(input.threeScenePreset) ?? DEFAULT_THREE_SCENE_PRESET;
  const threeObjects = resolveThreeObjects({
    threeObjects: input.threeObjects,
    threeObject,
    threeMaterial,
    threeModelUpload,
  });
  const threeActiveObjectId = typeof input.threeActiveObjectId === "string"
    && threeObjects.some((item) => item.id === input.threeActiveObjectId)
    ? input.threeActiveObjectId
    : threeObjects[0]?.id ?? null;
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

  const defaultName = kind === "ascii"
    ? "ASCII look"
    : kind === "media"
    ? "Media look"
    : kind === "3d"
    ? "Scene look"
    : "Shader";

  return {
    id: input.id ?? crypto.randomUUID(),
    name: input.name ?? defaultName,
    kind,
    style: typeof input.style === "number" ? input.style : 0,
    mediaFilter,
    asciiStyle,
    asciiBlendMode,
    asciiCharset,
    asciiAnimationStyle,
    mediaSource,
    threeSceneMode,
    threeScenePreset,
    threeObjects,
    threeActiveObjectId,
    threeObject,
    threeMaterial,
    threeModelUpload,
    threeEnvironment,
    threePedestal,
    threeOpenBackground,
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
