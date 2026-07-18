import type { MediaFilterId, Recipe } from "./types";
import { mediaFilterNames } from "./media-catalog";

export type SurfaceField =
  | "intensity"
  | "zoom"
  | "warp"
  | "contrast"
  | "grain"
  | "blur"
  | "rotate"
  | "offsetX"
  | "offsetY"
  | "seed"
  | "drift";

export type SurfaceToggleField = "smoothBlend" | "reverse";

export type SurfaceSliderDef = {
  field: SurfaceField;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export type SurfaceToggleDef = {
  field: SurfaceToggleField;
  label: string;
};

export type MediaSurfaceProfile = {
  helper: string;
  effect: SurfaceSliderDef[];
  frame?: SurfaceSliderDef[];
  post?: SurfaceSliderDef[];
  toggles?: SurfaceToggleDef[];
  showReseed?: boolean;
};

const frame: SurfaceSliderDef[] = [
  { field: "zoom", label: "Scale", min: 0.5, max: 2, unit: "×" },
  { field: "rotate", label: "Rotate", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
  { field: "offsetX", label: "Offset X", min: -1, max: 1 },
  { field: "offsetY", label: "Offset Y", min: -1, max: 1 },
];

const postBlur: SurfaceSliderDef = { field: "blur", label: "Blur", max: 20, step: 0.25, unit: "px" };

const mediaSurfaceProfiles: Record<MediaFilterId, MediaSurfaceProfile> = {
  "paper-water": {
    helper: "Caustic water distortion over your media.",
    effect: [
      { field: "intensity", label: "Highlights" },
      { field: "warp", label: "Waves" },
      { field: "contrast", label: "Edges" },
      { field: "drift", label: "Layering" },
    ],
    frame,
    post: [postBlur],
  },
  "paper-fluted-glass": {
    helper: "Ridged glass refraction with optional grain.",
    effect: [
      { field: "warp", label: "Distortion" },
      { field: "intensity", label: "Ridge size" },
      { field: "contrast", label: "Shadow depth" },
      { field: "drift", label: "Stretch" },
      { field: "grain", label: "Grain mix", max: 0.12 },
      { field: "blur", label: "Glass blur", max: 20, step: 0.25, unit: "px" },
    ],
    frame: [
      { field: "zoom", label: "Scale", min: 0.5, max: 2, unit: "×" },
      { field: "rotate", label: "Ridge angle", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
      { field: "offsetX", label: "Offset X", min: -1, max: 1 },
      { field: "offsetY", label: "Offset Y", min: -1, max: 1 },
    ],
  },
  "paper-texture": {
    helper: "Paper fibre, crumple, and fold texture.",
    effect: [
      { field: "intensity", label: "Fibre" },
      { field: "warp", label: "Crumples" },
      { field: "contrast", label: "Contrast" },
      { field: "grain", label: "Roughness", max: 0.12 },
      { field: "drift", label: "Folds" },
      { field: "blur", label: "Soft fade", max: 20, step: 0.25, unit: "px" },
    ],
    frame,
    showReseed: true,
  },
  "paper-image-dithering": {
    helper: "Ordered or random dither over the image.",
    effect: [
      { field: "warp", label: "Dot size" },
      { field: "intensity", label: "Colour steps" },
    ],
    frame,
    toggles: [
      { field: "smoothBlend", label: "Random dither" },
      { field: "reverse", label: "Invert" },
    ],
  },
  "paper-halftone-dots": {
    helper: "Classic halftone dot screen.",
    effect: [
      { field: "warp", label: "Grid density" },
      { field: "intensity", label: "Dot scale" },
    ],
    frame,
  },
  "paper-halftone-cmyk": {
    helper: "CMYK halftone separation.",
    effect: [
      { field: "warp", label: "Grid density" },
      { field: "intensity", label: "Dot scale" },
    ],
    frame,
  },
  "paper-liquid-metal": {
    helper: "Liquid metal flow and chromatic shift.",
    effect: [
      { field: "intensity", label: "Liquidity" },
      { field: "warp", label: "Distortion" },
      { field: "contrast", label: "Contour" },
      { field: "drift", label: "Colour shift" },
    ],
    frame: [
      { field: "zoom", label: "Scale", min: 0.5, max: 2, unit: "×" },
      { field: "rotate", label: "Flow angle", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
      { field: "offsetX", label: "Offset X", min: -1, max: 1 },
      { field: "offsetY", label: "Offset Y", min: -1, max: 1 },
    ],
  },
  "paper-heatmap": {
    helper: "Thermal colour mapping across the image.",
    effect: [{ field: "intensity", label: "Heat intensity" }],
    frame,
    toggles: [{ field: "smoothBlend", label: "Soft blend" }],
  },
  "paper-gem-smoke": {
    helper: "Gem-tinted smoke wisps over the media.",
    effect: [
      { field: "intensity", label: "Smoke density" },
      { field: "warp", label: "Wisp spread" },
      { field: "grain", label: "Haze", max: 0.12 },
    ],
    frame,
    toggles: [{ field: "smoothBlend", label: "Soft edges" }],
  },
  "vfx-glitch": {
    helper: "Digital glitch tear and noise.",
    effect: [{ field: "intensity", label: "Glitch strength" }],
    post: [postBlur],
  },
  "vfx-chromatic": {
    helper: "Chromatic aberration fringe.",
    effect: [
      { field: "intensity", label: "Fringe strength" },
      { field: "warp", label: "Fringe radius" },
      { field: "contrast", label: "Falloff power" },
    ],
    post: [postBlur],
  },
  "vfx-rgb-shift": {
    helper: "Animated RGB channel offset.",
    effect: [
      { field: "intensity", label: "Shift amount" },
      { field: "warp", label: "Channel spread" },
    ],
    post: [postBlur],
  },
  "vfx-scanline": {
    helper: "CRT-style scanlines.",
    effect: [
      { field: "intensity", label: "Line density" },
      { field: "warp", label: "Spacing variation" },
    ],
  },
  "vfx-pixelate": {
    helper: "Block pixel mosaic.",
    effect: [
      { field: "intensity", label: "Block size" },
      { field: "warp", label: "Chunkiness" },
    ],
  },
  "vfx-bloom": {
    helper: "Luminous bloom and glow scatter.",
    effect: [
      { field: "intensity", label: "Glow strength" },
      { field: "drift", label: "Scatter" },
      { field: "grain", label: "Dither", max: 0.12 },
    ],
    post: [postBlur],
    toggles: [{ field: "smoothBlend", label: "Soft glow" }],
  },
  "vfx-fluid": {
    helper: "Fluid simulation splats — reacts to cursor in Cursor tab.",
    effect: [
      { field: "intensity", label: "Splat force" },
      { field: "warp", label: "Curl" },
      { field: "drift", label: "Velocity decay" },
      { field: "grain", label: "Density decay", max: 0.12 },
    ],
  },
};

export function getMediaSurfaceProfile(filterId: MediaFilterId): MediaSurfaceProfile {
  return mediaSurfaceProfiles[filterId];
}

export function getMediaSurfaceSummary(filterId: MediaFilterId, recipe: Recipe): string {
  const profile = getMediaSurfaceProfile(filterId);
  const primary = profile.effect[0];
  if (!primary) return mediaFilterNames[filterId];
  const value = recipe[primary.field];
  if (primary.unit === "×") return `${primary.label} ${value.toFixed(1)}×`;
  if (primary.unit === "px") return `${primary.label} ${value.toFixed(1)}px`;
  return `${primary.label} ${Math.round(value * 100)}%`;
}

export function mediaSurfaceResetFields(filterId: MediaFilterId, base: Pick<Recipe, SurfaceField | SurfaceToggleField>): Partial<Recipe> {
  const profile = getMediaSurfaceProfile(filterId);
  const fields = new Set<keyof Recipe>([
    ...profile.effect.map((item) => item.field),
    ...(profile.frame?.map((item) => item.field) ?? []),
    ...(profile.post?.map((item) => item.field) ?? []),
    ...(profile.toggles?.map((item) => item.field) ?? []),
  ]);
  if (profile.showReseed) fields.add("seed");

  const reset: Partial<Recipe> = {};
  for (const field of fields) {
    (reset as Record<string, unknown>)[field] = base[field as keyof typeof base];
  }
  return reset;
}
