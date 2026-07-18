import type { CursorEffect, Recipe } from "./types";
import { fragmentShader, palettes, presetSettings, styleNames } from "./canvas";

export type VariationMode = "inspire" | "recolour" | "remix" | "restyle";

const CURSOR_EFFECTS: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];

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

export function recolourRecipe(_recipe: Recipe): Partial<Recipe> {
  return { palette: palettes[Math.floor(Math.random() * palettes.length)] };
}

export function remixRecipe(recipe: Recipe): Partial<Recipe> {
  const style = pickOtherStyle(recipe.style);
  const name = styleNames[style] ?? "Remixed shader";
  return { name, style, ...randomSurface(), glsl: fragmentShader };
}

export function restyleRecipe(recipe: Recipe): Partial<Recipe> {
  const style = pickOtherStyle(recipe.style);
  const name = styleNames[style] ?? "Restyled shader";
  const settings = presetSettings[style] ?? {};
  return { ...settings, name, style, palette: recipe.palette, glsl: fragmentShader };
}

export function inspireRecipe(): Partial<Recipe> {
  return {
    name: "Inspired shader",
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
    case "inspire":
      update = inspireRecipe();
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
  inspire: { label: "Inspire", hint: "Brand-new style, colours, and settings" },
  recolour: { label: "Recolour", hint: "Keep style and settings; new colours" },
  remix: { label: "Remix", hint: "New style and surface; keep colours, motion, and cursor" },
  restyle: { label: "Restyle", hint: "New style; keep the palette" },
};
