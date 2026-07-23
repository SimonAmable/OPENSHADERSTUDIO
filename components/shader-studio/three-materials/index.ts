import { Color, ShaderMaterial } from "three";
import type { Recipe, ThreeMaterialId } from "../types";
import { MESH_SURFACE_VERT } from "./noise-glsl";
import {
  AURORA_FRAG,
  CAUSTICS_FRAG,
  FLOW_FIELD_FRAG,
  LIQUID_CHROME_FRAG,
  NEURO_NOISE_FRAG,
  PLASMA_FRAG,
  SILK_FRAG,
  SMOKE_FRAG,
  SWIRL_FRAG,
  WAVES_FRAG,
} from "./shader-sources";

export type ScenePalette = { a: string; b: string; c: string; bg: string };

export type ThreeShaderMaterialDef = {
  id: ThreeShaderMaterialId;
  label: string;
  vert: string;
  frag: string;
  /** Liquid chrome uses a slimmer uniform set. */
  extendedUniforms?: boolean;
};

export const THREE_SHADER_MATERIAL_IDS = [
  "liquid-chrome",
  "flow-field",
  "plasma",
  "caustics",
  "aurora",
  "smoke",
  "swirl",
  "silk",
  "neuro-noise",
  "waves",
] as const;

export type ThreeShaderMaterialId = (typeof THREE_SHADER_MATERIAL_IDS)[number];

const shaderMaterialDefs: ThreeShaderMaterialDef[] = [
  { id: "liquid-chrome", label: "Liquid chrome", vert: MESH_SURFACE_VERT, frag: LIQUID_CHROME_FRAG },
  { id: "flow-field", label: "Flow field", vert: MESH_SURFACE_VERT, frag: FLOW_FIELD_FRAG, extendedUniforms: true },
  { id: "plasma", label: "Plasma", vert: MESH_SURFACE_VERT, frag: PLASMA_FRAG, extendedUniforms: true },
  { id: "caustics", label: "Caustics", vert: MESH_SURFACE_VERT, frag: CAUSTICS_FRAG, extendedUniforms: true },
  { id: "aurora", label: "Aurora", vert: MESH_SURFACE_VERT, frag: AURORA_FRAG, extendedUniforms: true },
  { id: "smoke", label: "Smoke", vert: MESH_SURFACE_VERT, frag: SMOKE_FRAG, extendedUniforms: true },
  { id: "swirl", label: "Swirl", vert: MESH_SURFACE_VERT, frag: SWIRL_FRAG, extendedUniforms: true },
  { id: "silk", label: "Silk", vert: MESH_SURFACE_VERT, frag: SILK_FRAG, extendedUniforms: true },
  { id: "neuro-noise", label: "Neuro noise", vert: MESH_SURFACE_VERT, frag: NEURO_NOISE_FRAG, extendedUniforms: true },
  { id: "waves", label: "Waves", vert: MESH_SURFACE_VERT, frag: WAVES_FRAG, extendedUniforms: true },
];

const shaderMaterialMap = Object.fromEntries(
  shaderMaterialDefs.map((def) => [def.id, def]),
) as Record<ThreeShaderMaterialId, ThreeShaderMaterialDef>;

export function isThreeShaderMaterial(id: ThreeMaterialId): id is ThreeShaderMaterialId {
  return (THREE_SHADER_MATERIAL_IDS as readonly string[]).includes(id);
}

export function getThreeShaderMaterial(id: ThreeMaterialId) {
  return isThreeShaderMaterial(id) ? shaderMaterialMap[id] : null;
}

export function createSceneShaderMaterial(
  def: ThreeShaderMaterialDef,
  recipe: Recipe,
  colors: ScenePalette,
) {
  const uniforms: ShaderMaterial["uniforms"] = def.extendedUniforms
    ? {
        uTime: { value: 0 },
        uWarp: { value: recipe.warp },
        uContrast: { value: recipe.contrast },
        uGrain: { value: recipe.grain },
        uSeed: { value: recipe.seed },
        uSpeed: { value: recipe.speed },
        uIntensity: { value: recipe.intensity },
        uColorA: { value: new Color(colors.a) },
        uColorB: { value: new Color(colors.b) },
        uColorC: { value: new Color(colors.c) },
      }
    : {
        uTime: { value: 0 },
        uWarp: { value: recipe.warp },
        uContrast: { value: recipe.contrast },
        uGrain: { value: recipe.grain },
        uSeed: { value: recipe.seed },
        uColorA: { value: new Color(colors.a) },
        uColorB: { value: new Color(colors.b) },
        uColorC: { value: new Color(colors.c) },
      };

  return new ShaderMaterial({
    uniforms,
    vertexShader: def.vert,
    fragmentShader: def.frag,
  });
}

export function updateSceneShaderMaterial(
  material: ShaderMaterial,
  def: ThreeShaderMaterialDef,
  recipe: Recipe,
  colors: ScenePalette,
  delta: number,
  frozen: boolean,
) {
  if (frozen || !recipe.animate) return;
  const dir = recipe.reverse ? -1 : 1;
  material.uniforms.uTime.value += delta * (0.35 + recipe.speed * 1.1) * dir;
  material.uniforms.uWarp.value = recipe.warp;
  material.uniforms.uContrast.value = recipe.contrast;
  material.uniforms.uGrain.value = recipe.grain;
  if (def.extendedUniforms) {
    material.uniforms.uSpeed.value = recipe.speed;
    material.uniforms.uIntensity.value = recipe.intensity;
  }
  (material.uniforms.uColorA.value as Color).set(colors.a);
  (material.uniforms.uColorB.value as Color).set(colors.b);
  (material.uniforms.uColorC.value as Color).set(colors.c);
}

export function getSceneShaderGlslExport(id: ThreeShaderMaterialId) {
  const def = shaderMaterialMap[id];
  return `// Vertex shader\n${def.vert}\n\n// Fragment shader\n${def.frag}`;
}

export { shaderMaterialDefs };
