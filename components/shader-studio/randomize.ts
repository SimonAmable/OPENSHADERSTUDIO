import type { CursorEffect, MediaFilterId, MediaSource, Recipe, VisualKind } from "./types";
import { fragmentShader, palettes, presetSettings, styleNames } from "./canvas";
import { mediaFilterNames, pickOtherMediaFilter } from "./media-catalog";
import { defaultMediaSource, pickRandomSample } from "./samples";

export type VariationMode = "vary" | "inspire" | "recolour" | "remix" | "restyle";

const CURSOR_EFFECTS: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];
const MEDIA_FILTER_IDS = Object.keys(mediaFilterNames) as MediaFilterId[];

function randomSurface() {
  return {
    intensity: .35 + Math.random() * .6,
    zoom: .65 + Math.random() * 1.15,
    warp: Math.random(),
    contrast: .2 + Math.random() * .75,
    grain: Math.random() * .1,
    blur: Math.random() > .7 ? Math.random() * 8 : 0,
    rotate: -Math.PI + Math.random() * Math.PI * 2,
    offsetX: -0.5 + Math.random(),
    offsetY: -0.5 + Math.random(),
    seed: Math.floor(Math.random() * 100000),
  } satisfies Partial<Recipe>;
}

function randomMotionAndCursor() {
  return {
    speed: Math.random() * 2.4,
    drift: Math.random(),
    animate: Math.random() > .12,
    reverse: Math.random() > .5,
    smoothBlend: Math.random() > .5,
    cursorEnabled: Math.random() > .35,
    cursorEffect: CURSOR_EFFECTS[Math.floor(Math.random() * CURSOR_EFFECTS.length)],
    cursorStrength: .2 + Math.random() * .75,
    cursorRadius: .2 + Math.random() * .7,
  } satisfies Partial<Recipe>;
}

function pickOtherStyle(current: number) {
  const choices = Object.keys(presetSettings).map(Number).filter((style) => style !== current);
  return choices[Math.floor(Math.random() * choices.length)];
}

function keepMediaSource(recipe: Recipe): MediaSource | null {
  return recipe.mediaSource ?? defaultMediaSource("media");
}

function randomMediaFilter(): MediaFilterId {
  return MEDIA_FILTER_IDS[Math.floor(Math.random() * MEDIA_FILTER_IDS.length)];
}

export function recolourRecipe(recipe: Recipe): Partial<Recipe> {
  return { palette: palettes[Math.floor(Math.random() * palettes.length)] };
}

export function remixRecipe(recipe: Recipe): Partial<Recipe> {
  if (recipe.kind === "media") {
    return {
      mediaSource: keepMediaSource(recipe),
      ...randomSurface(),
    };
  }
  return { ...randomSurface() };
}

export function restyleRecipe(recipe: Recipe): Partial<Recipe> {
  if (recipe.kind === "media") {
    const mediaFilter = pickOtherMediaFilter(recipe.mediaFilter);
    return {
      name: mediaFilterNames[mediaFilter] ?? "Restyled media",
      mediaFilter,
      mediaSource: keepMediaSource(recipe),
      palette: recipe.palette,
    };
  }
  const style = pickOtherStyle(recipe.style);
  const name = styleNames[style] ?? "Restyled shader";
  const settings = presetSettings[style] ?? {};
  return { ...settings, name, style, palette: recipe.palette, glsl: fragmentShader };
}

export function inspireRecipe(recipe?: Recipe): Partial<Recipe> {
  const kind: VisualKind = recipe?.kind ?? "shader";
  if (kind === "media") {
    const mediaFilter = randomMediaFilter();
    return {
      kind: "media",
      name: mediaFilterNames[mediaFilter] ?? "Inspired media",
      mediaFilter,
      mediaSource: keepMediaSource(recipe ?? ({ mediaSource: null } as Recipe)),
      palette: palettes[Math.floor(Math.random() * palettes.length)],
      ...randomSurface(),
      ...randomMotionAndCursor(),
      glsl: fragmentShader,
    };
  }
  return {
    kind: "shader",
    name: "Inspired shader",
    style: Math.floor(Math.random() * 34),
    palette: palettes[Math.floor(Math.random() * palettes.length)],
    ...randomSurface(),
    ...randomMotionAndCursor(),
    glsl: fragmentShader,
  };
}

export function varyRecipe(recipe: Recipe): Partial<Recipe> {
  const kind: VisualKind = Math.random() > 0.5 ? "shader" : "media";
  if (kind === "media") {
    const mediaFilter = randomMediaFilter();
    const currentSampleId = recipe.mediaSource?.type === "sample" ? recipe.mediaSource.sampleId : undefined;
    return {
      kind: "media",
      name: mediaFilterNames[mediaFilter] ?? "Varied media",
      mediaFilter,
      mediaSource: recipe.mediaSource?.type === "upload"
        ? recipe.mediaSource
        : pickRandomSample("media", currentSampleId),
      palette: palettes[Math.floor(Math.random() * palettes.length)],
      ...randomSurface(),
      ...randomMotionAndCursor(),
      glsl: fragmentShader,
    };
  }
  return {
    kind: "shader",
    name: "Varied shader",
    style: Math.floor(Math.random() * 34),
    palette: palettes[Math.floor(Math.random() * palettes.length)],
    ...randomSurface(),
    ...randomMotionAndCursor(),
    glsl: fragmentShader,
  };
}

export function applyVariationMode(recipe: Recipe, mode: VariationMode): Recipe {
  let update: Partial<Recipe>;
  switch (mode) {
    case "vary":
      update = varyRecipe(recipe);
      break;
    case "inspire":
      update = inspireRecipe(recipe);
      break;
    case "recolour":
      update = recolourRecipe(recipe);
      break;
    case "remix":
      update = remixRecipe(recipe);
      break;
    case "restyle":
      update = restyleRecipe(recipe);
      break;
    default: {
      const _exhaustive: never = mode;
      throw new Error(`Unhandled variation mode: ${_exhaustive}`);
    }
  }
  return { ...recipe, ...update, id: crypto.randomUUID() };
}

export function generateVariationRecipes(base: Recipe, modes: VariationMode[], count: number) {
  if (!modes.length) return [] as { mode: VariationMode; recipe: Recipe }[];
  return Array.from({ length: count }, (_, index) => {
    const mode = modes[index % modes.length];
    return { mode, recipe: applyVariationMode(base, mode) };
  });
}

export const VARIATION_MODE_META: Record<VariationMode, { label: string; hint: string }> = {
  vary: { label: "Vary", hint: "New everything — may switch Shader or Media" },
  inspire: { label: "Inspire", hint: "Brand-new look in the current mode" },
  recolour: { label: "Recolour", hint: "Keep style and settings; new colours" },
  remix: { label: "Remix", hint: "New surface; keep style, colours, motion, and cursor" },
  restyle: { label: "Restyle", hint: "New style; keep the palette" },
};
