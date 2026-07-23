import type { Recipe, ThreeMaterialId, ThreeObjectId, ThreeSceneObject } from "./types";
import {
  DEFAULT_THREE_MATERIAL,
  DEFAULT_THREE_OBJECT,
} from "./three-catalog";

const MAX_SCENE_OBJECTS = 6;

export function createSceneObject(overrides?: Partial<ThreeSceneObject>): ThreeSceneObject {
  return {
    id: crypto.randomUUID(),
    object: DEFAULT_THREE_OBJECT,
    material: DEFAULT_THREE_MATERIAL,
    modelUpload: null,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 1,
    ...overrides,
  };
}

function normalizeSceneObject(input: Partial<ThreeSceneObject>, index: number): ThreeSceneObject {
  const object = input.object ?? DEFAULT_THREE_OBJECT;
  const material = input.material ?? DEFAULT_THREE_MATERIAL;
  const modelUpload = typeof input.modelUpload === "string" && input.modelUpload.startsWith("data:")
    ? input.modelUpload
    : null;
  const position: [number, number, number] = Array.isArray(input.position) && input.position.length === 3
    ? [input.position[0], input.position[1], input.position[2]]
    : defaultObjectPosition(index, 1);
  const rotation: [number, number, number] = Array.isArray(input.rotation) && input.rotation.length === 3
    ? [input.rotation[0], input.rotation[1], input.rotation[2]]
    : [0, 0, 0];
  const scale = typeof input.scale === "number" && Number.isFinite(input.scale)
    ? Math.max(0.25, Math.min(2.5, input.scale))
    : 1;

  return {
    id: typeof input.id === "string" && input.id.length > 0 ? input.id : crypto.randomUUID(),
    object,
    material,
    modelUpload,
    position,
    rotation,
    scale,
  };
}

export function defaultObjectPosition(index: number, total: number): [number, number, number] {
  if (total <= 1) return [0, 0, 0];
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 0.72 + Math.min(total, 4) * 0.12;
  return [Math.sin(angle) * radius, 0, Math.cos(angle) * radius];
}

export function defaultObjectScale(index: number, total: number) {
  if (total <= 1) return 1;
  return index === 0 ? 1 : 0.72;
}

export function resolveThreeObjects(recipe: Partial<Recipe>): ThreeSceneObject[] {
  if (Array.isArray(recipe.threeObjects) && recipe.threeObjects.length > 0) {
    return recipe.threeObjects.map((item, index) => normalizeSceneObject(item, index));
  }

  return [
    createSceneObject({
      object: recipe.threeObject ?? DEFAULT_THREE_OBJECT,
      material: recipe.threeMaterial ?? DEFAULT_THREE_MATERIAL,
      modelUpload: recipe.threeModelUpload ?? null,
    }),
  ];
}

export function getActiveSceneObject(recipe: Recipe): ThreeSceneObject {
  const objects = resolveThreeObjects(recipe);
  const active = objects.find((item) => item.id === recipe.threeActiveObjectId);
  return active ?? objects[0] ?? createSceneObject();
}

export function syncPrimaryThreeFields(
  objects: ThreeSceneObject[],
  activeId: string | null = null,
): Partial<Recipe> {
  const active = objects.find((item) => item.id === activeId) ?? objects[0];
  if (!active) {
    return { threeObjects: objects, threeActiveObjectId: null };
  }

  return {
    threeObjects: objects,
    threeActiveObjectId: active.id,
    threeObject: active.object,
    threeMaterial: active.material,
    threeModelUpload: active.modelUpload,
  };
}

export function updateSceneObject(
  recipe: Recipe,
  objectId: string,
  update: Partial<ThreeSceneObject>,
): Partial<Recipe> {
  const objects = resolveThreeObjects(recipe).map((item) => (
    item.id === objectId ? normalizeSceneObject({ ...item, ...update }, 0) : item
  ));
  return syncPrimaryThreeFields(objects, objectId);
}

export function addSceneObject(recipe: Recipe): Partial<Recipe> {
  const objects = resolveThreeObjects(recipe);
  if (objects.length >= MAX_SCENE_OBJECTS) return {};
  const index = objects.length;
  const next = createSceneObject({
    object: objects[0]?.object ?? DEFAULT_THREE_OBJECT,
    material: objects[0]?.material ?? DEFAULT_THREE_MATERIAL,
    position: defaultObjectPosition(index, index + 1),
    scale: defaultObjectScale(index, index + 1),
  });
  const merged = [...objects, next];
  return syncPrimaryThreeFields(merged, next.id);
}

export function removeSceneObject(recipe: Recipe, objectId: string): Partial<Recipe> {
  const objects = resolveThreeObjects(recipe);
  if (objects.length <= 1) return {};
  const merged = objects.filter((item) => item.id !== objectId);
  const nextActive = recipe.threeActiveObjectId === objectId
    ? merged[0]?.id ?? null
    : recipe.threeActiveObjectId;
  return syncPrimaryThreeFields(merged, nextActive);
}

export function reorderSceneObject(
  recipe: Recipe,
  objectId: string,
  direction: -1 | 1,
): Partial<Recipe> {
  const objects = [...resolveThreeObjects(recipe)];
  const index = objects.findIndex((item) => item.id === objectId);
  if (index < 0) return {};
  const target = index + direction;
  if (target < 0 || target >= objects.length) return {};
  const [item] = objects.splice(index, 1);
  objects.splice(target, 0, item);
  return syncPrimaryThreeFields(objects, objectId);
}

export function sceneObjectLabel(item: Pick<ThreeSceneObject, "object" | "material" | "modelUpload">) {
  if (item.modelUpload) return "Upload";
  return `${item.object} · ${item.material}`;
}
