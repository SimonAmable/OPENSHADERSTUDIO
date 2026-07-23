import type { Recipe, ThreeEnvironmentId, ThreeMaterialId, ThreeObjectId } from "./types";
import { threeScenePresetNames } from "./three-scene-catalog";
import { resolveThreeObjects } from "./three-scene-objects";

export type ThreeObjectDef = {
  id: ThreeObjectId;
  label: string;
  group: "Solids" | "Forms";
};

export type ThreeMaterialDef = {
  id: ThreeMaterialId;
  label: string;
  group: "Surface" | "Shader";
};

export type ThreeEnvironmentDef = {
  id: ThreeEnvironmentId;
  label: string;
  swatch: string;
};

export const threeObjects: ThreeObjectDef[] = [
  { id: "sphere", label: "Sphere", group: "Solids" },
  { id: "torus", label: "Torus", group: "Solids" },
  { id: "icosahedron", label: "Icosahedron", group: "Solids" },
  { id: "box", label: "Box", group: "Solids" },
  { id: "torus-knot", label: "Torus knot", group: "Forms" },
  { id: "capsule", label: "Capsule", group: "Forms" },
  { id: "star", label: "Star", group: "Forms" },
  { id: "sparkle", label: "Sparkle", group: "Forms" },
];

export const threeMaterials: ThreeMaterialDef[] = [
  { id: "chrome", label: "Chrome", group: "Surface" },
  { id: "matte", label: "Matte", group: "Surface" },
  { id: "glass", label: "Glass", group: "Surface" },
  { id: "toon", label: "Toon", group: "Surface" },
  { id: "iridescent", label: "Iridescent", group: "Surface" },
  { id: "liquid-chrome", label: "Liquid chrome", group: "Shader" },
  { id: "flow-field", label: "Flow field", group: "Shader" },
  { id: "plasma", label: "Plasma", group: "Shader" },
  { id: "caustics", label: "Caustics", group: "Shader" },
  { id: "aurora", label: "Aurora", group: "Shader" },
  { id: "smoke", label: "Smoke", group: "Shader" },
  { id: "swirl", label: "Swirl", group: "Shader" },
  { id: "silk", label: "Silk", group: "Shader" },
  { id: "neuro-noise", label: "Neuro noise", group: "Shader" },
  { id: "waves", label: "Waves", group: "Shader" },
];

export const threeEnvironments: ThreeEnvironmentDef[] = [
  { id: "open", label: "Open", swatch: "radial-gradient(circle at 50% 35%,#3a4254 0%,#12151c 55%,#06070a 100%)" },
  { id: "nocturne", label: "Nocturne", swatch: "linear-gradient(160deg,#050507 35%,#1a1a1e 70%,#2a2a30)" },
  { id: "gallery", label: "Gallery", swatch: "linear-gradient(160deg,#d8d4cc 20%,#bdb7ad 65%,#8f8980)" },
  { id: "daylight", label: "Daylight", swatch: "linear-gradient(145deg,#8ec8e8 0%,#c9d8de 48%,#7a8a7c 100%)" },
];

export const threeObjectIds = threeObjects.map((item) => item.id);
export const threeMaterialIds = threeMaterials.map((item) => item.id);
export const threeEnvironmentIds = threeEnvironments.map((item) => item.id);

export const DEFAULT_THREE_OBJECT: ThreeObjectId = "torus-knot";
export const DEFAULT_THREE_MATERIAL: ThreeMaterialId = "chrome";
export const DEFAULT_THREE_ENVIRONMENT: ThreeEnvironmentId = "nocturne";
export const DEFAULT_THREE_PEDESTAL = true;
export const DEFAULT_THREE_OPEN_BACKGROUND = "solid" as const;

export function isRoomEnvironment(env: ThreeEnvironmentId) {
  return env !== "open";
}

export const threeObjectGroups = [
  { title: "Solids", items: threeObjects.filter((item) => item.group === "Solids") },
  { title: "Forms", items: threeObjects.filter((item) => item.group === "Forms") },
] as const;

export const threeMaterialGroups = [
  { title: "Surface", items: threeMaterials.filter((item) => item.group === "Surface") },
  { title: "Shader", items: threeMaterials.filter((item) => item.group === "Shader") },
] as const;

export const threeObjectNames: Record<ThreeObjectId, string> = Object.fromEntries(
  threeObjects.map((item) => [item.id, item.label]),
) as Record<ThreeObjectId, string>;

export const threeMaterialNames: Record<ThreeMaterialId, string> = Object.fromEntries(
  threeMaterials.map((item) => [item.id, item.label]),
) as Record<ThreeMaterialId, string>;

export const threeEnvironmentNames: Record<ThreeEnvironmentId, string> = Object.fromEntries(
  threeEnvironments.map((item) => [item.id, item.label]),
) as Record<ThreeEnvironmentId, string>;

export function isThreeObjectId(value: unknown): value is ThreeObjectId {
  return typeof value === "string" && threeObjectIds.includes(value as ThreeObjectId);
}

export function isThreeMaterialId(value: unknown): value is ThreeMaterialId {
  return typeof value === "string" && threeMaterialIds.includes(value as ThreeMaterialId);
}

export function isThreeEnvironmentId(value: unknown): value is ThreeEnvironmentId {
  return typeof value === "string" && threeEnvironmentIds.includes(value as ThreeEnvironmentId);
}

export function getThreeObject(id: ThreeObjectId) {
  return threeObjects.find((item) => item.id === id) ?? threeObjects[0];
}

export function getThreeMaterial(id: ThreeMaterialId) {
  return threeMaterials.find((item) => item.id === id) ?? threeMaterials[0];
}

export function getThreeEnvironment(id: ThreeEnvironmentId) {
  return threeEnvironments.find((item) => item.id === id) ?? threeEnvironments[0];
}

export function pickOtherThreeObject(current: ThreeObjectId) {
  const choices = threeObjectIds.filter((id) => id !== current);
  return choices[Math.floor(Math.random() * choices.length)] ?? current;
}

export function pickOtherThreeMaterial(current: ThreeMaterialId) {
  const choices = threeMaterialIds.filter((id) => id !== current);
  return choices[Math.floor(Math.random() * choices.length)] ?? current;
}

export function randomThreeObject(): ThreeObjectId {
  return threeObjectIds[Math.floor(Math.random() * threeObjectIds.length)] ?? DEFAULT_THREE_OBJECT;
}

export function randomThreeMaterial(): ThreeMaterialId {
  return threeMaterialIds[Math.floor(Math.random() * threeMaterialIds.length)] ?? DEFAULT_THREE_MATERIAL;
}

/** Canonical object shape per material so thumbnail PNGs stay distinct and reproducible. */
export const threePreviewObjectIds: Record<ThreeMaterialId, ThreeObjectId> = {
  chrome: "sphere",
  matte: "box",
  glass: "sphere",
  toon: "icosahedron",
  iridescent: "torus",
  "liquid-chrome": "torus-knot",
  "flow-field": "torus-knot",
  plasma: "icosahedron",
  caustics: "sphere",
  aurora: "icosahedron",
  smoke: "capsule",
  swirl: "torus",
  silk: "torus-knot",
  "neuro-noise": "icosahedron",
  waves: "torus",
};

export const THREE_OBJECT_PREVIEW_MATERIAL: ThreeMaterialId = "chrome";

export function threePreviewObjectId(materialId: ThreeMaterialId) {
  return threePreviewObjectIds[materialId] ?? DEFAULT_THREE_OBJECT;
}

export function resolveThreePreviewMaterial(value: string): ThreeMaterialId {
  return isThreeMaterialId(value) ? value : DEFAULT_THREE_MATERIAL;
}

export function resolveThreePreviewObject(value: string): ThreeObjectId {
  return isThreeObjectId(value) ? value : DEFAULT_THREE_OBJECT;
}

export function threeSceneLabel(recipe: Partial<Pick<Recipe, "threeMaterial" | "threeObject" | "threeModelUpload" | "name" | "threeSceneMode" | "threeScenePreset" | "threeObjects">>) {
  if (recipe.threeSceneMode === "preset" && recipe.threeScenePreset) {
    return threeScenePresetNames[recipe.threeScenePreset] ?? "Scene preset";
  }
  const objects = resolveThreeObjects(recipe);
  if (objects.length > 1) {
    return `${objects.length} objects`;
  }
  const active = objects[0];
  if (active?.modelUpload) {
    return `${threeMaterialNames[active.material] ?? "Material"} · Upload`;
  }
  if (active) {
    const material = threeMaterialNames[active.material] ?? "Material";
    const object = threeObjectNames[active.object] ?? "Object";
    return `${material} · ${object}`;
  }
  if (recipe.threeModelUpload && recipe.threeMaterial) {
    return `${threeMaterialNames[recipe.threeMaterial] ?? "Material"} · Upload`;
  }
  const material = recipe.threeMaterial ? threeMaterialNames[recipe.threeMaterial] ?? "Material" : "Material";
  const object = recipe.threeObject ? threeObjectNames[recipe.threeObject] ?? "Object" : "Object";
  return `${material} · ${object}`;
}
