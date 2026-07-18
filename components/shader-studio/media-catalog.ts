import type { MediaEngine, MediaFilterId, Recipe } from "./types";
import { defaultSampleId } from "./samples";

export type MediaFilterDef = {
  id: MediaFilterId;
  engine: MediaEngine;
  label: string;
  group: "Paper" | "Digital";
};

export const mediaFilters: MediaFilterDef[] = [
  { id: "paper-water", engine: "paper", label: "Water", group: "Paper" },
  { id: "paper-fluted-glass", engine: "paper", label: "Fluted glass", group: "Paper" },
  { id: "paper-texture", engine: "paper", label: "Paper texture", group: "Paper" },
  { id: "paper-image-dithering", engine: "paper", label: "Image dither", group: "Paper" },
  { id: "paper-halftone-dots", engine: "paper", label: "Halftone dots", group: "Paper" },
  { id: "paper-halftone-cmyk", engine: "paper", label: "Halftone CMYK", group: "Paper" },
  { id: "paper-liquid-metal", engine: "paper", label: "Liquid metal", group: "Paper" },
  { id: "paper-heatmap", engine: "paper", label: "Heatmap", group: "Paper" },
  { id: "paper-gem-smoke", engine: "paper", label: "Gem smoke", group: "Paper" },
  { id: "vfx-glitch", engine: "vfx", label: "Glitch", group: "Digital" },
  { id: "vfx-chromatic", engine: "vfx", label: "Chromatic", group: "Digital" },
  { id: "vfx-rgb-shift", engine: "vfx", label: "RGB shift", group: "Digital" },
  { id: "vfx-scanline", engine: "vfx", label: "Scanline", group: "Digital" },
  { id: "vfx-pixelate", engine: "vfx", label: "Pixelate", group: "Digital" },
  { id: "vfx-bloom", engine: "vfx", label: "Bloom", group: "Digital" },
  { id: "vfx-fluid", engine: "vfx", label: "Fluid", group: "Digital" },
];

export const mediaFilterIds = mediaFilters.map((filter) => filter.id);

export const mediaFilterGroups = [
  { title: "Paper", items: mediaFilters.filter((filter) => filter.group === "Paper") },
  { title: "Digital", items: mediaFilters.filter((filter) => filter.group === "Digital") },
] as const;

export const mediaFilterNames: Record<MediaFilterId, string> = Object.fromEntries(
  mediaFilters.map((filter) => [filter.id, filter.label]),
) as Record<MediaFilterId, string>;

export function isMediaFilterId(value: unknown): value is MediaFilterId {
  return typeof value === "string" && mediaFilterIds.includes(value as MediaFilterId);
}

export function getMediaFilter(id: MediaFilterId) {
  return mediaFilters.find((filter) => filter.id === id) ?? mediaFilters[0];
}

export function pickOtherMediaFilter(current: MediaFilterId) {
  const choices = mediaFilterIds.filter((id) => id !== current);
  return choices[Math.floor(Math.random() * choices.length)] ?? current;
}

/** Fixed sample per filter so thumbnail PNGs stay distinct and reproducible. */
export const mediaPreviewSampleIds: Record<MediaFilterId, string> = {
  "paper-water": "caustics",
  "paper-fluted-glass": "portrait-a",
  "paper-texture": "aurora",
  "paper-image-dithering": "portrait-b",
  "paper-halftone-dots": "generated-1",
  "paper-halftone-cmyk": "portrait-a",
  "paper-liquid-metal": "portrait-a",
  "paper-heatmap": "portrait-b",
  "paper-gem-smoke": "aurora",
  "vfx-glitch": "portrait-b",
  "vfx-chromatic": "portrait-b",
  "vfx-rgb-shift": "generated-1",
  "vfx-scanline": "caustics",
  "vfx-pixelate": "portrait-a",
  "vfx-bloom": "portrait-a",
  "vfx-fluid": "caustics",
};

export function mediaPreviewSampleId(filterId: MediaFilterId) {
  return mediaPreviewSampleIds[filterId] ?? defaultSampleId("media");
}

export function resolveMediaPreviewFilter(value: string): MediaFilterId {
  return isMediaFilterId(value) ? value : "paper-water";
}

export function isPaperMediaFilter(id: MediaFilterId) {
  return getMediaFilter(id).engine === "paper";
}

export function isVfxMediaFilter(id: MediaFilterId) {
  return getMediaFilter(id).engine === "vfx";
}

/** Map shared studio knobs onto Paper image-filter props. */
export function mediaPaperProps(recipe: Recipe, frozen: boolean, image: string) {
  const palette = recipe.palette;
  const speed = frozen || !recipe.animate ? 0 : (recipe.reverse ? -1 : 1) * (0.15 + recipe.speed * 0.55);
  const shared = {
    image,
    speed,
    scale: Math.max(0.2, Math.min(3.5, recipe.zoom)),
    rotation: (recipe.rotate * 180) / Math.PI,
    offsetX: recipe.offsetX,
    offsetY: recipe.offsetY,
    fit: "cover" as const,
    frame: recipe.seed,
  };

  switch (recipe.mediaFilter) {
    case "paper-water":
      return {
        ...shared,
        colorBack: palette[0],
        colorHighlight: palette.at(-1) ?? "#ffffff",
        highlights: recipe.intensity,
        caustic: 0.25 + recipe.warp * 0.75,
        waves: recipe.warp,
        edges: recipe.contrast,
        layering: recipe.drift,
        size: 0.4 + recipe.zoom,
      };
    case "paper-fluted-glass":
      return {
        ...shared,
        colorBack: palette[0],
        colorShadow: palette[1] ?? "#000000",
        colorHighlight: palette.at(-1) ?? "#ffffff",
        distortion: recipe.warp,
        shape: "wave",
        angle: ((recipe.rotate * 180) / Math.PI + 360) % 180,
        size: 0.2 + recipe.intensity * 0.6,
        shadows: recipe.contrast,
        highlights: recipe.intensity * 0.5,
        stretch: recipe.drift,
        blur: Math.min(1, recipe.blur / 20),
        edges: recipe.contrast,
        grainMixer: recipe.grain * 4,
        grainOverlay: recipe.grain * 2,
      };
    case "paper-texture":
      return {
        ...shared,
        colorFront: palette.at(-1) ?? "#ffffff",
        colorBack: palette[0],
        contrast: recipe.contrast,
        roughness: recipe.grain * 8,
        fiber: recipe.intensity,
        crumples: recipe.warp,
        folds: recipe.drift,
        drops: recipe.grain * 4,
        seed: recipe.seed,
        fade: Math.min(1, recipe.blur / 20),
      };
    case "paper-image-dithering":
      return {
        ...shared,
        colorBack: palette[0],
        colorFront: palette.at(-1) ?? "#ffffff",
        colorHighlight: palette[1] ?? palette.at(-1) ?? "#ffffff",
        type: recipe.smoothBlend ? "random" : "4x4",
        size: 1 + recipe.warp * 4,
        colorSteps: Math.max(2, Math.round(2 + recipe.intensity * 6)),
        inverted: recipe.reverse,
      };
    case "paper-halftone-dots":
      return {
        ...shared,
        colorBack: palette[0],
        colorFront: palette.at(-1) ?? "#ffffff",
        type: "dots",
        grid: 8 + recipe.warp * 24,
        size: 0.4 + recipe.intensity * 0.8,
      };
    case "paper-halftone-cmyk":
      return {
        ...shared,
        type: "cmyk",
        grid: 6 + recipe.warp * 20,
        size: 0.35 + recipe.intensity * 0.7,
      };
    case "paper-liquid-metal":
      return {
        ...shared,
        colorBack: palette[0],
        colorTint: palette[1] ?? palette.at(-1) ?? "#c0c0c0",
        repetition: 1 + recipe.warp * 4,
        softness: 1 - recipe.contrast,
        shiftRed: recipe.drift * 0.4,
        shiftBlue: recipe.intensity * 0.4,
        distortion: recipe.warp,
        contour: recipe.contrast,
        angle: recipe.rotate * 40,
        liquidity: recipe.intensity,
      };
    case "paper-heatmap":
      return {
        ...shared,
        colors: palette.slice(0, 5),
        soft: recipe.smoothBlend ? 1 : 0.3,
        intensity: recipe.intensity,
      };
    case "paper-gem-smoke":
      return {
        ...shared,
        colorBack: palette[0],
        colorTint: palette[1] ?? "#88aaff",
        colorFresh: palette.at(-1) ?? "#ffffff",
        soft: recipe.smoothBlend ? 1 : 0.35,
        intensity: recipe.intensity,
        smoke: recipe.grain * 4 + recipe.warp,
      };
    default:
      return shared;
  }
}
