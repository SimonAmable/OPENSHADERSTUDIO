import type { AsciiStyleId, MediaFilterId, MediaSource, Recipe } from "./types";
import {
  asciiPreviewSampleId,
  asciiStyleIds,
  asciiStyleNames,
  DEFAULT_ASCII_STYLE,
  getAsciiStyle,
  isAsciiStyleId,
} from "./ascii-catalog";
import { mediaFilterNames, mediaPreviewSampleId, isVfxMediaFilter } from "./media-catalog";
import { asciiSurfaceResetFields } from "./ascii-surface-controls";
import { normalizeRecipe } from "./normalize-recipe";
import { recolourRecipe, remixRecipe } from "./randomize";
import { getSampleById, pickRandomSample, samplesForKind } from "./samples";
import { defaultRecipe, fragmentShader, presetSettings, styleNames } from "./canvas";

export type InputMode = "preset" | "random";

export type PreviewPresetOptions = {
  mediaSource?: MediaSource | null;
  palette?: string[];
  smoothBlend?: boolean;
};

export const THUMBNAIL_WIDTH = 640;
export const THUMBNAIL_HEIGHT = 400;

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickSeededSample(kind: "media" | "ascii", rng: () => number, exceptId?: string): MediaSource {
  const pool = samplesForKind(kind).filter((asset) => asset.id !== exceptId);
  const list = pool.length ? pool : samplesForKind(kind);
  if (!list.length) return pickRandomSample(kind);
  const asset = list[Math.floor(rng() * list.length)] ?? list[0];
  return { type: "sample", sampleId: asset.id };
}

export function previewSampleLabel(source: MediaSource | null): string {
  if (!source) return "—";
  if (source.type === "upload") return "upload";
  return getSampleById(source.sampleId)?.label ?? source.sampleId;
}

function withPresetPalette(recipe: Recipe, options?: PreviewPresetOptions): Recipe {
  if (!options?.palette?.length) return recipe;
  return {
    ...recipe,
    palette: [...options.palette],
    ...(typeof options.smoothBlend === "boolean" ? { smoothBlend: options.smoothBlend } : {}),
  };
}

export function buildShaderPreviewRecipe(
  style: number,
  mode: InputMode = "preset",
  seed?: number,
  options?: PreviewPresetOptions,
): Recipe {
  const base: Recipe = {
    ...defaultRecipe,
    ...presetSettings[style],
    id: `shader-preview-${style}`,
    name: styleNames[style] ?? "Shader",
    kind: "shader",
    style,
    glsl: fragmentShader,
    animate: false,
    cursorEnabled: false,
  };
  if (mode === "preset") {
    return withPresetPalette(base, options);
  }
  const rng = mulberry32(seed ?? style * 997 + 1);
  return {
    ...base,
    ...remixRecipe(base),
    ...recolourRecipe(base),
    seed: Math.floor(rng() * 100_000),
  };
}

export function buildMediaPreviewRecipe(
  filter: MediaFilterId,
  mode: InputMode = "preset",
  seed?: number,
  options?: PreviewPresetOptions,
): Recipe {
  const vfx = isVfxMediaFilter(filter);
  const rng = mulberry32(seed ?? filter.length * 131);
  const mediaSource: MediaSource =
    mode === "preset"
      ? (options?.mediaSource ?? { type: "sample", sampleId: mediaPreviewSampleId(filter) })
      : pickSeededSample("media", rng);

  return withPresetPalette({
    ...defaultRecipe,
    id: `media-preview-${filter}`,
    name: mediaFilterNames[filter] ?? "Media",
    kind: "media",
    mediaFilter: filter,
    mediaSource,
    animate: vfx,
    cursorEnabled: false,
    glsl: fragmentShader,
  }, mode === "preset" ? options : undefined);
}

export function buildAsciiPreviewRecipe(
  style: AsciiStyleId,
  mode: InputMode = "preset",
  seed?: number,
  options?: PreviewPresetOptions,
): Recipe {
  const styleDef = getAsciiStyle(style);
  const rng = mulberry32(seed ?? style.length * 313);
  const mediaSource: MediaSource =
    mode === "preset"
      ? (options?.mediaSource ?? { type: "sample", sampleId: asciiPreviewSampleId(style) })
      : pickSeededSample("ascii", rng);

  return withPresetPalette(
    normalizeRecipe(
      {
        ...defaultRecipe,
        ...asciiSurfaceResetFields(style, defaultRecipe),
        id: `ascii-preview-${style}`,
        name: asciiStyleNames[style] ?? "ASCII",
        kind: "ascii",
        asciiStyle: style,
        asciiCharset: styleDef.defaultCharset,
        mediaSource,
        animate: false,
        cursorEnabled: false,
        glsl: fragmentShader,
      },
      fragmentShader,
    ),
    mode === "preset" ? options : undefined,
  );
}

export const shaderStyleIds = Array.from({ length: 34 }, (_, style) => style);

export function resolveAsciiPreviewStyle(value: string): AsciiStyleId {
  return isAsciiStyleId(value) ? value : DEFAULT_ASCII_STYLE;
}

export { asciiStyleIds };
