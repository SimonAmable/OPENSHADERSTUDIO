import type { Recipe, ThreeMaterialId } from "./types";
import { threeMaterialNames } from "./three-catalog";

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
  | "drift"
  | "speed";

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

export type ThreeSurfaceProfile = {
  helper: string;
  effect: SurfaceSliderDef[];
  light: SurfaceSliderDef[];
  frame?: SurfaceSliderDef[];
  post?: SurfaceSliderDef[];
  toggles?: SurfaceToggleDef[];
  showReseed?: boolean;
};

const lightControls: SurfaceSliderDef[] = [
  { field: "offsetX", label: "Light azimuth", min: -1, max: 1 },
  { field: "offsetY", label: "Light height", min: -1, max: 1 },
  { field: "intensity", label: "Light strength" },
];

const frame: SurfaceSliderDef[] = [
  { field: "zoom", label: "Scale", min: 0.5, max: 2, unit: "×" },
  { field: "rotate", label: "Spin", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
];

const postBlur: SurfaceSliderDef = { field: "blur", label: "Blur", max: 20, step: 0.25, unit: "px" };

function shaderSurfaceProfile(helper: string, effect?: SurfaceSliderDef[]): ThreeSurfaceProfile {
  return {
    helper,
    effect: effect ?? [
      { field: "warp", label: "Flow" },
      { field: "contrast", label: "Sharpness" },
      { field: "grain", label: "Grain", max: 0.12 },
    ],
    light: lightControls,
    frame,
    post: [postBlur],
    showReseed: true,
  };
}

const threeSurfaceProfiles: Record<ThreeMaterialId, ThreeSurfaceProfile> = {
  matte: {
    helper: "Soft diffuse surface. Light position and strength shape the form.",
    effect: [
      { field: "contrast", label: "Roughness" },
      { field: "warp", label: "Softness" },
    ],
    light: lightControls,
    frame,
    post: [postBlur],
  },
  chrome: {
    helper: "Mirror metal. Env reflection reads the palette; light picks hot spots.",
    effect: [
      { field: "contrast", label: "Clarity" },
      { field: "warp", label: "Env blur" },
      { field: "grain", label: "Micro scratches", max: 0.12 },
    ],
    light: lightControls,
    frame,
    post: [postBlur],
  },
  glass: {
    helper: "Transmissive glass with palette tint. Contrast thickens the look.",
    effect: [
      { field: "contrast", label: "Thickness" },
      { field: "warp", label: "Refraction" },
      { field: "grain", label: "Frost", max: 0.12 },
    ],
    light: lightControls,
    frame,
    post: [postBlur],
  },
  toon: {
    helper: "Cel-shaded bands. Contrast sets band count feel; light drives the rim.",
    effect: [
      { field: "contrast", label: "Band hard" },
      { field: "warp", label: "Rim" },
    ],
    light: lightControls,
    frame,
    post: [postBlur],
  },
  iridescent: {
    helper: "Thin-film colour shift across the silhouette. Warp speeds the shift.",
    effect: [
      { field: "warp", label: "Film shift" },
      { field: "contrast", label: "Fresnel" },
      { field: "grain", label: "Sparkle", max: 0.12 },
    ],
    light: lightControls,
    frame,
    post: [postBlur],
    showReseed: true,
  },
  "liquid-chrome": shaderSurfaceProfile(
    "Animated GLSL chrome sheen flowing over the mesh. Warp = flow, contrast = edge.",
    [
      { field: "warp", label: "Flow" },
      { field: "contrast", label: "Edge sheen" },
      { field: "grain", label: "Ripple", max: 0.12 },
    ],
  ),
  "flow-field": shaderSurfaceProfile("Turbulent liquid plumes adapted from the Flow Field shader background."),
  plasma: shaderSurfaceProfile("Psychedelic contour bands rolling across the surface."),
  caustics: shaderSurfaceProfile("Refracted water-light caustics. Warp bends the cell field."),
  aurora: shaderSurfaceProfile("Soft aurora curtains drifting across the mesh."),
  smoke: shaderSurfaceProfile("Layered cloudy density with slow drift."),
  swirl: shaderSurfaceProfile("Liquid vortex contours spiraling from the center."),
  silk: shaderSurfaceProfile("Glossy marbled silk ribbons with broad motion."),
  "neuro-noise": shaderSurfaceProfile("Dense neural pathway noise with electric filaments."),
  waves: shaderSurfaceProfile("Layered directional wave fronts across the surface."),
};

export function getThreeSurfaceProfile(id: ThreeMaterialId): ThreeSurfaceProfile {
  return threeSurfaceProfiles[id] ?? threeSurfaceProfiles.chrome;
}

export function getThreeSurfaceSummary(id: ThreeMaterialId, recipe: Recipe) {
  const label = threeMaterialNames[id] ?? "Scene";
  return `${label} · Light ${Math.round(recipe.intensity * 100)}% · Scale ${recipe.zoom.toFixed(2)}×`;
}

export function threeSurfaceResetFields(id: ThreeMaterialId, defaults: Recipe): Partial<Recipe> {
  const profile = getThreeSurfaceProfile(id);
  const fields = new Set<SurfaceField>([
    ...profile.effect.map((item) => item.field),
    ...profile.light.map((item) => item.field),
    ...(profile.frame?.map((item) => item.field) ?? []),
    ...(profile.post?.map((item) => item.field) ?? []),
  ]);
  const update: Partial<Recipe> = { seed: defaults.seed };
  for (const field of fields) {
    update[field] = defaults[field];
  }
  for (const toggle of profile.toggles ?? []) {
    update[toggle.field] = defaults[toggle.field];
  }
  return update;
}
