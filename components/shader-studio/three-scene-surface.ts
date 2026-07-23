import type { Recipe, ThreeSceneMode } from "./types";
import { threeScenePresetNames } from "./three-scene-catalog";
import { getActiveSceneObject, resolveThreeObjects } from "./three-scene-objects";
import { threeMaterialNames, threeObjectNames } from "./three-catalog";
import { getThreeSurfaceProfile, getThreeSurfaceSummary, type ThreeSurfaceProfile } from "./three-surface-controls";
import { getThreePresetSurfaceProfile } from "./three-preset-surface-controls";

export function getSceneSurfaceProfile(recipe: Recipe): ThreeSurfaceProfile {
  if (recipe.threeSceneMode === "preset") {
    return getThreePresetSurfaceProfile(recipe.threeScenePreset);
  }
  const active = getActiveSceneObject(recipe);
  return getThreeSurfaceProfile(active.material);
}

export function getSceneSurfaceSummary(recipe: Recipe) {
  if (recipe.threeSceneMode === "preset") {
    const label = threeScenePresetNames[recipe.threeScenePreset] ?? "Scene";
    return `${label} · Light ${Math.round(recipe.intensity * 100)}% · Motion ${recipe.speed.toFixed(1)}×`;
  }
  const active = getActiveSceneObject(recipe);
  const objects = resolveThreeObjects(recipe);
  const base = getThreeSurfaceSummary(active.material, { ...recipe, threeMaterial: active.material });
  if (objects.length > 1) {
    return `${objects.length} objects · ${base}`;
  }
  return base;
}

export function getSceneStyleSummary(recipe: Recipe) {
  if (recipe.threeSceneMode === "preset") {
    return threeScenePresetNames[recipe.threeScenePreset] ?? "Scene preset";
  }
  const active = getActiveSceneObject(recipe);
  if (active.modelUpload) return "Uploaded GLB";
  return `${threeMaterialNames[active.material] ?? "Material"} · ${threeObjectNames[active.object] ?? "Object"}`;
}

export function sceneModeLabel(mode: ThreeSceneMode) {
  return mode === "preset" ? "Scenes" : "Compose";
}
