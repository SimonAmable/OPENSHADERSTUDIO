import type { AsciiBlendMode, AsciiCharsetId, AsciiStyleId, Recipe } from "./types";
import { asciiStyleNames } from "./ascii-catalog";
import type { SurfaceSliderDef, SurfaceToggleDef } from "./media-surface-controls";

export type AsciiSurfaceProfile = {
  helper: string;
  effect: SurfaceSliderDef[];
  frame?: SurfaceSliderDef[];
  post?: SurfaceSliderDef[];
  toggles?: SurfaceToggleDef[];
};

const frame: SurfaceSliderDef[] = [
  { field: "rotate", label: "Rotate", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
  { field: "offsetX", label: "Offset X", min: -1, max: 1 },
  { field: "offsetY", label: "Offset Y", min: -1, max: 1 },
];

const postBlur: SurfaceSliderDef = { field: "blur", label: "Blur", max: 20, step: 0.25, unit: "px" };

const baseProfile: AsciiSurfaceProfile = {
  helper: "Tune cell density, contrast, and background strength.",
  effect: [
    { field: "zoom", label: "Cell size", min: 0.5, max: 2.2, unit: "×" },
    { field: "intensity", label: "Coverage" },
    { field: "contrast", label: "Contrast" },
    { field: "grain", label: "Dither", max: 0.12 },
    { field: "drift", label: "Background opacity" },
  ],
  frame,
  post: [postBlur],
  toggles: [
    { field: "reverse", label: "Invert" },
    { field: "smoothBlend", label: "Color from source" },
  ],
};

const asciiSurfaceProfiles: Record<AsciiStyleId, AsciiSurfaceProfile> = {
  characters: baseProfile,
  braille: { ...baseProfile, helper: "Braille sub-cell sampling for ultra-fine detail." },
  mixed: baseProfile,
  "hex-dump": { ...baseProfile, helper: "Binary hex-dump with matrix-green palette." },
  matrix: { ...baseProfile, helper: "Matrix-green binary characters over dark background." },
  dots: baseProfile,
  cross: baseProfile,
  diamond: baseProfile,
  rings: baseProfile,
  hearts: baseProfile,
  stars: baseProfile,
  hexagons: baseProfile,
  triangles: baseProfile,
  bubbles: baseProfile,
  lines: { ...baseProfile, helper: "Edge-directed line characters." },
  diagonal: { ...baseProfile, helper: "Diagonal hatch from image gradients." },
  hatching: { ...baseProfile, helper: "Cross-hatched contour lines." },
  contour: { ...baseProfile, helper: "Contour edges mapped to minimal charset." },
  dither: { ...baseProfile, helper: "Bayer dither before block mapping." },
  "pixel-art": { ...baseProfile, helper: "Chunky block quantization." },
  mosaic: baseProfile,
  bricks: baseProfile,
  voxel: baseProfile,
  "half-blocks": baseProfile,
  disco: { ...baseProfile, helper: "Animated hue cycling — enable Motion for live disco." },
};

export function getAsciiSurfaceProfile(styleId: AsciiStyleId): AsciiSurfaceProfile {
  return asciiSurfaceProfiles[styleId];
}

export function getAsciiSurfaceSummary(styleId: AsciiStyleId, recipe: Recipe): string {
  return `${asciiStyleNames[styleId]} · Cell ${Math.round(6 + recipe.zoom * 10)} · ${Math.round(asciiCoveragePercent(recipe))}%`;
}

function asciiCoveragePercent(recipe: Recipe) {
  return (0.45 + recipe.intensity * 0.55) * 100;
}

export function asciiSurfaceResetFields(styleId: AsciiStyleId, base: Recipe): Partial<Recipe> {
  const profile = getAsciiSurfaceProfile(styleId);
  const fields = new Set<keyof Recipe>([
    ...profile.effect.map((item) => item.field),
    ...(profile.frame?.map((item) => item.field) ?? []),
    ...(profile.post?.map((item) => item.field) ?? []),
    ...(profile.toggles?.map((item) => item.field) ?? []),
  ]);
  const reset: Partial<Recipe> = {};
  for (const field of fields) {
    (reset as Record<string, unknown>)[field] = base[field as keyof Recipe];
  }
  return reset;
}

export const asciiBlendModeLabels: Record<AsciiBlendMode, string> = {
  normal: "Normal",
  multiply: "Multiply",
  screen: "Screen",
  overlay: "Overlay",
  difference: "Difference",
  lighten: "Lighten",
  darken: "Darken",
};

export const asciiCharsetLabels: Record<AsciiCharsetId, string> = {
  standard: "Standard",
  binary: "Binary",
  blocks: "Blocks",
  minimal: "Minimal",
  detailed: "Detailed",
  "braille-set": "Braille",
  shapes: "Shapes",
};
